<?php
/**
 * Condense a multi-dimensional array (with one element per parent)
 * into a single-dimension array
 */
function convertMultiSingleArray($mdArray)
{
    $onedArray = array();

    foreach (array_keys($mdArray) as $key) {
        $onedArray[] = $mdArray[$key][0];
    }
    return $onedArray;  
}

$mdArray = array(
    '0' => array('0' => 'no'),
    '1' => array('0' => 'yes'),
    '2' => array('0' => 'yes'),
    '3' => array('0' => 'no'),
);

$mdArray = convertMultiSingleArray($mdArray);
print_r($mdArray);

