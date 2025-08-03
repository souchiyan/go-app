package models

import "gorm.io/gorm"

type CoffeeLog struct {
	gorm.Model
	Title  string `json:"title"`
	Origin string `json:"origin"`
	Method string `json:"method"`
	Notes  string `json:"notes"`
	Rating string `json:"rating"`
	UserID uint
}
