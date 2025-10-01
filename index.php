<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Office Task Tracker</title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
    <div class="container">
       
        <div class="header">
            <h1>Office Task Tracker </h1>
            <p>Keep track of your daily office tasks efficiently</p>
        </div>

        
        <div class="task-form">
            <h2>Add New Task </h2>
            <form id="taskForm">
                <div class="form-group">
                    <label for="title">Task Title </label>
                    <input type="text" id="title" name="title" required placeholder="Enter task title...">
                </div>
                
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea id="description" name="description" placeholder="Enter task description..."></textarea>
                </div>
                
                <button type="submit" class="btn">Add Task</button>
            </form>
        </div>

        
        <div class="tasks-section">
            <h2> All Tasks</h2>
            <div id="tasksContainer">
                <div class="loading">Loading tasks...</div>
            </div>
        </div>
    </div>

    <script src="assets/script.js"></script>
</body>
</html>