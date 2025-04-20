// Page Object Model utk mempermudah maintenance dan reusable
const { expect } = require("@playwright/test");

class LoginPage {
  constructor(page) {
    this.page = page;

    // Login
    this.usernameInput = page.getByPlaceholder("Input Email");
    this.passwordInput = page.getByPlaceholder("Input Password");
    this.loginButton = page.locator("button[type='submit']");
    this.headingLogin = page.locator(
      "//div[@class='tracking-tight text-2xl font-bold text-center']"
    );
  }

  async gotoLoginPage() {
    await this.page.goto("http://localhost:5173/admin/login");
  }

  async verifyLoginPage() {
    await expect(this.headingLogin).toBeVisible();
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = LoginPage;
