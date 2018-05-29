<?php

/**
 * putter()在此的作用为将读取到文件的非空行插入到数据表中
 * $dir为要读取的文件的位置
 * $call为读取非空行时执行的回调函数
 */
function putter($dir, $call) {
    $handle = fopen($dir, "r");
    while ($s = fgets($handle)) {
        if (($s = trim($s)) === "") {
            continue;
        }
        $call($s);
    }
    fclose($handle);
}

// 以下为主要逻辑
require_once __DIR__ . "/../config.php";

try {
    $con = new PDO($config["dsn"], $config["user"], $config["password"]);
} catch (PDOException $e) {
    exit ("数据库连接失败");
}
$con->query("SET NAMES UTF8");

// 建立储存问题的数据表并插入数据
$con->query(
    "CREATE TABLE {$config["table"]["question"]} (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `type` tinyint(4) NOT NULL,
        `text` tinytext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
        `click` int(11) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1;"
);

$stm_question = $con->prepare("INSERT INTO {$config["table"]["question"]} (`type`, `text`, `click`) VALUES (?, ?, ?)");

putter(__DIR__ . "/question_university.txt", function ($s) use (&$stm_question) {
    $stm_question->execute([0, $s, 0]);
});

putter(__DIR__ . "/question_self.txt", function ($s) use (&$stm_question) {
    $stm_question->execute([1, $s, 0]);
});

putter(__DIR__ . "/question_world.txt", function ($s) use (&$stm_question) {
    $stm_question->execute([2, $s, 0]);
});

// 建立储存答案的数据表并插入数据
$con->query(
    "CREATE TABLE {$config["table"]["answer"]} (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `text` tinytext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1;"
);

$stm_answer = $con->prepare("INSERT INTO {$config["table"]["answer"]} (`text`) VALUES (?)");

putter(__DIR__ . "/answer.txt", function ($s) use (&$stm_answer) {
    $stm_answer->execute([$s]);
});

echo "已成功注入数据";