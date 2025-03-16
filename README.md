Todo & User API – README
Overview
This API allows users to manage todos and user accounts. It is built with NestJS and follows RESTful principles.
-----------------
How It Works
1. Users & Todos Relationship
Each user can have multiple todos.
Todos are linked to users via a userId field.
A user must exist before creating a todo.

2. API Flow
User Registration
Create a user first using the /users endpoint.
Creating Todos
Once a user exists, they can create todos using /todos.
Retrieving Todos
Fetch all todos for a user with GET /todos?user=<USER_ID>.
Managing Todos
Update or delete todos using PUT /todos/:id or DELETE /todos/:id.

Setup & Running the API
1. Install Dependencies
npm install

2. Configure Environment Variables
Create a .env file in the project root and define:
PORT=3000
DATABASE_URL=mongodb://localhost:27017/todo-db

3. Start Server
npm run start

4. Access Swagger Docs

http://localhost:3000/api/docs

5. these server is deployed using render intital loading will take some time 
