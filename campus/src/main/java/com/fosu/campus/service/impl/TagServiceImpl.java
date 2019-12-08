package com.fosu.campus.service.impl;

import com.fosu.campus.domain.model.Tag;
import com.fosu.campus.repository.TagRepository;
import com.fosu.campus.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author: MOSTRO
 */
@Service
public class TagServiceImpl implements TagService {

    @Autowired
    private TagRepository tagRepository;

    @Override
    public List<Tag> queryTagsByBrandId(Long bid) {
        Tag tag = new Tag();
        tag.setBrandId(bid);
        Example<Tag> example = Example.of(tag);
        return tagRepository.findAll(example);
    }

    @Override
    public List<Tag> findAll() {
        return tagRepository.findAll();
    }

    @Override
    public Tag queryById(Long id) {
        return tagRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteById(Long id) {
        tagRepository.deleteById(id);
    }

    @Override
    public Tag update(Tag tag) {
        return tagRepository.save(tag);
    }

    @Override
    public Tag save(Tag tag) {
        tag.setId(null);
        return  tagRepository.save(tag);
    }
}
