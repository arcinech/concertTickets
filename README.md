Created backend for concert Tickets frontend.

For online demo please visit:

https://radiant-sands-96165.herokuapp.com/

All endpoint for backend server start with /api

To start backend server with nodemon run script:
yarn dev or npm dev

To start server with node node run script:
yarn start or npm start

To test production build run:
yarn build or npm build
after with: yarn start or yarn start

Localhost production:
Application will run on 
Frontend under localhost:8000/
Backend found under localhost:8000/api

Submiting new order will emit socketio info about all reserved seats.
Frontend seats component will update itself on listening to emit from server about update.
