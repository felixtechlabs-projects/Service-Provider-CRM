# 🛠️ Service Provider CRM

A full-stack web application built with **React** and **Firebase** that connects customers with service providers. Customers can browse providers, book slots, and leave reviews. Service providers can manage their availability and track bookings via a dashboard.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, React Router v7 |
| Styling | Tailwind CSS v4 (Vite plugin) |
| Backend / DB | Firebase (Firestore + Auth) |
| Build Tool | Vite |
| UI Extras | Flowbite, react-simple-star-rating |

---

## ✨ Features

### 👤 Customer
- Choose role on first visit (Customer or Service Provider)
- Sign up / Sign in with email & password
- Browse all available service providers
- View available slots for a specific provider
- Book a slot instantly with optimistic UI update
- View all personal bookings
- Leave a star rating + comment review after a booking

### 🛠️ Service Provider
- Sign up / Sign in with email & password
- Add availability slots (date, start time, end time)
- Dashboard showing all slots with:
  - Booking status (Available / Booked)
  - Customer name & contact details
  - Review and star rating per slot
  - Summary cards (Total / Booked / Available)

---

## 📁 Project Structure

```
src/
├── components/
│   ├── GetStarted.jsx       # Role selection landing page
│   ├── Header.jsx           # Sticky navbar with role-based nav links
│   ├── Signin.jsx           # Sign in form
│   ├── Signup.jsx           # Sign up form (role-aware)
│   ├── CustomerHome.jsx     # Browse service providers
│   ├── Slots.jsx            # View & book slots for a provider
│   ├── MyBooking.jsx        # Customer's booking history
│   ├── AddReview.jsx        # Star rating + comment form
│   ├── AddSlot.jsx          # Service provider slot creation
│   └── Dashboard.jsx        # Service provider dashboard
├── services/
│   ├── customer.service.js
│   └── serviceProvider.service.js
├── environments/
│   └── environment.js       # Firebase config
├── App.jsx
└── main.jsx
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- A Firebase project with **Firestore** and **Authentication** enabled

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/service-provider-crm.git
cd service-provider-crm

# 2. Install dependencies
npm install

# 3. Configure Firebase
# Edit src/environments/environment.js with your Firebase config:
export const auth = firebaseAuthInstance;
export const db = firestoreInstance;

# 4. Start the dev server
npm run dev
```

### Build for Production

```bash
npm run build
```

---

## 🔐 Authentication Flow

```
Visit "/"
   │
   ├── Not logged in → GetStarted (choose role)
   │       └── Saved to localStorage → Signin / Signup
   │
   └── Logged in
           ├── Customer       → /home
           └── Service Provider → /add-slot
```

---

## 🗺️ Routes

| Path | Component | Access |
|---|---|---|
| `/` | `GetStarted` or redirect | Public |
| `/signup` | `Signup` | Public |
| `/signin` | `Signin` | Public |
| `/home` | `CustomerHome` | Customer |
| `/slots/:id` | `Slots` | Customer |
| `/bookings` | `MyBooking` | Customer |
| `/review/:id` | `AddReview` | Customer |
| `/add-slot` | `AddSlot` | Service Provider |
| `/dashboard` | `Dashboard` | Service Provider |

---

## 📸 Screenshots

> _Add screenshots here after deployment_

---

## 🔧 Environment Setup

Create or update `src/environments/environment.js`:

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

> ⚠️ Never commit real Firebase credentials. Use `.env` files and add them to `.gitignore`.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

- [React](https://react.dev/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Flowbite](https://flowbite.com/)
- [react-simple-star-rating](https://github.com/awran5/react-simple-star-rating)
