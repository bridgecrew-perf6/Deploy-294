const path = require("path"); //this is core node module. it is used handel file paths
const express = require("express"); //express is used to setup server
const hbs = require("hbs");
const geocode = require("./modules/geocodes");
const forecast = require("./modules/forecast");

console.log(path.join(__dirname, "../public"));
const app = express();
const port = process.env.PORT || 3000;

//defining paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
app.set("view engine", "hbs"); //setting hendlebars engine and views location

app.set("views", viewPath); //setting path for views
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath)); //setting path for static directory

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather App",
		name: "Prem",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About App",
		name: "Prem",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help",
		helpMsg: "Let get you help",
		name: "Prem",
	});
});

app.get("/help/data", (req, res) => {
	res.send("some data");
});

//it gets the url and returns response based on route which is called
/* app.get("", (req, res) => {
	//?this is for default route
	res.send("hello"); //sending response
});
 */

/* app.get("/help", (req, res) => {
	res.send("help");
});
 */

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "you must provide address",
		});
	}
	geocode(req.query.address, (error, { lati, longi, loca } = {}) => {
		if (error) {
			return res.send({
				error: "Adderss not found",
			});
		}

		forecast(lati, longi, (error, fdata) => {
			if (error) {
				return res.send({
					error: "Someting went wrong",
				});
			}

			console.log(loca);
			console.log(fdata);

			res.send({
				forecast: fdata,
				location: loca,
				address: req.query.address,
			});
		});
	});
});

app.get("/products", (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: "must provide search",
		});
	}
	console.log(req.query.search);
	res.send({ products: [req.query.search] });
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "Page not found",
		errorMsg: "Help article not found",
		name: "Prem",
	});
});

app.get("*", (req, res) => {
	//!this route needs be at last so it will match every route which was not matched above
	res.render("404", {
		title: "Page not found",
		errorMsg: "Page you are looking for is not available",
		name: "Prem",
	});
});
app.listen(port, () => {
	//!this sepecifies the port
	console.log("server is running on port 3000");
});
