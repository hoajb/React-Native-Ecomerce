import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigation/MainNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useState } from 'react';
import CustomModal from './src/common/dialog/CustomModal';

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <MainNavigator />
        <CustomModal />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;