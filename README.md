<div align="center">

  <img src="https://user-images.githubusercontent.com/54673205/169507707-07bcd3d1-5f62-4e1d-9e5f-d700ede5a5ec.png" width="300" height="300">

  <h1>Pokee</h1>
 
  <br/>
  A robust, speedy and simple Pokédex, made with ❤️ using Rust (backend) and ReactJS (frontend)  <br/>
  
  <br/>
  
</div>

## 🗒️ Overview:

### ○ Which parts are you most proud of? Why?

I am quite proud of the Rust backend, since I was able to implement all of the requirements to grab information from the PokéAPI whilst ensuring strict types, memory safety, and high performance. The compiled binary is also tiny! I really enjoyed designing with Figma and implementing the streamlined UI I created for the app; it’s responsive for a variety of screen sizes, whilst displaying key information (with images) for all Pokémon, with accessibility and ease of use in mind; and the best feature: dark mode, with persistence through local storage, because I don’t want to blind innocent TrueLayer employees.

### ○ Where did you spend more time? What was the most difficult?

I spent most of my time working on the backend, to ensure that any errors were considered and handled correctly, alongside working on some automated tests (testing is not documented incredibly well for some of the actix libraries). The workflow yml file with GitHub actions and the “all-in-one” Dockerfile with multiple stages also required some experimentation and research, since I wanted to bundle both the backend and frontend in one repo, without a lot of fiddling with commands from another developer contributing or trying to host the project.

### ○ How did you find the test overall? Did you have issues or difficulties completing it?

Overall, the test was fun and engaging; given the 1 week hand-in window, it was definitely challenging to implement everything on time to my typical standards; I did not put as much time into writing the amount of tests I would typically be content with, and there is definitely some further optimisation I can make on both the front and backend. However, the entire platform just feels fast and robust, and I would love to take it further and add more features and information to the Pokédex. Here is a screenshot of some future ideas I would like to work on:

![Component 1 (19)](https://user-images.githubusercontent.com/54673205/169543004-dbd648ef-7d72-4146-9eaf-8e611bf6ad36.png)

All of this data is available on PokéAPI, meaning that I would only have to make one extra request to get any remaining information about a Pokémon’s health, height, weight, type, and a lot more! I would also include favourites, sharing and Pokémon collections as a roadmap.


## :heavy_exclamation_mark: Prerequisites

This project requires npm to execute the files, so ensure that it is installed.


### 1. Ensure node and npm are installed by running the following commands in your terminal:

```sh
node -v
```
```sh
npm -v
```
If they are not installed, follow the steps on [npm Docs](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

### 2. To run end-to-end tests, please install 'serve' globally in your machine:

```sh
npm install -g serve
```
If you are getting some errors after using that command and you are on Linux/MacOS, try running it as a superuser (sudo)

### 3. You will also need Cargo, the package manager for Rust. It's a pretty neat tool!

#### The following command will work on Linux and macOS systems:

```sh
curl https://sh.rustup.rs -sSf | sh
```

#### If you are using Windows, please click on the following link to download rustup:

[https://win.rustup.rs](https://win.rustup.rs)

#### Further documentation: 
[https://doc.rust-lang.org/cargo/getting-started/installation.html](https://doc.rust-lang.org/cargo/getting-started/installation.html)

### 4. Afterwards, clone this repo:

```sh
git clone https://github.com/brunogrcsada/pokee
```

Now, you should have everything that you need to proceed! Navigate into the folder you just cloned to find the code :)
  
## :book: Getting Started

### Docker

You can run a single docker image for the back and frontend with the following commands:

```sh
docker build -t pokee .
docker run -p 2020:2020 -p 3001:3001 pokee
```

### 0. Before trying out any of the other commands:

```sh
npm install
```

### 1. Starting the Rust Actix web server:

#### For the purposes of this exercise, the server code is stored in the 'server' folder

```sh
cd server
cargo run
```

### 2. In the project directory, you can run:

```sh
npm start
```

Runs the app in the development mode. :point_up_2: \
Open [http://localhost:3001](http://localhost:3001) to view it in your browser.

The page will reload when you make changes.

### 3. To run any tests written for the backend, run the following command:

```sh
cargo test
```

### 3. To run logic and UI tests for the app, run the following command:

```sh
npm test
```
```sh
a
```
 
This launches the test runner in the interactive watch mode. :point_up_2: \
Clicking on the 'a' key runs all tests (excluding End-to-End tests).
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### 3. To view full tests and code coverage for the code:

```sh
npm test -- --coverage --watchAll=false
```

### 4. To run the E2E tests:
#### Note that the following command might be different depending on your Operating System:

```sh
npm run build
```
Builds the app for production to the `build` folder. :point_up_2: \
It correctly bundles React in production mode and optimizes the build for the best performance.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

```sh
cd server
cargo start
```

```sh
PORT=4221 serve -s build & npm run test:e2e
```

## Screenshots

![image 101](https://user-images.githubusercontent.com/54673205/169497514-136399f8-6108-4016-98e8-b0e5b7612666.png)

Responsive, Dark Theme      |  Responsive, Light Theme
:-------------------------:|:-------------------------:
![image 103](https://user-images.githubusercontent.com/54673205/169497520-50a2cb25-56bc-4073-9e00-f6a1d4037bd1.png)|![image 102](https://user-images.githubusercontent.com/54673205/169497524-46f5ab3b-c5d6-45ce-bf9f-be0cdd358e7c.png)
