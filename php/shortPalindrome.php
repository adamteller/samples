<?php 
/** Challenge: Count the number of shortest substring palindromes
 * Inspiration: https://leetcode.com/problems/palindromic-substrings/
 * when input is "aaa" expect 6 ["a", "a", "a", "aa", "aa", "aaa"]
 * when input is "abc" expect 3 ["a", "b", "c"]
 */ 

$my_string      = 'aaa';

$my_str_length  = strlen($my_string);
$palindrome_qty = 0;

for ($i = 0; $i < $my_str_length; $i++) {
    for ($j = 0; $j < $i + 1; $j++) {
        $test_string = substr($my_string, $j, ($my_str_length - $i));
        if ($test_string === strrev($test_string)) {
            ++$palindrome_qty;
        }
    }
}

echo sprintf('There are %u palindrome(s) from string `%s`', $palindrome_qty, $my_string);
echo PHP_EOL;
