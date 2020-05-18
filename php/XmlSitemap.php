<?php
/**
 * A (hopefully) simple way to use Command Line to recursively get files
 * and folders to create FULL URLs to build A Google-Friendly XML Sitemap
 */

class XmlSitemap
{
    private $directoryList  = array();
    private $directoryFiles = array();
    private $mainDirectory;
    private $domainForXMLFile;
    
    /**
     * Constructor Call
     */
    function XmlSitemap($pth, $domaine='')
    { 
      $this->mainDirectory    = $pth;
      $this->domainForXMLFile = $domaine;
    }
    
    function getMainDirectoryName() 
    {
      return $this->mainDirectory;
    }
    
    function getDomainForXML() 
    {
      return $this->domainForXMLFile;
    }
    
    function getDirectoryNames($ignoreDirs)
    {
      if (is_dir($this->mainDirectory)) {
        if ($dh = opendir($this->mainDirectory)) {
          while (($file = readdir($dh)) !== false) {
            /**
             * GET all DIRECTORY NAMES
             */   
            if( substr($file,0,1) !="." && !in_array($file, $ignoreDirs) && substr($file,-4,1) != ".")  {
              array_push($this->directoryList,$file); 
            }
          }  
          closedir($dh);
        }      
      }
      return $this->directoryList;
    }

    function getDirectoryFiles($pathFolder,$ignoreSuffixes,$ignoreTheseFiles,$subDir=NULL)
    { 
      if ($subDir !=NULL) {$subDir = $subDir .'/';}
     
      if (is_dir($pathFolder)) {
      
        if ($dh = opendir($pathFolder)) {
          
          while (($file = readdir($dh)) !== false) {
            /**
             * GET all desired FILES (php, html, maybe txt) within a single DIRECTORY
             */   
            if( substr($file,0,1) !="."                          && 
                !in_array( substr($file,-3,3) , $ignoreSuffixes) && 
                !in_array($file, $ignoreTheseFiles)              && 
                !is_dir($pathFolder .'/' .$file) )  {
              array_push($this->directoryFiles,$subDir . $file); 
            }
          }  
          closedir($dh);
        }
      
      }
          return $this->directoryFiles;
    }
    
    
    function buildTagSet($indFilePath)
    {
      $tagSet = "\t" .'<url>' ."\n\t\t\t" .'<loc>' .$this->domainForXMLFile .'/' .$indFilePath  .'</loc>' ."\n\t\t\t";
      $tagSet .='<lastmod>' .date ("Y-m-d", filemtime($this->mainDirectory .'/' .$indFilePath)) .'</lastmod>'."\n\t\t";
      $tagSet .='</url>' ."\n\t";
      #echo $this->mainDirectory .'/' .$indFilePath ."\n";
      return $tagSet;   
    }
    
    /**
     * textTags are the tagging structure of COMPLETE sitemap
     */
    function writeMySitemap($textTags, $filename)
    { 
      $outputFile = $this->mainDirectory .'/' .$filename; 
      if (!$handle = fopen($outputFile, 'w')) {
      	echo "Cannot open file ($outputFile)";
      }
      if (fwrite($handle, $textTags) === FALSE) {
      	echo "Cannot write to file ($outputFile)";
      }
      fclose($handle); 
    }
    
    /**
     * When creating the HTML version, the bullet list needs "SOMETHING TO DISPLAY"
     * in the event of nothing usable in the incoming array. If it's blank, it's probably
     *  the site's root URL, so strip out "http://" for display purposes
     * 
     * Also, we don't really need a link to "sitemap.html" within the sitemap.html file
     */
    function buildHTMLBulletList($arr)
    {
      $bulletList = '';
      foreach($arr as $link) {
        
        if(preg_match('/sitemap.html$/', $link)) { break;}
        
        $linkDisplayText = (empty($link) ? substr($this->domainForXMLFile,7) : $link);
        
        $bulletList .= "\t" .'<li><a href="/' .$link  .'">' .$linkDisplayText .'</a></li>' ."\n";
      }
      return $bulletList;   
    }
    
}
