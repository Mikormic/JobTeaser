Before start the project you have to :

cd backend : 
- rm -rf node_modules
- npm update
- npm run dev
  
cd frontend/job-portal/ :
- rm -rf node_modules
- npm update
- npm run dev

It's just a 2 weeks project so there is a lot work to do, but if you want to create some data, you have to create a .env in backend file with :

DB_HOST=localhost
DB_USER=
DB_PASSWORD=
DB_NAME=JobTeaser 
PORT=3001

And for the frontend you have to create a .env.local if you want to try the send mail fonctionnality (with gmail):

NEXT_PUBLIC_EMAIL_USER=
NEXT_PUBLIC_EMAIL_PASS=

