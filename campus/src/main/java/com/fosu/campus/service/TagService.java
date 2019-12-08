package com.fosu.campus.service;

import com.fosu.campus.domain.model.Tag;

import java.util.List;

/**
 * @Author: MOSTRO
 */
public interface TagService extends BaseService<Tag> {

    /**
     * 根据商品Id查找评论
     * @param bid
     * @return
     */
    List<Tag> queryTagsByBrandId(Long bid);
}
