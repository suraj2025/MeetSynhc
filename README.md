# 🗓️ MeetSync — Smart Meeting Scheduler

A full-stack meeting scheduling web app that eliminates the back-and-forth of 
finding meeting times. Login with Google, sync your calendar, share your 
availability link, and let others book meetings with you effortlessly.

---

## ✨ Features

- 🔐 **Google OAuth 2.0** — Secure login with your Google account
- 📅 **Google Calendar Sync** — Real-time sync of your existing events
- 🔗 **Shareable Booking Link** — Share `meetsync.app/u/yourname` with anyone
- 🤖 **Smart Slot Suggestions** — AI-powered availability recommendations
- ⏱️ **Buffer Time & Duration Settings** — Customize your scheduling preferences
- 📧 **Email Notifications** — Automatic confirmations for booked meetings
- 🌐 **Timezone Aware** — Handles meetings across different timezones

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + TypeScript | UI Framework |
| Vite | Build Tool |
| TanStack Query v5 | Server State Management |
| Zustand | Client State Management |
| React Hook Form + Zod | Form Validation |
| Tailwind CSS | Styling |
| Axios | HTTP Client |

### Backend
| Technology | Purpose |
|---|---|
| Spring Boot 4 | Backend Framework |
| Spring Security + OAuth2 | Authentication |
| Spring Data JPA + Hibernate | ORM |
| PostgreSQL | Primary Database |
| Redis | Token & Session Caching |
| Google Calendar API | Calendar Integration |
| JWT | Stateless Auth Tokens |

### DevOps
| Technology | Purpose |
|---|---|
| Docker + Docker Compose | Containerization |
| GitHub Actions | CI/CD Pipeline |
| Vercel | Frontend Deployment |
| Render | Backend Deployment |

---

## 🏗️ Architecture
