# teamfinder2.0-backend

This project is a continuation of my teamfinder app built using the MERN stack.

Teamfinder 2.0 adds TypeScript to the backend and will also have user authorization and authentication which will be required to make changes to the database (i.e. teams and users)

## teamfinder 1.0 (for comparision)
The original app is deployed [here](https://teamfinder1-0.netlify.app/)

The repo for the original backend code is [here](https://github.com/MattiHel85/rest_api_assignment_TO00BS65-3003)

The repo for the original frontend code is [here](https://github.com/MattiHel85/laureafullstack-to00bs65-3003-assignment-3-football-react)

## Authentication

Some routes require authentication using JSON Web Tokens (JWT). To authenticate, include the generated token in the Authorization header of your requests.

## Teams Routes

### Get All Teams

**Endpoint:** `GET /teams`

Retrieve a list of all teams.

### Get Team by ID

**Endpoint:** `GET /teams/:id`

Retrieve information about a specific team by providing its ID in the URL.

### Add Team

**Endpoint:** `POST /teams/addteam`

Add a new team. Requires admin authentication.

### Update Team by ID

**Endpoint:** `PUT /teams/update/:id`

Update information for a specific team by providing its ID in the URL. Requires admin authentication.

### Delete Team by ID

**Endpoint:** `DELETE /teams/delete/:id`

Delete a team by providing its ID in the URL. Requires admin authentication.

## Users Routes

### Get All Users

**Endpoint:** `GET /users`

Retrieve a list of all users. Requires admin authentication.

### Get User by ID

**Endpoint:** `GET /users/:id`

Retrieve information about a specific user by providing their ID in the URL. Requires admin authentication.

### Add User

**Endpoint:** `POST /users/adduser`

Add a new user.

### Update User by ID

**Endpoint:** `PUT /users/update/:id`

Update information for a specific user by providing their ID in the URL. Requires admin or user authentication for self-update.

### Delete User by ID

**Endpoint:** `DELETE /users/delete/:id`

Delete a user by providing their ID in the URL. Requires admin or user authentication for self-deletion.