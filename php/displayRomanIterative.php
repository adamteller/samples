<?php
/**
 * Coding challenge: Convert integer to basic roman numeral representation.
 * It is based on the longhand "basic" meaning 9 shows as VIII as opposed to
 * the shorthand "IX" which is numerically equivalent.
 * Credit for a good solution: https://stackoverflow.com/a/15023547
 */
  function showRoman($num) 
  {
    $roman_map = [
      'M' => 1000, 'D' => 500, 'C' => 100, 
      'L' => 50, 'X' => 10, 'V' => 5, 'I' => 1
    ];
    
    $out_str = '';
    
    while($num > 0) {
      foreach($roman_map as $letter => $digit) {
        if ($num >= $digit) {
          $num -= $digit;
          $out_str .= $letter;
          break;
        }
      }
    }
    return $out_str;
  }

  /**
   * This segment assumes that you are invoking this from CLI using command
   *  `php <name of script> <digit>` and it does not validate the input. 
   * Non-numeric input leads to an error.
   */ 
  if (isset($argv[1])) {
    echo showRoman($argv[1]) .PHP_EOL;
  } else {
    echo "Need a number after file name.";
  }
  