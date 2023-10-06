package com.skilldistillery.dailylog.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.dailylog.entities.Day;
import com.skilldistillery.dailylog.services.DayService;

@RestController
@RequestMapping("api")
public class DayController {

	@Autowired
	private DayService dayService;
	
	@GetMapping("days")
	public List<Day> listDays(){
		return dayService.getAllDays();
	}
}
