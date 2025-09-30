
CREATE DATABASE IF NOT EXISTS task_tracker;
USE task_tracker;


CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('pending', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    email_sent BOOLEAN DEFAULT FALSE,
    email_sent_at TIMESTAMP NULL
);


INSERT INTO tasks (title, description) VALUES 
('Send monthly report', 'Prepare and send the monthly performance report to management'),
('Book meeting room', 'Reserve conference room for team meeting on Friday'),
('Update employee records', 'Update contact information for new employees');