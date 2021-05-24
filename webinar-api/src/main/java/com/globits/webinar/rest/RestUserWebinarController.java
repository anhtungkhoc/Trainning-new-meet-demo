package com.globits.webinar.rest;

import com.globits.webinar.dto.UserWebinarDto;
import com.globits.webinar.functiondto.SearchDto;
import com.globits.webinar.service.UserWebinarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user_webinar")
public class RestUserWebinarController {

  @Autowired
  UserWebinarService repos;


//	@RequestMapping(value = "/{pageIndex}/{pageSize}", method = RequestMethod.GET)
//	public ResponseEntity<Page<CategoryDto>> getPage(@PathVariable int pageIndex, @PathVariable int pageSize) {
//		Page<CategoryDto> results = productCategoryService.getPage(pageSize, pageIndex);
//		return new ResponseEntity<Page<CategoryDto>>(results, HttpStatus.OK);
//	}

  @RequestMapping(value = "/searchByDto", method = RequestMethod.POST)
  public ResponseEntity<Page<UserWebinarDto>> searchByDto(@RequestBody SearchDto dto) {
    Page<UserWebinarDto> result = repos.searchByDto(dto);
    return new ResponseEntity<Page<UserWebinarDto>>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @RequestMapping(method = RequestMethod.POST)
  public ResponseEntity<UserWebinarDto> save(@RequestBody UserWebinarDto dto) {
    UserWebinarDto result = repos.saveOrUpdate(null, dto);
    return new ResponseEntity<UserWebinarDto>(result, HttpStatus.OK);
  }


//	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
//	public ResponseEntity<CategoryDto> save(@RequestBody CategoryDto dto, @PathVariable UUID id) {
//		CategoryDto result = productCategoryService.saveOrUpdate(id, dto);
//		return new ResponseEntity<CategoryDto>(result, HttpStatus.OK);
//	}
//
//	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
//	public ResponseEntity<CategoryDto> getList(@PathVariable UUID id) {
//		CategoryDto result = productCategoryService.getCertificate(id);
//		return new ResponseEntity<CategoryDto>(result, HttpStatus.OK);
//	}
//
//	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
//	public ResponseEntity<Boolean> delete(@PathVariable UUID id) {
//		Boolean result = productCategoryService.deleteKho(id);
//		return new ResponseEntity<Boolean>(result, HttpStatus.OK);
//	}
//
//	@RequestMapping(value = "/searchByPage", method = RequestMethod.POST)
//	public ResponseEntity<Page<CategoryDto>> searchByPage(@RequestBody SearchDto searchDto) {
//		Page<CategoryDto> page = this.productCategoryService.searchByPage(searchDto);
//		return new ResponseEntity<Page<CategoryDto>>(page, HttpStatus.OK);
//	}
//
//	@RequestMapping(value = "/checkCode", method = RequestMethod.GET)
//	public ResponseEntity<Boolean> checkCode(@RequestParam(value = "id", required = false) UUID id,
//			@RequestParam("code") String code) {
//		Boolean result = productCategoryService.checkCode(id, code);
//		return new ResponseEntity<Boolean>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
//	}
//
//  @RequestMapping(method = RequestMethod.GET)
//  public ResponseEntity<List<CategoryDto>> findAll() {
//    List<CategoryDto> results = productCategoryService.getAllCategory();
//    return new ResponseEntity<List<CategoryDto>>(results, HttpStatus.OK);
//  }
//
}
