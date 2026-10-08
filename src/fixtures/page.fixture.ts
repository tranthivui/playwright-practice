import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.page";
import { Product } from "../pages/product.page";
type PageFixture = {
    loginPage: LoginPage,
    product: Product;
};
export const test = base.extend<PageFixture>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    product: async ({ page }, use) => {
        const product = new Product(page);
        await use(product);
    }
})