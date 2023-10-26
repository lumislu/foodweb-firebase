import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useProductContext } from "../context/productContext";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const { allProducts } = useProductContext();
  const navigate = useNavigate();

  const [openSearch, setOpenSearch] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //Debouncing
  function debounce(func, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  const debounceSearchResults = debounce((query) => {
    if (allProducts) {
      const findItems = allProducts.filter((item) => {
        if (item && item.title) {
          return item.title.toLowerCase().includes(query.toLowerCase());
        }
        return false;
      });
      setSearchResults(findItems);
    }
  }, 2000);

  // 選擇要搜索的項目
  const chooseQueryItem = (item) => {
    setQuery(item.title);
    setIsFocused(false);
  };

  //當input focus狀態解除時關掉input搜尋欄
  const handleFocusBlur = debounce(() => {
    setIsFocused(false);
    setOpenSearch(false);
    if (isFocused) {
      setQuery("");
    }
  }, 200);

  //提交搜尋
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      navigate(`/search/${query}`);
    }
  };

  const handleinput = (e) => {
    setQuery(e.target.value);
    if (query.trim() !== "") {
      debounceSearchResults(e.target.value);
    }
  };
  // console.log(sortedItems);

  return (
    <div className=" position-relative mb-2">
      <div className="d-flex">
        {!openSearch && (
          <button
            className=" d-block  btn btn-outline-dark border-0  bg-transparent  "
            onClick={() => setOpenSearch(true)}
          >
            <BsSearch />
          </button>
        )}
        {openSearch && (
          <form
            className=" search-input  bg-light px-2 smooth  "
            onSubmit={handleSubmit}
          >
            <span className=" bg-transparent text-center">
              <BsSearch />
            </span>
            <input
              type="search"
              className="bg-transparent  font-sm ms-1 "
              placeholder="搜尋產品"
              onChange={handleinput}
              onBlur={handleFocusBlur} //點到input以外的地方就取消focus
              onFocus={() => setIsFocused(true)}
              autoFocus
            />
            <button type="submit" className=" opacity-0 "></button>
          </form>
        )}
      </div>

      {isFocused && query.trim() !== "" && searchResults.length !== 0 && (
        <div
          className="position-absolute bg-white d-flex flex-column z-1 w-75"
          style={{ top: "2.5rem", right: "0.5rem" }}
        >
          {searchResults.map((item) => (
            <Link
              to={`/products/${item.id}`}
              className="btn font-sm bg-white btn-outline-secondary border-0 rounded-0"
              key={item.id}
              onClick={() => chooseQueryItem(item)}
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
