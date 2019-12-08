package com.fosu.campus.controller;

import com.fosu.campus.common.enums.CampusHttpStatus;
import com.fosu.campus.common.exception.CampusException;
import com.fosu.campus.domain.model.Brand;
import com.fosu.campus.domain.model.User;
import com.fosu.campus.service.UserService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @Author: MOSTRO
 */

@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserService userService;


    @ApiOperation(value = "获取所有用户信息")
    @GetMapping("getAll")
    public ResponseEntity<List<User>> findAll(){
        List<User> users = userService.findAll();
        if (CollectionUtils.isEmpty(users)) {
            throw new CampusException(CampusHttpStatus.USER_NOT_FOUND);
        }
        return ResponseEntity.ok(users);
    }


    @ApiOperation(value = "根据用户Id获取用户信息")
    @GetMapping("{id}")
    public ResponseEntity<User> queryUserById(@PathVariable(name = "id") Long id){
        User user = userService.queryById(id);
        if (user == null) {
            throw new CampusException(CampusHttpStatus.USER_NOT_FOUND);
        }
        return ResponseEntity.ok(user);
    }

    @PutMapping("update")
    public ResponseEntity<User> updateUser(@RequestBody User user){
        User save = userService.update(user);
        if (save == null) {
            throw new CampusException(CampusHttpStatus.USER_UPDATE_FAILED);
        }
        return ResponseEntity.ok(save);
    }

    @PostMapping("add")
    public ResponseEntity<User> saveUser(@RequestBody User user){
        User save = userService.save(user);
        if (save == null) {
            throw new CampusException(CampusHttpStatus.USER_CREATED_FAILED);
        }
        return ResponseEntity.ok(save);
    }


    @ApiOperation(value = "根据用户id查找用户信息")
    @GetMapping("get/info")
    public ResponseEntity<User> queryUserByUserId(@RequestParam("uid")String uid){
        User user = userService.queryUserByUid(uid);
        if (user == null) {
            throw new CampusException(CampusHttpStatus.USER_NOT_FOUND);
        }
        return ResponseEntity.ok(user);
    }

    @ApiOperation(value = "根据用户id查找用户发布过的商品")
    @GetMapping("get/publish")
    public ResponseEntity<List<Brand>> queryUserPublish(@RequestParam("uid")String uid,
                                                        @RequestParam("num")Integer num,
                                                        @RequestParam("page")Integer page){
        List<Brand> brands = userService.queryUserPublishBrandByUid(uid, num, page);
        if (CollectionUtils.isEmpty(brands)) {
            throw new CampusException(CampusHttpStatus.BRAND_NOT_FOUND);
        }
        return ResponseEntity.ok(brands);
    }

    @ApiOperation(value = "根据用户id查找用户收藏的商品")
    @GetMapping("get/collect")
    public ResponseEntity<List<Brand>> queryUserCollect(@RequestParam("uid")String uid,
                                                        @RequestParam("num")Integer num,
                                                        @RequestParam("page")Integer page){
        List<Brand> brands = userService.queryUserCollectByUid(uid, num, page);
        System.out.println(brands);
        if (CollectionUtils.isEmpty(brands)) {
            throw new CampusException(CampusHttpStatus.BRAND_NOT_FOUND);
        }
        return ResponseEntity.ok(brands);
    }
}
