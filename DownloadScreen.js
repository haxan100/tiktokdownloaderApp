import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import RNFS from 'react-native-fs';
import cheerio from 'cheerio';

const DownloadScreen = () => {
  const [url, setUrl] = useState('https://www.tiktok.com/@funnycats0ftiktok/video/7299891446000127275');
  const [loading, setLoading] = useState(false);

  const fetchVideoUrl = async (url) => {
    try {
      const response = await fetch('https://dlpanda.com/id');
      const html = await response.text();
      const $ = cheerio.load(html);
      const token = $('#token').attr('value');

      const videoResponse = await fetch(`https://dlpanda.com/id?url=${url}&token=${token}`);
      const videoHtml = await videoResponse.text();

      if (videoHtml.match(/downVideo\(\'(.*?)\'/)) {
        const scriptDownload = videoHtml.match(/downVideo\(\'(.*?)\'/g);
        const video = scriptDownload[0].match(/downVideo\(\'(.*?)\'/)[1];
        return video;
      } else {
        throw new Error('Video URL not found');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch video URL');
      return null;
    }
  };

  const handleDownload = async () => {
    if (!url) {
      Alert.alert('Error', 'Please enter a valid URL');
      return;
    }

    setLoading(true);
    const videoUrl = await fetchVideoUrl(url);
    if (videoUrl) {
      const downloadFolder = RNFS.DownloadDirectoryPath;
      const videoFilename = `${downloadFolder}/${url.split('/').pop()}.mp4`;

      try {
        console.log(videoFilename)
        setLoading(false);
        Alert.alert('Success', `Video downloaded successfully to ${videoFilename}`);
      } catch (error) {
        console.error(error);
        setLoading(false);
        Alert.alert('Error', 'Failed to download video');
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TikTok Video Downloader</Text>
      <TextInput
        style={styles.input}
        placeholder="Paste TikTok video URL here"
        placeholderTextColor="#888" 
        value={url}
        onChangeText={setUrl}
        editable={!loading}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
          <Text style={styles.downloadButtonText}>Download</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
    color:'black'
  },
  downloadButton: {
    height: 50,
    backgroundColor: '#1e90ff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DownloadScreen;