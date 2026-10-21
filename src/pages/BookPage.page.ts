import { Locator, Page } from "@playwright/test";

export class BookPage{
    readonly url="/books";
    readonly page: Page;
    readonly listBook: Locator;
    readonly pageInfo: Locator;

    constructor(page: Page){
        this.page=page;
        this.listBook=this.page.getByRole("table").getByRole("link");
        this.pageInfo=this.page.getByText(/^Page \d+ of \d+$/);
    }

    async goto(){
        await this.page.goto(this.url);
    }
}