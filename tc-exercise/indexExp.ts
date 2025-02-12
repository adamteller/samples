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
    plan_rate_list: number[];
};
type ZipSourceRow = {
    zipcode: string;
    rate: number;
    state: string;
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
    const silverPlanRateLists = {};
    const zipWithInferredPropsObj = {};

    // parse the zips.csv into a result set
    parse(zipsFileContent, {
        delimiter: ',', from_line: 2,
        columns: zipsHeaders,
    }, (error, zipCsvResult: ZipCodeRow[]) => {
        if (error) {
            console.error(error);
        }

        for (const key in zipCsvResult) {
            const value = zipCsvResult[key];
            /**
             * Since zip code, state, and rate_area are important (and repeating parts) 
             * of zips.csv; Create a named composite key. Each looks similar to "36033-AL-13"
             * Reason: we really just need one unique zip based on rate_area and state
             */
            let composite_key = `${value.zipcode}-${value.state}-${value.rate_area}`;
            zipCsvFilteredObj[composite_key] = zipCsvResult[key];
        }
        // console.log("Collected", Object.keys(zipCsvFilteredObj).length, "entries from zips.csv");
        // console.log(zipCsvFilteredObj);
    });

    // parse the plans.csv into a result set
    parse(plansFileContent, {
        delimiter: ',', from_line: 2,
        columns: plansHeaders,
    }, (planError, planResult: PlanRow[]) => {
        if (planError) {
          console.error(planError);
        }
        
        for (const key in planResult) {
            const value = planResult[key];
            
            // composite key appears like AL-Silver-2
            let plan_composite_key = `${value.state}-${value.metal_level}-${value.rate_area}`;
            
            if (silverPlanRateLists.hasOwnProperty(plan_composite_key) == false) {
                silverPlanRateLists[plan_composite_key] = [];
                silverPlanRateLists[plan_composite_key].push(value.rate);
            } else {
                silverPlanRateLists[plan_composite_key].push(value.rate);
            }
            silverPlansObj[plan_composite_key] = planResult[key];
            silverPlansObj[plan_composite_key].plan_rate_list = silverPlanRateLists[plan_composite_key];
        }
    });
    
    // Output headers.
    console.log("zipcode,rate");
    
    // parse the project's submission file for a list of non-repeating zip codes.
    parse(zipsSourceFileContent, {
        delimiter: ',', from_line: 2,
        columns: zipsSourceHeaders,
    }, (error, result: ZipSourceRow[]) => {
        if (error) {
          console.error(error);
        }
    
        /** 
         * If the same zip code is featured in more than 1 rate_area,
         * then the second lowest rate is ambigious and answer should be blank.
         */
        let seen_zips: string[] = [];
        let slcByZip: string[] = [];
        function getOccurrence(array, value) {
            return array.filter((v) => (v === value)).length;
        }

        for (const key in result) {
            const value = result[key];
            zipWithInferredPropsObj[value.zipcode] = result[key];

            for (const key in zipCsvFilteredObj) {
                const zipCsvValue = zipCsvFilteredObj[key];
           
                let ratesList: number[] = [];

                if (zipCsvValue.zipcode === value.zipcode) {
                    seen_zips.push(zipCsvValue.zipcode);
                    let key_to_fetch = `${zipCsvValue.state}-Silver-${zipCsvValue.rate_area}`;
                    value.state = zipCsvValue.state;
                    
                    if (silverPlansObj.hasOwnProperty(key_to_fetch) == true) {
                        ratesList = silverPlansObj[key_to_fetch].plan_rate_list;
                    }

                    // If we have only one view of this zip code, process it if possible.
                    if (getOccurrence(seen_zips, zipCsvValue.zipcode) == 1) {
                        switch(ratesList.length) {
                            case 1:
                            case 0:
                                slcByZip[value.zipcode] = value.zipcode + ",";
                                break;    
                            default:
                                // Sort ratesList in ascending order
                                ratesList.sort((a, b) => a - b);
                                // Assign second lowest rate from 2nd element in ratesList.
                                value.rate = ratesList[1];
                                slcByZip[value.zipcode] = value.zipcode + "," + Number(value.rate).toFixed(2);
                                break;
                        }
                    } else {
                        slcByZip[value.zipcode] = value.zipcode + ",";
                    }
                }
            }
            console.log(slcByZip[value.zipcode]);
        }
    });
})();
