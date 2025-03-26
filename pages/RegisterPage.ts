import { Page } from '@playwright/test';

export class RegisterPage {
    constructor(private page: Page) {}

    //Method to fill the form for the demo.automationtesting.in/Register.html
    async fillForm(firstName: string, lastName: string, email: string, phone: string) {
        await this.page.fill('input[placeholder="First Name"]', firstName);
        await this.page.fill('input[placeholder="Last Name"]', lastName);
        await this.page.fill('input[ng-model="EmailAdress"]', email);
        await this.page.fill('input[ng-model="Phone"]', phone);
    }
}
