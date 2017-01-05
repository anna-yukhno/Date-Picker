function DatePicker() {
	var self = this;
	var SIZE = 7;
	var weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
	var months = ['Январь', 'Февраль',
		'Март', 'Апрель', 'Май',
		'Июнь', 'Июль', 'Август',
		'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
	];
	//------calendar grid initialization-----------------------------------------------------
	var grid = (function() {
		var grid = [];
		for (var i = 0; i < SIZE; i++) {
			grid[i] = [];
			for (var j = 0; j < SIZE; j++) {
				var div = document.createElement('div');
				if (i === 0) {
					grid[i].push(weekDays[j]); //set week days
					document.getElementById('main').appendChild(div);
					div.textContent = weekDays[j];
					div.style.cssText = "background-color: #b5b3af; color: white;";
				} else {
					grid[i][j] = {};
					document.getElementById('main').appendChild(div);
				}
				div.className = "cell";
				div.setAttribute("id", '' + i + j);
			}
		}
		return grid;
	})();
	//---------fill the days of the selected month (default current month)--------------
	this.fillGrid = function(month) {
		onClickHandlers();
		var n = 0;
		clearGrid(grid); //clear before filling
		for (var i = 1; i < SIZE; i++) {
			for (var j = 0; j < SIZE; j++) {
				var day = new Date(2017, month, ++n);
				if (i === 1) {
					((day.getDay() - 1) < 0) ? j = SIZE - 1 : j = day.getDay() - 1; //start from correct week day
				}
				if (day.getDate() === 1 && i > 2) {
					i++;
					break; //finish when new month begins
				}
				grid[i][j].date = day;
				var cell = document.getElementById('' + i + j);
				cell.textContent = grid[i][j].date.getDate();

				if (day.getDay() === 0 || day.getDay() === SIZE - 1) { //highlight weekends
					cell.className += " weekend";
				}!isToday(grid[i][j]) ? cell.className += ' date' : cell.className += " today"; //highlight current day
			}
		}
		var m = grid[2][4].date.getMonth();
		document.getElementById('monthName').textContent = months[m]; //render the selected month
	};
	//----------return initial class, reset date---------------------------------------------
	var clearGrid = function(arr) {
		for (var i = 1; i < SIZE; i++) {
			for (var j = 0; j < SIZE; j++) {
				arr[i][j].date = null;
				document.getElementById('' + i + j).textContent = '';
				document.getElementById('' + i + j).className = 'cell';
			}
		}
	};
	//----------compare with the current date--------------------------------------------
	var isToday = function(obj) {
		if (!obj.date) {
			return false;
		}
		var today = new Date();
		return (((obj.date.getFullYear() === today.getFullYear()) &&
				(obj.date.getMonth() === today.getMonth())) &&
			(obj.date.getDate() === today.getDate()));
	};
	//----------render info-------------------------------------------------------------------

	var showInfo = function(x, y) {
		var options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			weekday: 'long',
			timezone: 'UTC'
		};
		document.getElementById('info').textContent = grid[x][y].date.toLocaleString('ru', options);
	};
	//----------set click handlers on arrows and dates-----------------------------------
	var onClickHandlers = function() {
		document.getElementById('back').onclick = function() {
			currentMonth--;
			self.fillGrid(currentMonth);
		};
		document.getElementById('forward').onclick = function() {
			currentMonth++;
			self.fillGrid(currentMonth);
		};
		for (var i = 1; i < SIZE; i++) {
			for (var j = 0; j < SIZE; j++) {
				var div = document.getElementById('' + i + j);
				div.onclick = function() {
					var coordinates = this.getAttribute('id').split('');
					console.log(grid[coordinates[0]][coordinates[1]].date.toDateString());
					showInfo(coordinates[0], coordinates[1]);
				};
			}
		}
	};

}
var currentMonth = new Date().getMonth();
var dp = new DatePicker();
dp.fillGrid(currentMonth);