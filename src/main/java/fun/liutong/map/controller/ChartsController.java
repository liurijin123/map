package fun.liutong.map.controller;

import fun.liutong.map.service.ChartsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/option")
public class ChartsController {
    @Autowired
    ChartsService chartsService;

    //获取旅游人数密度图
    @RequestMapping(value = "/wantedMap", method = RequestMethod.GET)
    public String getOptionWantedMap(){
        return chartsService.getOptionWantedMap();
    }

    //获取旅游人数密度图
    @RequestMapping(value = "/wantMap", method = RequestMethod.GET)
    public String getOptionWantMap(){
        return chartsService.getOptionWantMap();
    }

    //获取景点数量柱状图
    @RequestMapping(value = "/bar", method = RequestMethod.GET)
    public String getOptionBar(){
        return chartsService.getOptionBar();
    }

    //获取景点数量柱状图
    @RequestMapping(value = "/scatter", method = RequestMethod.GET)
    public List<List> getOptionScatter(){
        return chartsService.getOptionScatter();
    }
}
