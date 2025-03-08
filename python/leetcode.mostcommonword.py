class Solution:
    def mostCommonWord(self, paragraph: str, banned: List[str]) -> str:
        # normalize paragraph to all lowercase
        word_list = re.findall(r"[\w]+", paragraph.lower())
        word_dict = {}

        # Add word count to dict if it is not a "banned" word        
        for word in word_list:
            if word not in word_dict and word not in banned:
                word_dict[word] = word_list.count(word)
       
        # sorted here produces a list. So need to convert back to dict afterwards
        # SYNTAX: sorted(iterable, key, reverse)
        word_dict = {k: v for k, v in sorted(word_dict.items(), key=lambda item: item[1], reverse=True)}
        
        # since the list is sorted to have greatest value as first item, return first item
        return next(iter(word_dict))
        