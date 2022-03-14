import { Text, View, TouchableOpacity } from "react-native";
import { RootStackScreenProps } from "../types";

const NotFoundScreen = ({ navigation }: RootStackScreenProps<"NotFound">) => {
  return (
    <View>
      <Text>This screen doesn't exist.</Text>
      <TouchableOpacity onPress={() => navigation.replace("Root")}>
        <Text>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotFoundScreen;
