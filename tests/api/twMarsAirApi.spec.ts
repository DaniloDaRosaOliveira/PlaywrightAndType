import { test, expect, request } from '@playwright/test';

test('POST MarsAir API - valid departure and return', async () => {
  const apiContext = await request.newContext();

  const response = await apiContext.post('https://marsair.recruiting.thoughtworks.net/DaniloOliveira', {
    form: {
      departing: 0,
      returning: 5,
      promotional_code: ''
    }
  });

  expect(response.status()).toBe(200);
  console.log(response.status());

  const responseBody = await response.text();
  console.log(responseBody);
  expect(responseBody).toContain('Seats available!');  

  await apiContext.dispose();
});
