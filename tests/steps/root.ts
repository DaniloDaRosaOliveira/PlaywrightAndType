import { After, setDefaultTimeout, Before } from '@cucumber/cucumber';
import { chromium, Page, Browser, BrowserContext } from 'playwright';

let browser: Browser;
let context: BrowserContext;
let page: Page;
setDefaultTimeout(30000); 

Before(async function () {
    browser = await chromium.launch({ headless: true, args: ['--start-maximized'] });
    context = await browser.newContext({ viewport: null });
    page = await context.newPage();
  
    this.browser = browser;
    this.context = context;
    this.page = page;
});

After(async function () {
    if (browser && browser.isConnected()) {
        try {
          await browser.close();
        } catch (err) {
          console.error('Erro ao fechar o browser:', err);
        }
    }
});
