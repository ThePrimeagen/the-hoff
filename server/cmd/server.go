package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

func main() {
    http.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request){
        fmt.Fprintf(w, "Hello!")
    })

    fmt.Printf("Starting server at port %s\n", os.Getenv("PORT"))
    if err := http.ListenAndServe(fmt.Sprintf(":%s", os.Getenv("PORT")), nil); err != nil {
        log.Fatal(err)
    }
}
