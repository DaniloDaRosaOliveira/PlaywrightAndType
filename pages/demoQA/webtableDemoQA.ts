import { MainPageDemoQA } from "./mainPageDemoQA";

export class WebTableDemoQAPage extends MainPageDemoQA {
    constructor(page: any) {
        super(page);
    }

    protected readonly webTableUrl: string = "webtables";

    async navigateToWebTables() {
        await this.page.goto(this.baseUrl + this.webTableUrl, { timeout: 30000 });        
    }

    //Clicking on the add button
    async clickOnAddButton(){
        await this.page.click('#addNewRecordButton');
    }

    //Method to fill the first name
    async fillFistName(firstName: string) {
        await this.page.fill('#firstName', firstName);        
    }

    //Method to fill the last name
    async fillLastName(lastName: string) {
        await this.page.fill('#lastName', lastName);        
    }

    //Method to fill the email
    async fillEmail(email: string) {
        await this.page.fill('#userEmail', email);        
    }

    //Method to fill the age
    async fillAge(age: string) {
        await this.page.fill('#age', age);        
    }

    //Method to fill the salary
    async fillSalary(salary: string) {
        await this.page.fill('#salary', salary);        
    }

    //Method to fill the department
    async fillDepeartment(department: string) {
        await this.page.fill('#department', department);        
    }

    //Method to fill the form when adding the webtable
    async fillRoleForm(firstName: string, lastName: string, email: string, 
        age: string, salary: string, department: string) {
        await this.page.waitForSelector('#userForm', { state: 'visible' });
        await this.fillFistName(firstName);
        await this.fillLastName(lastName);
        await this.fillEmail(email);
        await this.fillAge(age);
        await this.fillSalary(salary);
        await this.fillDepeartment(department);        
    }

    //Clicking on the add button
    async clickOnSubmitButton(){
        await this.page.click('#submit');
    }

    //This method verifies if the line of the user is on the table
    async isUserInTable(firstName: string, lastName: string, email: string, 
        age: string, salary: string, department: string): Promise<boolean> {
        // Select the table
        const rows = await this.page.$$('.rt-tr-group');
    
        for (const row of rows) {            
            const rowText = await row.innerText();
            
            if (rowText.includes(firstName) &&
                rowText.includes(lastName) &&
                rowText.includes(email) &&
                rowText.includes(age) &&
                rowText.includes(salary) &&
                rowText.includes(department)) {
                return true; 
            }
        }    
        return false;
    }

    //This method verifies if the line of the user is on the table
    async isUserInTableWithTheFirstName(firstName: string): Promise<boolean> {
        // Select the table
        const rows = await this.page.$$('.rt-tr-group');
    
        for (const row of rows) {            
            const rowText = await row.innerText();
            
            if (rowText.includes(firstName)) {
                return true; 
            }
        }    
        return false;
    }

    //This method delete the line according to the first name
    async deleteUserByFirstName(firstName: string): Promise<boolean> {
        // Seleciona todas as linhas da tabela
        const rows = await this.page.$$('.rt-tr-group');

        for (const row of rows) {            
            const rowText = await row.innerText();
            
            if (rowText.includes(firstName)) {
                const deleteButton = await row.$('span[title="Delete"]');
                if (deleteButton) {
                    await deleteButton.click();
                    return true; 
                }
            }
        }    
        return false;
    
        /*for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            
            const rowText = await row.innerText();
    
            if (rowText.includes(firstName)) {                
                const deleteButton = await row.$('span[title="Delete"]');
                if (deleteButton) {
                    await deleteButton.click();
                    return true; 
                }
            }
        }
    
        return false; */
    }
}