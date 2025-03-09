# String formatting: hackerrrank 
# https://www.hackerrank.com/challenges/python-string-formatting/problem?isFullScreen=true
''' present an integer, n in the following ways:
Decimal
Octal
Hexadecimal (capitalized)
Binary
  Sample input 17 means `n` STARTS AT 1, and ENDS WITH 17 (maximum, inclusive)
1     1     1     1
2     2     2    10
3     3     3    11
4     4     4   100
etc...
The four values must be printed on a single line in the order specified above for each  from  to . 
Each value should be space-padded to match the width of the binary value of 
 and the values should be separated by a single space.
'''
def custom_str_formatter(n: int, fmt: str) -> str:
    match fmt:
        case 'decimal':
            return "{0:d}".format(n)
        case 'octal':
            return "{0:o}".format(n)
        case 'hex':
            return "{0:X}".format(n)
        case 'binary':
            return "{0:b}".format(n)          

def print_formatted(number):
    nums = range(1, (number+1))
    num_formats = ['decimal','octal','hex','binary']
    my_padding  = len(custom_str_formatter(number, 'binary'))

    for num in nums:
        out_str = ''
        for format in num_formats:
            out_str += custom_str_formatter(num, format).rjust(my_padding) + ' '
        print(out_str.rstrip())

''' Expected output when input is 17
    1     1     1     1
    2     2     2    10
    3     3     3    11
    4     4     4   100
    5     5     5   101
    6     6     6   110
    7     7     7   111
    8    10     8  1000
    9    11     9  1001
   10    12     A  1010
   11    13     B  1011
   12    14     C  1100
   13    15     D  1101
   14    16     E  1110
   15    17     F  1111
   16    20    10 10000
   17    21    11 10001
'''
