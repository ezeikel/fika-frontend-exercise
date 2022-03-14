import { View, Text, FlatList } from "react-native";
import FastImage from "react-native-fast-image";
import { BASE_IMAGE_URL } from "../constants";
import useFetchFilms from "../hooks/useFetchFilms";
import tw from "../lib/tailwind";
import Pill from "./Pill";

const Films = ({ query }: { query?: string }) => {
  const {
    isLoading,
    isError,
    films,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useFetchFilms(query);

  const renderSpinner = () => (
    <View>
      <Text>Loading more films..</Text>
    </View>
  );

  const renderItem = ({
    item,
  }: {
    item: {
      id: string;
      title: string;
      poster_path: string;
      genres: { id: string; name: string }[];
    };
  }) => {
    return (
      <View style={tw`bg-white rounded-lg shadow p-6 mt-8`}>
        <Text style={tw`text-gray-900 text-2xl font-extrabold mb-4`}>
          {item.title}
        </Text>
        <View style={tw`flex-row flex-wrap mb-8 -mt-4 -ml-4`}>
          {item.genres.map(({ id, name }: { id: string; name: string }) => (
            <Pill text={name} key={id} />
          ))}
        </View>
        <FastImage
          style={tw`h-80 w-full`}
          source={{
            uri: BASE_IMAGE_URL + item.poster_path,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    );
  };

  if (isError) {
    console.error(error);

    return (
      <View style={tw`bg-red-100 p-6`}>
        <Text style={tw`text-red-500 font-bold`}>Something went wrong 😳</Text>
      </View>
    );
  }

  return isLoading ? (
    <View>
      <Text>Loading films..</Text>
    </View>
  ) : (
    <View style={tw`flex-1 pt-6`}>
      {query && !films.length ? (
        <View style={tw`bg-red-100 p-6`}>
          <Text style={tw`text-red-500 font-bold`}>
            No films found for your search criteria.
          </Text>
        </View>
      ) : (
        <FlatList
          style={tw`-mt-8`}
          data={films}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          ListFooterComponent={isFetchingNextPage ? renderSpinner : null}
        />
      )}
    </View>
  );
};

export default Films;
