const fs = require("fs");
const Countries = require("../../models/countries.model");
const States = require("../../models/states.model");
const Cities = require("../../models/cities.model");

const seedCountries = async () => {
    const countries = JSON.parse(
        fs.readFileSync(
            "src/seeders/geographic_entity/countries.json",
            "utf-8",
        ),
    );
    await Countries.bulkCreate(countries);
};

const seedStates = async () => {
    const states = JSON.parse(
        fs.readFileSync(
            "src/seeders/geographic_entity/states.json",
            "utf-8",
        ),
    );
    await States.bulkCreate(states);
};

const seedCities = async () => {
    const cities = JSON.parse(
        fs.readFileSync(
            "src/seeders/geographic_entity/cities.json",
            "utf-8",
        ),
    );
    await Cities.bulkCreate(cities);
};

exports.seedGeographicEntities = async () => {
    console.log("Seeding data...");
    await Cities.sync({ force: true });
    await States.sync({ force: true });
    await Countries.sync({ force: true });

    await seedCountries();
    await seedStates();
    await seedCities();

    console.log("Data seeded successfully");
};
