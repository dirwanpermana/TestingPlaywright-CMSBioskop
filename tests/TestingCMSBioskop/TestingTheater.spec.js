const { test, expect } = require("@playwright/test");
const LoginBioskop = require("../../pages/FunctionsCMSBioskop/LoginCMS");
const {
  saveScreenshot,
} = require("../../pages/FunctionsCMSBioskop/screenshoots");

test.beforeEach(async ({ page }, testInfo) => {
  await test.step("Login dan Pilih Menu Genre", async () => {
    const logincms = new LoginBioskop(page, testInfo);
    await logincms.loginCMS("admin@gmail.com", "Password5");

    //Menu Theater
    await page.locator("//a[normalize-space()='Theaters']").click();
    const verifyTheater = page.locator(
      "h1[class='text-lg font-semibold m:text-2xl']"
    );
    await expect(verifyTheater).toHaveText("List Theater");
  });
});

const dataTheater = "Layar Tancep";
const editTheater = "Bioskop Keliling";

test("Menambah data Theater baru", async ({ page }) => {
  await test.step("Klik button Add Data Theater ", async () => {
    await page
      .locator(
        "body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > main:nth-child(2) > div:nth-child(2) > a:nth-child(1)"
      )
      .click();
    const verifyFormTheater = page.locator(
      "h1[class='text-lg font-semibold m:text-2xl']"
    );
    await expect(verifyFormTheater).toHaveText("Create data theater");
  });

  await test.step("Input data Theater baru ", async () => {
    await page.getByPlaceholder("Enter name...").fill("Layar Tancep");
    await page.locator("select[aria-hidden='true']").selectOption("Medan");

    await page.locator("//button[normalize-space()='Submit']").click();
  });

  await test.step("Verify data theater baru ", async () => {
    const verifyNewTheater = page.locator(
      "//td[normalize-space()='Layar Tancep']"
    );
    await expect(verifyNewTheater).toHaveText("Layar Tancep");
  });
});

test("Lakukan Edit Theater", async ({ page }) => {
  await test.step("Klik button Edit data theater", async () => {
    await page
      .locator("tr", { hasText: "Layar Tancep" })
      .locator("a:has-text('Edit')")
      .click();
  });
  await test.step("Edit data theater", async () => {
    await page.getByPlaceholder("Enter name...").fill(editTheater);
    await page.locator("//button[normalize-space()='Submit']").click();
  });

  await test.step("Verify data theater yang berhasil di edit ", async () => {
    const verifyNewTheater = page.locator(
      "//td[normalize-space()='Bioskop Keliling']"
    );
    await expect(verifyNewTheater).toHaveText(`${editTheater}`);
  });
});
