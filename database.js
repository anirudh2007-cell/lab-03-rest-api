
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

const dbPath = path.join(__dirname, 'book.db');

const initializeDb = async () => {
    const db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            price REAL NOT NULL,
            pages INTEGER
        );
    `);

    const result = await db.get(
        'SELECT COUNT(*) AS count FROM books'
    );

    if (result.count === 0) {
        await db.run(
            `INSERT INTO books (title, author, price, pages)
             VALUES (?, ?, ?, ?),
                    (?, ?, ?, ?),
                    (?, ?, ?, ?),
                    (?, ?, ?, ?)`,
            [
                'The Alchemist', 'Paulo Coelho', 250, 208,
                'Atomic Habits', 'James Clear', 450, 320,
                'Wings of Fire', 'A.P.J. Abdul Kalam', 300, 180,
                'Rich Dad Poor Dad', 'Robert Kiyosaki', 350, 336
            ]
        );
    }

    console.log('Database initialized successfully');

    return db;
};

module.exports = initializeDb;
