import { useNavigate } from "react-router-dom";
import "./404.css";

function ErrorPage() {
  let navigate = useNavigate();

  return (
    <div className="Error">
      <img className="notFoundImage" alt="logo" src="../images/404.png"></img>
      <h1>Oops! Seems like that page.... doesn't exist?</h1>
      <button onClick={() => navigate("/")} className="goBack" type="button">
        Go back home!
      </button>
    </div>
  );
}

export default ErrorPage;
