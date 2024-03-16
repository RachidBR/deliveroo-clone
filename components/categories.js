import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import CategoryCard from "./CategoryCard";
import sanityClient, { urlFor } from "../sanity";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "category"]
    {

      ...
    }
    `
      )
      .then((data) => {
        setCategories(data);
      });
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
    >

      {categories.map((category, index) => {
        return (
          <CategoryCard
            key={`${index}_${category._id}_categories`}
            imgUrl={urlFor(category.image).width(200).url()}
            title={category.name}
          />
        );
      })}

    </ScrollView>
  );
};

export default Categories;
