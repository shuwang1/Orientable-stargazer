import { test, expect } from '@playwright/test';

test('basic UI test', async ({ page }) => {
  await page.goto('/');

  // Expect title to be correct
  await expect(page).toHaveTitle(/Orientable Skyview/);

  // Check if RECALCULATE button exists
  const recalculateBtn = page.locator('#btn-recalculate');
  await expect(recalculateBtn).toBeVisible();

  // Click RECALCULATE
  await recalculateBtn.click();

  // Wait for some charts to be updated/visible
  const skychart = page.locator('#skychart');
  await expect(skychart).toBeVisible();

  const nsatchart = page.locator('#nsatchart');
  await expect(nsatchart).toBeVisible();
});
