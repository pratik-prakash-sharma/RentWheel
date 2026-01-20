# 🚗 RentWheel – Car Rental Management System

**RentWheel** is a full-stack **Car Rental Web Application** that allows users to browse available cars, check availability by date, book vehicles, and manage rentals efficiently.
The system prevents double bookings and provides both user and admin management features.

---

## 📌 Features

### 👤 User Features

* User registration & login (JWT authentication)
* Browse cars by location
* Check car availability for selected dates
* Book cars with pickup & return dates
* Prevents booking the same car for overlapping dates
* View booking history
* Cancel bookings

### 🛠 Admin Features

* Add, update, and delete cars
* Manage car availability
* View and manage all bookings
* Update booking status (confirmed / cancelled)

---

## 🧑‍💻 Tech Stack

### Frontend

* React.js
* React Router v6
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

### Tools

* MongoDB Atlas
* Postman
* Git & GitHub

---

## 📂 Project Structure

```
RentWheel/
│
├── client/                 # Frontend (React)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.jsx
│
├── server/                 # Backend (Node + Express)
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

## 🔐 Booking Availability Logic

RentWheel ensures that a car **cannot be booked twice for overlapping dates**.

### Overlap Condition:

```text
pickupDate <= existingReturnDate
AND
returnDate >= existingPickupDate
```

If this condition is met, the booking is rejected.

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/rentwheel.git
cd rentwheel
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the backend:

```bash
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🚀 API Endpoints (Sample)

### Authentication

* `POST /api/auth/register`
* `POST /api/auth/login`

### Cars

* `GET /api/cars`
* `POST /api/cars` (Admin)
* `PUT /api/cars/:id`
* `DELETE /api/cars/:id`

### Bookings

* `POST /api/bookings`
* `GET /api/bookings/user`
* `DELETE /api/bookings/:id`

---

## 📸 Screenshots

> *(Add UI screenshots here to improve GitHub presentation)*

---

## 🧠 Future Enhancements

* Online payment gateway integration
* Email & SMS booking notifications
* Admin analytics dashboard
* Role-based access control
* Reviews & ratings for cars

---

## 🙌 Author

**Pratik Prakash Sharma**
Frontend / Full Stack Developer
📍 India

* GitHub: [https://github.com/pratik-prakash-sharma](https://github.com/pratik-prakash-sharma)

---

## ⭐ Support

If you found **RentWheel** useful, please give it a ⭐ on GitHub!
Feel free to fork, contribute, and enhance the project.

---
