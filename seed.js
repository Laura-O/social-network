const faker = require('faker');
const db = require('./src/actions/db.js');

function createUser(start, iterations) {
    const userQuery =
        'INSERT INTO users (first, last, profilepicurl, bio, email, pass) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';

    for (let i = start; i < iterations; i++) {
        let first = faker.name.firstName();
        let last = faker.name.lastName();
        let email = faker.internet.email();
        let password = faker.internet.password();
        let avatar = faker.internet.avatar();
        let bio = faker.hacker.phrase();

        db.query(userQuery, [first, last, avatar, bio, email, password]);
    }
}

createUser(1, 50);
