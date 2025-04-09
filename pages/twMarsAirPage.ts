import { Page, expect } from '@playwright/test';

export class MarsAirPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async gotoMarsAir() {
    await this.page.goto('https://marsair.recruiting.thoughtworks.net/DaniloOliveira', { timeout: 30000 });
  }

  async selectDeparture(month: string) {
    await this.page.selectOption('#departing', { label: month });
  }

  async selectReturn(month: string) {
    await this.page.selectOption('#returning', { label: month });
  }

  async fillPromoCode(code: string) {
    await this.page.fill('#promotional_code', code);
  }

  async clickSearch() {
    await this.page.click('input[type="submit"]');
  }

  async expectMessageToBeVisible(message: string) {
    const body = await this.page.textContent('body');
    expect(body).toContain(message);
  }
}
