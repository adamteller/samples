
/**
 * Input:
 * S = i.like.this.program.very.much
 * Output: much.very.program.this.like.i
 *
 * Explanation: After reversing the whole string(not individual words),
 * the input string becomes
 * much.very.program.this.like.i
 */
object ReverseWordsInString extends App {
  val S : String = "i.like.this.program.very.much"
  println(S.split('.').reverse.mkString("."))

  /**
   * Solution: split the string on the dot character,
   * then reverse print each element (which is a word),
   * joined on the dot character.
   */
}
