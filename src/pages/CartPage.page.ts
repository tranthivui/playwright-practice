import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.page";

export class CartPage extends BasePage {
    readonly url = "/cart.html";
    readonly page: Page;
    readonly listCartItems: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.listCartItems = this.page.locator("[data-test='inventory-item']")
    }

    getItem(itemName: string): Locator {
        return this.listCartItems.filter({ has: this.page.getByText(itemName, { exact: true }) });
    }

    getItemPrice(itemName: string): Locator {
        const item = this.getItem(itemName);
        return item.locator("[data-test='inventory-item-price']");
    }

    getRemoveBtn(itemName: string): Locator {
        const item = this.getItem(itemName);
        return item.getByRole("button", { name: "Remove" });
    }

    async removeItem(itemName: string) {
        await this.getRemoveBtn(itemName).click();
    }
}