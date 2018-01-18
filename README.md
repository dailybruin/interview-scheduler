# Interview Scheduler
An alternative to using When2Meet to schedule meetings and interviews

## Starting a dev environment
0. Make sure you have [yarn](https://yarnpkg.com/en/) and [Docker](https://www.docker.com) installed on your machine
1. Clone the repo using `git clone https://github.com/daily-bruin/interview-scheduler`
2. Use `cd interview-scheduler` to enter your project directory
3. Install all necessary dependencies by using the command `yarn install`
4. `yarn dev` will start instances of the Express server and the React client
5. Run `docker-compose up` to start the Postgres database