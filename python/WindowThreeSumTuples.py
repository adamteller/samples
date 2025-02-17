''' 
Do a windowing or "running sum" of x elements at a time from a list. 
End result: list of tuples from each iteration index window and window sum
'''
source_list     = [1, 22, 3, 4, 15, 6, 17, 19, 12]
source_list_len = len(source_list)

# List to hold the resultant sum and the contributing indexes
sums_list       = []

# How many indexes do we want to sum in each window?
window_size = 3

for index, _ in enumerate(source_list):
    # When index = 0, the_cap = 3. When index is 1, the_cap = 4
    the_cap = (index + window_size) 
    
    # Since we are taking elements in 3s, stop looping when last group of 3 is grabbed.
    if the_cap > source_list_len:
      break

    sub_list_indexes  = tuple(range(index, the_cap))   
    sub_list          = source_list[index:the_cap]
    sub_list_windowsum = sum(sub_list)
    window_tuple      = (sub_list_windowsum, sub_list_indexes)
    sums_list.append(window_tuple)

''' Explanation of following code:
The max() function finds the tuple with the highest first value.
The key=lambda x: x[0] ensures that max() compares only the first element (the sum).
The result is the tuple with the highest sum.
'''
max_sum_tuple       = max(sums_list, key=lambda k: k[0])
print(f"Max sum: {max_sum_tuple[0]} from index window: {max_sum_tuple[1]}")
