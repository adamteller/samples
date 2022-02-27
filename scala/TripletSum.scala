import scala.io.StdIn.readLine

object TripletSum extends App {
    print("How many elements should the array contain : ")
    val myListLenStr = readLine()

    print("What sum are you targeting from a triplet : ")
    val targetSumStr = readLine()
    try {
        val myListLen : Int = myListLenStr.toInt
        val numberList = Seq.fill(myListLen)(scala.util.Random.nextInt(10))

        val targetSum : Int = targetSumStr.toInt
        println(s"Targeting a sum ${targetSum} from a triplet in our generated list:")
        println((numberList))

        // Since we are summing a triplet, need a loop with 2 nests under it
        for (i <- 0 to (numberList.length - 1)) {
            var j = ( i + 1 )

            for (k <- j to (numberList.length - 1)) {
                var m = ( k + 1 )

                for (o <- m to (numberList.length - 1)) {
                    var tempSum : Int = (numberList(i) + numberList(k) + numberList(o))
                    println(s"Triplet Sum: ${numberList(i)} + ${numberList(k)} + ${numberList(o)} = ${tempSum}")

                    if (tempSum == targetSum) {
                        println(s"   Yes! Sum of the above triplet is ${targetSum}")
                    }
                }
            }
        }
    } catch {
        case e: NumberFormatException => println(s"${myListLenStr} or ${targetSumStr} is not a number. Program will end")
        case _: Throwable => println("Got some other kind of Throwable exception")
    }
}
