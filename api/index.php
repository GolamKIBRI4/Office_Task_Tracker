<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');


ob_start();
ini_set('display_errors', '0');

require_once 'Task.php';


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$task = new Task();
$method = $_SERVER['REQUEST_METHOD'];
$response = [];

try {
    switch ($method) {
        case 'GET':
            if (isset($_GET['action'])) {
                $action = $_GET['action'];
                
                switch ($action) {
                    case 'tasks':
                        
                        $tasks = $task->getAllTasks();
                        $response = [
                            'success' => true,
                            'data' => $tasks,
                            'count' => count($tasks)
                        ];
                        break;
                        
                    case 'completed':
                        
                        $completedTasks = $task->getCompletedTasks();
                        $response = [
                            'success' => true,
                            'data' => $completedTasks,
                            'count' => count($completedTasks)
                        ];
                        break;
                        
                    
                        
                    default:
                        $response = ['success' => false, 'message' => 'Invalid action'];
                }
            } else {
                
                $tasks = $task->getAllTasks();
                $response = [
                    'success' => true,
                    'data' => $tasks,
                    'count' => count($tasks)
                ];
            }
            break;
            
        case 'POST':
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!$input) {
                $response = ['success' => false, 'message' => 'Invalid JSON input'];
                break;
            }
            
            if (isset($input['action'])) {
                $action = $input['action'];
                
                switch ($action) {
                    case 'add':
                        $title = isset($input['title']) ? trim($input['title']) : '';
                        $description = isset($input['description']) ? trim($input['description']) : '';
                        
                        if (empty($title)) {
                            $response = ['success' => false, 'message' => 'Title is required'];
                        } else {
                            $response = $task->addTask($title, $description);
                        }
                        break;
                        
                    case 'delete':
                        $id = isset($input['id']) ? intval($input['id']) : 0;
                        if ($id > 0) {
                            $response = $task->deleteTask($id);
                        } else {
                            $response = ['success' => false, 'message' => 'Invalid task ID'];
                        }
                        break;
                        
                    case 'complete':
                        $id = isset($input['id']) ? intval($input['id']) : 0;
                        if ($id > 0) {
                            $response = $task->markAsCompleted($id);
                        } else {
                            $response = ['success' => false, 'message' => 'Invalid task ID'];
                        }
                        break;
                        
                    
                        
                    default:
                        $response = ['success' => false, 'message' => 'Invalid action'];
                }
            } else {
                $response = ['success' => false, 'message' => 'Action parameter required'];
            }
            break;
            
        default:
            $response = ['success' => false, 'message' => 'Method not allowed'];
            break;
    }
} catch (Exception $e) {
    $response = [
        'success' => false,
        'message' => 'Server error: ' . $e->getMessage()
    ];
}


$json = json_encode($response);

while (ob_get_level() > 0) { ob_end_clean(); }
echo $json !== false ? $json : json_encode(['success' => false, 'message' => 'JSON encoding failed']);
exit;
?>