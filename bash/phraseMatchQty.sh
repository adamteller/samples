# How many times can we find a given phrase in a text file?
# grep -o "from O'Net" interests_10_09_2020.json | wc -l
# ARG 1, will be a string and SHOULD REALLY BE DOUBLE-QUOTED.
# ARG 2, will be a file path (relative?) and should exist.

USAGE="Usage: ${0} PHRASE INFILE (both params required)"

EXPECTEDARGSQTY=2
if [[ $# -ne $EXPECTEDARGSQTY ]]; then
    echo "Illegal number of parameters, "
    echo " $# sent, ${EXPECTEDARGSQTY} were expected."
    echo "${USAGE}"
    exit 2
fi

## Got required arg qty. Now, does the file exist?
PHRASE=$1
FROMFILE=$2

if [ ! -f "${FROMFILE}" ]; then
    echo "${FROMFILE} - error. File not found!"
    exit 2
fi

# echo "Called from `pwd` and you want to see ${DISPLAYCOUNT} lines of output"
# The ouptut, has spaces. Get rid of them. Thanks to:
# https://stackoverflow.com/questions/369758/how-to-trim-whitespace-from-a-bash-variable
MATCHQTY=`grep -o "${PHRASE}" "${FROMFILE}" | wc -l | tr -d '[:space:]'`

echo "----"
printf " Found ${MATCHQTY} " 
case  $MATCHQTY in
    1)       
	   printf "match"
    ;;
    *)
    	printf "matches"
    ;;     
esac 
echo  " of [ ${PHRASE} ] in"
echo " ${FROMFILE}"
echo "----"
