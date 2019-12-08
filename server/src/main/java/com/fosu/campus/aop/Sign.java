package com.fosu.campus.aop;

import com.fosu.campus.common.exception.CampusException;
import com.fosu.campus.common.enums.CampusHttpStatus;
import com.fosu.campus.common.utils.Md5Util;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @Author: MOSTRO
 */
@Aspect
//@Component
public class Sign {


    @Pointcut("execution(public * com.fosu.campus.controller.*.*(..))")
    public void signAttest(){}

    @Before("signAttest()")
    public Boolean doSign(JoinPoint joinPoint) throws Throwable{

        //获取当前http请求
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        assert attributes != null;
        HttpServletRequest request = attributes.getRequest();
        String sign = request.getHeader("Sign");
        String timestamp = request.getHeader("timestamp");
        if(StringUtils.isEmpty(sign) && StringUtils.isEmpty(timestamp)){
            throw new CampusException(CampusHttpStatus.SIGN_NOT_FOUND);
        }
        String md5 = Md5Util.md5(timestamp + "&secret=@_@Fosuhub@_2019");
        if (!sign.equals(md5)) {
            throw new CampusException(CampusHttpStatus.SIGN_NOT_FOUND);
        }
        return true;
    }
}
