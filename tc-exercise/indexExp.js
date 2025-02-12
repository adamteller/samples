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
    var silverPlanRateLists = {};
    var zipWithInferredPropsObj = {};
    // parse the zips.csv into a result set
    (0, csv_parse_1.parse)(zipsFileContent, {
        delimiter: ',', from_line: 2,
        columns: zipsHeaders
    }, function (error, zipCsvResult) {
        if (error) {
            console.error(error);
        }
        for (var key in zipCsvResult) {
            var value = zipCsvResult[key];
            /**
             * Since zip code, state, and rate_area are important (and repeating parts)
             * of zips.csv; Create a named composite key. Each looks similar to "36033-AL-13"
             * Reason: we really just need one unique zip based on rate_area and state
             */
            var composite_key = "".concat(value.zipcode, "-").concat(value.state, "-").concat(value.rate_area);
            zipCsvFilteredObj[composite_key] = zipCsvResult[key];
        }
        // console.log("Collected", Object.keys(zipCsvFilteredObj).length, "entries from zips.csv");
        // console.log(zipCsvFilteredObj);
    });
    // parse the plans.csv into a result set
    (0, csv_parse_1.parse)(plansFileContent, {
        delimiter: ',', from_line: 2,
        columns: plansHeaders
    }, function (planError, planResult) {
        if (planError) {
            console.error(planError);
        }
        for (var key in planResult) {
            var value = planResult[key];
            // composite key appears like AL-Silver-2
            var plan_composite_key = "".concat(value.state, "-").concat(value.metal_level, "-").concat(value.rate_area);
            if (silverPlanRateLists.hasOwnProperty(plan_composite_key) == false) {
                silverPlanRateLists[plan_composite_key] = [];
                silverPlanRateLists[plan_composite_key].push(value.rate);
            }
            else {
                silverPlanRateLists[plan_composite_key].push(value.rate);
            }
            silverPlansObj[plan_composite_key] = planResult[key];
            silverPlansObj[plan_composite_key].plan_rate_list = silverPlanRateLists[plan_composite_key];
        }
    });
    // Output headers.
    console.log("zipcode,rate");
    // parse the project's submission file for a list of non-repeating zip codes.
    (0, csv_parse_1.parse)(zipsSourceFileContent, {
        delimiter: ',', from_line: 2,
        columns: zipsSourceHeaders
    }, function (error, result) {
        if (error) {
            console.error(error);
        }
        /**
         * If the same zip code is featured in more than 1 rate_area,
         * then the second lowest rate is ambigious and answer should be blank.
         */
        var seen_zips = [];
        var slcByZip = [];
        function getOccurrence(array, value) {
            return array.filter(function (v) { return (v === value); }).length;
        }
        for (var key in result) {
            var value = result[key];
            zipWithInferredPropsObj[value.zipcode] = result[key];
            for (var key_1 in zipCsvFilteredObj) {
                var zipCsvValue = zipCsvFilteredObj[key_1];
                var ratesList = [];
                if (zipCsvValue.zipcode === value.zipcode) {
                    seen_zips.push(zipCsvValue.zipcode);
                    var key_to_fetch = "".concat(zipCsvValue.state, "-Silver-").concat(zipCsvValue.rate_area);
                    value.state = zipCsvValue.state;
                    if (silverPlansObj.hasOwnProperty(key_to_fetch) == true) {
                        ratesList = silverPlansObj[key_to_fetch].plan_rate_list;
                    }
                    // If we have only one view of this zip code, process it if possible.
                    if (getOccurrence(seen_zips, zipCsvValue.zipcode) == 1) {
                        switch (ratesList.length) {
                            case 1:
                            case 0:
                                slcByZip[value.zipcode] = value.zipcode + ",";
                                break;
                            default:
                                // Sort ratesList in ascending order
                                ratesList.sort(function (a, b) { return a - b; });
                                // Assign second lowest rate from 2nd element in ratesList.
                                value.rate = ratesList[1];
                                slcByZip[value.zipcode] = value.zipcode + "," + Number(value.rate).toFixed(2);
                                break;
                        }
                    }
                    else {
                        slcByZip[value.zipcode] = value.zipcode + ",";
                    }
                }
            }
            console.log(slcByZip[value.zipcode]);
        }
    });
})();
