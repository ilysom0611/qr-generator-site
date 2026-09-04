import { test, expect } from '@playwright/test';

const LANDING_PAGES = [
  '/qr-code-generator',
  '/url-qr-code',
  '/wifi-qr-code',
  '/vcard-qr-code',
  '/email-qr-code',
  '/phone-qr-code',
  '/sms-qr-code',
  '/location-qr-code',
  '/text-qr-code'
];

for (const path of LANDING_PAGES) {
  test(`landing page ${path} renders with H1 + tool link`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.getByRole('link', { name: /try|open|use/i }).first()).toBeVisible();
  });
}