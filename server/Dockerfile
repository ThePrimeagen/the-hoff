############################
# STEP 1 build executable binary
############################
FROM golang:alpine AS builder
# Install git.
# Git is required for fetching the dependencies.
RUN apk update && apk add --no-cache git
WORKDIR /app

# Fetch dependencies.
# Using go get.
COPY go.mod .
COPY go.sum .
RUN go mod download

COPY . .

# Build the binary
RUN CGO_ENABLED=0 GOOS=linux GO111MODULE=on GOARCH=amd64 go build -a -ldflags '-extldflags "-static"' -o /app/bin/server cmd/server.go

############################
# STEP 2 build a small image
############################
FROM scratch

ENV PORT=1337

# Copy our static executable.
COPY --from=builder /app/bin/server /app/bin/server

EXPOSE 1337

# Run the server binary.
CMD ["/app/bin/server"]
