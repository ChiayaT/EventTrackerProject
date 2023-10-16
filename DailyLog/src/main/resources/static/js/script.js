console.log('script.js loaded');

window.addEventListener('load', function(e) {
	console.log('Page loaded');
	setup();
});

function setup() {
	//Add event listeners for existing button
	  document.dayForm.lookup.addEventListener('click', function(event) {
    event.preventDefault();
    let dayId = document.dayForm.dayId.value;
    if (!isNaN(dayId) && dayId > 0) {
      getDay(dayId);
    }
  });
	createFormFunction();
	loadAllDays();
}

function loadAllDays() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/days');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let days = JSON.parse(xhr.responseText);
				displayAllDays(days);
			}
		}

	};
	//xhr
	xhr.send();
}

function displayAllDays(dayList) {
	//Dom
	//get div
	let div = document.getElementById("dayListDiv");
	div.textContent = '';
	//append child for each list item
	let table = document.createElement('table');
	table.setAttribute('border', "1")
	div.appendChild(table);

	let tr = document.createElement('tr');
	table.appendChild(tr);
	let tdId = document.createElement('th');
	tdId.textContent = 'ID';
	tr.appendChild(tdId);
	let tdTitle = document.createElement('th');
	tdTitle.textContent = 'TITLE';
	tr.appendChild(tdTitle);
	let tdDate = document.createElement('th');
	tdDate.textContent = 'DATE \n YYYY/MM/DD';
	tr.appendChild(tdDate);

	if (dayList && Array.isArray(dayList) && dayList.length > 0) {
		for (let day of dayList) {
			let tr = document.createElement('tr');
			table.appendChild(tr);
			let id = document.createElement('td');
			id.textContent = day.id;
			tr.appendChild(id);
			let title = document.createElement('td');
			title.textContent = day.title;
			tr.appendChild(title);
			let date = document.createElement('td');
			date.textContent = day.createDate;
			tr.appendChild(date);
		}
	}
	// make this a table

}

function createFormFunction() {
	document.createDay.createButton.addEventListener('click', function creatingForm(e) {
		e.preventDefault();
		newDayFormDiv = document.getElementById('newDayFormDiv')

		newDayFormDiv.textContent = '';
		var form = document.createElement('form');
		newDayFormDiv.appendChild(form);
		var label = document.createElement('label');
		label.textContent = 'Title: ';
		form.appendChild(label);
		var title = document.createElement('input');
		title.setAttribute('type', 'text');
		title.setAttribute('required', 'title');
		title.setAttribute('name', 'title');
		form.appendChild(title);
		form.appendChild(document.createElement('br'));

		var labelRating = document.createElement('label');
		labelRating.textContent = 'Rating: ';
		form.appendChild(labelRating);
		var rating = document.createElement('input');
		rating.setAttribute('type', 'number');
		rating.setAttribute('max', '5');
		rating.setAttribute('min', '1');
		rating.setAttribute('name', 'rating');
		form.appendChild(rating);
		form.appendChild(document.createElement('br'));

		var labelComment = document.createElement('label');
		labelComment.textContent = 'Comment: ';
		form.appendChild(labelComment);
		let comment = document.createElement('input');
		comment.setAttribute('type', 'text');
		comment.setAttribute('name', 'comment');
		form.appendChild(comment);
		form.appendChild(document.createElement('br'));
		document.createDay.createButton.removeEventListener('click', creatingForm);

		document.createDay.createButton.addEventListener('click', function creatingDay(e) {
			e.preventDefault();
			newDayFormDiv.textContent = '';
			var newDay = {};
			if (title.value != '') {
				newDay.title = title.value;
			};
			newDay.rating = rating.value;
			newDay.comment = comment.value;

			document.createDay.createButton.removeEventListener('click', creatingDay);
			addDay(newDay);
		});

	});
}

function addDay(newDay) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/days');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201) {
				let createdFilm = JSON.parse(xhr.responseText);
				displayDay(createdFilm);
			}
			else {
				displayError('Could not create day report: ' + xhr.status);
			}
		}
	}
	xhr.setRequestHeader('Content-type', 'application/json');
	let newDayJson = JSON.stringify(newDay);
	xhr.send(newDayJson);
}

function displayDay(day) {
	let editDiv = document.getElementById('editDayFormDiv');
	editDiv.textContent = '';
	let dataDiv = document.getElementById('dayDetailDiv');
	dataDiv.textContent = '';
	let h1 = document.createElement('h1');
	h1.textContent = day.title;
	dataDiv.appendChild(h1);
	let desc = document.createElement('blockquote');
	desc.textContent = day.comment;
	dataDiv.appendChild(desc);
	dataDiv.appendChild(document.createElement('br'));
	let rating = document.createElement('blockquote');
	rating.textContent = 'Rating: ' + day.rating;
	dataDiv.appendChild(rating);
	dataDiv.appendChild(document.createElement('br'));
	let created = document.createElement('blockquote');
	created.textContent = 'Created On: ' + day.createDate;
	dataDiv.appendChild(created);
	dataDiv.appendChild(document.createElement('br'));
	let updated = document.createElement('blockquote');
	updated.textContent = 'Updated On: ' + day.lastUpdate;
	dataDiv.appendChild(updated);
	loadAllDays();
	createFormFunction();
	displayUpdate(day);
	displayDeleteButton(day.id)
}

function displayError(message) {
	let editDiv = document.getElementById('editDayFormDiv');
	editDiv.textContent = '';
	let deleteDayDiv = document.getElementById('deleteDayDiv');
	deleteDayDiv.textContent = '';
	let dataDiv = document.getElementById('dayDetailDiv');
	dataDiv.textContent = '';
	let h2 = document.createElement('h2');
	h2.textContent = message;
	dataDiv.appendChild(h2);
	createFormFunction();
}
function displayDeleteButton(dayId) {
	let remove = document.createElement('button');
	remove.textContent = 'Delete Log';
	let deleteDayDiv = document.getElementById('deleteDayDiv');
	deleteDayDiv.textContent = '';
	deleteDayDiv.appendChild(remove);
	remove.addEventListener('click', function(e) {
		e.preventDefault();
		deleteLog(dayId);
	});
}


function deleteLog(dayId) {
	let dataDiv = document.getElementById('dayDetailDiv');
	dataDiv.textContent = '';
	let deleteDayDiv = document.getElementById('deleteDayDiv');
	deleteDayDiv.textContent = '';
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'api/days/' + dayId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 204) {
				loadAllDays();
				let dataDiv = document.getElementById('editDayFormDiv');
				dataDiv.textContent = '';
			}
			else {
				displayError('Could not delete day report: ' + xhr.status);
			}

		}

	};
	//xhr
	xhr.send();
}

function displayUpdate(day) {
	let dataDiv = document.getElementById('editDayFormDiv');
	dataDiv.textContent = '';
	let form = document.createElement('form');
	dataDiv.appendChild(form);
	let label = document.createElement('label');
	label.textContent = 'Title: ';
	form.appendChild(label);
	let title = document.createElement('input');
	title.setAttribute('type', 'text');
	title.setAttribute('required', 'title');
	title.setAttribute('name', 'title');
	form.appendChild(title);
	form.appendChild(document.createElement('br'));

	let labelRating = document.createElement('label');
	labelRating.textContent = 'Rating: ';
	form.appendChild(labelRating);
	let rating = document.createElement('input');
	rating.setAttribute('type', 'number');
	rating.setAttribute('max', '5');
	rating.setAttribute('min', '1');
	rating.setAttribute('name', 'rating');
	form.appendChild(rating);
	form.appendChild(document.createElement('br'));

	let labelComment = document.createElement('label');
	labelComment.textContent = 'Comment: ';
	form.appendChild(labelComment);
	let comment = document.createElement('input');
	comment.setAttribute('type', 'text');
	comment.setAttribute('name', 'comment');
	form.appendChild(comment);
	form.appendChild(document.createElement('br'));

	let update = document.createElement('button');
	update.textContent = 'Update Log';
	form.appendChild(update);
	if (title.value != '') {
		day.title = title.value;
	};
	day.rating = rating.value;
	day.comment = comment.value;
	update.addEventListener('click', function(e) {
		e.preventDefault();
		updateLog(day);
	});

}

function updateLog(day) {
	console.log(day)
	let xhr = new XMLHttpRequest();
	xhr.open('PUT', 'api/days/' + day.id);
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let updatedDay = JSON.parse(xhr.responseText)
				getDay(updatedDay.id);
			}
			else {
				displayError('Could not update day report: ' + xhr.status);
			}

		}

	};
	let newDayJson = JSON.stringify(day);
	xhr.send(newDayJson);
}

function getDay(dayId){
	let xhr = new XMLHttpRequest();
  xhr.open('GET', 'api/days/' + dayId);
  xhr.onreadystatechange = function() {
	  if (xhr.readyState === 4){
		  if (xhr.status === 200){
			  let dayJson = xhr.responseText;
			  let day = JSON.parse(dayJson);
			  displayDay(day);
		  }
		  else{
			  displayError('Film not Found.: 404');
				
		  }
	  }	
  }
  xhr.send();
}


