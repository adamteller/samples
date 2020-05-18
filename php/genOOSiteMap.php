<?php
//echo php_sapi_name();
//if ( php_sapi_name() == 'apache' ) {
//  echo "Running as apache\n";
//} else {
//  echo "Running as CLI\n";
//}

// = home $_SERVER['DOCUMENT_ROOT'] = dirname(dirname(dirname(dirname(dirname(__FILE__)))));
$_SERVER['DOCUMENT_ROOT'] = dirname(dirname(dirname(__FILE__))) .'/hsphere/local/home';

// echo "Document server root (for web) should be 'tempesta' only \n";
// echo "is : " .$_SERVER['DOCUMENT_ROOT'] ."\n";

$baseDirectory = "/home/adam/bin/phpAutomation"; //change as needed
 # DEBUGGING
 #echo $_SERVER['DOCUMENT_ROOT'];
 #echo "\n";
 #echo 'count:' . $argc ."\n";
if ($argc < 2) { 
  echo "Not Enough Arguments, please provide path relative to \n $baseDirectory \n"; 
  exit;
}

/**
 * USE THIS FILE TO CALL/CREATE OBJECTS.
 */
include_once 'XmlSitemap.php';

/**
 * Important file.. contains the config info. This file must ignore directory slashes (a.k.a/ Specials/siren)
 */
$safeFile   = str_replace('/', '_', $argv[2]);
$configFile = $baseDirectory ."/siteMapIncludes/siteMapConfig." .$safeFile .".php";

if (file_exists($configFile)) {
  include $configFile;
  #echo "Config file found\n";
} else {
  echo "PROBLEM >>> missing config file \n  STATUS: Creating CONFIG FILE: \n $configFile \n";
  $templayte = $baseDirectory ."/siteMapIncludes/configTemplate.php";
  $cmd       = "cp $templayte $configFile";
  shell_exec ( $cmd );  
  usleep(1000000);
  echo " Done. Config file written, but requires values to continue.\n Program will now exit.\n";
  exit;
}

$fullPath = "/home/adam/public_html/hsphere/local/home/{$argv[1]}/{$argv[2]}";
    #echo "Path being sent to script is\n" .$fullPath ."\n";
    #exit;
# INSTANTIATE, note, var $myDomain has a url value and is in the configfile
$siteMap1 = new XmlSitemap($fullPath, $myDomain);

if(!$siteMap1) { echo "\n ERROR! OBJECT NOT CREATED \n"; exit;}
/**
 * Start the XML output
 */
$buf =  '<?xml version="1.0" encoding="UTF-8"?>' ."\n\t";
$buf .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' ."\n\t";

/**
 * Collect the subdirectory file path and files
 */
$dirsAtCurrentLevel = $siteMap1->getDirectoryNames($ignoreTheseDirs);
$subDirCount        = count($dirsAtCurrentLevel);

for( $r = 0; $r < $subDirCount; $r++) {
  $mySubDir = $dirsAtCurrentLevel[$r];
  $siteMap1->getDirectoryFiles($fullPath .'/' .$mySubDir, $ignoreTheseExts, $ignoreTheseFiles, $mySubDir);
}

/**
 * Collect the files at the main (site root) level.
 * do not get files with the following extensions (no dot) from config file
 */
$filesAtMainLevel = $siteMap1->getDirectoryFiles($fullPath,$ignoreTheseExts,$ignoreTheseFiles);

/**
 * Push in the site's root directory without having to call it "index.php" or "index.html"
 */
$filesAtMainLevel[] = "";
#shuffle($filesAtMainLevel);

#print_r($filesAtMainLevel);

foreach ($filesAtMainLevel as $f){
  $buf .= $siteMap1->buildTagSet($f);
}

/**
 * Finish the XML output AND THEN write the XML sitemap file
 */
$buf .= "</urlset>\n";

$siteMap1->writeMySitemap($buf, 'sitemap.xml');


/**
 * HTML sitemap -or "spider food", using same URLs.
 */
$htmlTOP =<<<EOO
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
  <head>
    <title>$myDomain : sitemap</title>
      <meta name="description" content="A list of links within $myDomain. Includes links to various pages in $myDomain" />
      <meta name="keywords" content="site,map,links,link list" />
      <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
      <link rel="stylesheet" href="styles.css" type="text/css" />
    </head>
EOO;



sort($filesAtMainLevel);
#print_r($filesAtMainLevel);

$htmlMiddle = '<body style="margin-left:10px"><h3 id="contactNumber">Sitemap: A list of links at ' .$myDomain ."</h3>\n";
  if($argv[1] == 'adult') {
    $htmlMiddle .= '<p class="entryTerms" style="text-align:left;margin-left:52px;margin-bottom:5px">By clicking any of the links below, I agree that I am at least 18 years of age and may view adult-oriented materials.</p>';
  }
  
$htmlMiddle .= '<ul class="mainPage">' ." \n";
$htmlMiddle .= $siteMap1->buildHTMLBulletList($filesAtMainLevel);

$htmlBottom = "</ul>
</body>
</html>";

$htmlFull = $htmlTOP .$htmlMiddle .$htmlBottom;

$siteMap1->writeMySitemap($htmlFull, 'sitemap.html');
