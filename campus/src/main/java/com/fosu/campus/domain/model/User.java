package com.fosu.campus.domain.model;

import io.swagger.annotations.Api;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

/**
 * @Author: MOSTRO
 */
@Data
@Table(name = "user")
@Entity
@Api(description = "用户Model")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String avatar;

    private String location;

    private String phone;

    private String wechat;

    @Column(name = "contact_name")
    private String contactName;

    @Column(name = "uid")
    private String uid;

    private Boolean isAuth;

    private Date lastLoginTime;

    @Column(name = "created_time")
    private Date createdTime;
}
