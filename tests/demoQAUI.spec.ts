import { test, expect } from '@playwright/test';
import { WebTableDemoQAPage } from '../pages/demoQA/webtableDemoQA';
import utils from '../utils/dataGenerator';

/*
This test case goes to the https://demoqa.com/webtables and includes a new item
*/ 
test('Adding new item - WebTable', async ({ page }) => {
    const webTable = new WebTableDemoQAPage(page);

    const firstName = 'FisrtN';
    const lastName = 'LastN';
    const email = utils.generateRandomEmail();
    const age = '30';
    const salary = '4000';
    const department = 'QA';

    // Go the the https://demoqa.com/webtables
    await webTable.navigateToWebTables();
    await webTable.clickOnAddButton();
    await webTable.fillRoleForm(firstName, lastName, email, age, salary, department);    
    await webTable.clickOnSubmitButton();

    // Wait the submit action
    await page.waitForTimeout(3000);

    // Validate if the line is included
    const isAdded = await webTable.isUserInTable(firstName, lastName, email, age, salary, department);
    expect(isAdded).toBeTruthy();
});

/*
This test case goes to the https://demoqa.com/webtables and deletes a item
*/ 
test('Delenting a item - WebTable', async ({ page }) => {
    const webTable = new WebTableDemoQAPage(page);

    const firstName = 'Alden';

    // Go the the https://demoqa.com/webtables
    await webTable.navigateToWebTables();
    await webTable.deleteUserByFirstName(firstName);    

    // Wait the submit action
    await page.waitForTimeout(3000);

    // Validate if the line is included
    const isPresent = await webTable.isUserInTableWithTheFirstName(firstName);
    expect(isPresent).toBeFalsy();
});

test('Updating a item - WebTable', async ({ page }) => {
    const webTable = new WebTableDemoQAPage(page);

    const firstName = 'Alden';
    const firstNameUpdated = 'John';

    // Go the the https://demoqa.com/webtables
    await webTable.navigateToWebTables();
    await webTable.clickOnEditOnUserByFirstName(firstName);    

    // Wait the submit action
    await page.waitForTimeout(3000);

    await webTable.fillFistName(firstNameUpdated);
    await webTable.clickOnSubmitButton();

    // Validate if the line is included
    const isPresent = await webTable.isUserInTableWithTheFirstName(firstNameUpdated);
    expect(isPresent).toBeTruthy();
});