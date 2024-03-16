import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { IconArrowNarrowRight } from "tabler-icons-react-native";
import tw from "twrnc";
import { ScrollView } from "react-native";
import RestaurantCard from "./RestaurantCard";
import client from "../sanity";

const FeaturedRow = (props) => {
  const { id, title, description } = props;

  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `
        *[_type == "feature" && _id == $id] {
      ...,
      restaurants[]->{
        ...,
        dishes[] ->,
        type-> {
          name
        }
      },
    }[0]
    `,
        { id: id }
      )
      .then((data) => {
        setRestaurants(data?.restaurants);
      });
  }, [id]);


  return (
    <View>
      <View style={tw`mt-4 flex-row items-center justify-between px-4`}>
        <Text style={tw`font-bold text-lg`}>{title}</Text>
        <IconArrowNarrowRight color="#00CCBB" />
      </View>
      <Text style={tw`text-xs text-gray-500 px-4`}>{description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        style={tw`pt-4`}
      >
        {restaurants.map((restaurant, index) => {
          return (
            <RestaurantCard
              id={restaurant._id}
              imgUrl={restaurant.image}
              title={restaurant.name}
              rating={restaurant.rating}
              genre={restaurant.genre}
              address={restaurant.address}
              short_description={restaurant.short_description}
              dishes={restaurant.dishes}
              long={restaurant.long}
              lat={restaurant.lat}
              key={`restaurant_card_${index}`}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
