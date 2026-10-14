import { expect, type Locator, type Page } from '@playwright/test';

export class TimesheetPage {
  readonly page: Page;
  readonly previousWeekButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.previousWeekButton = page.locator('#tbRightPageFrm').contentFrame().getByTitle('Click this to go to previous');
  }

  async clickPreviousWeekButton() {
    await this.previousWeekButton.click();
  }
}