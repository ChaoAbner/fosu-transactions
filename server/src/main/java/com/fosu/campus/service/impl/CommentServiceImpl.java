package com.fosu.campus.service.impl;

import com.fosu.campus.domain.model.Comment;
import com.fosu.campus.repository.CommentRepository;
import com.fosu.campus.repository.UserRepository;
import com.fosu.campus.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * @Author: MOSTRO
 */
@Service
public class CommentServiceImpl  implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Comment> queryCommentsByBrandId(Long bid) {
//        Comment comment = new Comment();
//        Example<Comment> example = Example.of(comment);
        List<Comment> comments = commentRepository.findByBrandId(bid);

        comments.forEach(comment -> {
            comment.setUser(userRepository.findByUid(comment.getUid()));

        });

//        return commentRepository.findAll(example);
        return comments;
    }

    @Override
    public void deleteCommentById(Long id) {
        commentRepository.deleteById(id);
    }

    @Override
    public List<Comment> findAll() {
        return commentRepository.findAll();
    }

    @Override
    public Comment queryById(Long id) {
        return commentRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteById(Long id) {
        commentRepository.deleteById(id);
    }

    @Override
    public Comment update(Comment comment) {
        return commentRepository.save(comment);
    }

    @Override
    public Comment save(Comment comment) {
        comment.setId(null);
        comment.setCreatedTime(new Date());
        return commentRepository.save(comment);
    }
}
