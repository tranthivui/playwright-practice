import { Locator, Page } from "@playwright/test";

export class BasePage{
    readonly page: Page;
    readonly cartLink: Locator;
    readonly cartBadge: Locator;

    constructor(page:Page){
        this.page=page;
        this.cartLink=this.page.locator("[data-test='shopping-cart-link']");
        this.cartBadge = this.cartLink.locator("[data-test='shopping-cart-badge']");
    }
    async clickCart(){
        await this.cartLink.click();
    }
}