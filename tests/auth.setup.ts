import {test as setup} from "../src/fixtures/page.fixture";
import { users } from "../src/data/users";
import { LoginPage } from "../src/pages/LoginPage.page";
import { AUTH_FILE } from "../src/config/paths";

setup("Login as standard user",async({loginPage,page,inventoryPage})=>{
    await loginPage.goto();
    await loginPage.loginFunction(users.standard.username,users.standard.password);
    await page.waitForURL(inventoryPage.url);
    await page.context().storageState({path: AUTH_FILE});
}) 