var workersList = document.getElementById('workersList');
var holder = document.getElementById('holder');

var personnel = [
	{
		name: "John",
		surname: "Smith",
		achievements: [
			{
				number: 1,
				description: "First working day",
				pic: "pic1.png"
			},
			{
				number: 2,
				description: "Best coffee ever",
				pic: "pic2.png"
			},
			{
				number: 3,
				description: "Lucky boy"
			}
		]
	},
	{
		name: "Anna",
		surname: "Hopkins",
		achievements: [
			{
				number: 1,
				description: "First working day",
				pic: "pic1.png"
			},
			{
				number: 2,
				description: "Beautiful smile",
				pic: "pic3.png"
			},
			{
				number: 3,
				description: "Best coffee ever",
				pic: "pic2.png"
			},
			{
				number: 4,
				description: "Good job"
			},
			{
				number: 5
			}
		]
	},
	{
		name: "Harry",
		surname: "Tompson",
		achievements: [
			{
				number: 1,
				description: "First working day",
				pic: "pic1.png"
			},
			{
				number: 2,
				description: "Big deal",
				pic: "pic4.png"
			},
			{
				number: 3,
				description: "Sport champion",
				pic: "pic1.png"
			}
		]
	}
]

function Worker(name, surname, achievements) {
	this.name = name;
	this.surname = surname;
	this.achievements = achievements;
}

Worker.prototype.render = function() {
	var ctx = this;

	var page = document.createElement('div');

	var headline = document.createElement('div');
	headline.className = "headline";
	headline.textContent = ctx.name + " " + ctx.surname + "'s achievements";

	var arr = document.createElement('div');
	arr.className = 'arr';

	ctx.achievements.map(function(item, index) {

		var block = document.createElement('div');
		block.className = "item";

		var outerCircle = document.createElement('div');
		outerCircle.className = "outerCircle";

		var circle = document.createElement('label');
		circle.className = "circle";

		if(item.pic) {
			circle.style.backgroundImage = "url(pics/" + item.pic + ")";
		}

		circle.style.backgroundSize = "75%";
		circle.style.backgroundPosition = "center";
		circle.style.backgroundRepeat = "no-repeat";

		function acceptFile(e) {
			e.preventDefault();
			e.stopPropagation();
			var file = e.dataTransfer.files[0];
			var realImg = window.URL.createObjectURL(file);
			circle.style.backgroundImage = "url(" + realImg + ")";
		}

		circle.ondrop = acceptFile;

		circle.ondragover = function(e) {
			e.preventDefault();
			e.stopPropagation();
		}

		circle.ondragenter = function(e) {
			e.preventDefault();
			e.stopPropagation();
		}

		circle.onclick = function(e) {
			e.preventDefault();
			e.stopPropagation();
		}

		var outerSide = document.createElement('div');
		outerSide.className = "outerSide";

		var side = document.createElement('div');
		side.className = "side";
		side.textContent = item.number;

		outerSide.appendChild(side);
		outerCircle.appendChild(circle);
		outerCircle.appendChild(outerSide);

		var text = document.createElement('div');
		text.className = "text";

		item.description ? (text.textContent = item.description) : (text.textContent = "New achievement!");
		text.contentEditable = "true";


		block.appendChild(outerCircle);
		block.appendChild(text);

		arr.appendChild(block);
	})

	var btn = document.createElement('button');
	btn.className = "newAchBtn";
	btn.textContent = "+";

	btn.onclick = function(e) {
		if(ctx.achievements.length < 100) {
			ctx.newAch();
		}
		else {
			e.target.disabled = "true";
		}
	}

	page.appendChild(headline);
	page.appendChild(arr);
	page.appendChild(btn);

	return page;
}

Worker.prototype.createList = function() {
	var ctx = this;

	var worker = document.createElement('div');
	worker.className = "listItem";
	worker.textContent = ctx.name + " " + ctx.surname;

	worker.onclick = function() {
		holder.innerHTML = "";
		holder.appendChild(ctx.render());
	}

	return worker;
}

Worker.prototype.newAch = function() {
	var ctx = this;

	var ach = {
		number: ctx.achievements.length + 1
	}
	ctx.achievements.push(ach);

	holder.innerHTML = "";
	holder.appendChild(ctx.render());
}


var workersArr = [];

for(var i = 0; i < personnel.length; i++) {
	workersArr.push( new Worker( personnel[i].name, personnel[i].surname, personnel[i].achievements ) );
}

for(var i = 0; i < workersArr.length; i++) {
	workersList.appendChild(workersArr[i].createList());
}