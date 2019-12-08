package com.fosu.campus.common.annotation;

import java.lang.annotation.*;

/**
 * @Author: MOSTRO
 */
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Security {

    /**
     *
     * @Title: sign
     * @Description: 签名字段
     * @return String[]
     * @throws
     */
    String[] value() default {};



}
