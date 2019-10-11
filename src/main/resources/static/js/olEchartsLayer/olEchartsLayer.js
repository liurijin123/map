var bxmap = bxmap || {};
bxmap.olEchartsLayer = {
    map:null,
    isLoad:false,
    olMapExt:null,
    Init:function(map){
        this.map = map;
        this.isLoad = true;
        //加载移动流向图效果
        this.loadEchartsLayer();
    },
    hideEchartsLayer:function(){
        $("#markline_EchartMap").hide();
    },
    showEchartsLayer:function(){
        $("#markline_EchartMap").show();
        //地图跳转范围
        this.map.getView().setCenter([12849981.699040852, 2498879.3286656872]);
        this.map.getView().setZoom(6);
    },
    removeEchartsLayer:function(){
    	if(this.olMapExt)
           this.olMapExt.clear();
    },
    loadEchartsLayer:function(){
        //加载移动流向图效果
        var olMapExt = this.olMapExt =  new OpenLayer3Ext(this.map, echarts);
        var container = olMapExt.getEchartsContainer();
        var myChart = olMapExt.initECharts(container);
        window.onresize = myChart.resize;
        olMapExt.setOption(move_option, true);
        //地图跳转范围
        this.map.getView().setCenter([13442168.534000002,3599400.8270378476]);
        this.map.getView().setZoom(10);
    }

}


