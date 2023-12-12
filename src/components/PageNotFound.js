import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="container mt-5 text-center">
      <div className="row">
        <h3>Sorry Not Found</h3>
        <Link to="/">Go back to Home</Link>
      </div>
    </div>
  );
}

export default PageNotFound;
