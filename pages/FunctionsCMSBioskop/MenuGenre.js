const { expect } = require("@playwright/test");
const { saveScreenshot } = require("./screenshoots");
const LoginCMS = require("../../pages/FunctionsCMSBioskop/LoginCMS");

class MenuGenre {
  constructor(page, testInfo) {
    this.page = page;
    this.testInfo = testInfo;
    // Inisialisasi LoginBioskop untuk memanggil login
    this.loginBioskop = new LoginBioskop(this.page, this.testInfo);

    this.pilihGenre = page.locator("//a[normalize-space()='Genre']");
    this.verifyGenre = page.locator("//h1[normalize-space()='List Genre']");
  }

  // Fungsi untuk login terlebih dahulu sebelum mengakses menu genre
  async loginAndGotoGenre() {
    // Melakukan login terlebih dahulu
    await this.loginBioskop.loginCMS("admin@gmail.com", "Password5");

    // Setelah login, buka halaman genre
    await this.pilihGenre.click();
    await expect(this.verifyGenre).toHaveText("List Genre");
  }
}

module.exports = MenuGenre;
