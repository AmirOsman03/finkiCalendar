# 📅 FINKI Event Calendar

## 📌 Overview  
A centralized event calendar for the Faculty of Computer Science and Engineering (FINKI), allowing professors to create events and students to sign up — making it easier to keep track of lectures, labs, exams, presentations, and hackathons in one place.

---

## ✨ Features

- 👤 **Google Login (OAuth2)**  
  - Users log in with their Google accounts  
  - Roles are automatically assigned (e.g., professor/student)

- 📆 **Event Management**  
  - Professors can create, edit, and delete events  
  - Events include title, description, location, laboratory, and time

- ✅ **Event Participation**  
  - Students view events

- 🛡 **Role-Based Access Control**  
  - `ROLE_STUDENT`: view for events  
  - `ROLE_PROFESSOR`: create and manage events  
  - `ROLE_ADMIN`: access all endpoints

---

## 🧱 Technologies Used

- **Backend**: Spring Boot (OAuth2, Spring Security, JPA)  
- **Frontend**: React + Tailwind CSS  
- **Database**: PostgreSQL  
- **Auth**: Google OAuth2
- **API Docs**: SpringDoc OpenAPI  
- **Deployment**: Docker & Docker Compose
