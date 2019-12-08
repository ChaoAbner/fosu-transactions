package com.fosu.campus.service.impl;

import com.fosu.campus.domain.model.*;
import com.fosu.campus.domain.vo.PageResult;
import com.fosu.campus.repository.*;
import com.fosu.campus.service.BrandService;
import com.fosu.campus.service.ImageService;
import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.text.CollationElementIterator;
import java.util.*;

/**
 * @Author: MOSTRO
 */
@Service
public class BrandServiceImpl  implements BrandService {

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

//    @Autowired
//    private TagRepository tagRepository;
    @Autowired
    private CollectRepository collectRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private FeedbackRepository feedbackRepository;


    @Override
    public List<Brand> findAll() {
        return brandRepository.findAll();
    }

    @Override
    public Brand queryById(Long id) {
        return brandRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteById(Long id) {
        brandRepository.deleteById(id);
    }

    @Override
    public Brand update(Brand brand) {
        TimeZone tz = TimeZone.getTimeZone("ETC/GMT-8");
        TimeZone.setDefault(tz);
        brand.setLastUpdateTime(new Date());
        imageRepository.deleteImagesByBrandId(brand.getId());
        setImage(brand);
        return brandRepository.save(brand);
    }

    @Override
    public Brand save(Brand brand) {
        TimeZone tz = TimeZone.getTimeZone("ETC/GMT-8");
        TimeZone.setDefault(tz);
        brand.setLastUpdateTime(new Date());
        brand.setCreatedTime(new Date());
        brand.setViewing(0L);
        brand.setId(null);
        if(brand.getPrice()== null){
            brand.setPrice(0D);
        }

        Brand saveBrand = brandRepository.save(brand);

        setImage(saveBrand);
        return saveBrand;
    }

    @Override
    public PageResult<Brand> searchBrand(String query, Integer num, Integer page) {

        Page<Brand> brands = null;
        Sort sort =Sort.by(Sort.Direction.DESC,"lastUpdateTime");
        Pageable pageable = PageRequest.of((page < 1)? 1 : page-1, num<1? 1: num, sort);

        if (StringUtils.isEmpty(query)) {
            brands = brandRepository.findAll(pageable);
        }else {
            brands = brandRepository.findBrandsByTitleLike("%" + query + "%", pageable);
        }

        if(!CollectionUtils.isEmpty(brands.getContent())){
            setBrandAttributes(brands.getContent());
            return new PageResult<Brand>(brands.getTotalPages(), brands.getNumber(), brands.getContent());
        }
        return null;
    }

    @Override
    public PageResult<Brand> queryAllFreeBrand(Integer num, Integer page ) {

       Pageable pageable = PageRequest.of((page < 1)? 1 : page-1, num<1? 1: num);
       Page<Brand> brands = brandRepository.findBrandsByPrice(0D,pageable);
       setBrandAttributes(brands.getContent());
       return new PageResult<Brand>(brands.getTotalPages(), brands.getNumber(), brands.getContent());
    }

    @Override
    public List<Brand> queryHotBrand(Integer num, Integer page) {
        Sort sort =Sort.by(Sort.Direction.DESC,"viewing");
        Pageable pageable = PageRequest.of(page-1, num, sort);

        List<Brand> brands = brandRepository.findAll(pageable).getContent();

        if(!CollectionUtils.isEmpty(brands)){
            return setBrandAttributes(brands);
        }
        return null;
    }

    @Override
    public PageResult<Brand> queryLastestBrand(Integer num, Integer page ) {
        Sort sort =Sort.by(Sort.Direction.DESC,"lastUpdateTime");
        Pageable pageable = PageRequest.of((page < 1)? 1 : page-1, num<1? 1: num, sort);

        Page<Brand> brands = brandRepository.findAll(pageable);

        return responseBody(brands);
    }

    @Override
    public PageResult<Brand> queryBrandByCategoryId(Long cid, Integer num, Integer page ) {
        Sort sort =Sort.by(Sort.Direction.DESC,"lastUpdateTime");

        Pageable pageable = PageRequest.of((page < 1)? 1 : page-1, num<1? 1: num, sort);

        Page<Brand> brands = brandRepository.findBrandsByCategoryId(cid, pageable);

        return responseBody(brands);
    }

    @Override
    public void feedback(Feedback feedback) {
        feedback.setId(null);
        feedbackRepository.save(feedback);
    }

    @Override
    public PageResult<Brand> findAll(Integer num, Integer page) {
        Pageable pageable = PageRequest.of((page < 1)? 1 : page-1, num<1? 1: num);

        Page<Brand> brands = brandRepository.findAll(pageable);
        setBrandAttributes(brands.getContent());
        return new PageResult<>(brands.getTotalPages(), brands.getNumber(), brands.getContent());
    }

    @Override
    public Collect addCollectByUid(String uid, Long brand_id) {
        Collect collect = new Collect();
        collect.setBrandId(brand_id);
        collect.setUid(uid);
//        collect.setId(null);
        collect.setCreateTime(new Date());
        return collectRepository.save(collect);
    }

    @Override
    public void deleteCollectByBrandId(String uid, Long brand_id) {
        collectRepository.deleteCollect(uid, brand_id);
    }


    private PageResult<Brand> responseBody(Page<Brand> page){
        if(page != null){
            if(!CollectionUtils.isEmpty(page.getContent())){
                setBrandAttributes(page.getContent());
                return new PageResult<>(page.getTotalPages() ,page.getSize(), page.getContent());
            }
        }
        return null;
    }

    private void setImage(Brand brand){
        if (!CollectionUtils.isEmpty(brand.getImage())){
            brand.getImage().forEach(image->{
                Image image1 = new Image();
                image1.setBrandId(brand.getId());
                image1.setId(null);
                image1.setImage(image);
                Image save = imageRepository.save(image1);
            });
        }
    }


    private List<Brand> setBrandAttributes(List<Brand> brands){
        brands.forEach(brand->{
            Optional<Category> optional = categoryRepository.findById(brand.getCategoryId());
            if(optional.isPresent()){
                brand.setCategory(optional.get().getName());
            }else{
                brand.setCategory("其他");
            }
            brand.setUser(userRepository.findByUid(brand.getUid()));
            List<Comment> comments = commentRepository.findByBrandId(brand.getId());
            comments.forEach(comment -> {
                comment.setUser(userRepository.findByUid(comment.getUid()));
            });
            brand.setComments(comments);

            List<Image> images = imageRepository.findImagesByBrandId(brand.getId());
            List<String> imageList = new ArrayList<>();
            images.forEach(image -> {
                imageList.add(image.getImage());
            });
            brand.setImage(imageList);
        });

        return brands;
    }


}
