# Devzza 🍕

A full-stack pizza ordering website built with Node.js, Express, MySQL, Firebase Auth, and Twilio SMS integration. Users can browse the menu, place orders, track them, and admins get notified via SMS when orders are placed or cancelled.

---

## Overview

Devzza is a complete pizza ordering system with both frontend and backend functionality. It includes:

- Mobile login using Firebase OTP
- Admin dashboard to manage pizzas
- Cart system and order tracking
- Real-time SMS alerts for admins via Twilio
- Responsive design with light/dark mode support

---

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Auth**: Firebase Phone Auth
- **SMS**: Twilio API
- **Image Uploads**: Multer
- **Hosting**: Node/Express server

---

## Features

### User Side

- Browse pizzas by category (Veg, Non-Veg, Beverages, etc.)
- Sign in with mobile number using OTP (Firebase)
- Add to cart and place order
- View order status and cancel if needed
- Update delivery location
- Contact/feedback form
- Mobile-friendly UI
- Dark mode toggle

### Admin Side

- Add, edit, delete pizzas with images
- Manage pizza categories
- View orders and statuses
- Receive SMS alerts for new/cancelled orders
- Secret admin login shortcut (Ctrl + Shift + A)

---

## Setup Instructions

### 1. Clone the Project

```bash
git clone https://github.com/your-username/devzza.git
cd devzza
