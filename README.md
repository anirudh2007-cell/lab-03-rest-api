# Lab 3 – REST API, Query Parameters, Validation and Debugging

## Student Details

**Name:** Anirudh  
**Course:** Backend Development Fundamentals  
**Year:** II  
**Term:** II

## Live Deployment

**Platform:** Render

**Live API URL:**  
https://lab-03-rest-api-oute.onrender.com/books

**GitHub Repository:**  
https://github.com/anirudh2007-cell/lab-03-rest-api

---

## 1. Objective

To develop a RESTful API using Node.js, Express.js and SQLite by implementing search, sorting, filtering, pagination, input validation and appropriate HTTP status codes.

This lab extends the basic CRUD operations developed in Lab 2 by introducing advanced query parameters, validation techniques and debugging practices.

## 2. Technologies Used

- Node.js
- Express.js
- SQLite
- sqlite
- sqlite3
- Postman
- Visual Studio Code
- Git and GitHub
- Render

## 3. Project Structure

```text
LAB-03/
│
├── screenshots/
│   ├── 01-get-all-books.png
│   ├── 02-search-books.png
│   ├── 03-sort-ascending.png
│   ├── 04-sort-descending.png
│   ├── 05-pagination.png
│   ├── 06-price-filter.png
│   ├── 07-invalid-price.png
│   ├── 08-add-book.png
│   ├── 09-invalid-book.png
│   ├── 10-update-book.png
│   ├── 11-get-updated-book.png
│   ├── 12-delete-book.png
│   └── 13-book-not-found.png
│
├── postman/
│   └── collections/
│       └── Lab 3 - REST API/
│
├── book.db
├── database.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## 4. Database Details

**Database Name:** `book.db`  
**Table Name:** `books`

The `books` table contains the following columns:

| Column | Data Type | Description |
|---|---|---|
| id | INTEGER | Primary key |
| title | TEXT | Book title |
| author | TEXT | Author name |
| price | REAL | Book price |
| pages | INTEGER | Number of pages |

The application uses SQLite for storing and managing book records.

The database is initialized automatically when the server starts.

## 5. API Endpoints

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Retrieve all books |
| GET | `/books/:id` | Retrieve a book by ID |
| POST | `/books` | Add a new book |
| PUT | `/books/:id` | Update an existing book |
| DELETE | `/books/:id` | Delete a book |

These endpoints follow REST principles and use HTTP methods to perform CRUD operations.

## 6. Query Parameters

The GET `/books` endpoint supports the following query parameters:

| Parameter | Description | Example |
|---|---|---|
| search_q | Search books by partial title | `?search_q=Atomic` |
| order_by | Select sorting column | `?order_by=price` |
| order | Ascending or descending order | `?order=DESC` |
| limit | Maximum number of records | `?limit=2` |
| offset | Number of records to skip | `?offset=2` |
| min_price | Minimum book price | `?min_price=200` |
| max_price | Maximum book price | `?max_price=400` |

### Example Requests

**Search books:**

```http
GET /books?search_q=Atomic
```

**Sort by price in ascending order:**

```http
GET /books?order_by=price&order=ASC
```

**Sort by price in descending order:**

```http
GET /books?order_by=price&order=DESC
```

**Filter by price:**

```http
GET /books?min_price=200&max_price=400
```

**Pagination:**

```http
GET /books?limit=2&offset=0
```

## 7. Input Validation

The POST and PUT routes validate the required book details.

- Title must be provided and cannot be empty.
- Author must be provided and cannot be empty.
- Price must be a valid, non-negative numeric value.
- Pages must be a positive integer when provided.
- Invalid sorting columns are rejected.
- Sorting order must be ASC or DESC.
- Limit must be a positive integer.
- Offset must be a non-negative integer.
- Minimum price cannot exceed maximum price.

Invalid input returns HTTP 400 with a JSON error message.

### Example Invalid Response

```json
{
  "message": "Title, author and a valid non-negative numeric price are required"
}
```

## 8. HTTP Status Codes

| Status Code | Meaning | Usage |
|---|---|---|
| 200 | OK | Successful GET, PUT and DELETE |
| 201 | Created | Book successfully added |
| 400 | Bad Request | Invalid input or query parameters |
| 404 | Not Found | Book ID does not exist |
| 500 | Internal Server Error | Server-side error |

Appropriate HTTP status codes help clients understand the results of API requests.

## 9. SQL Injection Prevention

Parameterized SQL queries with `?` placeholders are used to safely pass user-provided values into database queries.

Sorting columns are restricted to an allowed list, and sorting order is validated before being included in the SQL query.

These practices help prevent SQL injection attacks and improve application security.

## 10. Running the Project

**Step 1: Clone the repository**

```bash
git clone https://github.com/anirudh2007-cell/lab-03-rest-api.git
```

**Step 2: Navigate to the project folder**

```bash
cd lab-03-rest-api
```

**Step 3: Install dependencies**

```bash
npm install
```

**Step 4: Start the server**

```bash
npm start
```

Alternatively, for development:

```bash
npm run dev
```

**Step 5: Open the API**

```text
http://localhost:3000/books
```

The server connects to the SQLite database before accepting requests.

## 11. Testing

The API routes were tested using Postman.

The testing activities include:

1. Retrieve all books.
2. Search books using partial titles.
3. Sort books in ascending order.
4. Sort books in descending order.
5. Test pagination using limit and offset.
6. Filter books using minimum and maximum prices.
7. Test invalid price filters.
8. Add a new book.
9. Validate missing or invalid book details.
10. Update an existing book.
11. Retrieve the updated book.
12. Delete an existing book.
13. Test a non-existing book ID.

The Postman request collection is included in the `postman/collections` directory.

## 12. Database Verification

The application uses SQLite to store and retrieve book records.

The database is initialized through `database.js`, which creates the `books` table if it does not already exist.

The application includes the following initial records:

| ID | Title | Author | Price |
|---|---|---|---|
| 1 | The Alchemist | Paulo Coelho | 250 |
| 2 | Atomic Habits | James Clear | 450 |
| 3 | Wings of Fire | A.P.J. Abdul Kalam | 300 |
| 4 | Rich Dad Poor Dad | Robert Kiyosaki | 350 |

Database operations are performed using parameterized SQLite queries.

## 13. Screenshots

The `screenshots` folder contains Postman testing evidence.

The screenshots demonstrate:

- Successful GET requests.
- Search functionality.
- Ascending and descending sorting.
- Pagination.
- Price filtering.
- Invalid price validation.
- Successful POST requests.
- Invalid POST request validation.
- Successful PUT requests.
- Verification of updated records.
- Successful DELETE requests.
- HTTP 404 responses for non-existing records.

These screenshots provide evidence of successful and unsuccessful API test cases.

## 14. Debugging

Common backend development errors studied during this lab include:

**EADDRINUSE:** Occurs when the server port is already occupied by another process.

**Incorrect Import Path:** Occurs when a required module or file is imported using an incorrect path.

**Database Table Name Error:** Occurs when a SQL query references an incorrect table name.

**Missing await:** Can cause asynchronous database operations to execute without waiting for their results.

Debugging these errors helps improve the reliability and correctness of the application.

## 15. Learning Outcomes

Through this lab, I learned:

- REST API design using Express.js.
- Query parameters for searching, sorting, filtering and pagination.
- Input validation and error handling.
- Correct use of HTTP status codes.
- Parameterized SQL queries.
- Prevention of SQL injection vulnerabilities.
- Debugging common backend development errors.
- Testing REST API endpoints using Postman.
- Performing CRUD operations using SQLite.
- Deploying a Node.js REST API using Render.

## 16. Conclusion

This lab helped me extend basic CRUD operations into a more structured REST API.

I implemented query parameters, input validation, appropriate HTTP status codes and SQL injection prevention techniques using Express.js and SQLite.

The project also provided practical experience in API testing, debugging, GitHub version control and deployment using Render.
