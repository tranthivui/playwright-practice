export type User = {
    type: UserType,
    username: string,
    password: string;
};
type UserType="standard" | "locked" | "wrongPassword";
export const users = {
    standard: { type: "standard", username: "standard_user", password: "secret_sauce" },
    locked: { type: "locked", username: "locked_out_user", password: "secret_sauce" },
    wrongPassword: { type: "wrongPassword",username: "standard_user", password: "wrong_password" }
} satisfies Record<UserType, User>;

export const listUsers=Object.values(users);
