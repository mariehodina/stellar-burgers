import { test, expect } from '@playwright/test';

test.describe('Конструктор бургера', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('tests/hars/burgerIngredient.har', {
      url: '**/api/ingredients',
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

    await page.addInitScript(() => {
      localStorage.setItem('refreshToken', 'mock-refresh-token');
    });
  });

  test('должен добавить ингредиент в конструктор', async ({ page }) => {
    await page.goto('http://localhost:4000');
    await page.waitForLoadState('networkidle');
    
    const ingredient = page.locator('[class*="ingredient"]').filter({ hasText: 'Краторная булка N-200i' }).first();
    await expect(ingredient).toBeVisible({ timeout: 15000 });
    
    const addButton = ingredient.locator('button:has-text("Добавить")');
    await addButton.click();
    
    const constructorItem = page.locator('[class*="constructor"]').filter({ hasText: 'Краторная булка N-200i' }).first();
    await expect(constructorItem).toBeVisible({ timeout: 5000 });
  });

  test('должен открыть модальное окно ингредиента', async ({ page }) => {
    await page.goto('http://localhost:4000');
    await page.waitForLoadState('networkidle');
    
    const ingredient = page.locator('[class*="ingredient"]').filter({ hasText: 'Краторная булка N-200i' }).first();
    await expect(ingredient).toBeVisible({ timeout: 15000 });
    await ingredient.click();
    
    const modal = page.locator('[class*="modal"]').first();
    await expect(modal).toBeVisible({ timeout: 10000 });
    await expect(modal).toContainText('Краторная булка N-200i');
    await expect(modal).toContainText('Калории, ккал');
  });

  test('должен закрыть модальное окно по крестику', async ({ page }) => {
    await page.goto('http://localhost:4000');
    await page.waitForLoadState('networkidle');
    
    const ingredient = page.locator('[class*="ingredient"]').filter({ hasText: 'Краторная булка N-200i' }).first();
    await expect(ingredient).toBeVisible({ timeout: 15000 });
    await ingredient.click();
    
    const modal = page.locator('[class*="modal"]').first();
    await expect(modal).toBeVisible({ timeout: 10000 });
    
    const closeButton = page.locator('[class*="modal"] button').first();
    await expect(closeButton).toBeVisible({ timeout: 5000 });
    await closeButton.click();
    
    await expect(modal).not.toBeVisible({ timeout: 10000 });
  });

  test('должен создать заказ', async ({ page }) => {
    await page.context().addCookies([
      {
        name: 'accessToken',
        value: 'mock-access-token',
        domain: 'localhost',
        path: '/'
      }
    ]);

    await page.goto('http://localhost:4000');
    await page.waitForLoadState('networkidle');
    
    const bun = page.locator('[class*="ingredient"]').filter({ hasText: 'Краторная булка N-200i' }).first();
    await expect(bun).toBeVisible({ timeout: 15000 });
    
    const addButton = bun.locator('button:has-text("Добавить")');
    await addButton.click();
    
    const main = page.locator('[class*="ingredient"]').filter({ hasText: 'Биокотлета из марсианской Магнолии' }).first();
    await expect(main).toBeVisible();
    
    const addMainButton = main.locator('button:has-text("Добавить")');
    await addMainButton.click();
    
    const orderButton = page.locator('button:has-text("Оформить заказ")');
    await expect(orderButton).toBeVisible({ timeout: 5000 });
    await orderButton.click();
    
    const orderModal = page.locator('[class*="modal"]').first();
    await expect(orderModal).toBeVisible({ timeout: 15000 });
    await expect(orderModal).toContainText('12345');
    
    const closeButton = orderModal.locator('button').first();
    await closeButton.click();
    await expect(orderModal).not.toBeVisible({ timeout: 5000 });
  });

  test.afterEach(async ({ page }) => {
    await page.context().clearCookies();
    try {
      await page.evaluate(() => {
        localStorage.removeItem('refreshToken');
      });
    } catch (e) {
    }
  });
});