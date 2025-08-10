import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/favorites.css";

function FavoriteList() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:8080/logs/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(res.data);
    } catch (err) {
      alert("お気に入り取得失敗：" + (err.response?.data || err.message));
    }
  };

  return (
    <div className="favorite-list-container">
      <h1 className="favorite-title">★ お気に入りコーヒー ★</h1>

      <button className="home-button" onClick={() => navigate("/index")}>
        ホームに戻る
      </button>

      {favorites.length === 0 ? (
        <p className="no-favorites">お気に入りはまだありません。</p>
      ) : (
        <ul className="favorite-items">
          {favorites.map((fav) => (
            <li key={fav.id} className="favorite-item">
              <h2 className="coffee-name">{fav.title}</h2>
              <p><strong>豆の産地:</strong> {fav.origin}</p>
              <p><strong>抽出方法:</strong> {fav.method}</p>
              <p><strong>評価:</strong> {fav.rating} / 5</p>
              <p className="coffee-notes">{fav.notes}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoriteList;
