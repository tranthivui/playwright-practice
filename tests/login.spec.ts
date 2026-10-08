import { expect } from "@playwright/test";
import { test } from "../src/fixtures/page.fixture";
test.describe("Verify login function", () => {
    const testData = {
        loginUrl:"/",
        productUrl: "/inventory.html",
        heading: "Products",
        userCorrect: {
            username: "standard_user",
            password: "secret_sauce"
        },
        userLocked: {
            username: "locked_out_user",
            password: "secret_sauce"
        },
        userWrongPass: {
            username: "standard_user",
            password: "wrong_password"
        },
        errorWrongInfo: "Epic sadface: Username and password do not match any user in this service",
        errorLocked: "Epic sadface: Sorry, this user has been locked out."
    };

    test.beforeEach("Goto login page", async ({ loginPage }) => {
        await loginPage.goto();
    })

    test("Verify login success", async ({ loginPage, product }) => {
        await test.step("Fill info and click login", async () => {
            await loginPage.loginFunction(testData.userCorrect.username, testData.userCorrect.password);
        });
        await test.step("Verify login success", async () => {
            await expect(product.page).toHaveURL(testData.productUrl);
            await expect(product.heading).toHaveText(testData.heading);
        })
    });

    test("Login with locked user", async ({ loginPage }) => {
        await test.step("Fill info and click login", async () => {
            await loginPage.loginFunction(testData.userLocked.username, testData.userLocked.password);
        });
        await test.step("Verify url and error message", async () => {
            await expect(loginPage.page).toHaveURL(url => url.pathname==testData.loginUrl);
            await expect(loginPage.errorMess).toHaveText(testData.errorLocked);
        })
    });
    test("Login with wrong password", async ({ loginPage }) => {
        await test.step("Fill info and click login", async () => {
            await loginPage.loginFunction(testData.userWrongPass.username, testData.userWrongPass.password);
        });
        await test.step("Verify url and error message", async () => {
            await expect(loginPage.page).toHaveURL(url => url.pathname==testData.loginUrl);
            await expect(loginPage.errorMess).toHaveText(testData.errorWrongInfo);
        })
    });
})