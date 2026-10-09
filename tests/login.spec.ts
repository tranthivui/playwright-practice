import { expect } from "@playwright/test";
import { test } from "../src/fixtures/page.fixture";
import { users } from "../src/data/users";
test.describe("Verify login function", () => {
    const testData = {
        loginUrl: "/",
        productUrl: "/inventory.html",
        heading: "Products",
        errorWrongInfo: "Epic sadface: Username and password do not match any user in this service",
        errorLocked: "Epic sadface: Sorry, this user has been locked out."
    };

    test.beforeEach("Goto login page", async ({ loginPage }) => {
        await loginPage.goto();
    })

    test("Verify login success", async ({ loginPage, inventoryPage }) => {
        await test.step("Fill info and click login", async () => {
            await loginPage.loginFunction(users.standard.username, users.standard.password);
        });
        await test.step("Verify login success", async () => {
            await expect(inventoryPage.page).toHaveURL(testData.productUrl);
            await expect(inventoryPage.heading).toHaveText(testData.heading);
        })
    });

    test("Login with locked user", async ({ loginPage }) => {
        await test.step("Fill info and click login", async () => {
            await loginPage.loginFunction(users.locked.username, users.locked.password);
        });
        await test.step("Verify url and error message", async () => {
            await expect(loginPage.page).toHaveURL(url => url.pathname == testData.loginUrl);
            await expect(loginPage.errorMess).toHaveText(testData.errorLocked);
        })
    });

    test("Login with wrong password", async ({ loginPage }) => {
        await test.step("Fill info and click login", async () => {
            await loginPage.loginFunction(users.wrongPassword.username, users.wrongPassword.password);
        });
        await test.step("Verify url and error message", async () => {
            await expect(loginPage.page).toHaveURL(url => url.pathname == testData.loginUrl);
            await expect(loginPage.errorMess).toHaveText(testData.errorWrongInfo);
        })
    });
})