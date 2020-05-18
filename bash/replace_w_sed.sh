############## sed -i #####################
## great for editing and saving text 'in-place' without opening file.
##
## Found a cool way to search files that match a pattern, then use xargs
## to do an in-place edit.

# The Below info is from Dec 21, 2013 (pymarco) at:
## https://stackoverflow.com/questions/11392478/how-to-replace-a-string-in-multiple-files-in-linux-command-line/20721292#20721292
###########################################

#     grep -rli 'old-word' * | xargs -i@ sed -i 's/old-word/new-word/g' @

Command breakdown:
grep -r: --recursive, recursively read all files under each directory.
grep -l: --print-with-matches, prints the name of each file that has a match, instead of printing matching lines.
grep -i: --ignore-case.

xargs: transform the STDIN to arguments, follow this answer.
xargs -i@ ~command contains @~: a placeholder for the argument to be used in a specific position in the ~command~, 
the @ sign is a placeholder which could replaced by any string.

sed -i: edit files in place, without backups.
sed s/regexp/replacement/: substitute string matching regexp with replacement.
sed s/regexp/replacement/g: global, make the substitution for each match instead of only the first match.