package fun.liutong.map.service;

import com.alibaba.fastjson.JSONObject;
import fun.liutong.map.dao.LvyouMapper;
import fun.liutong.map.pojo.CityRank;
import fun.liutong.map.pojo.CityNum;
import fun.liutong.map.pojo.WantedWant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChartsService {
    @Autowired
    LvyouMapper lvyouMapper;

    //获取旅游人数密度图
    public String getOptionWantedMap() {
        return getOptionMap("wanted","山西各市旅游人数密度图");
    }

    //获取旅游潜力密度图
    public String getOptionWantMap() {
        return getOptionMap("want","山西省各市旅游潜力密度图");
    }

    //获取景点数量柱状图
    public String getOptionBar() {
        JSONObject option = JSONObject.parseObject("{\n" +
                "                        title:{\n" +
                "                            text: \"\"\n" +
                "                        },\n" +
                "                        legend: {},\n" +
                "                        toolbox: {\n" +
                "                            show: true,\n" +
                "                            orient: 'vertical',\n" +
                "                            left: 'right',\n" +
                "                            top: 'center',\n" +
                "                            feature: {\n" +
                "                            dataView: {readOnly: false},\n" +
                "                            restore: {},\n" +
                "                            saveAsImage: {}\n" +
                "                           }\n" +
                "                        },\n" +
                "                        dataset: {\n" +
                "                        },\n" +
                "                        tooltip: {},\n" +
                "                        xAxis: {type: 'category'},\n" +
                "                        yAxis: {},\n" +
                "                        series: [\n" +
                "                            {type: 'bar'},\n" +
                "                            {type: 'bar'},\n" +
                "                            {type: 'bar'},\n" +
                "                            {type: 'bar'},\n" +
                "                            {type: 'bar'},\n" +
                "                            {type: 'bar'},\n" +
                "                        ]\n" +
                "                    }");
        List<CityRank> datas = lvyouMapper.getCityRank();
        //将查询结果封装为二维数组
        List<List> source = new ArrayList<>();
        List<Object> firstNode = new ArrayList<>();
        firstNode.add("城市");
        firstNode.add("AAAAA景点");
        firstNode.add("AAAA景点");
        firstNode.add("AAA景点");
        firstNode.add("AA景点");
        firstNode.add("无等级景点");
        firstNode.add("所有景点");
        source.add(firstNode);
        for (CityRank data : datas) {
            List<Object> node = new ArrayList<>();
            node.add(data.getCity());
            node.add(data.getAAAAA());
            node.add(data.getAAAA());
            node.add(data.getAAA());
            node.add(data.getAA());
            node.add(data.getNoRank());
            node.add(data.getAllNum());
            source.add(node);
        }
        option.getJSONObject("dataset").put("source", source);
        return option.toJSONString();
    }

    //获取map
    private String getOptionMap(String flag, String title) {
        JSONObject option = JSONObject.parseObject("{\n" +
                "            title: {\n" +
                "                text: '',\n" +
                "                subtext: '旅游人数数据来自欣欣旅游网',\n" +
                "                sublink: 'https://shanxi.cncn.com/'\n" +
                "            },\n" +
                "            tooltip: {\n" +
                "                trigger: 'item',\n" +
                "                formatter: '{b}<br/>{c} (p / km2)'\n" +
                "            },\n" +
                "            dataset: {\n" +

                "            },\n" +
                "            toolbox: {\n" +
                "                show: true,\n" +
                "                orient: 'vertical',\n" +
                "                left: 'right',\n" +
                "                top: 'center',\n" +
                "                feature: {\n" +
                "                    dataView: {readOnly: false},\n" +
                "                    restore: {},\n" +
                "                    saveAsImage: {}\n" +
                "                }\n" +
                "            },\n" +
                "            visualMap: {\n" +
                "                min: 100000,\n" +
                "                max: 2500000,\n" +
                "                text: ['High', 'Low'],\n" +
                "                realtime: false,\n" +
                "                calculable: true,\n" +
                "                inRange: {\n" +
                "                    color: ['lightskyblue', 'yellow', 'orangered']\n" +
                "                }\n" +
                "            },\n" +
                "            series: [\n" +
                "                {\n" +
                "                    name: '" + title + " ',\n" +
        "                    type: 'map',\n" +
                "                    mapType: 'SX',\n" +
                "                    itemStyle: {\n" +
                "                        normal: {label: {show: true}},\n" +
                "                        emphasis: {label: {show: true}}\n" +
                "                    }\n" +
                "                }\n" +
                "            ]\n" +
                "        }");


        List<CityNum> datas = lvyouMapper.getCityNum(flag);
        //将查询结果封装为二维数组
        List<List> source = new ArrayList<>();
        for (CityNum data : datas) {
            List<Object> node = new ArrayList<>();
            node.add(data.getCity());
            node.add(data.getNum());
            source.add(node);
        }
        option.getJSONObject("dataset").put("source", source);
        return option.toJSONString();
    }

    public List<List> getOptionScatter() {
        JSONObject option = JSONObject.parseObject("");
        List<WantedWant> datas = lvyouMapper.getWantedWant();
        //将查询结果封装为二维数组
        List<List> result = new ArrayList<>();
        for (WantedWant data : datas) {
            List<Object> node = new ArrayList<>();
            node.add(data.getWanted());
            node.add(data.getWant());
            result.add(node);
        }
        return result;
    }
}
