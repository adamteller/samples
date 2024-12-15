import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse";

type ZipCodeRow = {
    zipcode: string;
    state: string;
    county_code: string;
    name: string;
    rate_area: number;
};
type PlanRow = {
    plan_id: string;
    state: string;
    metal_level: string;
    rate: number;
    rate_area: number;
};
type ZipSourceRow = {
    zipcode: string;
    rate: number;
    state: string;
    inferred_rate_area: number;
};

(() => {
    const zipsSourceCsvFilePath = path.resolve(__dirname, 'slcsp/slcsp.csv');
    const zipsSourceHeaders = ['zipcode','rate'];
    const zipsSourceFileContent = fs.readFileSync(zipsSourceCsvFilePath, { encoding: 'utf-8' });
  
    const zipsCsvFilePath = path.resolve(__dirname, 'slcsp/zips.csv');
    const zipsHeaders = ['zipcode','state','county_code','name','rate_area'];
    const zipsFileContent = fs.readFileSync(zipsCsvFilePath, { encoding: 'utf-8' });

    const plansCsvFilepath = path.resolve(__dirname, 'slcsp/plans.csv');
    const plansHeaders = ['plan_id','state','metal_level','rate','rate_area'];
    const plansFileContent = fs.readFileSync(plansCsvFilepath, { encoding: 'utf-8' });

    const zipCsvFilteredObj = {};
    const silverPlansObj = {};
    const zipWithInferredPropsObj = {};

    // arbitrary reduction of just a subset of overall data:
    const targetZipCode = '67118';
    const targetRateArea = 6;

    let countedReps = 0;

    // parse the zips.csv into a result set
    parse(zipsFileContent, {
        delimiter: ',',
        columns: zipsHeaders,
    }, (error, zipCsvResult: ZipCodeRow[]) => {
        if (error) {
            console.error(error);
        }

        for (const key in zipCsvResult) {
            const value = zipCsvResult[key];
            
            if (value.zipcode === targetZipCode) {
                zipCsvFilteredObj[key] = zipCsvResult[key];
                countedReps += 1;
            }
        }
        console.log("Found", countedReps, "entries in zips.csv for zip code", targetZipCode);
    });

    // parse the plans.csv into a result set
    parse(plansFileContent, {
        delimiter: ',',
        columns: plansHeaders,
    }, (planError, planResult: PlanRow[]) => {
        if (planError) {
          console.error(planError);
        }

        for (const key in planResult) {
            const value = planResult[key];
            // Arbitrary reduction based on targeting a specific rate_area.
            if (value.metal_level == 'Silver' && value.rate_area == targetRateArea) {
                silverPlansObj[value.plan_id] = planResult[key];    
            }
        }
    });
    
    // parse the project's submission file for a list of non-repeating zip codes.
    parse(zipsSourceFileContent, {
        delimiter: ',', from_line: 2,
        columns: zipsSourceHeaders,
    }, (error, result: ZipSourceRow[]) => {
        if (error) {
          console.error(error);
        }
    
        for (const key in result) {
            const value = result[key];
            zipWithInferredPropsObj[value.zipcode] = result[key];

            for (const key in zipCsvFilteredObj) {
                const zipCsvValue = zipCsvFilteredObj[key];
                
                if (zipCsvValue.zipcode === value.zipcode) {
                    value.state = zipCsvValue.state;
                    value.inferred_rate_area = zipCsvValue.rate_area;
                    
                    let ratesList: number[] = [];
                    // Grab the ? number of plans...
                    for (const key in silverPlansObj) {
                        const silverPlanValue = silverPlansObj[key];

                        // Add rates to list when a match is found
                        if (silverPlanValue.rate_area === value.inferred_rate_area && silverPlanValue.state === value.state) {
                            ratesList.push(silverPlanValue.rate);
                        }
                    }
                    // Sort ratesList in ascending order
                    ratesList.sort((a, b) => a - b);
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
        console.log("They support the arbitrary logic implementation.")
    });
})();
