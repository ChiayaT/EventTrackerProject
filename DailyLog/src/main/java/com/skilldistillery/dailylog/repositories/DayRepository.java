package com.skilldistillery.dailylog.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.dailylog.entities.Day;

public interface DayRepository extends JpaRepository<Day, Integer> {

	Day searchById(int dayid);
	

	
	
}
