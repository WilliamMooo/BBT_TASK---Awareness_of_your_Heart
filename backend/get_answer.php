<?php

require_once "config.php";

if (!isset($_POST["data"])) {
    exit (json_encode([
        "errcode" => 1,
        "errmsg" => "数据缺失"
    ]));
}

$id = json_decode($_POST["data"], true)["id"];

if (!is_int($id) || $id < -1) {
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

if ($id !== 0) {
    $stm = $con->prepare("SELECT `id`, `click` FROM {$config["table"]["question"]} WHERE `id` = ?");
    $stm->execute([$id]);
    if ($stm->rowCount()) {
        $click = $stm->fetch(PDO::FETCH_ASSOC)["click"] + 1;
        $stm->closeCursor();
        $stm = $con->prepare("UPDATE {$config["table"]["question"]} SET `click` = ? WHERE `id` = ?");
        $stm->execute([$click, $id]);
    } else {
        exit (json_encode([
            "errcode" => 4,
            "errmsg" => "问题索引不存在"
        ]));
    }
}

$stm = $con->prepare("SELECT `text` FROM {$config["table"]["answer"]}");
$stm->execute();

$rand = rand(0, $stm->rowCount() - 1);

exit (json_encode([
    "errcode" => 0,
    "errmsg" => "",
    "answer" => $stm->fetchAll(PDO::FETCH_ASSOC)[$rand]["text"]
]));