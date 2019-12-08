package com.fosu.campus.service.impl;

import com.fosu.campus.domain.model.Brand;
import com.fosu.campus.domain.vo.PageResult;
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
public class BrandServiceImplTest {

    @Autowired
    private BrandService brandService;

    @Test
    public void findAll() {
        List<Brand> all = brandService.findAll();
        all.forEach(System.out::println);
    }

    @Test
    public void queryById() {
        Brand brand = brandService.queryById(1L);
        System.out.println(brand);
    }

    @Test
    public void deleteById() {
    }

    @Test
    public void update() {
    }

}