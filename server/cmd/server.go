package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

func main() {
    /*
    ctx := context.Background()
    secret := os.Getenv("LINODE_OBJECT_SECRET")
    accessId := os.Getenv("LINODE_OBJECT_ACCESS")
    endpoint := os.Getenv("LINODE_OBJECT_ENDPOINT")

    opts := minio.Options{
		Creds:  credentials.NewStaticV4(accessId, secret, ""),
		Secure: false,
        Region: "us-east-1",
	}

    minioClient, err := minio.NewWithOptions(endpoint, &opts)

	if err != nil {
		log.Fatalln(err)
	}

    // LINODE_OBJECT_ENDPOINT=the-hoff.us-east-1.linodeobjects.com

    obj, err := minioClient.GetObject("the-hoff", "SpeedRun.png", minio.GetObjectOptions{})
    if err == nil {
        stat, err := obj.Stat()
        if err != nil {
            log.Fatalf("GetObject stat Error %+v\n", err)
        }

        log.Printf("GetObject Success %+v\n", stat)
    } else {
        log.Fatalf("GetObject Error %+v\n", err)
    }


    // Upload the zip file
	objectName := "test-obj"
	contentType := "application/json"
    bucketName := "the-hoff"
    object := strings.NewReader("{foo: \"bar\"}")
    log.Printf("Hello,\n");

	// Upload the zip file with FPutObject
    // PutObjectWithContext(ctx context.Context, bucketName, objectName string, reader io.Reader, objectSize int64,
	info, err := minioClient.PutObjectWithContext(ctx,
        bucketName, objectName, object, -1, minio.PutObjectOptions{ContentType: contentType})

    log.Printf("World,\n");
	if err != nil {
		log.Fatalln(err)
	}
    log.Printf("Foobar,\n");

	log.Printf("Successfully uploaded %s of size %+v\n", objectName, info)

    */
    http.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request){
        fmt.Fprintf(w, "Hello!")
    })

    fmt.Printf("Starting server at port %s\n", os.Getenv("PORT"))
    if err := http.ListenAndServe(fmt.Sprintf(":%s", os.Getenv("PORT")), nil); err != nil {
        log.Fatal(err)
    }
}
