import { test } from "../src/fixtures/page.fixture";
import { allItems, Item, items, sortOptions } from "../src/data/items";
import { expect } from "@playwright/test";
import { parsePrice } from "../src/utils/price";

test.describe("Verify function add and remove", () => {
    const testData = {
        totalItemsInCart: 2,
        totalAfterRemove: 1,
        sortType: "Price (high to low)"
    };
    test("Verify add item to cart", async ({ loggedInventoryPage, cartPage }) => {
        await test.step("Add item backpack to cart", async () => {
            await loggedInventoryPage.clickAddToCart(items.backpack.name);
        });
        await test.step("Add item Bike Light to cart", async () => {
            await loggedInventoryPage.clickAddToCart(items.bikelight.name);
        });
        await test.step("Verify cart have 2 items", async () => {
            await expect(loggedInventoryPage.cartBadge).toHaveText(testData.totalItemsInCart.toString());
        });
        await test.step("Verify button change to Remove", async () => {
            await expect(loggedInventoryPage.getRemoveBtn(items.backpack.name)).toBeVisible();
            await expect(loggedInventoryPage.getRemoveBtn(items.bikelight.name)).toBeVisible();
        });
        await test.step("Click cart", async () => {
            await loggedInventoryPage.clickCart();
        });
        await test.step("Verify url contains cart.html", async () => {
            await expect(cartPage.page).toHaveURL(cartPage.url);
        });
        await test.step("Verify cart items name and price", async () => {
            const listCartItems = cartPage.listItems;
            await expect(listCartItems).toHaveCount(testData.totalItemsInCart);
            await expect(cartPage.getItem(items.backpack.name)).toBeVisible();
            await expect(cartPage.getItem(items.bikelight.name)).toBeVisible();
            await expect(cartPage.getItemPrice(items.backpack.name)).toHaveText(items.backpack.price);
            await expect(cartPage.getItemPrice(items.bikelight.name)).toHaveText(items.bikelight.price);
        });
    });
    test("Verify remove cart item", async ({ loggedInventoryPage, cartPage }) => {
        await test.step("Add item backpack to cart", async () => {
            await loggedInventoryPage.clickAddToCart(items.backpack.name);
        });
        await test.step("Add item Bike Light to cart", async () => {
            await loggedInventoryPage.clickAddToCart(items.bikelight.name);
        });
        await test.step("Verify cart have 2 items", async () => {
            await expect(loggedInventoryPage.cartBadge).toHaveText(testData.totalItemsInCart.toString());
        });
        await test.step("Click cart", async () => {
            await loggedInventoryPage.clickCart();
        });
        await test.step("Remove item Sauce labs Bike Light", async () => {
            await cartPage.removeItem(items.bikelight.name);
        });
        await test.step("Verify cart have 1 items", async () => {
            await expect(cartPage.listItems).toHaveCount(testData.totalAfterRemove);
        });
        await test.step("Verify item is Sauce Labs Backpack", async () => {
            await expect(cartPage.getItem(items.backpack.name)).toBeVisible();
        });
        await test.step("Verify cart badge show 1", async () => {
            await expect(cartPage.cartBadge).toHaveText(testData.totalAfterRemove.toString());
        })
    });

    for (const sortOption of sortOptions) {
        test(`Sort by: ${sortOption.option}`, async ({ loggedInventoryPage }) => {
            await test.step("Choose sort option", async () => {
                await loggedInventoryPage.selectSortOption(sortOption.option);
            });
            const expectedList = allItems.map(Item => Item[sortOption.sortBy]);
            expectedList.sort((a, b) => sortOption.sortBy === 'price'
                ? parsePrice(a) - parsePrice(b)
                : a.localeCompare(b));
            if (sortOption.direction === 'desc') {
                expectedList.reverse();
            }
            await test.step("Verify sort correct", async () => {
                const actualListLocator = sortOption.sortBy === 'name'
                    ? loggedInventoryPage.listItemNames
                    : loggedInventoryPage.listItemPrices;
                await expect(actualListLocator).toHaveText(expectedList);
            });
            await test.step("Verify select option show sortOption",async()=>{
                await expect(loggedInventoryPage.orderTypeActive).toHaveText(sortOption.option);
            });
        })
    };

    test("Add item to cart after order", async ({ loggedInventoryPage, cartPage }) => {
        await test.step("Sort items", async () => {
            await loggedInventoryPage.selectSortOption(testData.sortType);
        });
        await test.step("Add item to cart", async () => {
            await loggedInventoryPage.clickAddToCart(items.bikelight.name);
        });
        await test.step("Verify cart badge is 1", async () => {
            await expect(cartPage.cartBadge).toHaveText(testData.totalAfterRemove.toString());
        });
        await test.step("Verify item show button remove", async () => {
            await expect(loggedInventoryPage.getRemoveBtn(items.bikelight.name)).toBeVisible();
        })
    })
})