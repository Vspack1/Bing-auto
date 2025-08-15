# Bing-auto
Bing tool auto for free

# Bing AutoSearch – Tampermonkey Script (v1.0)

Tự động tìm kiếm trên **Bing** để farm điểm **Microsoft Rewards**.  
Phiên bản này là bản **đơn giản**, giữ nguyên logic cơ bản từ repo [`gerisonsabino/bing_autosearch`](https://github.com/gerisonsabino/bing_autosearch), bỏ toàn bộ HTML/CSS/img gốc.

> ⚠️ **Cảnh báo:** Việc tự động hóa tìm kiếm có thể vi phạm điều khoản sử dụng của Microsoft Rewards. Chỉ nên sử dụng cho mục đích học tập/kiểm thử.

---

## 📦 Tính năng
- Chạy trực tiếp trên Bing.
- Tự động tìm kiếm theo danh sách từ khóa tĩnh.
- Delay cố định giữa các lần tìm kiếm.
- Lưu tiến độ tìm kiếm bằng `localStorage`.

---

## 🚀 Cài đặt
1. Cài **Tampermonkey**:
   - Chrome/Edge: [Tampermonkey Extension](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - Firefox: [Tampermonkey Add-on](https://addons.mozilla.org/firefox/addon/tampermonkey/)
2. Tạo script mới → Dán code v1.0.
3. Lưu và bật script.
4. Mở [https://www.bing.com](https://www.bing.com) → script tự động chạy.

---

## 💻 Sử dụng
- Chỉ cần mở Bing, script sẽ tự động tìm kiếm danh sách từ khóa trong code.
- Khi hết danh sách, script dừng.

---

## ⚙️ Cấu hình
- `searchTerms`: Mảng chứa danh sách từ khóa.
- `intervalMs`: Delay cố định giữa các lần tìm kiếm (mặc định 5000ms).

---

## 📜 Changelog
- **v1.0**:  
  - Chuyển code gốc thành Tampermonkey script.
  - Xóa toàn bộ UI HTML/CSS/img.
  - Delay cố định giữa các lần tìm kiếm.
  - Lưu tiến độ bằng `localStorage`.
