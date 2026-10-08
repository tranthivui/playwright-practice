import { Locator, Page } from "@playwright/test";

export class Product {
    page: Page;
    readonly heading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heading = this.page.locator("[data-test='title']");
    }
}