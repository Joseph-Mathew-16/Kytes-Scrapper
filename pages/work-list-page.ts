import { expect, type Locator, type Page } from '@playwright/test';

export class WorkListPage {
  readonly page: Page;
  readonly timesheetButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.timesheetButton = page.locator('#tbRightPageFrm').contentFrame().getByRole('link', { name: 'Timesheet', exact: true });
  }

  async clickTimesheetButton() {
    await this.timesheetButton.click();
  }
}