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
		return dayRepo.searchById(dayId);
	}

	@Override
	public Day create(Day day) {
		dayRepo.saveAndFlush(day);
		return day;
	}

	@Override
	public Day update(int dayId, Day updatingDay) {
		Day origonal = dayRepo.searchById(dayId);
		origonal.setTitle(updatingDay.getTitle());
		origonal.setRating(updatingDay.getRating());
		origonal.setComment(updatingDay.getComment());
		dayRepo.saveAndFlush(origonal);
		return origonal;
	}

	@Override
	public void delete(int dayId) {
		dayRepo.deleteById(dayId);
	}

}
