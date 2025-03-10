# Art Gallery Manager

Art Gallery Manager is a **full-stack web application** designed to manage artworks in an online gallery. Users can **browse**, **filter**, **add**, **edit**, and **delete** artworks with images, prices, and availability statuses. The application supports image uploads and displays stored artworks in an intuitive and visually appealing layout.

<p align="center">
  <img src="/img/screenshot.jpg" alt="Application Screenshot" width="400"/>  
</p>

## 🛠️ Technologies Used

### **Frontend**
- **React** (Vite) – main framework for building UI
- **TypeScript** – for strong typing and better maintainability
- **Bootstrap 5** – for styling and responsive design
- **React-Bootstrap** – to simplify Bootstrap component usage in React
- **Axios** – for API requests
- **React Icons** – for icons in UI (e.g., scroll-to-top button)

### **Backend**
- **Node.js (Express.js)** – for handling API requests
- **TypeScript** – for type safety
- **PostgreSQL** – as a relational database
- **Multer** – for image uploads
- **Dotenv** – for environment variable management
- **Cors** – for handling cross-origin requests
- **pg** – PostgreSQL client for Node.js

---

## ⚙️ Installation and Setup

Follow these steps to install and run the project locally:

### **1. Clone the repository**

```sh
git clone https://github.com/YuraPetrovskyi/art-gallery-manager.git
cd art-gallery-manager
```

### **2. Install dependencies**

#### Frontend
```sh
npm install
```

#### Backend
```sh
cd backend
npm install
```

### **3. Setting up the database**
Ensure PostgreSQL is installed on your system.
Create a database using the SQL script provided:

The SQL script is located at:

```
backend/src/config/sql_query.txt
```

Run this file in PostgreSQL to create the required tables and insert sample data.

### **4. Configure Environment Variables**
In the backend, create a `.env` file inside the `backend/` folder:

```sh
PORT=8000
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=art_gallery
DB_PORT=5432
```

Replace the placeholders with your actual database credentials.

### **5. Start the Backend Server**

```sh
cd backend
npm run dev
```

This will run the server on [http://localhost:8000/](http://localhost:8000/).

### **6. Start the Frontend**
In another terminal:

```sh
cd frontend
npm run dev
```

The frontend will run on [http://localhost:5173/](http://localhost:5173/).

---

## 🖼️ Features

✅ Browse Artworks – View all artworks with images, prices, and availability  
✅ Filter & Sort – Filter artworks by type or artist and sort by price  
✅ Add New Artwork – Upload an artwork with an image  
✅ Edit Artwork – Update an artwork’s details, including uploading a new image  
✅ Delete Artwork – Remove an artwork from the gallery  
✅ Image Upload – Supports storing and displaying artwork images  
✅ Responsive UI – Works on all screen sizes  
✅ Scroll-to-Top Button – Helps users navigate easily  

---

## 📁 Project Structure

```
art-gallery-manager/
│── backend/                # Express backend
│   ├── node_modules/       # Backend dependencies
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   │   ├── db.ts       # Database connection
│   │   │   ├── sql_query.txt  # SQL script for DB setup
│   │   │   ├── upload.ts   # File upload configuration
│   │   ├── controllers/    # API controllers
│   │   │   ├── artworksController.ts  # Artworks API logic
│   │   ├── models/         # Data models (future expansion)
│   │   ├── routes/         # API routes
│   │   │   ├── artworks.ts # Artwork routes
│   │   ├── server.ts       # Main Express server
│   ├── uploads/            # Uploaded images
│   ├── .env                # Environment variables
│   ├── package.json        # Dependencies & scripts
│   ├── package-lock.json   # Dependency lock file
│   ├── tsconfig.json       # TypeScript configuration
│
│                           # React frontend
├── node_modules/           # Frontend dependencies
├── public/                 # Static assets
├── src/                    # Source code
│   ├── components/         # UI components
│   ├── data/               # Mock data
│   ├── img/                # Images
│   ├── pages/              # Application pages (future expansion)
│   ├── services/           # API service handlers
│   ├── types/              # TypeScript types
│   ├── utils/              # Utility functions 
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Renders the React app
│   ├── styles.css          # Global styles
│   ├── vite-env.d.ts       # Vite environment settings
├── index.html              # Main HTML file
├── vite.config.ts          # Vite configuration
├── package.json            # Dependencies & scripts
├── package-lock.json       # Dependency lock file
│── .gitignore              # Git ignored files
│── eslint.config.js        # ESLint configuration
│── LICENSE                 # License information
│── README.md               # Project documentation
│── tsconfig.app.json       # TypeScript config (app-specific)
│── tsconfig.json           # TypeScript global config
│── tsconfig.node.json      # TypeScript config (Node.js)
```

## 🛠️ API Endpoints

### **Artworks API**

| Method | Endpoint             | Description             |
|--------|----------------------|-------------------------|
| GET    | `/api/artworks`      | Get all artworks       |
| GET    | `/api/artworks/:id`  | Get a single artwork   |
| POST   | `/api/artworks`      | Add a new artwork      |
| PUT    | `/api/artworks/:id`  | Update an artwork      |
| DELETE | `/api/artworks/:id`  | Delete an artwork      |

---

## 📌 Additional Notes

- Images are stored in the `backend/uploads/` folder.
- A default image is used when no artwork image is available.
- When an artwork is deleted, its database record is removed, but the image file is not automatically deleted due to permission issues.

---

## 📜 License

This project is licensed under the **MIT License** – feel free to use and modify it!
