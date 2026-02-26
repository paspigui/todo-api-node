const request = require("supertest");
const app = require("../app");
const fs = require("fs");
const path = require("path");
const { getDb } = require("../database/database");

// Before all tests, remove the existing database to start fresh
beforeAll(() => {
  const dbPath = path.join(__dirname, "../todo.db");
  if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
});

describe("Todos API", () => {
  let todoId; // Will store the ID of the created todo for further tests

  // --- Root & Health Endpoints ---
  it("GET / should return welcome message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBeDefined(); // Ensure a welcome message is returned
  });

  it("GET /health should return status UP", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("UP"); // API health check
  });

  // --- CRUD Operations on /todos ---
  it("POST /todos should create a todo", async () => {
    const res = await request(app).post("/todos").send({ title: "Test" });
    expect(res.statusCode).toBe(201); // Expect created status
    expect(res.body.title).toBe("Test");
    todoId = res.body.id; // Save the created todo ID for other tests
  });

  it("GET /todos should return todos array", async () => {
    const res = await request(app).get("/todos");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0); // Ensure at least one todo exists
  });

  it("GET /todos/:id should return a todo", async () => {
    const res = await request(app).get(`/todos/${todoId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(todoId);
  });

  it("GET /todos/:id unknown should return 404", async () => {
    const res = await request(app).get("/todos/9999");
    expect(res.statusCode).toBe(404); // Non-existent todo returns 404
  });

  it("PUT /todos/:id should update todo", async () => {
    const res = await request(app)
      .put(`/todos/${todoId}`)
      .send({ status: "done" });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("done"); // Status update is applied
  });

  it("PUT /todos/:id unknown should return 404", async () => {
    const res = await request(app).put("/todos/9999").send({ status: "done" });
    expect(res.statusCode).toBe(404); // Updating unknown todo fails
  });

  it("DELETE /todos/:id should delete todo", async () => {
    const res = await request(app).delete(`/todos/${todoId}`);
    expect(res.statusCode).toBe(200); // Deletion should succeed
  });

  it("DELETE /todos/:id unknown should return 404", async () => {
    const res = await request(app).delete("/todos/9999");
    expect(res.statusCode).toBe(404); // Deleting unknown todo fails
  });

  it("POST /todos without title should return 422", async () => {
    const res = await request(app).post("/todos").send({});
    expect(res.statusCode).toBe(422); // Title is required
  });

  // --- Search Functionality ---
  it("GET /todos/search/all returns results", async () => {
    await request(app).post("/todos").send({ title: "findme" });
    const res = await request(app).get("/todos/search/all?q=findme");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0); // Search returns matching todos
  });

  it("GET /todos/search/all returns empty array", async () => {
    const res = await request(app).get("/todos/search/all?q=notfound");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]); // No matches should return empty array
  });

  // --- Database Utility Tests ---
  it("getDb loads existing DB file", async () => {
    const db1 = await getDb();
    db1.run("INSERT INTO todos (title) VALUES (?)", ["Existing DB test"]);

    const db2 = await getDb();
    const rows = db2.exec("SELECT * FROM todos");
    expect(rows[0].values.length).toBeGreaterThan(0); // Ensure DB persists between calls
  });

  it("getDb loads from existing file on disk", async () => {
    const { saveDb } = require("../database/database");
    saveDb(); // Save the DB

    jest.resetModules(); // Reload the module to simulate fresh import
    const { getDb: freshGetDb } = require("../database/database");
    const db = await freshGetDb();
    expect(db).toBeDefined(); // Database file is loaded correctly
  });

  it("GET /todos should return empty array when no todos", async () => {
    const db = await getDb();
    db.run("DELETE FROM todos"); // Remove all todos

    const res = await request(app).get("/todos");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]); // Returns empty array when DB is empty
  });

  it("GET /todos/:id with unknown id returns 404 (isolated)", async () => {
    const res = await request(app).get("/todos/888888");
    expect(res.statusCode).toBe(404);
    expect(res.body.detail).toBe("Todo not found"); // Proper error message
  });
});
