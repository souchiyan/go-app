import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/CoffeeShow.css";

function BeansShow() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
  const fetchLogs = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("トークンが見つかりません。ログインしてください。");
      return;
    }

    try {
      const res = await axios.get("http://localhost:8080/beans/show", {
        headers: {
          Authorization: `Bearer ${token}`, // ← ここが重要！
        },
      });
      setLogs(res.data);
    } catch (err) {
      alert("取得失敗：" + (err.response?.data || err.message));
    }
  };

  fetchLogs();
}, []);

  return (
    <div className="coffee-show-container">
      <h1 className="coffee-show-title">☕ 在庫一覧</h1>
      <ul className="coffee-log-list">
        {logs.map((log, index) => (
          <li key={index} className="coffee-log-item">
            <p><strong>豆の種類:</strong> {log.name}</p>
            <p><strong>残量:</strong> {log.remaining_amount}g</p>
            <p><strong>賞味期限:</strong> {log.expiration_date}</p>
            <p><strong>メモ：</strong> {log.memo}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BeansShow;
