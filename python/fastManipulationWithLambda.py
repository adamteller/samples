# Problem: The solution works, but it is too slow for large data sets of 'nums'
#
# What is being done in solution? all of value 0 gets moved to end of list
'''
In Humanistic terms, what is this lambda doing?
movetolast
   takes 2 parameters. A list and an element (l, e)
   iterates over the list with x for x in list, provided that x does not equal the element 
   in other words, it skips over that iteration when it is not the value given as second parameter
   Then it appends your named element as many times as the count of occurrences of it. 
'''
def solution(nums):
    '''
    for i in nums:
        if 0 in nums:
            nums.remove(0)
            nums.append(0)
    return nums
    '''
    movetolast = lambda l, e: [x for x in l if x != e] + [e] * l.count(e)
    # nums = movetolast(nums, 0)
    return movetolast(nums, 0)


another solution could be:
    result = filter(lambda x: x > 0, nums) +[0] * nums.count(0)
    return result 

    or (if we hard code everything)
    return [x for x in nums if x > 0] + [0] * nums.count(0)