import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/CoffeeShow.css";

function BeansShow() {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogs = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("トークンが見つかりません。ログインしてください。");
        return;
      }
      try {
        const res = await axios.get(`http://localhost:8080/beans/show?page=${page}&limit=3`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setLogs(res.data);
      } catch (err) {
        alert("取得失敗：" + (err.response?.data || err.message));
      }
    };

    fetchLogs();
  }, [page]);

  return (
    <div className="coffee-show-container">
      <h1 className="coffee-show-title">☕ 在庫一覧</h1>
      <button className="home-button" onClick={() => navigate("/index")}>
        ホームに戻る
      </button>
      <ul className="coffee-log-list">
        {logs.map((log, index) => (
          <li key={index} className="coffee-log-item">
            <p>
              <strong>豆の種類:</strong> {log.name}
            </p>
            <p>
              <strong>残量:</strong> {log.remaining_amount}g
            </p>
            <p>
              <strong>賞味期限:</strong> {log.expiration_date}
            </p>
            <p>
              <strong>メモ：</strong> {log.memo}
            </p>
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

export default BeansShow;
