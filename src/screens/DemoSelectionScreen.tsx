import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, Image, Platform } from 'react-native';
import { CameraOptions, ImageLibraryOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { DemoButton } from '../components/DemoButton';
import { DemoResponse } from '../components/DemoResponse';

interface DemoSelectionScreenProps { }

const DemoSelectionScreen = (props: DemoSelectionScreenProps) => {

  const [response, setResponse] = React.useState<any>(null);

  const onButtonPress = React.useCallback((type: string, options: CameraOptions | ImageLibraryOptions) => {
    if (type === 'capture') {
      launchCamera(options, setResponse);
    } else {
      launchImageLibrary(options, setResponse);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>🌄 React Native Image Picker</Text>
      <ScrollView>
        <View style={styles.buttonContainer}>
          {actions.map(({ title, type, options }) => {
            return (
              <DemoButton
                key={title}
                onPress={() => onButtonPress(type, options)}>
                {title}
              </DemoButton>
            );
          })}
        </View>
        <DemoResponse>{response}</DemoResponse>

        {response?.assets &&
          response?.assets.map(({ uri }: { uri: string }) => (
            <View key={uri} style={styles.imageContainer}>
              <Image
                resizeMode="cover"
                resizeMethod="scale"
                style={styles.image}
                source={{ uri: uri }}
              />
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

/* toggle includeExtra */
const includeExtra = true;

interface PickerAction {
  title: string;
  type: 'capture' | 'library';
  options: CameraOptions | ImageLibraryOptions;
}

const actions: PickerAction[] = [
  {
    title: 'Take Image',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: 'Select Image',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: 'Take Video',
    type: 'capture',
    options: {
      saveToPhotos: true,
      formatAsMp4: true,
      mediaType: 'video',
      includeExtra,
    },
  },
  {
    title: 'Select Video',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'video',
      formatAsMp4: true,
      includeExtra,
    },
  },
  {
    title: 'Select Image or Video\n(mixed)',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'mixed',
      includeExtra,
    },
  },
];

if (Platform.OS === 'ios') {
  actions.push({
    title: 'Take Image or Video\n(mixed)',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'mixed',
      includeExtra,
      presentationStyle: 'fullScreen',
    },
  });
}

export { DemoSelectionScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  imageContainer: {
    marginVertical: 24,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    flex: 1,
    marginVertical: 8,
  },

});
