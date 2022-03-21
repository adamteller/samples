import scala.io.StdIn.readLine
import scala.collection.mutable.ArrayBuffer
import scala.util.Random
import scala.util.control.Breaks._

object MissingNumber extends App {
  // Generate an array, with length of N-1, where N should be no less than 2.
  // Don't do a 2 element array. Seems a waste.
  // IF N = 5, create an array {1,2,4,5}
  // Find the missing value in the sequence (in other words, detect that 3 is missing).
  //
  // Accept N as the basis of the array length
  // Generate numbers 1 through N --> Randomly omitting one iteration. This gives you length of N-1
  // For giggles, shuffle the array, you can then practice sorting it.
  println("Enter the highest number in the list. ")
  print("This number may get dropped. List size is N-1: ")
  val endStr = readLine()
  var theMissingNumber: Int = 0
  var numberList = ArrayBuffer[Int]()

  try {
    val end: Int = endStr.toInt
    val extendedDigit: Int = (end + 1)

    // set a random value that can be as low as 1, and as high as N.
    // "between" excludes the top of range, so add 1 to "end" to trick it into "including" end.
    var randomDigit = {
      Random.between(1, extendedDigit)
    }

    // Build the list, but do not add the randomDigit
    for (f <- 1 until extendedDigit) {
      breakable {
        if (f == randomDigit) {
          break
        } else {
          numberList += f
        }
      }
    }

    for (i <- 1 to numberList.length) {
      if (!numberList.contains(i)) {
        theMissingNumber = i
      }
    }

    println(numberList)
    println(s"Our missing number is ${theMissingNumber} ")

  } catch {
    case e: NumberFormatException => println(s"${endStr} is not a number. Program will end")
    case _: Throwable => println("Got some other kind of Throwable exception")
  }
}