<?php

require '../../app/common.php';

// Get the task id associated with the Worker
$taskId = $_GET['taskId'] ?? 0;


// Fetch work from SQLiteDatabase
$work - Work::findByTaskId($taskId);


// Convert to JSON and print
echo json_encode($work);
