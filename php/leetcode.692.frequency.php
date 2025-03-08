<?php
/** LEETCODE Problem

Given an array of strings words and an integer k, return the k most frequent strings.

Return the answer sorted by the frequency from highest to lowest. Sort the words with the same frequency by their lexicographical order.

Example 1:

Input: words = ["i","love","leetcode","i","love","coding"], k = 2
Output: ["i","love"]
Explanation: "i" and "love" are the two most frequent words.
Note that "i" comes before "love" due to a lower alphabetical order.
Example 2:

Input: words = ["the","day","is","sunny","the","the","the","sunny","is","is"], k = 4
Output: ["the","is","sunny","day"]
Explanation: "the", "is", "sunny" and "day" are the four most frequent words, with the number of occurrence being 4, 3, 2 and 1 respectively.
**/

class Solution {

    /**
     * @param String[] $words
     * @param Integer $k
     * @return String[]
     */
	function topKFrequent($words, $k) {
        $counts = [];
        // Orders the keys by length
        usort($words, function($a, $b) {
            return strlen($a) <=> strlen($b);
        });
        
        // Counts occurrences of each word
        foreach($words as $word) {
            $counts[$word] += 1;
        }
        
        // Does an alphabetical ordering sort first
        // uksort — Sort an array by keys using a user-defined comparison function
        // https://www.php.net/manual/en/function.uksort.php
        // Comparison function `strcasecmp` Binary safe case-insensitive string comparison
        // https://www.php.net/manual/en/function.strcasecmp.php
        uksort($counts, 'strcasecmp');

        // Then does a popularity sort by values descending
        arsort($counts);
        
        // print_r($counts);
        // Retain ONLY the first k elements
        $counts = array_slice($counts, 0, $k);
        return array_keys($counts);
    }
}