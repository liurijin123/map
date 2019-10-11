package fun.liutong.map.controller;

import fun.liutong.map.pojo.Point;
import fun.liutong.map.service.PointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/intro")
public class PointController {
    @Autowired
    PointService pointService;
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public List<Point> getPointList(){
        List<Point> points = pointService.findAll();
        //System.out.println(points);
        return points;
    }
    @RequestMapping(value = "/{pointId}", method = RequestMethod.GET)
    public Point getPointByPointID(@PathVariable("pointId") String pointId){
        //System.out.println(pointId);
        Point point = pointService.findByPointId(pointId);
        //System.out.println(point);
        return point;
    }
}
