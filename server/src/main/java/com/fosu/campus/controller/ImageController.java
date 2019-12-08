package com.fosu.campus.controller;

import com.fosu.campus.domain.model.Image;
import com.fosu.campus.service.ImageService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @Author: MOSTRO
 */
@RestController
@RequestMapping("image")
public class ImageController {

    @Autowired
    private ImageService imageService;



    @ApiOperation(value = "")
    @GetMapping("findAll")
    public ResponseEntity<List<Image>> findAllBrand(){
        List<Image> images = imageService.findAll();
        return ResponseEntity.ok(images);
    }

    @ApiOperation(value = "")
    @PostMapping
    public ResponseEntity<Image> updateImage(@RequestBody Image image){
        Image update = imageService.update(image);
        return ResponseEntity.ok(update);
    }


    @ApiOperation(value = "保存一个商品")
    @PutMapping
    public ResponseEntity<Image> saveImage(@RequestBody Image image){
        Image save = imageService.save(image);
        return ResponseEntity.ok(save);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteImageById(@PathVariable("id") Long id){
        imageService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
