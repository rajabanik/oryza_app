import SignUpScreen from './Screens/SignUpScreen.js';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



export default function App() {
  const stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name='Sign Up ' component={SignUpScreen}/>
      </stack.Navigator>
    </NavigationContainer>
  );
}

