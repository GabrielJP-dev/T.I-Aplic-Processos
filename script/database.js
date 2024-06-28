const mysql = require('mysql2');

var config = {
    host: '26.38.89.106',
    user: 'root',
    password: '123',
    database: 'mydatabase'
}

class Database {
    constructor() {
        this.connection = mysql.createConnection(config);
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.connection.connect(err => {
                if (err) {
                    return reject(err);
                }
                resolve('Connected to the database.');
            });
        });
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err) {
                    return reject(err);
                }
                resolve('Connection closed.');
            });
        });
    }
}

module.exports = Database;