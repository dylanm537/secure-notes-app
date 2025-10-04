# Secure Notes App

A full-stack **Secure Notes** application built with **FastAPI** (backend) and **React Native / Expo** (frontend).  
Users can securely log in, view, and add personal notes. This project demonstrates skills in **API development, authentication, full-stack integration, and mobile/web frontend development**.

---

## Features

- **User Authentication:** OAuth2 password flow for secure login.  
- **Secure Notes:** View and add notes after logging in.  
- **Frontend:** React Native / Expo with a responsive UI.  
- **Backend:** FastAPI with REST endpoints (`/token`, `/notes`).  
- **Full-stack Integration:** Frontend communicates with backend via HTTP requests.  
- **Cross-platform:** Works in web browser via React Native Web.

---

## Technologies Used

- **Backend:** Python, FastAPI, Uvicorn  
- **Frontend:** React Native, Expo, TypeScript  
- **Authentication:** OAuth2 password flow (bearer tokens)  
- **Development Tools:** npm, Node.js, Python, Git, GitHub  

---

Prerequisites

- Node.js & npm (for frontend)
- Python 3.8+ (for backend)
- Expo CLI (for frontend development)

backend set up

cd secure-notes-backend
python -m venv venv
venv\Scripts\activate      
pip install fastapi uvicorn
uvicorn main:app

frontend set up

cd frontend
npm install
npx expo start


Usage

Username: alice
Password: password123

then you can add new notes

