# Videos

## Introduction

The goal of this assignment is to develop a small React application displaying videos. The user can click on any of the videos to play them. The user can also edit the video information. In this repository you can find all the files and assets.

## Built with

- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Chakra-ui](https://chakra-ui.com/)
- [Strapi](https://strapi.io/)

## Installation

- This was developed with Node(`v14.17.3`). If you experience any issues, please try using this node version.
- Get a local copy of this repository by cloning the repo.
- In the terminal, navigate to the directory containing the code.
- Run `npm install` in the main folder, frontend folder and backend folder to install all the project dependencies. (Sorry I didn't create a script for this so you have to do it manually for now)
- Navigate back to the main code folder
- Run `npm run develop` to run the project in the browser in development mode.
- Open [http://localhost:3000](http://localhost:3000) to view the frontend and [http://localhost:1337/admin](http://localhost:1337/admin) to view the Strapi admin.

## Project decisions and considerations

### Chakra-ui.

I used Chakra-ui because it provides a number of customizable and reusable components that help in fast application development among other things.

### Prettier and eslint

I added prettier and eslint to help with code formatting, maintaining code quality and consistency.

### Folder structure

This being a small project, I chose a basic folder structure. I believe in using the right structure for the right product and adapting it / changing it as need arises. Please note that this assumes all the information one has at the time. If you're starting a big project then it makes sense to go with the ideal folder structure from the onset

### Commitlint

I added commitlint to help ensure that commits in the project follow a standard and consistent pattern. That would make it easy for all stakeholders to understand and communicate about.

## Checklist

- [x] Lists videos
- [x] View a specific video
- [x] Edit video information
- [x] Responsiveness

## Improvements I haven't gotten around to (Busy schedule)

- [ ] Adding tests
- [ ] Adding a video
- [ ] Adding Visual testing with Chromatic and Storybook for components
