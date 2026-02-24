console.log('Index Module Loading...');
const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Dashboard Summary
app.get('/api/dashboard/summary', (req, res) => {
    db.get(`
        SELECT 
            (SELECT SUM(CAST(REPLACE(total, 'LKR ', '') AS REAL)) FROM orders WHERE status != 'Cancelled') as totalRevenue,
            (SELECT COUNT(*) FROM products) as totalProducts,
            (SELECT COUNT(*) FROM orders WHERE status = 'Pending') as pendingOrders,
            (SELECT COUNT(*) FROM suppliers) as totalSuppliers
    `, (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({
            revenue: row.totalRevenue || 0,
            suppliers: row.totalSuppliers || 0,
            products: row.totalProducts || 0,
            pendingOrders: row.pendingOrders || 0
        });
    });
});

// Products API
app.get('/api/products', (req, res) => {
    db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/products', (req, res) => {
    const { name, category, price, stock, description, image } = req.body;
    const id = `PRD-${Math.floor(Math.random() * 10000)}`;
    const status = stock > 10 ? 'In Stock' : stock > 0 ? 'Low Stock' : 'Out of Stock';

    console.log('Adding product:', { id, name, category, price, stock });
    db.run("INSERT INTO products (id, name, category, price, stock, description, status, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [id, name, category, price, stock, description, status, image],
        function (err) {
            if (err) {
                console.error('Product Insert Error:', err.message);
                return res.status(500).json({ error: err.message });
            }
            console.log('Product added successfully:', id);
            res.json({ id, name, category, price, stock, description, status, image });
        }
    );
});

app.put('/api/products/:id', (req, res) => {
    const { name, category, price, stock, description, image } = req.body;
    const status = stock > 10 ? 'In Stock' : stock > 0 ? 'Low Stock' : 'Out of Stock';

    db.run("UPDATE products SET name = ?, category = ?, price = ?, stock = ?, description = ?, status = ?, image = ? WHERE id = ?",
        [name, category, price, stock, description, status, image, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true });
        }
    );
});

app.delete('/api/products/:id', (req, res) => {
    db.run("DELETE FROM products WHERE id = ?", req.params.id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// Orders API
app.get('/api/orders', (req, res) => {
    const query = `
        SELECT o.*, oi.product_name, oi.quantity, oi.price as item_price, oi.id as item_id
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        ORDER BY o.timestamp DESC
    `;

    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });

        // Group rows by order ID
        const ordersMap = rows.reduce((acc, row) => {
            if (!acc[row.id]) {
                acc[row.id] = {
                    id: row.id,
                    customer: row.customer,
                    email: row.email,
                    whatsapp: row.whatsapp,
                    address: row.address,
                    date: row.date,
                    total: row.total,
                    status: row.status,
                    timestamp: row.timestamp,
                    items: []
                };
            }
            if (row.product_name) {
                acc[row.id].items.push({
                    id: row.item_id,
                    name: row.product_name,
                    quantity: row.quantity,
                    price: row.item_price
                });
            }
            return acc;
        }, {});

        res.json(Object.values(ordersMap));
    });
});

app.patch('/api/orders/:id/status', (req, res) => {
    const { status } = req.body;
    db.run("UPDATE orders SET status = ? WHERE id = ?", [status, req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

app.post('/api/orders', (req, res) => {
    const { id, customer, email, whatsapp, address, date, total, status, timestamp, items } = req.body;

    db.serialize(() => {
        const stmt = db.prepare("INSERT INTO orders (id, customer, email, whatsapp, address, date, total, status, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        stmt.run([id, customer, email, whatsapp, address, date, total, status, timestamp], function (err) {
            if (err) {
                console.error("Order Insert Error:", err.message);
                return res.status(500).json({ error: err.message });
            }
        });
        stmt.finalize();

        const itemStmt = db.prepare("INSERT INTO order_items (order_id, product_name, quantity, price) VALUES (?, ?, ?, ?)");
        items.forEach(item => {
            itemStmt.run([id, item.name, item.quantity, item.price]);
        });
        itemStmt.finalize((err) => {
            if (err) {
                console.error("Order Items Insert Error:", err.message);
                return res.status(500).json({ error: err.message });
            }
            res.json({ success: true, id });
        });
    });
});

// Suppliers API
app.get('/api/suppliers', (req, res) => {
    db.all("SELECT * FROM suppliers", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.get('/api/suppliers/:id', (req, res) => {
    db.get("SELECT * FROM suppliers WHERE id = ?", [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
});

app.patch('/api/suppliers/:id/status', (req, res) => {
    const { status } = req.body;
    db.run("UPDATE suppliers SET status = ? WHERE id = ?", [status, req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
