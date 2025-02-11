from faker import Faker 

import sys

# Create a json file. Required record QTY provided as CLI arg. 
# Attribution: https://www.geeksforgeeks.org/python-faker-library/
import json      

if len(sys.argv) != 2:
    how_many = 10
    print(f"We will generate the default number of records, which is {how_many}")
else:  
    how_many = int(sys.argv[1])


fake = Faker() 

def input_data(x): 
    # dictionary 
    student_data = {}
    student_list = []
    for i in range(0, x):
        student_data[i] = {} 
        student_data[i]['name'] = fake.name() 
        student_data[i]['email'] = fake.email() 
        student_data[i]['phone_number'] = fake.basic_phone_number().replace('(', '').replace(')','').replace('-', '')
        
        student_list.append(student_data[i])
    
    
    file_to_write = str(f"/home/username/synthData{x}.json")
    print(f"Creating {file_to_write}")
    
    # dictionary dumped as json in a json file
    with open(file_to_write, 'w') as fp: 
        json.dump(student_list, fp) 
    

def main(): 
    # Enter number of students for the above task 
    input_data(how_many) 

main()
