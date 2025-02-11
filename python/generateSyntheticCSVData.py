import pandas as pd
from faker import Faker
import sys

fake = Faker()

if len(sys.argv) != 2:
    how_many = 10
    print(f"We will generate the default number of records, which is {how_many}")
else:  
    how_many = int(sys.argv[1])


data = {
    "name": [fake.name() for _ in range(how_many)],
    "email": [fake.email() for _ in range(how_many)],
    "phone_number": [fake.basic_phone_number()
                     .replace('(', '')
                     .replace(')','')
                     .replace('-', '') 
                     for _ in range(how_many)],
}

df = pd.DataFrame(data)
new_file = f"synthData{how_many}.csv"
df.to_csv(f"/home/adam/dmi/{new_file}", index=False)

print(f"Synthetic data saved to {new_file}")
