"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var csv_parse_1 = require("csv-parse");
(function () {
    var zipsSourceCsvFilePath = path.resolve(__dirname, 'slcsp/slcsp.csv');
    var zipsSourceHeaders = ['zipcode', 'rate'];
    var zipsSourceFileContent = fs.readFileSync(zipsSourceCsvFilePath, { encoding: 'utf-8' });
    var zipsCsvFilePath = path.resolve(__dirname, 'slcsp/zips.csv');
    var zipsHeaders = ['zipcode', 'state', 'county_code', 'name', 'rate_area'];
    var zipsFileContent = fs.readFileSync(zipsCsvFilePath, { encoding: 'utf-8' });
    var plansCsvFilepath = path.resolve(__dirname, 'slcsp/plans.csv');
    var plansHeaders = ['plan_id', 'state', 'metal_level', 'rate', 'rate_area'];
    var plansFileContent = fs.readFileSync(plansCsvFilepath, { encoding: 'utf-8' });
    var zipCsvFilteredObj = {};
    var silverPlansObj = {};
    var zipWithInferredPropsObj = {};
    // arbitrary reduction of just a subset of overall data:
    var targetZipCode = '67118';
    var targetRateArea = 6;
    var countedReps = 0;
    // parse the zips.csv into a result set
    (0, csv_parse_1.parse)(zipsFileContent, {
        delimiter: ',',
        columns: zipsHeaders
    }, function (error, zipCsvResult) {
        if (error) {
            console.error(error);
        }
        for (var key in zipCsvResult) {
            var value = zipCsvResult[key];
            if (value.zipcode === targetZipCode) {
                zipCsvFilteredObj[key] = zipCsvResult[key];
                countedReps += 1;
            }
        }
        console.log("Found", countedReps, "entries in zips.csv for zip code", targetZipCode);
    });
    // parse the plans.csv into a result set
    (0, csv_parse_1.parse)(plansFileContent, {
        delimiter: ',',
        columns: plansHeaders
    }, function (planError, planResult) {
        if (planError) {
            console.error(planError);
        }
        for (var key in planResult) {
            var value = planResult[key];
            // Arbitrary reduction based on targeting a specific rate_area.
            if (value.metal_level == 'Silver' && value.rate_area == targetRateArea) {
                silverPlansObj[value.plan_id] = planResult[key];
            }
        }
    });
    // parse the project's submission file for a list of non-repeating zip codes.
    (0, csv_parse_1.parse)(zipsSourceFileContent, {
        delimiter: ',', from_line: 2,
        columns: zipsSourceHeaders
    }, function (error, result) {
        if (error) {
            console.error(error);
        }
        for (var key in result) {
            var value = result[key];
            zipWithInferredPropsObj[value.zipcode] = result[key];
            for (var key_1 in zipCsvFilteredObj) {
                var zipCsvValue = zipCsvFilteredObj[key_1];
                if (zipCsvValue.zipcode === value.zipcode) {
                    value.state = zipCsvValue.state;
                    value.inferred_rate_area = zipCsvValue.rate_area;
                    var ratesList = [];
                    // Grab the ? number of plans...
                    for (var key_2 in silverPlansObj) {
                        var silverPlanValue = silverPlansObj[key_2];
                        // Add rates to list when a match is found
                        if (silverPlanValue.rate_area === value.inferred_rate_area && silverPlanValue.state === value.state) {
                            ratesList.push(silverPlanValue.rate);
                        }
                    }
                    // Sort ratesList in ascending order
                    ratesList.sort(function (a, b) { return a - b; });
                    // Assign second lowest rate from 2nd element in ratesList.
                    value.rate = ratesList[1];
                }
            }
        }
        // Present the info for the target zip code
        console.log("Resulting Data for arbitrary subset involving zip code", targetZipCode);
        console.log(zipWithInferredPropsObj[targetZipCode]);
        console.log("Full program would parse all the data");
        console.log(" and populate 2nd column of slcsp.csv");
        console.log(" with proper 2nd lowest Silver plan rate for each zip code.");
        console.log("Properties`state` and `inferred_rate_area` (above) are optional.");
        console.log("They support the arbitrary logic implementation.");
    });
})();
