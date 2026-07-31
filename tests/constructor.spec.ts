import { test, expect } from '@playwright/test';

test.describe('Конструктор бургера', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('./tests/hars/burgerIngredient.har', {
      url: '**/api/ingredients',
      update: false
    });
  });

  test('должен добавить ингредиент в конструктор', async ({ page }) => {
    await page.goto('/');
    
    const ingredient = page.locator('[data-testid="ingredient-2"]');
    await ingredient.click();
    
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
    await page.context().addCookies([
      {
        name: 'accessToken',
        value: 'mock-token',
        domain: 'localhost',
        path: '/'
      }
    ]);

    await page.goto('/');
    
    const bun = page.locator('[data-testid="ingredient-bun"]');
    await bun.click();
    
    const ingredient = page.locator('[data-testid="ingredient-main"]');
    await ingredient.click();
    
    const orderButton = page.locator('[data-testid="order-button"]');
    await orderButton.click();
    
    const orderModal = page.locator('[data-testid="order-modal"]');
    await expect(orderModal).toBeVisible();
  });
});