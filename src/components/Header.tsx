import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export const Header: React.FC<{title: string; withBackBtn?: boolean}> = ({
  title,
  withBackBtn = false,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {withBackBtn && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.backIcon}
            source={{
              uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAAXNSR0IArs4c6QAAAYNJREFUSEvN1r1OFlEQgOEHaxO0UAlqgUIEQkW0UkMIJDYWWnEBeC2acA9gDDU/jRXEv0obKhsbGgoKEwuNCYEYyCRnk83h2293dfniNFts8r47c2bnzJBuYhLrmMAKXvbCDnXguocPGEmsU1y6CNl4Et3M4D2T+JfMxvARtzPRKl50mVkIQhTCcrzFc5x0JbuVSnc3A37GIn5X9UHbMt7Ae0xlwK+Yw49+DddGdj2JpjPgPh7hsK6zm8qu4R1mMuB3PMa3OlG8byK7il3MZsCfmMdeE1ET2RXs4H4GPMITfGoqqpMNJ9GDDPgHS9hoI6qTbeFZBoxRtIzXbUV1sl+4nEG300/7N66+DbLZA3xhmQ30zKJUVd14jKepgRqX9L/6z4qvHtgEKYRVs/EADxHPvtGkjGVATP1YAWLnKEfnU7+AV91nX7DQ5X1WCKtu6pij0aXRreeibRnLgDuppPkOspZGWqeygMWeGGc4mpE7364K/sD2xkIYO8mb0kb8qteZnQHdYUYcHVbS7wAAAABJRU5ErkJggg==',
            }}
          />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
  },
  title: {fontSize: 30, fontWeight: '700'},
  backIcon: {width: 20, height: 20, marginRight: 16},
});
