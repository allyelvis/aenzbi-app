EOL
)
create_file "runner.js" "$RUNNER_JS"

# Create modules/initSales.js
INIT_SALES_JS=$(cat <<EOL
export const initSales = () => {
  console.log('Sales module initialized');
  // Add any sales module initialization logic here
};
EOL
)
create_file "modules/initSales.js" "$INIT_SALES_JS"

# Create modules/initStock.js
INIT_STOCK_JS=$(cat <<EOL
export const initStock = () => {
  console.log('Stock module initialized');
   // Add any stock module initialization logic here
};
EOL
)
create_file "modules/initStock.js" "$INIT_STOCK_JS"

# Create screens/HomeScreen.js
HOME_SCREEN_JS=$(cat <<EOL
import React from 'react';
import { View, Text, Button, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={require('../assets/images/logo.png')} style={{ width: 200, height: 200 }} />
      <Button title="Sales" onPress={() => navigation.navigate('Sales')} />
      <Button title="Stock" onPress={() => navigation.navigate('Stock')} />
    </View>
  );
};

export default HomeScreen;
EOL
)
create_file "screens/HomeScreen.js" "$HOME_SCREEN_JS"

# Create screens/SalesScreen.js
SALES_SCREEN_JS=$(cat <<EOL
import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const SalesScreen = () => {
  const [saleData, setSaleData] = useState({ item: '', quantity: '', price: '' });

  const handleInputChange = (field, value) => {
    setSaleData({ ...saleData, [field]: value });
  };

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem('bearerToken');
    axios.post('http://yourserver.com/sales', saleData, {
      headers: {
        Authorization: \`Bearer \${token}\`
      }
    }).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.error(error);
    });
  };

  return (
    <View style={styles.container}>
      <Text>Enter Sale Details:</Text>
      <TextInput placeholder="Item" onChangeText={(value) => handleInputChange('item', value)} style={styles.input} />
      <TextInput placeholder="Quantity" onChangeText={(value) => handleInputChange('quantity', value)} style={styles.input} />
      <TextInput placeholder="Price" onChangeText={(value) => handleInputChange('price', value)} style={styles.input} />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10
  }
});

export default SalesScreen;
EOL
)
create_file "screens/SalesScreen.js" "$SALES_SCREEN_JS"

# Create screens/StockScreen.js
STOCK_SCREEN_JS=$(cat <<EOL
import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const StockScreen = () => {
  const [stockData, setStockData] = useState({ item: '', quantity: '' });

  const handleInputChange = (field, value) => {
    setStockData({ ...stockData, [field]: value });
  };

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem('bearerToken');
    axios.post('http://yourserver.com/stocks', stockData, {
      headers: {
        Authorization: \`Bearer \${token}\`
      }
    }).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.error(error);
    });
  };

  return (
    <View style={styles.container}>
      <Text>Enter Stock Details:</Text>
      <TextInput placeholder="Item" onChangeText={(value) => handleInputChange('item', value)} style={styles.input} />
      <TextInput placeholder="Quantity" onChangeText={(value) => handleInputChange('quantity', value)} style={styles.input} />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10
  }
});

export default StockScreen;
EOL
)
create_file "screens/StockScreen.js" "$STOCK_SCREEN_JS"

# Update App.js
APP_JS=$(cat <<EOL
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SalesScreen from './screens/SalesScreen';
import StockScreen from './screens/StockScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Sales" component={SalesScreen} />
        <Stack.Screen name="Stock" component={StockScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
EOL
)
create_file "
# Create and initialize React Native app
npx react-native init $FRONTEND_DIR

# Navigate to the frontend project directory
cd $FRONTEND_DIR

# Create directories
mkdir -p assets/images modules screens

# Create runner.js
RUNNER_JS=$(cat <<EOL
import { initSales } from './modules/initSales';
import { initStock } from './modules/initStock';

const initModules = () => {
  initSales();
  initStock();
};

const runApp = () => {
  import('./App').then(({ default: App }) => {
    App();
  });
};

const run = () => {
  initModules();
  runApp();
};

run();
EOL
)
create_file "runner.js" "$RUNNER_JS"

# Create modules/initSales.js
INIT_SALES_JS=$(cat <<EOL
export const initSales = () => {
  console.log('Sales module initialized');
  // Add any sales module initialization logic here
};
EOL
)
create_file "modules/initSales.js" "$INIT_SALES_JS"

# Create modules/initStock.js
INIT_STOCK_JS=$(cat <<EOL
export const initStock = () => {
  console.log('Stock module initialized');
  // Add any stock module initialization logic here
};
EOL
)
create_file "modules/initStock.js" "$INIT_STOCK_JS"

# Create screens/HomeScreen.js
HOME_SCREEN_JS=$(cat <<EOL
import React from 'react';
import { View, Text, Button, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={require('../assets/images/logo.png')} style={{ width: 200, height: 200 }} />
      <Button title="Sales" onPress={() => navigation.navigate('Sales')} />
      <Button title="Stock" onPress={() => navigation.navigate('Stock')} />
    </View>
  );
};

export default HomeScreen;
EOL
)
create_file "screens/HomeScreen.js" "$HOME_SCREEN_JS"

# Create screens/SalesScreen.js
SALES_SCREEN_JS=$(cat <<EOL
import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const SalesScreen = () => {
  const [saleData, setSaleData] = useState({ item: '', quantity: '', price: '' });

  const handleInputChange = (field, value) => {
    setSaleData({ ...saleData, [field]: value });
  };

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem('bearerToken');
    axios.post('http://yourserver.com/sales', saleData, {
      headers: {
        Authorization: \`Bearer \${token}\`
      }
    }).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.error(error);
    });
  };

  return (
    <View style={styles.container}>
      <Text>Enter Sale Details:</Text>
      <TextInput placeholder="Item" onChangeText={(value) => handleInputChange('item', value)} style={styles.input} />
      <TextInput placeholder="Quantity" onChangeText={(value) => handleInputChange('quantity', value)} style={styles.input} />
      <TextInput placeholder="Price" onChangeText={(value) => handleInputChange('price', value)} style={styles.input} />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10
  }
});

export default SalesScreen;
EOL
)
create_file "screens/SalesScreen.js" "$SALES_SCREEN_JS"

# Create screens/StockScreen.js
STOCK_SCREEN_JS=$(cat <<EOL
import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const StockScreen = () => {
  const [stockData, setStockData] = useState({ item: '', quantity: '' });

  const handleInputChange = (field, value) => {
    setStockData({ ...stockData, [field]: value });
  };

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem('bearerToken');
    axios.post('http://yourserver.com/stocks', stockData, {
      headers: {
        Authorization: \`Bearer \${token}\`
      }
    }).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.error(error);
    });
  };

  return (
    <View style={styles.container}>
      <Text>Enter Stock Details:</Text>
      <TextInput placeholder="Item" onChangeText={(value) => handleInputChange('item', value)} style={styles.input} />
      <TextInput placeholder="Quantity" onChangeText={(value) => handleInputChange('quantity', value)} style={styles.input} />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10
  }
});

export default StockScreen;
EOL
)
create_file "screens/StockScreen.js" "$STOCK_SCREEN_JS"

# Update App.js
APP_JS=$(cat <<EOL
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SalesScreen from './screens/SalesScreen';
import StockScreen from './screens/StockScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Sales" component={SalesScreen} />
        <Stack.Screen name="Stock" component={StockScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
EOL
)
create_file "App.js" "$APP_JS"

# Update index.js
INDEX_JS=$(cat <<EOL
import { AppRegistry } from 'react-native';
import runner from './runner';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => runner);
EOL
)
create_file "index.js" "$INDEX_JS"

# Install necessary packages
npm install axios @react-native-async-storage/async-storage @react-navigation/native @react-navigation/stack

# Navigate back to the base directory
cd ..

# Create and initialize backend
mkdir $BACKEND_DIR
cd $BACKEND_DIR

# Initialize backend project
npm init -y
npm install express body-parser cors

# Create server.js
SERVER_JS=$(cat <<EOL
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const sales = [];
const stocks = [];

// Sales Endpoint
app.post('/sales', (req, res) => {
  const { authorization } = req.headers;
  if (authorization === 'Bearer YOUR_BEARER_TOKEN') {
    sales.push(req.body);
    res.status(200).send({ message: 'Sale recorded' });
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
});

// Stock Endpoint
app.post('/stocks', (req, res) => {
  const { authorization } = req.headers;
  if (authorization === 'Bearer YOUR_BEARER_TOKEN') {
    stocks.push(req.body);
    res.status(200).send({ message: 'Stock movement recorded' });
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
EOL
)
create_file "server.js" "$SERVER_JS"

# Create README.md
README_MD=$(cat <<EOL