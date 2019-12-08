package com.fosu.campus.repository;

import com.fosu.campus.domain.model.Image;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @Author: MOSTRO
 */
public interface ImageRepository extends BaseRepository<Image> {

    /**
     * 通过商品Id查找图片
     * @param bid
     * @return
     */

    List<Image> findImagesByBrandId(Long bid);

    /**
     * 添加商品图片
     * @param brandId
     * @param image
     */

    /**
     * 删除图片
     * @param brandId
     */
    void deleteImagesByBrandId(Long brandId);

}
