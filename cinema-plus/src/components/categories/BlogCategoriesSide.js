import axios from "axios";
import { clientSide } from "config/config";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { v4 } from "uuid";

const BlogCategoriesSide = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get(`${clientSide}/get/categories`).then((response) => {
      setCategories(response.data);
    });
  }, []);
  return (
    <>
      {categories.length > 0 &&
        categories.map((category) => {
          return (
            <p
              className="px-4 py-[8px] !font-normal text-[15px] text-white rounded-full bg-neutral-700 hover:bg-neutral-600"
              key={v4()}
            >
              {category.name}
            </p>
          );
        })}
    </>
  );
};

export default BlogCategoriesSide;
