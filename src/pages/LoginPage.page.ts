import { Locator, Page } from "@playwright/test";

export class LoginPage {
    page: Page;
    username: Locator;
    password: Locator;
    loginBtn: Locator;
    errorMess: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = this.page.getByRole("textbox", { name: /^Username$/ });
        this.password = this.page.getByRole("textbox", { name: /^Password$/ });
        this.loginBtn = this.page.getByRole("button", { name: /^Login$/ });
        this.errorMess = this.page.locator("[data-test='error']")
    }

    async fillUsername(username: string) {
        await this.username.fill(username);
    }
    async fillPassword(password: string) {
        await this.password.fill(password);
    }

    async clickLoginBtn() {
        await this.loginBtn.click();
    }

    async loginFunction(username: string, password: string) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginBtn();
    }
}