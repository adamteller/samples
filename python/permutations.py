'''
Inspired by the game "Word Cookies" as a hack.
- I wanted an easy way to show the possible words given a series of letters,
  allowing repeats only on letters that repeat. 
  For example, output for "even" (with length of 4) would repeat the e,
  and would print
['eenv', 'eevn', 'enev', 'enve', 'even', 'evne', 
'neev', 'neve', 'nvee', 'veen', 'vene', 'vnee']
  
- This does not check if the words are actual and real words.
- You only need to supply the source characters and the word length
'''

from itertools import permutations

letterz="even"
wordlen=4

# Get all permutations of wordlen x for letterz
pset=sorted(set(''.join(chars) for chars in permutations(letterz, wordlen)))

print(pset)
