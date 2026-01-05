const { test, expect } = require('@playwright/test');

test('Group Generator overwrites display and Pick Random restores it', async ({ page }) => {
  // Go to the local page
  // Assuming the file is served or opened directly.
  // Since we are in a sandbox, we might need to serve it or open file://
  // For simplicity, let's assume we can open it via file:// if we get the absolute path,
  // or verify if we can start a simple http server.
  // I'll start a simple python server in the background in another step, so here I assume localhost:8000

  await page.goto('http://localhost:8000/index.html');

  // Wait for app to be ready (auth fallback to local happens after 3.5s timeout usually, or faster if failed)
  // We can look for the "ClassroomTools" header or the Nav
  await expect(page.locator('text=ClassroomTools')).toBeVisible();

  // Wait for the "Picker" navigation button and click it
  await page.click('text=Picker');

  // Verify we are in the Picker tool
  await expect(page.locator('text=Ready to Pick!')).toBeVisible();

  // Click "Pairs" (Group Generator)
  // It has data-size="2" and text "Pairs"
  await page.click('button:has-text("Pairs")');

  // Verify the display is overwritten.
  // "Ready to Pick!" should be gone.
  await expect(page.locator('text=Ready to Pick!')).not.toBeVisible();
  // "Group 1" should be visible
  await expect(page.locator('text=Group 1')).toBeVisible();

  // Click "PICK RANDOM"
  await page.click('#pick-one-btn');

  // Verify that the display is restored.
  // The animation starts, showing a student name or emoji.
  // The original text "Ready to Pick!" is gone, but the container #result-content should be there and populated.

  // We can check if #result-content exists
  const resultContent = page.locator('#result-content');
  await expect(resultContent).toBeVisible();

  // Wait a bit to ensure animation plays or at least something happens
  // The animation overwrites #result-content innerHTML
  // We should see a student name eventually.
  // Since we are in local mode, students are 'Skylar', 'Terrell', etc.
  // Let's just wait for one of the known names to appear in the result content?
  // Or just check that it's not empty.

  // Wait for the animation to finish (2 seconds duration + buffer)
  await page.waitForTimeout(2500);

  // Check for "The Winner Is" text which appears at the end
  await expect(page.locator('text=The Winner Is')).toBeVisible();
});
