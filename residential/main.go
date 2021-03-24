// Golang program to check whether a number is palindrome or not

package main

import "fmt"

func main1() {
	var number, remainder, temp int
	var reverse int = 0

	fmt.Print("Enter any positive integer : ")
	fmt.Scan(&number)

	temp = number

	// For Loop used in format of While Loop
	for {
		remainder = number % 10
		reverse = reverse*10 + remainder
		number /= 10

		if number == 0 {
			break // Break Statement used to exit from loop
		}
	}

	if temp == reverse {
		fmt.Printf("%d is a Palindrome", temp)
	} else {
		fmt.Printf("%d is not a Palindrome", temp)
	}

}

func main() {
	// var data string
	// fmt.Print("Enter any string : ")
	// fmt.Scan(&data)
	// fmt.Println(IsPalinDrome(data))

	// var data int
	// fmt.Print("Enter number : ")
	// fmt.Scan(&data)
	// fmt.Println(ReversingNumber(data))

	// var data string
	// fmt.Print("Enter any string : ")
	// fmt.Scan(&data)
	// fmt.Println(ReverseString(data))
	MaxMin([]int{1,2,1,-100,2000, 4})
}

func IsPalinDrome(data string) bool {

	for i := 0; i < len(data)/2; i++ {
		if data[i] != data[len(data)-i-1] {
			return false
		}
	}
	return true
}

func ReversingNumber(number int) int {

	var reverse, remainder int
	for {
		remainder = number % 10
		reverse = reverse*10 + remainder
		number = number / 10
		if number == 0 {
			break
		}
	}
	return reverse
}

func ReverseString(str string) (result string) {
	for _, v := range str {
		result = string(v) + result
	}
	return
}

func MaxMin(data []int) {
	min := data[0]
	max := data[0]
	for _, v := range data {
		if v < min {
			min = v
		}
		if v > max {
			max = v
		}
	}
	fmt.Println("minimum ", min)
	fmt.Println("maximun ", max)
}
