import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import utils from '../utils/dataGenerator';  // Importando como objeto único

test('Acessar google', async ({page}) => {
    await page.goto('https://www.google.com');
    await expect(page).toHaveTitle(/Google/);
});

test('Preencher formulário e submeter', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    // Acessa a página
    await page.goto('https://demo.automationtesting.in/Register.html');

    // Preenche o formulário
    await registerPage.fillForm('João', 'Silva', utils.generateRandomEmail(), utils.generateRandomPhone());

    // Seleciona o gênero
    await page.check('input[value="Male"]');

    // Seleciona hobbies
    await page.check('#checkbox1'); // Cricket
    await page.check('#checkbox2'); // Movies

    // Seleciona uma skill no dropdown
    await page.selectOption('#Skills', 'Java');

    // Clica no botão de submit
    await page.click('#submitbtn');

    // Espera um tempo para ver o resultado (caso necessário)
    await page.waitForTimeout(3000);
});

test('Upload de imagem no formulário', async ({ page }) => {
    await page.goto('https://demo.automationtesting.in/Register.html');

    // Faz upload de um arquivo
    await page.setInputFiles('#imagesrc', '1626214817868.jpg');
    
    // Espera um tempo para ver o resultado (caso necessário)
    await page.waitForTimeout(3000);
});