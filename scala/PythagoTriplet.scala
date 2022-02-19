import scala.math.sqrt 

object PythagoTriplet extends App {

    def squareMe ( a:Int ) : Int = {
        //scala.math.pow(a, 2) returns a Double
        a * a
    }

    // our starting array
    val arr = Array(1, 3, 4, 5, 7, 8, 9, 12, 13, 38, 40, 41)

    /**
     * An array with elements from arr squared. Example 3^2 is 9
     */
    val arrSquares = for (i <- arr) yield squareMe(i)

    println(s"From our starting array [${arr.mkString(", ")}]")

    var squaredSum:Int = 0
    var sqrtSquaredSum: Int = 0

    for ( i <- 0 to (arr.length - 1)) {
        
        var j = ( i + 1 )
        
        for (k <- j to (arr.length - 1)) {
            squaredSum = squareMe(arr(i)) + squareMe(arr(k))
            sqrtSquaredSum = sqrt(squaredSum).toInt
            
            if (arrSquares.contains(squaredSum)) {
                println(s" ${arr(i)},${arr(k)},${sqrtSquaredSum} Pythagorean Triplet")
                println(s" [${arr(i)}^2 + ${arr(k)}^2 = ${sqrtSquaredSum}^2]")
                println(s" ${squareMe(arr(i))} + ${squareMe(arr(k))} = ${squaredSum}")
                println("")
            }
        }

    }
}
