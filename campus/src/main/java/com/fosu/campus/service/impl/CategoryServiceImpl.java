package com.fosu.campus.service.impl;

import com.fosu.campus.domain.model.Category;
import com.fosu.campus.repository.CategoryRepository;
import com.fosu.campus.service.BaseService;
import com.fosu.campus.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;

/**
 * @Author: MOSTRO
 */
@Service
public class CategoryServiceImpl  implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> findAll() {
         return categoryRepository.findAll();
    }

    @Override
    public Category queryById(Long id) {
        return null;
    }

    @Override
    public void deleteById(Long id) {

    }

    @Override
    public Category update(Category object) {
        return null;
    }

    @Override
    public Category save(Category category) {
        return categoryRepository.save(category);
    }


    @Override
    public Category queryCategoryById(Long id) {
        Optional<Category> category = categoryRepository.findById(id);

        return category.orElse(null);
    }

    @Override
    public Category updateCategory(Category category) {
        if (category.getName() == null){
            return null;
        }

        Category update = categoryRepository.save(category);
        return update;
    }

    @Override
    public Category saveCategory(Category category) {
        if (category.getName() == null){
            return null;
        }
        category.setId(null);
        Category save = categoryRepository.save(category);
        return save;
    }
}
