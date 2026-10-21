import { Locator, Page } from "playwright";

export class BookPage{
    readonly url="https://demoqa.com/books";
    readonly page: Page;
    readonly listBook: Locator;
    readonly loginBtn: Locator;
    readonly pageInfo: Locator;

    constructor(page: Page){
        this.page=page;
        this.listBook=this.page.getByRole("table").getByRole("link");
        this.loginBtn=this.page.getByRole("button",{name: "Login"});
        this.pageInfo=this.page.getByText(/^Page \d+ of \d+$/);
    }

    async getBookTitke(book: Locator): Promise<string>{
        return await book.locator("//a").innerText();
    }

    async goto(){
        await this.page.goto(this.url);
    }
}