/**
 * 弹出框
 */
var overlay = new ol.Overlay({
    element: document.getElementById('popup'),
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
});
window.onload = function () {
    document.getElementById('popup-closer').onclick = function () {
        overlay.setPosition(undefined);
        document.getElementById('popup-closer').blur();
        return false;
    };
};

map.addOverlay(overlay);
map.on('singleclick', function (evt) {
    var coordinate = evt.coordinate;
    var hdms = ol.coordinate.toStringHDMS(ol.proj.toLonLat(coordinate));
    var feature = map.forEachFeatureAtPixel(evt.pixel,
        function (feature) {
            return feature;
        });
    if (feature) {
        var pointId = feature.get("id");
        //alert(id);
        //var id = 1;
        $.ajax({
            url: "/intro/" + pointId,
            type: "GET",
            dataType: 'JSON',
            success: function (data) {
                var html = loadPopupData(pointId, data["imageUrl"][0], data["name"], data["position"], data["rank"], data["type"]);
                document.getElementById('popup-content').innerHTML = html;
                layui.use('rate', function () {
                    var rate = layui.rate;

                    //渲染
                    var ins1 = rate.render({
                        elem: '#test1', //绑定元素
                        value: 5,
                        readonly: true,
                        text: true
                    });
                });
            }
        })
        overlay.setPosition(coordinate);
    } else {
        overlay.setPosition(undefined);
        document.getElementById('popup-closer').blur();
    }

});

//加载弹窗数据
function loadPopupData(pointId, imageUrl, name, position, rank, type) {
    var typeHtml = "";
    for (var i = 0; i < type.length; i++) {
        typeHtml = typeHtml + type[i] + "&nbsp"
    }
    var html =
        "<div class=\"row\">\n" +
        "  <div class=\"col-md-12\">\n" +
        "    <div class=\"thumbnail\">\n" +
        "      <img src=\"../" + "introduction/" + pointId + imageUrl + "\" alt=\"...\">\n" +
        "      <div class=\"caption\">\n" +
        "        <h3>" + name + "&nbsp<span style='color: #c0a16b'>" + rank + "</span></h3>\n" +
        "        <p>" + position + "</p>\n\n" +
        "        <p>景点类型：" + typeHtml + "</p>" +
        "        <div id=\"test1\"></div>\n" +
        "        <a href=\"javascript:getInfo(" + pointId + ")\" class=\"btn btn-primary\" role=\"button\">详细信息</a>" +
        "      </div>\n" +
        "    </div>\n" +
        "  </div>\n" +
        "</div>";
    return html;
}


