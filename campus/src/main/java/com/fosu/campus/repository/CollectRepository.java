package com.fosu.campus.repository;

import com.fosu.campus.domain.model.Brand;
import com.fosu.campus.domain.model.Collect;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @Author: MOSTRO
 */
public interface CollectRepository extends BaseRepository<Collect> {

    /**
     * 通过Uid查找商品Id
     * @param uid
     * @return
     */
    @Query(value = "select brand_id from collect where uid = ?1 limit ?2, ?3", nativeQuery = true)
    List<Long> findBrandIdsByUid(@Param("uid") String uid, @Param("page") Integer page, @Param("num") Integer num);

//    List<Long> findBrandIdsByUid( String uid, Pageable pageable);


    @Transactional
    @Modifying
    @Query(value = "delete from collect where uid = ?1 and brand_id = ?2", nativeQuery = true)
    void deleteCollect(@Param("uid") String uid, @Param("brand_id") Long brand_id);
}
