
# Lab 3: REST API, Query Parameters, Validation and Debugging

## Project Overview
This project implements a RESTful Book Management API using Node.js, Express.js and SQLite.

It supports CRUD operations, searching, sorting, pagination, price filtering, input validation and error handling.

## Technologies Used
- Node.js
- Express.js
- SQLite
- JavaScript
- Postman

## Project Structure
```text
LAB-03/
├── screenshots/
├── node_modules/
├── book.db
├── database.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Installation

1. Install Node.js.
2. Open the project folder in VS Code.
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

Server URL:
http://localhost:3000

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /books | Get all books |
| GET | /books/:id | Get a book by ID |
| POST | /books | Add a new book |
| PUT | /books/:id | Update a book |
| DELETE | /books/:id | Delete a book |

## Query Parameters

| Parameter | Description |
|---|---|
| search_q | Search books by title |
| order_by | Sort using a column |
| order | ASC or DESC |
| limit | Maximum number of records |
| offset | Number of records to skip |
| min_price | Minimum book price |
| max_price | Maximum book price |

### Example Requests

Search:
GET /books?search_q=Atomic

Ascending sorting:
GET /books?order_by=price&order=ASC

Descending sorting:
GET /books?order_by=price&order=DESC

Pagination:
GET /books?limit=2&offset=0

Price filtering:
GET /books?min_price=250&max_price=350

## Validation and Status Codes

- 200: Successful request
- 201: Book created successfully
- 400: Invalid input
- 404: Book not found
- 500: Internal server error

## Debugging Exercises

1. EADDRINUSE: Fixed by identifying the process using the occupied port.
2. Wrong import path: Corrected the database module path.
3. Table-name typo: Used the correct books table name.
4. Missing await: Used await for asynchronous database operations.

## Testing

All API endpoints were tested using Postman.

Screenshots of successful and unsuccessful requests are available in the screenshots folder.

## Conclusion

The project demonstrates REST API development, query parameters, CRUD operations, validation, HTTP status codes and debugging using Node.js, Express.js and SQLite.
