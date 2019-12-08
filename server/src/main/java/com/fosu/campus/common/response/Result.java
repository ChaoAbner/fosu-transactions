package com.fosu.campus.common.response;

import com.fosu.campus.common.enums.CampusHttpStatus;
import com.fosu.campus.common.exception.CampusException;
import lombok.Data;

/**
 * @Author: 98050
 * @Time: 2018-11-24 21:41
 * @Feature: 返回结果
 */

@Data
public class Result {

    private int code;
    private String msg;



    /**
     *  成功时候的调用,只返回响应信息和响应码
     * */
    public static  Result success(CampusHttpStatus campusHttpStatus){
        return new Result(campusHttpStatus.getCode(),campusHttpStatus.getMessage());
    }

    public static Result ok(){
        return new Result(CampusHttpStatus.SUCCESS.getCode(), CampusHttpStatus.SUCCESS.getMessage());
    }

    /**
     *  失败时候的调用
     * */
    public static Result error(CampusHttpStatus campusHttpStatus){ throw new CampusException(campusHttpStatus); }

    protected Result(){

    }
    protected Result(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }


    protected Result(CampusHttpStatus campusHttpStatus) {
        if(campusHttpStatus != null) {
            this.code = campusHttpStatus.getCode();
            this.msg = campusHttpStatus.getMessage();
        }
    }
}