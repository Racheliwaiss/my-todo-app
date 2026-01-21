# Product Requirements Document - Todo Application

## 1. Project Overview

A modern Todo application in React with full **Hebrew support (RTL)**, local data persistence, and an intuitive user interface. The application allows users to manage tasks efficiently with a clean, responsive design.

### Key Features:
- Full right-to-left (RTL) Hebrew support
- CRUD operations for tasks (Create, Read, Update, Delete)
- Task filtering (All, Active, Completed)
- LocalStorage data persistence
- Responsive design
- Accessible UI with keyboard support

---

## 2. Functional Requirements

### 2.1 Task Management (CRUD Operations)

#### 2.1.1 Add Task
- Text input field with placeholder "Add new task..."
- "Add" button to submit the task
- Support for Enter key for quick task addition
- **Validation**: Do not add empty tasks (reject if only spaces)
- After successful addition, input field clears automatically
- Focus returns to input field for continuous entry

#### 2.1.2 Mark Task as Complete/Incomplete
- Visual checkbox next to each task
- Clicking checkbox toggles completion state
- **Completed task styling**:
  - Strikethrough text (line-through)
  - Light green background color
  - Reduced opacity
- State persists to LocalStorage immediately

#### 2.1.3 Edit Task
- Edit button (pencil icon) on each task item
- Clicking edit transforms task into editable input field
- "Save" and "Cancel" buttons appear in edit mode
- **Keyboard support**:
  - Enter key saves changes
  - Escape key cancels editing
- **Validation**: Do not save empty or whitespace-only tasks
- Revert to original text if Cancel is clicked

#### 2.1.4 Delete Task
- Delete button (trash icon) on each task item
- Immediate deletion without confirmation dialog (simple UX)
- State updates and LocalStorage saves immediately

### 2.2 Task Filtering

#### 2.2.1 Three Filter States
- **All**: Shows all tasks (both active and completed)
- **Active**: Shows only incomplete tasks
- **Completed**: Shows only completed tasks

#### 2.2.2 Filter Interface
- Three filter buttons in the same row
- Active filter button highlighted in blue (indigo-600)
- Each button displays count of matching tasks: "All (5)", "Active (3)", "Completed (2)"
- Smooth transitions between filters
- No page refresh on filter change

### 2.3 Data Persistence

#### 2.3.1 LocalStorage Integration
- Automatic save to LocalStorage on every change to the tasks array
- Load from LocalStorage when application starts
- Use useEffect hooks to manage synchronization
- Error handling (try-catch) for browsers without LocalStorage support

#### 2.3.2 Data Structure
```javascript
{
  id: number,           // Unique identifier (timestamp)
  text: string,         // Task description
  completed: boolean    // Completion status
}
```

### 2.4 User Interface & UX

#### 2.4.1 Task Counter
- Display active task count: "3 active tasks remaining"
- Special message when complete: "🎉 All tasks completed!"
- Location: Above the task list
- Updates in real-time as tasks are added/completed

#### 2.4.2 Status Messages
- When no tasks in current filter: "No tasks to display"
- Helpful empty state messaging

#### 2.4.3 Design & Animations
- **Color Scheme**:
  - Background gradient: light blue to light purple
  - White central card with shadow effects
  - Indigo-600 for active state
  - Green for completed items
  - Red for delete actions
- **Animations**:
  - Smooth hover effects on buttons
  - Transition animations on state changes
  - Fade effects on task entry/deletion
- **Responsive Design**:
  - Works on desktop (1024px+)
  - Works on tablet (768px+)
  - Works on mobile (320px+)

---

## 3. Technical Requirements

### 3.1 Technologies & Stack
- **Framework**: React 18+ with Function Components
- **Hooks**: useState, useEffect
- **Styling**: Tailwind CSS
- **Icons**: lucide-react (Check, X, Edit2, Trash2)
- **Language Support**: Full RTL (Right-to-Left) for Hebrew

### 3.2 Architecture - Component Structure

#### 3.2.1 TodoInput.jsx
**Responsibility**: Handle new task input and addition
- Props:
  - `onAddTodo(text)`: Callback function to add new task
- Local State:
  - `inputValue`: Current input field value
- Features:
  - Input field with placeholder
  - Add button
  - Enter key support
  - Input validation
  - Auto-clear after submission

#### 3.2.2 FilterButtons.jsx
**Responsibility**: Render and manage filter controls
- Props:
  - `currentFilter`: Current active filter ('all', 'active', 'completed')
  - `onFilterChange(filter)`: Callback to change filter
  - `counts`: Object with { total, active, completed }
- Local State: None (stateless component)
- Features:
  - Three filter buttons
  - Display task counts
  - Highlight active filter
  - Visual feedback on selection

#### 3.2.3 TodoItem.jsx
**Responsibility**: Render individual task item with all interactions
- Props:
  - `todo`: Task object { id, text, completed }
  - `onToggle(id)`: Callback to toggle completion
  - `onDelete(id)`: Callback to delete task
  - `onEdit(id, newText)`: Callback to update task text
- Local State:
  - `isEditing`: Boolean for edit mode
  - `editValue`: Text being edited
- Features:
  - Checkbox for completion
  - Display task text
  - Edit button with pencil icon
  - Delete button with trash icon
  - Inline editing with Save/Cancel buttons
  - Keyboard support (Enter to save, Escape to cancel)
  - Visual styling for completed state

#### 3.2.4 TodoList.jsx
**Responsibility**: Render the list of tasks based on filter
- Props:
  - `todos`: Array of all tasks
  - `filter`: Current filter status
  - `onToggle(id)`: Callback to toggle task
  - `onDelete(id)`: Callback to delete task
  - `onEdit(id, newText)`: Callback to edit task
- Local State: None (stateless component)
- Features:
  - Filter tasks based on current filter
  - Render TodoItem components
  - Empty state messaging
  - Proper React keys for list items

#### 3.2.5 App.jsx (Main Component)
**Responsibility**: Manage global state and coordinate components
- State:
  - `todos`: Array of all task objects
  - `filter`: Current filter ('all', 'active', 'completed')
- Features:
  - Initialize todos from LocalStorage on mount
  - Save to LocalStorage on todos change
  - Handle all task operations (add, delete, toggle, edit)
  - Pass appropriate props to child components
  - Calculate counts for filter buttons
  - Main layout structure

---

## 4. Folder Structure

```
my-todo-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── TodoInput.jsx       # Input form component
│   │   ├── FilterButtons.jsx   # Filter selection component
│   │   ├── TodoItem.jsx        # Individual task component
│   │   └── TodoList.jsx        # Task list container
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # App styles
│   ├── index.css               # Global styles
│   └── main.jsx                # Entry point
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 5. RTL (Right-to-Left) Support

### 5.1 HTML Configuration
- Add `dir="rtl"` attribute to the root div in App.jsx
- Ensures all text flows right-to-left
- Proper text alignment for Hebrew

### 5.2 CSS Adjustments
- Use `text-right` for input fields (will be right-aligned in RTL)
- Icon positioning must account for RTL direction
- Flex order may need adjustment for RTL context
- Tailwind's RTL utilities: `rtl:` prefix

### 5.3 Localization
- Hebrew language for all UI text
- Consistent terminology throughout
- Support for Hebrew input in task fields

---

## 6. Clean Code & Best Practices

### 6.1 Programming Principles
- **DRY (Don't Repeat Yourself)**: Avoid code duplication
- **Single Responsibility**: Each component has one clear purpose
- **Props Down, Events Up**: Pass data via props, handle actions via callbacks
- **Naming Conventions**: Clear, descriptive component and variable names
- **Code Comments**: Comments in Hebrew above major components
- **JSDoc**: Documentation for complex functions

### 6.2 Performance Considerations
- No unnecessary re-renders
- Proper use of React keys in lists
- Optimized useEffect dependencies
- Avoid inline function definitions in props

### 6.3 Accessibility
- Semantic HTML elements (button, input, ul, li)
- Keyboard navigation support:
  - Tab through interactive elements
  - Enter to submit forms and save edits
  - Escape to cancel editing
- Good color contrast ratios
- ARIA labels where appropriate
- Focus visible states on interactive elements

---

## 7. User Stories

**US-1: Add a New Task**
- As a user, I want to add a new task quickly
- I can type in the input field and click "Add" or press Enter
- The task appears in my list immediately
- The input field clears and is ready for the next task

**US-2: View All Tasks**
- As a user, I want to see all my tasks in one place
- All tasks display in a list ordered appropriately
- I can see which tasks are complete and which are active

**US-3: Mark Task Complete**
- As a user, I want to mark tasks as done
- I click the checkbox next to a task
- The task shows with strikethrough and changes color
- The change is saved automatically

**US-4: Edit a Task**
- As a user, I want to correct or update task text
- I click the edit button on a task
- I can modify the text in the input field
- I save with "Save" button or Enter key
- I can cancel with "Cancel" button or Escape key

**US-5: Delete a Task**
- As a user, I want to remove tasks I no longer need
- I click the delete button on a task
- The task is immediately removed from the list
- The change is saved automatically

**US-6: Filter Tasks**
- As a user, I want to focus on specific tasks
- I can click "Active" to see only incomplete tasks
- I can click "Completed" to see only done tasks
- I can click "All" to see all tasks
- The button shows how many tasks match each filter

**US-7: Persistent Data**
- As a user, I want my tasks saved
- When I close and reopen the app
- All my tasks are still there
- Everything works without internet

---

## 8. Use Cases

### Use Case 1: Adding a New Task
1. User opens the application
2. User sees the input field with placeholder "Add new task..."
3. User types task text: "Buy groceries"
4. User clicks "Add" button (or presses Enter)
5. System validates input (not empty)
6. System creates new task object with unique ID
7. System adds task to todos array
8. System saves to LocalStorage
9. Component re-renders, showing new task in list
10. Input field clears and regains focus

### Use Case 2: Completing a Task
1. User sees task list with active and completed tasks
2. User identifies task to mark as done
3. User clicks checkbox next to task
4. System toggles task's completed status
5. Component re-renders with visual updates:
   - Strikethrough added
   - Green background applied
6. System saves change to LocalStorage
7. Task counter updates

### Use Case 3: Filtering Tasks
1. User sees all tasks (All filter active)
2. User clicks "Active" filter button
3. System sets filter to 'active'
4. Component filters todos array to show only incomplete tasks
5. Component re-renders with filtered list
6. Completed tasks hidden
7. "Active" button shows highlighted state
8. Button counts update

### Use Case 4: Editing a Task
1. User sees task list
2. User clicks edit (pencil) icon on task
3. Task enters edit mode with input field containing current text
4. User modifies text: "Buy groceries" → "Buy groceries and milk"
5. User clicks "Save" button or presses Enter
6. System validates new text (not empty)
7. System updates task object
8. System saves to LocalStorage
9. Component exits edit mode
10. Updated text displays in list

### Use Case 5: Deleting a Task
1. User sees task list
2. User clicks delete (trash) icon on task
3. System immediately removes task from todos array
4. System saves to LocalStorage
5. Component re-renders list without deleted task
6. Task counters update

---

## 9. Technical Specifications

### 9.1 Browser Support
- Modern browsers supporting ES2020+
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Chrome Android)
- LocalStorage must be available

### 9.2 Performance Targets
- Initial load: < 2 seconds
- Task operations: < 100ms
- Smooth 60 FPS animations
- No janky transitions

### 9.3 Data Limits
- Supports at least 500+ tasks in LocalStorage
- Graceful handling of quota exceeded scenarios

### 9.4 Error Handling
- Try-catch blocks around LocalStorage operations
- Graceful degradation if LocalStorage unavailable
- User-friendly error messages

---

## 10. Future Enhancements

- Task categories/tags
- Priority levels
- Due dates and reminders
- Search functionality
- Task notes/descriptions
- Dark mode theme
- Cloud synchronization
- Export/import features
- Recurring tasks
- Task statistics

---

## 11. Document Status

**Version**: 1.0  
**Created**: January 19, 2026  
**Status**: Ready for Implementation  
**Review**: Awaiting approval before development

---

## 3. Technical Requirements

### 3.1 Technologies & Stack
- **Frontend Framework:** React 19.2.0
- **Build Tool:** Vite 7.2.4
- **Styling:** Tailwind CSS
- **Icons:** lucide-react
- **Runtime:** Node.js with ES Modules
- **Package Manager:** npm

### 3.2 Development Tools
- **Linting:** ESLint 9.39.1 with React plugins
- **React Hooks:** eslint-plugin-react-hooks
- **Fast Refresh:** eslint-plugin-react-refresh
- **TypeScript Types:** @types/react, @types/react-dom

### 3.3 Code Standards
- Component-based architecture
- Functional components with React Hooks
- Props validation and proper typing
- Semantic HTML for accessibility
- BEM-like naming conventions for CSS classes
- Single Responsibility Principle for components

### 3.4 Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ JavaScript features
- CSS Grid and Flexbox support required

### 3.5 Performance Requirements
- Initial load time < 2 seconds
- Smooth animations and transitions (60 FPS)
- No unnecessary re-renders
- Lazy loading where applicable
- Optimized bundle size

### 3.6 Accessibility Requirements
- WCAG 2.1 AA compliance minimum
- Keyboard navigation support
- Screen reader compatible
- Proper ARIA labels and roles
- Color contrast ratios met

---

## 4. Component Architecture

### 4.1 App.jsx (Root Component)
**Responsibility:** Main application wrapper and state management
- Initialize and manage global todo state
- Handle data persistence (LocalStorage)
- Coordinate between child components
- Manage app-level styling and layout

**Props:** None (root component)

**State:**
- todos: Array of todo objects
- filter: Current filter status (all/active/completed)
- searchTerm: Current search query

### 4.2 TodoInput.jsx
**Responsibility:** Handle new task input and creation
- Display input field for task description
- Display add button
- Validate input before submission
- Clear input on successful submission
- Optional: category selector for new tasks

**Props:**
- `onAddTodo(description, category)`: Callback function

### 4.3 TodoList.jsx
**Responsibility:** Render and manage list of tasks
- Display all todos based on current filter and search
- Handle rendering of individual TodoItem components
- Manage list layout and styling
- Show empty state when no tasks

**Props:**
- `todos`: Array of todo objects
- `onToggleComplete(id)`: Callback function
- `onDeleteTodo(id)`: Callback function
- `onEditTodo(id, newDescription)`: Callback function
- `filter`: Current filter status

### 4.4 TodoItem.jsx
**Responsibility:** Render individual task item
- Display task description and metadata
- Show completion checkbox/button
- Show edit button
- Show delete button
- Toggle edit mode for inline editing
- Display category badge/label

**Props:**
- `todo`: Todo object {id, description, completed, createdAt, category}
- `onToggle()`: Toggle completion callback
- `onDelete()`: Delete callback
- `onEdit(newDescription)`: Edit callback

### 4.5 FilterButtons.jsx
**Responsibility:** Display and manage filter controls
- Show filter buttons: All, Active, Completed
- Highlight current active filter
- Handle filter selection
- Optional: category filter buttons

**Props:**
- `currentFilter`: Current active filter
- `onFilterChange(newFilter)`: Callback function
- `stats`: Object with {total, active, completed} counts

### 4.6 SearchBar.jsx (Optional)
**Responsibility:** Search functionality
- Input field for search query
- Real-time search as user types
- Clear button to reset search

**Props:**
- `onSearchChange(query)`: Callback function
- `searchTerm`: Current search value

### 4.7 TaskCounter.jsx (Optional)
**Responsibility:** Display task statistics
- Show total tasks count
- Show active tasks count
- Show completed tasks count

**Props:**
- `stats`: Object with {total, active, completed} counts

---

## 5. Folder Structure

```
my-todo-app/
├── public/
│   └── [static assets]
├── src/
│   ├── components/
│   │   ├── TodoInput.jsx
│   │   ├── TodoList.jsx
│   │   ├── TodoItem.jsx
│   │   ├── FilterButtons.jsx
│   │   ├── SearchBar.jsx
│   │   ├── TaskCounter.jsx
│   │   └── EmptyState.jsx
│   ├── hooks/
│   │   ├── useTodos.js
│   │   ├── useLocalStorage.js
│   │   └── useFilter.js
│   ├── utils/
│   │   ├── storage.js
│   │   ├── validators.js
│   │   └── helpers.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── main.jsx
│   └── style.css
├── eslint.config.js
├── vite.config.js
├── tailwind.config.js
├── package.json
├── README.md
└── PRD.md
```

---

## 6. User Stories

**US-1: Create a New Task**
- As a user, I want to quickly add a new task to my todo list so that I can capture my thoughts and activities
- Acceptance Criteria:
  - I can type in an input field
  - I can submit by clicking Add button or pressing Enter
  - Empty inputs are rejected with error message
  - Input field clears after submission
  - New task appears in the list

**US-2: View All Tasks**
- As a user, I want to see all my tasks in one place so that I can track what I need to do
- Acceptance Criteria:
  - All tasks display in a list
  - Tasks show their description and status
  - List is scrollable if many tasks exist
  - Empty state message shows when no tasks

**US-3: Mark Task Complete**
- As a user, I want to mark tasks as complete so that I can track my progress
- Acceptance Criteria:
  - I can click a checkbox to mark task complete
  - Completed tasks show visual distinction (strikethrough)
  - Status persists after page refresh
  - I can toggle completion status on/off

**US-4: Delete a Task**
- As a user, I want to remove tasks I no longer need so that my list stays relevant
- Acceptance Criteria:
  - I can click delete button on each task
  - Confirmation dialog appears before deletion
  - Task is removed from list and storage
  - Undo option available (optional)

**US-5: Edit Task Description**
- As a user, I want to modify task descriptions so that I can correct or update them
- Acceptance Criteria:
  - I can click edit button on a task
  - Task enters edit mode with editable text
  - I can save or cancel changes
  - Changes persist after refresh

**US-6: Filter Tasks by Status**
- As a user, I want to filter tasks by completion status so that I can focus on what matters
- Acceptance Criteria:
  - Filter buttons show: All, Active, Completed
  - Only matching tasks display when filter is applied
  - Active filter is visually highlighted
  - Filter preference persists in session

**US-7: Search Tasks**
- As a user, I want to search my tasks by keywords so that I can find specific items quickly
- Acceptance Criteria:
  - Search box filters tasks in real-time
  - Search is case-insensitive
  - Clear button resets search
  - Works with all filters

**US-8: View Task Statistics**
- As a user, I want to see how many tasks I have and how many are complete so that I can track progress
- Acceptance Criteria:
  - Counter shows total tasks
  - Counter shows active tasks
  - Counter shows completed tasks
  - Numbers update in real-time

**US-9: Persistent Data Storage**
- As a user, I want my tasks to be saved automatically so that I don't lose my data
- Acceptance Criteria:
  - Tasks save to LocalStorage automatically
  - Tasks load when I open the app again
  - Data persists across browser sessions
  - No backend required

**US-10: Categorize Tasks**
- As a user, I want to assign categories to tasks so that I can organize them by type
- Acceptance Criteria:
  - I can assign category to task (Work, Personal, Shopping, etc.)
  - Category displays on task item
  - I can filter by category
  - Category is saved with task

---

## 7. Use Cases

### Use Case 1: Adding a New Task
**Actor:** User
**Precondition:** App is open and loaded

**Steps:**
1. User sees the app with empty or populated task list
2. User locates the input field at the top
3. User types task description "Buy groceries"
4. User clicks "Add" button (or presses Enter)
5. System validates input (not empty)
6. System creates new todo object with unique ID and timestamp
7. System saves to LocalStorage
8. System adds todo to state
9. Component re-renders showing new task in list
10. Input field clears and focuses for next entry

**Postcondition:** New task appears in list and is persisted

---

### Use Case 2: Completing a Task
**Actor:** User
**Precondition:** At least one incomplete task in list

**Steps:**
1. User views task list with active tasks
2. User identifies task "Buy groceries" as completed
3. User clicks checkbox on that task
4. System updates todo completed status to true
5. System updates todo in storage
6. Component re-renders with visual change (strikethrough)
7. Task counter updates (active count decreases)

**Postcondition:** Task marked complete and persisted

---

### Use Case 3: Filtering Active Tasks Only
**Actor:** User
**Precondition:** Multiple tasks exist with mixed completion status

**Steps:**
1. User sees task list with all tasks (complete and incomplete)
2. User clicks "Active" filter button
3. System sets current filter to 'active'
4. System re-renders list showing only incomplete tasks
5. Completed tasks are hidden
6. "Active" button shows as highlighted/selected
7. Task counter updates to show only active count

**Postcondition:** Only active tasks display; filter state persists in session

---

### Use Case 4: Editing a Task
**Actor:** User
**Precondition:** Task exists in list

**Steps:**
1. User sees task "Buy groceries"
2. User clicks edit/pencil icon on that task
3. Task enters edit mode with input field containing current text
4. User modifies text to "Buy groceries and milk"
5. User clicks "Save" button
6. System validates input (not empty)
7. System updates todo description
8. System updates todo in storage
9. Component exits edit mode and displays updated task
10. User sees the updated description in list

**Postcondition:** Task description updated and persisted

---

### Use Case 5: Deleting a Task
**Actor:** User
**Precondition:** Task exists in list

**Steps:**
1. User sees task "Old task to remove"
2. User clicks delete/trash icon on that task
3. System displays confirmation dialog "Are you sure?"
4. User clicks "Confirm" button
5. System removes todo from state array
6. System removes from LocalStorage
7. Component re-renders list without deleted task
8. Task counter updates

**Postcondition:** Task removed from list and storage

---

### Use Case 6: Searching Tasks
**Actor:** User
**Precondition:** Multiple tasks in list

**Steps:**
1. User sees task list with many tasks
2. User clicks in search box
3. User types "groceries"
4. System filters tasks containing "groceries" in real-time
5. List updates to show only matching tasks (case-insensitive)
6. User sees results update as they type
7. User can see task counter adjust
8. User can still apply other filters

**Postcondition:** List filtered by search term

---

### Use Case 7: Exporting Tasks
**Actor:** User
**Precondition:** At least one task exists

**Steps:**
1. User clicks "Export" button in menu
2. System collects all tasks as JSON
3. System triggers download as "todos.json" file
4. Browser saves file to downloads folder
5. User can now backup or transfer tasks

**Postcondition:** Tasks exported as JSON file

---

## 8. Non-Functional Requirements

### 8.1 Performance
- Initial page load: < 2 seconds
- Task operations (add/edit/delete): < 100ms
- Search/filter update: < 50ms
- No memory leaks or excessive re-renders
- Smooth 60 FPS animations

### 8.2 Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation (Tab, Enter, Escape keys)
- Screen reader support with proper ARIA labels
- Sufficient color contrast (4.5:1 for text)
- Focus visible states on all interactive elements
- Semantic HTML (buttons, inputs, lists)

### 8.3 Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Android)

### 8.4 Usability
- Intuitive interface requiring minimal learning
- Clear visual feedback for all actions
- Consistent styling and interaction patterns
- Error messages are helpful and specific
- No more than 3 clicks to complete any task

### 8.5 Security
- No sensitive data stored in LocalStorage
- Input sanitization to prevent XSS
- No external API calls handling user data
- Client-side only, no backend vulnerabilities

### 8.6 Maintainability
- Well-documented code with comments
- Reusable, modular components
- Clear folder structure and naming conventions
- ESLint configuration enforced
- Unit tests for critical functions (future)

### 8.7 Scalability
- Architecture supports adding new features
- Component structure allows feature expansion
- LocalStorage can handle 1000+ tasks
- Future migration to backend database possible

---

## 9. Future Enhancements

- Due dates and reminders
- Recurring tasks
- Task priority levels
- Subtasks/checklists within tasks
- Dark mode theme
- Cloud synchronization
- Collaboration/shared lists
- Mobile native apps
- Voice input for accessibility
- Integration with calendar apps
- Task templates
- Analytics and insights

---

**Document Version:** 1.0
**Last Updated:** January 19, 2026
**Status:** Ready for Review and Approval
