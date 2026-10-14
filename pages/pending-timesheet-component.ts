import { expect, type Locator, type Page } from '@playwright/test';

export class PendingTimesheetComponent {
  readonly page: Page;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.closeButton = page.locator('#tbRightPageFrm').contentFrame().getByRole('button', { name: 'q' });
  }

  async clickCloseButton() {
    await this.closeButton.click();
  }
}