package com.skilldistillery.dailylog.entities;

import java.time.LocalDate;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
public class Day {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String title;

	private String comment;
	
	@Column(name="create_date")
	@CreationTimestamp
	private LocalDate createDate;
	
	@Column(name="last_update")
	@UpdateTimestamp
	private LocalDate lastUpdate;
	
	private Integer Rating;
	
	public Day() {
		super();
	}

	
	
	public String getComment() {
		return comment;
	}



	public void setComment(String comment) {
		this.comment = comment;
	}



	public LocalDate getCreateDate() {
		return createDate;
	}



	public void setCreateDate(LocalDate createDate) {
		this.createDate = createDate;
	}



	public LocalDate getLastUpdate() {
		return lastUpdate;
	}



	public void setLastUpdate(LocalDate lastUpdate) {
		this.lastUpdate = lastUpdate;
	}



	public Integer getRating() {
		return Rating;
	}



	public void setRating(Integer rating) {
		Rating = rating;
	}



	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Day other = (Day) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Day [id=" + id + ", title=" + title + ", comment=" + comment + ", createDate=" + createDate
				+ ", lastUpdate=" + lastUpdate + ", Rating=" + Rating + "]";
	}
	
	
	
	
	
}
