package models

type CoffeeLog struct {
	ID         uint   `json:"id" gorm:"primaryKey"`
	Title      string `json:"title"`
	Origin     string `json:"origin"`
	Method     string `json:"method"`
	Notes      string `json:"notes"`
	Rating     string `json:"rating"`
	IsFavorite bool   `json:"is_favorite"`
	UserID     uint
}
