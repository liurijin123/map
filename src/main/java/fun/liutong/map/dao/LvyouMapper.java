package fun.liutong.map.dao;

import fun.liutong.map.pojo.CityRank;
import fun.liutong.map.pojo.CityNum;
import fun.liutong.map.pojo.WantedWant;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface LvyouMapper {
    @Select("select city,sum(${flag}) as num from lvyou group by city")
//@Select("select city,sum(want) as num from lvyou group by city")
    List<CityNum> getCityNum(@Param("flag") String flag);

    @Select("select city,count(city) as allNum,\n" +
            "count(case when rank=\"AAAAA\" then 1 else null end) as AAAAA,\n" +
            "count(case when rank=\"AAAA\" then 1 else null end) as AAAA,\n" +
            "count(case when rank=\"AAA\" then 1 else null end) as AAA,\n" +
            "count(case when rank=\"AA\" then 1 else null end) as AA,\n" +
            "count(case when rank=\"\" then 1 else null end) as noRank from lvyou group by city")
    List<CityRank> getCityRank();

    @Select("select wanted,want from lvyou ")
    List<WantedWant> getWantedWant();
}
