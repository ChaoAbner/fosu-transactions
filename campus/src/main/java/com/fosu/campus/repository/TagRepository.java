package com.fosu.campus.repository;

import com.fosu.campus.domain.model.Tag;

import java.util.List;


/**
 * @Author: MOSTRO
 */
public interface TagRepository extends BaseRepository<Tag> {

    List<Tag> findByBrandId(Long brandId);
}
