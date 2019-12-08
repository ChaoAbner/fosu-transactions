package com.fosu.campus.service;

import com.fosu.campus.domain.model.Brand;
import com.fosu.campus.domain.model.Collect;
import com.fosu.campus.domain.model.Feedback;
import com.fosu.campus.domain.vo.PageResult;

import java.util.List;

/**
 * @Author: MOSTRO
 */
public interface BrandService extends BaseService<Brand> {

    /**
     * 通过关键字搜索商品
     * @param search
     *
     * @return List<Brand>
     */
    PageResult<Brand> searchBrand(String search, Integer num, Integer page );


    /**
     * 查找价格为0的商品
     * @param num
     * @param page
     *
     * @return
     */
    PageResult<Brand> queryAllFreeBrand(Integer num, Integer page );


    /**
     * 查找热门商品
     * @param num
     *
     * @return
     */
    List<Brand> queryHotBrand(Integer num, Integer page);


    /**
     * 查询最近的商品
     * @param num
     * @param page
     *
     * @return
     */
    PageResult<Brand> queryLastestBrand(Integer num, Integer page );


    /**
     * 根据分类Id查找商品
     * @param cid
     * @param num
     * @param page
     *
     * @return
     */
    PageResult<Brand> queryBrandByCategoryId(Long cid, Integer num, Integer page );


    /**
     * 用户反馈
     * @param feedback
     */
    void feedback(Feedback feedback);

    /**
     *  查找所有
     * @param num
     * @param page
     * @return
     */
    PageResult<Brand> findAll(Integer num, Integer page);


    /**
    * @Description: 添加用户收藏
    * @Param: uid， brand_id
    * @Return:
    */
    Collect addCollectByUid(String uid, Long brand_id);

    /**
     * @Description: 删除用户收藏
     * @Param:  brand_id
     * @Return:
     */
    void deleteCollectByBrandId(String uid, Long brand_id);
}
