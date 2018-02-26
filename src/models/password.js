const bcrypt = require('bcryptjs');

// hashPassword() hashes a plain password and returns it
function hashPassword(plainTextPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt((err, salt) => {
            if (err) {
                return reject(err);
            }
            bcrypt.hash(plainTextPassword, salt, (err, hash) => {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    });
}

/**
 * checkPassword() checks if both passed-in passwords match
 * @param textenterdInLoginForm Plain text password entered in the form
 * @param hashedPasswordFromDatabase Hashed password from db
 */
function checkPassword(textEnteredInLoginForm, hashedPasswordFromDatabase) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(
            textEnteredInLoginForm,
            hashedPasswordFromDatabase,
            (err, doesMatch) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(doesMatch);
                }
            }
        );
    });
}

module.exports = {
    checkPassword,
    hashPassword
};
