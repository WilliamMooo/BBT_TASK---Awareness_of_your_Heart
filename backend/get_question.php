<?php

require_once "config.php";

if (!isset($_POST["data"])) {
    exit (json_encode([
        "errcode" => 1,
        "errmsg" => "数据缺失"
    ]));
}

$type = json_decode($_POST["data"], true)["type"];

if (!is_int($type) || $type < 0 || $type > 2) {
    exit (json_encode([
        "errcode" => 2,
        "errmsg" => "非法的数据"
    ]));
}

try {
    $con = new PDO($config["dsn"], $config["user"], $config["password"]);
} catch (PDOException $e) {
    exit (json_encode([
        "errcode" => 3,
        "errmsg" => "数据库连接失败"
    ]));
}
$con->query("SET NAMES UTF8");

$stm = $con->prepare("SELECT * FROM {$config["table"]["question"]} WHERE `type` = ?");
$stm->execute([$type]);

$result = $stm->fetchAll(PDO::FETCH_ASSOC);
$total = $stm->rowCount();

for ($i = 0; $i < $config["question_select_num"]; $i++) {
    $rand = ((rand() % ($total - 1)) + $i + 1) % $total;
    $j = $result[$rand];
    $result[$rand] = $result[$i];
    $result[$i] = $j;
}

$question = [];
for ($i = 0; $i < $config["question_select_num"]; $i++) {
    $question[] = [
        "id" => $result[$i]["id"],
        "text" => $result[$i]["text"], 
        "click" => $result[$i]["click"]
    ];
}

exit (json_encode([
    "errcode" => 0,
    "errmsg" => "",
    "question" => $question
]));