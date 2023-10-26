import React, { useEffect } from "react";
import { useProductContext } from "../context/productContext";
import { Card } from ".";

const Product = () => {
  const {
    sortsTypes,
    moreItems,
    sortedItems,
    groupedItemsArray,
    selectedCategory,
    activeSort,
    filterToggle,
    setFilterToggle,
    handleShowMoreClick,
    filterAndSortItems,
    handleSortClick,
    handleCategoryClick,
    productLoading,
  } = useProductContext();

  useEffect(() => {
    filterAndSortItems(selectedCategory, activeSort, groupedItemsArray);
  }, [selectedCategory, activeSort]);

  return (
    <>
      {!productLoading ? (
        <div className="container my-4  text-center px-sm-5  ">
          <div className="row align-items-center mb-3 m-0 ">
            {/* Category*/}
            <div className="col-sm-9 m-0 p-2 text-start">
              {groupedItemsArray.map((item, index) => (
                <button
                  key={index}
                  className={`btn rounded-5 btn-light  font-sm m-1 ${
                    selectedCategory.includes(item.category)
                      ? "text-black border border-1 border-secondary"
                      : "text-secondary"
                  }`}
                  onClick={() => handleCategoryClick(item.category)}
                >
                  {item.category}
                </button>
              ))}
            </div>

            {/* filterToggle */}
            <div className="col-sm-3 ms-auto p-0  position-relative ">
              <button
                className="btn btn-outline-secondary rounded-5  font-sm w-100 "
                onClick={() => setFilterToggle(!filterToggle)}
              >
                排序
              </button>
              <div className=" position-absolute d-flex flex-column  z-1 w-100 start-0  ">
                {filterToggle &&
                  sortsTypes.map((type, index) => (
                    <button
                      key={index}
                      className={`btn rounded-0 font-sm btn-light p-2 sortbtn  ${
                        type === activeSort ? "text-black" : "text-secondary"
                      }`}
                      onClick={() => handleSortClick(type)}
                    >
                      {type}
                    </button>
                  ))}
              </div>
            </div>
          </div>
          {/* 商品列表 */}
          {sortedItems && sortedItems.length > 0 && (
            <div className="row  row-cols-2  row-cols-lg-6 gy-2 justify-content-center ">
              {sortedItems.slice(0, moreItems).map((item) => (
                <Card item={item} key={item.id} />
              ))}
            </div>
          )}
          {/* 更多商品 */}
          {sortedItems && moreItems < sortedItems.length && (
            <button
              className="btn m-3 btn-outline-secondary rounded-5 font-sm"
              onClick={() => handleShowMoreClick(6)}
            >
              更多商品
            </button>
          )}
        </div>
      ) : (
        <div>loading</div>
      )}
    </>
  );
};

export default Product;
