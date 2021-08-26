package main

import (
	"fmt"
	"io"
	"math/rand"
	"os"

	"github.com/joho/godotenv"
	"github.com/minio/minio-go"
	"github.com/theprimeagen/the-hoff/internal/linode"
)

func main() {
	// use dotenv to read the environment variables
	// from the .env file
	err := godotenv.Load()
	if err != nil {
		panic(err)
	}

	client, err := linode.CreateMinioClient()

	if err != nil {
		panic(err)
	}

	// create a random 16 bytes
	random := make([]byte, 16)
	// for loop and fill the random bytes
	for i := 0; i < 16; i++ {
		random[i] = byte(rand.Intn(256))
	}

	/*
		// create reader from the random bytes
		reader := bytes.NewReader(random)

		// create put options with the minio client
		putOpts := minio.PutObjectOptions{}

			n, err := client.PutObject("the-hoff", "the-hoff", reader, 16, putOpts)
			if err != nil {
				panic(err)
			}

			// log n
			fmt.Println(n)
	*/

	// list buckets from minio
	buckets, err := client.ListBuckets()
	if err != nil {
		panic(err)
	}

	// print the buckets
	fmt.Printf("I have %d buckets\n", len(buckets))
	for _, bucket := range buckets {
		fmt.Printf("I GOTS A BUCKET %+v\n", bucket)
	}

	// get the object
	obj, err := client.GetObject("the-hoff", "scope.jpeg", minio.GetObjectOptions{})

	if err != nil {
		panic(err)
	}

	// Read all the data from obj
	defer obj.Close()
	io.Copy(os.Stdout, obj)
}
