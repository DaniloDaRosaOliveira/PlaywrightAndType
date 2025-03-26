const utils = {
    generateRandomEmail: () => `user${Math.floor(Math.random() * 10000)}@test.com`,
    generateRandomPhone: () => `119${Math.floor(10000000 + Math.random() * 90000000)}`
};

export default utils;