package com.fosu.campus.repository;

import com.fosu.campus.domain.model.User;
/**
 * @Author: MOSTRO
 */
public interface UserRepository  extends BaseRepository<User> {

    /**
     * 根据Uid查询用户
    * @param uid
     * @return
     */
    User findByUid(String uid);
}
