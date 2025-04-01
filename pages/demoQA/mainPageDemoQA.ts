import { Page } from "@playwright/test";

export class MainPageDemoQA {
    protected page : Page;
    protected readonly baseUrl: string = "https://demoqa.com/";    

    constructor(page: Page){
        this.page = page;
    }

    async navigate(){
        await this.page.goto(this.baseUrl);
    }
}