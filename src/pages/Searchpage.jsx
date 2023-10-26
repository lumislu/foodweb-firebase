import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../context/productContext";
import { Card } from "../components";
const Searchpage = () => {
  const { allProducts } = useProductContext();
  const { query } = useParams();
  const [results, setResult] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (allProducts) {
      const filteredItems = allProducts.filter((item) => {
        return item.title.toLowerCase().includes(query.toLowerCase());
      });
      setResult(filteredItems);
    }
    setLoading(false);
  }, [query, allProducts]);

  return (
    <div className="container d-flex flex-column     flex-grow-1 my-4">
      {!loading && results ? (
        <div>
          <header className="row d-flex flex-column  gap-3">
            <h2>搜尋結果</h2>
            <span className="text-secondary">
              您搜尋的關鍵字為: <span className="fw-bold">{query}</span>
            </span>
            <span> 共找到{results.length}筆結果</span>
          </header>

          {results.length !== 0 ? (
            <section className="row row-cols-2 row-cols-md-4  row-cols-lg-6 gy-2 ">
              {results.map((item) => (
                <Card item={item} key={item.id} />
              ))}
            </section>
          ) : (
            <div className="d-flex align-items-center justify-content-center   justify-content-center flex-fill ">
              Ohhh,查無此資料：（
            </div>
          )}
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default Searchpage;
