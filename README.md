# Personal Book Library (ระบบจัดการคลังหนังสือส่วนตัว)

ระบบจัดการคลังหนังสือส่วนตัวที่พัฒนาขึ้นด้วย Node.js/Express (Backend) ร่วมกับ MongoDB (Mongoose) และ React.js (Frontend) โดยมีระบบยืนยันตัวตนด้วย JWT (JSON Web Token) และหน้าจอแอดมินสำหรับจัดการข้อมูลหนังสือ

---

## ข้อมูลสำหรับทดสอบเข้าสู่ระบบ (Credentials)

ใช้บัญชีทดสอบด้านล่างนี้ในการล็อกอินผ่านหน้าจอแอดมิน:
- **Username**: `admin`
- **Password**: `password123`

---

## โครงสร้างโปรเจกต์ (Project Structure)

```text
├── middleware/
│   └── auth.js         # Auth middleware สำหรับตรวจสอบ JWT Token
├── models/
│   └── Book.js         # Schema ของ Mongoose สำหรับข้อมูลหนังสือ
├── routes/
│   ├── auth.js         # Endpoint การยืนยันตัวตน (/api/login)
│   └── books.js        # Endpoints ของระบบหนังสือ (/api/books)
├── frontend/
│   └── src/
│       ├── App.jsx     # Component หลักจัดการ State, Auth Guard และ UI
│       └── components/
│           ├── Login.jsx     # Component แบบฟอร์ม Login
│           ├── BookForm.jsx  # Component แบบฟอร์มเพิ่มหนังสือ
│           └── BookList.jsx  # Component แสดงรายการหนังสือและปุ่มลบ
├── .env                # ไฟล์เก็บ Environment Variables
├── package.json        # Dependencies และ Scripts ของ Backend
└── server.js           # จุดเริ่มต้นหลักในการรันระบบ Backend
```

---

## ขั้นตอนการติดตั้งและการตั้งค่าโปรเจกต์

### 1. ตั้งค่า Environment Variables ของ Backend
สร้างไฟล์ `.env` ไว้ที่โฟลเดอร์หลักของโปรเจกต์ (Root Directory) และกำหนดค่าดังนี้:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/personal_book_library
JWT_SECRET=supersecretjwtkey_37aa88161f
MOCK_USER=admin
MOCK_PASSWORD=password123
```

### 2. การติดตั้งและเริ่มทำงานฝั่ง Backend
1. เปิด Terminal และเข้าไปที่โฟลเดอร์หลักของโปรเจกต์
2. ติดตั้ง dependencies:
   ```bash
   npm install
   ```
3. เริ่มรัน Backend เซิร์ฟเวอร์:
   * **โหมดพัฒนา (Development):**
     ```bash
     npm run dev
     ```
   * **โหมดใช้งานจริง (Production):**
     ```bash
     npm start
     ```
   * เมื่อเชื่อมต่อฐานข้อมูลสำเร็จ จะมี log ขึ้นว่า: `Book library server is up and ready to roll`

### 3. การติดตั้งและเริ่มทำงานฝั่ง Frontend
ในส่วนของ React.js (Frontend) ได้เตรียมโครงสร้างหลักไว้ในโฟลเดอร์ `frontend` สามารถนำไปประกอบร่วมกับเครื่องมือสร้างเว็บเช่น Vite หรือ Create React App ได้ตามความต้องการ:
1. เข้าไปที่โฟลเดอร์ฝั่ง frontend
2. ติดตั้ง dependencies ที่เกี่ยวข้อง:
   ```bash
   npm install react react-dom
   ```
3. รันโปรเจกต์ด้วยคำสั่งรันของเฟรมเวิร์กที่เลือก (เช่น `npm run dev` สำหรับ Vite)
4. ตรวจสอบให้แน่ใจว่าได้ทำการ Proxy คำขอไปยัง API ของ Backend (http://localhost:5000) เรียบร้อยแล้ว
