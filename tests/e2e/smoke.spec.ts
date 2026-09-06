import { test, expect } from '@playwright/test';
import * as fs from 'fs/promises';

const TYPES: Array<{ id: string; setup: () => Promise<void> }> = [
  { id: 'url', setup: async () => {} }
];

test.describe('tool smoke', () => {
  test('generates PNG for URL type', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('tab', { name: 'URL' }).click();
    await page.getByPlaceholder('https://example.com').fill('https://example.com');
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download PNG' }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/^qr-url-[a-z0-9]{6}\.png$/);
    const path = await download.path();
    const stat = await fs.stat(path!);
    expect(stat.size).toBeGreaterThan(100);
  });

  test('generates SVG for WiFi type', async ({ page }) => {
    await page.goto('/#type=wifi');
    await page.getByLabel('SSID (network name)').fill('TestNet');
    await page.getByLabel('Password').fill('test123');
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download SVG' }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/^qr-wifi-[a-z0-9]{6}\.svg$/);
  });

  test('disables download when URL is invalid', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('https://example.com').fill('   ');
    await expect(page.getByRole('button', { name: 'Download PNG' })).toBeDisabled();
  });
});
