package main

import (
	"go-folder/database"
	"go-folder/jwt"
	"log"
	"net/http"
)

func main() {
	database.InitDatabase()

	mux := http.NewServeMux()
	mux.HandleFunc("/login", jwt.Login)
	mux.HandleFunc("/register", jwt.Register)

	// CORSを処理するミドルウェアをラップ
	handler := enableCORS(mux)

	log.Println("サーバー起動中: http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}

// ミドルウェア：すべてのリクエストにCORSヘッダーを付加
func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		// OPTIONSメソッドには早期レスポンス
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}
