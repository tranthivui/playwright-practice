import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.page";
import { ItemListPage } from "./ItemListPage.page";

export class InventoryPage extends ItemListPage {
    readonly url = "/inventory.html";
    readonly heading: Locator;
    
    constructor(page: Page) {
        super(page);
        this.heading = page.locator("[data-test='title']");
    }

    getAddToCartBtn(itemName: string): Locator {
        const item = this.getItem(itemName);
        return item.getByRole("button", { name: "Add to cart" });
    }

    getRemoveBtn(itemName: string): Locator {
        const item = this.getItem(itemName);
        return item.getByRole("button", { name: "Remove" });
    }

    async clickRemove(itemName: string) {
        await this.getRemoveBtn(itemName).click();
    }

    async clickAddToCart(itemName: string) {
        await this.getAddToCartBtn(itemName).click();
    }

    async goto() {
        await this.page.goto(this.url);
    }
}