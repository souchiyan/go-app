package main

import (
	"encoding/json"
	"fmt"
	"go-folder/database"
	jwtauth "go-folder/jwt"
	"go-folder/models"
	"log"
	"net/http"
)

func main() {
	database.InitDatabase()

	mux := http.NewServeMux()

	//非認証ルート
	mux.HandleFunc("/login", jwtauth.Login)
	mux.HandleFunc("/register", jwtauth.Register)

	//認証ルート
	mux.Handle("/logs", jwtauth.AuthenticateMiddleware(http.HandlerFunc(CoffeeLog)))
	mux.Handle("/logs/show", jwtauth.AuthenticateMiddleware(http.HandlerFunc(LogsShow)))
	mux.Handle("/beans", jwtauth.AuthenticateMiddleware(http.HandlerFunc(Beans)))
	mux.Handle("/beans/show", jwtauth.AuthenticateMiddleware(http.HandlerFunc(BeansShow)))

	// CORSを処理するミドルウェアをラップ
	handler := enableCORS(mux)
	log.Println("サーバー起動中: http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}

func CoffeeLog(w http.ResponseWriter, r *http.Request) {
	userID, ok := r.Context().Value(jwtauth.UserIDKey).(uint)
	if !ok {
		http.Error(w, "ユーザー情報が取得できません", http.StatusUnauthorized)
		return
	}

	var log models.CoffeeLog
	if err := json.NewDecoder(r.Body).Decode(&log); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	log.UserID = userID // ユーザーIDを紐づける

	if err := database.DB.Create(&log).Error; err != nil {
		http.Error(w, "保存失敗", http.StatusInternalServerError)
		return
	}

	fmt.Println("CoffeeLog作成完了")
}
func LogsShow(w http.ResponseWriter, r *http.Request) {
	userID, ok := r.Context().Value(jwtauth.UserIDKey).(uint)
	if !ok {
		http.Error(w, "ユーザー情報が取得できません", http.StatusUnauthorized)
		return
	}

	var logs []models.CoffeeLog
	if err := database.DB.Where("user_id = ?", userID).Find(&logs).Error; err != nil {
		http.Error(w, "データの取得に失敗しました。", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(logs)
}

func Beans(w http.ResponseWriter, r *http.Request) {
	userID, ok := r.Context().Value(jwtauth.UserIDKey).(uint)
	if !ok {
		http.Error(w, "ユーザー情報が取得できません", http.StatusUnauthorized)
		return
	}

	var beans models.Beans
	if err := json.NewDecoder(r.Body).Decode(&beans); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	beans.UserID = userID // ユーザーIDを紐づける

	if err := database.DB.Create(&beans).Error; err != nil {

		http.Error(w, "保存失敗", http.StatusInternalServerError)
		return
	}

	fmt.Println("Beans作成完了")

}

func BeansShow(w http.ResponseWriter, r *http.Request) {
	userID, ok := r.Context().Value(jwtauth.UserIDKey).(uint)
	if !ok {
		http.Error(w, "ユーザー情報が取得できません", http.StatusUnauthorized)
		return
	}

	var beans []models.Beans
	if err := database.DB.Where("user_id = ?", userID).Find(&beans).Error; err != nil {
		http.Error(w, "データの取得に失敗しました。", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(beans)
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
