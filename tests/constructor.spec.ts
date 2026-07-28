import { test, expect } from '@playwright/test';

test.describe('Конструктор бургера', () => {
  test.beforeEach(async ({ page }) => {
    // запросы к API
    await page.routeFromHAR('./tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: false
    });
  });

  test('должен добавить ингредиент в конструктор', async ({ page }) => {
    await page.goto('/');
    
    // нахожу ингредиент и добавляю его
    const ingredient = page.locator('[data-testid="ingredient-2"]');
    await ingredient.click();
    
    // Проверка того, что ингредиент добавился в конструктор
    const constructorItems = page.locator('[data-testid="constructor-items"]');
    await expect(constructorItems).toBeVisible();
  });

  test('должен открыть модальное окно ингредиента', async ({ page }) => {
    await page.goto('/');
    
    const ingredient = page.locator('[data-testid="ingredient-1"]');
    await ingredient.click();
    
    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).toBeVisible();
  });

  test('должен закрыть модальное окно по крестику', async ({ page }) => {
    await page.goto('/');
    
    const ingredient = page.locator('[data-testid="ingredient-1"]');
    await ingredient.click();
    
    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).toBeVisible();
    
    const closeButton = page.locator('[data-testid="modal-close"]');
    await closeButton.click();
    
    await expect(modal).not.toBeVisible();
  });

  test('должен создать заказ', async ({ page }) => {
    // Добавка куки для авторизации
    await page.context().addCookies([
      {
        name: 'accessToken',
        value: 'mock-token',
        domain: 'localhost',
        path: '/'
      }
    ]);

    await page.goto('/');
    
    // добавка булки
    const bun = page.locator('[data-testid="ingredient-bun"]');
    await bun.click();
    
    // добавка начинки
    const ingredient = page.locator('[data-testid="ingredient-main"]');
    await ingredient.click();
    
    // нажатие на "Оформить заказ"
    const orderButton = page.locator('[data-testid="order-button"]');
    await orderButton.click();
    
    // проверка того, что открылось модал окно заказа
    const orderModal = page.locator('[data-testid="order-modal"]');
    await expect(orderModal).toBeVisible();
  });
});