<img src="../images/GTO_70_BorrowedFromNet.jpg" alt="Front Grille of 1970 Pontiac GTO that I downloaded from the internet" title="Front Grille of 1970 Pontiac GTO that I downloaded from the internet" width="640" height="480" />

# Launch many instances of a specific browser, each with a different profile

## Why would anyone want or need to do this?

### Backstory

I am not a sneaker (sorry "shoe") aficionado. But I know someone who is.  Many is a time when you're trying to buy a "just-released" valuable pair of shoes, you have to snag them at just the right time.  Supposedly some of the vendors are able to track many requests by the same browser and profile.  Hence the tactic of making requests with several (Chrome or Firefox) browsers, but using different profiles in each window / instance.

- I encourage you to READ the shell scripts first, instead of blindly executing them.  
- Due to system constraints (excess CPU usage) I hardcoded a MAX value of 6 windows. You can change this in the script.
- When running the script it will ask you for a URL, you paste it in and press [ENTER]

```shell
$ brew update
$ brew install fvcproductions
```

> now install npm and bower packages

```shell
$ npm install
$ bower install
```