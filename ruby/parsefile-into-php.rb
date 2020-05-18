#!/usr/bin/ruby -w
# Read contents of a file, into an array hash.
# Then, iterate over the array, construct various syntax/instructions.
begin
    count   = 0
    file    = File.new("ruby-list-fun", "r")
    h       = Hash.new
    
    while (line = file.gets)
        
        line        = line.chomp
        displaytext = line.scan(/\d*\s*(.*\s*)/)
        optionval   = line.scan(/^\d{1,6}/)

        # Now append our hash based on String filters above
        h["#{optionval}"] = displaytext
        count += 1
    end
    file.close

    puts "There are #{count} items in file, and #{h.length} key => value pairs in the hash."
    
    # Sort the hash by the value, and reassign to self
    h = h.sort_by { |key, value| value }
     
    puts "PHP ARRAY KEYS:"
    # Now, iterate out our key => value array for PHP
    h.each { |key,value| puts "'#{key}' => '#{value}',"}

    puts "\nSQL UPDATE STATEMENTS:"
    # Now, construct the SQL update statements based on key and value.
    h.each { |key,value| puts "UPDATE -TABLE- SET a_vendor_c = '#{key}' WHERE a_vendor_c = '#{value}';"}    
     
rescue => err
    puts "Exception: #{err}"
    err
end