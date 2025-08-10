import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Beans() {
  const [name, setName] = useState("");
  const [memo, setMemo] = useState("");
  const [remaining_amount, setRemainngAmount] = useState(0);
  const [expiration_date, setExpiration_date] = useState("");
  const navigate = useNavigate();

  const handleLogs = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // トークン取得
    if (!token) {
      alert("トークンが見つかりません。ログインしてください。");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/beans",
        {
          name,
          memo,
          remaining_amount,
          expiration_date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ここが大事！
          },
        }
      
      );
      alert("beans作成完了！");
      navigate("/beans/show");
    } catch (err) {
      alert("記録失敗: " + (err.response?.data || err.message));
    }
  };
  return (
    <div>
      <div className="coffee-container">
        <h1 className="title">☕ 在庫管理登録</h1>
        <button className="home-button" onClick={() => navigate("/index")}>
        ホームに戻る
      </button>
        <form onSubmit={handleLogs} className="coffee-form">
          <label>豆の種類</label>
          <input
            type="text"
            placeholder="例: モカ・シダモ"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>残量</label>
          <input
            type="number"
            placeholder="例: 10"
            value={remaining_amount}
            onChange={(e) => setRemainngAmount(Number(e.target.value))}
          />

          <label>賞味期限</label>
          <input
            type="text"
            placeholder="例: 2025-09-08"
            value={expiration_date}
            onChange={(e) => setExpiration_date(e.target.value)}
          />

          <label>メモ</label>
          <textarea
            placeholder="香りや味の特徴、印象など"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />

          <button type="submit">記録する</button>
        </form>
      </div>
    </div>
  );
}

export default Beans;
