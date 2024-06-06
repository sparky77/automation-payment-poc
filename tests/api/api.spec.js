const { test, expect } = require('@playwright/test');

test('should return all payment types', async ({ request }) => {
  const response = await request.get('/api/payment-types');
  expect(response.ok()).toBeTruthy();
  const paymentTypes = await response.json();
  expect(paymentTypes).toContain('Credit Card');
  expect(paymentTypes).toContain('PayPal');
});

test('should validate credit card payment', async ({ request }) => {
  const response = await request.post('/api/validate-payment', {
    data: {
      type: 'Credit Card',
      details: {
        cardNumber: '4111111111111111',
        expiryMonth: '12',
        expiryYear: '2025',
        cvc: '123',
        amount: '100.00',
        currency: 'USD'
      }
    }
  });
  expect(response.ok()).toBeTruthy();
  const validationResult = await response.json();
  expect(validationResult.valid).toBe(true);
});

test('should submit payment and get transaction ID', async ({ request }) => {
  const response = await request.post('/api/submit-payment', {
    data: {
      type: 'Credit Card',
      details: {
        cardNumber: '4111111111111111',
        expiryMonth: '12',
        expiryYear: '2025',
        cvc: '123',
        amount: '100.00',
        currency: 'USD'
      }
    }
  });
  expect(response.ok()).toBeTruthy();
  const result = await response.json();
  expect(result.success).toBe(true);
  expect(result.transactionId).toBeDefined();
});
