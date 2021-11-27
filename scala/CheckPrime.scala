import scala.io.StdIn.readLine

object CheckPrime extends App {
    print("Please enter a number to check if it is Prime : ")
    val primeCandidate = readLine()

    try {
        val theNumber: Int = primeCandidate.toInt
        if (theNumber > 1 && isPrime1(theNumber)) {
            println(s"The number ${primeCandidate} is prime.")
        } else {
            println(s"${primeCandidate} is not a prime number.")
        }
    } catch {
        case e: NumberFormatException => println(s"${primeCandidate} is not a number. Program will end")
        case _: Throwable => println("Got some other kind of Throwable exception")
    }
    
    /**
     * No reason to reinvent the wheel... thank you Stack Overflow. See accepted answer at
     * https://stackoverflow.com/questions/36882103/checking-whether-a-number-is-prime-in-scala 
     * The def below returns true when n = 1. But 1 is NOT a prime number.
     */
    def isPrime1(n: Int): Boolean = ! ((2 until n-1) exists (n % _ == 0))
}
