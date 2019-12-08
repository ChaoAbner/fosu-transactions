package com.fosu.campus.controller;

import com.fosu.campus.common.enums.CampusHttpStatus;
import com.fosu.campus.common.exception.CampusException;
import com.fosu.campus.common.utils.FilterNullPageResult;
import com.fosu.campus.domain.model.Brand;
import com.fosu.campus.domain.model.Collect;
import com.fosu.campus.domain.model.Feedback;
import com.fosu.campus.domain.vo.PageResult;
import com.fosu.campus.service.BrandService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @Author: MOSTRO
 */

@RequestMapping(path = "content")
@RestController
@Api(value = "Brand", tags = {"Brand"}, description = "与商品相关的控制器")
public class BrandController{

    @Autowired
    private BrandService brandService;


    @ApiOperation(value = "获取所有的商品")
    @GetMapping("findAll")
    public ResponseEntity<PageResult<?>> findAllBrand(@RequestParam("num") Integer num,
                                                      @RequestParam("page") Integer page){
        PageResult<Brand> all = brandService.findAll(num, page);

        return FilterNullPageResult.filterPageResult(all);
    }

    @ApiOperation(value = "传回一个商品模型附带商品ID更新商品")
    @PostMapping
    public ResponseEntity<Brand> updateBrand(@RequestBody Brand brand){
        Brand update = brandService.update(brand);
        if(update == null){
            throw new CampusException(CampusHttpStatus.BRAND_UPDATE_FAILED);
        }
        return ResponseEntity.ok(update);
    }


    @ApiOperation(value = "保存一个商品")
    @PutMapping
    public ResponseEntity<Brand> saveBrand(@RequestBody Brand brand){
        Brand save = brandService.save(brand);
        if(save == null){
            throw new CampusException(CampusHttpStatus.BRAND_UPDATE_FAILED);
        }
        return ResponseEntity.ok(save);
    }


    @ApiOperation(value = "通过商品Id查找商品(遵循Rest风格)")
    @GetMapping("{id}")
    public ResponseEntity<Brand> getById(@PathVariable("id") Long id){
        Brand brand = brandService.queryById(id);
        if(brand == null){
            throw new CampusException(CampusHttpStatus.BRAND_NOT_FOUND);
        }
        return ResponseEntity.ok(brand);
    }

    @ApiOperation(value = "查找title中含有关键字的商品（key为空时返回所有商品）")
    @GetMapping("search")
    public ResponseEntity<PageResult<?>> searchBrand(@RequestParam("query") String search,
                                                     @RequestParam("num") Integer num,
                                                     @RequestParam("page") Integer page){
        PageResult<Brand> brands = brandService.searchBrand(search, num , page);

//        if(CollectionUtils.isEmpty(brands.)){
//            throw new CampusException(CampusHttpStatus.BRAND_NOT_FOUND);
//        }
//        return ResponseEntity.ok(brands);
        return FilterNullPageResult.filterPageResult(brands);

    }

    @ApiOperation(value = "查找价格为0的商品")
    @GetMapping("free")
    public ResponseEntity<PageResult<?>> queryFreeBrand(@RequestParam("num") Integer num,
                                                            @RequestParam("page") Integer page){
        PageResult<Brand> brandPageResult = brandService.queryAllFreeBrand(num, page);

        return FilterNullPageResult.filterPageResult(brandPageResult);

    }


    @GetMapping("notify")
    public ResponseEntity<Void> notifyBrand(){
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "根据浏览度降序查找商品")
    @GetMapping("hot")
    public ResponseEntity<List<Brand>> queryHotBrand(@RequestParam("num")Integer num, @RequestParam("page") Integer page){
        List<Brand> brands = brandService.queryHotBrand(num,page);
        if(CollectionUtils.isEmpty(brands)){
            throw new CampusException(CampusHttpStatus.BRAND_NOT_FOUND);
        }
        return ResponseEntity.ok(brands);
    }

    @ApiOperation(value = "根据日期降序查找商品")
    @GetMapping("lastest")
    public ResponseEntity<PageResult<?>> queryLastestBrand(@RequestParam("num")Integer num,
                                                           @RequestParam("page")Integer page
                                                                ){
        PageResult<Brand> pageResult = brandService.queryLastestBrand(num, page);
        return FilterNullPageResult.filterPageResult(pageResult);
    }

    @ApiOperation(value = "根据分类id查找商品")
    @GetMapping("category/detail")
    public ResponseEntity<PageResult<?>> queryBrandByCategoryId(@RequestParam("category_id")Long cid,
                                                                    @RequestParam("num") Integer num,
                                                                    @RequestParam("page") Integer page
                                                                   ){
        PageResult<Brand> pageResult = brandService.queryBrandByCategoryId(cid, num, page);
        return FilterNullPageResult.filterPageResult(pageResult);
    }



    @ApiOperation(value = "保存收费商品")
    @PostMapping("add/charge")
    public ResponseEntity<Brand> saveChargeBrand(@RequestBody Brand brand){
        Brand save = brandService.save(brand);
        if(save == null){
            throw new CampusException(CampusHttpStatus.BRAND_CREATED_FAILED);
        }
        return ResponseEntity.ok(save);

    }


    @ApiOperation(value = "保存免费商品")
    @GetMapping("add/free")
    public ResponseEntity<Brand> saveFreeBrand(@RequestBody Brand brand){
        Brand save = brandService.save(brand);
        if(save == null){
            throw new CampusException(CampusHttpStatus.BRAND_CREATED_FAILED);
        }
        return ResponseEntity.ok(save);
    }

    @PostMapping("feedback/add")
    public ResponseEntity<Void> feedback(@RequestBody Feedback feedback){
        brandService.feedback(feedback);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @ApiOperation(value = "根据商品id删除商品信息")
    @DeleteMapping("delete")
    public ResponseEntity<Void> delete(@RequestParam Long brand_id){
        System.out.println(brand_id);
        brandService.deleteById(brand_id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("collect")
    @ApiOperation(value = "添加用户收藏")
    public ResponseEntity<Collect> addCollectByUid(@RequestParam String uid, @RequestParam Long brand_id){
        Collect addBrand = brandService.addCollectByUid(uid, brand_id);
        if (addBrand == null) {
            throw new CampusException(CampusHttpStatus.BRAND_CREATED_FAILED);
        }
        return ResponseEntity.ok(addBrand);
    }

    @DeleteMapping("collect")
    @ApiOperation(value= "删除用户收藏")
    public ResponseEntity<Collect> deleteCollectByBrandId(@RequestParam String uid, @RequestParam Long brand_id){
        brandService.deleteCollectByBrandId(uid, brand_id);

        return new ResponseEntity<>(HttpStatus.OK);
    }


}
