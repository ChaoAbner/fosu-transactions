package com.fosu.campus.controller;

import com.fosu.campus.domain.model.Comment;
import com.fosu.campus.service.CommentService;
import com.fosu.campus.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @Author: MOSTRO
 */

@RestController
@RequestMapping("comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Comment> saveComment(@RequestBody Comment comment){
        Comment save = commentService.save(comment);
        save.setUser(userService.queryUserByUid(save.getUid()));
        return ResponseEntity.ok(save);
    }

   @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteCommentById(@PathVariable(name = "id") Long id){
        System.out.println(id);
        commentService.deleteCommentById(id);
        return new ResponseEntity<>(HttpStatus.OK);
   }

   @GetMapping
    public ResponseEntity<List<Comment>> queryCommentByBrandId(@RequestParam(name = "bid") Long bid){
       List<Comment> comments = commentService.queryCommentsByBrandId(bid);

       return ResponseEntity.ok(comments);
   }

   @PutMapping
   public ResponseEntity<Comment> updateComment(@RequestBody Comment comment){
       Comment save = commentService.save(comment);
       save.setUser(userService.queryUserByUid(save.getUid()));
       return ResponseEntity.ok(save);
   }

}
