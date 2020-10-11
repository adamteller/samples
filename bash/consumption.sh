# How much disk space is being used by pwd ??
# This script is based on command below (thanks Jason Napsky)
# du -hs * | sort -rh | head -9
#
# ARG 1 is how many lines you want in output.
DISPLAYCOUNT="${1:-9}"

# Validate that DISPLAYCOUNT is an integer.  Accepted answer "borrowed" from
# https://stackoverflow.com/questions/806906/how-do-i-test-if-a-variable-is-a-number-in-bash

# Below asserts that "re" is 'NOT' a series of one ore more digits.
re='^[0-9]+$'
if ! [[ $DISPLAYCOUNT =~ $re ]] ; then
   echo "error: Not a number" >&2; exit 1
fi

# echo "Called from `pwd` and you want to see ${DISPLAYCOUNT} lines of output"
echo "----"
du -hs * | sort -rh | head -${DISPLAYCOUNT}
echo "----"
