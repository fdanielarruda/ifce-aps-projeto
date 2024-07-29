/**
 * @format
 */

import { registerRootComponent } from 'expo'
import { AppRegistry } from 'react-native'
import Navigation from './src/navigation'
registerRootComponent(Navigation)

import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => Navigation)