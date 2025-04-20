const { test, expect } = require("@playwright/test");
const FungsiLogin = require("../../pages/FunctionsCMSBioskop/fungsiLogin");
const FungsiLogout = require("../../pages/FunctionsCMSBioskop/fungsiLogout");
const {
  saveScreenshot,
} = require("../../pages/FunctionsCMSBioskop/screenshoots");

let loginPage;
let logoutPage;

test.beforeEach(async ({ page }, testInfo) => {
  loginPage = new FungsiLogin(page);
  logoutPage = new FungsiLogout(page); // ← Inisialisasi logoutPage

  // Step 1: Buka halaman login
  await test.step("Akses halaman Login Web CMS dan input valid user", async () => {
    await loginPage.gotoLoginPage();
    await saveScreenshot(page, testInfo, "01-login-page");
  });

  // Step 2: Login
  await test.step("Lakukan Login", async () => {
    await loginPage.login("admin@gmail.com", "Password5");
  });

  // Step 3: Verifikasi dashboard
  await test.step("Verifikasi halaman dashboard", async () => {
    await expect(page).toHaveURL("http://localhost:5173/admin");
    const dashboard = page.locator(
      "h1[class='text-lg font-semibold md:text-2xl']"
    );
    await expect(dashboard).toHaveText("CMS One Cinema");
    await saveScreenshot(page, testInfo, "02-dashboard");
  });
});

// Test spesifik: Logout
test("Melakukan Logout dari Aplikasi", async ({ page }, testInfo) => {
  await test.step("Logout dari aplikasi", async () => {
    await logoutPage.logout(); // ← Fungsi logout
    await loginPage.verifyLoginPage(); // ← Verifikasi kembali ke login
    await saveScreenshot(page, testInfo, "03-logout");
  });
});
