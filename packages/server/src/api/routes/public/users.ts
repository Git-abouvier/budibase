import controller from "../../controllers/public/users"
import Endpoint from "./utils/Endpoint"
import { nameValidator } from "../utils/validators"

const read = [],
  write = []

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user in the Budibase portal.
 *     tags:
 *       - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: Returns the created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/userOutput'
 *             examples:
 *               user:
 *                 $ref: '#/components/examples/user'
 */
write.push(new Endpoint("post", "/users", controller.create))

/**
 * @openapi
 * /users/{userId}:
 *   put:
 *     summary: Update an existing user by their ID.
 *     tags:
 *       - users
 *     parameters:
 *       - $ref: '#/components/parameters/userId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: Returns the updated user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/userOutput'
 *             examples:
 *               user:
 *                 $ref: '#/components/examples/user'
 */
write.push(new Endpoint("put", "/users/:userId", controller.update))

/**
 * @openapi
 * /users/{userId}:
 *   delete:
 *     summary: Delete an existing user by their ID.
 *     tags:
 *       - users
 *     parameters:
 *       - $ref: '#/components/parameters/userId'
 *     responses:
 *       200:
 *         description: Returns the deleted user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/userOutput'
 *             examples:
 *               user:
 *                 $ref: '#/components/examples/user'
 */
write.push(new Endpoint("delete", "/users/:userId", controller.destroy))

/**
 * @openapi
 * /users/{userId}:
 *   get:
 *     summary: Retrieve a single user by their ID.
 *     tags:
 *       - users
 *     parameters:
 *       - $ref: '#/components/parameters/userId'
 *     responses:
 *       200:
 *         description: Returns the retrieved user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/userOutput'
 *             examples:
 *               user:
 *                 $ref: '#/components/examples/user'
 */
read.push(new Endpoint("get", "/users/:userId", controller.read))

/**
 * @openapi
 * /users/search:
 *   post:
 *     summary: Search for a user based on their email/username.
 *     tags:
 *       - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/nameSearch'
 *     responses:
 *       200:
 *         description: Returns the found users based on search parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - users
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/user'
 *             examples:
 *               users:
 *                 $ref: '#/components/examples/users'
 */
read.push(
  new Endpoint("post", "/users/search", controller.search).addMiddleware(
    nameValidator()
  )
)

export default { read, write }
