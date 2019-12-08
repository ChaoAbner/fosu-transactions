package com.fosu.campus.service;

import java.util.List;

/**
 * @Author: MOSTRO
 */

public interface BaseService<T> {

    /**
     * 查找所有
     * @return
     */
    List<T> findAll();


    /**
     * 根据主键Id查找T
     * @param id
     */
    T queryById(Long id);

    /**
     * 根据主键删除数据段
     */
    void deleteById(Long id);


    /**
     * 更新数据
     */
    T update(T object);

    /**
     * 插入数据
     * @param object
     * @return  T
     */
    T save(T object);
}
