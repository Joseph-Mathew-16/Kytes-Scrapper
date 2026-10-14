import { expect, type Locator, type Page } from '@playwright/test';

export class BoilerplatePage {
  readonly page: Page;
  readonly button: Locator;

  constructor(page: Page) {
    this.page = page;
    this.button = page.locator('a', { hasText: 'Get started' });
  }

  async clickButton() {
    await this.button.click();
  }
}