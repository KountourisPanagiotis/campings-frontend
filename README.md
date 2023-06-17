# CampingsFrontend

## Athens University of Economics and Business ([AUEB](https://aueb.gr/)) 🏫 👨‍🎓
A [Coding Factory](https://codingfactory.aueb.gr/) @ [AUEB](https://aueb.gr/) Final Web Project. Angular - Typescript - Campings frontend site. ⛺⛺⛺

## Description
The Camping Frontend is a web application developed using Angular framework on the front-end and Java on the back-end. The back-end is provided on the [campings-backend](https://github.com/KountourisPanagiotis/campings-backend/blob/main/README.md) repository. The front-end provides a user-friendly interface for managing campgrounds, bookings, customers, staff, payments, and categories. The system allows users to perform various operations such as creating, updating, and deleting records, as well as viewing live statistics and reports.

## Features
- Campground Management: Add, update, and delete campgrounds.
- Booking Management: Create and manage bookings for customers.
- Customer Management: Manage customer information and track bookings.
- Staff Management: Add and update staff members.
- Payment Management: Record and track payments.
- Category Management: Manage different categories for campgrounds.
- Statistics: Generate statistics and reports for bookings and payments.

## Technologies Used

- Front-end: Angular
- Back-end: Java
- Database: MySQL
- UI Framework: Angular Material

## Additional Notes
- Angular Material Modules: The project utilizes various modules from Angular Material for UI components and styling.
- HttpClientModule: The HttpClientModule is used for making HTTP requests to communicate with the back-end services.
- RouterModule and Routes: The application utilizes the RouterModule to define and configure the application routes. The routes array in the app.module.ts file specifies the different paths and their corresponding components.
- MatSnackBarModule: The MatSnackBarModule from Angular Material is used for displaying pop-up messages (snack bars) in the application.

## Prerequisites

Before running the application, make sure you have the following software installed:

- Node.js: Install Node.js from the official website.
- Angular CLI: Install Angular CLI globally using npm.
- Java Development Kit (JDK)
- MySQL: Install and configure MySQL for the database.

## Getting Started
## Installation

Follow the steps below to set up and run the application:

1. Clone the repository:
```
git clone https://github.com/KountourisPanagiotis/campings-frontend.git
```
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.
2. Front-end Setup
  - Navigate to the campground-management-system/frontend directory.
  - Install dependencies using npm:
```bash
npm install
```
  - Start the Angular development server:
```bash
ng serve
```
3. Back-end Setup:
  - Import the backend project into your preferred Java IDE.
  - Update the database configuration in application.properties to match your MySQL setup.
  - Run the application.
4. Open the application in your browser @ `http://localhost:4200`

## Build 🔨

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
