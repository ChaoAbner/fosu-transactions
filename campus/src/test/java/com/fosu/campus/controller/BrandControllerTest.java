package com.fosu.campus.controller;

import com.fosu.campus.domain.model.Brand;
import com.fosu.campus.service.BrandService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

/**
 * @Author: MOSTRO
 */
@SpringBootTest
@RunWith(SpringRunner.class)
public class BrandControllerTest {

    @Autowired
    private BrandService brandService;

    @Test
    public void findAll() {
        List<Brand> list = brandService.findAll();
        list.forEach(System.out::println);
    }

    @Test
    public void delete(){
        brandService.deleteById(1L);
    }
}