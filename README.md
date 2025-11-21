
# MERN Testing Project (Medium — Users + Posts)

This project is a medium complexity MERN app built for testing practice (assignment). It includes:
- Server: Express + Mongoose (users + posts)
- Client: React
- Tests: Jest (unit/integration), Supertest, mongodb-memory-server, Cypress E2E

Run server:
  - cd server && npm install
  - npm start

Run server tests:
  - cd server && npm test

Run client tests:
  - cd client && npm install
  - npm test

Notes:
- The server tests use an in-memory MongoDB instance and do not require a local MongoDB installation.
- The client Cypress test expects frontend to be running at http://localhost:3000
