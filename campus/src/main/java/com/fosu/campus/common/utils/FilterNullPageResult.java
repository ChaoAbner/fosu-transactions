package com.fosu.campus.common.utils;

import com.fosu.campus.common.enums.CampusHttpStatus;
import com.fosu.campus.common.exception.CampusException;
import com.fosu.campus.domain.vo.PageResult;
import com.fosu.campus.domain.model.Brand;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;

/**
 * @program: com.fosu.campus.common.utils
 * @description:
 * @author: Joker Ye
 * @create: 2019-10-03 19:29
 **/
public class FilterNullPageResult {
    public static ResponseEntity<PageResult<?>> filterPageResult(PageResult<?> pageResult){
        if(pageResult != null){
            if(CollectionUtils.isEmpty(pageResult.getItems())){
                throw new CampusException(CampusHttpStatus.BRAND_NOT_FOUND);
            }
            return ResponseEntity.ok(pageResult);
        }
        return null;
    }

}
