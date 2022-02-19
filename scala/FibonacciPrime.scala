import scala.io.StdIn.readLine
import scala.collection.mutable.ArrayBuffer

object FibonacciPrime extends App {
 
    print("Please enter a number to determine if Fibonacci and Prime : ")
    val strInput = readLine()

    try {
        val theNumber: Int = strInput.toInt
        /**
         * The challenge at site:https://practice.geeksforgeeks.org/problems/the-fibonacci-prime-number1150/
         * We are constrained to work with input value btw 1 and 75
         */
        if (theNumber < 1 || theNumber > 75) {
            throw new ArithmeticException()
        }
        var fibonums = ArrayBuffer[Int]()

        // Push in values 0 and 1 to the array
        fibonums += 0 += 1

        for (f <- 0 to theNumber) {
            print(s"${fibonums(f)} ")
            fibonums += (fibonums(f+1) + fibonums(f))
        }
        println("")

        var strOut : String = ""
        
        if (fibonacciPrime(theNumber, fibonums)) {
            strOut = s"${theNumber} is a Fibonacci Prime."
        } else {
            if (isFibonacci(theNumber, fibonums)) {
                strOut += s"${theNumber} is a Fibonacci number"
            } else {
                strOut += s"${theNumber} is Not a Fibonacci number"
            }
            if (isPrime1(theNumber)) {
                strOut += s", and ${theNumber} is a prime number."
            } else {
                strOut += s", and ${theNumber} is Not a prime number."
            }
        }
        println(strOut)

    } catch {
        case e: NumberFormatException => println(s"${strInput} is not a number. Program will end")
        case e: ArithmeticException => println(s"Number should be between 1 and 75, you entered ${strInput}")
        case _: Throwable => println("Got some other kind of Throwable exception")
    }
    
    /**
     * No reason to reinvent the wheel... thank you Stack Overflow. See accepted answer at
     * https://stackoverflow.com/questions/36882103/checking-whether-a-number-is-prime-in-scala 
     * The def below returns true when n = 1. But 1 is NOT a prime number.
     */
    def isPrime1(n: Int): Boolean = ! ((2 until n-1) exists (n % _ == 0))

    /**
     * Is the numeric input in our generated Fibonacci series?
     */
    def isFibonacci(n: Int, ab: ArrayBuffer[Int]): Boolean = ab.contains(n)

    // Tie the 2 boolean checks together
    def fibonacciPrime(n: Int, ab: ArrayBuffer[Int]): Boolean = isPrime1(n) && isFibonacci(n, ab)
}
