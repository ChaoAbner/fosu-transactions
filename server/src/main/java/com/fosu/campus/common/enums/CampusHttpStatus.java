package com.fosu.campus.common.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

/**
 * @Author: 98050
 * @Time: 2018-11-05 16:09
 * @Feature:
 */
@AllArgsConstructor
@ToString
@Getter
public enum CampusHttpStatus {


    /**
     * Sign不存在
     */
    SIGN_NOT_FOUND(10001,"Sign不存在或Sign错误"),


    /**
     * 分类信息无法找到
     */
    CATEGORY_NOT_FOUND(20404,"分类不存在"),
    CATEGORY_UPDATE_FAILED(20406, "分类保存失败"),
    CATEGORY_SAVE_FAILED(20405, "分类保存失败"),
    /**
     * 成功码
     */
    SUCCESS(200, "success"),
    /**
     * 通用的错误码
     */
    SERVER_ERROR(50100, "服务端异常"),
     BIND_ERROR (50101, "参数校验异常：%s"),
     REQUEST_ILLEGAL (50102, "请求非法"),
     ACCESS_LIMIT_REACHED(50104, "访问太频繁！"),


    /**
     * 商品模块 405XX
     */
    BRAND_NOT_FOUND(40404, "没找到任何商品"),
    BRAND_CREATED_FAILED(40405, "商品创建失败"),
    BRAND_UPDATE_FAILED(40406, "商品更新失败"),
    BRAND_DELETE_FAILED(40407, "商品删除失败"),

    /**
     * 用户状态码
     */
    USER_NOT_FOUND(30404, "用户不存在"),
    USER_CREATED_FAILED(30405,"用户创建失败"),
    USER_UPDATE_FAILED(30406,"用户更新失败");


    private Integer code;

    private String message;

}