# shop-web-api
This is an amateur work. Everything that was done was learned while doing it. Therefore, although it still has many shortcomings, it can generally meet the demands. You must have **[node](https://nodejs.org/en)** installed on your system for it to be ready to use. What you need to do next is to create a mongodb account and iyzico account for payment and database transactions. ([Iyzico](https://pages.github.com/](https://sandbox-merchant.iyzipay.com/auth/login
), [MongoDb](https://www.mongodb.com/cloud/atlas/lp/try4?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_core_prosp-brand_gic-null_emea-tr_ps-all_desktop_eng_lead&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624572&adgroup=115749712063&cq_cmp=12212624572&gad=1&gclid=CjwKCAiA6byqBhAWEiwAnGCA4FyfTLdmdIzbRFcpnZlvhpYssiYGSisy1I5MFfX5QvUnyUELfBA5hRoCrBgQAvD_BwE)). 

After all theese steps, you opend your terminal and go to this project directory. Run it:
```
npm install
```
This code is download all packages in _package.json_. When complete you will see *node_modules* folder in main directory. You need to make two edits. One of them is in file *config.env* in folder *config/env* folder:
```
URI = mongodb+srv://<username>:<password>@cluster0.o1smq.mongodb.net/test?retryWrites=true&w=majority
```
Update the username, password and test information in this code with your own. Username and password informations will give you by mongodb, test is your database name. Can be anything. And second is in *payment.js* in *controllers* folder:

```javascript
const iyzipay = new Iyzipay({
  apiKey: "api-key",
  secretKey: "seker-key",
  uri: "https://sandbox-api.iyzipay.com",
});
```
Update apiKey and secretKey properties in this code with your own. These information will give you by iyzico.

Now you are ready :)

Run the following code in your terminal: 
```
npm run dev
```
You will see your console  *server started port on 3000* and *database connection successful*. It is work.

<h2>Active endpoints</h2>

Base endpoint is **_localhost:3000/api_**

<h3>auth</h3>

```
POST  /auth/login
POST  /auth/register
POST  /auth/forgotpassword
POST  /auth/resetpassword?resetPasswordToken=your_password_token
```

*login* is waiting three parameters from you
```
{
    "model": "customer or admin or supplier",
    "email": "birincicustomer@gmail.com",
    "password": "1234567890"
}
```
and return you this response:
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmYxYWEwM2UyNTlmYWM4ZWQ5NjRiNyIsIm5hbWUiOiJiaXJpbmNpIiwic3VybmFtZSI6ImN1c3RvbWVyIiwiZW1haWwiOiJiaXJpbmNpY3VzdG9tZXJAZ21haWwuY29tIiwiaWF0IjoxNjk5NzA1NDA0LCJleHAiOjE2OTk3MDkwMDR9._9oHywAj6kzR5R9QCtjtsj1FUTonurmBzX_2wfrmhZM",
    "data": {
        "id": "642f1aa03e259fac8ed964b7",
        "email": "birincicustomer@gmail.com",
        "modelType": "customer"
    }
}
```

register is waiting six parameters from you
```
{
    "model":"customer or admin or supplier",
    "name": "besinci",
    "surname": "customer",
    "email": "besincicustomer@gmail.com",
    "password": "1234567890",
    "phone": "11111111111"
}
```
and return you this response:

```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGY3Mjk0YTY5OGZjYzQyNjE1ZjY3ZiIsIm5hbWUiOiJiZXNpbmNpIiwic3VybmFtZSI6ImN1c3RvbWVyIiwiZW1haWwiOiJiZXNpbmNpY3VzdG9tZXJAZ21haWwuY29tIiwiaWF0IjoxNjk5NzA1NDkzLCJleHAiOjE2OTk3MDkwOTN9.dDU4u5xshtg8Gd3Mm6_UAdANUZZloopGBNhLx5SYv2Y",
    "data": {
        "id": "654f7294a698fcc42615f67f",
        "email": "besincicustomer@gmail.com",
        "modelType": "customer"
    }
}
```

forgotpassword is waiting two parameters from you:

```
{
    "model":"customer",
    "email": "birincicustomer@gmail.com"
}
```
and return you this response:
```
{
    "success": true,
    "message": "eposta adresinize sıfırlama maili gönderildi"
}
```
to be continued...
