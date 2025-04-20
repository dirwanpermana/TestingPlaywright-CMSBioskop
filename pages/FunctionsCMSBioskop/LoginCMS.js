const { expect } = require("@playwright/test");
const { saveScreenshot } = require("./screenshoots");

class LoginBioskop {
  constructor(page, testInfo) {
    this.page = page;
    this.testInfo = testInfo;

    this.usernameInput = page.getByPlaceholder("Input Email");
    this.passwordInput = page.getByPlaceholder("Input Password");
    this.loginButton = page.locator("button[type='submit']");
    this.headingLogin = page.locator(
      "//div[@class='tracking-tight text-2xl font-bold text-center']"
    );
  }

  async loginCMS(username, password) {
    // Step 1: Go to login page
    await this.page.goto("http://localhost:5173/admin/login");
    await saveScreenshot(this.page, this.testInfo, "01-login-page");

    // Step 2: Fill credentials and login
    await expect(this.headingLogin).toBeVisible();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();

    // Step 3: Verify dashboard
    await expect(this.page).toHaveURL("http://localhost:5173/admin");
    const dashboard = this.page.locator(
      "h1[class='text-lg font-semibold md:text-2xl']"
    );
    await expect(dashboard).toHaveText("CMS One Cinema");

    await saveScreenshot(this.page, this.testInfo, "02-dashboard");
  }
}

module.exports = LoginBioskop;
