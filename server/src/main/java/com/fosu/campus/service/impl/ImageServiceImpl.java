package com.fosu.campus.service.impl;

import com.fosu.campus.domain.model.Image;
import com.fosu.campus.repository.ImageRepository;
import com.fosu.campus.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author: MOSTRO
 */
@Service
public class ImageServiceImpl implements ImageService {

    @Autowired
    private ImageRepository imageRepository;

    @Override
    public List<Image> findAll() {
        return imageRepository.findAll();
    }

    @Override
    public Image queryById(Long id) {
        return imageRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteById(Long id) {
        imageRepository.deleteById(id);
    }

    @Override
    public Image update(Image image) {
        return imageRepository.save(image);
    }

    @Override
    public Image save(Image image) {
        image.setId(null);
        return imageRepository.save(image);
    }
}
