import {test as setup} from "../src/fixtures/page.fixture";
import { validUsers } from "../src/data/users";
import { AUTH_FILE } from "../src/config/paths";

setup("Login as standard user",async({loginPage,page,inventoryPage})=>{
    await loginPage.goto();
    await loginPage.loginFunction(validUsers.standard.username,validUsers.standard.password);
    await page.waitForURL(inventoryPage.url);
    await page.context().storageState({path: AUTH_FILE});
}) 