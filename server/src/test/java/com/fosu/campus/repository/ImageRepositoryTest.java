package com.fosu.campus.repository;

import com.fosu.campus.domain.model.Image;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

/**
 * @Author: MOSTRO
 */
@SpringBootTest()
@RunWith(SpringRunner.class)
public class ImageRepositoryTest {

    @Autowired
    private ImageRepository imageRepository;

    @Test
    public void test1(){
        List<Image> images = imageRepository.findImagesByBrandId(1L);
        images.forEach(System.out::println);
    }

    @Test
    public void insertTest(){
    }

}