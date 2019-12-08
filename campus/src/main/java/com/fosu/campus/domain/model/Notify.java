package com.fosu.campus.domain.model;

import lombok.Data;

import javax.persistence.*;

/**
 * @program: com.fosu.campus.domain.model
 * @description:
 * @author: Joker Ye
 * @create: 2019-10-04 23:28
 **/
@Entity(name = "notify")
@Data
public class Notify {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    @Column(name = "create_time")
    private String createTime;
}
