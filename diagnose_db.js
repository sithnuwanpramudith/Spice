const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'backend', 'spices.db');
const db = new sqlite3.Database(dbPath);

console.log('Checking database at:', dbPath);

db.serialize(() => {
    db.all("SELECT name FROM sqlite_master WHERE type='table'", [], (err, tables) => {
        if (err) {
            console.error('Error listing tables:', err.message);
            return;
        }
        console.log('Tables:', tables.map(t => t.name).join(', '));
    });

    db.all("PRAGMA table_info(products)", [], (err, info) => {
        if (err) {
            console.error('Error getting table info:', err.message);
            return;
        }
        console.log('Products table info:', info.map(c => `${c.name} (${c.type})`).join(', '));
    });

    db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) {
            console.error('Error querying products:', err.message);
            return;
        }
        console.log('Total Products:', rows.length);
        console.log('Last 3 Products:', JSON.stringify(rows.slice(-3), null, 2));
    });
});

db.close();
