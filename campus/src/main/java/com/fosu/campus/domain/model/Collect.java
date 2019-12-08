package com.fosu.campus.domain.model;

import io.swagger.annotations.Api;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

/**
 * @Author: MOSTRO
 */
@Entity
@Data
@Table(name = "collect")
@Api(description = "收藏Model")
public class Collect {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String uid;

    private Long brandId;

    @Column(name = "create_time")
    private Date createTime;
}
