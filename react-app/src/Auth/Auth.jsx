import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../styles/Auth.css"; 

function Auth() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:8080/register", {
        name,
        password,
      });
      alert(res.data.message);
    } catch (err) {
      alert("登録失敗: " + (err.response?.data || err.message));
    }
    setName("");
    setPassword("");
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8080/login", {
        name,
        password,
      });
      localStorage.setItem("token", res.data.token);
      alert("ログイン成功");
      navigate("/index");
    } catch (err) {
      alert("ログイン失敗: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">ログイン / 登録</h2>
      <input
        className="auth-input"
        placeholder="名前"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="auth-input"
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="auth-button-group">
        <button className="auth-button" onClick={handleRegister}>登録</button>
        <button className="auth-button login" onClick={handleLogin}>ログイン</button>
      </div>
    </div>
  );
}

export default Auth;
