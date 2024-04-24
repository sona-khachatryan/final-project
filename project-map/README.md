## Usage

### Development
To start the development server, run:
```
npm run dev
```
This command will start the development server and allow you to view the project in your browser. By default, the application will be available at http://localhost:3000.

### Linting
To run linting checks, execute:
```
npm run lint
```

## Folder Structure

### - components: 
Contains reusable React components used throughout the application, such as Header, Footer, etc.
### - app: 
Contains Next.js pages that correspond to different routes in the application. The **page.js** file serves as **the main route ("/")** of the app, while the **layout.js** file wraps the entire application. Everything, rendered inside layout.js is visible throughout all the routes of the application.
### - firebase: 
Contains a config.js file where the Firebase project is configured. 
### - redux: 
Contains Redux-related files:
- **store.js:** Configures the Redux store and combines reducers exported from different feature slices.
- **provider.jsx:** Wraps the Redux provider. Due to Next.js's limitations, the Redux provider cannot be directly added to layout.js, so it is wrapped in this file.
- **features:** Contains separate folders for each feature, including:

- - *FeatureName folder:*
- - - *FeatureName.jsx:* React component related to the feature.

- - - *featureSlice.js:* Redux slice containing actions, reducers, and selectors for the feature.
- - - *featureThunks.js* (if applicable): Contains asynchronous thunks related to the feature.

*Make sure to add the **'use client;**' directive at the top of all the files that include interactive UI, React hooks or manage state*

## Routing
- Next.js uses the app directory to define routes. **Each folder in the app directory represents a route in the application.**
- You can navigate to different pages in the application by accessing their corresponding route paths. For example, accessing **/home** will render the **page.js** file from the **home** folder located in the app directory.
- For nested routes or dynamic routes, you can use Next.js's built-in routing system and dynamic route parameters. For example, **[userName]** corresponds to the dynamic **/:userName** path.

## Environment Variables
The project uses a **.env** file to securely store environment variables, such as Firebase configuration details. 

**Every team member should create a .env file locally and include the necessary variables provided to them.** 

**Ensure that the .env file is added to the .gitignore file to prevent it from being pushed to GitHub.**

## Specific Features

## Redux Toolkit Integration
The project uses Redux Toolkit for state management.
- Create Redux slices for each feature in the corresponding folder in redux/features folder.
- Define actions, reducers, and selectors within each slice.
- Combine reducers in the redux/store.js file.
- Dispatch actions and access state using Redux hooks (useDispatch, useSelector) in your components.

Example usage:
```
// FeatureSlice.js
'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Initial state properties
};

const featureSlice = createSlice({
  name: 'feature',
  initialState,
  reducers: {
    // Define actions and corresponding reducers
  },
  extraReducers: (builder) => {}
});

export const { /* Action creators */ } = featureSlice.actions;
export default featureSlice.reducer;

```
```
// Component using Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../redux/features/featureSlice';

const MyComponent = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.feature.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    // Component rendering and data usage
  );
};

```
```
// FeatureThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDataFromAPI } from '../../api'; // Import your API function

// Example async thunk
export const fetchUserData = createAsyncThunk(
  'feature/fetchUserData',
  async (userId, thunkAPI) => {
    try {
      const response = await fetchDataFromAPI(userId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

```

## Firebase Firestore Integration

- The project integrates Firebase Firestore for storing and managing data.
- All Firebase configurations are set up in the *firebase/config.js* file. You can import the db object from this file to interact with Firestore.
- **To fetch real-time data of all places** from the Firestore database, you can use Redux actions defined in *redux/features/Places/placesThunk.js*, following this example.

```
import { useDispatch } from 'react-redux';
import { getAllPlaces } from '../redux/features/Places/placesThunk';

const MyComponent = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPlaces());
  }, [dispatch]); 

  return (
    // Component rendering and data usage
  );
};

```
- **To access the _allPlaces_ data in a component**: 
```
import { useSelector } from 'react-redux';

const allPlaces = useSelector(state => state.places.allPlaces);
```
- **To fetch specific place lists (e.g., visited or to be visited places),** 
```
  dispatch(getSpecificPlaceList({ visitStatus: 'visited', userId: userId }));
  // or
  dispatch(getSpecificPlaceList({ visitStatus: 'toBeVisited', userId: userId }));
```
- **To access the visited or to be visited place lists in a component**
```
const visitedPlaces = useSelector(state => state.places.visited);
// or
const toBeVisitedPlaces = useSelector(state => state.places.toBeVisited);
```
- **To fetch data for a single place, dispatch the getSinglePlace action:**
```
dispatch(getSinglePlace({ placeId: placeId }));
```
- **To access the single place data in a component:**
```
const singlePlace = useSelector(state => state.singlePlace.data);
```

## Linting Configuration

- The project utilizes linting tools to enforce coding standards and maintain code quality.
- We use ESLint for JavaScript linting and code formatting.
The linting configurations are defined in the project's root directory, in *.eslintrc.json* file.
- Some of the specific linting rules and coding standards enforced in the project include:
- - Use single quotes for string literals.
- - Terminate each statement with a semicolon.
- - Use strict equality checks (===) instead of loose equality checks (==).
- - Indentation is set to 3 spaces.
- - Avoid using var; prefer let and const for variable declarations.
- Before committing any changes, ensure that your code passes the linting checks to maintain consistency across the codebase.

## Version Control and Branching Strategy

- Each developer should work on a separate branch for each feature or bug fix.
- To create a new feature branch from the main branch, run:
```
git checkout -b feature/feature-name
```
**Replace feature-name with a descriptive name for your feature.**
- Develop and commit your changes on the feature branch.
- After committing your changes, push the feature branch to the remote repository:
```
git push origin feature/feature-name
```
_Make sure **to include the word 'origin'** to push the branch to the remote repository._
- Once the branch is pushed, go to GitHub and open a pull request (PR) for the newly created branch.
- Review the changes in the pull request and resolve any conflicts if necessary.
- After ensuring that there are no conflicts and the changes are ready to be merged, click on the "Merge" button on GitHub, or merge the branch from your CLI following the instructions provided by Git.

### Additional Version Control Guidelines
- Review the code changes made by your teammates before merging any pull requests.
- Write clear and descriptive commit messages to explain the purpose of each change.
- Regularly pull changes from the main branch into your feature branches to stay up-to-date with the latest codebase.