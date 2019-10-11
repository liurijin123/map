package fun.liutong.map.service;

import fun.liutong.map.dao.IntroMapper;
import fun.liutong.map.pojo.Introduction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IntroService {
    @Autowired
    IntroMapper introMapper;
    public List<Introduction> getIntroList(){
        return introMapper.getIntroList();
    }
}
