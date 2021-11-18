/*  archivo hecho para probar funciones */
import bcrypt from 'bcrypt';

const saltRounds = 10;
const password = 'hola';
let hola = 'puto';

bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
        if (!err) {
            console.log(hash)
        }
        // Store hash in your password DB.
    });
});

bcrypt.hash(password, saltRounds).then(function(hash) {
    console.log(hola);
    hola = hash;
    // Store hash in your password DB.
});

console.log(hola)