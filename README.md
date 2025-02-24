# Collaborative Study Platform

## Overview

**Collaborative Study Platform** is a web application that connects students, tutors, and administrators to streamline study session scheduling, resource sharing, and user management. The platform supports secure authentication, session booking, material sharing, and role-based access for students, tutors, and admins.

## Admin Credentials

- **Admin Username**: mdashik@gmail.com
- **Admin Password**: 123456
- **Live Site URL**: [https://studyhub.com](https://studyhub-online.web.app/)

## Features

- **User Authentication**: Secure login with JWT tokens and social logins (Google).
- **Role-Based Access**: Role management with student, tutor, and admin-specific access.
- **Session Management**: Students can book, view, and review study sessions.
- **Material Sharing**: Tutors can upload and manage study materials. Students can access materials based on their booked sessions.
- **Payment Integration**: Stripe integration for paid sessions, session booking is free for sessions marked with zero fees.
- **Dashboard**:
  - **Student Dashboard**: View booked sessions, create notes, and access materials.
  - **Tutor Dashboard**: Create sessions, upload materials, and view session statuses.
  - **Admin Dashboard**: View all users, sessions, and materials; approve/reject sessions; update user roles.
- **Rejection Feedback**: Admin provides rejection reasons for sessions.
- **Announcing System**: Admin can create announcements that are publicly visible.

## Tech Stack

- **Frontend**:
  - React.js
  - React Router DOM
  - React Hook Form
  - React Icons
  - Axios
  - Moment.js
  - SweetAlert2
  - Firebase
  - Stripe.js and React Stripe.js
  - TanStack React Query
  - JWT Decode

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JWT for authentication
  - Stripe for payment processing

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/mdashik-dev/studyhub-client.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd studyhub-client
   ```

3. **Install frontend dependencies**:

   ```bash
   npm install
   ```

4. **Clone backend Repository**:

   ```bash
   https://github.com/mdashik-dev/studyhub-server.git
   ```

5. **Configure environment variables**:
   
   Create a `.env` file for both frontend and backend.

   **Frontend (.env)**:

   ```env
   VITE_FIREBASE_API_KEY = your_firebase_api_key
   VITE_AUTHDOMAIN = your_firebase_auth_domain
   VITE_PROJECTID = your_firebase_project_id
   VITE_STORAGEBUCKET = your_firebase_storage_bucket
   VITE_MESSAGESENDERID = your_firebase_messaging_sender_id
   VITE_APPID = your_firebase_app_id
   VITE_STRIPE_PUBLIC_KEY = your_stripe_public_key
   ```

   **Backend (.env)**:

   ```env
   MONGO_URI= your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME = cloudinary_username
   CLOUDINARY_API_KEY = cloudinary_api_key
   CLOUDINARY_API_SECRET = cloudinary_secret
   SECURE_KEY = stripe_secure_key

   ```

6. **Start the backend server**:

   ```bash
   cd studyhub-server
   npm run server
   ```

7. **Start the frontend development server**:

   ```bash
   npm run dev
   ```

## Usage

1. **Authentication**:
   - Users can log in via email/password or social login (Google). Social login defaults the user role to student.
   - JWT tokens are used to authenticate the user and are stored in `localStorage`.

2. **Role-Based Access**:
   - Admin can view and manage users and sessions.
   - Tutors can create sessions, upload materials, and manage session status.
   - Students can book sessions, create notes, and access materials related to their booked sessions.

3. **Study Session**:
   - Sessions are displayed on the homepage with registration status (Ongoing/Closed).
   - Logged-in users can click "Read More" to view session details.
   - If the session is free, students can book directly; otherwise, they’ll be redirected to a payment page.
   
4. **Payment System**:
   - Stripe integration for session payments.
   - After successful payment, the session is booked.
   - Free sessions can be booked without payment.

5. **Dashboard**:
   - **Student**: Can view booked sessions, create and manage personal notes, and access study materials.
   - **Tutor**: Can create sessions, upload materials, and manage approved sessions.
   - **Admin**: Can manage users, approve/reject sessions, and remove inappropriate materials.

## Contribution

1. **Fork the repository**.
2. **Clone** your fork.
3. **Create a new branch** for your feature (`git checkout -b feature/your-feature-name`).
4. **Commit your changes** (`git commit -am 'Add new feature'`).
5. **Push to the branch** (`git push origin feature/your-feature-name`).
6. **Create a pull request**.
