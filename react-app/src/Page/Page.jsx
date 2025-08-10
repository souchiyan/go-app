import { NavLink } from "react-router-dom";
import "../styles/Page.css";

function Page() {
  return (
    <div className="page-container">
      <div className="card">
        <h1 className="title">☕ CoffeeLog ホーム</h1>
        <p className="subtitle">ようこそ、あなたのコーヒーライフを記録しましょう。</p>

        <div className="link-group">
          <NavLink to="/coffeelog" className="btn btn-log">
            コーヒーログ画面
          </NavLink>
          <NavLink to="/logs/show" className="btn btn-map">
            コーヒーログ
          </NavLink>
          <NavLink to="/logs/favorites" className="btn btn-map">
            お気に入り
          </NavLink>
          <NavLink to="/beans" className="btn btn-map">
            在庫管理登録
          </NavLink>
          <NavLink to="/beans/show" className="btn btn-map">
            在庫管理一覧
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Page;
