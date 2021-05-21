package com.globits.webinar.rest;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import com.globits.webinar.dto.WebinarDto;
import com.globits.webinar.service.WebinarService;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/public")
public class RestPublicController {

	@Autowired
	private Environment env;

	@Autowired
	private WebinarService service;

	@RequestMapping(path = "/getImage/{filename}/{type}", method = RequestMethod.GET)
	public void getImage(HttpServletResponse response, @PathVariable String filename, @PathVariable String type)
			throws IOException {

		String path = "";
		if (env.getProperty("webinar.file.folder") != null) {
			path = env.getProperty("webinar.file.folder");
		}
		File file = new File(path + filename + "." + type);
		if (file.exists()) {
			String contentType = "application/octet-stream";
			response.setContentType(contentType);
			OutputStream out = response.getOutputStream();
			FileInputStream in = new FileInputStream(file);
			// copy from in to out
			IOUtils.copy(in, out);
			out.close();
			in.close();
		} else {
			throw new FileNotFoundException();
		}
	}

	@RequestMapping(path = "/image/{filename:.+}", method = RequestMethod.GET)
	public void getImageByName(HttpServletResponse response, @PathVariable(value = "filename") String filename)
			throws IOException {
		String path = "";
		if (env.getProperty("webinar.file.folder") != null) {
			path = env.getProperty("webinar.file.folder");
		}
		File file = new File(path + filename);
		if (file.exists()) {
			String contentType = "application/octet-stream";
			response.setContentType(contentType);
			OutputStream out = response.getOutputStream();
			FileInputStream in = new FileInputStream(file);
			// copy from in to out
			IOUtils.copy(in, out);
			out.close();
			in.close();
		} else {
			throw new FileNotFoundException();
		}
	}

	@RequestMapping(path = "/upload/image", method = RequestMethod.POST)
	public void saveImage(@RequestParam("file") MultipartFile multipartFile, @RequestParam("id") UUID id) throws IOException {
		String path = "";
		if (env.getProperty("webinar.file.folder") != null) {
			path = env.getProperty("webinar.file.folder");
		}
		try (InputStream inputStream = multipartFile.getInputStream()) {
			String fileName = id.toString() + "_" + multipartFile.getOriginalFilename();
			WebinarDto result = service.getById(id);
			result.setImageUrl(fileName);
			service.saveOrUpdate(result, id);


			Path filePath = Paths.get(path).resolve(fileName);
			Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
		} catch (IOException ioe) {
			throw new IOException("Could not save image file: " + multipartFile.getOriginalFilename(), ioe);
		}
	}
}
