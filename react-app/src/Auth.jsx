import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"
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
      alert("登録失敗: " + err.response?.data || err.message);
    }
    setName("")
    setPassword("")
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
      alert("ログイン失敗: " + err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h2>ログイン / 登録</h2>
      <input
        placeholder="名前"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>登録</button>
      <button onClick={handleLogin}>ログイン</button>
    </div>
  );
}
export default Auth;