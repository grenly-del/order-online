# Produk

ini adalah path untuk melakukan pengelolahan produk dan juga untuk menampilkan semua isi produk

## GET Produk

**GET** /api/v1/order/products

Success

```json

  "message": "Berhasil",
  "data": [
    {
      "id_produk": "MA002",
      "nama_produk": "Mie Goreng Double",
      "harga_produk": 18000,
      "stok_produk": 17,
      "stok_terjual": 0,
      "jenis_produk": "makanan",
      "image_produk": "products/makanan/1733886853366-mie-goreng-single.jpg",
      "__v": 0
    }
  ]

```

## POST Produk

**POST** /api/v1/order/products  
ini adalah endpoint yang membutuhkan Token untuk akses.

**Request Header**

```json
{
  "content-type": "multipart/form-data",
  "Authorization": "barrer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVUzAwMSIsImlhdCI6MTczMzg4Njc3NiwiZXhwIjoxNzMzOTczMTc2fQ.Wc7OC-omUqGHSer1pdtJKABjWLhzD"
}
```

**Request Body**

```json
{
    "nama": "Mie Goreng Single",
    "harga": 18000,
    "stok": 18,
    "jenis": "makanan",
    "image": file_upload(image)
}

```

Error (Tidak memiliki token)

```json
{
  "message": "Tidak memiliki akses"
}
```

Error (Token salah)

```json
{
  "message": "Token tidak valid"
}
```

Error (Tidak memiliki File/Image)

```json
{
  "message": "No files uploaded"
}
```

Error (Produk sudah ada)

```json
{
  "message": "terjadi kesalahan",
  "error": {
    "errorResponse": {
      "index": 0,
      "code": 11000,
      "errmsg": "E11000 duplicate key error collection: order_online.products index: nama_produk_1 dup key: { nama_produk: \"Mie Goreng Double\" }",
      "keyPattern": {
        "nama_produk": 1
      },
      "keyValue": {
        "nama_produk": "Mie Goreng Double"
      }
    },
    "index": 0,
    "code": 11000,
    "keyPattern": {
      "nama_produk": 1
    },
    "keyValue": {
      "nama_produk": "Mie Goreng Double"
    }
  }
}
```

<br>
<span style="color: #1be028; font-weight: 600" >Success</span>

```json
{
  "message": "Berhasil menambahkan produk",
  "nama_produk": "Mie Goreng Single"
}
```
