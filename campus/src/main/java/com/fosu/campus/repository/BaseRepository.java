package com.fosu.campus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.NoRepositoryBean;

/**
 * @Author: MOSTRO
 */
@NoRepositoryBean
public interface BaseRepository<DOMAIN> extends JpaRepository<DOMAIN, Long>, JpaSpecificationExecutor<DOMAIN> {

}
