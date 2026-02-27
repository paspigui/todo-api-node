// Swagger specification (OpenAPI 3) generator using swagger-jsdoc
// This file exports the generated OpenAPI spec as a plain JS object so
// it can be required synchronously by the application (no runtime YAML parsing).
//
// Comments below explain the structure used by the project and the main
// components (info, servers, components.schemas, paths). Keep comments
// updated when you add/remove endpoints or change request/response shapes.

const swaggerJsdoc = require("swagger-jsdoc");

// Options passed to swagger-jsdoc which describes the OpenAPI document.
// - definition: the root OpenAPI object
// - apis: where to look for JSDoc comments (unused here, we define paths inline)
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo API",
      version: "1.0.0",
      description: "Documentation Swagger de l'API Todo",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      // Reusable schema definitions. Use $ref to reference them from paths.
      // - Todo: full representation returned by GET endpoints
      // - TodoInput: payload expected when creating/updating a todo (no id)
      // - ErrorResponse: generic error object returned by 4xx responses
      schemas: {
        Todo: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            title: { type: "string", example: "Buy milk" },
            description: { type: "string", nullable: true, example: "2L" },
            status: { type: "string", example: "pending" },
          },
          required: ["id", "title", "status"],
        },
        TodoInput: {
          type: "object",
          properties: {
            title: { type: "string", example: "Buy milk" },
            description: { type: "string", nullable: true, example: "2L" },
            status: { type: "string", example: "pending" },
          },
          required: ["title"],
        },
        ErrorResponse: {
          type: "object",
          properties: {
            detail: { type: "string", example: "Todo not found" },
          },
        },
      },
    },
    paths: {
      // Paths section describes available endpoints, parameters, request/response
      // bodies and status codes. Keep these in sync with `routes/todo.js`.
      "/": {
        get: {
          summary: "Welcome endpoint",
          responses: {
            200: {
              description: "Welcome message",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/health": {
        get: {
          summary: "Health check",
          responses: {
            200: {
              description: "Service status",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      status: { type: "string", example: "UP" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/todos": {
        get: {
          summary: "List todos",
          parameters: [
            {
              in: "query",
              name: "skip",
              schema: { type: "integer", default: 0 },
            },
            {
              in: "query",
              name: "limit",
              schema: { type: "integer", default: 10 },
            },
          ],
          responses: {
            200: {
              description: "List of todos",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Todo" },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: "Create todo",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/TodoInput" },
              },
            },
          },
          responses: {
            201: {
              description: "Created todo",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Todo" },
                },
              },
            },
            422: {
              description: "Validation error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/todos/{id}": {
        get: {
          summary: "Get todo by id",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "integer" },
            },
          ],
          responses: {
            200: {
              description: "Todo found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Todo" },
                },
              },
            },
            404: {
              description: "Not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
        put: {
          summary: "Update todo",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "integer" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/TodoInput" },
              },
            },
          },
          responses: {
            200: {
              description: "Updated todo",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Todo" },
                },
              },
            },
            404: {
              description: "Not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
        delete: {
          summary: "Delete todo",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "integer" },
            },
          ],
          responses: {
            200: {
              description: "Deletion confirmation",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      detail: { type: "string", example: "Todo deleted" },
                    },
                  },
                },
              },
            },
            404: {
              description: "Not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/todos/search/all": {
        get: {
          summary: "Search todos by title",
          parameters: [
            {
              in: "query",
              name: "q",
              schema: { type: "string" },
            },
          ],
          responses: {
            200: {
              description: "Search results",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Todo" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [],
};

// Export the generated OpenAPI specification. The consuming code (app.js)
// does `require('./swagger')` and passes this object to swagger-ui-express.
module.exports = swaggerJsdoc(options);
