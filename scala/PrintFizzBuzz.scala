import scala.io.StdIn.readLine

object PrintFizzBuzz extends App {
    
    val start: Int = 1
    
    println("Fizzbuzz program, print a list of numbers ... and ...")
    println(" when number is divisible by 3, print fizz.")
    println(" when number is divisible by 5, print buzz.")
    println(" when number is divisible by both 3 and 5, print fizzbuzz.")
    print("Where should the number list stop ? : ")
    
    val endStr = readLine()
    
    // Handle cases where user does not supply a numeric string
    try {
        val end: Int = endStr.toInt
        val nums = (start to end).toArray

        for (n <- nums) {
            if (n % 15 == 0) {
                print("fizzbuzz ")
            } else if (n % 3 == 0) {
                print("fizz ")
            } else if (n % 5 == 0) {
                print("buzz ")
            } else {
                print(s"${n} ")
            }
        }
        println(" ")
    } catch {
        case e: NumberFormatException => println(s"${endStr} is invalid. Program will end")
        case _: Throwable => println("Got some other kind of Throwable exception")
    }
}