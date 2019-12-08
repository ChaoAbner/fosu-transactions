package com.fosu.campus.controller;

import com.fosu.campus.domain.model.Tag;
import com.fosu.campus.service.TagService;
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
@RequestMapping("tag")
@RestController
public class TagController {

    @Autowired
    private TagService tagService;

    @PutMapping
    public ResponseEntity<Void> saveComment(@RequestBody Tag tag){
        tagService.save(tag);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @ApiIgnore
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteCommentById(@PathVariable(name = "id") Long id){
        tagService.deleteById(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Tag>> queryCommentByBrandId(@RequestParam(name = "bid") Long bid){
        List<Tag> tags = tagService.queryTagsByBrandId(bid);

        if(CollectionUtils.isEmpty(tags)){
            return  new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(tags);
    }
}
