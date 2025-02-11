class Solution:
    def __init__(self):
        self.seen_sums = []
    
    def isHappy(self, n: int) -> bool:
        # base case
        # print(f"Now evaluating {n}")
        if self.is_special_sum(n):
            return True 
        elif self.seen_sums.count(n) == 2:
            return False    
        else:
            # process this number and see what happens
            curated_list = self.create_list_from_integer(n)
            overall_sum = self.get_squared_sum(curated_list)
            # print(f"appending {overall_sum} to seen sums")
            self.seen_sums.append(overall_sum)
 
            # hit the recursive call now
            return self.isHappy(overall_sum)
        
    def is_special_sum(self, value) -> bool:
        special_sums = {1, 10, 100, 1000, 10000}  # Use a set for fast lookup
        return value in special_sums


    def create_list_from_integer(self, n: int) -> list:
        return [int(x) for x in str(n)]


    def get_squared_sum(self, nums: list) -> int:
        return sum(int(digit) ** 2 for number in nums for digit in str(number))
        