import express from "express";
import {
  deleteTheme,
  getThemeById,
  getThemes,
  patchTheme,
  postTheme,
  putTheme,
} from "./controllers/themes/themes";
import {
  // deletePost,
  // getPostById,
  // getPosts,
  // patchPost,
  postPost,
  // putPost,
} from "./controllers/posts/posts";

const router = express.Router();

/**
 * @swagger
 * /themes:
 *   post:
 *     summary: Create a new theme
 *     tags: [Themes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ThemeInput'
 *     responses:
 *       201:
 *         description: Theme created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Theme'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/themes", postTheme);

/**
 * @swagger
 * /themes:
 *   get:
 *     summary: Get all themes
 *     tags: [Themes]
 *     responses:
 *       200:
 *         description: List of all themes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Theme'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/themes", getThemes);

/**
 * @swagger
 * /themes/{id}:
 *   get:
 *     summary: Get a theme by ID
 *     tags: [Themes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Theme ID
 *     responses:
 *       200:
 *         description: Theme found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Theme'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/themes/:id", getThemeById);

/**
 * @swagger
 * /themes/{id}:
 *   put:
 *     summary: Update a theme completely
 *     tags: [Themes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Theme ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ThemeInput'
 *     responses:
 *       200:
 *         description: Theme updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Theme'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.put("/themes/:id", putTheme);

/**
 * @swagger
 * /themes/{id}:
 *   patch:
 *     summary: Update a theme partially
 *     tags: [Themes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Theme ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 100
 *               description:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 300
 *     responses:
 *       200:
 *         description: Theme updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Theme'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.patch("/themes/:id", patchTheme);

/**
 * @swagger
 * /themes/{id}:
 *   delete:
 *     summary: Delete a theme
 *     tags: [Themes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Theme ID
 *     responses:
 *       200:
 *         description: Theme deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Theme deleted successfully
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.delete("/themes/:id", deleteTheme);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostInput'
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/posts", postPost);

// /**
//  * @swagger
//  * /posts:
//  *   get:
//  *     summary: Get all posts
//  *     tags: [Posts]
//  *     responses:
//  *       200:
//  *         description: List of all posts
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Post'
//  *       500:
//  *         $ref: '#/components/responses/ServerError'
//  */
// router.get("/posts", getPosts);

// /**
//  * @swagger
//  * /posts/{id}:
//  *   get:
//  *     summary: Get a post by ID
//  *     tags: [Posts]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: Post ID
//  *     responses:
//  *       200:
//  *         description: Post found
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Post'
//  *       404:
//  *         $ref: '#/components/responses/NotFound'
//  *       500:
//  *         $ref: '#/components/responses/ServerError'
//  */
// router.get("/posts/:id", getPostById);

// /**
//  * @swagger
//  * /posts/{id}:
//  *   put:
//  *     summary: Update a post completely
//  *     tags: [Posts]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: Post ID
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/PostInput'
//  *     responses:
//  *       200:
//  *         description: Post updated successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Post'
//  *       400:
//  *         $ref: '#/components/responses/ValidationError'
//  *       404:
//  *         $ref: '#/components/responses/NotFound'
//  *       500:
//  *         $ref: '#/components/responses/ServerError'
//  */
// router.put("/posts/:id", putPost);

// /**
//  * @swagger
//  * /posts/{id}:
//  *   patch:
//  *     summary: Update a post partially
//  *     tags: [Posts]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: Post ID
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               title:
//  *                 type: string
//  *                 minLength: 1
//  *                 maxLength: 100
//  *               themeId:
//  *                 type: integer
//  *     responses:
//  *       200:
//  *         description: Post updated successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Post'
//  *       400:
//  *         $ref: '#/components/responses/ValidationError'
//  *       404:
//  *         $ref: '#/components/responses/NotFound'
//  *       500:
//  *         $ref: '#/components/responses/ServerError'
//  */
// router.patch("/posts/:id", patchPost);

// /**
//  * @swagger
//  * /posts/{id}:
//  *   delete:
//  *     summary: Delete a post
//  *     tags: [Posts]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: Post ID
//  *     responses:
//  *       200:
//  *         description: Post deleted successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: Post deleted successfully
//  *       404:
//  *         $ref: '#/components/responses/NotFound'
//  *       500:
//  *         $ref: '#/components/responses/ServerError'
//  */
// router.delete("/posts/:id", deletePost);
export default router;
