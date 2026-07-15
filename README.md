# Personal Book Library (ระบบจัดการคลังหนังสือส่วนตัว)

ระบบจัดการคลังหนังสือส่วนตัวที่พัฒนาขึ้นด้วย Node.js, Express และ MongoDB (Mongoose) ในฝั่ง Backend พร้อมหน้าจอแอดมินสำหรับการจัดการข้อมูลหนังสือด้วย React.js (Vite) ในฝั่ง Frontend โดยมีระบบการยืนยันตัวตนด้วย JWT (JSON Web Token) และรองรับการดักจับข้อผิดพลาดกรณีเซสชันหมดอายุเพื่อความปลอดภัยของข้อมูล

---

## 🔑 ข้อมูลสำหรับใช้ล็อกอินทดสอบ (Test Credentials)

เพื่อใช้ล็อกอินเข้าสู่ระบบในหน้าจอแอดมิน:
- **Username:** `admin`
- **Password:** `password123`

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```text
├── middleware/
│   └── auth.js         # Backend: ตรวจสอบความถูกต้องของ JWT Token
├── models/
│   └── Book.js         # Backend: Schema ข้อมูลหนังสือของ MongoDB
├── routes/
│   ├── auth.js         # Backend: ระบบ Login (/api/login)
│   └── books.js        # Backend: ระบบ CRUD หนังสือ (/api/books)
├── server.js           # Backend: ไฟล์หลักสำหรับเปิดเซิร์ฟเวอร์
├── .env                # Backend: ไฟล์เก็บตัวแปรสภาพแวดล้อมต่างๆ
│
├── frontend/           # โฟลเดอร์หน้าบ้าน (React + Vite)
│   ├── index.html      # เทมเพลต HTML พร้อมสไตล์ชีท Tailwind CSS
│   ├── vite.config.js  # ตั้งค่าตัวพัฒนาเว็บพร้อม Proxy ส่งคำขอ API
│   └── src/
│       ├── main.jsx    # ตัวควบคุมการเริ่มทำงานของ React App
│       ├── App.jsx     # ตัวควบคุม State หลัก, Auth Guard, และ Layout หน้าเว็บ
│       └── components/
│           ├── Login.jsx     # กล่องฟอร์มกรอกผู้ใช้/รหัสผ่าน
│           ├── BookForm.jsx  # ฟอร์มกรอกข้อมูลหนังสือใหม่
│           └── BookList.jsx  # ส่วนแสดงผลรายการหนังสือพร้อมปุ่มลบ
```

---

## 🛠️ ขั้นตอนการติดตั้งและรันระบบ

### 1. การตั้งค่า Environment Variables ฝั่ง Backend
สร้างไฟล์ `.env` ไว้ที่โฟลเดอร์นอกสุดของโปรเจกต์ (Root Directory) และกำหนดค่าดังนี้:

```env
PORT=5000
MONGODB_URI=mongodb+srv://Far:FarPass1234@cluster0.pzh7awi.mongodb.net/personal_book_library?appName=Cluster0
JWT_SECRET=supersecretjwtkey_37aa88161f
MOCK_USER=admin
MOCK_PASSWORD=password123
```

### 2. การติดตั้งและเริ่มรันระบบฝั่ง Backend (พอร์ต 5000)
1. เปิด Terminal หลักของโปรเจกต์
2. ติดตั้ง Dependencies:
   ```bash
   npm install
   ```
3. เริ่มต้นทำงานเซิร์ฟเวอร์หลังบ้าน:
   ```bash
   npm run dev
   ```
   * เมื่อรันสำเร็จ จะมีข้อความแสดงสถานะ: `Book library server is up and ready to roll`

---

### 3. การติดตั้งและเริ่มรันระบบฝั่ง Frontend (พอร์ต 3000)
1. เปิด Terminal หน้าต่างใหม่ (Tab ใหม่)
2. เข้าสู่โฟลเดอร์หน้าบ้าน:
   ```bash
   cd frontend
   ```
3. ติดตั้ง Dependencies (หากสัญญาณอินเทอร์เน็ตหลุด/บล็อก ให้ติดตั้งผ่าน Server สำรอง):
   * **คำสั่งแบบปกติ:**
     ```bash
     npm install
     ```
   * **คำสั่งสำรอง (หากเจอข้อผิดพลาด ECONNRESET):**
     ```bash
     npm install --registry=https://registry.npmmirror.com
     ```
4. เริ่มต้นทำงานเซิร์ฟเวอร์หน้าบ้าน:
   ```bash
   npm run dev
   ```
5. เปิดเบราว์เซอร์แล้วเข้าใช้งานที่ลิงก์: **`http://localhost:3000`**

---

### 📂 การทดสอบ API ด้วย Bruno
ในโฟลเดอร์ `api-collection/` มี API Collection สำหรับใช้งานกับแอปพลิเคชัน Bruno ประกอบด้วย:
- `POST /api/login` (เข้าสู่ระบบเพื่อรับ Token)
- `GET /api/books` (ดึงรายการหนังสือทั้งหมด)
- `POST /api/books` (เพิ่มหนังสือใหม่ - ต้องการ Bearer Token)
- `DELETE /api/books/:id` (ลบหนังสือออก - ต้องการ Bearer Token)

**วิธีใช้:**
1. เปิดโปรแกรม Bruno
2. เลือก **Open Collection** แล้วเลือกโฟลเดอร์ `api-collection/`
3. ในโปรแกรม ให้เลือก Environment เป็น `Local` จากมุมบนขวา เพื่อโหลด `baseUrl`
4. รัน `Login` เพื่อขอ Token และนำค่านั้นมาใส่แทนค่าตัวแปร `token` ใน Environment ของ Bruno

