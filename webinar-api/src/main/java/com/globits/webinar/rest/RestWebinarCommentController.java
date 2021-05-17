package com.globits.webinar.rest;

import com.globits.webinar.dto.WebinarCommentDto;
import com.globits.webinar.functiondto.SearchDto;
import com.globits.webinar.service.WebinarCommentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.UUID;

@RestController
@RequestMapping("/api/webinarComment")
public class RestWebinarCommentController {

    @Autowired
    private WebinarCommentService service;

    @RequestMapping(value = "/searchByDto", method = RequestMethod.POST)
    public ResponseEntity<Page<WebinarCommentDto>> searchByDto(@RequestBody SearchDto dto) {
        Page<WebinarCommentDto> result = service.searchByDto(dto);
        return new ResponseEntity<Page<WebinarCommentDto>>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }
    
//    @RequestMapping(method = RequestMethod.GET)
//    public ResponseEntity<List<WebinarCommentDto>> getAll() {
//    	List<WebinarCommentDto> list = service.getAll();
//		return new ResponseEntity<List<WebinarCommentDto>>(list, HttpStatus.OK);
//    }
    
//    @RequestMapping(value = "/{pageIndex}/{pageSize}", method = RequestMethod.GET)
//    public ResponseEntity<Page<WebinarCommentDto>> getPage(@PathVariable("pageSize") int pageSize, @PathVariable("pageIndex") int pageIndex) {
//        Page<WebinarCommentDto> pages = service.getPage(pageIndex, pageSize);
//        return new ResponseEntity<Page<WebinarCommentDto>>(pages, HttpStatus.OK);
//    }

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<WebinarCommentDto> save(@RequestBody WebinarCommentDto dto) { 
		WebinarCommentDto result = service.saveOrUpdate(dto, null); 
		return new ResponseEntity<WebinarCommentDto>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Boolean> delete(@PathVariable UUID id) {
		Boolean result = service.deleteById(id);
		return new ResponseEntity<Boolean>(result, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<WebinarCommentDto> update(@RequestBody WebinarCommentDto dto, @PathVariable("id") UUID id) {
		WebinarCommentDto result = service.saveOrUpdate(dto, id);
		return new ResponseEntity<WebinarCommentDto>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public ResponseEntity<WebinarCommentDto> getById(@PathVariable UUID id) {
        WebinarCommentDto result = service.getById(id);
        return new ResponseEntity<WebinarCommentDto>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "generateSignature/{apiKey}/{apiSecret}/{meetingNumber}/{role}", method = RequestMethod.GET)
    public ResponseEntity<String> generateSignature(@PathVariable("apiKey") String apiKey,
                                                    @PathVariable("apiSecret") String apiSecret,
                                                    @PathVariable("meetingNumber") String meetingNumber,
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

            return new ResponseEntity<String>(encodedString.replaceAll("\\=+$", ""), (encodedString.replaceAll("\\=+$", "") != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);

        } catch (NoSuchAlgorithmException e) {
            return new ResponseEntity<String>("", HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (InvalidKeyException e) {
            return new ResponseEntity<String>("", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
