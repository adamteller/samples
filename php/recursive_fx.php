<?php
/**
 * This is a sample function as I was learning about recursion in PHP.
 * I added echo statements to watch program flow.
 * In an enterprise environment, I would have chosen logging to a file instead.
 */
function factorial($n) {
    if ($n === 1) {
        echo 'Base Condition is hit' .PHP_EOL;
        return 1;
    }
    echo sprintf('return %u * factorial(%u - 1) ', $n, $n) .PHP_EOL;
    
    return ($n * factorial($n - 1));
}
echo factorial(6) . PHP_EOL;
