export function parsePrice(price:string):number {
    let newPrice=price.replace("$","");
    return parseFloat(newPrice);
}