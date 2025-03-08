class Solution:
    def topKFrequent(self, words: List[str], k: int) -> List[str]:
        word_dict = {}

        for word in words:
            if word not in word_dict:
                word_dict[word.lower()] = words.count(word)

        # Sort the keys alphabetically
        word_dict = dict(sorted(word_dict.items()))

        # Sort now by descending numeric order of key values...       
        word_dict = dict(sorted(word_dict.items(), key=lambda x: x[1], reverse=True))
        # word_dict = dict(myList)

        return list(word_dict)[0:k]
        