# My Blog

A modern blog application built with React, Firebase, and Tailwind CSS. Users can create, edit, and delete blog posts, add comments, and filter content by categories.

## Features

- User authentication with Firebase
- Create, edit, and delete blog posts
- Category-based filtering
- Comment system with author-only deletion
- Dark mode support
- Responsive design with Tailwind CSS
- Protected routes for authenticated users

## Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Routing**: React Router v6
- **State Management**: React Context API

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env`
   ```bash
   cp .env.example .env
   ```
   - Fill in your Firebase configuration values in `.env`
   - Get these from your Firebase project settings at https://console.firebase.google.com/

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
my-blog/
├── src/
│   ├── Components/      # Reusable components
│   │   ├── Post.jsx
│   │   ├── UserContext.jsx
│   │   ├── AuthContext.jsx
│   │   └── PrivateRoutes.jsx
│   ├── Pages/           # Page components
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── Header.jsx
│   ├── firebase/        # Firebase configuration
│   │   ├── firebaseConfig.js
│   │   └── authFunction.js
│   ├── App.jsx
│   └── main.jsx
├── public/
├── .env.example
└── package.json
```

## Environment Variables

Required environment variables (see `.env.example`):

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Usage

1. **Register/Login**: Create an account or sign in with existing credentials
2. **Create Posts**: Use the form on the landing page to publish new posts
3. **Filter Posts**: Select a category from the dropdown to filter content
4. **Edit/Delete**: Click edit or delete buttons on your own posts
5. **Comments**: Add comments to posts and delete your own comments
6. **Dark Mode**: Toggle dark mode using the button in the header

## Notes

- Posts and comments are currently stored in localStorage
- Only post authors can edit/delete their posts
- Only comment authors can delete their comments

## Future Improvements

- Migrate from localStorage to Firestore database
- Add pagination for posts
- Implement search functionality
- Add image upload support
- Add user profiles
- Improve authentication security

## License

MIT
