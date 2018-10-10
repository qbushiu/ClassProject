<?php

class WorkHoursReport
{
  public function fetchByProjectId($projectId) {

    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    $sql = 'SELECT DATE(start_date) AS date,
              SUM(hours) as asHours
              FROM Work, Tasks
              WHERE Work.task_id = Tasks.id
              AND Tasks.project_id = ?
              GROUP BY DATE(start_date)
              ORDER BY date';

    $statement = $db->prepare($sql);
    $success = $statement->execute(
      [$projectId]
    );
  }

  public static function getWorkByTaskId(int $taskId) {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    // 2. Prepare the query
    $sql = 'SELECT * FROM Work WHERE task_id = ?';

    $statement = $db->prepare($sql);

    // 3. Run the query
    $success = $statement->execute(
        [$taskId]
    );
    $arr = $statement->fetchAll(PDO::FETCH_ASSOC);

    return $arr;
  }
}
