import { Text, View } from "react-native";
import tw from "../lib/tailwind";

const Genre = ({ text }: { text: string }) => (
  <View style={tw`bg-indigo-500 rounded p-2 ml-4 mt-4`}>
    <Text style={tw`text-white`}>{text}</Text>
  </View>
);

export default Genre;
