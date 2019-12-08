package com.fosu.campus.advice;

import com.fosu.campus.common.exception.CampusException;
import org.springframework.stereotype.Component;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * @Author: MOSTRO
 */

@RestControllerAdvice
public class RestControllerExHandlerAdvice {


    /**
     * 应用到所有@RequestMapping注解方法，在其执行之前初始化数据绑定器
     * @param binder
     */
    @InitBinder
    public void initBinder(WebDataBinder binder) {}

    /**
     * 把值绑定到Model中，使全局@RequestMapping可以获取到该值
     * @param model
     */
    @ModelAttribute
    public void addAttributes(Model model) {
        model.addAttribute("author", "Magical Sam");
    }

    /**
     * 全局异常捕捉处理
     * @param ex
     * @return
     */
    @ResponseBody
    @ExceptionHandler(value = CampusException.class)
    public Map errorHandler(CampusException ex) {
        Map map = new HashMap(16);
        map.put("code", ex.getCode());
        map.put("msg", ex.getMessage());
        return map;
    }

}
