package main

import "fmt"

func main() {

    var sequenceCount int

    fmt.Print("How many numbers should the series generate? ")
    fmt.Scanf("%d", &sequenceCount)

    // Seed the array with 0 and 1
    sumSequence := []int{0, 1}

    // Since array is already seeded with 2 elements, subtract 2 from limit
    for i := 0; i < (sequenceCount - 2); i++ {
        sumSequence = append(sumSequence, (sumSequence[(i+1)] + sumSequence[i]))
    }
    fmt.Println(sumSequence)
    /*
        Fibonacci Numbers (Sequence):
        1,1,2,3,5,8,13,21,34,55,89,144,233,377,...
        Fn=Fn−2+Fn−1 where n≥2 .
        Each term of the sequence ,
        after the first two, is the sum of the two previous terms.
        This sequence of numbers was first created by Leonardo Fibonacci in 1202 .
    */
}
