package fun.liutong.map.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
//@RequestMapping("/test")
public class TestController {
    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public String test(){
        return "test";
    }

    @ResponseBody
    @RequestMapping(value = "/data", method = RequestMethod.GET)
    public Object[][] data(){
        Object[][] data = {
                {"city", "AAAAA", "AAAA", "AAA","AA"},
                {"太原", 43, 85, 93, 99},
                {"吕梁", 83, 73, 55, 99},
                {"晋中", 86, 65, 82, 99},
                {"大同", 72, 53, 39, 99},
                {"忻州", 72, 53, 39, 99},
        } ;
        return data;
    }
}
