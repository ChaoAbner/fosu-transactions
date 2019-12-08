package com.fosu.campus.service;

import com.fosu.campus.domain.model.Category;

import java.util.List;

/**
 * @Author: MOSTRO
 */
public interface CategoryService extends BaseService<Category> {


    /**
     *  根据分类Id查询分类名
     * @param id
     * @return
     */
    Category queryCategoryById(Long id);

    /**
     *  通过分类Id更新
     * @param category
     * @return boolean
     */
    Category updateCategory(Category category);


    /**
     * 保存新建分类
     * @param category
     * @return
     */
    Category saveCategory(Category category);
}
