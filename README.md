# nhs-react-app

Mobile-first react application which provides the following views to its users:

1. Display details of a document
2. Present a list of action available for the document. As of now, only "Edit" is available.
3. Edit details of a document
4. Edit field where users can edit the information for a given field.

Since its a mobile-first application, its best viewed on a phone browser, and it works across all platforms.

As instructed in the task description to keep the use any libraries or frameworks to a minimum, I have used React Router library for navigation and routing requirements and everything else was developed using React features such as hooks.

The application uses React Context for passing the document data accross all the views, and LocalStorage for storing and processing of the data since the development of a backend application was out of the scope of this task. However, if I had to create a simple backend application for this task, I would have created it using Express (Node.js) / FastAPI (python) with a PostgreSQL database. The payload would be in JSON format using RESTful APIs.


# Getting Started with NHS React App

## Available Scripts

In the project directory, to install the packages and dependencies you can run:

### `yarn install`

In the project directory, to run the application you can execute the following:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.\
Please note, all the core functionality tests are available in src/views/**test**/\
Covered as much as possible in the given time frame using Jest, React Testing Library & User-Event Testing Library.

## Usage

Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

## Technologies Used

- yarn
- Create React App
- React.js
- Javascript
- Jest
- React Testing Library
- User-Event Testing Library
- HMTL5
- CSS
- Sass
- ESLint
- Babel
- Prettier
- Git
- Visual Studio Code
