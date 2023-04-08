# Tìm kiếm địa chỉ, chọn địa chỉ

_Yêu cầu:_

- [NodeJS](https://nodejs.org), nếu bạn chưa cài thì hãy cài trước nhé.
- Ngoài ra, bạn có thể cài thêm [Yarn](https://yarnpkg.com) để chạy các lệnh dễ dàng hơn.
- Cách cài yarn: Chạy lệnh `npm i -g yarn`

## Cách chạy chương trình

- Chạy `cd address-select` để vào thư mục client
- Chạy `npm i` hoặc `yarn` để cài đặt các thư viện cần thiết
- Chạy `npm run dev` hoặc `yarn dev` để chạy chương trình ở chế độ development
- Vào trình duyệt web, truy cập địa chỉ `http://localhost:5173` để xem kết quả

## Note:

- Thư mục `get-data` chỉ chứa code để lấy dữ liệu các địa danh ở Việt Nam.
- Dữ liệu này mình đã lấy sẵn và lưu vào file `data.json` trong `address-select/src/assets` rồi, nên không cần chạy lại code trong thư mục `get-data` nữa.
- Bạn có thể vào đây để tham khảo cách mình lấy dữ liệu cũng được.

## Cách chạy chương trình lấy dữ liệu

- Chạy `cd get-data` để vào thư mục lấy dữ liệu
- Chạy `npm i` hoặc `yarn` để cài đặt các thư viện cần thiết
- Chạy `node get-raw-data` để lấy dữ liệu từ api [này](https://provinces.open-api.vn)
- Dữ liệu sẽ được lưu vào file `raw-data.json` trong thư mục `get-data`
- Lúc này dữ liệu nó sẽ chưa được format, trông sẽ rất khó hiểu, nên bạn chạy lệnh `npm run format` hoặc `yarn format` để format lại dữ liệu nhé.
- Dữ liệu trên là dữ liệu thô, nó chưa được xử lý, nên bạn chạy lệnh `node format-data` để xử lý lại dữ liệu theo chuẩn mà mình sẽ dùng trong chương trình.
- Dữ liệu sau khi xử lý sẽ được lưu vào file `data.json` trong thư mục `get-data`
- Dữ liệu này cũng chưa được format, nên bạn chạy lệnh `npm run format` hoặc `yarn format` để format lại dữ liệu nhé.
