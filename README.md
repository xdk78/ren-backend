# Senren Backend

<img src="https://img.shields.io/github/license/xdk78/senren-backend.svg?style=for-the-badge" alt="GitHub"/> <a href="https://github.com/xdk78/senren-backend/issues"><img src="https://img.shields.io/github/issues/xdk78/senren-backend.svg?style=for-the-badge" alt="GitHub issues" /></a>
<img src="https://img.shields.io/travis/xdk78/senren-backend.svg?style=for-the-badge" alt="Travis build" /></a>

## ✋ Contributing

If you want to help with the project, you can have a look at some [issues](https://github.com/xdk78/senren-backend/issues). All help is much appreciated 🍻

## 🏃 Running application

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [MongoDB v3.6](https://www.mongodb.com/download-center)

### 🤘 Let's start

- Clone repo</br>
   - Via https
    ```
    git clone https://github.com/xdk78/senren-backend.git
    ```
   - Via ssh
    ```
    git clone git@github.com:xdk78/senren-backend.git
    ```

- Now enter to app dir
  ```
  cd senren-backend
  ```
- Install depedencies
  ```
  npm i
  ```

- Create `.env` files ([example](.env.example) in repo)
  - for development `.env`
  - for production `.env.production`

- Running application
  ```
  npm run dev
  ```
- Running application in production mode
  ```
  npm run build && npm start
  ```
- Running linter
  ```
  npm run lint
  ```
- Running tests
  ```
  npm test
  ```

## Docs

[Docs](docs/index.md)

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
