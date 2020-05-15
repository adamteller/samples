#!/bin/sh

## User Provides the URL when prompted
DEFAULTNUMWINDOWS=3
MAXWINDOWS=6
PROFILESFILE="/home/adam/bin/firefox.profiles.for.script.txt"

echo "To early-exit this program, press ENTER key at URL propmt."
# GET URL from user, otherwise exit.
echo -n "Enter the URL: "
read WEBURL

# Obviously URL cannot be empty.
if test -z "$WEBURL"; then
      echo "No URL Given, exiting program"
      exit
fi      

echo "Below is the list of available ''fun'' profile names:"
cat ${PROFILESFILE}
echo ""
echo "Each Profile opens in its own window."
echo -n "How many windows should we open? [Default = ${DEFAULTNUMWINDOWS}] : "
read numwin
NUMWINDOWS="${numwin:-$DEFAULTNUMWINDOWS}"

## Can't open up a TON of windows... constraint is maxwindows
if test "${NUMWINDOWS}" -gt "${MAXWINDOWS}"; then
    echo "It is not advisable to open more than ${MAXWINDOWS} windows"
    exit
fi
echo "Opening ${NUMWINDOWS} windows "

###### Add profiles to Firefox (from List)
## Iterate over our list of profile names and crete FF profiles.
head -n ${NUMWINDOWS} "${PROFILESFILE}" | 
while read a; do
  firefox -CreateProfile "${a}"
  echo "Created Firefox Profile for ${a}"; 
done

echo "===== We will open up ${NUMWINDOWS} windows with URL ${WEBURL}"

head -n ${NUMWINDOWS} "${PROFILESFILE}" | 
while read prof; do
  firefox -P "${prof}" "${WEBURL}" & disown;
  echo - "Profile: ${prof} launched. "
done

# error about disown not found ? can be ignored..?
##### Not sure this is any better... each window had 3 tabs.
# NAMESONONELINE=$(head -n ${NUMWINDOWS} "${PROFILESFILE}" | sed -z 's/\n/ /g' | sed 's/[[:blank:]]*$//')
#echo "Names on 1 line: ${NAMESONONELINE}"
#for prof in $NAMESONONELINE; do firefox -P $prof "http://www.google.com" & disown; done
#exit
