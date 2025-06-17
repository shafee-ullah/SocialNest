# Social Development Events Platform

A community-driven event management platform where users can create, join, and track social service events in their local area.

## Live URL

[Add your live URL here]

## Key Features

- User Authentication (Email/Password & Google Sign-in)
- Create and Manage Social Service Events
- Join Events
- View Upcoming Events
- Event Search and Filtering
- Dark/Light Theme Toggle
- Responsive Design
- JWT Authentication
- Real-time Updates

## Tech Stack

### Frontend

- React
- React Router
- Tailwind CSS
- Firebase Authentication
- React Hot Toast
- React Datepicker
- React Icons

### Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- CORS
- Dotenv

## Getting Started

1. Clone the repository

```bash
git clone [repository-url]
```

2. Install dependencies

```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

3. Set up environment variables

```bash
# Frontend (.env)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

# Backend (.env)
PORT=5000
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
```

4. Start the development servers

```bash
# Start frontend
cd client
npm run dev

# Start backend
cd ../server
npm run dev
```

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── provider/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── config/
│   │   └── assets/
│   └── public/
└── server/
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   └── middleware/
    └── config/
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)
- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
