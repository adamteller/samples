import scala.io.StdIn.readLine
import scala.collection.mutable.ArrayBuffer

/**
 * Given a number N, calculate the prime numbers up to N using Sieve of Eratosthenes.
 * In this challenge, you create function 
 *  sieveOfEratosthenes() which takes an integer N as an input parameter 
 *  and returnd the list of prime numbers less than equal to N.
 */
object SieveEratosthenes extends App {
    print("Please enter a number to feed the Sieve : ")
    val sieveInput = readLine()

    try {
        val theNumber: Int = sieveInput.toInt
        
        var sieveArr = ArrayBuffer[Int]()

        for (i <- 2 to theNumber) { 
            if (isPrime1(i)) { 
                sieveArr += i 
            }
        }
        println(s"The Prime numbers less than or equal to ${sieveInput} are ")
        println(sieveArr.mkString(", "))
    } catch {
        case e: NumberFormatException => println(s"${sieveInput} is not a number. Program will end")
        case _: Throwable => println("Got some other kind of Throwable exception")
    }
    
    /**
     * No reason to reinvent the wheel... thank you Stack Overflow. See accepted answer at
     * https://stackoverflow.com/questions/36882103/checking-whether-a-number-is-prime-in-scala 
     * The def below returns true when n = 1. But 1 is NOT a prime number.
     */
    def isPrime1(n: Int): Boolean = ! ((2 until n-1) exists (n % _ == 0))
}
