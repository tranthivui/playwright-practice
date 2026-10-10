export type Investors={
    firstName:string,
    lastName:string,
    postalCode:string
}
export const investors={
    auto: {firstName:"Auto",lastName:"Test",postalCode:"1000000"}
}satisfies Record<string,Investors>