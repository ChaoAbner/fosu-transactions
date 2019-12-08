package com.fosu.campus.domain.model;

import io.swagger.annotations.Api;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

/**
 * @Author: MOSTRO
 */
@Data
@Table(name = "category")
@Entity
@EqualsAndHashCode
@Api(description = "分类Model")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

}
