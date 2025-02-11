import pandas as pd
from faker import Faker
import sys
import re 

fake = Faker()

## The output here is a 'txt' file with spaces between values, and no headers.
if len(sys.argv) != 2:
    how_many = 10
    print(f"We will generate the default number of records, which is {how_many}")
else:  
    how_many = int(sys.argv[1])

new_file = str(f"/home/adam/dmi/synthData{how_many}.txt")

fake_data_list = []

# Using format to add padding where needed
# Using the fake name to drive the email address since they are not correlated by default.
# We have to constrain names so they don't use 20 characters
for i in range(how_many):
    my_name = f"{fake.first_name()} {fake.last_name()}"
    if len(my_name) > 19:
        my_name = my_name[0:18]
        
    my_email = re.sub(".*@", f"{my_name.replace(" ", ".").lower()}@", fake.email())
    my_phone_num = fake.basic_phone_number().replace('(', '').replace(')','').replace('-', '')
    
    fake_data_list.append(f"{"{:<20}".format(my_name)} {"{:<20}".format(my_email)} {"{:>20}".format(my_phone_num)}")


with open(new_file, 'w') as fp: 
    fp.write("\n".join(fake_data_list))

print(f"Synthetic data saved to {new_file}")
