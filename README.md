# Full-Stack Web Development Internship

## Internship Submission Repository

This repository contains the projects and supporting materials completed as part of my **Full-Stack Web Development Internship at Prodigy InfoTech**.

The internship focused on practical full-stack web development concepts including authentication and authorization, REST APIs, database integration, CRUD operations, e-commerce functionality, and real-time communication.

---

## Student Details

| Detail                  | Information                               |
| ----------------------- | ----------------------------------------- |
| **Name**                | Pushkar Narayan                           |
| **Admission Number**    | 25SCS1003005607                           |
| **Program**             | B.Tech – Computer Science and Engineering |
| **Semester**            | 3rd Semester                              |
| **Institution**         | IILM University                           |
| **Internship Domain**   | Full-Stack Web Development                |
| **Organization**        | Prodigy InfoTech                          |
| **Internship Duration** | 01 August 2026 – 01 September 2026        |

---

## About the Internship

The internship provided practical exposure to the development of web applications using both frontend and backend technologies. The work involved building multiple applications and understanding how different layers of a full-stack application communicate with one another.

### Major Areas Covered

* Frontend web development
* Backend development with Node.js and Express.js
* REST API development
* MongoDB database integration
* Mongoose ODM
* User authentication and authorization
* Password hashing
* JWT-based authentication
* CRUD operations
* E-commerce application development
* Real-time communication using Socket.IO
* Debugging and testing
* Git and GitHub-based version control

---

## Technologies and Tools Used

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication & Security

* JSON Web Tokens (JWT)
* bcryptjs
* dotenv
* CORS

### Real-Time Communication

* Socket.IO

### Development & Version Control

* Git
* GitHub
* Visual Studio Code
* npm

---

# Projects / Tasks Completed

## Task 1 – Secure User Authentication

A secure authentication application implementing fundamental concepts required for user registration and login.

### Key Features

* User registration
* User login
* Input validation
* Password hashing using `bcryptjs`
* MongoDB database integration
* Mongoose user model
* JWT-based authentication
* Protected API route
* Success and error handling

### Main Technologies

`HTML` · `CSS` · `JavaScript` · `Node.js` · `Express.js` · `MongoDB` · `Mongoose` · `JWT` · `bcryptjs`

### Folder

```text
Task 1 Secure user Authentication/
```

---

## Task 2 – Employee Management System

A full-stack employee management application demonstrating CRUD operations and frontend-backend integration.

### Key Features

* Add employees
* View employee records
* Update employee information
* Delete employee records
* Employee data model
* Validation
* Duplicate email checking
* REST API integration
* Administrative workflow handling
* Search and error handling

### Employee Information

* Name
* Email
* Position
* Department

### Main Technologies

`HTML` · `CSS` · `JavaScript` · `Node.js` · `Express.js` · `MongoDB` · `Mongoose` · `JWT` · `bcryptjs`

### Folders

```text
Task 2 Employee Management System/
├── backend/
└── frontend/
```

---

## Task 3 – E-Commerce Application

A local e-commerce application demonstrating product management, API integration, and shopping-cart functionality.

### Key Features

* Product catalogue
* Product cards
* Product categories
* Product retrieval
* Product creation
* Product deletion
* MongoDB product storage
* Mongoose product model
* Add-to-cart interface

### Product Information

* Product name
* Description
* Price
* Category
* Image

### Main Technologies

`HTML` · `CSS` · `JavaScript` · `Node.js` · `Express.js` · `MongoDB` · `Mongoose` · `CORS` · `dotenv`

### Folders

```text
Task 3 E-Commerce/
├── backend/
└── frontend/
```

---

## Task 4 – Real-Time Chat Application

A real-time chat application demonstrating event-driven communication between users.

### Key Features

* Real-time messaging
* Socket.IO-based communication
* Chat rooms/events
* Message broadcasting
* Message history
* Message persistence
* MongoDB database integration
* Connection handling
* Disconnection handling

### Main Technologies

`HTML` · `CSS` · `JavaScript` · `Node.js` · `Express.js` · `MongoDB` · `Mongoose` · `Socket.IO` · `CORS` · `dotenv`

### Folder

```text
Task 4 Real-Time Chat/
```

---

## Task 5 – Social Media Platform UI

The internship also included a social media platform UI demonstration.

The interface covered concepts such as:

* User profile
* Profile avatar
* Username/handle
* Followers
* Post composer
* Social media feed
* Likes
* Comments
* Sharing
* Trending topics

> **Note:** Task 5 is documented as part of the internship report and presentation. The current GitHub repository contains the source-code folders for Tasks 1–4; a separate Task 5 source-code folder is not included in this repository.

---

# Full-Stack Architecture

The projects follow the general full-stack application flow:

```text
┌─────────────────────────────┐
│          Frontend           │
│     HTML • CSS • JS         │
└──────────────┬──────────────┘
               │
               │ HTTP / REST API
               ▼
┌─────────────────────────────┐
│           Backend           │
│      Node.js + Express      │
└──────────────┬──────────────┘
               │
               │ Mongoose / Database Operations
               ▼
┌─────────────────────────────┐
│          Database           │
│          MongoDB            │
└─────────────────────────────┘

For Task 4:

Frontend ↔ Socket.IO ↔ Node.js/Express ↔ MongoDB
```

---

# Repository Structure

```text
25-29_Pushkar-Narayan_25SCS1003005607_3rdSem_2CSE32-/
│
├── Task 1 Secure user Authentication/
│   ├── public/
│   ├── package.json
│   └── server.js
│
├── Task 2 Employee Management System/
│   ├── backend/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── package.json
│   │   └── server.js
│   └── frontend/
│
├── Task 3 E-Commerce/
│   ├── backend/
│   │   ├── routes/
│   │   ├── package.json
│   │   └── server.js
│   └── frontend/
│
├── Task 4 Real-Time Chat/
│   ├── backend/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── package.json
│   │   └── server.js
│   └── ...
│
├── Internship certificate.pdf
├── Pushkar Narayan Full Stack presentation.pptx
└── README.md
```

---

# How to Run the Projects

## Prerequisites

Install the following:

* Node.js
* npm
* MongoDB
* Git
* Visual Studio Code
* Modern web browser

## 1. Clone the Repository

```bash
git clone https://github.com/pushkarcse-tech/25-29_Pushkar-Narayan_25SCS1003005607_3rdSem_2CSE32-.git
cd 25-29_Pushkar-Narayan_25SCS1003005607_3rdSem_2CSE32-
```

## 2. Navigate to a Project

For example:

```bash
cd "Task 2 Employee Management System/backend"
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Configure Environment Variables

Where required, create a `.env` file in the backend directory and provide the environment variables expected by the application.

**Do not commit passwords, secret keys, database credentials, or other sensitive information to GitHub.**

## 5. Start the Backend

For projects with the development script:

```bash
npm run dev
```

For the standard start script:

```bash
npm start
```

For Task 1:

```bash
node server.js
```

## 6. Run the Frontend

Open the corresponding frontend directory and launch the HTML application using a local development server such as the **Live Server** extension in Visual Studio Code.

---

# Learning Outcomes

Through these projects, I gained practical understanding of:

1. Designing and developing full-stack web applications.
2. Building RESTful APIs using Node.js and Express.js.
3. Connecting backend applications with MongoDB using Mongoose.
4. Implementing authentication using JWT.
5. Securely hashing passwords using bcryptjs.
6. Performing CRUD operations.
7. Connecting frontend interfaces with backend APIs.
8. Implementing real-time communication using Socket.IO.
9. Handling validation, errors, and application flow.
10. Debugging and troubleshooting full-stack applications.
11. Organizing projects into frontend, backend, models, and routes.
12. Using Git and GitHub for source-code management and submission.
13. Preparing technical documentation and internship deliverables.

---

# Skills Developed

## Technical Skills

* Full-Stack Web Development
* Frontend Development
* Backend Development
* REST API Development
* Database Management
* Authentication and Authorization
* Real-Time Web Applications
* CRUD Operations
* Debugging and Troubleshooting
* Version Control

## Professional Skills

* Problem Solving
* Time Management
* Technical Documentation
* Attention to Detail
* Communication
* Independent Learning
* Project Organization

---

# Internship Deliverables

This repository includes the major supporting materials required for internship submission:

* Full-stack development task projects
* Internship completion certificate
* Internship presentation
* Source code organized task-wise
* Technical documentation through this README

The detailed internship report provides the complete description of the internship, objectives, methodology, task-wise work, technologies, learning outcomes, and supporting documents.

---

# Project Repository

**GitHub Repository:**

https://github.com/pushkarcse-tech/25-29_Pushkar-Narayan_25SCS1003005607_3rdSem_2CSE32-

---

# Internship Organization

**Prodigy InfoTech**

Official Website: https://prodigyinfotech.dev/

The internship program includes a Full Stack Web Development track covering areas such as authentication and authorization, REST APIs and databases, e-commerce development, and chat applications.

---

# Acknowledgement

I sincerely thank **Prodigy InfoTech** for providing me with the opportunity to gain practical exposure to full-stack web development. The internship helped me strengthen my technical knowledge through hands-on tasks involving frontend development, backend development, databases, authentication, APIs, and real-time communication.

I also thank **IILM University** for providing the academic platform and support required to undertake and document this internship experience.

---

# Declaration

This repository is submitted as part of my academic internship documentation for the **B.Tech Computer Science and Engineering** program.

**Student:** Pushkar Narayan
**Admission No.:** 25SCS1003005607
**Internship:** Full-Stack Web Development
**Duration:** 01 August 2026 – 01 September 2026

---

# License

This repository is intended primarily for **academic and internship evaluation purposes**. The projects and supporting materials are provided as part of the internship submission.
