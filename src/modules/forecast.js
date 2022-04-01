const request = require("request");

const forecast = (lati, longi, callback) => {
	const url =
		"http://api.weatherstack.com/current?access_key=e05d7ae69bbf01985b267a938ed741a3&query=" +
		lati +
		"," +
		longi;
	request({ url: url, json: true }, (error, { body }) => {
		//console.log(response.body.current);
		if (error) {
			callback("conn't connect to api", undefined);
		} else if (body.error) {
			callback("error:" + body.error.info, undefined);
		} else {
			callback(
				undefined,
				`${body.current.weather_descriptions[0]} It is currently ${body.current.temperature} and it feels like ${body.current.feelslike}`
			);
		}
	});
};

module.exports = forecast;
