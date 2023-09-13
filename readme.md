<!-- TOC -->
- [API Documentation](#api-documentation)
  - [Base URL](#base-url)
  - [Endpoints](#endpoints)
    - [1. Create a New User](#1-create-a-new-user)
    - [2. Get User by Name](#2-get-user-by-name)
    - [3. Update User by Name](#3-update-user-by-name)
    - [4. Delete User by Name](#4-delete-user-by-name)
  - [Sample Usage](#sample-usage)
    - [Creating a New User](#creating-a-new-user)
    - [Getting a User by Name](#getting-a-user-by-name)
  - [Setup and Deployment](#setup-and-deployment)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Configuration](#configuration)
    - [Running Locally](#running-locally)
  - [testing](#testing)
    - [Deployment](#deployment)
  - [UML:](#uml)
      - [1. **User Model Class**:](#1-user-model-class)
<!-- /TOC -->



# API Documentation




## Base URL

The base URL for accessing this API is: `https://hngx-eight.vercel.app`


## Endpoints

### 1. Create a New User

**Endpoint:** `https://hngx-eight.vercel.app/api`

**HTTP Method:** `POST`

**Request Format:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}
```

**Response Format:**

```json
{
  "status": "success",
  "user": {
    "_id": "12345",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30
  }
}
```

### 2. Get User by Name

**Endpoint:** `https://hngx-eight.vercel.app/api/{name}`

**HTTP Method:** `GET`

**Response Format:**

```json
{
  "status": "success",
  "user": {
    "_id": "12345",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30
  }
}
```

### 3. Update User by Name

**Endpoint:** `https://hngx-eight.vercel.app/api/{name}`

**HTTP Method:** `PUT`

**Request Format:**

```json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "age": 35
}
```

**Response Format:**

```json
{
  "status": "success",
  "user": {
    "_id": "12345",
    "name": "Updated Name",
    "email": "updated@example.com",
    "age": 35
  }
}
```

### 4. Delete User by Name

**Endpoint:** `https://hngx-eight.vercel.app/api/{name}`

**HTTP Method:** `DELETE`

**Response Format:**

```json
{
  "status": "success",
  "message": "User successfully deleted"
}
```

## Sample Usage

### Creating a New User

**Request:**

```http
POST /api HTTP/1.1
Host: https://hngx-eight.vercel.app
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}
```

**Response:**

```json
HTTP/1.1 201 Created
Content-Type: application/json

{
  "status": "success",
  "user": {
    "_id": "12345",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30
  }
}
```

### Getting a User by Name

**Request:**

```http
GET /api/John%20Doe HTTP/1.1
Host: https://hngx-eight.vercel.app
```

**Response:**

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": "success",
  "user": {
    "_id": "12345",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30
  }
}
```



## Setup and Deployment

To set up and deploy the API, follow these steps:

### Prerequisites

create a an account on mongodb atlas and setup a mongodb database
add the mongodb url to the .env file(create a .env file) to connect the db to the server
add your port to the .env file

### Installation

1. Clone the repository from https://github.com/LamsyA/Hngx.git.
2. Navigate to the project directory using the command line.
3. Install the required dependencies by running:

   ```
   npm install
   ```

### Configuration

create .env file and add PORT of your choice.

### Running Locally

To run the API locally, execute the following command:

```
npm start or npm run dev
```

The API will be accessible at `http://localhost:3000`.


## testing

to run the API local testing 
```
npm test
```
### Deployment

deploy it on any deployment platform of your choice






---


  ## UML:

  ![Alt Text](./public/task2.drawio%20(2).png)




#### 1. **User Model Class**:
   - Class Name: `User`
   - Attributes:
     - `name`: String
     - `email`: String (optional)
     - `age`: Number
   - Methods:
     - Constructor to initialize attributes
     - Getter and setter methods for attributes

2. **Controllers**:
   - `UserController`
     - Methods:
       - `createUser(req: Request, res: Response)`: Responsible for creating a new user.
       - `updateUser(req: Request, res: Response)`: Responsible for updating a user by name.
       - `getUserByName(req: Request, res: Response)`: Responsible for getting a user by name.
       - `deleteUser(req: Request, res: Response)`: Responsible for deleting a user by name.

3. **Routes**:
   - `UserRoutes`
     - Methods:
       - `POST /api/`: Maps to `UserController.createUser`
       - `PUT /api/:name`: Maps to `UserController.updateUser`
       - `GET /api/:name`: Maps to `UserController.getUserByName`
       - `DELETE /api/:name`: Maps to `UserController.deleteUser`

4. **Express App**:
   - `app`
     - Middleware:
       - `helmet()`: Adds security headers.
       - `logger("dev")`: Logs HTTP requests.
       - `bodyParser.json()`: Parses JSON request bodies.
       - `bodyParser.urlencoded({ extended: true })`: Parses URL-encoded request bodies.
       - `cors()`: Enables CORS support.
       - `express.json()`: JSON parsing middleware .
     - Routes:
       - `/home`: Mounted from `home` route module.
       - `/api`: Mounted from `api` route module.
     - MongoDB Connection:
       - Connected to MongoDB using Mongoose.

5. **External Dependencies**:
   - MongoDB: Used to store user data.
   - dotenv: Used for environment variable configuration.

