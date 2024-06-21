import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import DownloadScreen from './DownloadScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <DownloadScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
