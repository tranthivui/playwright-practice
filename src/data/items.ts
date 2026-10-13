export type Item={
    name: string,
    price: string;
};

export const items = {
    backpack:{name: "Sauce Labs Backpack",price:"$29.99"},
    bikelight:{name:"Sauce Labs Bike Light",price:"$9.99"},
    boltTShirt:{name: "Sauce Labs Bolt T-Shirt",price:"$15.99"},
    fleeceJacket:{name: "Sauce Labs Fleece Jacket",price:"$49.99"},
    onesie:{name: "Sauce Labs Onesie",price:"$7.99"},
    redTShirt:{name: "Test.allTheThings() T-Shirt (Red)",price:"$15.99"}

} satisfies Record<string, Item>;

type OrderType= "Name (A to Z)" | "Name (Z to A)" | "Price (low to high)" | "Price (high to low)";

export const allItems=Object.values(items);

type SortOption={
    option: OrderType,
    sortBy: "name"|"price",
    direction:"asc"|"desc"
};

export const sortOptions=[
    {
        option: "Name (A to Z)",
        sortBy: "name",
        direction: "asc"
    },
    {
        option: "Name (Z to A)",
        sortBy: "name",
        direction: "desc"
    },
     {
        option: "Price (low to high)",
        sortBy: "price",
        direction: "asc"
    },
    {
        option: "Price (high to low)",
        sortBy: "price",
        direction: "desc"
    }
] satisfies SortOption[];
