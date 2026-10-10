import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.page";

export class CompletedPage extends BasePage {
    readonly url = "/checkout-complete.html";
    readonly thankOrderMess: Locator;

    constructor(page: Page) {
        super(page);
        this.thankOrderMess = this.page.getByRole("heading", { name: "Thank you for your order!" });
    }
}