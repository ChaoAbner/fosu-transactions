package com.fosu.campus.controller;

import com.fosu.campus.domain.model.Notify;
import com.fosu.campus.service.NotifyService;
import com.fosu.campus.service.impl.NotifyServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @program: com.fosu.campus.controller
 * @description:
 * @author: Joker Ye
 * @create: 2019-10-04 23:41
 **/

@RestController
@RequestMapping(path = "notify")
public class NotifyController {

    @Autowired
    private NotifyService notifyService;

    @GetMapping("all")
    public List<Notify> getAll(){
        return notifyService.findAll();
    }
}
