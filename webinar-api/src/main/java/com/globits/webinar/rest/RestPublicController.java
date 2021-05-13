package com.globits.webinar.rest;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public")
public class RestPublicController {

	@Autowired
	private Environment env;

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
}
