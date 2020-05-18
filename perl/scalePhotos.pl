#!/usr/local/bin/perl
#print "you want your photos sized to  $ARGV[0] width";
#print "\n - and these photos live in $ARGV[1] \n";

if( -d $ARGV[1] ) {
  @dir_contents;

  $dir_to_open="./$ARGV[1]";

  # open file with handle DIR
  opendir(DIR,$dir_to_open) || die("Cannot open directory !\n");

  # Push contents of directory into the array
  @dir_contents = readdir(DIR);
  # Close the directory
  closedir(DIR);
    
  # destination directory for the resized photos
  $lowResDir = $ARGV[1] ."_$ARGV[0]";
  
  if( -d $lowResDir ) {
  } else {
    mkdir $lowResDir;
  }

  # Multiply common widths by 0.75 to derive the height
  # 1024 w; (1024 * .75) = 768px h  # 800  w; (800 * .75)  = 600px h
  # 600  w; (600 * .75)  = 450px h

  $newWidth = int $ARGV[0];
  $newHeight = int ($ARGV[0] * .75);

  use Graphics::Magick;

  # Now loop through array of files
  foreach $file (@dir_contents) {
    if(!(($file eq ".") || ($file eq ".."))) {
      my($image, $x);
      $image = Graphics::Magick->new;
      $x = $image->Read("$ARGV[1]/$file");
      warn "$x" if "$x";
    
      $x = $image->Scale(geometry=>'100x100', width=>$newWidth, height=>$newHeight);
      warn "$x" if "$x";

      $x = $image->Write("$lowResDir/$file");
      warn "$x" if "$x";
      print "created $lowResDir/$file [width: $newWidth, height: $newHeight]\n";

      ### Once finished with a PerlMagick object, destroy it using "undef". 
      undef $image;    
    }
  }
} else {
  print "$ARGV[1] is NOT a directory ::: program will now exit \n";
  exit;
}
  #create a zip archive of the low res files
  #then move archive to "Emailing" folder
  system("zip -r $lowResDir.zip $lowResDir");
  system("mv $lowResDir.zip ./forEmailing/$lowResDir.zip");
exit;