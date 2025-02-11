def count_substring(string, sub_string):
    # print(f"start with: {string} and find occurrences of {sub_string}")
    sub_length = len(sub_string)
    # USE a SLIDING WINDOW Approach to create a list of captures. Thanks ChatGPT
    captures = [string[i:i+sub_length] for i in range(len(string) - (sub_length - 1))]
    # print(captures)
    return captures.count(sub_string)

if __name__ == '__main__':
    string = input().strip()
    sub_string = input().strip()
    
    count = count_substring(string, sub_string)
    print(count)