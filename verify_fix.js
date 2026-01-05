
const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to local server
    await page.goto('http://localhost:8000/index.html');

    // Go to Picker tool
    await page.click('text=Picker');

    // Overwrite with pairs
    await page.click('button:has-text("Pairs")');

    // Pick Random to restore
    await page.click('#pick-one-btn');

    // Wait for animation to start
    await page.waitForTimeout(500);

    // Take screenshot of restoration
    await page.screenshot({ path: '/home/jules/verification/restored_picker.png' });

    await browser.close();
})();
