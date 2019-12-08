package com.fosu.campus.common.exception;

import com.fosu.campus.common.enums.CampusHttpStatus;
import lombok.Data;

/**
 * @author MOSTRO
 */
@Data
public class CampusException extends RuntimeException {

    private Integer code;

    private String message;

    public CampusException(CampusHttpStatus exception) {
        super(exception.toString());
        this.message = exception.getMessage();
        this.code = exception.getCode();
    }
}