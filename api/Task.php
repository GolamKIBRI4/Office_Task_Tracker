<?php
require_once 'database.php';

class Task {
    private $db;
    private $table = 'tasks';

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
    }

 
    public function getAllTasks() {
        $query = "SELECT * FROM {$this->table} WHERE status = 'pending' ORDER BY created_at DESC";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
    }

 
    public function addTask($title, $description = '') {
        $query = "INSERT INTO {$this->table} (title, description) VALUES (:title, :description)";
        $stmt = $this->db->prepare($query);
        
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':description', $description);
        
        if ($stmt->execute()) {
            return [
                'success' => true,
                'message' => 'Task added successfully',
                'data' => [
                    'id' => $this->db->lastInsertId(),
                    'title' => $title,
                    'description' => $description,
                    'status' => 'pending',
                    'created_at' => date('Y-m-d H:i:s')
                ]
            ];
        }
        return ['success' => false, 'message' => 'Failed to add task'];
    }

    
    public function deleteTask($id) {
        
        $taskDetails = $this->getTaskById($id);
        
        if (!$taskDetails) {
            return ['success' => false, 'message' => 'Task not found'];
        }
        
        
        $query = "DELETE FROM {$this->table} WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);
        
        if ($stmt->execute()) {
            return [
                'success' => true, 
                'message' => 'Task completed and deleted successfully'
            ];
        }
        
        return ['success' => false, 'message' => 'Failed to delete task'];
    }

    
    public function markAsCompleted($id) {
        
        $taskDetails = $this->getTaskById($id);
        
        if (!$taskDetails) {
            return ['success' => false, 'message' => 'Task not found'];
        }
        
 
        $query = "UPDATE {$this->table} SET status = 'completed', completed_at = CURRENT_TIMESTAMP WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);
        
        if ($stmt->execute()) {
            return [
                'success' => true, 
                'message' => 'Task marked as completed'
            ];
        }
        
        return ['success' => false, 'message' => 'Failed to mark task as completed'];
    }


    public function getCompletedTasks() {
        $query = "SELECT * FROM {$this->table} WHERE status = 'completed' ORDER BY completed_at DESC LIMIT 10";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
    }

  
    public function getTaskById($id) {
        $query = "SELECT * FROM {$this->table} WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch();
    }
}
?>