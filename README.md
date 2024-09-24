# Reflectify 
Reflectify is a comprehensive mood tracking and journaling app that empowers users to reflect on their emotions and mental well-being. It offers a simple and engaging interface where users can track their mood, visualize trends over time, write journal entries, and get personalized AI-generated insights. The app also includes wellness exercises like meditation and breathing techniques to help users relax.

# Installation
Prerequisites
- Before you begin, ensure you have the following:
    - Node.js and npm installed
    - MySQL set up and configured

## Backend Setup

### Clone this repository:
- git clone git@github.com:yoginak/Reflectify.git

### Navigate into the project directory:
- cd reflectify/server

### Install backend dependencies:
- npm install

### Create a .env file with your database and API keys:
- DB_HOST=your-database-host
- DB_USER=your-database-user
- DB_PASS=your-database-password
- DB_NAME=reflectify
- JWT_SECRET=your secret key
- CHATGPT_API_KEY=your-openai-api-key

### Run database migrations to set up your schema:
- knex migrate:latest

### Seed the database with any initial data (optional):
- knex seed:run

### Start the server:
- npm start

## Frontend Setup

### Navigate into the client directory
- cd client

### Install frontend dependencies:
- npm install

### Create a .env file with API localhost URL:
- VITE_API_URL = http://localhost:8080/

### Start the frontend
- npm run dev

#### Your app should now be running locally!

## How to Use
- Sign Up / Log In: 
    - Create an account to start tracking your moods and journaling.
- Track Mood: 
    - Choose a mood from the list and submit it to track how you're feeling.
- Write in Journal: 
    - Add journal entries to reflect on your thoughts and experiences.
- Reflect: 
    - check your previosly logged mood or journal entries.
- View Trends: 
    - Select a date range to visualize your mood trends using interactive charts. You can also download and share them.
- Get Insights: 
    - Receive personalized tips and insights from AI by answering emotional wellness checkin questionnaire.
- Uplift: 
    - Use meditation and breathing exercises to manage stress and improve mental well-being.

