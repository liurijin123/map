package fun.liutong.map.service;

import fun.liutong.map.dao.PointRepository;
import fun.liutong.map.pojo.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PointService  {
    @Autowired
    PointRepository pointRepository;

    public List<Point> findAll(){
        List<Point> pointList = pointRepository.findAll();
        return pointList;
    }

    public Point findByPointId(String PointId){
        Point point = pointRepository.findByPointId(PointId);
        return point;
    }

}
