package com.fosu.campus.service;

import com.fosu.campus.domain.model.Comment;

import java.util.List;

/**
 * @Author: MOSTRO
 */
public interface CommentService extends BaseService<Comment> {

    /**
     * 根据商品Id查找评论
     * @param bid
     * @return
     */
    List<Comment> queryCommentsByBrandId(Long bid);

    /**
     * 根据ID删除评论
     * @param id
     */
    void deleteCommentById(Long id);
}
