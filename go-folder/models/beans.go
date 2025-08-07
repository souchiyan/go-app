package models

import "gorm.io/gorm"

type Beans struct {
	gorm.Model
	Name             string `json:"name"`
	Memo             string `json:"memo"`
	Remaining_Amount int    `json:"remaining_amount"`
	Expiration_Date  string `json:"expiration_date"`
	UserID           uint
}
