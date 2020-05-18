<img src="../images/GTO_70_BorrowedFromNet.jpg" alt="Front Grille of 1970 Pontiac GTO that I downloaded from the internet" title="Front Grille of 1970 Pontiac GTO that I downloaded from the internet" width="400" height="300" />

# Launch many instances of a specific browser, each with a different profile

## Why would anyone want or need to do this?

### Backstory

I am not a sneaker (sorry "shoe") aficionado. But I know someone who is.  When you're trying to buy a "just-released" valuable pair of shoes, you have to snag them at just the right time.  Supposedly some of the vendors can track many requests made by the same browser and profile.  Hence the tactic of making requests with several (Chrome or Firefox) browsers, but using different profiles in each window / instance.

- I encourage you to READ the shell scripts first, instead of blindly executing them.  
- Due to system constraints (excess CPU usage) I hardcoded a MAX value of 6 windows. You can change this in the script.
- When running the script it will ask you for a URL, you paste it in and press [ENTER]

#### Launch Multiple Firefox Windows: 

- Create A few Firefox Profiles. You can name them whatever you like.  
- Here is a <a href="https://developer.mozilla.org/en-US/docs/Mozilla/Command_Line_Options">mozilla reference for creating profiles on command line</a>
- Create a text file containig the profile names. The script will iterate over this list.  
- I stored my list at path /home/adam/bin/firefox.profiles.for.script.txt   
  so you will need to change this accordingly. 

```shell
$ sh launch_firefoxes.sh
```
When prompted, enter a URL, [and amount of windows to launch] or follow the directions to exit.


#### Launch Multiple Chrome/Chromium Windows: 
- As far as I know, creating profiles on the command line for chrome is not as simple as doing so for Firefox, so you'll have to do that manually.
- For reference: https://stackoverflow.com/questions/31067404/how-to-create-a-chrome-profile-programmatically  
- However, the tradeoff (you can do this with firefox too) is that the newly created profiles can be scanned by a command, and the found names can be piped out to a file, saving you time of doing it yourself.
- Similar to the firefox launcher, you would copy a URL to your clipboard and get it ready for pasting

```shell
$ sh launch_chromes.sh
```
When prompted, enter a URL, [and amount of windows to launch] or follow the directions to exit.