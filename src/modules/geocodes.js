const request = require("request");

const geocode = (address, callback) => {
	const url =
		"https://api.mapbox.com/geocoding/v5/mapbox.places/" +
		encodeURIComponent(address) +
		".json?limit=1&access_token=pk.eyJ1IjoicHJlbTQxMSIsImEiOiJja3l3eGZudm8wNHZqMnZtdndwa3l6Zzd2In0.1n8KG7wGVeJOApuWd5JTlA";

	request({ url: url, json: true }, (error, { body }) => {
		if (error) {
			callback("unable to connect", undefined);
		} else if (body.features.length === 0) {
			callback("No place found", undefined);
		} else {
			callback(undefined, {
				lati: body.features[0].center[1],
				longi: body.features[0].center[0],
				loca: body.features[0].place_name,
			});
		}
	});
};

module.exports = geocode;
