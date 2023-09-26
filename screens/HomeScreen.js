import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { styles } from "../theme";
import MoviesTrending from "../components/MoviesTrending";
import MovieList from "../components/MovieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../api/moviedb";

const ios = Platform.OS == "ios";

const HomeScreen = () => {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setToprated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data && data.results) setTrending(data.results);
    setLoading(false);
  };
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    if (data && data.results) setUpcoming(data.results);
    setLoading(false);
  };
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    if (data && data.results) setToprated(data.results);
    setLoading(false);
  };
  return (
    <SafeAreaView style={safe.AndroidSafeArea}>
      <View className="flex-1 bg-neutral-800 pt-8">
        <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
          <StatusBar style="light" />
          <View className="flex-row justify-between items-center mx-4">
            <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
            <Text className="text-white text-3xl font-bold">
              <Text style={styles.text}>M</Text>ovies
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}
          >
            {trending?.length > 0 && <MoviesTrending data={trending} />}
            {upcoming?.length > 0 && (
              <MovieList title="Upcoming" data={upcoming} />
            )}

            {topRated?.length > 0 && (
              <MovieList title="Top Rated" data={topRated} />
            )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const safe = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
