# SkillBridge 🎓
**Connect with Expert Tutors, Learn Anything**

SkillBridge is a modern, full-featured tutoring platform designed to bridge the gap between students seeking knowledge and experts ready to share it. This repository contains the **Frontend** application, built with a cutting-edge tech stack for performance, security, and a premium user experience.

---

## 🚀 Experience SkillBridge

SkillBridge provides a seamless experience for three distinct user roles:

| Role | Description | Key Capabilities |
| :--- | :--- | :--- |
| **Student** | Learners seeking guidance | Browse tutors, book sessions, manage bookings, leave reviews |
| **Tutor** | Subject matter experts | Manage profile, set availability slots, track earnings, conduct sessions |
| **Admin** | Platform moderators | Manage users (Ban/Unban), monitor bookings, manage categories |

> [!TIP]
> Users specify their role during registration. Admin accounts are managed directly via the backend for enhanced security.

---

## 🛠️ Tech Stack

Built with the latest technologies to ensure a fast, responsive, and maintainable codebase:

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router, React 19)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) (Modern CSS-first approach)
- **Authentication**: [Better Auth](https://better-auth.com/) (Secure, session-based)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide Icons](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State/Data**: Fetch API with custom service layers
- **Feedback**: [Sonner](https://sonner.emilkowal.ski/) (Toast notifications)

---

## ✨ Key Features

### 🌐 Public Experience
- **Dynamic Landing Page**: Showcasing featured tutors and platform benefits.
- **Advanced Tutor Search**: Filter by subject, category, rating, and price.
- **Detailed Profiles**: Comprehensive tutor bios, reviews, and availability.
- **SEO Optimized**: Built-in meta-tags and semantic HTML for visibility.

### 🎒 Student Dashboard
- **Session Management**: Easy booking and tracking of upcoming/past tutoring sessions.
- **Review System**: Share feedback after completed lessons.
- **Profile Customization**: Keep personal information and preferences up to date.

### 👨‍🏫 Tutor Dashboard
- **Profile Builder**: Showcase expertise and experience to attract students.
- **Slot Management**: Intuitive interface to manage availability for bookings.
- **Live Sessions**: Overview of upcoming teaching sessions and student details.

### 🛡️ Admin Suite
- **User Management**: Overview of all platform participants with moderation tools.
- **Booking Oversight**: Monitor all session activities across the platform.
- **Category Control**: Dynamic management of tutoring subjects and fields.

---

## 📁 Project Structure

The project follows a modular App Router structure:

```text
src/
├── app/
│   ├── (CommonLayouts)/    # Public routes (Home, About, Tutors, Auth)
│   ├── (DashboardLayouts)/ # Protected role-based dashboards
│   └── globals.css         # Tailwind 4 configurations
├── components/
│   ├── ui/                 # Reusable low-level components (Radix)
│   ├── shared/             # Common layouts (Navbar, Footer)
│   └── modules/            # Domain-specific feature components
├── services/               # API integration layers (Auth, Student, Tutor)
└── lib/                    # Shared utilities and configurations
```

---

## ⚙️ Setup & Installation

### 1. Prerequisites
- Node.js 18.x or higher
- [SkillBridge Backend](https://github.com/your-username/skillbridge-backend) running locally

### 2. Configure Environment
Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Install & Start
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be accessible at `http://localhost:3000`.

---

## 📄 License
This project is licensed under the MIT License.

---
*Built with ❤️ by the SkillBridge Team*