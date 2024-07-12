# Xfit Fitness

## Introduction

Welcome to the Project repository!.
fitness application allows users to create, edit, and delete products. Users can filter products by category, minimum/maximum price, and search by product title. Additionally, users can add items to their cart and proceed to checkout directly from the cart.

This README file will guide you through the steps required to set up and run the project on your local computer.

## Features

- Api debouncing for the search functionality to reduce the number of API calls
- Cart management system
- Reload alert

## Technology Stack

- React js
- Typescript
- Shadcn
- tailwind CSS
- Readux toolkit & query

## Getting Started

To get started with the project, follow the instructions below:

### Prerequisites

Make sure you have the following software installed on your machine:

- Git
- Node.js (v20.9.0 recommended)
- Yarn or any package installer

### Cloning the Repository

First, clone the repository using the following command:

```
git clone https://github.com/sakibsarkar/XFit_client.git

```

### Installing Dependencies

Open the project file in terminal and run `yarn install`

```
yarn install

```

### Setting Up Environment Variables

Create a .env file in the root directory of the project and add your MongoDB credentials:

```
VITE_IMGBB_KEY=imgbb api key
VITE_BASE_API=https://xfit-backend.vercel.app/api/v1
VITE_STRIPE_PUBLISHABLE_KEY=your stripe Publish key
```

### Running the Project

Once you have set up the environment variables, you can run the project locally.

```
yarn dev

```

### Accessing the Project

```
http://localhost:5173
```
