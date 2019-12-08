package com.fosu.campus.controller;

import com.fosu.campus.common.enums.CampusHttpStatus;
import com.fosu.campus.common.exception.CampusException;
import com.fosu.campus.domain.model.Category;
import com.fosu.campus.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;

import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

/**
 * @Author: MOSTRO
 */
@RequestMapping("category")
@RestController
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping(path = "findAll")
    public ResponseEntity<List<Category>> findAll(){
        List<Category> categories = categoryService.findAll();

        return ResponseEntity.ok(categories);
    }

    @ApiIgnore
    @GetMapping(path = "{id}")
    public ResponseEntity<Category> queryCategoryById(@PathVariable(name = "id") Long id){
        Category category = categoryService.queryCategoryById(id);
        return ResponseEntity.ok(category);
    }


    @PutMapping
    public ResponseEntity<Void> updateCategory(@RequestBody Category category){

        Category category1 = categoryService.updateCategory(category);

        if(category1 == null){
            throw new CampusException(CampusHttpStatus.CATEGORY_UPDATE_FAILED);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping
    public ResponseEntity<Void> saveCategory(@RequestBody Category category){
        Category category1 = categoryService.saveCategory(category);

        if(category1 == null){
            throw new CampusException(CampusHttpStatus.CATEGORY_SAVE_FAILED);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
