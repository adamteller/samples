
/**
 * Given a set of N nuts of different sizes and N bolts of different sizes.
 * There is a one-one mapping between nuts and bolts. Match nuts and bolts efficiently.
Comparison of a nut to another nut or a bolt to another bolt is not allowed.
It means nut can only be compared with bolt
and bolt can only be compared with nut to see which one is bigger/smaller.

The elements should follow the following order ! # $ % & * @ ^ ~ .
"@", "%", "$", "#", "^"
 */
object NutsAndBolts extends App {
  val nuts = List("@", "%", "$", "#", "^")
  val bolts = List("%", "@", "#", "$", "^")

  println(s"Nuts: ${nuts.sortWith(_ < _)}")
  println(s"Bolts: ${bolts.sortWith(_ < _)}")

}

