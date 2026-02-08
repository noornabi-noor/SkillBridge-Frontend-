# SkillBridge 🎓  
**Connect with Expert Tutors, Learn Anything**

---

## 📌 Project Overview
**SkillBridge Frontend** is the client-side application of the SkillBridge platform.  
It provides an intuitive and responsive user interface that allows students to find tutors, book sessions, tutors to manage their profiles and availability, and admins to monitor and manage the platform.

The frontend communicates with the SkillBridge Backend API and implements **role-based UI rendering** for Students, Tutors, and Admins.

---

## 👥 Roles & Permissions

| Role | Description | Key Capabilities |
|----|------------|------------------|
| **Student** | Learners who book tutoring sessions | Browse tutors, book sessions, leave reviews, manage profile |
| **Tutor** | Experts who offer tutoring services | Manage profile, availability, bookings, reviews |
| **Admin** | Platform moderators | Manage users, bookings, categories, analytics |

> 💡 **Note:** Users select their role during registration.  
> Admin accounts are created from the backend.

---

## 🛠️ Tech Stack

> _(Adjust if needed to match your actual stack)_

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **Fetch API**
- **React Hook Form**
- **Session-based Auth (via backend)**

---

## ✨ Features

### 🌐 Public Features
- Landing page with featured tutors
- Browse tutors by subject, rating, and price
- Filter tutors by category
- View detailed tutor profiles
- View tutor reviews and ratings

---

### 🎒 Student Features
- Register and login as a student
- Book tutoring sessions
- View upcoming and past bookings
- Leave reviews after completed sessions
- Manage personal profile

---

### 👨‍🏫 Tutor Features
- Register and login as a tutor
- Create and update tutor profile
- Set and manage availability slots
- View teaching sessions and bookings
- Track ratings and reviews

---

### 🛡️ Admin Features
- View all users (students and tutors)
- Manage user status (ban / unban)
- View all bookings
- Manage tutoring categories
- View platform analytics

---

## 📄 Pages & Routes

### 🌍 Public Pages

| Route | Description |
|-----|-------------|
| `/` | Landing page |
| `/tutors` | Browse tutors |
| `/tutors/:id` | Tutor profile |
| `/categories` | Categories tutors |
| `/categories/:id` | Tutors profile |
| `/about` | About |
| `/terms` | Terms |
| `/privacy` | Privacy |
| `/login` | Login |
| `/register` | Registration |

---

### 🎒 Student Pages (Protected)

| Route | Description |
|-----|-------------|
| `/dashboard` | Student dashboard |
| `/dashboard/overview` | Overview |
| `/dashboard/browse-tutor` | Browse tutor |
| `/dashboard/bookings` | My bookings |
| `/dashboard/reviews` | My review |
| `/dashboard/profile` | My profile |

---

### 👨‍🏫 Tutor Pages (Protected)

| Route | Description |
|-----|-------------|
| `/tutor/dashboard` | Tutor dashboard |
| `/dashboard/overview` | Overview |
| `/tutor/profile` | Edit tutor profile |
| `/tutor/availability` | Manage availability |
| `/dashboard/bookings` | Bookings |
| `/dashboard/reviews` | Reviews |
| `/dashboard/sessions` | Upcoming session |

---

### 🛡️ Admin Pages (Protected)

| Route | Description |
|-----|-------------|
| `/admin` | Admin dashboard |
| `/dashboard/overview` | Overview |
| `/admin/users` | Manage users |
| `/admin/bookings` | View all bookings |
| `/admin/categories` | Manage categories |
| `/admin/analytics` | View analytics |
| `/admin/profile` | Admin profile |

---

## 🔐 Authentication Flow
- Authentication is handled via the backend API
- Protected routes are guarded on the client side
- Role-based rendering ensures users only see authorized pages

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```
---
## 🚀 Getting Started
1️⃣ Install dependencies
```bash
npm install
```

## 2️⃣ Run development server
```bash
npm run dev
```

Frontend will run at:
```bash
📍 http://localhost:3000
```
--- 

## 🔄 API Integration

- All data is fetched from the SkillBridge Backend API
- Axios / Fetch is used for HTTP requests
- Error handling and loading states are implemented globally

---