
# Vue Project

Dự án này là một ứng dụng mẫu sử dụng **Vue 3**, **Vite** và **Tailwind CSS**, nhằm mục đích học tập và thực hành phát triển ứng dụng web hiện đại với Vue.js.

## 🚀 Demo

Truy cập bản demo trực tuyến tại: [https://vue-project-three-woad.vercel.app](https://vue-project-three-woad.vercel.app)

## 🛠️ Công nghệ sử dụng

- [Vue 3](https://vuejs.org/) với cú pháp `<script setup>`
- [Vite](https://vitejs.dev/) – công cụ build siêu nhanh
- [Tailwind CSS](https://tailwindcss.com/) – framework CSS tiện lợi
- Cấu trúc thư mục chuẩn cho dự án Vue

## 📂 Cấu trúc thư mục

```
vue-project/
├── public/             # Tài nguyên tĩnh
├── src/                # Mã nguồn chính
│   ├── api/            # Fetch API
│   ├── assets/         # Hình ảnh, CSS, v.v.
│   ├── components/     # Các component Vue
│   ├── pages/          # Các trang 
│   ├── router/         # cài đặt Router
│   ├── stores/         # quản lý state toàn cục
│   ├── App.vue         # Component gốc
│   └── main.js         # Điểm khởi đầu ứng dụng
├── index.html          # Tệp HTML chính
├── package.json        # Thông tin dự án và dependencies
├── tailwind.config.js  # Cấu hình Tailwind
└── vite.config.js      # Cấu hình Vite
```

## ⚙️ Cài đặt & chạy dự án

### 1. Clone dự án

```bash
git clone https://github.com/NBStorm/vue-project.git
cd vue-project
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Khởi chạy ứng dụng

```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:5173/` (hoặc cổng được chỉ định trong terminal).

## 📦 Build cho production

```bash
npm run build
```

Thư mục `dist/` sẽ chứa các tệp đã được build sẵn sàng để triển khai.

## 📚 Tài liệu tham khảo

- [Hướng dẫn Vue 3](https://vuejs.org/guide/introduction.html)
- [Tài liệu Vite](https://vitejs.dev/guide/)
- [Tài liệu Tailwind CSS](https://tailwindcss.com/docs)


