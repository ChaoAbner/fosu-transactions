package com.fosu.campus.service.impl;

import com.fosu.campus.domain.model.Notify;
import com.fosu.campus.repository.NotifyRepository;
import com.fosu.campus.service.NotifyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @program: com.fosu.campus.service.impl
 * @description:
 * @author: Joker Ye
 * @create: 2019-10-04 23:44
 **/

@Service
public class NotifyServiceImpl implements NotifyService {

    @Autowired
    NotifyRepository notifyRepository;


    @Override
    public List<Notify> findAll() {
        return notifyRepository.findAll();
    }

    @Override
    public Notify queryById(Long id) {
        return null;
    }

    @Override
    public void deleteById(Long id) {

    }

    @Override
    public Notify update(Notify object) {
        return null;
    }

    @Override
    public Notify save(Notify object) {
        return null;
    }
}
