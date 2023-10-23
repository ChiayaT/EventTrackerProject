package com.skilldistillery.dailylog.controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.dailylog.entities.Day;
import com.skilldistillery.dailylog.services.DayService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost/"})
public class DayController {

	@Autowired
	private DayService dayService;
	
	@GetMapping("days")
	public List<Day> listDays(){
		return dayService.getAllDays();
	}
	
	@GetMapping("days/{id}")
	public Day show(@PathVariable int id, HttpServletResponse rep) {
	Day day = dayService.retrieveDay(id);
		if (day == null) {
			rep.setStatus(404);
		}
		return day;
	}
	
	@PostMapping("days")
	public Day create(@RequestBody Day day, HttpServletResponse rep) {
		Day created = null;
		try {
			created = dayService.create(day);
		} catch (Exception e) {
			rep.setStatus(400);
			e.printStackTrace();
		}
		if (created != null) {
			rep.setStatus(201);
		}
		return created;
	}
	
	@PutMapping("days/{id}")
	public Day update(@RequestBody Day day, @PathVariable int id, HttpServletResponse rep) {
		Day updated = null;
		Day checkday = dayService.retrieveDay(id);
		if (checkday == null) {
			rep.setStatus(404);
			return null;
		}
		try {
			updated = dayService.update(id, day);
		} catch (Exception e) {
			rep.setStatus(400);
			e.printStackTrace();
		}
		return updated;
	}
	
	@DeleteMapping("days/{id}")
	public void delete(@PathVariable int id, HttpServletResponse rep) {
		try {
			dayService.delete(id);
			rep.setStatus(204);
		} catch (Exception e) {
			rep.setStatus(404);
			e.printStackTrace();
		}
	}
	
}
