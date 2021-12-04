// Scala program of factorial using tail recursion
import scala.annotation.tailrec
import scala.io.StdIn.readLine

// Using GFG object as a "thank you" for tutorial linked : 
// https://www.geeksforgeeks.org/recursion-in-scala/?ref=lbp
object GFG
{
	// Function defined
	def factorial(n: Int): Int =
	{
		// Using tail recursion
		@tailrec def factorialAcc(acc: Int, n: Int): Int =
		{
            if (n <= 1) {
                print(s"$n = ")
                acc
            } else {
                print(s"$n x ")
                factorialAcc(n * acc, n - 1)
            }
		}
		factorialAcc(1, n)
	}
	
	/**
     * Main method. Take in a digit from user and do factorial on it.
     * Note, when running program, an input of 31 produces:  738197504
     * and 32 produces -2147483648 which is the lowest in range of Int 32 bit signed.
     * The maximum value for that data type is 2147483647
     * So, sadly we will constrain the program to max of 31. Otherwise you can play
     * with different integer types such as Long
     */
	def main(args:Array[String])
	{
        print("What number would you like to factorialize? : ")
    
        val factInput = readLine()
        try {
            val fNumber: Int = factInput.toInt
            if (fNumber == 0) 
                throw new NumberFormatException

            if (fNumber > 31)
                throw new ArithmeticException()
            
            println(factorial(fNumber))   
        } catch {
            case e: NumberFormatException => println(s"${factInput} is invalid. Program will end")
            case e: ArithmeticException => println(s"Ending program. Numbers > 31 produce weird due to Int 32 limits. You entered ${factInput}.")
            case _: Throwable => println("Got some other kind of Throwable exception")
        }
	}
}
