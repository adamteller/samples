#!/bin/sh
# It does not matter if you provide window-position, as new windows slap on top of eachother. boo...
# The important "delta" are values in --profile-directory 'Profile 1', or 'Profile 2', etc.  

## User Provides the URL when prompted
DEFAULTNUMWINDOWS=3
MAXWINDOWS=6
PROFILESFILE="/home/adam/bin/chrome.profiles.for.script.txt"

# Scan chromium Profiles with 'Profile n' and pipe output to file.
cd ~/.config/chromium && find . -type d -name "Profile *" -printf "%f\n" | sort > $PROFILESFILE

echo "Enter URL, or press [ENTER only] to exit this program."
# GET URL from user.
echo -n "URL: "
read WEBURL

# Exit IF URL is empty.
if test -z "$WEBURL"; then
      echo "No URL Given, exiting program"
      exit
fi

echo "\nBelow is the list of available profiles, where each will open in its own window:"
cat ${PROFILESFILE}
echo ""
echo -n "How many windows should we open? [Default = ${DEFAULTNUMWINDOWS}] : "
read numwin
NUMWINDOWS="${numwin:-$DEFAULTNUMWINDOWS}"

## Can't open up a TON of windows... constraint is MAXWINDOWS
if test "${NUMWINDOWS}" -gt "${MAXWINDOWS}"; then
    echo "It is not advisable to open more than ${MAXWINDOWS} windows"
    exit
fi

echo "===== We will open up ${NUMWINDOWS} windows with URL ${WEBURL}"

head -n ${NUMWINDOWS} "${PROFILESFILE}" | 
while read prof; do
  chromium-browser --disable-background-mode \
  --disable-gpu --new-window --window-size=600,400 "${WEBURL}" \
  --profile-directory="${prof}" &>/dev/null &
  echo "${prof} launched. "
done
