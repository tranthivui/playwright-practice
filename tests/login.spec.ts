import { expect } from "@playwright/test";
import { test } from "../src/fixtures/page.fixture";
import { invalidLoginCase, validUsers } from "../src/data/users";
test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Verify login function", () => {
    const testData = {
        loginUrl: "/",
        productUrl: "/inventory.html",
        heading: "Products"
    };

    test.beforeEach("Goto login page", async ({ loginPage }) => {
        await loginPage.goto();
    })

    test("Verify login success", async ({ loginPage, inventoryPage }) => {
        await test.step("Fill info and click login", async () => {
            await loginPage.loginFunction(validUsers.standard.username, validUsers.standard.password);
        });
        await test.step("Verify login success", async () => {
            await expect(inventoryPage.page).toHaveURL(testData.productUrl);
            await expect(inventoryPage.heading).toHaveText(testData.heading);
        })
    });

    for (const user of invalidLoginCase) {
        test(`Login with user: ${user.case}`, async ({ loginPage, inventoryPage }) => {
            await test.step("Fill login info", async () => {
                await loginPage.loginFunction(user.user_name, user.password);
            });
            await test.step("Verify", async () => {
                await expect(loginPage.page).toHaveURL(url => url.pathname == testData.loginUrl);
                await expect(loginPage.errorMess).toHaveText(user.errorMess);
            })
        })
    }
})