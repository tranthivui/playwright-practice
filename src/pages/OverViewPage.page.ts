import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.page";
import { ItemListPage } from "./ItemListPage.page";

export class OverViewPage extends ItemListPage{
    readonly url = "checkout-step-two.html";
    readonly finishBtn: Locator;
    readonly itemTotal: Locator;
    readonly tax: Locator;
    readonly total: Locator;


    constructor(page: Page) {
        super(page);
        this.finishBtn = this.page.getByRole("button", { name: "Finish" });
        this.itemTotal = this.page.locator("[data-test='subtotal-label']");
        this.tax = this.page.locator("[data-test='tax-label']");
        this.total = this.page.locator("[data-test='total-label']");
    }

    async clickFinishBtn() {
        await this.finishBtn.click();
    }

    getItemName(item: Locator): Locator {
        return item.locator("[data-test='inventory-item-name']")
    }

}