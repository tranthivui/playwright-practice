import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.page";
import { InventoryPage } from "../pages/InventoryPage.page";
import { users } from "../data/users";
import { CartPage } from "../pages/CartPage.page";
type PageFixture = {
    loginPage: LoginPage,
    inventoryPage: InventoryPage,
    loggedInventoryPage: InventoryPage,
    cartPage: CartPage
};
export const test = base.extend<PageFixture>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    },
    loggedInventoryPage: async({loginPage,page},use)=>{
        const inventoryPage=new InventoryPage(page);
        await loginPage.goto();
        await loginPage.loginFunction(users.standard.username,users.standard.password);
        await page.waitForURL(inventoryPage.url);
        await use(inventoryPage);
    },
    cartPage: async({loggedInventoryPage,page},use)=>{
        const cartpage=new CartPage(page);
        await use(cartpage);
    }
})