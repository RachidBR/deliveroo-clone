import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import Currency from "react-currency-formatter";
import { urlFor } from "../sanity";
import { IconCircleMinus, IconCirclePlus } from "tabler-icons-react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectedBasketItemsWithId,
} from "../features/basketSlice";
const DishRow = (props) => {
  const { id, name, description, price, image } = props;
  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useDispatch();

  const items = useSelector((state) => selectedBasketItemsWithId(state, id));

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };

  const removeItemFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket({ id }));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        style={tw`bg-white border p-4 border-gray-200 ${
          isPressed && "border-b-0"
        }`}
      >
        <View style={tw`flex-row`}>
          <View style={tw`flex-1 pr-2`}>
            <Text style={tw`text-lg mb-1`}>{name}</Text>
            <Text style={tw`text-gray-400`}>{description}</Text>
            <Text style={tw`text-gray-400 mt-2`}>
              <Currency quantity={price} currency={"EUR"} />
            </Text>
          </View>

          <View>
            <Image
              stlye={{
                borderWidth: 1,
                borderColor: "#F3F3F4",
              }}
              source={{ uri: urlFor(image).url() }}
              style={tw`h-20 w-20 bg-gray-300 p-4`}
            />
          </View>
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View style={tw`bg-white px-4`}>
          <View style={tw`flex-row items-center gap-2 pb-3`}>
            <TouchableOpacity disabled={!items.length} onPress={removeItemFromBasket}>
              <IconCircleMinus color={items.length >0 ? "#00CCBB" : "gray"} size={40} />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={addItemToBasket}>
              <IconCirclePlus color="#00CCBB" size={40} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
