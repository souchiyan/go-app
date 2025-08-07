import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/CoffeeShow.css";

function CoffeeShow() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
  const fetchLogs = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("トークンが見つかりません。ログインしてください。");
      return;
    }

    try {
      const res = await axios.get("http://localhost:8080/logs/show", {
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
      <h1 className="coffee-show-title">☕ コーヒーログ一覧</h1>
      <ul className="coffee-log-list">
        {logs.map((log, index) => (
          <li key={index} className="coffee-log-item">
            <h2 className="log-title">{log.title}</h2>
            <p><strong>豆の産地:</strong> {log.origin}</p>
            <p><strong>方法:</strong> {log.method}</p>
            <p><strong>評価:</strong> {log.rating} / 5</p>
            <p><strong>感想:</strong> {log.notes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CoffeeShow;
