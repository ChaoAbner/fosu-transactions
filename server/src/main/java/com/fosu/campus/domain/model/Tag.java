package com.fosu.campus.domain.model;

import io.swagger.annotations.Api;
import lombok.Data;

import javax.persistence.*;

/**
 * @Author: MOSTRO
 */
@Data
@Table(name = "tag")
@Entity
@Api(description = "标签Model")
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long brandId;

    private String tag;
}
