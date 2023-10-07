package com.skilldistillery.dailylog.services;

import java.util.List;

import com.skilldistillery.dailylog.entities.Day;

public interface DayService {
	
	List<Day> getAllDays();
	Day retrieveDay(int dayId);
	Day create(Day day);
	Day update(int dayId, Day updatingDay);
	void delete(int dayId);
	
}
