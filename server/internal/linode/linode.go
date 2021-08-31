package linode

import (
	"bytes"
	"log"
	"os"

	"github.com/minio/minio-go"
	"github.com/minio/minio-go/pkg/credentials"
)

// create a minio client struct for the object store.
type MinioClient struct {
	Client *minio.Client
}

// Create the simple object store for Linode objects.
// Simple object store adheres to amazon S3 API.

// Use the minio client to initialize the simple object store.
// This is a singleton object.
func CreateMinioClient() (*MinioClient, error) {
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
	// return the MinioClient pointer
	return &MinioClient{minioClient}, nil
}

// Store object using the MinioClient with bucket-name the-hoff and provided bytes
func (m *MinioClient) PutObject(objectName string, objectBytes []byte) error {
	// store the object bytes in the bucket the-hoff
	// create reader from bytes
	reader := bytes.NewReader(objectBytes)
	_, err := m.Client.PutObject("the-hoff", objectName, reader, -1, minio.PutObjectOptions{})
	if err != nil {
		return err
	}

	return nil
}

// Get an object using the minioclient with bucket-name the-hoff and object-name
func (m *MinioClient) GetObject(objectName string) (*minio.Object, error) {
	// get the object from the bucket the-hoff
	obj, err := m.Client.GetObject("the-hoff", objectName, minio.GetObjectOptions{})
	if err != nil {
		return nil, err
	}

	// return the bytes from the buffer
	return obj, nil
}
