package com.globits.webinar.rest;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.UUID;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.globits.webinar.dto.CategoryDto;
import com.globits.webinar.dto.WebinarCategoryDto;
import com.globits.webinar.functiondto.SearchDto;
import com.globits.webinar.service.WebinarCategoryService;

@RestController
@RequestMapping("/api/webinarCategory")
public class RestWebinarCategoryController {
	@Autowired
	private WebinarCategoryService service;

	@RequestMapping(value = "/searchByPage", method = RequestMethod.POST)
	public ResponseEntity<Page<WebinarCategoryDto>> searchByPage(@RequestBody SearchDto searchDto) {
		Page<WebinarCategoryDto> page = this.service.searchByPage(searchDto);
		return new ResponseEntity<Page<WebinarCategoryDto>>(page, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<WebinarCategoryDto> save(@RequestBody WebinarCategoryDto dto) {
		WebinarCategoryDto result = service.saveOrUpdate(dto, null);
		return new ResponseEntity<WebinarCategoryDto>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Boolean> delete(@PathVariable UUID id) {
		Boolean result = service.deleteById(id);
		return new ResponseEntity<Boolean>(result, HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<WebinarCategoryDto> update(@RequestBody WebinarCategoryDto dto, @PathVariable("id") UUID id) {
		WebinarCategoryDto result = service.saveOrUpdate(dto, id);
		return new ResponseEntity<WebinarCategoryDto>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<WebinarCategoryDto> getById(@PathVariable UUID id) {
		WebinarCategoryDto result = service.getById(id);
		return new ResponseEntity<WebinarCategoryDto>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}

	@RequestMapping(value = "generateSignature/{apiKey}/{apiSecret}/{meetingNumber}/{role}", method = RequestMethod.GET)
	public ResponseEntity<String> generateSignature(@PathVariable("apiKey") String apiKey,
			@PathVariable("apiSecret") String apiSecret, @PathVariable("meetingNumber") String meetingNumber,
			@PathVariable("role") Integer role) {
		try {
			Mac hasher = Mac.getInstance("HmacSHA256");
			String ts = Long.toString(System.currentTimeMillis() - 30000);
			String msg = String.format("%s%s%s%d", apiKey, meetingNumber, ts, role);

			hasher.init(new SecretKeySpec(apiSecret.getBytes(), "HmacSHA256"));

			String message = Base64.getEncoder().encodeToString(msg.getBytes());
			byte[] hash = hasher.doFinal(message.getBytes());

			String hashBase64Str = DatatypeConverter.printBase64Binary(hash);
			String tmpString = String.format("%s.%s.%s.%d.%s", apiKey, meetingNumber, ts, role, hashBase64Str);
			String encodedString = Base64.getEncoder().encodeToString(tmpString.getBytes());

			return new ResponseEntity<String>(encodedString.replaceAll("\\=+$", ""),
					(encodedString.replaceAll("\\=+$", "") != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);

		} catch (NoSuchAlgorithmException e) {
			return new ResponseEntity<String>("", HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (InvalidKeyException e) {
			return new ResponseEntity<String>("", HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
}
