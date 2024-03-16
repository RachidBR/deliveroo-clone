import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import { IconStarFilled, IconMapPin } from "tabler-icons-react-native";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

const RestaurantCard = (props) => {
  const {
    id,
    imgUrl,
    title,
    rating,
    genre,
    address,
    short_description,
    dishes,
    long,
    lat,
  } = props;

  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={(event) => {
        navigation.navigate("Restaurant", {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
        });
      }}
      style={tw`bg-white mr-3 shadow-sm`}
    >
      <Image
        source={{
          uri: imgUrl ? urlFor(imgUrl).url() : "-",
        }}
        style={tw`min-h-36 min-w-64 rounded-sm`}
      ></Image>
      <View style={tw`px-3 pb-4`}>
        <Text style={tw`font-bold text-lg pt-2`}>{title}</Text>
        <View style={tw`flex-row items-center gap-1`}>
          <IconStarFilled color="green" opacity={0.5} size={22} />
          <Text style={tw`text-xs text-gray-500`}>
            <Text style={tw`text-green-500`}>{rating}</Text> {genre}
          </Text>
        </View>

        <View style={tw`flex-row items-center gap-1`}>
          <IconMapPin color="gray" opacity={0.4} size={22} />
          <Text style={tw`text-xs text-gray-500`}>Nearby {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
