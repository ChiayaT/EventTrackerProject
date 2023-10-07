package com.skilldistillery.dailylog.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.dailylog.entities.Day;
import com.skilldistillery.dailylog.repositories.DayRepository;

@Service
public class DayServiceImpl implements DayService {

	@Autowired
	private DayRepository dayRepo;
	
	@Override
	public List<Day> getAllDays() {
		return dayRepo.findAll();
	}

	@Override
	public Day retrieveDay(int dayId) {
		return dayRepo.getById(dayId);
	}

	@Override
	public Day create(Day day) {
		dayRepo.save(day);
		return day;
	}

	@Override
	public Day update(int dayId, Day updatingDay) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean delete(int dayId) {
		// TODO Auto-generated method stub
		return false;
	}

}
