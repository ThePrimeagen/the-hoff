package main

import (
	"io"
	"log"
	"net/http"

	"github.com/joho/godotenv"
	"github.com/theprimeagen/the-hoff/internal/linode"
)

func startHttpServer() *http.Server {
	srv := &http.Server{Addr: ":8080"}

	http.HandleFunc("/foo/", func(w http.ResponseWriter, r *http.Request) {
		io.WriteString(w, "hello, world\n")
	})

	go func() {
		if err := srv.ListenAndServe(); err != nil {
			// cannot panic, because this probably is an intentional close
			log.Printf("Httpserver: ListenAndServe() error: %s", err)
		}
	}()

	// returning reference so caller can call Shutdown()
	return srv
}

func main() {
	// use dotenv to read the environment variables
	// from the .env file
	err := godotenv.Load()

	if err != nil {
		panic(err)
	}

	_, err = linode.CreateMinioClient()

	if err != nil {
		panic(err)
	}

	startHttpServer()

	// wait forever without using the cpu
	forever := make(chan struct{})
	<-forever
}
