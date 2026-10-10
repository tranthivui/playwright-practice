import { Locator, Page } from "@playwright/test";

export class CheckOutPage {
    readonly url = "/checkout-step-one.html";
    readonly page: Page;
    readonly firstname: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continuteBtn: Locator;
    readonly missingFistNameMess: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstname = this.page.getByRole("textbox", { name: "First Name" });
        this.lastName = this.page.getByRole("textbox", { name: "Last Name" });;
        this.postalCode = this.page.getByRole("textbox", { name: "Zip/Postal Code" });
        this.continuteBtn = this.page.getByRole("button", { name: "Continue" });
        this.missingFistNameMess = this.page.locator("[data-test='error']")
    }

    async fillFirstName(firstName: string) {
        await this.firstname.fill(firstName);
    }

    async fillLastName(lastName: string) {
        await this.lastName.fill(lastName);
    }

    async fillPostalCode(postalCode: string) {
        await this.postalCode.fill(postalCode);
    }

    async clickContinute() {
        await this.continuteBtn.click();
    }

    async fillCheckOutInfo(firstName: string, lastName: string, postalCode: string) {
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.fillPostalCode(postalCode);
    }
}