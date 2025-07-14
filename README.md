# 📝 React Todo App

A minimal yet powerful Todo application built using **React** and **Tailwind CSS**. It allows users to add, edit, mark complete, and delete tasks. The app stores tasks in **localStorage**, ensuring your list persists after page reloads.

---

## 🚀 Features

- ✅ Add new tasks with input validation (at least 3 letters & one alphabet)
- ✏️ Edit tasks inline
- ✔️ Mark tasks as completed
- 🗑️ Delete individual tasks
- 🔄 Tasks persist via localStorage
- 💻 Responsive layout with Tailwind CSS

---

## 🛠 Tech Stack

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/) (via CDN)
- [Vite](https://vitejs.dev/)
- JavaScript (ES6+)

---

## 📁 Project Structure

```
src/
├── App.jsx         # Main logic and layout
├── TodoItem.jsx    # Single task item component
└── main.jsx        # React DOM entry point
```

---

## ⚙️ Getting Started

### 1. Clone this repository

```bash
git clone https://github.com/your-username/react-todo-app.git
cd react-todo-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🧠 How It Works

- All tasks are stored in the `tasks` state array.
- On mount, tasks are loaded from `localStorage`.
- When tasks change (add/edit/delete/toggle), they are saved back to localStorage.
- Tasks are split into two lists: active and completed.
- Validation ensures inputs contain at least 3 letters and 1 alphabet.

---

## ✅ Future Improvements

- [ ] Add "Clear Completed" button
- [ ] Add task filtering (All, Active, Completed)
- [ ] Add due dates and reminders
- [ ] Theme toggle (Dark/Light)

---

## 📸 Screenshot

_Add your screenshot here if available_

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## ✨ Acknowledgments

Made with ❤️ using React & Tailwind CSS.
