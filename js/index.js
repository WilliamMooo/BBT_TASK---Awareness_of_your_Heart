window.history.replaceState({}, 0, "#page1"); //

$(window).on("hashchange", (function () {
    var load = [false, false],
        i, j;
    return function () {
        switch (window.location.hash) {
            case "#page1":
                $(".scroll").attr("class", "scroll");
                break;
            case "#page2":
                if (!load[0]) {
                    for (i in $(".img-page4-lazy")) {
                        j = $(".img-page4-lazy").eq(i);
                        j.attr("src", j.attr("src-lazy"));
                    }
                    load[0] = true;
                }
                $(".scroll").attr("class", "scroll scroll1");
                break;
            case "#page3":
                if (!load[1]) {
                    //$(".img-page5-lazy").attr("src", this.attr("src-lazy"));
                    $("#panel-5").css({
                        background: "url(res/page5/background.png)",
                        backgroundSize: "100% 100%",
                        backgroundPosition: "bottom"
                    });
                    load[1] = true;
                }
                $(".scroll").attr("class", "scroll scroll2");
                break;
            case "#page4":
                $(".scroll").attr("class", "scroll scroll3");
                break;
            case "#page5":
                $(".scroll").attr("class", "scroll scroll4");
        }
    };
})());

document.onreadystatechange = function () {
    //console.log(document.readyState);
    if (document.readyState == "complete") {
        $(".loading").fadeOut();
        $("#second").hide();
        $(".satisfaction").hide();
    }
}

$("#next1").click(function () {
    window.location.hash = "#page2"; //
    $(".scroll").attr("class", "scroll scroll1");
})

function getQuestion(qtype) {
    $.ajax({
        type: "POST",
        url: "./backend/get_question.php",
        data: {
            data: JSON.stringify({
                type: qtype
            }),
        },
        success: function (data) {
            $(".questions").remove(); //
            $("#change").remove(); //
            $(".question1").show();
            var obj = JSON.parse(data),
            questions = obj["question"],
            ids = [];

            if (obj["errcode"] == 0) {
                window.location.hash = "#page3"; //
                for (var i = 0; i <= 5; i++) {
                    var txt = questions[i].text;
                        clicks = questions[i].click,
                        $div = $("<div></div>"),
                        ids[txt] = questions[i].id;
                        console.log(ids);
                    $div.text(txt);
                    $div.prepend('<img class="before" src="./res/page3/3.png" alt="">');

                    $(".question1").append($div);

                    if (clicks <= 20) {
                        $div.css({
                            "opacity": 0.5,
                        });
                    } else if (clicks <= 100) {
                        $div.css({
                            "opacity": 0.6,
                        });
                    } else if (clicks <= 500) {
                        $div.css({
                            "opacity": 0.75,
                        });
                    } else if (clicks <= 1000) {
                        $div.css({
                            "opacity": 0.9,
                        });
                    } else {
                        $div.css({
                            "opacity": 1,
                        });
                    }

                    $div.addClass("questions");
                };

                $(".question1").append('<div id="change"><img class="change" src="./res/page3/2.png" alt=""></div>');
                $("#change").click(function () {
                    $(".questions").remove();
                    this.remove();
                    getQuestion(type);
                });

                $(".questions").click(function () {
                    window.location.hash = "#page4";
                    var selectValue = "";
                    selectValue = $(this).text();
                    var id = ids[selectValue];
                    console.log(id);
                    getAnswer(id);
                });
            } else {
                var text = "";
                text = obj["errmsg"];
                alert(text);
                return;
            }
        },
        error: function () {
            alert("网络连接失败");
            return;
        },
    })
}

function getAnswer(id) {
    context.drawImage(img, 18, 18, 286, 186);
    $(".satisfaction").fadeOut();
    if (id != 0) {
        $("#second").fadeOut(20, function () {
            $("#first").fadeIn(200);
        });
    }
    var id = parseInt(id);
    $.ajax({
        type: "POST",
        url: "./backend/get_answer.php",
        data: {
            data: JSON.stringify({
                id: id
            }),
        },
        success: function (data) {
            var obj = JSON.parse(data);
            var answer = obj["answer"];
            $("#answer").text(answer);
        },
        error: function () {
            alert("网络连接失败");
            return;
        }
    })
};

var type = "";
$("#option1").click(function () {
    type = 0;
    getQuestion(type);
})

$("#option2").click(function () {
    type = 1;
    getQuestion(type);
})

$("#option3").click(function () {
    type = 2;
    getQuestion(type);
})

$("#yes").click(function () {
    window.history.replaceState({}, 0, "#page5"); //
    $(".scroll").attr("class", "scroll scroll4"); //
})

$("#no").click(function () {
    context.drawImage(img, 18, 18, 286, 186);
    getAnswer(0);
    $("#first").fadeOut(20, function () {
        $("#second").fadeIn(200);
    });
    $(".satisfaction").fadeOut();
})


var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    eraser = 35,
    lastPoint,
    img = new Image();

img.src = "./res/page4/cover.png";
var dragging = false;

window.onload = function () {
    context.save();
    context.drawImage(img, 18, 18, 286, 186);
    context.beginPath();
    context.restore();
}

function windowToCanvas(e) {
    let x = e.targetTouches[0].clientX,
        y = e.targetTouches[0].clientY,
        borderbox = canvas.getBoundingClientRect();

    return {
        x: x - borderbox.left,
        y: y - borderbox.top
    }
}

function drawEraser(loc) {
    if (dragging) {
        var dx = lastPoint.x - loc.x,
            dy = lastPoint.y - loc.y;
        var dxp = dy * eraser / Math.sqrt(dx * dx + dy * dy),
            dyp = -dx * eraser / Math.sqrt(dx * dx + dy * dy);
        context.save();
        context.beginPath();
        context.strokeStyle = "rgba(0, 0, 0, 0)";
        context.moveTo(lastPoint.x + dxp, lastPoint.y + dyp);
        context.lineTo(loc.x + dxp, loc.y + dyp);
        context.lineTo(loc.x - dxp, loc.y - dyp);
        context.lineTo(lastPoint.x - dxp, lastPoint.y - dyp);
        context.stroke();
        context.clip();
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        lastPoint = loc;
    }
    context.save();
    context.beginPath();
    context.arc(loc.x, loc.y, eraser, 0, Math.PI * 2, false);
    context.clip();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
}

canvas.addEventListener("touchstart", function (e) {
    e.preventDefault();
    var loc = windowToCanvas(e);
    lastPoint = loc;
    drawEraser(loc);
    dragging = true;
})

canvas.addEventListener("touchmove", function (e) {
    e.preventDefault();
    var loc;
    if (dragging) {
        loc = windowToCanvas(e);
        drawEraser(loc);
    }
})

canvas.addEventListener("touchend", function (e) {
    e.preventDefault();
    dragging = false;
    $(".satisfaction").fadeIn();
})