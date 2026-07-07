# 📂 Acme Data Room

A single-page application for managing folders and PDF documents.

Built with React, TypeScript, Tailwind CSS and IndexedDB.

## 🌐 Live Demo

[DEMO LINK](https://dataroom-spa-eight.vercel.app/)

---

## ✨ Features

- 📁 Create, rename and delete folders
- 📂 Unlimited nested folders
- 🧭 Breadcrumb navigation
- 📄 Upload PDF documents
- 👀 PDF preview in a new browser tab
- ✏️ Rename and delete files
- ✅ Validation for duplicate names
- 🔔 Toast notifications
- 💾 Persistent storage with IndexedDB
- 📱 Responsive UI

---

## 🛠 Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Lucide React
- IndexedDB (`idb`)
- Sonner

---

## 🏗 Project Structure

```text
src/
├── components/
├── context/
├── lib/
├── services/
├── types/
├── App.tsx
└── main.tsx
```

The application uses:

- **Context API** for global state management.
- **IndexedDB** for persistent local storage.
- **Reusable UI components** with clear separation of concerns.

---

## 💡 Architecture Decisions

- Context API was chosen because the application has a relatively small global state and does not require a more complex state management library.

- IndexedDB was selected instead of Local Storage because it can efficiently store File objects without converting them to Base64.

- Business logic is separated from UI components to keep components focused on rendering.

---

## 🚀 Getting Started

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Build the project

```bash
npm run build
```

Run ESLint

```bash
npm run lint
```

---

## 💾 Data Storage

All folders and files are stored locally using **IndexedDB**.

No backend or external database is required.

---

## 📌 Notes

- Only **PDF** files are supported.
- Folder and file names must be unique within the same folder.
- The application works completely offline after loading.

---

## 🔮 Possible Improvements

Given more time, I would consider adding:

- Drag & Drop upload
- Search functionality
- Sorting (name/date)
- Multi-file upload
- File thumbnails
- Dark mode
- Unit and integration tests



