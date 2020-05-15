<img src="GTO_65_BorrowedFromNet.jpg" alt="Front Grille of 1965 Pontiac GTO that I downloaded from the internet" title="Front Grille of 1965 Pontiac GTO that I downloaded from the internet" width="640" height="480" />

# Here are some notes, observations, and non-project-specific docker infos.

> Featured anywhere along my git-o-sphere, you may see some pictures of old cars.  
> *Disclaimer follows:*  
> The cars, and the images, are not mine. I searched, I liked, I downloaded.  
> In no way, shape, or form, do I claim to own the images, or the rights to them.

## When you want to purge all of your stopped containers and remove all the images.  Also it removes any persistent volumes of data on your host system.

```shell
$ sh total-purge-docker.sh
```
Running the script by itself does not purge anything until you answer 'Y' or 'y' when prompted.  
This prevents accidental erasure that has no 'undo'.
