''' Grocery item list printer challenge from hackerrank
https://www.hackerrank.com/challenges/py-collections-ordereddict/problem?isFullScreen=true
it's an "ordered dict" problem to solve where you have to add number values to existing 
hashmap items
'''

import re
# Enter your code here. Read input from STDIN. Print output to STDOUT
n = int(input())

collected = {}
my_list = [re.split(r"(\d+)", input()) for b in range(n)]
     
for name, amt, _ in my_list:
    name = name.strip()
    if name not in collected:
        collected[name] = int(amt)
    else:
        collected[name] += int(amt)
        
for item, price in zip(collected.keys(), collected.values()):
    print(f"{item} {price}")