package com.fosu.campus.service.impl;

import com.fosu.campus.domain.model.*;
import com.fosu.campus.repository.*;
import com.fosu.campus.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * @Author: MOSTRO
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private CollectRepository collectRepository;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User queryById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteById(Long id) {
         userRepository.deleteById(id);
    }

    @Override
    public User update(User user) {
        user.setCreatedTime(new Date());
        user.setLastLoginTime(new Date());
        return userRepository.save(user);
    }

    @Override
    public User save(User user) {
        user.setId(null);
        user.setLastLoginTime(new Date());
        user.setCreatedTime(new Date());
        return userRepository.save(user);
    }

//    @Override
//    public List<Brand> queryUserPublishBrandByUid(String uid) {
//        List<Brand> brands = brandRepository.findBrandsByUid(uid, pageable);
//        brands.forEach(brand -> {
//            Optional<Category> optional = categoryRepository.findById(brand.getCategoryId());
//            if(optional.isPresent()){
//                brand.setCategory(optional.get().getName());
//            }else{
//                brand.setCategory("其他");
//            }
//        });
//        return brands;
//    }

    @Override
    public List<Brand> queryUserPublishBrandByUid(String uid, Integer num, Integer page) {
        Sort sort =Sort.by(Sort.Direction.DESC,"lastUpdateTime");
        Pageable pageable = PageRequest.of((page < 1)? 1 : page-1, num<1? 1: num, sort);

        List<Brand> brands = brandRepository.findBrandsByUid(uid, pageable);
        brands.forEach(brand -> {
            Optional<Category> optional = categoryRepository.findById(brand.getCategoryId());

            brand = setBrandAttribute(brand);
            if(optional.isPresent()){
                brand.setCategory(optional.get().getName());
            }else{
                brand.setCategory("其他");
            }
        });
        return brands;
    }

    public Brand setBrandAttribute(Brand brand){
        List<Image> images = imageRepository.findImagesByBrandId(brand.getId());
        List<String> strImages = new ArrayList<>();

        for (Image image : images) {
            strImages.add(image.getImage());
        }
        brand.setUser(userRepository.findByUid(brand.getUid()));
        brand.setImage(strImages);
        List<Comment> comments = commentRepository.findByBrandId(brand.getId());
        comments.forEach(comment -> {
            comment.setUser(userRepository.findByUid(comment.getUid()));
        });
        brand.setComments(comments);
        return brand;
    }

    @Override
    public List<Brand> queryUserCollectByUid(String uid, Integer num, Integer page) {

        List<Long> brandIds = collectRepository.findBrandIdsByUid(uid, (page < 1)? 1 : page-1, num);
        List<Brand> lists = new ArrayList<>();

        brandIds.forEach(brandId-> {
            Optional<Brand> optional = brandRepository.findById(brandId);

            Brand brand = optional.get();
            brand = setBrandAttribute(brand);

            optional.ifPresent(lists::add);
        });
        return lists;
    }

    @Override
    public User queryUserByUid(String uid) {
        return userRepository.findByUid(uid);
    }
}
