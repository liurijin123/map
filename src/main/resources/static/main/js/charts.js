/**
 *  加载图表
 */
function getChart(name, title) {
    var html =
        "    <div class=\"modal-dialog modal-lg\" role=\"document\">\n" +
        "        <div class=\"modal-content\">\n" +
        "            <div class=\"modal-header\">\n" +
        "<h1>" + title + "</h1>" +
        "            </div>\n" +
        // "            <div class=\"modal-body\">\n" +
        // "<p>ompleted initialization in 4 ms</p>" +
        // "            </div>\n" +
        "            <div class=\"modal-footer\">\n" +
        "                <div id= 'main' style=\"width: 870px;height:700px;\" >" +
        "                </div>"
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n";
    document.getElementById("myModal").innerHTML = html;
    // 初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    if (name == "wantedMap" || name == "wantMap") {
        $.get('http://120.77.207.54:8080/geoserver/gis/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=gis%3Acity&maxFeatures=50&outputFormat=application/json',
            function (geoJson) {
                echarts.registerMap('SX', geoJson);
                $.ajax({
                    url: "/option/" + name,
                    type: "GET",
                    dataType: 'JSON',
                    success: function (option) {
                        // 使用刚指定的配置项和数据显示图表。
                        myChart.setOption(option);
                        $('#myModal').modal('show');
                    }
                });
            }
        );
    } else if(name == "scatter"){
        $.ajax({
            url: "/option/" + name,
            type: "GET",
            dataType: 'JSON',
            success: function (data) {
                var myRegression = ecStat.regression('linear', data);
                myRegression.points.sort(function(a, b) {
                    return a[0] - b[0];
                });
                option = {
                    title: {
                        text: '',
                        subtext: 'By ecStat.regression',
                        sublink: 'https://github.com/ecomfe/echarts-stat',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    xAxis: {
                        type: 'value',
                        splitLine: {
                            lineStyle: {
                                type: 'dashed'
                            }
                        },
                    },
                    yAxis: {
                        type: 'value',
                        min: 1.5,
                        splitLine: {
                            lineStyle: {
                                type: 'dashed'
                            }
                        },
                    },
                    dataZoom: [
                        {
                            type: 'slider',
                            xAxisIndex: 0,
                            start: 0,
                            end: 100
                        },
                        {
                            type: 'inside',
                            xAxisIndex: 0,
                            start: 50,
                            end: 50
                        },
                        {
                            type: 'slider',
                            yAxisIndex: 0,
                            start: 0,
                            end: 100
                        },
                        {
                            type: 'inside',
                            yAxisIndex: 0,
                            start: 50,
                            end: 50
                        }
                    ],
                    series: [{
                        name: 'scatter',
                        type: 'scatter',
                        label: {
                            emphasis: {
                                show: true,
                                position: 'left',
                                textStyle: {
                                    color: 'blue',
                                    fontSize: 16
                                }
                            }
                        },
                        data: data
                    }, {
                        name: 'line',
                        type: 'line',
                        showSymbol: false,
                        data: myRegression.points,
                        markPoint: {
                            itemStyle: {
                                normal: {
                                    color: 'transparent'
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'left',
                                    formatter: myRegression.expression,
                                    textStyle: {
                                        color: '#333',
                                        fontSize: 14
                                    }
                                }
                            },
                            data: [{
                                coord: myRegression.points[myRegression.points.length - 1]
                            }]
                        }
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                $('#myModal').modal('show');
            }
        });
    }else {
        $.ajax({
            url: "/option/" + name,
            type: "GET",
            dataType: 'JSON',
            success: function (option) {
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                $('#myModal').modal('show');
            }
        });
    }


}