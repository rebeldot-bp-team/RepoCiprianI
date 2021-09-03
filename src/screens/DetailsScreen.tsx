import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Button, Text, Image, StyleSheet} from 'react-native';
import {RootStackParamList} from '../../App';
import {removeMovie} from '../redux/reducer';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {Header, Screen} from '../components';

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

export const DetailsScreen = ({navigation, route}: DetailsScreenProps) => {
  const movies = useAppSelector(state => state.movies);
  const dispatch = useAppDispatch();

  const {imdbID} = route.params;

  const movie = movies.find(movie => movie.imdbID === imdbID);

  return (
    <Screen>
      <Header title={`${movie?.Title} (${movie?.Year})`} withBackBtn />
      {movie && (
        <View style={styles.container}>
          <Image style={styles.poster} source={{uri: movie.Poster}} />
          <View style={styles.detailsContainer}>
            <View>
              <Text style={styles.detailsPlot}>{movie.Plot}</Text>
              <Text>Directed By {movie.Director}</Text>
            </View>

            <View>
              <Button
                title="Remove from list"
                onPress={() => {
                  dispatch(removeMovie(movie.imdbID));
                  navigation.goBack();
                }}
              />
            </View>
          </View>
        </View>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 16,
  },
  poster: {width: 100, height: 150},
  detailsContainer: {
    paddingLeft: 8,
    flex: 1,
    justifyContent: 'space-between',
  },
  detailsPlot: {fontSize: 15, marginBottom: 8, fontWeight: '700'},
});
