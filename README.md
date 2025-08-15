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

## Update 1.2:

# Bing AutoSearch – Tampermonkey Script (v1.2)

Tự động tìm kiếm trên **Bing** để farm điểm **Microsoft Rewards**.  
Phiên bản **nâng cấp đầy đủ**, cải tiến từ v1.0, bổ sung hệ thống tạo từ khóa động, menu điều khiển, và nhiều tính năng chống bị Bing chặn.

> ⚠️ **Cảnh báo:** Việc tự động hóa tìm kiếm có thể vi phạm điều khoản sử dụng của Microsoft Rewards. Hãy sử dụng cho mục đích học tập/kiểm thử.

---

## 📦 Tính năng
- Tạo **1000+ từ khóa mỗi ngày** (adj + noun + place/year), xáo trộn ổn định.
- Menu Tampermonkey (Start / Stop / Reset Progress).
- Delay **ngẫu nhiên** giữa các lần tìm kiếm.
- Lưu trạng thái tiến trình và ngày bằng `GM_setValue`/`GM_getValue`.
- Dừng khi gặp captcha / xác minh robot.
- Giới hạn số lượt tìm kiếm mỗi phiên (`SESSION_CAP`).
- Hỗ trợ cả desktop và mobile Bing.

---

## 🚀 Cài đặt
1. Cài **Tampermonkey**:
   - Chrome/Edge: [Tampermonkey Extension](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - Firefox: [Tampermonkey Add-on](https://addons.mozilla.org/firefox/addon/tampermonkey/)
2. Tạo script mới → Dán code v1.2.
3. Lưu và bật script.
4. Mở [https://www.bing.com](https://www.bing.com).

---

## 💻 Sử dụng
- Mở Bing → Vào icon Tampermonkey → Chọn:
  - **▶ Start**: Bắt đầu auto search.
  - **⏹ Stop**: Dừng tìm kiếm.
  - **🔁 Reset Progress**: Reset tiến độ trong ngày.
- Script sẽ tự động tìm kiếm 1000+ từ khóa theo thứ tự đã xáo trộn.

---

## ⚙️ Cấu hình
- `MIN_DELAY`, `MAX_DELAY`: Khoảng delay ngẫu nhiên giữa các lần tìm kiếm.
- `SESSION_CAP`: Giới hạn số lượt tìm kiếm trong một phiên (0 = không giới hạn).
- `STOP_ON_SUSPECT`: Tự động dừng khi phát hiện captcha/robot.
- `buildTerms()`: Tùy chỉnh số lượng từ khóa tạo mỗi ngày (mặc định 1050).

---

## 📜 Changelog
- **v1.2**:
  - Thêm menu điều khiển trong Tampermonkey.
  - Lưu trạng thái và ngày bằng `GM_setValue`/`GM_getValue`.
  - Tạo danh sách 1000+ từ khóa/ngày, xáo trộn ổn định.
  - Delay ngẫu nhiên giữa các lần tìm kiếm.
  - Dừng khi gặp captcha/robot.
  - Giới hạn số lượt tìm kiếm mỗi phiên (`SESSION_CAP`).
