package com.fosu.campus.domain.model;

import io.swagger.annotations.Api;
import lombok.Data;

import javax.persistence.*;

/**
 * @Author: MOSTRO
 */
@Entity
@Data
@Table(name = "brand_image")
@Api(description = "商品图片Model")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "brand_id")
    private Long brandId;

    private String image;
}
