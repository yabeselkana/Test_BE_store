<br />
<p align="center">

  <h3 align="center">Test BE Store</h3>
  <p align="center">
    <a href="https://github.com/yabeselkana/Test_BE_store.git"><strong>Explore the docs »</strong></a>
    <br />
    ·
    <a href="https://test-be-store.vercel.app/api/products >Api Demo</a>
  </p>
</p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Installation](#installation)
  - [Documentation](#documentation)
  - [Related Project](#related-project)
- [Contributors](#contributors)
  - [Meet The Team Members](#meet-the-team-members)

## Built With

These are the libraries and service used for building this backend API

- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com)
- [PostgreSQL](https://www.postgresql.org)
- [Json Web Token](https://jwt.io)
- [Multer](https://github.com/expressjs/multer)

# Installation

1. Clone this repository

```sh
git clone https://github.com/yabeselkana/Test_BE_store.git
```

2. Change directory to markisak-be

```sh
cd Store-BE
```

3. Install all of the required modules

```sh
npm install
```

4. Create PostgreSQL database, query are provided in [query.sql](./query.sql)

5. Create and configure `.env` file in the root directory, example credentials are provided in [.env.example](./.env.example)

```txt
- Please note that this server requires Google Drive API credentials and Gmail service account
- Otherwise API endpoint with image upload and account register won't work properly
```

6. Run this command to run the server

```sh
npm run server
```

- Or run this command for running in development environment

```sh
npm run dev
```

- Run this command for debugging and finding errors

```sh
npm run lint
```

# Api documentation

- users
- products
- categorys
- raks
- transaction

### Register users

```http
  POST test-be-store.vercel.app/api/users/register
```

Req Body Form:
| Key | Value |
| :-------- |:------------------------- |
| `email` | **Required**. email |
| `name` | **Required**. name |
| `phone` | **Required**. phone |
| `password` | **Required**. password |
| `confirmpasswordHash` | **Required**. confirmpasswordHash |

---

### Login

```http
  POST test-be-store.vercel.app/api/users/login
```

Req Body Form:
| Key | Value |
| :-------- | :------------------------- |
| `email` | **Required**. email |
| `password` | **Required**. password |

---

### Get all Product + Query

```http
  GET https://test-be-store.vercel.app/api/products ?search=''&searchBy=name&sortBy=created_at&sort=ASC
```

Query Params:
| Key | Description | Default Value
| :-------- | :------------------------- | :-------- |
| `search` | search query |null
| `searchBy` | search name |name
| `sortBy`| sort created_at |created_at
| `sort`| sort query |asc

---

### Get Product by Id

```http
 GET  https://test-be-store.vercel.app/api/products/:id
```

---

### Input Product

```http
  POST https://test-be-store.vercel.app/api/products
```

Auth:
|Key |Value |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |
Req Form-Data:
| Key | Description | Default Value
| :-------- | :------------------------- | :-------- |
| `name` | Sepeda | ''
| `stock` | 500 | ''
| `price` |40000| ''
| `id_category`| 1 | ''
| `id_locRak`| 1| ''

---

### Update Product

```http
  PUT https://test-be-store.vercel.app/api/products/:id
```

````

Auth:
|Key |Value |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |
Req Form-Data:
| Key | Description | Default Value
| :-------- | :------------------------- | :-------- |
| `name` | Sepeda | ''
| `stock` | 500 | ''
| `price` |40000| ''
| `id_category`| 1 | ''
| `id_locRak`| 1| ''



### Delete Product

```http
  DELETE https://test-be-store.vercel.app/api/products/:id
````

Auth:
|Key |Value |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |

---

## Documentation

Documentation files are provided in the [docs](./docs) folder

- [Postman API colletion]()
- [PostgreSQL database query](./query.sql)

API endpoint list are also available as published postman documentation

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/26301439/2s9YRCVqMa)

## Related Project

:rocket: [`Backend Store`](https://github.com/yabeselkana/Test_BE_store.git)
