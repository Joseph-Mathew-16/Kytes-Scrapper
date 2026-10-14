import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.getByRole('textbox',{name:'enter user name'});
        this.passwordField = page.getByRole('textbox',{name:'enter password'});
        this.signInButton = page.getByRole('button',{name:'LOGIN'});
    }

    async goToLoginPage() {
        await this.page.goto('');
    }

    async enterUsername(username: string) {
        await this.usernameField.fill(username);
    }
    async enterPassword(password: string) {
        await this.passwordField.fill(password);
    }
    async clickSignInButton() {
        await this.signInButton.click();
    }
}