import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { WebTableDemoQAPage } from '../../pages/demoQA/webtableDemoQA';

let webTable: WebTableDemoQAPage;

Given('the user is on demo QA web table page', async function () {
    webTable = new WebTableDemoQAPage(this.page);
    await webTable.navigateToWebTables();
});

When('the user clicks on the add button', async function () {
    await webTable.clickOnAddButton();
});

When('the user fills the form with {string}, {string}, {string}, {string}, {string}, {string}',
    async function (firstName, lastName, email, age, salary, department) {
        await webTable.fillRoleForm(firstName, lastName, email, age, salary, department);   
    }
);

When('the user clicks on the submit button', async function () {
    await webTable.clickOnSubmitButton();

    // Wait the submit action
    await this.page.waitForTimeout(3000);
});

Then('the record is included with {string}, {string}, {string}, {string}, {string}, {string}', 
    async function (firstName, lastName, email, age, salary, department) {
        const isAdded = await webTable.isUserInTable(firstName, lastName, email, age, salary, department);
        expect(isAdded).toBeTruthy();
});

When('the user clicks on the edit button for line with name {string}', async function (firstName) {
    await webTable.clickOnEditOnUserByFirstName(firstName);    
});

When('the user fills the name with {string}', async function (firstName) {
    await webTable.fillFistName(firstName);   
});

Then('the record is updated with name {string}', 
    async function (firstName) {
    const isPresent = await webTable.isUserInTableWithTheFirstName(firstName);
    expect(isPresent).toBeTruthy();
});

When('the user clicks on the delete button for line with name {string}', async function (firstName) {
    await webTable.deleteUserByFirstName(firstName);    
    // Wait the submit action
    await this.page.waitForTimeout(3000);   
});

Then('the record is removed with name {string} from the table', async function (firstName) {
    const isPresent = await webTable.isUserInTableWithTheFirstName(firstName);
    expect(isPresent).toBeFalsy();
});