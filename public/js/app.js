console.log("js file loaded");

const weatherform = document.querySelector("form");
const search = document.querySelector("input");
const msgOne = document.querySelector("#msgOne");
const msgTwo = document.querySelector("#msgTwo");
weatherform.addEventListener("submit", (e) => {
	e.preventDefault();
	const location = search.value;
	console.log(location);
	msgOne.textContent = "loading..";
	msgTwo.textContent = "";
	fetch("/weather?address=" + location).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				console.log(data.error);
				msgOne.textContent = data.error;
			} else {
				msgOne.textContent = data.location;
				msgTwo.textContent = data.forecast;
				console.log("location:" + data.location);
				console.log(data.forecast);
			}
		});
	});
});
