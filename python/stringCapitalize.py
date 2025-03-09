import re
# https://www.hackerrank.com/challenges/capitalize/problem?isFullScreen=true
# Answer: I got help from ChatGPT
# Must not strip away spaces. A regex and lambda function swaps case as-needed.
def capitalize_words(s):
    return re.sub(r'(?<!\d)([a-zA-Z])([a-zA-Z]*)', lambda m: m.group(1).upper() + m.group(2).lower(), s)

# Example usage:
input_str = "hello2world test99case abc1def ghi"
output_str = capitalize_words(input_str)
# print(output_str)  # Output: "Hello2world Test99case Abc1def Ghi"

capitalize_words('hello   world  lol')
# (Expecting) Hello   World  Lol
