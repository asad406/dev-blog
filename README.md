# Dev Blog Server

## Description:

My Dev Blog Server lets users create, update, delete, and view blog posts. It features secure login for users, and admins can manage user accounts and blogs. There’s a public API for browsing blogs with search, sort, and filter options.

## Features

- **As Admin**:
- Can delete any blog.
- Can block any user.

- **As User**: 
- Can register and log in.
- Can create blogs (only when logged in).
- Can update and delete their own blogs.

- **Validation and Error Handling**: Ensure data validation using mongoose and zod validation and feedback suitable Error.

## Used Technology and Installation instruction

- [Node.js](https://nodejs.org/download/package-manager/.) (Download Node.js)
- Express (`npm i express`)
- MongoDB (`npm i mongodb`)
- Mongoose (`npm i mongoose`)
- Dotenv (`npm i dotenv`)
- Cors (`npm i cors`)

### Some development dependencies

- TypeScript (`npm install typescript --save-dev`)
- Eslint (`npm i -D eslint@9.14.0`)
- Prettier (`npm i -D --exact prettier`)

## Instruction to run the Project

- To nun this project in command line enter
  (`ts-node-dev --respawn --transpile-only src/server.ts`)
- To build the project
  (`tsc`)
- To find error by lint
  (`npx eslint . `)
- To format the project
  (`prettier . --write`)

## Endpoints

- POST /api/auth/register : To register new user.
- POST /api/auth/login : To login new user.
- POST /api/blogs : To create blogs by logged in user.
- PATCH /api/blogs/:id : Update blog by logged in user.
- DELETE /api/blogs/:id : Delete blog by logged in user.
- GET /api/blogs : Get all blogs(public)
- PATCH /api/admin/users/:userId/block : Block User by admin
- DELETE /api/admin/blogs/:id : Delete blog by admin

## Backend Server

- In this project use Vercel as live server
- [Live link](https://dev-blog-server-mauve.vercel.app/)
