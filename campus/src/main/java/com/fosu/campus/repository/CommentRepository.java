package com.fosu.campus.repository;

import com.fosu.campus.domain.model.Comment;

import java.util.List;


/**
 * @Author: MOSTRO
 */
public interface CommentRepository extends BaseRepository<Comment> {

    List<Comment> findByBrandId(Long brandId);
}
