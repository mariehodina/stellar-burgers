import { test, expect } from '@playwright/test';

test.describe('Конструктор бургера', () => {
  test.beforeEach(async ({ page }) => {
    // Используем правильные пути к HAR-файлам
    await page.routeFromHAR('tests/hars/burgerIngredient.har', {
      url: '**/api/ingredients', // Матчит любой URL с /api/ingredients
      update: false
    });
    
    await page.routeFromHAR('tests/hars/burgerUsers.har', {
      url: '**/api/auth/user',
      update: false
    });
    
    await page.routeFromHAR('tests/hars/burgerOrder.har', {
      url: '**/api/orders',
      update: false
    });
  });

  test('должен закрыть модальное окно по крестику', async ({ page }) => {
    await page.goto('http://localhost:4000'); // Используем ваш URL
    
    // Ждем загрузки данных
    await page.waitForSelector('[data-testid="ingredient-1"]', { timeout: 10000 });
    
    // Открываем модальное окно
    await page.click('[data-testid="ingredient-1"]');
    
    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).toBeVisible({ timeout: 5000 });
    
    // Закрываем модальное окно
    const closeButton = page.locator('[data-testid="modal-close"]');
    await expect(closeButton).toBeVisible({ timeout: 5000 });
    await closeButton.click();
    
    await expect(modal).not.toBeVisible({ timeout: 5000 });
  });

  test('должен создать заказ', async ({ page }) => {
    // Добавляем cookies для авторизации
    await page.context().addCookies([
      {
        name: 'accessToken',
        value: 'mock-access-token',
        domain: 'localhost',
        path: '/'
      }
    ]);

    await page.evaluate(() => {
      localStorage.setItem('refreshToken', 'mock-refresh-token');
    });

    await page.goto('http://localhost:4000');
    await page.waitForLoadState('networkidle');
    
    // Добавляем булку
    const bun = page.locator('[data-testid="ingredient-bun"]');
    await expect(bun).toBeVisible({ timeout: 10000 });
    await bun.click();
    
    // Добавляем начинку
    const ingredient = page.locator('[data-testid="ingredient-main"]');
    await expect(ingredient).toBeVisible();
    await ingredient.click();
    
    // Создаем заказ
    const orderButton = page.locator('[data-testid="order-button"]');
    await expect(orderButton).toBeVisible();
    await expect(orderButton).toBeEnabled();
    await orderButton.click();
    
    // Проверяем модальное окно с заказом
    const orderModal = page.locator('[data-testid="order-modal"]');
    await expect(orderModal).toBeVisible({ timeout: 10000 });
    await expect(orderModal).toContainText('12345');
  });
});