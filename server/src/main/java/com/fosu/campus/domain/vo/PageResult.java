package com.fosu.campus.domain.vo;


import com.fosu.campus.common.enums.CampusHttpStatus;
import com.fosu.campus.common.response.Result;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @Author: MOSTRO
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageResult<T> {

    /**
     * 当前页数
     */
    private Integer page;

    /**
     *  每页的条目
     */
    private Integer num;

    /**
     * 对象列表
     */
    private List<T> items;

}