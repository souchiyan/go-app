import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/CoffeeShow.css";
import { useNavigate } from "react-router-dom";

function CoffeeShow() {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const fetchLogs = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("ログインしてください");

    try {
      const res = await axios.get(
        `http://localhost:8080/logs/show?page=${page}&limit=3`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLogs(res.data);
    } catch (err) {
      alert("取得失敗：" + (err.response?.data || err.message));
    }
  };

  useEffect(() => fetchLogs, [page]);

  const toggleFavorite = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `http://localhost:8080/logs/${id}/favorite`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchLogs(); // 更新
    } catch (err) {
      alert("お気に入り変更失敗：" + (err.response?.data || err.message));
    }
  };
  const deleteHandler = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:8080/logs/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchLogs();
    } catch (err) {
      alert("削除失敗" + (err.response?.data || err.message));
    }
  };

  return (
    <div className="coffee-show-container">
      <h1 className="coffee-show-title">☕ コーヒーログ一覧</h1>
      <button className="home-button" onClick={() => navigate("/index")}>
        ホームに戻る
      </button>
      <ul className="coffee-log-list">
        {logs.map((log) => (
          <li key={log.id} className="coffee-log-item">
            <h2 className="log-title">{log.title}</h2>
            <p>
              <strong>豆の産地:</strong> {log.origin}
            </p>
            <p>
              <strong>方法:</strong> {log.method}
            </p>
            <p>
              <strong>評価:</strong> {log.rating} / 5
            </p>
            <p>
              <strong>感想:</strong> {log.notes}
            </p>
            <button
              className="favorite-btn"
              onClick={() => toggleFavorite(log.id)}
            >
              {log.is_favorite ? "★ お気に入り" : "☆ お気に入り"}
            </button>
            <button
              className="favorite-btn"
              onClick={() => deleteHandler(log.id)}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          ← 前へ
        </button>

        <span>{page} ページ目</span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={logs.length < 3} // 1ページの件数に合わせて調整
        >
          次へ →
        </button>
      </div>
    </div>
  );
}

export default CoffeeShow;
