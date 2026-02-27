console.log('Index Module Loading...');
const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Auth API
app.post('/api/auth/register', (req, res) => {
    const { name, email, password } = req.body;
    const id = `USR-${Math.floor(Math.random() * 100000)}`;
    const role = 'customer';

    db.run("INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)",
        [id, name, email, password, role],
        function (err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(400).json({ error: "Email already exists" });
                }
                return res.status(500).json({ error: err.message });
            }
            res.json({ user: { id, name, email, role }, token: 'mock-jwt-token' });
        }
    );
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    db.get("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        const { password: _, ...userWithoutPassword } = user;
        res.json({ user: userWithoutPassword, token: 'mock-jwt-token' });
    });
});

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
        SELECT o.*, oi.product_name, oi.product_id, oi.quantity, oi.price as item_price, oi.id as item_id
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
                    productId: row.product_id,
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

app.get('/api/orders/user/:email', (req, res) => {
    const email = req.params.email;
    const query = `
        SELECT o.*, oi.product_name, oi.product_id, oi.quantity, oi.price as item_price, oi.id as item_id
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        WHERE o.email = ?
        ORDER BY o.timestamp DESC
    `;

    db.all(query, [email], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });

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
                    productId: row.product_id,
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
    const { status: newStatus } = req.body;
    const orderId = req.params.id;

    const deductionGroup = ['Shipped', 'Delivered'];

    db.get("SELECT status FROM orders WHERE id = ?", [orderId], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Order not found" });

        const oldStatus = row.status;
        const wasDeducted = deductionGroup.includes(oldStatus);
        const isNowDeducted = deductionGroup.includes(newStatus);

        // Determine stock action: -1 for deduction, 1 for restocking, 0 for none
        let stockAction = 0;
        if (!wasDeducted && isNowDeducted) {
            stockAction = -1; // Moving to Shipped/Delivered
        } else if (wasDeducted && !isNowDeducted) {
            stockAction = 1; // Returning to Pending/Processing/Cancelled
        }

        // Start transaction
        db.serialize(() => {
            db.run("BEGIN TRANSACTION");

            // Update order status
            db.run("UPDATE orders SET status = ? WHERE id = ?", [newStatus, orderId], function (err) {
                if (err) {
                    db.run("ROLLBACK");
                    return res.status(500).json({ error: err.message });
                }

                if (stockAction !== 0) {
                    // Get order items
                    db.all("SELECT product_name, quantity FROM order_items WHERE order_id = ?", [orderId], (err, items) => {
                        if (err) {
                            db.run("ROLLBACK");
                            return res.status(500).json({ error: err.message });
                        }

                        if (items.length === 0) {
                            db.run("COMMIT");
                            return res.json({ success: true, message: "No items to update stock" });
                        }

                        let updatesCompleted = 0;
                        items.forEach(item => {
                            // Update stock and status for each product
                            const changeAmount = item.quantity * stockAction;

                            db.run(`
                                UPDATE products 
                                SET stock = stock + ?,
                                    status = CASE 
                                        WHEN (stock + ?) > 10 THEN 'In Stock'
                                        WHEN (stock + ?) > 0 THEN 'Low Stock'
                                        ELSE 'Out of Stock'
                                    END
                                WHERE name = ?
                            `, [changeAmount, changeAmount, changeAmount, item.product_name], function (err) {
                                if (err) {
                                    db.run("ROLLBACK");
                                    return res.status(500).json({ error: err.message });
                                }

                                updatesCompleted++;
                                if (updatesCompleted === items.length) {
                                    db.run("COMMIT");
                                    res.json({ success: true, stockUpdated: true, action: stockAction === -1 ? 'deducted' : 'restocked' });
                                }
                            });
                        });
                    });
                } else {
                    db.run("COMMIT");
                    res.json({ success: true, message: "No stock change needed" });
                }
            });
        });
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

        const itemStmt = db.prepare("INSERT INTO order_items (order_id, product_id, product_name, quantity, price) VALUES (?, ?, ?, ?, ?)");
        items.forEach(item => {
            itemStmt.run([id, item.id || item.productId, item.name, item.quantity, item.price]);
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

app.post('/api/suppliers/register', (req, res) => {
    const { name, email, phone, whatsapp, category, message } = req.body;
    if (!name || !email || !phone || !category) {
        return res.status(400).json({ error: 'Name, email, phone and category are required' });
    }
    const id = `SUP-${Date.now()}`;
    db.run(
        "INSERT INTO suppliers (id, name, email, phone, whatsapp, category, status, rating, totalOrders, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [id, name, email, phone, whatsapp || phone, category, 'pending', 0, 0, message || ''],
        function (err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(400).json({ error: 'Email already registered' });
                }
                return res.status(500).json({ error: err.message });
            }
            res.json({ success: true, id, message: 'Supplier registered successfully!' });
        }
    );
});

// Reviews API
app.post('/api/products/:id/review', (req, res) => {
    const { rating, comment, user_email } = req.body;
    const product_id = req.params.id;
    const id = `REV-${Date.now()}`;
    const timestamp = Date.now();

    if (!rating || !user_email) {
        return res.status(400).json({ error: "Rating and user email are required" });
    }

    db.serialize(() => {
        db.run("BEGIN TRANSACTION");

        // Insert the review
        db.run(
            "INSERT INTO product_reviews (id, product_id, user_email, rating, comment, timestamp) VALUES (?, ?, ?, ?, ?, ?)",
            [id, product_id, user_email, rating, comment, timestamp],
            function (err) {
                if (err) {
                    db.run("ROLLBACK");
                    return res.status(500).json({ error: err.message });
                }

                // Update product aggregate stats
                db.get(
                    "SELECT COUNT(*) as count, AVG(rating) as avg FROM product_reviews WHERE product_id = ?",
                    [product_id],
                    (err, row) => {
                        if (err) {
                            db.run("ROLLBACK");
                            return res.status(500).json({ error: err.message });
                        }

                        db.run(
                            "UPDATE products SET rating_avg = ?, review_count = ? WHERE id = ?",
                            [row.avg || 0, row.count || 0, product_id],
                            function (err) {
                                if (err) {
                                    db.run("ROLLBACK");
                                    return res.status(500).json({ error: err.message });
                                }
                                db.run("COMMIT");
                                res.json({ success: true, id, rating_avg: row.avg || 0, review_count: row.count || 0 });
                            }
                        );
                    }
                );
            }
        );
    });
});

// Testimonials API
app.get('/api/testimonials', (req, res) => {
    db.all("SELECT * FROM testimonials ORDER BY timestamp DESC LIMIT 6", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/testimonials', (req, res) => {
    const { user_name, user_role, content, rating, user_image } = req.body;
    const id = `TEST-${Date.now()}`;
    const timestamp = Date.now();

    if (!user_name || !content || !rating) {
        return res.status(400).json({ error: "Name, content and rating are required" });
    }

    db.run(
        "INSERT INTO testimonials (id, user_name, user_role, content, rating, user_image, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [id, user_name, user_role, content, rating, user_image, timestamp],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true, id });
        }
    );
});

app.delete('/api/testimonials/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM testimonials WHERE id = ?", [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Testimonial not found" });
        res.json({ success: true });
    });
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
