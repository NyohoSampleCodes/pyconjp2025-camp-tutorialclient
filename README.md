# React Vite Client

This project is a React application built with Vite that allows users to query an API endpoint and display the results. The application provides a user-friendly interface for inputting queries and viewing responses.

## Project Structure

```
react-vite-client
├── src
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # Entry point of the React application
│   ├── components
│   │   ├── QueryForm.tsx     # Component for user input form
│   │   └── ResultDisplay.tsx  # Component for displaying API results
│   ├── types
│   │   └── index.ts          # TypeScript interfaces for API data
│   └── services
│       └── api.ts            # API service for making requests
├── index.html                 # Main HTML file
├── package.json               # npm configuration file
├── tsconfig.json             # TypeScript configuration file
└── vite.config.ts            # Vite configuration file
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd react-vite-client
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the application:**
   ```
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:8000` to view the application.

## Usage

- Use the input form to modify the "q" parameter and submit your query.
- The results from the API will be displayed below the form in a structured format.

## API Endpoint

The application makes a POST request to the `/multi-async` endpoint with the following JSON structure:

```json
{
  "key": "pyconjp2025",
  "q": "<your-query>",
  "options": {
    "models": [
      "gemini-2.0-flash", "gemini-1.5-flash"
    ],
    "roles": [
      "あなたは日本の中学生です。。", "あなたは数学者です。"
    ],
    "max_tokens": 1024
  }
}
```

## License

This project is licensed under the MIT License.