const { chromium } = require("playwright");
const fs = require("fs");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const reportPath = "file://" + __dirname + "/allure-report/index.html";

  try {
    await page.goto(reportPath, { waitUntil: "networkidle" });

    // Inject CSS to hide code blocks
    await page.addStyleTag({
      content: `
        pre, .CodeSnippet__code, .CodeSnippet {
          display: none !important;
        }
      `,
    });

    await page.pdf({
      path: "AllureReport.pdf",
      format: "A4",
      printBackground: true,
    });

    console.log(
      "✅ PDF report generated: AllureReport.pdf (steps only, no code)"
    );
  } catch (err) {
    console.error("❌ Failed to generate PDF:", err);
  }

  await browser.close();
})();
