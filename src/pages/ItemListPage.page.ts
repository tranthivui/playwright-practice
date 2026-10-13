import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.page";

export class ItemListPage extends BasePage{
    readonly listItems: Locator;
    readonly listItemNames: Locator;
    readonly listItemPrices: Locator;

    constructor(page:Page){
        super(page);
        this.listItems=this.page.locator("[data-test='inventory-item']");
        this.listItemNames=this.page.locator("[data-test='inventory-item-name']");
        this.listItemPrices=this.page.locator("[data-test='inventory-item-price']");
    }

    getItem(itemName: string): Locator {
        return this.listItems.filter({ has: this.page.getByText(itemName, { exact: true }) });
    }

    getItemPrice(itemName: string): Locator {
        const item = this.getItem(itemName);
        return item.locator("[data-test='inventory-item-price']");
    }
}