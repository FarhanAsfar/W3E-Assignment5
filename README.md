# W3E-Assignment5
# Building a Task Manager App using React

This project fethces data from the jsonplaceholder api and display those data. Search functionality is added for finding specific tasks. Any tasks can be set to **DONE** and **DUE** by toggling the button

---

## Tech Stack

- React
- JSONPlaceholder API - Mock REST API for tasks
- Tailwind CSS - Utility-first CSS framework
- localStorage API - Client-side data persistence

---

# Project Setup

---

## 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Start the development server

```bash
npm run dev
```
Now you should have the project up and running.

## API Reference

The application uses the JSONPlaceholder API:
Endpoint: https://jsonplaceholder.typicode.com/todos

**Response Structure:**
```
json{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
```

## Project Features
**Home Page**
<img width="1512" height="915" alt="home" src="https://github.com/user-attachments/assets/68bca246-8690-450a-8069-df68da5daf32" />

**Task List Page**
<img width="1764" height="838" alt="tasklist" src="https://github.com/user-attachments/assets/c5560a06-cd53-4265-9d54-53bf9c5eb8b0" />

**Task Detail Page**
<img width="812" height="705" alt="taskdetail" src="https://github.com/user-attachments/assets/eb089339-c5e1-4a1d-afb7-03590b33461d" />

**Searching Tasks by Titile**

<img width="1493" height="628" alt="searcj" src="https://github.com/user-attachments/assets/a29ffaec-6c0c-4299-8b74-ef8f54fe3bb7" />


### Features
- Toggling is persistent between refresh
- Added Pagination
- Intentional delay is set to show loading icon

### Limitations
- Code could have been more organized
- Css/ Dark mode functionality should be better
- Throttling could have been added for api calls
