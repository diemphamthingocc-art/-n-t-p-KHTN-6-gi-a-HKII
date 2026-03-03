import { MCQQuestion, TFQuestion, ShortQuestion } from './types';

export const mcqQuestions: MCQQuestion[] = [
  { q: "Thành phần nào quy định hình dạng của tế bào thực vật?", a: ["Nhân tế bào", "Màng tế bào", "Thành tế bào", "Chất tế bào"], c: 2 },
  { q: "Tế bào nhân sơ khác tế bào nhân thực ở điểm cơ bản nào?", a: ["Có màng tế bào", "Chưa có màng nhân", "Có lục lạp", "Có kích thước lớn"], c: 1 },
  { q: "Trong cơ thể đa bào, đơn vị cấu tạo nhỏ nhất là gì?", a: ["Mô", "Hệ cơ quan", "Cơ quan", "Tế bào"], c: 3 },
  { q: "Quá trình nào giúp cơ thể sinh vật lớn lên?", a: ["Sự trao đổi chất", "Sự phân chia tế bào", "Sự di chuyển", "Sự cảm ứng"], c: 1 },
  { q: "Giới nào bao gồm các sinh vật nhân sơ, kích thước hiển vi?", a: ["Giới Khởi sinh", "Giới Nguyên sinh", "Giới Nấm", "Giới Động vật"], c: 0 },
  { q: "Đặc điểm đặc trưng của giới Thực vật là gì?", a: ["Dị dưỡng, di chuyển được", "Tự dưỡng, không di chuyển", "Dị dưỡng, có thành chitin", "Nhân sơ, sống ký sinh"], c: 1 },
  { q: "Khóa lưỡng phân được xây dựng dựa trên đặc điểm nào?", a: ["Sự giống nhau của sinh vật", "Các cặp đặc điểm đối lập", "Môi trường sống của sinh vật", "Kích thước của cơ thể"], c: 1 },
  { q: "Hệ cơ quan nào ở người có chức năng loại bỏ chất thải ra ngoài?", a: ["Hệ tiêu hóa", "Hệ tuần hoàn", "Hệ bài tiết", "Hệ thần kinh"], c: 2 },
  { q: "Nấm rơm thuộc giới nào?", a: ["Giới Thực vật", "Giới Nấm", "Giới Nguyên sinh", "Giới Khởi sinh"], c: 1 },
  { q: "Mô biểu bì ở người có chức năng chính là gì?", a: ["Vận chuyển chất", "Nâng đỡ cơ thể", "Bảo vệ các bộ phận bên trong", "Điều khiển hoạt động"], c: 2 },
  { q: "Tảo lục, trùng giày thuộc giới nào?", a: ["Giới Khởi sinh", "Giới Nguyên sinh", "Giới Nấm", "Giới Động vật"], c: 1 },
  { q: "Động vật có xương sống khác động vật không xương sống ở:", a: ["Có chân", "Có xương cột sống", "Biết bơi", "Có mắt"], c: 1 },
  { q: "Bào quan nào là trung tâm điều khiển của tế bào nhân thực?", a: ["Lục lạp", "Ti thể", "Nhân tế bào", "Màng tế bào"], c: 2 },
  { q: "Cơ thể đơn bào có đặc điểm gì?", a: ["Gồm nhiều tế bào phối hợp", "Chỉ gồm một tế bào", "Không có màng tế bào", "Luôn sống ký sinh"], c: 1 },
  { q: "Nếu một tế bào thực hiện 3 lần phân chia, số tế bào con tạo ra là:", a: ["4 tế bào", "6 tế bào", "8 tế bào", "16 tế bào"], c: 2 },
  { q: "Nguyên tắc chia nhóm trong khóa lưỡng phân là mỗi bước chia thành:", a: ["3 nhóm", "2 nhóm", "4 nhóm", "Nhiều nhóm"], c: 1 },
  { q: "Sinh vật nào sau đây là cơ thể đa bào?", a: ["Vi khuẩn", "Trùng giày", "Cây bưởi", "Amip"], c: 2 },
  { q: "Thành phần nào bao bọc và bảo vệ toàn bộ tế bào?", a: ["Chất tế bào", "Nhân", "Màng tế bào", "Lục lạp"], c: 2 }
];

export const tfQuestions: TFQuestion[] = [
  { q: "Về giới Khởi sinh và Nguyên sinh:", i: ["Mọi vi khuẩn đều gây bệnh cho người", "Tảo có khả năng tự dưỡng nhờ lục lạp", "Vi khuẩn chưa có màng nhân", "Trùng roi là sinh vật đa bào"], a: [false, true, true, false] },
  { q: "Về sự phối hợp các hệ cơ quan:", i: ["Khi chạy, chỉ có hệ vận động làm việc", "Hệ tuần hoàn giúp vận chuyển khí từ hệ hô hấp", "Hệ thần kinh điều khiển các hệ cơ quan khác", "Tim đập nhanh hơn khi vận động mạnh"], a: [false, true, true, true] },
  { q: "Về phân loại 5 giới:", i: ["Giới Nấm sống dị dưỡng, không có diệp lục", "Giới Động vật có thành tế bào giống thực vật", "Giới Thực vật gồm các sinh vật đa bào", "Virus được xếp vào giới Khởi sinh"], a: [true, false, true, false] },
  { q: "Về cấu tạo tế bào:", i: ["Nhân tế bào chứa vật chất di truyền", "Tế bào động vật có không bào rất lớn", "Tế bào thực vật có thành cellulose", "Chất tế bào là nơi diễn ra các hoạt động sống"], a: [true, false, true, true] }
];

export const shortQuestions: ShortQuestion[] = [
  { q: "Tại sao rễ cây có hàng triệu tế bào lông hút rất dài và mỏng?", ref: "Tăng diện tích tiếp xúc để hút tối đa nước và khoáng chất." },
  { q: "Tại sao tế bào đa bào không thể sống độc lập khi tách rời?", ref: "Do tính chuyên hóa chức năng và phụ thuộc lẫn nhau." },
  { q: "Màng tế bào khác lưới lọc ở điểm nào?", ref: "Màng tế bào có tính thấm chọn lọc chủ động." },
  { q: "Tại sao khi sốt nhịp tim và nhịp thở lại tăng lên?", ref: "Sự phối hợp để thải nhiệt và cung cấp oxy/năng lượng chống bệnh." },
  { q: "Vì sao nấm men đơn bào không xếp vào giới Khởi sinh?", ref: "Vì nó có cấu tạo nhân thực." },
  { q: "Đặc điểm phân biệt Chuồn chuồn và Nhện đỏ bằng khóa lưỡng phân?", ref: "Số lượng chân (6 chân vs 8 chân) hoặc cánh." }
];
