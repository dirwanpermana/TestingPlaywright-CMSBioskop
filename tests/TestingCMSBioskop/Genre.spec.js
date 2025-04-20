const { test, expect } = require("@playwright/test");
const LoginBioskop = require("../../pages/FunctionsCMSBioskop/LoginCMS");
const {
  saveScreenshot,
} = require("../../pages/FunctionsCMSBioskop/screenshoots");

test.beforeEach(async ({ page }, testInfo) => {
  await test.step("Login dan Pilih Menu Genre", async () => {
    const logincms = new LoginBioskop(page, testInfo);
    await logincms.loginCMS("admin@gmail.com", "Password5");

    //Menu Genre
    await page.locator("//a[normalize-space()='Genre']").click();
    const cekGenre = page.locator("//h1[normalize-space()='List Genre']");
    await expect(cekGenre).toHaveText("List Genre");
    //   await saveScreenshot(page, testInfo, "halaman Genre");
  });
});

test("Menambah data Genre dengan kurang dari 5 karakter", async ({
  page,
}, testInfo) => {
  await test.step("Akses form Genre", async () => {
    await page.locator("//a[normalize-space()='Add Data']").click();

    // Verify halaman form Genre
    await expect(page).toHaveURL("http://localhost:5173/admin/genres/create");
    const formGenre = page.locator(
      "h1[class='text-lg font-semibold m:text-2xl']"
    );
    await expect(formGenre).toHaveText("Created data genre");
    // await saveScreenshot(page, testInfo, "Form Genre");
  });

  await test.step("Tambah data genre dengan 2 karakter ", async () => {
    await page.getByPlaceholder("Input Name").fill("actj");
    await page.locator("//button[normalize-space()='Submit']").click();

    const errorKarakterKurang = page.locator(
      "text=String must contain at least 5 character(s)"
    );
    await expect(errorKarakterKurang).toHaveText(
      "String must contain at least 5 character(s)"
    );
    // await saveScreenshot(page, testInfo, "Verify Error Message");
  });
});

test("Verify Button Cancel pada Halaman Form Genre Berfungsi", async ({
  page,
}, testInfo) => {
  await test.step("Akses form Genre", async () => {
    await page.locator("//a[normalize-space()='Add Data']").click();

    // Verify halaman form Genre
    await expect(page).toHaveURL("http://localhost:5173/admin/genres/create");
    const formGenre = page.locator(
      "h1[class='text-lg font-semibold m:text-2xl']"
    );
    await expect(formGenre).toHaveText("Created data genre");
    // await saveScreenshot(page, testInfo, "Form Genre");
  });

  await test.step("Klik button Cancel", async () => {
    await page.locator("//a[normalize-space()='Cancel']").click();
  });

  await test.step("Verify redirect ke halaman Genre", async () => {
    const cekGenre = page.locator("//h1[normalize-space()='List Genre']");
    await expect(cekGenre).toHaveText("List Genre");
    // await saveScreenshot(page, testInfo, "Redirect ke halaman Genre");
  });
});

test("Add Data Genre Baru", async ({ page }, testInfo) => {
  const genreBaru = "Action Comedy";

  await test.step("Akses form Genre", async () => {
    await page.locator("//a[normalize-space()='Add Data']").click();

    // Verify halaman form Genre
    await expect(page).toHaveURL("http://localhost:5173/admin/genres/create");
    const formGenre = page.locator(
      "h1[class='text-lg font-semibold m:text-2xl']"
    );
    await expect(formGenre).toHaveText("Created data genre");
    // await saveScreenshot(page, testInfo, "Form Genre");
  });

  await test.step("Add data genre baru", async () => {
    await page.getByPlaceholder("Input Name").fill(genreBaru);
    // await saveScreenshot(page, testInfo, "Add Genre baru");
    await page.locator("//button[normalize-space()='Submit']").click();
  });

  await test.step("Verify data Genre baru", async () => {
    const listGenre = page.locator("//div[normalize-space()='Action Comedy']");
    await expect(listGenre).toHaveText(genreBaru);

    // await saveScreenshot(page, testInfo, "Redirect ke halaman Genre");
  });
});
