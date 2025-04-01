import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Diretório onde os testes serão encontrados
  use: {
    headless: true, // Altere para true se quiser rodar em segundo plano (sem abrir o navegador)
    viewport: null, // Resolução do navegador
    screenshot: 'only-on-failure', // Captura de tela em caso de falha
    video: 'retain-on-failure', // Gravação de vídeo apenas em falhas
    launchOptions: {args: ['--start-maximized']},
  },  
  projects: [
    { name: 'Chromium', use: { browserName: 'chromium' } }
    //{ name: 'Firefox', use: { browserName: 'firefox' } },
    //{ name: 'WebKit', use: { browserName: 'webkit' } }
  ],
});