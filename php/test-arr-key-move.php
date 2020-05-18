<?php

    //Move a named array key to the end of an array

    function moveNamedHashKeyToEnd ($myArray, $keyname)
    {
        try {
            
            if (! array_key_exists($keyname, $myArray) ) {
                $no_key_str = sprintf("ERROR: Key `%s` NOT FOUND in Array", $keyname);
                throw new Exception($no_key_str);
            } 
            
            $keyVal     = $myArray[$keyname];
            $keyValStr  = sprintf('Value of incoming key is %s', $keyVal); 
            
            unset($myArray[$keyname]);
            
            $myArray[$keyname]  = $keyVal; 
             
        } catch (Exception $e) {
            
            echo $e->getMessage();
        }
        return is_array($myArray) ? $myArray : array();
    }

    $myArray = array(
        ''          => '',
        'First'     => '1st',
        'Second'    => '2nd',
        'Other'     => 'Other Opt.',
        'Third'     => '3rd',
        'Fourth'    => '4th',
    );
    
    //Which key should be pushed to the bottom?
    $keyname        = 'Other';
    $resultArray    = moveNamedHashKeyToEnd ($myArray, $keyname);
    
    echo "\n";
    
    print_r($resultArray);
