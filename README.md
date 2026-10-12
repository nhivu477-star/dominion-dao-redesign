# PTIT Dominion DAO — Thực hành 3

Ứng dụng React kết nối DominionDAO: đóng góp ETH, tạo đề xuất, Accept/Reject, xem lịch sử vote và trả tiền cho bạn A sau 5 phút.

## Thứ tự thực hiện

1. Cài thư viện: `npm install`.
2. Biên dịch và xuất ABI/bytecode: `npm run compile`.
3. Kiểm thử contract: `npm test`.
4. Chạy giao diện: `npm run dev` (http://127.0.0.1:5173).
5. Cài MetaMask, chọn **Ethereum Sepolia**, lấy ETH thử nghiệm qua faucet. Mỗi người có ví riêng.
6. Một thành viên kết nối ví và bấm **Deploy mới**, ký giao dịch trong MetaMask. Chờ xác nhận. Đây là contract chung của nhóm.
7. Sao chép địa chỉ vừa deploy, gửi cho 3–5 thành viên. Mọi người chọn cùng mạng, nhập địa chỉ này và bấm **Áp dụng**. Không deploy riêng mỗi người.
8. Mỗi người đóng góp ít nhất **0,01 ETH** để thành cổ đông; giữ ETH dư để trả gas.
9. Một cổ đông tạo đề xuất, nhập địa chỉ ví bạn A, ví dụ yêu cầu **0,005 ETH**.
10. Các cổ đông mở **Chi tiết** và vote. Mỗi ví chỉ vote một lần cho mỗi đề xuất.
11. Đợi **5 phút từ lúc tạo đề xuất**. Khi số phiếu đồng ý lớn hơn phản đối, cổ đông bấm **Thanh toán**.
12. Kiểm tra số dư ví A và giao dịch trên Sepolia Etherscan. Lưu ảnh đóng góp, đề xuất, vote, payout và transaction hash làm bằng chứng.

Giao diện cập nhật mỗi 10 giây. Nút thanh toán còn chờ timestamp block mới nhất đạt thời hạn contract, nên có thể xuất hiện trễ vài giây so với đồng hồ máy.

## Chạy blockchain local (không cần ETH Sepolia)

- Terminal 1: `npm run chain`.
- Terminal 2: `npm run deploy:local` (in địa chỉ contract).
- Terminal 3: `npm run dev`.
- Thêm mạng MetaMask: RPC `http://127.0.0.1:8545`, chain ID **31337**, ký hiệu **ETH**.
- Chỉ import khóa của các tài khoản thử nghiệm do Hardhat in ra vào ví test riêng. Khóa này công khai và chỉ dùng local.
- Nhập địa chỉ contract, thực hành cùng quy trình. Khi restart blockchain local cần deploy lại.

`npm test` tự tăng thời gian blockchain local để kiểm tra toàn bộ quy trình 3 thành viên mà không phải chờ 5 phút thật.

## Build

`npm run build` tạo thư mục `dist/`. Deploy bytecode được biên dịch từ chính contract trong dự án. Không có private key trong frontend hay cấu hình.

Có thể cấu hình địa chỉ mặc định bằng cách sao chép `.env.example` thành `.env` và đặt `VITE_CONTRACT_ADDRESS=0x...`, sau đó khởi động lại Vite. Địa chỉ đã lưu trong trình duyệt ưu tiên hơn `.env`.

## Nguồn và thay đổi so với tài liệu

Nguồn contract: https://github.com/VuManh-07/CodeSmartcontractThucHanhPtit

Bản nguyên gốc được giữ trong `contracts/DominionDAO.original.sol.txt` để đối chiếu. Bản chạy giữ các hàm ABI phục vụ bài học, ngưỡng 0,01 ETH và thời gian 5 phút, bổ sung:

- Chặn payout trước khi thời gian vote kết thúc (contract gốc thiếu điều kiện này).
- Kiểm tra proposal tồn tại khi vote/payout.
- Kiểm tra tiêu đề, ví người nhận, số tiền dương và không vượt quỹ lúc tạo.
- Cập nhật trạng thái và số dư trước khi gọi chuyển ETH; đặt `passed=true` khi thanh toán.

Frontend dùng React + Vite + ethers, thay cho Create React App/Web3.js trong PDF. Đủ luồng và quyền tương ứng của đề, không cần các gói chat hoặc polyfill không dùng. `passed` trong contract gốc không phản ánh kết quả ngay khi hết hạn: UI tính trạng thái từ thời hạn và số phiếu.

PDF không nêu rõ định dạng nộp bài/hạn nộp. ETH Sepolia là ETH thử nghiệm. Bản này phục vụ thực hành, chưa triển khai trên mainnet.
