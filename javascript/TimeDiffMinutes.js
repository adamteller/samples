/**
 * Solution to calculating time differences in minutes.
 * Uses the moment js library, so import it as needed.
 */
function diffInMinutes(start, end) {
  // start time and end time
  var startTime = moment(start, 'HH:mm:ss a');
  var endTime = moment(end, 'HH:mm:ss a');
  var duration = {};

  // calculate total duration
  if (startTime <= endTime) {
    duration = moment.duration(endTime.diff(startTime));
  } else {
    // Add one day to endTime for "next day representation"
    endTime = endTime.add(1, 'days');
    duration = moment.duration(endTime.diff(startTime));
  }
  return parseInt(duration.asMinutes());
}

// Return smallest value of numerically-sorted array
function getShortestDurationMins(myTimes) {
  var minuteDiffs = [];
  var tmpDiff = 0;
  var loopLimit = myTimes.length;
  for (i = 0; i < loopLimit; i++) {
    for (k = (i + 1); k < loopLimit; k++) {
      tmpDiff = diffInMinutes(myTimes[i], myTimes[k]);
      minuteDiffs.push(tmpDiff);
      //console.log('Diff Minutes:', myTimes[i] + ' and', myTimes[k],'is',tmpDiff);	
    }
  }
  minuteDiffs = minuteDiffs.sort((a, b) => a - b);
  return minuteDiffs[0];
}

var myTimes = ['11:55 pm', '12:10 am', '4:45 pm', '10:30 am', '2:59 pm'];

//console.log(diffInMinutes('11:55 pm', '12:10 am'));
console.log('Shortest Duration from myTimes:', getShortestDurationMins(myTimes));
