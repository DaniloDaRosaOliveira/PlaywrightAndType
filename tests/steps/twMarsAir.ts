import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { MarsAirPage } from '../../pages/twMarsAirPage';

let marsAirPage: MarsAirPage;
 
Given('I am at the MarsAir home page', async function () {  
  marsAirPage = new MarsAirPage(this.page);
  await marsAirPage.gotoMarsAir();
});

When('I select {string} as a departure', async function (departure: string) {
  await marsAirPage.selectDeparture(departure);
});

When('I select {string} as a return', async function (returnMonth: string) {
  await marsAirPage.selectReturn(returnMonth);
});

When('I write the promo code {string}', async function (code: string) {
  await marsAirPage.fillPromoCode(code);
});

When('I click Search', async function () {
  await marsAirPage.clickSearch();
});

Then('it should show the message {string}', async function (message: string) {
  await marsAirPage.expectMessageToBeVisible(message);
  await this.page.waitForTimeout(1000);
});