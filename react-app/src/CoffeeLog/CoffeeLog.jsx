import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 追加

import axios from "axios";
import "../styles/CoffeeLog.css";

function CoffeeLog() {
  const [title, setTitle] = useState("");
  const [origin, setOrigin] = useState("");
  const [method, setMethod] = useState("");
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState("");
  const navigate = useNavigate();


  const handleLogs = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/logs", {
        title,
        origin,
        method,
        notes,
        rating,
      });
      alert("作成完了！");
      navigate("/logs/show");
    
    } catch (err) {
      alert("記録失敗: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="coffee-container">
      <h1 className="title">☕ コーヒーログ</h1>
      <form onSubmit={handleLogs} className="coffee-form">
        <label>豆の種類</label>
        <input
          type="text"
          placeholder="例: モカ・シダモ"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>淹れ方</label>
        <input
          type="text"
          placeholder="例: ハンドドリップ"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label>豆の産地</label>
        <input
          type="text"
          placeholder="例: エチオピア"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />

        <label>感想</label>
        <textarea
          placeholder="香りや味の特徴、印象など"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <label>評価</label>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="">選択してください</option>
          <option value="1">★☆☆☆☆</option>
          <option value="2">★★☆☆☆</option>
          <option value="3">★★★☆☆</option>
          <option value="4">★★★★☆</option>
          <option value="5">★★★★★</option>
        </select>

        <button type="submit">記録する</button>
      </form>
    </div>
  );
}

export default CoffeeLog;
