import { test, expect } from '@playwright/test';

const API_URL = 'https://reqres.in/api';

test('GET - get users list', async ({ request }) => {
    const response = await request.get(`${API_URL}/users?page=2`);
    
    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    console.log(responseBody);
    
    expect(responseBody.data).toBeDefined();
    expect(responseBody.data.length).toBeGreaterThan(0);
});

test('POST - create new user', async ({ request }) => {
    const newUser = {
        name: 'João Silva',
        job: 'QA Engineer'
    };

    const response = await request.post(`${API_URL}/users`, {
        data: newUser
    });

    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    console.log(responseBody);

    expect(responseBody.name).toBe(newUser.name);
    expect(responseBody.job).toBe(newUser.job);
    expect(responseBody.id).toBeDefined();
});

test('DELETE - remove a user', async ({ request }) => {
    const response = await request.delete(`${API_URL}/users/2`);

    expect(response.status()).toBe(204); 
});
