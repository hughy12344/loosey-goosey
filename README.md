Deployed at: https://loosey-goosey.vercel.app/

Folder Structure

```
.
├── client
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   └── goose.svg
│   ├── src
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── ClientForm.jsx
│   │   ├── ExerciseDetails.jsx
│   │   ├── ExerciseForm.jsx
│   │   ├── api
│   │   │   ├── authAPI.jsx
│   │   │   ├── clientAPI.jsx
│   │   │   └── exerciseAPI.jsx
│   │   ├── components
│   │   │   ├── Banner.jsx
│   │   │   ├── Calendar.jsx
│   │   │   ├── CalendarUtilities.jsx
│   │   │   └── Footer.jsx
│   │   ├── hooks
│   │   │   ├── useClients.jsx
│   │   │   ├── useClientsManagement.jsx
│   │   │   ├── useExercises.jsx
│   │   │   └── useExercisesManagement.jsx
│   │   ├── main.jsx
│   │   └── pages
│   │       ├── CalendarPage.jsx
│   │       ├── ClientsPage.jsx
│   │       ├── HomePage.jsx
│   │       ├── LoginPage.jsx
│   │       └── RegisterPage.jsx
│   └── vite.config.js
└── server
    ├── middleware
    │   └── auth.js
    ├── models
    │   ├── client.js
    │   ├── exercise.js
    │   └── user.js
    ├── package-lock.json
    ├── package.json
    ├── route.rest
    ├── routes
    │   ├── auth.js
    │   ├── clients.js
    │   └── exercises.js
    └── server.js
```
