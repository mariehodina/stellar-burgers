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
  });

  test('должен добавить ингредиент в конструктор', async ({ page }) => {
    await page.goto('/');
    
    const ingredient = page.locator('[data-testid="ingredient-2"]');
    await expect(ingredient).toBeVisible();
    await ingredient.click();
    
    const constructorItems = page.locator('[data-testid="constructor-items"]');
    await expect(constructorItems).toBeVisible();
    await expect(constructorItems).toContainText('Биокотлета из марсианской Магнолии');
  });

  test('должен открыть модальное окно ингредиента', async ({ page }) => {
    await page.goto('/');
    
    const ingredient = page.locator('[data-testid="ingredient-1"]');
    await expect(ingredient).toBeVisible();
    await ingredient.click();
    
    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Краторная булка N-200i');
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

    await page.goto('/');
    
    const bun = page.locator('[data-testid="ingredient-bun"]');
    await expect(bun).toBeVisible();
    await bun.click();
    
    const ingredient = page.locator('[data-testid="ingredient-main"]');
    await expect(ingredient).toBeVisible();
    await ingredient.click();
    
    const bunBottom = page.locator('[data-testid="ingredient-bun-bottom"]');
    if (await bunBottom.isVisible()) {
      await bunBottom.click();
    }
    
    const orderButton = page.locator('[data-testid="order-button"]');
    await expect(orderButton).toBeVisible();
    await orderButton.click();
    
    const orderModal = page.locator('[data-testid="order-modal"]');
    await expect(orderModal).toBeVisible({ timeout: 10000 });
    await expect(orderModal).toContainText('12345'); 
  });

  test.afterEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.evaluate(() => {
      localStorage.removeItem('refreshToken');
    });
  });
});