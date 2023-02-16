This is a test project for SRTX

## Getting Started

- First pull the repo and run npm install

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You will be prompted with a input field and button to search for two different github valid github users

## How to use the App

1. Enter a valid github user
2. Enter a second valid github user
3. Watch the app as the fetches for both users followers
4. It will display only the common followers to the users (You may click the followers links to there pages)

- There will be some validation where it will check if the users valid using github's apis
- There will also be a limited amount of calls being made per hour

checkout more of there apis here: https://docs.github.com/en/rest/overview/resources-in-the-rest-api?apiVersion=2022-11-28
