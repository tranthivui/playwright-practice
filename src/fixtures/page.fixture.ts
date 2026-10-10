import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.page";
import { InventoryPage } from "../pages/InventoryPage.page";
import { users } from "../data/users";
import { CartPage } from "../pages/CartPage.page";
import { CheckOutPage } from "../pages/CheckOutPage.page";
import { OverViewPage } from "../pages/OverViewPage.page";
import { CompletedPage } from "../pages/CompletedPage.page";
type PageFixture = {
    loginPage: LoginPage,
    inventoryPage: InventoryPage,
    loggedInventoryPage: InventoryPage,
    cartPage: CartPage,
    checkOutPage: CheckOutPage,
    overViewPage: OverViewPage,
    compeletedPage: CompletedPage
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
    loggedInventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.goto();
        await inventoryPage.page.waitForURL(inventoryPage.url);
        await use(inventoryPage);
    },
    cartPage: async ({ page }, use) => {
        const cartpage = new CartPage(page);
        await use(cartpage);
    },
    checkOutPage: async({page},use)=>{
        const checkOutPage=new CheckOutPage(page);
        await use(checkOutPage);
    },
    overViewPage: async({page},use)=>{
        const overViewPage=new OverViewPage(page);
        await use(overViewPage);
    },
    compeletedPage: async({page},use)=>{
        const compeletedPage=new CompletedPage(page);
        await use(compeletedPage);
    }
})