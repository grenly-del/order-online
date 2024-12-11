# Authentikasi

ini adalah endpoint untuk mengatur authentikasi pada aplikasi

**Request Header**

```json
{
  "content-type": "application/x-www-form-urlencoded"
}
```

## POST regis

**POST** /api/v1/auth/regis

**Request Body**

```json
{
  "nama_pengguna": "grantly sorongan",
  "role": "kasir",
  "email": "edwardantonio1313@gmail.com",
  "password": "Grantly123"
}
```

<br>
<br>
Error (Nilai tidak valid)

```json
{
  "message": "Gagal",
  "error": {
    "issues": [
      {
        "validation": "email",
        "code": "invalid_string",
        "message": "format email tidak valid!",
        "path": ["email"]
      }
    ],
    "name": "ZodError"
  }
}
```

Error (Email telah terdaftar)

```json
{
  "message": "Gagal",
  "error": {
    "errorResponse": {
      "index": 0,
      "code": 11000,
      "errmsg": "E11000 duplicate key error collection: order_online.users index: email_1 dup key: { email: \"edwardantonio1313@gmail.com\" }",
      "keyPattern": {
        "email": 1
      },
      "keyValue": {
        "email": "edwardantonio1313@gmail.com"
      }
    },
    "index": 0,
    "code": 11000,
    "keyPattern": {
      "email": 1
    },
    "keyValue": {
      "email": "edwardantonio1313@gmail.com"
    }
  }
}
```

<br>
<span style="color: #1be028; font-weight: 600">Success</span>

email yang didaftarkan mendapatkan OTP

```json
{
  "message": "Berhasil mendaftarkan email",
  "email": "ardiand400@gmail.com"
}
```

## POST Cek Token

**POST** /api/v1/auth/cekotp

**Request Body**

```json
{
  "otp_email": "9545"
}
```

Error (Token tidak valid)

```json
{
  "message": "Gagal",
  "data": "OTP tidak valid"
}
```

Error (Melakukan request tanpa nilai)

```json
{
  "message": "gagal",
  "error": {
    "stringValue": "\"NaN\"",
    "valueType": "number",
    "kind": "Number",
    "value": null,
    "path": "otp_code",
    "reason": {
      "generatedMessage": true,
      "code": "ERR_ASSERTION",
      "actual": false,
      "expected": true,
      "operator": "=="
    },
    "name": "CastError",
    "message": "Cast to Number failed for value \"NaN\" (type number) at path \"otp_code\" for model \"otp\""
  }
}
```

## POST Buat Ulang Token (Refresh Token)

**POST** /api/v1/auth/getotp

**Request Body**

```json
{
  "email": "snakeeys070@gmail.com"
}
```

Error (Email tidak terdaftar)

```json
{
  "message": "Gagal",
  "error": "Email tidak ditemukan"
}
```

<br>
<span style="color: #1be028; font-weight: 600">Success</span>

```json
{
  "message": "Berhasil"
}
```

<br>
<br>
<br>

## POST Login

**POST** /api/v1/auth/login

**Request Body**

```json
{
  "email": "edwardantonio1313@gmail.com",
  "password": "gran123"
}
```

Error (Email tidak terdaftar)

```json
{
  "message": "Gagal",
  "error": "Akun tidak di temui"
}
```

Error (Password salah)

```json
{
  "message": "Gagal",
  "error": "Password salah"
}
```

<br>
<span style="color: #1be028; font-weight: 600">Success</span>

```json
{
  "message": "Berhasil",
  "data": {
    "tokenJwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVUzAwMSIsImlhdCI6MTczMzg5MDM1MCwiZXhwIjoxNzMzOTc2NzUwfQ.sdon7KNg2COgSIxU3YUdMrs9w6pi7TsfsIToF3EAfdU",
    "username": "Grantly Sorongan"
  }
}
```
