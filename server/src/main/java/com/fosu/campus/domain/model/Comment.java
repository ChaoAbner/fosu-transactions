package com.fosu.campus.domain.model;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

/**
 * @Author: MOSTRO
 */
@Data
@Table(name = "comment")
@Entity
@Api(description = "评论Model")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String uid;

    private Long brandId;

    private String content;

    private Date createdTime;

    @ApiModelProperty(hidden = true)
    @Transient
    private User user;

}
