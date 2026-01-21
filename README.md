# 📝 Hebrew RTL Todo Application

A modern, fully-featured Todo application built with React, Tailwind CSS, and Vite. Features complete Hebrew language support with right-to-left (RTL) layout.

## ✨ Features

- ✅ **Add Tasks** - Create new tasks with Hebrew text support
- ✏️ **Edit Tasks** - Modify task descriptions inline
- 🗑️ **Delete Tasks** - Remove completed or unwanted tasks
- ✓ **Mark Complete** - Toggle task completion status
- 📊 **Filter Tasks** - View All, Active, or Completed tasks
- 💾 **Auto-Save** - LocalStorage persistence across sessions
- 🌐 **Hebrew RTL** - Full right-to-left language support
- 🎨 **Beautiful UI** - Tailwind CSS styling with gradient background
- 🚀 **Fast** - Built with Vite for rapid development and builds

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd my-todo-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5176/` (or the next available port)

## 📦 Available Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build for production
npm run preview  # Preview production build locally
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── TodoInput.jsx      # Input form for new tasks
│   ├── TodoList.jsx       # Task list container
│   ├── TodoItem.jsx       # Individual task item
│   └── FilterButtons.jsx  # Filter selection buttons
├── utils/
│   ├── storage.js         # LocalStorage operations
│   ├── validators.js      # Input validation
│   └── helpers.js         # Utility functions
├── App.jsx                # Main application component
├── App.css                # Component styles
├── index.css              # Global styles & Tailwind directives
└── main.jsx               # React entry point
```

## 🎯 How to Use

1. **Add a Task**: Type your task in Hebrew and press Enter or click "הוסף" (Add)
2. **Edit a Task**: Click the pencil icon to edit the task text
3. **Complete a Task**: Check the checkbox to mark as complete
4. **Delete a Task**: Click the trash icon to remove the task
5. **Filter Tasks**: Use the filter buttons to show All, Active, or Completed tasks

## 🛠️ Technologies Used

- **React** 19.2.3 - UI framework
- **Vite** 7.2.4 - Build tool
- **Tailwind CSS** 4.1.18 - Styling
- **lucide-react** 0.562.0 - Icons
- **PostCSS** 8.5.6 - CSS processing

## 📐 Data Structure

Tasks are stored as objects with the following structure:

```javascript
{
  id: number,           // Unique identifier (timestamp)
  text: string,         // Task description
  completed: boolean    // Completion status
}
```

## 💾 Data Persistence

All tasks are automatically saved to the browser's LocalStorage. The application:
- Loads tasks on startup
- Saves after every change
- Persists data across browser sessions
- Handles missing or corrupted data gracefully

## 🌐 RTL Support

The application features complete Hebrew support with:
- Right-to-left text direction (dir="rtl")
- Hebrew language UI text
- Proper alignment for RTL layouts
- Icons positioned correctly for RTL

## ♿ Accessibility

- Semantic HTML elements
- Keyboard navigation (Tab, Enter, Escape)
- Focus visible states
- Good color contrast ratios
- ARIA labels where appropriate

## 🎨 Customization

### Colors
Edit `src/App.jsx` to modify the gradient colors:
```jsx
<div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">
```

### Tailwind Configuration
Modify `tailwind.config.js` to customize Tailwind theme

### Component Styling
Update CSS classes in component files or modify `tailwind.config.js`

## 📝 PRD Documentation

See [PRD.md](./PRD.md) for complete Product Requirements Document with:
- Detailed functional requirements
- Technical specifications
- Component architecture
- User stories and use cases

## 🐛 Troubleshooting

### Port Already in Use
If port 5176 is in use, Vite will automatically try the next available port (5177, 5178, etc.)

### Tasks Not Saving
Clear browser cache or check if LocalStorage is enabled

### Styling Issues
Run `npm run build` to check for Tailwind CSS compilation errors

## 📄 License

Open source project - feel free to use and modify

## 👨‍💻 Development

The application follows best practices:
- Components follow Single Responsibility Principle
- Props flow down, events flow up
- Proper React hooks usage
- Clean, commented code
- DRY (Don't Repeat Yourself) principle

## 🚀 Performance

- Fast initial load (< 2 seconds)
- Smooth animations at 60 FPS
- Optimized re-renders
- Efficient LocalStorage operations

---

**Status**: ✅ Production Ready  
**Last Updated**: January 19, 2026
