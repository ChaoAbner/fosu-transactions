package com.fosu.campus.repository;

import com.fosu.campus.domain.model.Brand;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * @Author: MOSTRO
 */
public interface BrandRepository extends BaseRepository<Brand> {


    /**
     * 根据search关键字在title中进行模糊查询
     * @param search
     * @return
     */

    Page<Brand> findBrandsByTitleLike(String search, Pageable pageable);


    /**
     * 根据分类Id查询商品列表
     * @param cid
     * @param pageable
     * @return Page<Brand>
     */
    Page<Brand> findBrandsByCategoryId(Long cid, Pageable pageable);

    /**
     * 根据用户ID查找商品列表
     * @param uid
     * @return
     */
    List<Brand> findBrandsByUid(String uid, Pageable pageable);


    /**
     *  根据价格寻找商品
     * @param price
     * @param pageable
     * @return
     */
    Page<Brand> findBrandsByPrice(Double price, Pageable pageable);

    /**
    * @Description: 根据商品id删除信息
    * @Param:
    * @Return:
    */

}
