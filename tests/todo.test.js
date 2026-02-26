const request = require("supertest");
const app = require("../app");
const fs = require("fs");
const path = require("path");
const { getDb } = require("../database/database");

beforeAll(() => {
  const dbPath = path.join(__dirname, "../todo.db");
  if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
});

describe("Todos API", () => {
  let todoId;

  // --- Root & health ---
  it("GET / should return welcome message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBeDefined();
  });

  it("GET /health should return status UP", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("UP");
  });

  // --- CRUD /todos ---
  it("POST /todos should create a todo", async () => {
    const res = await request(app).post("/todos").send({ title: "Test" });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test");
    todoId = res.body.id;
  });

  it("GET /todos should return todos array", async () => {
    const res = await request(app).get("/todos");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("GET /todos/:id should return a todo", async () => {
    const res = await request(app).get(`/todos/${todoId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(todoId);
  });

  it("GET /todos/:id unknown should return 404", async () => {
    const res = await request(app).get("/todos/9999");
    expect(res.statusCode).toBe(404);
  });

  it("PUT /todos/:id should update todo", async () => {
    const res = await request(app)
      .put(`/todos/${todoId}`)
      .send({ status: "done" });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("done");
  });

  it("PUT /todos/:id unknown should return 404", async () => {
    const res = await request(app).put("/todos/9999").send({ status: "done" });
    expect(res.statusCode).toBe(404);
  });

  it("DELETE /todos/:id should delete todo", async () => {
    const res = await request(app).delete(`/todos/${todoId}`);
    expect(res.statusCode).toBe(200);
  });

  it("DELETE /todos/:id unknown should return 404", async () => {
    const res = await request(app).delete("/todos/9999");
    expect(res.statusCode).toBe(404);
  });

  it("POST /todos without title should return 422", async () => {
    const res = await request(app).post("/todos").send({});
    expect(res.statusCode).toBe(422);
  });

  // --- Search ---
  it("GET /todos/search/all returns results", async () => {
    await request(app).post("/todos").send({ title: "findme" });
    const res = await request(app).get("/todos/search/all?q=findme");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("GET /todos/search/all returns empty array", async () => {
    const res = await request(app).get("/todos/search/all?q=notfound");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("getDb loads existing DB file", async () => {
    const db1 = await getDb();
    db1.run("INSERT INTO todos (title) VALUES (?)", ["Existing DB test"]);

    const db2 = await getDb();
    const rows = db2.exec("SELECT * FROM todos");
    expect(rows[0].values.length).toBeGreaterThan(0);
  });
  it("getDb loads from existing file on disk", async () => {
    const { saveDb } = require("../database/database");
    saveDb();

    jest.resetModules();
    const { getDb: freshGetDb } = require("../database/database");
    const db = await freshGetDb();
    expect(db).toBeDefined();
  });

  it("GET /todos should return empty array when no todos", async () => {
    const db = await getDb();
    db.run("DELETE FROM todos");

    const res = await request(app).get("/todos");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("GET /todos/:id with unknown id returns 404 (isolated)", async () => {
    const res = await request(app).get("/todos/888888");
    expect(res.statusCode).toBe(404);
    expect(res.body.detail).toBe("Todo not found");
  });
});
