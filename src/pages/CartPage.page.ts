import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.page";
import { ItemListPage } from "./ItemListPage.page";

export class CartPage extends ItemListPage {
    readonly url = "/cart.html";
    readonly checkOutBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.checkOutBtn = this.page.getByRole("button", { name: "Checkout" })
    }

    getRemoveBtn(itemName: string): Locator {
        const item = this.getItem(itemName);
        return item.getByRole("button", { name: "Remove" });
    }

    async removeItem(itemName: string) {
        await this.getRemoveBtn(itemName).click();
    }

    async clickCheckOut() {
        await this.checkOutBtn.click();
    }
}
