# Book Management

API quản lý sách CRUD đơn giản, làm không xong khỏi đi phỏng vấn.

## I. Cài đặt môi trường

Bước nào đã làm rồi có thể bỏ qua.

#### 1. Cài đặt node

Vào trang sau tải phiên bản LTS về và cài đặt: [node](https://nodejs.org/en/download/current)

#### 2. Cài đặt thư viện của project

Clone repo này về, cd vào thư mục project rồi chạy lệnh sau để cài đặt thư viện

```node
npm install
```

#### 3. Cài đặt MYSQL

Vào đường dẫn sau để tải và cài đặt mysql 8: [mysql](https://dev.mysql.com/downloads/installer/)

- lưu ý: chọn phiên bản mysql-installer-community-8.0.34.0.msi

#### 4. Cài đặt git

Làm theo hướng dẫn vào cài đặt git trong trang sau: [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

#### 5. Cài đặt extension cho VSCode

Cài đặt các extension sau:

- VS Code eslint
- stylelint
- Prettier

Thêm các giá trị sau vào file settings.json:

- Trong VCode gõ tổ hợp phím ctrl + shift + p
- Trong input hiện ra, gõ vào settings -> chọn "Preferences: Open User Settings (JSON)"
- Thêm các giá trị sau vào:

```node
"editor.defaultFormatter": "esbenp.prettier-vscode",
"editor.formatOnPaste": true,
"editor.formatOnSave": true,
"editor.formatOnType": true
```

## II. Sử dụng

```rust

# chạy chương trình
npm run dev

# tạo database
npm run db:create database_name

# tạo file migration
npm run migrate:create create_foo_table

# chạy tất cả các file migration
npm run migrate:up

# hoàn tác chạy migration gần nhất
npm run migrate:down

# tạo dữ liệu tự động, chạy 1 file cụ thể
npm run db:seed:name src/utils/seeders/seed_file.js

# tạo dữ liệu tự động, chạy tất cả các file trong thư mục seeders
npm run db:seed:all
```

## III. Đóng góp

Từ từ tính sau

## IV. License

[MIT](https://choosealicense.com/licenses/mit/)
