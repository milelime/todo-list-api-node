# Todo API in Node.js

This is a simple API for a todo list. It is built with Node.js, Express, and MySQL.

## Installation

1. Clone the repository: `git clone https://github.com/milelime/todo-list-api-node`
2. Install the dependencies: `npm install`
3. Create a MySQL database and run the queries in `database.sql`
4. Create a `.env` file in the root of the project and add the following:

```plaintext
JWT_EXPIRES_IN="1h"
JWT_SECRET="your_secret_key"

MYSQL_HOST="localhost"
MYSQL_PORT="3307"
MYSQL_USER="root"
MYSQL_PASSWORD="strong_password"
MYSQL_DATABASE="todo"
```

5. Start the server: `npm start`

## Usage

The API is documented in the JSdoc comments. You can read these also at:
[https://ayzintodoapp.neocities.org/](https://ayzintodoapp.neocities.org/)

## License

This project is open source and available under the [MIT License](LICENSE).

## Roadmap.sh

This project is based on [this project](https://roadmap.sh/projects/todo-list-api) from [Roadmap.sh](https://roadmap.sh)

The people over at roadmap are doing a great job and It's helped me engage more with the work I do.
