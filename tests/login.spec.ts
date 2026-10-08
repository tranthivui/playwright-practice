import { expect } from "@playwright/test";
import { test } from "../src/fixtures/page.fixture";
import { LoginPage } from "../src/pages/LoginPage.page";

test.describe("Verify login function", () => {
    const testData = {
        productUrl: "/inventory.html",
        heading: "Products",
        user: [
            {
                username: "standard_user",
                password: "secret_sauce"
            },
            {
                username: "locked_out_user",
                password: "secret_sauce"
            },
            {
                username: "standard_user",
                password: "wrong_password"
            }
        ],
        errorWrongInfo: "Epic sadface: Username and password do not match any user in this service",
        errorLocked: "Epic sadface: Sorry, this user has been locked out."
    };

    test.beforeEach("Goto login page", async ({ loginPage }) => {
        await loginPage.page.goto("/");
    })

    test("Verify login success", async ({ loginPage, product }) => {
        await test.step("Fill info and click login", async () => {
            await loginPage.loginFunction(testData.user[0].username, testData.user[0].password);
        });
        await test.step("Verify login success", async () => {
            await expect(product.page).toHaveURL(testData.productUrl);
            await expect(product.heading).toHaveText(testData.heading);
        })
    });

    test("Login with locked user", async ({ loginPage }) => {
        await test.step("Fill info and click login", async () => {
            await loginPage.loginFunction(testData.user[1].username, testData.user[1].password);
        });
        await test.step("Verify login success", async () => {
            await expect(loginPage.page).toHaveURL(process.env.BASE_URL!);
            await expect(loginPage.errorMess).toHaveText(testData.errorLocked);
        })
    });
    test("Login with wrong password", async ({ loginPage }) => {
        await test.step("Fill info and click login", async () => {
            await loginPage.loginFunction(testData.user[2].username, testData.user[2].password);
        });
        await test.step("Verify login success", async () => {
            await expect(loginPage.page).toHaveURL(process.env.BASE_URL!);
            await expect(loginPage.errorMess).toHaveText(testData.errorWrongInfo);
        })
    });
})