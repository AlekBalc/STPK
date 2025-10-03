import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "STPK API",
      version: "1.0.0",
      description: "A comprehensive API for managing themes and posts",
      contact: {
        name: "API Support",
        email: "support@stpk.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        Theme: {
          type: "object",
          required: ["title", "description"],
          properties: {
            id: {
              type: "integer",
              description: "Auto-generated unique identifier",
              readOnly: true,
            },
            title: {
              type: "string",
              minLength: 1,
              maxLength: 100,
              description: "Theme title",
              example: "Technology Discussion",
            },
            description: {
              type: "string",
              minLength: 1,
              maxLength: 300,
              description: "Theme description",
              example: "A place to discuss latest technology trends",
            },
          },
        },
        Post: {
          type: "object",
          required: ["title", "themeId"],
          properties: {
            id: {
              type: "integer",
              description: "Auto-generated unique identifier",
              readOnly: true,
            },
            title: {
              type: "string",
              minLength: 1,
              maxLength: 100,
              description: "Post title",
              example: "Latest AI Developments",
            },
            themeId: {
              type: "integer",
              description: "ID of the theme this post belongs to",
              example: 1,
            },
          },
        },
        Comment: {
          type: "object",
          required: ["content", "postId"],
          properties: {
            id: {
              type: "integer",
              description: "Auto-generated unique identifier",
              readOnly: true,
            },
            content: {
              type: "string",
              minLength: 1,
              maxLength: 100,
              description: "Comment content",
              example: "This is a great post!",
            },
            postId: {
              type: "integer",
              description: "ID of the post this comment belongs to",
              example: 1,
            },
          },
        },
        ThemeInput: {
          type: "object",
          required: ["title", "description"],
          properties: {
            title: {
              type: "string",
              minLength: 1,
              maxLength: 100,
              description: "Theme title",
              example: "Technology Discussion",
            },
            description: {
              type: "string",
              minLength: 1,
              maxLength: 300,
              description: "Theme description",
              example: "A place to discuss latest technology trends",
            },
          },
        },
        PostInput: {
          type: "object",
          required: ["title", "themeId"],
          properties: {
            title: {
              type: "string",
              minLength: 1,
              maxLength: 100,
              description: "Post title",
              example: "Latest AI Developments",
            },
            themeId: {
              type: "integer",
              description: "ID of the theme this post belongs to",
              example: 1,
            },
          },
        },
        CommentInput: {
          type: "object",
          required: ["content", "postId"],
          properties: {
            content: {
              type: "string",
              minLength: 1,
              maxLength: 100,
              description: "Comment content",
              example: "This is a great post!",
            },
            postId: {
              type: "integer",
              description: "ID of the post this comment belongs to",
              example: 1,
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Error message",
            },
            errors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  field: {
                    type: "string",
                    description: "Field that caused the error",
                  },
                  message: {
                    type: "string",
                    description: "Error message for the field",
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        NotFound: {
          description: "Resource not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
              example: {
                message: "Resource not found",
              },
            },
          },
        },
        ValidationError: {
          description: "Validation error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
              example: {
                message: "Validation failed",
                errors: [
                  {
                    field: "title",
                    message: "Title is required",
                  },
                ],
              },
            },
          },
        },
        ServerError: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
              example: {
                message: "Internal server error",
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/router.ts", "./src/controllers/**/*.ts"], // Paths to files containing OpenAPI definitions
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true,
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "STPK API Documentation",
    })
  );

  // Serve the raw OpenAPI specification at /api-docs.json
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(specs);
  });
};

export default specs;
