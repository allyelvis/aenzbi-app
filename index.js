import { AppRegistry } from 'react-native';
import runner from './runner';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => runner);
