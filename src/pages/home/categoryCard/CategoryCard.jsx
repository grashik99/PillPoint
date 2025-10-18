/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import useAuthInfo from "../../../hooks/useAuthInfo";
import CategorryCardCard from "./CategorryCardCard";
import { useEffect, useState } from "react";

const cetegoryCard = () => {
  const { categories } = useAuthInfo();
  const [counts, setCounts] = useState({});

  useEffect(() => {
    axios.get("https://pill-point-server-one.vercel.app/medicineCountsByCategory").then((res) => {
      const countMap = {};
      res.data.forEach((item) => {
        countMap[item._id] = item.count;
      });
      setCounts(countMap);
    });
  }, []);

  return (
    <div className="w-11/12 mx-auto">
      <h1 className="text-3xl md:text-5xl p-4 text-center">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 p-4">
        {Array.isArray(categories) && categories.map((cate) => (
          <CategorryCardCard key={cate._id} cate={cate} count={counts[cate.categoryName] || 0}></CategorryCardCard>
        ))}
      </div>
    </div>
  );
};
export default cetegoryCard;
