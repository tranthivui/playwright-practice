export type Customer={
    firstName:string,
    lastName:string,
    postalCode:string
}
export const customers={
    customer: {firstName:"Auto",lastName:"Test",postalCode:"1000000"}
}satisfies Record<string,Customer>

