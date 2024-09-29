# Bank Web App - React Frontend

## Description

The Bank Web App is a full-stack banking application that enables users to securely manage their finances online. This frontend is built with React and provides a user-friendly interface for interacting with the backend.

## Technologies Used

- **React**: For building the user interface.
- **Axios**: For making HTTP requests to the backend API.
- **Material-UI**: For implementing responsive and attractive UI components.
- **JWT**: For secure user authentication and authorization.

## Functionality

The application offers a range of banking functionalities, allowing users to perform essential operations smoothly:

1. **User Registration & Login**: 
   - New users can create accounts by providing their email, password, and phone number.
   - Existing users can log in using their credentials.

2. **Money Transactions**:
   - Users can send money to other registered users effortlessly.
   - The application supports deposits and withdrawals, allowing users to manage their account balances.

3. **Profile Management**:
   - Users can view their updated profile information and current balance.
   - Users can update their passwords for enhanced security.

4. **Admin Functions**:
   - Admin users can view all registered users and their transaction histories.
   - Admins have the ability to delete users by their ID.

## How It Works

1. **User Interface**: The application features a clean and intuitive user interface designed with Material-UI components, providing an engaging user experience.

2. **API Integration**: The frontend communicates with the backend API using Axios to handle user authentication, transactions, and profile management.

3. **Authentication**: 
   - Upon logging in, users receive a JWT token, which is stored securely in HTTP-only cookies.
   - The token is used for authenticating requests to protected routes on the backend.

4. **Real-Time Updates**: Users can see their transaction history and account balance updated in real-time, providing a seamless banking experience.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (the server must be running)

### 1. Clone the Repository

      git clone https://github.com/LeviMaor/BankWebAppFrontend.git
      cd BankWebAppFrontend

#### 2. Install Dependencies

Run the following command to install the required dependencies:
   
      npm install


### 3. Run the Server
Before running the React app, you need to run the backend server.


### 4. Start the React Application
   
      npm start
