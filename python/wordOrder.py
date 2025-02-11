''' Count the unique number of words extracted from input 
https://www.hackerrank.com/challenges/word-order/problem?isFullScreen=true
We encountered a list not being hashable error, so see the "word_key"
conditional which converts it to a string.
'''

# Enter your code here. Read input from STDIN. Print output to STDOUT
n = int(input())

words = [input().split() for b in range(n)]
word_dict = {}
for word in words:
    word_key = str(word) if isinstance(word, list) else word
    if word_key in word_dict:
        word_dict[word_key] += 1
    else:
        word_dict[word_key] = 1

out_str = ' '.join(str(x) for x in word_dict.values())
print(len(word_dict))
print(out_str)
