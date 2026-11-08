
const express = require('express');
const initializeDb = require('./database');

const app = express();
app.use(express.json());

let db;

app.get('/books', async (request, response) => {
    try {
        const {
            search_q = '',
            order_by = 'id',
            order = 'ASC',
            limit = '10',
            offset = '0',
            min_price,
            max_price
        } = request.query;

        const allowedColumns = ['id', 'title', 'author', 'price', 'pages'];

        if (!allowedColumns.includes(order_by)) {
            return response.status(400).json({
                message: 'Invalid order_by column'
            });
        }

        if (!['ASC', 'DESC'].includes(order.toUpperCase())) {
            return response.status(400).json({
                message: 'Order must be ASC or DESC'
            });
        }

        const parsedLimit = Number(limit);
        const parsedOffset = Number(offset);

        if (!Number.isInteger(parsedLimit) || parsedLimit <= 0 ||
            !Number.isInteger(parsedOffset) || parsedOffset < 0) {
            return response.status(400).json({
                message: 'Limit must be positive and offset must be non-negative integers'
            });
        }

        if (
            (min_price !== undefined && (!Number.isFinite(Number(min_price)) || Number(min_price) < 0)) ||
            (max_price !== undefined && (!Number.isFinite(Number(max_price)) || Number(max_price) < 0))
        ) {
            return response.status(400).json({
                message: 'Price filters must be valid non-negative numbers'
            });
        }

        if (
            min_price !== undefined &&
            max_price !== undefined &&
            Number(min_price) > Number(max_price)
        ) {
            return response.status(400).json({
                message: 'min_price cannot be greater than max_price'
            });
        }

        let query = 'SELECT * FROM books WHERE title LIKE ?';
        const params = [`%${search_q}%`];

        if (min_price !== undefined) {
            query += ' AND price >= ?';
            params.push(Number(min_price));
        }

        if (max_price !== undefined) {
            query += ' AND price <= ?';
            params.push(Number(max_price));
        }

        query += ` ORDER BY ${order_by} ${order.toUpperCase()} LIMIT ? OFFSET ?`;
        params.push(parsedLimit, parsedOffset);

        const books = await db.all(query, params);

        response.status(200).json(books);
    } catch (error) {
        response.status(500).json({
            message: 'Unable to retrieve books',
            error: error.message
        });
    }
});

app.get('/books/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const book = await db.get(
            'SELECT * FROM books WHERE id = ?',
            [id]
        );

        if (!book) {
            return response.status(404).json({
                message: 'Book not found'
            });
        }

        response.status(200).json(book);
    } catch (error) {
        response.status(500).json({
            message: 'Unable to retrieve book',
            error: error.message
        });
    }
});


app.post('/books', async (request, response) => {
    try {
        const { title, author, price, pages } = request.body;

        if (
            typeof title !== 'string' || !title.trim() ||
            typeof author !== 'string' || !author.trim() ||
            price === undefined || price === null ||
            typeof price !== 'number' || !Number.isFinite(price) || price < 0
        ) {
            return response.status(400).json({
                message: 'Title, author and a valid non-negative numeric price are required'
            });
        }

        if (
            pages !== undefined &&
            (!Number.isInteger(pages) || pages <= 0)
        ) {
            return response.status(400).json({
                message: 'Pages must be a positive integer'
            });
        }

        const result = await db.run(
            'INSERT INTO books (title, author, price, pages) VALUES (?, ?, ?, ?)',
            [title.trim(), author.trim(), price, pages ?? null]
        );

        response.status(201).json({
            message: 'Book added successfully',
            bookId: result.lastID
        });
    } catch (error) {
        response.status(500).json({
            message: 'Unable to add book',
            error: error.message
        });
    }
});


app.put('/books/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const { title, author, price, pages } = request.body;

        if (
            typeof title !== 'string' || !title.trim() ||
            typeof author !== 'string' || !author.trim() ||
            price === undefined || price === null ||
            typeof price !== 'number' || !Number.isFinite(price) || price < 0
        ) {
            return response.status(400).json({
                message: 'Title, author and a valid non-negative numeric price are required'
            });
        }

        if (
            pages !== undefined &&
            (!Number.isInteger(pages) || pages <= 0)
        ) {
            return response.status(400).json({
                message: 'Pages must be a positive integer'
            });
        }

        const result = await db.run(
            `UPDATE books
             SET title = ?, author = ?, price = ?, pages = ?
             WHERE id = ?`,
            [title.trim(), author.trim(), price, pages ?? null, id]
        );

        if (result.changes === 0) {
            return response.status(404).json({
                message: 'Book not found'
            });
        }

        response.status(200).json({
            message: 'Book updated successfully'
        });
    } catch (error) {
        response.status(500).json({
            message: 'Unable to update book',
            error: error.message
        });
    }
});

app.delete('/books/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await db.run(
            'DELETE FROM books WHERE id = ?',
            [id]
        );

        if (result.changes === 0) {
            return response.status(404).json({
                message: 'Book not found'
            });
        }

        response.status(200).json({
            message: 'Book deleted successfully'
        });
    } catch (error) {
        response.status(500).json({
            message: 'Unable to delete book',
            error: error.message
        });
    }
});



const startServer = async () => {
    try {
        db = await initializeDb();

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Database initialization failed:', error.message);
        process.exit(1);
    }
};

startServer();
