#!/usr/local/bin/perl

#print @ARGV ."\n"; #tells us how many arguments are passed
#print "number of arguments (minus one) = " .$#ARGV ."\n";
# this allows array iteration without going out of bounds

# iterate/print out each cli argument
# http://www.devdaily.com/blog/post/perl/read-command-line-arguments-with-perl/
foreach $argnum (0 .. $#ARGV) 
{
  print "$ARGV[$argnum]\n";
}
print " the script that ran this is from special variable \$0";
print "\n so what is the scripts name? \n";
print $0 ." that is all \n";

exit;