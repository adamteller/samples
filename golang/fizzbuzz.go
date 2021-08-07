package main

import "fmt"

func main() {
    fmt.Println("Multiple of 3? Print fizz.  Multiple of 5? Print buzz.")
    fmt.Println("Multiple of both? Print fizzbuzz.  Of Neither? Print number.")

    for i := 1; i < 51; i++ {
        if i%15 == 0 { // multiple of both 3 and 5
            fmt.Println("fizzbuzz")
        } else if i%3 == 0 { //  multiple of 3
            fmt.Println("fizz")
        } else if i%5 == 0 { //  multiple of 5
            fmt.Println("buzz")
        } else {
            fmt.Println(i)
        }
    }
}
