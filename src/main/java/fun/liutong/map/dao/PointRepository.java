package fun.liutong.map.dao;

import fun.liutong.map.pojo.Point;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PointRepository extends MongoRepository<Point, ObjectId> {
    Point findByPointId(String PointId);
}
