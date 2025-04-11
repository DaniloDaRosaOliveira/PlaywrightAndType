import { test, expect, request } from '@playwright/test';

const baseURL = 'http://localhost:5000/api/MobileFoodTrucks';

test.describe('API - Food Trucks - Search By Street', () => { 

    test('GET /searchByStreet with MARKET street', async ({ request }) => {
        const street = 'MARKET';
        const response = await request.get(`${baseURL}/searchByStreet?street=${street}`);
        expect(response.status()).toBe(200);
        const data = await response.json();
        expect(Array.isArray(data)).toBeTruthy();        
        expect(data.length).toBe(23);
    });  

    test('GET /searchByStreet with US street', async ({ request }) => {
        const street = 'US';
        const response = await request.get(`${baseURL}/searchByStreet?street=${street}`);
        expect(response.status()).toBe(200);
        const data = await response.json();
        expect(Array.isArray(data)).toBeTruthy();        
        expect(data.length).toBe(5);
        
        const approvedCount = countStatus(data, "APPROVED");
        const requestedCount = countStatus(data, "REQUESTED");

        expect(approvedCount).toBe(4);
        expect(requestedCount).toBe(1);
    });

    test('GET /searchByStreet empty parameters', async ({ request }) => {
        
        const response = await request.get(`${baseURL}/searchByStreet`);
        expect(response.status()).toBe(400);
        
        const data = await response.json();               
        expect(data.errors.street[0]).toBe("The street field is required.");        
    });

});

test.describe('API - Food Trucks - Search By Name', () => { 

    test('GET /searchByName with name Bra and status Requested', async ({ request }) => {
        const name = 'Bra';
        const status = 'REQUESTED';
        const response = await request.get(`${baseURL}/searchByName?name=${name}&status=${status}`);
        expect(response.status()).toBe(200);

        const data = await response.json();
        expect(Array.isArray(data)).toBeTruthy();

        for (const row of data) {   
            expect(row.applicant.toUpperCase()).toContain(name.toUpperCase());
            expect(row.status).toBe(status);
        };

    });  

    test('GET /searchByName with name Gi without status', async ({ request }) => {
        const name = 'gi';
        const response = await request.get(`${baseURL}/searchByName?name=${name}`);
        expect(response.status()).toBe(200);

        const data = await response.json();
        expect(Array.isArray(data)).toBeTruthy();

        for (const row of data) {   
            expect(row.applicant.toUpperCase()).toContain(name.toUpperCase());
        };
    });
    
    test('GET /searchByName with name not present on the list', async ({ request }) => {
        const name = '1@';
        const response = await request.get(`${baseURL}/searchByName?name=${name}`);
        expect(response.status()).toBe(200);

        const data = await response.json();
        expect(data.length).toBe(0);
    });

    test('GET /searchByName empty parameters', async ({ request }) => {
        
        const response = await request.get(`${baseURL}/searchByName`);
        expect(response.status()).toBe(400);
        
        const data = await response.json();               
        expect(data.errors.name[0]).toBe("The name field is required.");        
    });  
});

test.describe('API - Food Trucks - Search By Nearest', () => {

    test('GET /nearestFoodTrucks with latitude and longitude valid without status', async ({ request }) => {
        const latitude = "37.7";
        const longitude = "-122.41";
        const response = await request.get(`${baseURL}/nearestFoodTrucks?latitude=${latitude}&longitude=${longitude}`);
        expect(response.status()).toBe(200);

        const data = await response.json();
        expect(Array.isArray(data)).toBeTruthy();
        expect(data.length).toBeLessThanOrEqual(5);

        expect(isOnlyStatusPresent(data, "APPROVED")).toBeFalsy();
    });  

    test('GET /nearestFoodTrucks with latitude and longitude valid with status invalid', async ({ request }) => {
        const latitude = "37.7";
        const longitude = "-122.41";
        const status = "invalid";
        
        const response = await request.get(`${baseURL}/nearestFoodTrucks?latitude=${latitude}&longitude=${longitude}$status=${status}`);
        expect(response.status()).toBe(400);
    });

    test('GET /nearestFoodTrucks with latitude and longitude invalid', async ({ request }) => {
        const latitude = "lat37.7";
        const longitude = "long-122.41";
        
        const response = await request.get(`${baseURL}/nearestFoodTrucks?latitude=${latitude}&longitude=${longitude}`);
        expect(response.status()).toBe(400);
    });

    test('GET /nearestFoodTrucks with latitude and longitude valid with status requested', async ({ request }) => {
        const latitude = "37.7";
        const longitude = "-122.41";
        const status = "REQUESTED";
        const response = await request.get(`${baseURL}/nearestFoodTrucks?latitude=${latitude}&longitude=${longitude}&status=${status}`);
        expect(response.status()).toBe(200);

        const data = await response.json();
        expect(Array.isArray(data)).toBeTruthy();
        expect(data.length).toBeLessThanOrEqual(5);

        expect(isOnlyStatusPresent(data, status)).toBeFalsy();
    });

});

function countStatus(data: any[], status: string): number {
    return data.filter(row => row.status === status).length;
}

function isOnlyStatusPresent(data: any[], status: string): boolean {
    return data.some(row => row.status != status);
}