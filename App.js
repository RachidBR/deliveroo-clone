import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import { Provider } from "react-redux";
import { store } from "./store";
import BasketScreen from "./screens/BasketScreen";
import PreparingOrderScreen from "./components/PreparingOrderScreen";
import DeliveryScreen from "./screens/DeliveryScreen";
import { LogBox } from 'react-native';

const Stack = createNativeStackNavigator();
export default function App() {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications
  return (
    <NavigationContainer>
      <Provider store={store}>
        <TailwindProvider>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
            <Stack.Screen
              name="Restaurant"
              component={RestaurantScreen}
            ></Stack.Screen>
            <Stack.Screen
              name="Basket"
              component={BasketScreen}
              options={{presentation:'modal',headerShown:false}}
              ></Stack.Screen>
            <Stack.Screen
              name="PreparingOrderScreen"
              component={PreparingOrderScreen}
              options={{presentation:'fullScreenModal',headerShown:false}}
              
            ></Stack.Screen>
            <Stack.Screen
              name="Delivery"
              component={DeliveryScreen}
              options={{presentation:'fullScreenModal',headerShown:false}}
              
            ></Stack.Screen>
          </Stack.Navigator>
        </TailwindProvider>
      </Provider>
    </NavigationContainer>
  );
}
