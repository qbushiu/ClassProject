<?php

require '../../app/common.php';


//Fetch Team from database
$teams = Team::FindAll();

//conver to JSON and print
echo json_encode($teams);
