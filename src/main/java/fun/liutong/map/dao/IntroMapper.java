package fun.liutong.map.dao;

import fun.liutong.map.pojo.Introduction;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;


@Mapper
public interface IntroMapper {
    //查询文章列表
    @Select("select id , name , imageUrl , position , intro from introduction")
    List<Introduction> getIntroList();
}
