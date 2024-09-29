# React Express Template

## Technologies

### Front-end

1.  Vite React Typescript
2.  Redux - For state management
3.  React-Router-Dom - Routing
4.  Tailwindcss - For styling

### Back-end

1.  Express (Nodejs)
2.  Postgres - Database
3.  Typescript
4.  JWT - Authentication

## Run in your local environment

### Download

```
npx dlsiem-gear-second <my-app>
cd my-app
```

### Run the front-end

```
cd client
npm install
npm run dev
```

### Make sure to create .env credentials before runnning the back-end

```
PORT = 5000
DB_USERNAME = "your_db_username"
DB_PASSWORD = "your_db_password"
DB_NAME = "your_db_name"
DB_HOST = "localhost"
DB_PORT = 5432

JWT_SECRET = "your_secret"

```

### Run the back-end

```
cd server
npm install
npm run dev
```
