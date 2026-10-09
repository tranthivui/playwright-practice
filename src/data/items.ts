export type Item={
    name: string,
    price: string;
};

export const items = {
    backpack:{name: "Sauce Labs Backpack",price:"$29.99"},
    bikelight:{name:"Sauce Labs Bike Light",price:"$9.99"}
} satisfies Record<string, Item>;