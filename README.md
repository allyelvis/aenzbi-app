# AENZBi Business Management System and POS App

## Overview

AENZBi is a mobile business management and POS system built with React Native. It allows real-time sales invoice transactions and stock movement transactions, synchronized with an external endpoint using POST method and Bearer token authentication.

## Features

- Real-time sales invoice transactions
- Real-time stock movement transactions
- Bearer token authentication
- Integration with external endpoints

## Setup Instructions

### Prerequisites

- Node.js
- npm
- React Native CLI
- Java Development Kit (JDK) for Android development

### Frontend Setup

1. **Clone the repository**

    ```bash
    git clone https://github.com/your-repository/aenzbi-app.git
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

### Backend Setup

1. **Navigate to the backend directory**

    ```bash
    cd backend
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Run the server**

    ```bash
    node server.js
    ```

### Deployment Instructions

To deploy the backend server:

1. **Create a Droplet on DigitalOcean**

    - Create a new Droplet and point your domain `server.aenzbi.bi` to the Droplet's IP address using an A record.

2. **Access Your Droplet**

    ```bash
    ssh root@your_droplet_ip
    ```

3. **Setup Environment on Droplet**

    ```bash
    apt update
    apt install -y nodejs npm
    ```

4. **Clone Backend Repository**

    ```bash
    git clone https://github.com/your-repository/aenzbi-backend.git
    cd aenzbi-backend
    npm install
    ```

5. **Run Your Server**

    ```bash
    node server.js
    ```

6. **Keep Server Running**

    ```bash
    npm install -g pm2
    pm2 start server.js
    pm2 startup
    pm2 save
    ```

### Environment Variables

- `YOUR_BEARER_TOKEN`: Replace this with the actual token you plan to use for authentication in `server.js`.

### Endpoints

- **Sales Endpoint**: `http://server.aenzbi.bi/sales`
- **Stock Endpoint**: `http://server.aenzbi.bi/stocks`

Replace `http://server.aenzbi.bi` with the actual URL of your backend server.

### Project Structure

```bash
AENZBiApp/
│
├── assets/
│   └── images/
│       └── logo.png
│
├── backend/
│   ├── node_modules/
│   ├── package.json
│   └── server.js
│
├── screens/
│   ├── HomeScreen.js
│   ├── SalesScreen.js
│   └── StockScreen.js
│
├── App.js
├── package.json
└── README.md
