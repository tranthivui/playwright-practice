import { Locator, Page } from "@playwright/test";

export class OverViewPage {
    readonly url = "checkout-step-two.html";
    readonly page: Page;
    readonly finishBtn: Locator;
    readonly listItems: Locator;
    readonly itemTotal: Locator;
    readonly tax: Locator;
    readonly total: Locator;


    constructor(page: Page) {
        this.page = page;
        this.finishBtn = this.page.getByRole("button", { name: "Finish" });
        this.listItems = this.page.locator("[data-test='inventory-item']");
        this.itemTotal = this.page.locator("[data-test='subtotal-label']");
        this.tax = this.page.locator("[data-test='tax-label']");
        this.total = this.page.locator("[data-test='total-label']");
    }

    async clickFinishBtn() {
        this.finishBtn.click();
    }

    getItem(itemName: string): Locator {
        return this.listItems.filter({ has: this.page.getByText(itemName, { exact: true }) });
    }

    getItemPrice(itemName: string): Locator {
        const item = this.getItem(itemName);
        return item.locator("[data-test='inventory-item-price']");
    }

    getItemName(item: Locator): Locator {
        return item.locator("[data-test='inventory-item-name']")
    }

}