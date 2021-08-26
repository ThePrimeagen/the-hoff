package linode

import (
	"log"
	"os"

	"github.com/minio/minio-go"
	"github.com/minio/minio-go/pkg/credentials"
)

// Create the simple object store for Linode objects.
// Simple object store adheres to amazon S3 API.

// Use the minio client to initialize the simple object store.
// This is a singleton object.
func CreateMinioClient() (*minio.Client, error) {
	// create a new minio client with options using context
	secret := os.Getenv("LINODE_OBJECT_SECRET")
	accessId := os.Getenv("LINODE_OBJECT_ACCESS")
	endpoint := os.Getenv("LINODE_OBJECT_ENDPOINT")

	// region := os.Getenv("LINODE_OBJECT_REGION")

	opts := minio.Options{
		Creds:  credentials.NewStaticV4(accessId, secret, ""),
		Secure: false,
		// Region: region,
	}

	minioClient, err := minio.NewWithOptions(endpoint, &opts)

	if err != nil {
		log.Fatalln(err)
	}

	// LINODE_OBJECT_ENDPOINT=the-hoff.us-east-1.linodeobjects.com
	return minioClient, nil
}

// store an object in the simple object store.

/*
func
		    ctx := context.Background()
		    secret := os.Getenv("LINODE_OBJECT_SECRET")
		    accessId := os.Getenv("LINODE_OBJECT_ACCESS")
		    endpoint := os.Getenv("LINODE_OBJECT_ENDPOINT")

		    opts := minio.Options{
				Creds:  credentials.NewStaticV4(accessId, secret, ""),
				Secure: false,
		        Region: "us-east-2",
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
