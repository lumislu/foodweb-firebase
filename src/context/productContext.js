import React from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

export const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductContextProvider = ({ children }) => {
  //所有商品分組
  const [allProducts, setAllProducts] = useState();
  const [groupedItemsArray, setGroupedItemsArray] = useState([]);

  // 篩選
  const sortsTypes = ["人氣商品", "最新上架", "價格低高", "價格高低"];
  const [filterToggle, setFilterToggle] = useState(false);
  const [activeSort, setActiveSort] = useState(sortsTypes[0]);
  const [selectedCategory, setSelectedCategory] = useState(["所有商品"]);
  const [sortedItems, setSortedItems] = useState();
  //收藏
  const [favoriteItems, setFavoriteItems] = useState([]);
  //購物車
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  //更多商品
  const [moreItems, setMoreItems] = useState(6);

  const [lastRequestTime, setLastRequestTime] = useState(0);
  const [productLoading, setProductLoading] = useState(false);

  //firebase獲取資訊
  const getAllProducts = async () => {
    try {
      const productsCollection = collection(db, "products");
      const productsSnapshot = await getDocs(productsCollection);

      const groupedItems = {
        所有商品: { category: "所有商品", items: [], images: [] },
      };

      productsSnapshot.forEach((doc) => {
        const product = doc.data();

        const { category, thumbnail } = product;

        if (!groupedItems[category]) {
          groupedItems[category] = { category, items: [], images: [] };
        }

        groupedItems[category].items.push(product);
        groupedItems[category].images.push(thumbnail);
        groupedItems["所有商品"].items.push(product);
        groupedItems["所有商品"].images.push(thumbnail);
      });

      const data = Object.values(groupedItems);
      console.log("獲取產品資訊");
      setGroupedItemsArray(data);
      setAllProducts(data[0].items);
      return data;
    } catch (error) {
      console.log(error, "獲取產品資訊失敗");
    }
  };

  // 根據分類和排序條件重新排序商品
  const filterAndSortItems = (
    selectedCategory,
    activeSort,
    groupedItemsArray
  ) => {
    let filteredItems = [];

    // //在所有類別中找到符合的category
    if (groupedItemsArray) {
      selectedCategory.forEach((category) => {
        const foundCategory = groupedItemsArray.find(
          (item) => item.category === category
        );
        //如有找到符合的分類將它的items合併在filteredItems
        if (foundCategory) {
          filteredItems = filteredItems.concat(foundCategory.items);
        }
        selectedCategory.filter((category) => category !== "所有商品");
      });
    }

    switch (activeSort) {
      case "人氣商品":
        filteredItems.sort((a, b) => b.rating - a.rating);
        break;
      case "最新上架":
        filteredItems.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        break;
      case "價格低高":
        filteredItems.sort((a, b) => a.price - b.price);
        break;
      case "價格高低":
        filteredItems.sort((a, b) => b.price - a.price);
        break;

      default:
        filteredItems.sort((a, b) => b.rating - a.rating);
        break;
    }

    setSortedItems(filteredItems);
    // 切換頁面重置
    setMoreItems(moreItems);

    return filteredItems;
  };

  // 排序按鈕
  const handleSortClick = (sort) => {
    setActiveSort(sort);
    filterAndSortItems(selectedCategory, sort);
    setFilterToggle(false);
  };
  //選擇分類
  const handleCategoryClick = (category) => {
    if (category === "所有商品") {
      // 點擊所有商品時，只選中所有商品
      setSelectedCategory(["所有商品"]);
    } else if (selectedCategory.includes("所有商品")) {
      // 如果 "所有商品" 已被選中，取消它並選中當前分類
      setSelectedCategory([category]);
    } else {
      // 切換其他選中狀態
      setSelectedCategory((prevSelected) => {
        if (prevSelected.includes(category)) {
          return prevSelected.filter((c) => c !== category);
        } else {
          return [...prevSelected, category];
        }
      });
    }
  };
  //找到符合id的商品
  const foundItem = (productId) => {
    if (groupedItemsArray && allProducts) {
      const result = allProducts.find(
        (item) => item.id === parseInt(productId)
      );
      return result;
    }
  };
  //找同類型商品且排除自己
  const foundSameCategory = (item) => {
    if (item && groupedItemsArray) {
      const result = allProducts.filter(
        (items) => items.category === item.category
      );
      return result;
    }
  };

  //添加星星
  const renderStars = (rating) => {
    const star = parseFloat(rating);
    const fullStars = Math.floor(star);
    const hasHalfStar = star % 1 >= 0.3 && star % 1 <= 0.8;
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-warning" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalf key="half" className="text-warning" />);
    }
    return stars;
  };

  //添加跟移除收藏
  const toggleFavorite = (itemId) => {
    setFavoriteItems((prevFavorites) =>
      prevFavorites.includes(itemId)
        ? prevFavorites.filter((id) => id !== itemId)
        : [...prevFavorites, itemId]
    );
  };

  //添加跟更新購物車
  const handleCartItems = (item, count) => {
    //添加購物車
    const addtoCart = (item, count) => {
      const newItem = {
        ...item,
        quantity: count || 1,
        total: item.price * (count || 1),
      };

      setCartItems([...cartItems, newItem]);
    };
    //更新購物車
    const findItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (findItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      const existingItem = updatedCartItems[findItemIndex];

      if (count) {
        existingItem.quantity = count;
      } else {
        existingItem.quantity += 1;
      }

      existingItem.total = existingItem.price * existingItem.quantity;
      setCartItems(updatedCartItems);
    } else {
      addtoCart(item, count);
    }
  };

  //移除購物車
  const removeCart = (item) => {
    // 如果返回 true，元素包含在新數组中
    // 如果返回 false，元素被排除在新數组之外
    setCartItems((prevcartItems) =>
      prevcartItems.filter((cartItem) => cartItem.id !== item.id)
    );
  };

  //購物車總額
  const calculateTotalPrice = () => {
    let totalPrice = 0;

    cartItems.forEach((item) => {
      totalPrice += item.total || 0;
    });

    setTotalPrice(totalPrice);
  };

  // morebtn
  const handleShowMoreClick = (nums) => {
    setMoreItems(Math.min(moreItems + nums, sortedItems.length));
  };

  //收藏跟分類class
  const favoriteAndCartClass = (addmsg, cartToggle, isfavorite) => {
    if (!addmsg) {
      return "bg-secondary";
    }
    if (isfavorite && !cartToggle) {
      return "bg-danger";
    }
    if (cartToggle) {
      return "bg-success";
    }
    return "bg-secondary";
  };

  const throttlingDownload = async () => {
    setProductLoading(true);
    const now = Date.now();
    if (now - lastRequestTime > 1000) {
      const data = await getAllProducts();

      filterAndSortItems(selectedCategory, activeSort, data);
      setLastRequestTime(now);
      setProductLoading(false);
    }
  };

  useEffect(() => {
    throttlingDownload();

  }, []);


  return (
    <ProductContext.Provider
      value={{
        allProducts,
        getAllProducts,
        sortsTypes,
        groupedItemsArray,
        renderStars,
        favoriteItems,
        setFavoriteItems,
        cartItems,
        setCartItems,
        toggleFavorite,
        handleCartItems,
        removeCart,
        totalPrice,
        calculateTotalPrice,
        handleShowMoreClick,
        filterAndSortItems,
        sortedItems,
        moreItems,
        handleSortClick,
        handleCategoryClick,
        selectedCategory,
        activeSort,
        filterToggle,
        setFilterToggle,
        setSelectedCategory,
        foundItem,
        foundSameCategory,
        favoriteAndCartClass,
        productLoading,
        setProductLoading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
