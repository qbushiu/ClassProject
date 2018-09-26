<?php

class Team
{
  public $task_id;
  public $name;

  public function __construct($data) {

    $this->team_id = intval($row['task_id']);
    $this->name = $row['name'];


  }
  public static function FetchAll() {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    // 2. Prepare the query
    $sql = 'SELECT * FROM Team';

    $statement = $db->prepare($sql);

    // 3. Run the query
    $success = $statement->execute(
        [$teamId]
    );

    // 4. Handle the results
    $arr = [];

    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {

      // 4.a. For each row, make a new work object
      $theTeam =  new Team($row);

      array_push($arr, $theTeam);
    }
    // 4.b. return the array of work objects
    return $arr;
  }
}
