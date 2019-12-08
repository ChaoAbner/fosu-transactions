package com.fosu.campus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import javax.annotation.PostConstruct;
import java.util.TimeZone;

/**
 * @author MOSTRO
 */
@SpringBootApplication
//@EnableSwagger2
public class CampusApplication {

//    @PostConstruct
//    void started() {
//        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Shanghai"));
//    }

    public static void main(String[] args) {
        SpringApplication.run(CampusApplication.class, args);
    }

}
