// Page Object Model utk mempermudah maintenance dan reusable
const { expect } = require("@playwright/test");

class LogoutPage {
  constructor(page) {
    this.page = page;
    // Logout
    this.dropdownUser = page.locator("button[id='radix-:rc:']");
    const menuItems = {
      account: "My Account",
      settings: "Settings",
      suport: "Suport",
      logout: "Logout",
    };
    this.pilihLogout = page.getByRole("menuitem", { name: menuItems.logout });
  }

  async logout() {
    await this.dropdownUser.click();
    await this.pilihLogout.click();
  }
}

module.exports = LogoutPage;
