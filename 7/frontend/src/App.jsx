import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch products");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="spinner-border text-primary" role="status"></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Product Grid</h2>
      <div className="row">
        {products.map(p => (
          <div className="col-md-4 mb-3" key={p._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">${p.price}</p>
                <span className="badge bg-info">{p.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;