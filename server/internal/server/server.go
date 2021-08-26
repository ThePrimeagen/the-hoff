package server

// Uses gin, the Go web framework, to serve the API.
import (
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/theprimeagen/the-hoff/internal/animation"
)

// creates the gin router and returns it.  Should use port passed in.
func createRouter(port int) *gin.Engine {
	router := gin.Default()
	router.Use(gin.Recovery())
	router.Use(gin.Logger())
	router.Run(":" + strconv.Itoa(port))
	return router
}

var router *gin.Engine

func init() {
	// use the environment variable to determine the port to run on
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// convert the port to an int
	portInt, err := strconv.Atoi(port)
	if err != nil {
		panic(err)
	}

	// create the router
	router = ServeAPI(portInt)
}

// createAnimation
func createAnimation(c *gin.Context) *animation.AnimationSet {
	// get the animation from the request
	config := c.PostForm("animation")

	// json marshal the config into an animation.Animation
	animationSet, error := animation.ParseAnimationSet(config)

	if error != nil {
		return nil
	}

	return &animationSet
}

// serve the API and return the router
func ServeAPI(port int) *gin.Engine {
	router := createRouter(port)

	// add a create animation route
	router.POST("/animation", func(c *gin.Context) {
		// get the animation from the request
		animationSet := createAnimation(c)

		if animationSet == nil {
			c.JSON(400, gin.H{"error": "invalid animation"})
			return
		}

		// Save this to linode simple object store
	})

	return router
}
