import { test, expect } from '@playwright/test';

test.describe('Страница конструктора бургера', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('./tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: false
    });
  });

  test.describe('Добавление ингредиентов в конструктор', () => {
    test('Добавление булки и начинки в конструктор', async ({ page }) => {
      await page.goto('/');
      await page.waitForTimeout(2000);

      const bun = page.locator('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]');
      await bun.click();

      const constructorBunTop = page.locator('[data-testid="constructor-bun-top"]');
      await expect(constructorBunTop).toBeVisible();

      const main = page.locator('[data-testid="ingredient-643d69a5c3f7b9001cfa0941"]');
      await main.click();

      const constructorItem = page.locator('[data-testid="constructor-item"]');
      await expect(constructorItem).toBeVisible();

      const sauce = page.locator('[data-testid="ingredient-643d69a5c3f7b9001cfa0942"]');
      await sauce.click();

      const constructorItems = page.locator('[data-testid="constructor-item"]');
      await expect(constructorItems).toHaveCount(2);

      const constructorBunBottom = page.locator('[data-testid="constructor-bun-bottom"]');
      await expect(constructorBunBottom).toBeVisible();
    });
  });

  test.describe('Модальное окно ингредиента', () => {
    test('Открытие модального окна по клику на ингредиент', async ({ page }) => {
      await page.goto('/');
      await page.waitForTimeout(2000);

      const bun = page.locator('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]');
      await bun.click();

      const modal = page.locator('[data-testid="modal"]');
      await expect(modal).toBeVisible();
      await expect(modal).toContainText('Краторная булка N-200i');
      await expect(modal).toContainText('Калории, ккал');
      await expect(modal).toContainText('420');
      await expect(modal).toContainText('Белки, г');
      await expect(modal).toContainText('80');
    });

    test('Закрытие модального окна по клику на крестик', async ({ page }) => {
      await page.goto('/');
      await page.waitForTimeout(2000);

      const sauce = page.locator('[data-testid="ingredient-643d69a5c3f7b9001cfa0942"]');
      await sauce.click();

      const modal = page.locator('[data-testid="modal"]');
      await expect(modal).toBeVisible();
      await expect(modal).toContainText('Соус Spicy-X');

      const closeButton = page.locator('[data-testid="modal-close"]');
      await closeButton.click();

      await expect(modal).not.toBeVisible();
    });

    test('Закрытие модального окна по клику на оверлей', async ({ page }) => {
      await page.goto('/');
      await page.waitForTimeout(2000);

      const main = page.locator('[data-testid="ingredient-643d69a5c3f7b9001cfa0943"]');
      await main.click();

      const modal = page.locator('[data-testid="modal"]');
      await expect(modal).toBeVisible();
      await expect(modal).toContainText('Филе Люминесцентного тетраодонтимформа');

      await page.click('[data-testid="modal-overlay"]');

      await expect(modal).not.toBeVisible();
    });

    test('Отображение в открытом модальном окне данных именно того ингредиента, по которому произошел клик', async ({ page }) => {
      await page.goto('/');
      await page.waitForTimeout(2000);

      const bun = page.locator('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]');
      await bun.click();

      const modal = page.locator('[data-testid="modal"]');
      await expect(modal).toContainText('Краторная булка N-200i');
      await expect(modal).toContainText('1255');

      await page.click('[data-testid="modal-close"]');

      const main = page.locator('[data-testid="ingredient-643d69a5c3f7b9001cfa0941"]');
      await main.click();

      await expect(modal).toContainText('Биокотлета из марсианской Магнолии');
      await expect(modal).toContainText('424');

      await page.click('[data-testid="modal-close"]');

      const sauce = page.locator('[data-testid="ingredient-643d69a5c3f7b9001cfa0942"]');
      await sauce.click();

      await expect(modal).toContainText('Соус Spicy-X');
      await expect(modal).toContainText('90');

      await page.click('[data-testid="modal-close"]');
    });
  });
});

test.describe('Создание заказа', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: false
    });
    await page.routeFromHAR('tests/hars/user.har', {
      url: '**/api/auth/user',
      update: false
    });
    await page.routeFromHAR('tests/hars/order.har', {
      url: '**/api/orders',
      update: false
    });

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
  });

  test.afterEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.evaluate(() => {
      localStorage.removeItem('refreshToken');
    });
  });

  test('Сборка бургера, оформление заказа, проверка модального окна с номером заказа и очистка конструктора', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);

    const bun = page.locator('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]');
    await bun.click();

    const main = page.locator('[data-testid="ingredient-643d69a5c3f7b9001cfa0941"]');
    await main.click();

    const sauce = page.locator('[data-testid="ingredient-643d69a5c3f7b9001cfa0942"]');
    await sauce.click();

    await expect(page.locator('[data-testid="constructor-bun-top"]')).toBeVisible();
    await expect(page.locator('[data-testid="constructor-item"]')).toHaveCount(2);
    await expect(page.locator('[data-testid="constructor-bun-bottom"]')).toBeVisible();

    const orderButton = page.locator('[data-testid="order-button"]');
    await orderButton.click();

    const orderModal = page.locator('[data-testid="order-modal"]');
    await expect(orderModal).toBeVisible({ timeout: 10000 });
    await expect(orderModal).toContainText('12345');

    const closeButton = page.locator('[data-testid="modal-close"]');
    await closeButton.click();
    await expect(orderModal).not.toBeVisible();

    await expect(page.locator('[data-testid="constructor-bun-top"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="constructor-item"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="constructor-bun-bottom"]')).not.toBeVisible();

    await expect(page.locator('text=Выберите булки').first()).toBeVisible();
    await expect(page.locator('text=Выберите начинку').first()).toBeVisible();
  });
});