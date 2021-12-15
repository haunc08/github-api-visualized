# A React front-end assessment

Tech stack: React, Apollo Client, GraphQL, Tailwind CSS. 

## Installation

In the project directory, you can run:

### `yarn`

To install the packages. While you're waiting, how about...

### Config your Github personal access token in .env file

`REACT_APP_GITHUB_PAT=`

### `yarn start`

To run the app.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Notes

### There are two layouts for the search page

As I see larger screens will get benefit from two columns layout and not every mouse users love horizontal scrolling, the search page will no have two layouts:

On laptop screen (>1204px):
![image](https://user-images.githubusercontent.com/94792870/146190153-bfef6152-ab1b-4192-86ad-c3d260291704.png)

On tablet & phone screen (<1024px):
![image](https://user-images.githubusercontent.com/94792870/146190359-8cfc489f-b90d-4ea9-b15a-23ffb7b4af7e.png)

### Github's search API sometimes returns duplicate pagination data

Even though I set the search's `start` param to be the `endCursor` of previous search, sometimes the new search still returns the last item of previous one. I'm afraid this is Github's fault, but I'm not sure. Correct me if I'm wrong.

### You can't jump directly to every page

Github API v4 doesn't support a mechanism for offset pagination, while also limits to 100 records per request. Therefore I limited the steps you can jump for the simplicity of this project.
https://github.community/t/graphql-api-offset-pagination/14412

