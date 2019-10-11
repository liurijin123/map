var host = "http://www.liutong.fun:8080";
var map = new ol.Map({
    target: 'map',
    controls: ol.control.defaults().extend([
        //缩放条
        new ol.control.ZoomSlider(),
        //比例尺
        new ol.control.ScaleLine(),
        //鹰眼功能
        new ol.control.OverviewMap(),
        // 导航控件
        // new ol.control.ZoomToExtent({
        //     extent: [
        //         813079.7791264898, 5929220.284081122,
        //         848966.9639063801, 5936863.986909639
        //     ]
        // }),
        // 全屏
        new ol.control.FullScreen()
    ]),
    layers: [
        //加载底图
        new ol.layer.Tile({
            projection: 'EPSG:3857',
            source: new ol.source.OSM()
        }),

        // new ol.layer.Vector({
        //     projection: 'EPSG:3857',
        //     source: new ol.source.Vector({
        //         format: new ol.format.GeoJSON(),
        //         url: host + '/geoserver/gis/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=gis%3Aroad&maxFeatures=50&outputFormat=application/json'
        //     }),
        //     style: new ol.style.Style({
        //         stroke: new ol.style.Stroke({
        //             color: 'blue',
        //             width: 2
        //         })
        //     })
        // }),

        //加载景点
        new ol.layer.Vector({
            projection: 'EPSG:3857',
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: host + '/geoserver/gis/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=gis%3Apoint&maxFeatures=50&outputFormat=application/json'
            }),
            style: new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 0.5],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: '../fonts/images/camera_32px_1204346_easyicon.net.png'
                })
            })
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([111, 40]),
        zoom: 6
    })
})

