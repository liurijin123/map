/**
 * 侧滑展开窗口
 */

$(function () {
    $('#menu-bar').show();
    var slider = $("#menu-bar").slideReveal({
        width: 400,
        push: false,
        position: "right",
        // speed: 600,
        trigger: $(".handle"),
        // autoEscape: false,
        shown: function (obj) {
            obj.find(".handle span").removeClass("arr_l").addClass("arr_r");
            obj.addClass("left-shadow-overlay");
        },
        hidden: function (obj) {
            obj.find(".handle span").removeClass("arr_r").addClass("arr_l");
            obj.removeClass("left-shadow-overlay");
        }
    });
});

/**
 * 获取景点列表
 */
$(document).ready(function () {
    $.ajax({
        url: "/intro/list",
        type: "GET",
        dataType: 'JSON',
        success: function (data) {
            var html = "";
            for (var i = 0; i < data.length; i++) {
                //$("#test").html(data[i]["position"]);
                html = html + loadListData(data[i]["pointId"], data[i]["name"], data[i]["imageUrl"][0], data[i]["position"], data[i]["intro"]);
            }
            document.getElementById("point-list").innerHTML = html;
        }
    });

});

$("#search").click(function () {
    var value = $("#search-input").val();
    alert(value);
});

//加载景点列表
function loadListData(pointId, name, url, position, intro) {
    var html = "<li class=\"media\" style=\"background-color: #bdd4ee\">\n" +
        "                    <div class=\"media-left media-middle\">\n" +
        "                        <a href=\"javascript:getInfo(" + pointId + ");\">\n" +
        "                            <img class=\"media-object\"\n" +
        "                                 src=\"../" + "introduction/" + pointId + url + "\"\n" +
        "                                 alt=\"...\"\n" +
        "                            style=\"width: 100px;height: 100px\">\n" +
        "                        </a>\n" +
        "                    </div>\n" +
        "                    <div class=\"media-body\">\n" +
        "                        <h4 class=\"media-heading\">" + name + "</h4>\n" +
        "                        <p >" + position + "</p>\n" +
        "                        <p >" + intro + "</p>\n" +
        "                    </div>\n" +
        "                </li>";
    return html;
}

//获取详细信息
function getInfo(pointId) {
    $.ajax({
        //url: "/intro/list",
        url: "/intro/" + pointId,
        type: "GET",
        dataType: 'JSON',
        success: function (data) {
            var html =
                "    <div class=\"modal-dialog\" role=\"document\">\n" +
                "        <div class=\"modal-content\">\n" +
                "            <div class=\"modal-header\">\n" +
                "                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                "                <h4 class=\"modal-title\" id=\"myModalLabel\">" + data["name"] + "</h4>\n" +
                "            </div>\n" +
                "            <div class=\"modal-body\">\n" +
                "                " + data["intro"] +
                "            </div>\n" +
                "            <div class=\"modal-footer\">\n" +
                "                <div id=\"myCarousel\" class=\"carousel slide\">\n" +
                "                    <!-- 轮播（Carousel）指标 -->\n" +
                "                    <ol id='indicators' class=\"carousel-indicators\">\n" +

                "                    </ol>   \n" +
                "                    <!-- 轮播（Carousel）项目 -->\n" +
                "                    <div id='inner' class=\"carousel-inner\">\n" +

                "                    </div>\n" +
                "                    <!-- 轮播（Carousel）导航 -->\n" +
                "                    <a class=\"left carousel-control\" href=\"#myCarousel\" role=\"button\" data-slide=\"prev\">\n" +
                "                        <span class=\"glyphicon glyphicon-chevron-left\" aria-hidden=\"true\"></span>\n" +
                "                        <span class=\"sr-only\">Previous</span>\n" +
                "                    </a>\n" +
                "                    <a class=\"right carousel-control\" href=\"#myCarousel\" role=\"button\" data-slide=\"next\">\n" +
                "                        <span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\"></span>\n" +
                "                        <span class=\"sr-only\">Next</span>\n" +
                "                    </a>\n" +
                "                </div>" +
                "            </div>\n" +
                "        </div>\n" +
                "    </div>\n";
            document.getElementById("myModal").innerHTML = html;
            var indicators = "";
            var inner = "";
            for (var i = 0; i < data["imageUrl"].length; i++) {
                indicators = indicators + "<li data-target=\"#myCarousel\" data-slide-to=\"" + i + "\"></li>\n";
                if (i == 0) {
                    inner = inner +
                        "                        <div class=\"item active\">\n" +
                        "                            <img src=\"/introduction/" + data["pointId"] + data["imageUrl"][i] + "\" >\n" +
                        "                            <div class=\"carousel-caption\"></div>\n" +
                        "                        </div>\n"
                } else {
                    inner = inner +
                        "                        <div class=\"item\">\n" +
                        "                            <img src=\"/introduction/" + data["pointId"] + data["imageUrl"][i] + "\" >\n" +
                        "                            <div class=\"carousel-caption\"></div>\n" +
                        "                        </div>\n"
                }

            }
            document.getElementById("indicators").innerHTML = indicators;
            document.getElementById("inner").innerHTML = inner;
            $('#myModal').modal('show');
        }
    });

}