package com.skilldistillery.dailylog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.dailylog.entities.Day;

public interface DayRepository extends JpaRepository<Day, Integer> {

}
