import axios from 'axios';
import React, {useState, useCallback} from 'react';
import {View, Text, TextInput, Image, Button, StyleSheet} from 'react-native';
import {Movie} from '../types';
import {addMovie} from '../redux/reducer';
import {Header, Screen} from '../components';
import {useAppDispatch} from '../redux/store';
import {debounce} from 'lodash';

export const SearchScreen: React.FC = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<string>('');
  const dispatch = useAppDispatch();

  const getMovies = async (name: string) => {
    setError('');

    if (!name) {
      setMovie(null);
      return;
    }

    try {
      const response = await axios.get<
        Movie | {Error: string; Response: string}
      >(`https://www.omdbapi.com/?t=${encodeURI(name)}&apikey=87c33340`);

      if ('Error' in response.data) {
        setError(response.data.Error);
      } else if ('Title' in response.data) {
        setMovie(response.data);
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleSearchChange = useCallback(
    debounce((queryText: string) => getMovies(queryText), 200),
    [],
  );

  return (
    <Screen>
      <Header title="Seach Movies" withBackBtn />
      <View style={styles.searchContainer}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          onChangeText={handleSearchChange}
          placeholder="Enter Movie Title..."
          style={styles.searchInput}
        />
      </View>
      <View>
        {movie && (
          <View style={styles.resultContainer}>
            {movie.Poster !== 'N/A' && (
              <Image style={styles.resultPoster} source={{uri: movie.Poster}} />
            )}
            <View style={styles.resultDetails}>
              <View>
                <Text style={styles.resultTitle}>
                  {movie.Title} ({movie.Year})
                </Text>
                <Text>Genre: {movie.Genre}</Text>
                <Text>Directed By {movie.Director}</Text>
              </View>

              <View>
                <Button
                  title="Add to list"
                  onPress={() => dispatch(addMovie(movie))}
                />
              </View>
            </View>
          </View>
        )}

        {error ? <Text>{error}</Text> : null}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 20,
  },
  searchInput: {backgroundColor: '#fff', paddingHorizontal: 20},
  resultContainer: {
    flexDirection: 'row',
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 16,
  },
  resultPoster: {width: 100, height: 150},
  resultTitle: {width: '100%', fontSize: 15, fontWeight: '700'},
  resultDetails: {flex: 1, padding: 8, justifyContent: 'space-between'},
});
