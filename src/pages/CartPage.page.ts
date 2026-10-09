import { Locator, Page } from "@playwright/test";

export class CartPage {
    readonly url = "/cart.html";
    page: Page;
    listCartItems: Locator;
    cartPageCartBtn: Locator;
    cartPageCartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.listCartItems = this.page.locator("[data-test='inventory-item']");
        this.cartPageCartBtn = this.page.locator("[data-test='shopping-cart-link']");
        this.cartPageCartBadge = this.cartPageCartBtn.locator("[data-test='shopping-cart-badge']");
    }

    getItem(itemName: string): Locator {
        return this.listCartItems.filter({ has: this.page.getByText(itemName,{exact:true})});
    }

    async getItemName(itemName: string): Promise<string> {
        const item=this.getItem(itemName);
        return (await item.locator("[data-test='inventory-item-name']").innerText());
    }

    async getItemPrice(itemName: string): Promise<Locator> {
        const item=this.getItem(itemName);
        return await item.locator("[data-test='inventory-item-price']");
    }

    getRemoveBtn(itemName:string): Locator{
        const item= this.getItem(itemName);
        return item.getByRole("button",{name:"Remove"});
    }
    
    async removeItem(itemName:string){
        await this.getRemoveBtn(itemName).click();
    }
}