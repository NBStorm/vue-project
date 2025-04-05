// tailwind.config.js
export default {
  content: [
    "./index.html", // Đảm bảo Tailwind sẽ quét qua HTML của bạn
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Đảm bảo quét qua các file trong thư mục src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
