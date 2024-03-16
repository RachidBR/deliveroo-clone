import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronDownIcon,
  UserIcon,
  AdjustmentIcon,
  SearchIcon,
} from "react-native-heroicons/outline";
import tw from "twrnc";
// import Categories from "../components/Categories";
import { IconAdjustmentsAlt, IconSearch } from "tabler-icons-react-native";
import Categories from "../components/categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "feature"] {
      ...,
     
    }
    `
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);


  return (
    <SafeAreaView style={tw`bg-white pt-5`}>
     
      {/* Header */}
      <View style={tw`flex-row pb-3 items-center mx-4 gap-2 px-4`}>
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          style={tw`h-7 w-7 bg-gray-300 rounded-full`}
        ></Image>

        <View style={tw`flex-1`}>
          <Text style={tw`font-bold text-gray-400 text-xs`}>Deliver Now!</Text>
          <Text style={tw`font-bold text-xl`}>
            Current Location!
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>

        <UserIcon size={35} color={"#00CCBB"} />
      </View>

      <View style={tw`flex-row items-center gap-2 pb-2 mx-4`}>
        <View style={tw`flex-row flex-1 gap-2  bg-gray-200 p-3`}>
          <IconSearch color="grey" size={20} style={tw`mr-2`} />

          <TextInput
            placeholder="Restaurants and cuisines"
            keyboardType="default"
          />
        </View>
        <IconAdjustmentsAlt color="#00CCBB" style={tw`ml-3`} />
      </View>

      {/* Body */}
      <ScrollView
        style={tw`bg-gray-100`}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <Categories />
        {/* Featured rows */}

        {featuredCategories?.map((category, index) => {
          return (
            <FeaturedRow
              key={index + "featured_row"}
              id={category._id}
              title={category.name}
              description={category.short_description}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
