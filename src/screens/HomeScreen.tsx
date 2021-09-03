import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import {RootStackParamList} from '../../App';
import {useAppSelector} from '../redux/store';
import {Header, Screen} from '../components';
import {Movie} from '../types';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({navigation}: HomeScreenProps) => {
  const movies = useAppSelector(state => state.movies);

  const renderMovieItem = (item: Movie) => (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Details', {imdbID: item.imdbID})}>
        <Image style={styles.poster} source={{uri: item.Poster}}></Image>
      </TouchableOpacity>
    </View>
  );

  return (
    <Screen>
      <View style={styles.container}>
        <Header title="Favourites Movies" />
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Image
            style={styles.addIcon}
            source={{
              uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
            }}
          />
        </TouchableOpacity>
      </View>
      <View>
        {movies.length ? (
          <FlatList
            horizontal={true}
            data={movies}
            renderItem={({item}) => renderMovieItem(item)}
            keyExtractor={(item, index) => index + item.imdbID}
          />
        ) : (
          <Text>No favourites movies</Text>
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
  },
  addIcon: {width: 20, height: 20, marginBottom: 12, marginRight: 3},
  poster: {width: 110, height: 165, borderRadius: 5, marginRight: 8},
  button: {
    marginTop: 32,
    flexDirection: 'row',
  },
});
