# Landlord Application


A web application that allows landlords to manage tenants. Developed for COMP 3120 - Human Computer Interaction by Kyle Behiels, Joe Jacobson and Andrew Adamczyk.

## Development

### Getting this repository on your local machine.

## First time cloning the repository

1. Install git from [here](https://git-scm.com/downloads) for your system. Git itself is open source and will not ask you to install any bloatware. For that reason it is ok to click ok through the installation.

2. Open a terminal(MacOS or Linux) or Command Prompt (Windows).

3. Use cd to navigate to the directory where you want to store this repository.  

4. Run the command `git clone https://github.com/KyleBehiels/LandlordApplication` to clone the repo.

5. Run the command `cd LandlordApplication` to enter the repository directory
    - From here configure your git with `git config user.name <YOUR NAME>` and `git config user.email <YOUR EMAIL>` without angle brackets.
6. Install the projects dependencies with the command `npm install`

6. Start watching `SaSS` files for changes, and compiling if found by running `npm run watch-css`

7. Start the development server with `npm start`. This should open the application in your default web browser.

8. Open a text editor (I recommend [Visual Studio Code](https://code.visualstudio.com/) or [Sublime](https://www.sublimetext.com/).) Use your text editor to add the root folder (LandlordApplication) to your project workspace.

## Making changes to the code

1. IMPORTANT: Please, please run `git pull` before making ANY changes. If you don't do this we have to manually audit the changes and that's a pain. If the terminal returns `Already up-to date` then no one has pushed their code to the repository. Otherwise that command will pull other peoples code and apply them to your local repository. IF YOU FORGET TO DO THIS that is ok, just run the following commands `git stash` then `git pull` then `git stash apply`.

2. Make your changes!

3. Run these commands to push your code NOTE: Communal changes that are broken are much harder to fix! 
    - `git add --all` stage your changes for commit (local)
    - `git commit -m ""` commit your code. Make sure to include a meaningful commit message in the quotations describing the changes that you have made! (local)
    - `git push origin master` push the changes to the communal repository (communal)


### Installing NodeJS and NPM

For Windows and Mac - Download and install the executables from [here](https://nodejs.org/en/download/)
Linux - Should be in your package manager but check [here](https://nodejs.org/en/download/package-manager/)

### React

The react documentation is very well done and can be found [here](https://reactjs.org/docs/getting-started.html)

Our application is technically a Single Page Application (SPA) that uses the library [react-router-dom](https://www.npmjs.com/package/react-router-dom) and some tricks to achieve browser routing between pages. To understand how this works I would stronly recommend reading their [documentation](https://reacttraining.com/react-router/).

### Bootstrap and SaSS

We are using Bootstrap 4.0, it is fairly straightforward to implement and their [documentation](https://getbootstrap.com/docs/4.0/getting-started/introduction/) is well done.

The Bootstrap CSS and is imported into our custom.scss file.

```scss
@import "node_modules/bootstrap/scss/bootstrap";
```

Allowing us to edit and change certain elements. 

SaSS (.scss extension) code will be compiled using the [node-sass](https://www.npmjs.com/package/node-sass) and [nodemon](https://nodemon.io/) libraries. Scripts already exist inside the package.json file to automatically monitor, compile and reload the local development server when any file inside the `scss` directory is changed. 

### Development Server and SaSS monitoring 

NodeJS packages it's own development server for use with react applications. To start it simply run the command `npm start` from the project directory. This should open the web application in your systems default browser. 

If you want to monitor changes in SaSS, you need to start the nodesass compiler from the same directory. To do that run `npm run watch-css`


