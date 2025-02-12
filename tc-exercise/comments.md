## Pre-Requisite / Requirements:
- Make sure node and tsc are installed.  
- Use cd if terminal is not yet in project directory.
- Install program dependencies (from package.json) by invoking `npm install` from project directory.

Compile index.ts by invoking:  `tsc index.ts` at the prompt.

On clean compile, the prompt returns nothing and *index.js* is created.  
Then execute the program by invoking:  `node index.js` at the prompt.
Anything printed via `console.log('something');` goes to std out.


## What are we trying to accomplish in this neat exercise?
- Given several data sources (.csv files), populate the second column of file `slcsp.csv` and emit to std out. 
- The value of column 2 should be the second lowest silver cost plan (rate) for the zip code listed in column 1 of `slcsp.csv`.
- If an appropriate value cannot be derived from mining the data, a blank is expected.

## How will we go about deriving the necessary data?
- Using a value (or values) common to the diverse data sources, link the necessary data values.
- Common (linkable?) fields in files `plans.csv` & `zips.csv` are **rate_area** and **state**. 
- Get the "second lowest" value from the list of values for that given zip code.

## Explanation of current (and intentionally limited) solution approach:
- The original submission (for review) has an incomplete exercise.
- I chose to go with "A conceptual route" and implemented thought process below in `index.ts`:  
- Please click the link to see [follow-up-details](#follow-up-details) solution below.

### If we focus attention on a single zip code value in slcsp.csv ... 67118
### What can we infer/derive?  
We can see that this zip code appears 4 times in `zips.csv`  
   ```
   67118,KS,20077,Harper,6  
   67118,KS,20095,Kingman,6  
   67118,KS,20173,Sedgwick,6  
   67118,KS,20191,Sumner,6  

   The rate area for the above = 6 in `zips.csv`

   Let's check plans.csv where metal = Silver and State = KS and rate_area = 6 [ found 14 ]  

   24136DT6341333,KS,Silver,224.31,6
   73933HS6388428,KS,Silver,236.85,6
   22914KH3561750,KS,Silver,232.91,6
   83438MQ6743054,KS,Silver,236.24,6
   28193UU0623361,KS,Silver,227.52,6
   .... etc.


   So if we iterate over each zip code found in column 1 of slcsp.csv
     We will get to zip code 67118
       with this zip code, pull the STATE and the RATE_AREA (from zips.csv parsed data)

        We were able to find 14 plan items.  Rate List = 
        ['195.46', '212.35', '212.35', '218.83', '224.31', '227.52', '228',
        '232.91', '236.24', '236.85', '236.85', '237.4', '245.15', '251.06']
    The second lowest rate is 212.35
```
### What does this arbitrarily limited approach produce when run from a linux/unix terminal?
```
Found 4 entries in zips.csv for zip code 67118
Resulting Data for arbitrary subset involving zip code 67118
{
  zipcode: '67118',
  rate: '212.35',
  state: 'KS',
  inferred_rate_area: '6'
}
Full program would parse all the data
 and populate 2nd column of slcsp.csv
 with proper 2nd lowest Silver plan rate for each zip code.
Properties `state` and `inferred_rate_area` (above) are optional.
They support the arbitrary logic implementation.
```

## Follow-up Details
- The initial submission code file (`index.ts`) uses a "Proof of concept" approach given the request was to spend 3 hours solving.
- After I submitted the links for viewing, I was inspired by the challenge to "Really solving this exercise".
- To that end, I reviewed my code and found that the approach needed to be re-worked to meet requirements for presenting values.
- I wanted to "expand" on most of the "good parts" of the code, so I created a similar but separate file `indexExp.ts` which compiles to `indexExp.js`.
- The code in `indexExp.ts` uses a "dictionary" or "composite key lookup" strategy.

## Running the full solution:
- Compile `indexExp.ts` by invoking `tsc indexExp.ts`
- Run the program by invoking `node indexExp.js` to see the solution in std out.
- I found easy to compare results by redirecting output to a file using `node indexExp.js > checkfile.txt`.
- The file `checkfile.txt` is available here in the project folder.
