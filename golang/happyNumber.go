package main

import (
    "fmt"
    "math"
    "strconv"
    "strings"
)

func buildArrayFromDigits(number int) []int {
    arrayOfInts := []int{}
    slice := strings.Split(strconv.Itoa(number), "")

    for _, i := range slice {
        j, err := strconv.Atoi(i)
        if err != nil {
            panic(err)
        }
        arrayOfInts = append(arrayOfInts, j)
    }
    return arrayOfInts
}

func sqare(number float64) int {
    o := math.Floor(number)
    return int(math.Pow(o, 2))
}

func contains(ia []int, intagrr int) bool {
    for _, v := range ia {
        if v == intagrr {
            return true
        }
    }
    return false
}

func main() {
    var happyIn int
    var happyResult bool = false
    seenSums := []int{}
    fmt.Print("Enter your guess at happy number: ")
    fmt.Scanf("%d", &happyIn)

    seenSums = append(seenSums, happyIn)
    startVal := happyIn

    for happyResult == false {
        var mySum int = 0
        numArray := buildArrayFromDigits(startVal)

        for _, v := range numArray {
            mySum += sqare(float64(v))
            //fmt.Println("v=", v)
        }

        //fmt.Println("Sum of the Squares of the digits is", mySum)

        if contains(seenSums, mySum) {
            //fmt.Println("Get out of loop")
            break
        } else {
            //fmt.Println("Can Continue the loop")
            seenSums = append(seenSums, mySum)
        }
        startVal = mySum

        if mySum == 1 {
            happyResult = true
        }
    }

    fmt.Println("Sums of the Squares of the digits:", seenSums)

    //Now that the loop has exited, what is our result?
    if happyResult == true {
        fmt.Println(happyIn, "is a happy number")
    } else {
        fmt.Println(happyIn, "is not a happy number")
    }
}
