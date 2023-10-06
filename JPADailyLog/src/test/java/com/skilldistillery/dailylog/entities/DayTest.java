package com.skilldistillery.dailylog.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class DayTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Day day;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPADailyLog");

	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		day = em.find(Day.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		day = null;
	}

	@Test
	void test() {
		assertNotNull(day);
		assertEquals("Good Day", day.getTitle());

	}



}
