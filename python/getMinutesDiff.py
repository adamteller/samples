from datetime import datetime, timedelta

''' Assumptions:
    Time is hour and minute, no seconds, with "am" / "pm" notations. 12 hour clock.
    Each parameter has a colon : then a space after minutes
    Examples: '11:45 pm', '12:10 am'
'''


def get_diff_minutes(start, end):
    start_dt = datetime.strptime(start, '%I:%M %p')
    end_dt = datetime.strptime(end, '%I:%M %p')

    if start_dt <= end_dt:
        diff = (end_dt - start_dt)
    else:
        diff = ((end_dt + timedelta(1)) - start_dt)

    # returns the difference of the time of the day (minutes, seconds)
    minutes = divmod(diff.seconds, 60)
    return minutes[0]


my_times = ['11:35 pm', '10:46 pm', '12:10 am', '1:46 am']
my_times_len = len(my_times)
my_time_diffs = []

# Use nested loop. On first iteration, compare element 0 to element 1, then element 2, etc to last element.
i = 0
while i < my_times_len:
    j = (i + 1)
    while j < my_times_len:
        my_diff_minutes = get_diff_minutes(my_times[i], my_times[j])
        # print("{} and {} : {} minute difference".format(my_times[i], my_times[j], my_diff_minutes))
        my_time_diffs.append(my_diff_minutes)
        j += 1
    i += 1

my_time_diffs.sort()
print('Shortest time duration: {} minutes'.format(my_time_diffs[0]))
