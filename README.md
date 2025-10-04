# Office Task Tracker

A simple and efficient web application for tracking office tasks, built as a proof-of-concept for HR managers to manage daily office activities.

## Features

-  Add new tasks with title and description
-  View all tasks in a clean, organized interface
-  Delete completed tasks
-  Responsive design for mobile and desktop
-  Browser notification support
-  Simple, professional UI 

## Technical Requirements Met

### 1. REST API (PHP)

- `GET /api/tasks` - Returns all tasks in JSON format
- `POST /api/tasks` - Adds a new task
- `POST /api/delete` - Deletes a task by ID

### 2. Database (MySQL)

- Simple `tasks` table with required fields
- Proper database connection and error handling

### 3. Frontend (HTML/CSS/JavaScript)

- Clean, simple interface as requested
- Form to add new tasks
- Display all tasks with delete functionality
- AJAX communication with the API

### 4. Git Integration

- Proper Git repository structure
- Multiple commits for project milestones

## Installation & Setup

### Prerequisites

- PHP 7.4 or higher
- MySQL 5.7 or higher
- Web server (Apache/Nginx) or PHP built-in server

### Local Setup Instructions

1. **Clone or Download the Project**

   ```bash
   # If using Git
   git clone <repository-url>
   cd Todo_Task
   ```

2. **Database Setup**

   - Create a MySQL database named `task_tracker`
   - Import the database structure:

   ```bash
   mysql -u root -p task_tracker < database.sql
   ```

   - Or manually run the SQL commands in `database.sql`

3. **Configure Database Connection**

   - Edit `api/database.php` if needed
   - Update database credentials:
     - Host: `localhost`
     - Username: `root` (or your MySQL username)
     - Password: `` (or your MySQL password)
     - Database: `task_tracker`

4. **Start the Development Server**

   ```bash
   # Option 1: PHP built-in server (recommended for development)
   php -S localhost:8000

   # Option 2: Use XAMPP/WAMP and place files in htdocs/www folder
   ```

5. **Access the Application**
   - Open your browser and go to: `http://localhost:8000`
   - Start adding and managing your tasks!

## 📁 Project Structure

```
Todo_Task/
├── api/
│   ├── database.php      # Database configuration
│   ├── Task.php          # Task model with CRUD operations
│   └── index.php         # API endpoints handler
├── assets/
│   ├── style.css         # Simple, clean styling
│   └── script.js         # Frontend JavaScript functionality
├── database.sql          # Database schema and sample data
├── index.php            # Main application interface
└── README.md            # This file
```

##  API Documentation

### Get All Tasks

- **URL**: `/api/tasks`
- **Method**: `GET`
- **Response**: JSON array of all tasks

### Add New Task

- **URL**: `/api/tasks`
- **Method**: `POST`
- **Body**: `{"title": "Task title", "description": "Optional description"}`
- **Response**: JSON with success status and new task data

### Delete Task

- **URL**: `/api/delete`
- **Method**: `POST`
- **Body**: `{"id": 123}`
- **Response**: JSON with success status

##  Browser Notification Feature

The application includes basic browser notification support:

- Notifications appear when tasks are added or deleted
- Users will be prompted to allow notifications on first use
- This simulates the "phone notification" requirement

##  Usage Examples

### Adding a Task

1. Fill in the "Task Title" field (required)
2. Optionally add a description
3. Click "Add Task"
4. The task will appear in the list below

### Deleting a Task

1. Find the task in the list
2. Click the "Delete" button next to it
3. Confirm the deletion in the popup
4. The task will be removed from the list

##  Deployment Options (Bonus Features)

### 1: Deployed In InfinityFree

- created account . setup the account . used secret credentials   for configuration
- used cloude database
- Update database credentials in `api/database.php`
### Link:
<a href="https://golam-kibria.infinityfree.me/">websitelink</a>

### Option 2: GitHub Actions (for auto-deployment)

- Set up GitHub repository
- Configured GitHub Actions workflow
- Deployed to hosting service automatically

## Security Considerations

- Input validation and sanitization
- Prepared statements for database queries
- CORS headers configured
- Error handling to prevent information disclosure


## Notes

- Note for the implementation purpose for facing error and failing to get the secret and variables from github I implemented it dirrectly. For production they must kept secret for security purpose. 


