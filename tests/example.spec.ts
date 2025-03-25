import { test, expect } from '@playwright/test';

test('Acessar google', async ({page}) => {
    await page.goto('https://www.google.com');
    await expect(page).toHaveTitle(/Google/);
});

test('Preencher formulário e submeter', async ({ page }) => {
    // Acessa a página
    await page.goto('https://demo.automationtesting.in/Register.html');

    // Preenche os campos de nome e sobrenome
    await page.fill('input[placeholder="First Name"]', 'João');
    await page.fill('input[placeholder="Last Name"]', 'Silva');

    // Preenche o endereço
    await page.fill('textarea[ng-model="Adress"]', 'Rua Exemplo, 123');

    // Preenche o email
    await page.fill('input[ng-model="EmailAdress"]', 'joao.silva@email.com');

    // Preenche o telefone
    await page.fill('input[ng-model="Phone"]', '11999999999');

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