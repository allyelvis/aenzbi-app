# AENZBiApp

# Overview

AENZBi is a mobile business management and POS system built with React Native. It allows real-time sales invoice transactions and stock movement transactions, synchronized with an external endpoint using POST method and Bearer token authentication.

# Features

- Real-time sales invoice transactions
- Real-time stock movement transactions
- Bearer token authentication
- Integration with external endpoints

# Setup Instructions

# Prerequisites

- Node.js
- npm
- React Native CLI
- Java Development Kit (JDK) for Android development

# Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/allyelvis/aenzbi-app.git
    cd aenzbi-app
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Place your AENZBi logo**

    Place your logo image in the `assets/images` directory. Ensure it is named `logo.png`.

4. **Run the app**

    ```bash
    npx react-native run-android  # For Android
    npx react-native run-ios      # For iOS (requires macOS)
    ```

# Project Structure

```bash
AENZBiApp/
│
├── assets/
│   └── images/
│       └── logo.png
│
├── modules/
│   ├── initSales.js
│   └── initStock.js
│
├── screens/
│   ├── HomeScreen.js
│   ├── SalesScreen.js
│   └── StockScreen.js
│
├── App.js
├── runner.js
├── index.js
├── package.json
└── README.md
```

# License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please contact us at itsupport@aenzbi.bi.
# Enhancement log for aenzbi-app on Tue Dec  3 09:08:37 PM UTC 2024
