# Typeform Clone 
A React-based application for presenting a series of questions with smooth scrolling.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Tech](#tech)
- [Lessons Learned](#lessons-learned)
- [Future optimizations](#future-optimizations)

## Overview

The Typeform clone is an interactive web application that displays a series of questions to the user. The application supports smooth scrolling between questions.

## Features

- Smooth scrolling between questions
- Progress bar to show completion status
- Error handling for required questions
- Keyboard navigation support

## Demo

A live demo of the project can be accessed [here](https://buildform-clone.vercel.app/).


## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/ksulakshana02/Buildform-clone.git
    ```

2. Navigate to the project directory:
    ```sh
    cd build-form
    ```

3. Install dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start the development server:
    ```sh
    npm run start
    ```

## File Structure

```plaintext
build-form/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── assets/
│   │   ├── check.svg
│   │   └── right-arrow.svg
│   ├── components/
│   │   ├── buttonContainer/
│   │   │   └── ButtonContainer.js
│   │   ├── errorContainer/
│   │   │   └── ErrorContainer.js
│   │   ├── progressBar/
│   │   │   └── ProgressBar.js
│   │   └── radioGroupInput/
│   │       ├── RadioGroupInput.js
│   │       └── RadioGroupInput.css
│   ├── hooks/
│   │   └── useIsInViewport.js
│   ├── App.js
│   ├── FullScroll.js
│   ├── FullScroll.css
│   └── index.js
├── .gitignore
├── package.json
└── README.md
```

## Tech
<p align="center">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" >
  <img src="https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white" >
  <img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white" >
</p>

## Lessons Learned
- In this project I learned how to create a multi-step form.
- I learned how to incorporate keyboards shortcuts that allow the user to quickly and efficiently progress through the form.

## Future optimizations
N/A

