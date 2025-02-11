# Find the missing page number

def find_missing_page(page_numbers):
	# remember that for gaussian sums you have to add 1
    pages_qty = len(page_numbers) + 1

    # We apply the gaussian formula to get a sum just based on how many elements.
    sum_page_complete = (pages_qty**2 + pages_qty) // 2
    
    # We sum all the page numbers.
    # This function call will browse the whole list, but only once.
    sum_page_partial = sum(page_numbers)

    ''' The difference of 
        the sum based on elements, 
        and the actual sum of the list, 
    reveals the missing page number
    '''
    return sum_page_complete - sum_page_partial

pages_in_report = [4 , 6 , 1 , 3 , 7 , 9 , 10 , 2 , 5]
my_missing_page = find_missing_page(pages_in_report)
print(f"My missing page is {my_missing_page}")