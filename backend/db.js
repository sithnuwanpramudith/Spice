console.log('DB Module Loading...');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'spices.db');
console.log('DB Path:', dbPath);
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('Database Opening Error:', err.message);
    else console.log('Connected to SQLite database.');
});

// Use a simple function to wrap database calls with logging
const runQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        console.log('Executing:', sql.substring(0, 50) + '...');
        db.run(sql, params, function (err) {
            if (err) {
                console.error('SQL Error:', err.message);
                reject(err);
            } else {
                console.log('Executed successfully.');
                resolve(this);
            }
        });
    });
};

// Initialize tables sequentially
const initDb = async () => {
    console.log('Starting DB Initialization...');
    try {
        await runQuery(`CREATE TABLE IF NOT EXISTS products (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            price REAL NOT NULL,
            stock REAL NOT NULL,
            description TEXT,
            status TEXT NOT NULL,
            image TEXT
        )`);

        await runQuery(`CREATE TABLE IF NOT EXISTS orders (
            id TEXT PRIMARY KEY,
            customer TEXT NOT NULL,
            email TEXT NOT NULL,
            whatsapp TEXT,
            address TEXT NOT NULL,
            date TEXT NOT NULL,
            total TEXT NOT NULL,
            status TEXT NOT NULL,
            timestamp INTEGER NOT NULL
        )`);

        await runQuery(`CREATE TABLE IF NOT EXISTS suppliers (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            category TEXT NOT NULL,
            status TEXT NOT NULL,
            rating REAL NOT NULL,
            totalOrders INTEGER NOT NULL
        )`);

        await runQuery(`CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role TEXT NOT NULL
        )`);

        await runQuery(`CREATE TABLE IF NOT EXISTS order_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id TEXT NOT NULL,
            product_name TEXT NOT NULL,
            quantity REAL NOT NULL,
            price REAL NOT NULL,
            FOREIGN KEY(order_id) REFERENCES orders(id)
        )`);

        // Check and seed initial data
        db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
            if (row && row.count === 0) {
                console.log('Seeding products...');
                const stmt = db.prepare("INSERT INTO products (id, name, category, price, stock, description, status, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
                [
                    ['PRD-001', 'Ceylon Cinnamon Sticks', 'Whole Spice', 45.00, 120, 'Premium grade Ceylon Cinnamon.', 'In Stock', null],
                    ['PRD-002', 'Black Pepper Corns', 'Whole Spice', 32.50, 45, 'Organic black pepper corns.', 'Low Stock', null],
                    ['PRD-003', 'Red Chili Powder', 'Ground Spice', 18.00, 0, 'Fiery red chili powder.', 'Out of Stock', null]
                ].forEach(p => stmt.run(p));
                stmt.finalize();
            }
        });

        // Migrations
        db.run("ALTER TABLE products ADD COLUMN image TEXT", (err) => {
            if (err && !err.message.includes('duplicate column name')) console.error('Migration Error:', err.message);
        });
        db.run("ALTER TABLE suppliers ADD COLUMN whatsapp TEXT", (err) => {
            if (err && !err.message.includes('duplicate column name')) console.error('Migration suppliers whatsapp:', err.message);
        });
        db.run("ALTER TABLE suppliers ADD COLUMN message TEXT", (err) => {
            if (err && !err.message.includes('duplicate column name')) console.error('Migration suppliers message:', err.message);
        });

        console.log('DB Initialization completed.');
    } catch (error) {
        console.error('DB Initialization failed:', error.message);
    }
};

initDb();

module.exports = db;

module.exports = db;
