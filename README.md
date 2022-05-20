<div align="center">

  <img src="https://user-images.githubusercontent.com/54673205/169507707-07bcd3d1-5f62-4e1d-9e5f-d700ede5a5ec.png" width="300" height="300">

  <h1>Pokee</h1>
 
  <br/>
  A robust, speedy and simple Pokédex, made with ❤️ using Rust (backend) and ReactJS (frontend)  <br/>
  
  <br/>
  
  [![Coverage Status](https://coveralls.io/repos/github/brunogrcsada/pokee/badge.svg?branch=main&t=Qks2yQ)](https://coveralls.io/github/brunogrcsada/pokee?branch=main)
 
  ![image 100](https://user-images.githubusercontent.com/54673205/169497380-1cf12f9d-d45d-4ac9-a4c3-eb7500dea619.png)
  
</div>

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
PORT=4221 serve -s build & npm run test:e2e
```

## Screenshots

![image 101](https://user-images.githubusercontent.com/54673205/169497514-136399f8-6108-4016-98e8-b0e5b7612666.png)

Responsive, Dark Theme      |  Responsive, Light Theme
:-------------------------:|:-------------------------:
![image 103](https://user-images.githubusercontent.com/54673205/169497520-50a2cb25-56bc-4073-9e00-f6a1d4037bd1.png)|![image 102](https://user-images.githubusercontent.com/54673205/169497524-46f5ab3b-c5d6-45ce-bf9f-be0cdd358e7c.png)
