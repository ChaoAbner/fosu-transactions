package com.fosu.campus.common.response;


import com.fosu.campus.common.enums.CampusHttpStatus;
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
public class PageResult<T>  extends Result{

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


    private static <T> PageResult<T> ok(List<T> data){
        return new PageResult<T>(CampusHttpStatus.SUCCESS.getCode(), CampusHttpStatus.SUCCESS.getMessage(), data);
    }
    private static <T> PageResult<T> ok(CampusHttpStatus status, List<T> data){
        return new PageResult<T>(status, data);
    }

    private PageResult(CampusHttpStatus status, List<T> items){
        super(status);
        this.items = items;
    }
    private PageResult(Integer code, String msg, List<T> items) {
        super(code, msg);
        this.items = items;
    }

    private PageResult(Integer code, String msg,Integer page, Integer num, List<T> items) {
        super(code, msg);
        this.page = page;
        this.num = num;
        this.items = items;
    }
}