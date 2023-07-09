This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Nama Agahi Exclusive Platform
![Tux, the Linux mascot](/images/Logo.webp)

## Introduction

- This is a fully functional management dashboard application with role based and user based access control. 
- Development stage of this application started in May 2023 for the purpose of automating customized lifecycles and business models of Nama Agahi corporation based in IRAN-TEHRAN.
- First motive for developing this application was to centralize all financial and procedural processes which were done in paper or excel formats.

## Technologies

1. Client Side:
- Typescript 
- Next.js
- Tailwindcss
- Redux Toolkit
- React Hook Form
- Moment
- React Multi Datepicker
- React Toastify

2. Server Side:
- Express.js
- Mongoose
- bcrypt
- cors
- Jasonwebtoken
- Moment-Jalaali
- Dotenv

3- Database:
- MongoDB Compass

## Getting Started

1- Clone both client and server repositories.
2- Install dependencies in both directories:

```bash
npm install
# or
yarn 
# or
pnpm i
```
3- Set your own database, domain and port configurations.
- CLIENT: Modify `next.config.js`. env -- SERVER to your server address. Default: [http://localhost:3500](http://localhost:3500) 
- SERVER: Modify `.env`. -- DATABASE_URI to your mongodb URI.

4- Start both client and server side:

```bash
npm run start
# or
yarn start
# or
pnpm start
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

5- Create the main admin user to access to application using Postman. Using register api /users and post to the server:

```bash
{
    "name": " Hamidreza Hashemi ",
    "username" : "Hashemi",
    "password" : "76543",
    "roles" : ["Admin"]
}
```

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Sahel, a custom local font based in `public/fonts`

## Features
### User Authentication
### USER CRUD
### NOTES CRUD
### STRUCTURES CRUD
### BOXES CRUD

## Deploy on UBUNTU server

