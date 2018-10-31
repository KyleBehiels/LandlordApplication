# Landlord Application

A web application that allows landlords to manage tenants. Developed for COMP 3120 - Human Computer Interaction by Kyle Behiels, Joe Jacobson and Andrew Adamczyk.

## Development

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