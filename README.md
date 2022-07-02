## Movie-list

# For Backend
1. Go to backend folder: cd backend
2. Run `npm install`
3. Create a File .env . Add your postgres database url DATABASE_URL=<yor_postgres_database_url>
4. In .env file add another variable JWT_SECRET=<your_jwt_secret_string>
5. Run `npx prisma migrate dev` for migration.
6. Run `npx prisma db seed` for data seed. It will seed movies and users from `backend/data.ts`
7. Run `npx prisma studio` you can verify data in the database.
8. Run `npm run start:dev` to start the project. Project will be run in the `localhost:8080`
9. You will find swagger api documentation in `localhost:8080/api`

# For Front End
1. Go to client folder: cd client
2. Run `npm install`
3. Create a file .env and add `REACT_APP_BASE_URL=<add_api_url_port>`
3. Run `npm start` to run the application


# Areas of improvements
1. Making ui responsive will be great improvements. In that case we can use any ui library.
2. Now we cant delete or edit any movies on the DB. Adding this functionality will be so intuitive. As well as removing favorite movie once added for particular user.