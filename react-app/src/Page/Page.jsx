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
          <NavLink to="/cafemap" className="btn btn-map">
            カフェマップ
          </NavLink>
          <NavLink to="/logs/show" className="btn btn-map">
            コーヒーログ
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Page;
