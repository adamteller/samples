#!/usr/local/bin/perl -w
################################################## 
# Read all images in a folder
# -that is- point the script AT A FOLDER
# that has images in it -- then get the
# dimensions of each image file.
# ---Depending on the attributes, there will be
# one or 2 possible actions performed

#Use method Get() to get an image attribute. For example, 

# ($a, $b, $c) = $image->Get('colorspace', 'magick', 'adjoin');
# base-columns  return = integer
# base-filename return = string
# base-rows     return = integer
##################################################
sub getFrameType {
  my($widthValue, $heightValue) = @_;
  if($widthValue > $heightValue) {
    $layout = "landscape";
  } else {
    $layout = "portrait";
  }
  return $layout;
}

if( -d $ARGV[0] ) {

  $dir_to_open="./$ARGV[0]";

  # open file with handle DIR
  opendir(DIR,$dir_to_open) || die("Cannot open directory !\n");

  # Push contents of directory into the array
  @dir_contents = readdir(DIR);

  # Close the directory
  closedir(DIR);
  
  use Graphics::Magick;

  # Now loop through array of files
  foreach $file (@dir_contents) {
    if(!(($file eq ".") || ($file eq ".."))) {
      my($image, $x);
      $image = Graphics::Magick->new;
      $x = $image->Read("$ARGV[0]/$file");
      warn "$x" if "$x";
    
      ($name, $width, $height) = $image->Get('base-filename', 'base-columns', 'base-rows');
     
      print "image: " .$name ." size = " .$width ." X " .$height ." format: ".getFrameType($width, $height)."\n";
       
      ### Once finished with a PerlMagick object, destroy it using "undef". 
      undef $image;    
    }
  }
} else {
  print "$ARGV[0] is NOT a directory ::: program will now exit \n";
  exit;
}
#### save these system calls to maybe execute another program???
#  system("zip -r $lowResDir.zip $lowResDir");
# system("mv $lowResDir.zip ./forEmailing/$lowResDir.zip");
exit;