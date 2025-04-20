const fs = require("fs");
const path = require("path");

async function saveScreenshot(page, testInfo, stepName) {
  const dir = path.resolve("screenshots");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const filePath = path.join(dir, `${testInfo.title}-${stepName}.png`);
  await page.screenshot({ path: filePath, fullPage: true });
}
module.exports = { saveScreenshot };
