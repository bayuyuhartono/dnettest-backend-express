# dnettest-backend-express

## Kebutuhan
1. [Node.js](https://nodejs.org/en/)
2. [Express.js](https://expressjs.com/)
3. MySql
4. [Postman](https://www.getpostman.com/)
## Cara Install
Ikuti step berikut ini:
1. clone dari Github:
```
$ git clone https://github.com/bayuyuhartono/dnettest-backend-express.git
```
2. Pindah folder
```
$ cd dnettest-backend-express
```
3. install package
```
$ npm install
```
4. buat file .env dan isi credential dengan format seperti ini
```
DB_HOST = 
DB_USER = 
DB_PASSWORD = 
DB_DATABASE = 

BASE_URL = 
JWT_KEY = 
```
5. buat database dengan nama yg akan digunakan and Import file [bayu_crm.sql](https://github.com/bayuyuhartono/expressjs-restful-hiringChannelApp/blob/master/hiring_channel.sql). (nama database harus sama dengan yg diisi dalam file .env)
6. jalankan server server
```
$ npm start
```
