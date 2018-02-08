const faker = require('faker');
const db = require('./src/models/db.js');

// function createUser(start, iterations) {
//     const userQuery =
//         'INSERT INTO users (first, last, profilepicurl, bio, email, pass) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';

//     for (let i = start; i < iterations; i++) {
//         let first = faker.name.firstName();
//         let last = faker.name.lastName();
//         let email = faker.internet.email();
//         let password = faker.internet.password();
//         let avatar = faker.internet.avatar();
//         let bio = faker.hacker.phrase();

//         db.query(userQuery, [first, last, avatar, bio, email, password]);
//     }
// }

// createUser(1, 50);

function createPosts(start, end) {
    const query = 'INSERT into posts (user_id, title, content) VALUES ($1, $2, $3)';

    for (let i = start; i <= end; i++) {
        for (let j = 0; j < Math.floor(Math.random() * 9); j++) {
            let title = faker.lorem.words();
            let content = faker.lorem.paragraph();
            db.query(query, [i, title, content]);
        }
    }
}

createPosts(21, 50);
