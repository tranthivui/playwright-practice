export type User = {
    username: string,
    password: string;
};

export const invalidLoginCase = [
    {
        case: "locked user",
        user_name: "locked_out_user",
        password: "secret_sauce",
        errorMess: "Epic sadface: Sorry, this user has been locked out."
    },
    {
        case: "wrong password",
        user_name: "standard_user",
        password: "wrong_password",
        errorMess: "Epic sadface: Username and password do not match any user in this service"
    }
];

export const validUsers = {
    standard: { username: "standard_user", password: "secret_sauce" }
} satisfies Record<string, User>;

