FROM golang:latest

WORKDIR /go-folder

COPY go* ./

RUN go mod download

COPY . .

RUN go build -o main .

CMD ["./main"]


