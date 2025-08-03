package main

import (
	"encoding/json"
	"fmt"
	"go-folder/database"
	"go-folder/jwt"
	"go-folder/models"
	"log"
	"net/http"
)

func main() {
	database.InitDatabase()

	mux := http.NewServeMux()
	mux.HandleFunc("/login", jwt.Login)
	mux.HandleFunc("/register", jwt.Register)

	//CoffeeLogs機能

	mux.HandleFunc("/logs", CoffeeLog)
	mux.HandleFunc("/logs/show", LogsShow)

	// CORSを処理するミドルウェアをラップ
	handler := enableCORS(mux)
	log.Println("サーバー起動中: http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}

func CoffeeLog(w http.ResponseWriter, r *http.Request) {
	var log models.CoffeeLog
	if err := json.NewDecoder(r.Body).Decode(&log); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}
	database.DB.Create(&log)
	fmt.Println("CoffeeLog作成完了")

}

func LogsShow(w http.ResponseWriter, r *http.Request) {

	var logs []models.CoffeeLog

	result := database.DB.Find(&logs)
	if result.Error != nil {
		http.Error(w, "データの取得に失敗しました。", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(logs)

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
