import { test, expect } from '@playwright/test';

test.describe('shorten URL flow', () => {
  test('success: short URL is encoded into the QR', async ({ page }) => {
    await page.route('**/api/shorten', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ id: 'abc123', shortUrl: 'https://s.qr-generator-site.pages.dev/abc123' })
      });
    });

    await page.goto('/');
    await page.getByPlaceholder('https://example.com').fill('https://very-long-url.com/foo?bar=baz');
    await page.getByRole('button', { name: 'Shorten URL' }).click();
    await expect(page.getByRole('button', { name: 'Copy' })).toBeVisible();

    const urlInput = page.locator('input[readonly]').first();
    await expect(urlInput).toHaveValue('https://s.qr-generator-site.pages.dev/abc123');
  });

  test('network error: long URL remains encoded in QR', async ({ page }) => {
    await page.route('**/api/shorten', (route) => route.abort('failed'));

    await page.goto('/');
    await page.getByPlaceholder('https://example.com').fill('https://very-long-url.com/foo');
    await page.getByRole('button', { name: 'Shorten URL' }).click();
    await expect(page.getByRole('alert')).toContainText(/connection|long URL/i);

    const input = page.getByPlaceholder('https://example.com');
    await expect(input).toHaveValue('https://very-long-url.com/foo');
  });

  test('4xx: validation message is shown inline', async ({ page }) => {
    await page.route('**/api/shorten', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'blocked-scheme', message: 'Only http and https are allowed' })
      });
    });

    await page.goto('/');
    await page.getByPlaceholder('https://example.com').fill('https://example.com');
    await page.getByRole('button', { name: 'Shorten URL' }).click();
    await expect(page.getByRole('alert')).toContainText(/http and https/);
  });
});
