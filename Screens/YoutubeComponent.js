// components/YouTubeEmbed.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'expo-router';

const YouTubeEmbed = ({ videoId }) => {
  return (
    <View style={styles.container}>
      <WebView
        style={styles.webview}
        source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
        allowsFullscreenVideo
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 220,
    marginBottom: 16,
  },
  webview: {
    flex: 1,
  },
});

export default YouTubeEmbed;
