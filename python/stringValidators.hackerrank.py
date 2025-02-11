'''
Validator from hackerrank
https://www.hackerrank.com/challenges/string-validators/problem?isFullScreen=true&utm_campaign=challenge-recommendation&utm_medium=email&utm_source=24-hour-campaign

Input Format: A single line containing a string .

Output Format:
In the first line, print True if  has any alphanumeric characters. Otherwise, print False.
In the second line, print True if  has any alphabetical characters. Otherwise, print False.
In the third line, print True if  has any digits. Otherwise, print False.
In the fourth line, print True if  has any lowercase characters. Otherwise, print False.
In the fifth line, print True if  has any uppercase characters. Otherwise, print False.
'''

if __name__ == '__main__':
    s = input()
    my_funcs = [str.isalnum, str.isalpha, str.isdigit, str.islower, str.isupper]

    ## FASTER version uses `any` [a generator] and DOES NOT store a list in memory
    for func in my_funcs:
        print(any(func(char) for char in s))

    ### Slower due an expensive list comprehension operation on larger strings (see below).
    ### A list object is stored in memory and then conditionally iterated to build and
    ##  evaluate a True or False outcome. Cannot "break" out of it (see below).
    for func in my_funcs:
        my_checker = [l for l in s if func(l)]
        if len(my_checker) > 0:
            print("True")
            continue
        else:
             print("False")

    ########### Further explanation follows:
    ''' 
    any() stops evaluating as soon as it finds the first True value, 
    which means it stops checking the string once an uppercase letter is found.

    Why Use any() Instead of List Comprehension?
    With list comprehension, you cannot "break" the loop—it evaluates the entire input, 
    making it less efficient for large strings.
    Using any() with a generator expression ensures short-circuiting and avoids unnecessary computations.
    '''
    