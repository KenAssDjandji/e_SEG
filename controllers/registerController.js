const getDb = require('../config/database').getDb;

module.exports = class User {
    constructor(firstname, lastname, email, password, niveau, specialite, filiere, birthDay) {
        this.firstName = firstname
        this.lastname = lastname
        this.email = email
        this.password = password
        this.niveau = niveau
        this.specialite = specialite
        this.filiere = filiere
        this.birthDay = birthDay
    }

    save() {
        const db = getDb()
        return db.collection('users').insertOne(this)
            .then(result => {
                console.log(result)
            })
            .catch(err => console.log(err))
    }
    static deleteById(id) {

    }
    static fetchAll() {
        return db.execute('SELECT * FROM users');
    }
    findById(id) {

    }
}