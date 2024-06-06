const { test, expect } = require('@playwright/test');

test('should navigate to payment page and see form', async ({ page }) => {
  await page.goto('https://payment-poc-production.up.railway.app/index.html');
  //await expect(page.locator('h1')).toHaveText('Payment POC');
  await expect(page.locator('select#paymentType')).toBeVisible();
  //await expect(page.locator('button#submitPayment')).toBeVisible();
});

test('should select payment type and see relevant fields', async ({ page }) => {
  await page.goto('https://payment-poc-production.up.railway.app/index.html');
  await page.selectOption('select#paymentType', 'Credit Card');
  await expect(page.locator('input#amount')).toBeVisible();
  await page.fill('input#amount', '100.00');
  await page.fill('input#cardNumber', '4111111111111111');
  await page.fill('input#expiryMonth', '12');
  await page.fill('input#expiryYear', '2025');
  await page.fill('input#cvc', '123');
  await page.click('button#submitPayment');
  //const result = await page.locator('.result').innerText();
  //expect(result).toContain('Transaction ID:');
});
