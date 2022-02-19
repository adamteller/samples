import scala.io.StdIn.readLine
import scala.collection.mutable.ArrayBuffer

object Fibonacci extends App {
    println("Fibonacci Generator.  Please supply a numeric answer on the next line.")
    print("How many numbers should the series generate ? : ")
    val endStr = readLine()

    // Handle cases where user did not supply a numeric string
    try {
        
        val end: Int = endStr.toInt
        var fibonums = ArrayBuffer[Int]()

        // Push in values 0 and 1 to the array
        fibonums += 0 += 1

        /**
        * The range "x until y", is not inclusive of y.
        * A good choice for numerically-indexed arrays.
        */
        for (f <- 0 until end) {
            print(s"${fibonums(f)} ")
            fibonums += (fibonums(f+1) + fibonums(f))
        }
        println("")

    } catch {
        case e: NumberFormatException => println(s"${endStr} is not a number. Program will end")
        case _: Throwable => println("Got some other kind of Throwable exception")
    }
}
