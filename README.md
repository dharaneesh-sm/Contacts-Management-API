## Project Overview

### Description

📇 This project is a Contact Management API that allows users to manage their contacts. Users can create an account using their email and password, log in to their account, and perform various operations related to contacts. The operations include creating, updating, retrieving, and deleting contacts. Additionally, users can list all contacts and view the current user.

### Tech Stack

- **Node.js:** Server-side JavaScript runtime 🟩
- **Express.js:** Web application framework for Node.js 🛠️
- **JWT (JSON Web Token):** Used for securing endpoints and managing user authentication 🔐
- **MongoDB:** NoSQL database for storing user and contact data 🗄️
- **Mongoose:** ODM (Object Data Modeling) library for MongoDB and Node.js 📄

### Features

1. **User Authentication:**
    - **Sign Up:** Users can create an account using their email and password 📝.
    - **Login:** Users can log in to their account, which generates an access token using JWT 🔑.
2. **Contact Management:**
    - **Create Contact:** Authenticated users can create a new contact 📇.
    - **Update Contact:** Authenticated users can update existing contacts 📝.
    - **Get Contact by ID:** Authenticated users can retrieve a specific contact by its ID 🔍.
    - **Delete Contact:** Authenticated users can delete a contact 🗑️.
    - **List All Contacts:** Authenticated users can list all their contacts 📋.
    - **Get Current User:** Authenticated users can retrieve their own user information 👤.

### API Endpoints

1. **Authentication:**
    - `POST /users/register`: Register a new user 📝.
    - `POST users/login`: Authenticate a user and return a JWT access token 🔑.
2. **Contact Management:**
    - `POST /contacts`: Create a new contact 📇.
    - `GET /contacts`: List all contacts 📋.
    - `GET /contacts/:id`: Get a contact by ID 🔍.
    - `PUT /contacts/:id`: Update a contact by ID 📝.
    - `DELETE /contacts/:id`: Delete a contact 🗑️.
3. **User Management:**
    - `GET /users/current`: Retrieve the current user's information 👤.

### Security

- **JWT Authentication:** Protects routes and ensures only authenticated users can perform contact management operations 🔐.
- **Password Hashing:** Ensures user passwords are stored securely 🛡️.

### Database Schema

1. **User:**
    - `userName`: String (required, unique) 🆔
    - `email`: String (required, unique) 📧
    - `password`: String (required, hashed) 🔒
2. **Contact:**
    - `name`: String (required) 📝
    - `email`: String (required) 📧
    - `phone`: String (required) 📞
    - `userId`: Reference to the User (required) 👤

### Example Workflow

1. A user signs up with their email and password 📝.
2. The user logs in and receives a JWT access token 🔑.
3. Using the access token, the user can create a new contact 📇, list all their contacts 📋, retrieve a contact by ID 🔍, update a contact 📝, or delete a contact 🗑️.
4. The user can also view their own account details 👤.
