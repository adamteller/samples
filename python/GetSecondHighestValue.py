''' Find the second highest value in a number list '''
def find_second_highest_and_count(numbers):
    unique_numbers = sorted(set(numbers))
    
    if len(unique_numbers) < 2:
        raise ValueError("List must contain at least two distinct values.")
    unique_numbers.pop(-1)
    second_highest = unique_numbers[-1]
    count = numbers.count(second_highest)
    return second_highest, count

if __name__ == '__main__':
    n = int(input())
    arr = map(int, input().split())
    nums = list(arr)
    second_highest, count = find_second_highest_and_count(nums)
    # print(f"The second-highest value is {second_highest}, which appears {count} times.")
    print(second_highest)