package com.fosu.campus.service;

import com.fosu.campus.domain.model.Brand;
import com.fosu.campus.domain.model.User;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * @Author: MOSTRO
 */
public interface UserService  extends  BaseService<User>{

    /**
     * 通过用户id查找商品
     * @param uid
     * @param num
     * @param page
     * @return List<Brand>
     */
    List<Brand> queryUserPublishBrandByUid(String uid, Integer num, Integer page);

    /**
     * 通过用户ID找出用户收藏的商品
     * @param uid
     *
     * @return
     */
    List<Brand> queryUserCollectByUid(String uid, Integer num, Integer page);

    /**
     * 根据Uid查询用户信息
     * @Param uid
     * @return User
     */
    User queryUserByUid(String uid);
}
