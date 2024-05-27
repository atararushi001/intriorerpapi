const fs = require("fs");
const Countries = require("../../models/Countriesmodel");
const States = require("../../models/statesModel");
const Cities = require("../../models/citiesModel");

const seedCountries = async () => {
	const countries = JSON.parse(
		fs.readFileSync("seeders/countryStateCity/formatted_countries.json", "utf-8")
	);
	await Countries.bulkCreate(countries);
};

const seedStates = async () => {
	const states = JSON.parse(
		fs.readFileSync("seeders/countryStateCity/formatted_states.json", "utf-8")
	);
	await States.bulkCreate(states);
};

const seedCities = async () => {
	const cities = JSON.parse(
		fs.readFileSync("seeders/countryStateCity/formatted_cities.json", "utf-8")
	);
	await Cities.bulkCreate(cities);
};

exports.seedCountriesStatesCities = async () => {
    console.log("Seeding data...");
	await Cities.sync({ force: true });
	await States.sync({ force: true });
	await Countries.sync({ force: true });

	await seedCountries();
	await seedStates();
	await seedCities();

	console.log("Data seeded successfully");
};
