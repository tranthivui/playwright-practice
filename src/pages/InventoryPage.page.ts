import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.page";

export class InventoryPage extends BasePage {
    page: Page;
    readonly url = "/inventory.html";
    readonly heading: Locator;
    readonly listItems: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.heading = this.page.locator("[data-test='title']");
        this.listItems = this.page.locator("[data-test='inventory-item']")
    }

    getItem(itemName: string): Locator {
        return this.listItems.filter({ has: this.page.getByText(itemName, { exact: true }) });
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
}