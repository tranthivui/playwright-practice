import { expect } from "@playwright/test"
import { items } from "../src/data/items"
import { test } from "../src/fixtures/page.fixture"
import { CheckOutPage } from "../src/pages/CheckOutPage.page"
import { InventoryPage } from "../src/pages/InventoryPage.page"
import { parsePrice } from "../src/utils/price"
import { investors } from "../src/data/investor"
test.describe("Verify checkout function", async () => {
    const testData = {
        totalCheckoutItems: 1,
        missingFirstNameMess: "Error: First Name is required"
    }
    test("Verify checkout step 1", async ({ loggedInventoryPage, checkOutPage, cartPage, overViewPage, compeletedPage }) => {
        await test.step("Add procduct", async () => {
            await loggedInventoryPage.clickAddToCart(items.backpack.name);
        });
        await test.step("Click cart to checkout", async () => {
            await loggedInventoryPage.clickCart();
        });
        await test.step("Click checkout", async () => {
            await cartPage.clickCheckOut();
        })
        await test.step("Verify go to checkout page", async () => {
            await expect(checkOutPage.page).toHaveURL(checkOutPage.url);
        });
        await test.step("Fill checkout info", async () => {
            await checkOutPage.fillCheckOutInfo(investors.auto.firstName, investors.auto.lastName, investors.auto.postalCode);
        });
        await test.step("Click continute", async () => {
            await checkOutPage.clickContinute();
        });
        await test.step("Verify go to checkout step 2", async () => {
            await expect(overViewPage.page).toHaveURL(overViewPage.url);
        });
        await test.step("Verify have 1 item and correct name/price", async () => {
            await expect(overViewPage.listItems).toHaveCount(testData.totalCheckoutItems);
            await expect(overViewPage.getItemName(overViewPage.listItems.first())).toHaveText(items.backpack.name);
            await expect(overViewPage.getItemPrice(items.backpack.name)).toHaveText(items.backpack.price);
        });
        await test.step("Verify item total/tax/total", async () => {
            await expect(overViewPage.itemTotal).toBeVisible();
            await expect(overViewPage.tax).toBeVisible();
            await expect(overViewPage.total).toBeVisible();
            const tax = parsePrice(await overViewPage.tax.innerText());
            const total = parsePrice(await overViewPage.total.innerText());
            const itemTotal = parsePrice(await overViewPage.itemTotal.innerText());
            expect(total).toBe(itemTotal + tax);
        });
        await test.step("Click finish at step 2", async () => {
            await overViewPage.clickFinishBtn();
        });
        await test.step("Verify go to completed page", async () => {
            await expect(compeletedPage.page).toHaveURL(compeletedPage.url);
            await expect(compeletedPage.thankOrderMess).toBeVisible();
            await expect(compeletedPage.cartBadge).not.toBeVisible();
        });
    });

    test("Verify missing first name", async ({ loggedInventoryPage, checkOutPage, cartPage, overViewPage, compeletedPage }) => {
        await test.step("Add procduct", async () => {
            await loggedInventoryPage.clickAddToCart(items.backpack.name);
        });
        await test.step("Click cart to checkout", async () => {
            await loggedInventoryPage.clickCart();
        });
        await test.step("Click checkout", async () => {
            await cartPage.clickCheckOut();
        })
        await test.step("Verify go to checkout page", async () => {
            await expect(checkOutPage.page).toHaveURL(checkOutPage.url);
        });
        await test.step("Fill checkout info with missing first name", async () => {
            await checkOutPage.fillLastName(investors.auto.lastName);
            await checkOutPage.fillPostalCode(investors.auto.postalCode);
            await checkOutPage.clickContinute();
        });
        await test.step("Verify still at checkout page and show error", async () => {
            await expect(checkOutPage.page).toHaveURL(checkOutPage.url);
            await expect(checkOutPage.missingFistNameMess).toHaveText(testData.missingFirstNameMess);
            await expect(checkOutPage.missingFistNameMess).toHaveText(testData.missingFirstNameMess);
        })
    })
})
