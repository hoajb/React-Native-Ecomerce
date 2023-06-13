import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigation/MainNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomModal from './src/common/dialog/CustomModal';
import { Provider } from 'react-redux';
import store from './src/store/store';

function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <MainNavigator />
          <CustomModal />
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>

  );
}

export default App;