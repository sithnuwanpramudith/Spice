const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'backend/spices.db');
console.log('Using DB at:', dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) { console.error('DB open error:', err.message); process.exit(1); }
});

db.serialize(() => {
    db.run(
        `CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role TEXT NOT NULL
        )`,
        (err) => {
            if (err) console.error('Create table error:', err.message);
            else console.log('users table ready.');
        }
    );

    db.run(
        `INSERT OR REPLACE INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)`,
        ['USR-ADMIN', 'Admin', 'admin@spices.com', 'admin123', 'owner'],
        function (err) {
            if (err) console.error('Insert error:', err.message);
            else console.log('Admin user seeded!');
        }
    );

    db.all('SELECT id, name, email, role FROM users', (err, rows) => {
        if (err) console.error('Select error:', err.message);
        else console.log('All users:', JSON.stringify(rows, null, 2));
        db.close((err2) => {
            if (err2) console.error('Close error:', err2.message);
        });
    });
});
