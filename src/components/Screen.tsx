import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';

export const Screen: React.FC = ({children}) => (
  <SafeAreaView>
    <StatusBar barStyle={'dark-content'} />
    <View style={styles.container}>{children}</View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 32,
  },
});
