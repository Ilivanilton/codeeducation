FROM golang:alpine AS builder
WORKDIR /app
COPY ./hello.go .
RUN go build hello.go

FROM scratch
COPY --from=builder /app/hello /app/hello
ENTRYPOINT ["/app/hello"]