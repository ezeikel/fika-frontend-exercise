import { useEffect, useState } from "react";
import { TextInput, View } from "react-native";
import tw from "../lib/tailwind";
import Films from "../components/Films";

const FilmsScreen = () => {
  const [query, setQuery] = useState<string | undefined>();

  useEffect(() => {
    if (query === "") {
      setQuery(undefined);
    }
  }, [query]);

  return (
    <View style={tw`p-4 flex-1`}>
      <TextInput
        style={tw`
                  w-full px-6 py-4 mb-8 border bg-white border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        value={query}
        placeholder="Search for a film"
        onChangeText={setQuery}
        autoCapitalize="none"
      />
      <Films query={query} />
    </View>
  );
};

export default FilmsScreen;
