package com.fosu.campus.domain.model;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * @Author: MOSTRO
 */
@Data
@Table(name = "brand")
@Entity
@Api(description = "商品Model")
public class Brand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "uid")
    private String uid;

    @Column(name = "category_id")
    private Long categoryId;

    private String title;

    private String description;

    private Long viewing;

    private Double price;


    @Column(name = "created_time")
    private Date createdTime;

    @Column(name = "last_update_time")
    private Date lastUpdateTime;

    @Transient
    private List<Comment> comments;

    @ApiModelProperty(hidden = true)
    @Transient
    private String  category;


    //@Transient
    //private List<String> tags;

    @ApiModelProperty(hidden = true)
    @Transient
    private User user;


    @Transient
    private List<String> image;
}
