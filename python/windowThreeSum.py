# This does a windowing or "running sum" of x elements at a time from a list.

source_list     = [1, 22, 3, 4, 15, 6, 30]
source_list_len = len(source_list)

# Dictionary to eventually hold the resultant sum and indexes that got summed.
sums_tally      = {}

# How many indexes do we want to sum in each window?
# Set a target amount, however it will still collect indexes that are
# less than the target quantity of indexes as it nears end of source
num_indexes_to_sum = 3

for index, _ in enumerate(source_list):
    # When index = 0, the_cap = 3. When index is 1, the_cap = 4
    the_cap = (index + num_indexes_to_sum) 
    # limit the sub list indexes otherwise they will artificially inflate
    if the_cap > source_list_len:
        the_cap = source_list_len
    # print(f"the cap= {the_cap}")

    sub_list_indexes = list(range(index, the_cap))   
    sub_list         = source_list[index:the_cap]
    sub_list_sum     = sum(sub_list)
    print(f"({index}) indexes used: {sub_list_indexes}; digits to sum:{sub_list} = {sub_list_sum}")
    
    # Stuff the dictionary with ordered keys based on index
    sums_tally.update({index: {"indexes": sub_list_indexes, "sum": sub_list_sum}})

# print(sums_tally)
max_index       = max(sums_tally, key=lambda k: sums_tally[k]["sum"])
max_sum_value   = sums_tally[max_index]["sum"]
# isolate the list of indexes that produce the greatest sum
max_sum_indexes = sums_tally[max_index]["indexes"]

print(f"Max sum: {max_sum_value} based on indexes {max_sum_indexes} @ index {max_index} of sums_tally dictionary")

''' Expected outcome based on list [1, 22, 3, 4, 15, 6, 30]
(0) indexes used: [0, 1, 2]; digits to sum:[1, 22, 3] = 26
(1) indexes used: [1, 2, 3]; digits to sum:[22, 3, 4] = 29
(2) indexes used: [2, 3, 4]; digits to sum:[3, 4, 15] = 22
(3) indexes used: [3, 4, 5]; digits to sum:[4, 15, 6] = 25
(4) indexes used: [4, 5, 6]; digits to sum:[15, 6, 30] = 51
(5) indexes used: [5, 6]; digits to sum:[6, 30] = 36
(6) indexes used: [6]; digits to sum:[30] = 30
Max sum: 51 based on indexes [4, 5, 6] @ index 4 of sums_tally dictionary
'''
