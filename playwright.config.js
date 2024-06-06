// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  timeout: 60000,
  retries: 1,
  testDir: './tests',
  use: {
    baseURL: process.env.BASE_URL || 'https://payment-poc-production.up.railway.app',
    headless: true,
  },
});