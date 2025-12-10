
import { SubjectType, GradeType } from "./types";

export interface ChapterData {
  id: string;
  subject: SubjectType;
  grade: GradeType;
  domain: string; 
  name: string;
  lessons: string[];
}

export const SUBJECTS: { id: SubjectType; name: string; icon: string }[] = [
  { id: 'Toán', name: 'Toán học', icon: 'Calculator' },
  { id: 'Vật lí', name: 'Vật lí', icon: 'Zap' },
  { id: 'Hóa học', name: 'Hóa học', icon: 'FlaskConical' },
];

export const GRADES: GradeType[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

// Helper to group grades by level for UI
export const GRADE_LEVELS = [
    { name: "Tiểu học", grades: ['1', '2', '3', '4', '5'] as GradeType[] },
    { name: "THCS", grades: ['6', '7', '8', '9'] as GradeType[] },
    { name: "THPT", grades: ['10', '11', '12'] as GradeType[] },
];

// Common Domains for Math
export const MATH_DOMAINS = {
  NUM_ALG: "Số và Phép tính (Tiểu học)",
  GEOMETRY_MEASURE: "Hình học và Đo lường",
  STATS: "Thống kê và Xác suất",
  ALGEBRA: "Số và Đại số (THCS)",
  ANALYSIS: "Giải tích (THPT)"
};

// Common Domains for Science
export const SCIENCE_DOMAINS = {
  MATTER: "Chất và sự biến đổi của chất", 
  ENERGY: "Năng lượng và sự biến đổi",
  MECHANICS: "Cơ học",
  OPTICS: "Quang học",
  ACOUSTICS: "Âm học",
  ELECTRICITY: "Điện và Từ", 
  EARTH: "Trái Đất và Bầu trời",
  THERMAL: "Nhiệt học",
  MODERN_PHYSICS: "Vật lí hiện đại",
  INORGANIC: "Hóa vô cơ",
  ORGANIC: "Hóa hữu cơ",
  PHYSICAL_CHEM: "Hóa lí"
};

export const CURRICULUM: ChapterData[] = [
  // =================================================================
  // TIỂU HỌC (Lớp 1 - 5) - TOÁN
  // =================================================================
  // LỚP 1
  {
    id: "m1_c1", subject: "Toán", grade: "1", domain: MATH_DOMAINS.NUM_ALG,
    name: "Các số đến 10",
    lessons: ["Các số 0, 1, 2, 3, 4, 5", "Các số 6, 7, 8, 9, 10", "Nhiều hơn, ít hơn, bằng nhau", "So sánh các số"]
  },
  {
    id: "m1_c2", subject: "Toán", grade: "1", domain: MATH_DOMAINS.NUM_ALG,
    name: "Phép cộng, phép trừ trong phạm vi 10",
    lessons: ["Phép cộng trong phạm vi 10", "Phép trừ trong phạm vi 10", "Bảng cộng, bảng trừ"]
  },
  {
    id: "m1_c3", subject: "Toán", grade: "1", domain: MATH_DOMAINS.GEOMETRY_MEASURE,
    name: "Hình học và Đo lường",
    lessons: ["Hình vuông, hình tròn, hình tam giác, hình chữ nhật", "Khối lập phương, khối hộp chữ nhật", "Xăng-ti-mét", "Đo độ dài"]
  },
  
  // LỚP 2
  {
    id: "m2_c1", subject: "Toán", grade: "2", domain: MATH_DOMAINS.NUM_ALG,
    name: "Phép cộng, phép trừ (có nhớ) trong phạm vi 100",
    lessons: ["Phép cộng có nhớ", "Phép trừ có nhớ", "Bài toán về nhiều hơn, ít hơn"]
  },
  {
    id: "m2_c2", subject: "Toán", grade: "2", domain: MATH_DOMAINS.NUM_ALG,
    name: "Phép nhân và Phép chia",
    lessons: ["Làm quen với phép nhân", "Bảng nhân 2, 5", "Làm quen với phép chia", "Bảng chia 2, 5"]
  },
  {
    id: "m2_c3", subject: "Toán", grade: "2", domain: MATH_DOMAINS.GEOMETRY_MEASURE,
    name: "Hình học và Đo lường",
    lessons: ["Đường thẳng, đường cong", "Đường gấp khúc", "Đề-xi-mét, Mét", "Ki-lô-gam", "Lít"]
  },

  // LỚP 3
  {
    id: "m3_c1", subject: "Toán", grade: "3", domain: MATH_DOMAINS.NUM_ALG,
    name: "Các số đến 10 000",
    lessons: ["Các số có bốn chữ số", "So sánh các số trong phạm vi 10 000", "Phép cộng, phép trừ trong phạm vi 10 000"]
  },
  {
    id: "m3_c2", subject: "Toán", grade: "3", domain: MATH_DOMAINS.NUM_ALG,
    name: "Nhân, chia số có nhiều chữ số",
    lessons: ["Nhân số có bốn chữ số với số có một chữ số", "Chia số có bốn chữ số cho số có một chữ số"]
  },
  {
    id: "m3_c3", subject: "Toán", grade: "3", domain: MATH_DOMAINS.GEOMETRY_MEASURE,
    name: "Hình học",
    lessons: ["Góc vuông, góc không vuông", "Hình chữ nhật, Hình vuông", "Chu vi hình chữ nhật, hình vuông", "Diện tích hình chữ nhật, hình vuông"]
  },

  // LỚP 4
  {
    id: "m4_c1", subject: "Toán", grade: "4", domain: MATH_DOMAINS.NUM_ALG,
    name: "Số tự nhiên",
    lessons: ["Số có nhiều chữ số", "Hàng và lớp", "So sánh các số có nhiều chữ số", "Yến, tạ, tấn", "Giây, thế kỉ"]
  },
  {
    id: "m4_c2", subject: "Toán", grade: "4", domain: MATH_DOMAINS.NUM_ALG,
    name: "Bốn phép tính với số tự nhiên",
    lessons: ["Phép cộng, phép trừ", "Biểu thức có chứa chữ", "Tính chất giao hoán, kết hợp", "Nhân với số có hai chữ số", "Chia cho số có hai chữ số"]
  },
  {
    id: "m4_c3", subject: "Toán", grade: "4", domain: MATH_DOMAINS.NUM_ALG,
    name: "Phân số",
    lessons: ["Khái niệm phân số", "Phân số bằng nhau", "Quy đồng mẫu số", "Cộng, trừ, nhân, chia phân số"]
  },

  // LỚP 5
  {
    id: "m5_c1", subject: "Toán", grade: "5", domain: MATH_DOMAINS.NUM_ALG,
    name: "Số thập phân",
    lessons: ["Khái niệm số thập phân", "Hàng của số thập phân", "Số thập phân bằng nhau", "So sánh hai số thập phân"]
  },
  {
    id: "m5_c2", subject: "Toán", grade: "5", domain: MATH_DOMAINS.NUM_ALG,
    name: "Các phép tính với số thập phân",
    lessons: ["Cộng hai số thập phân", "Trừ hai số thập phân", "Nhân số thập phân", "Chia số thập phân"]
  },
  {
    id: "m5_c3", subject: "Toán", grade: "5", domain: MATH_DOMAINS.GEOMETRY_MEASURE,
    name: "Hình học",
    lessons: ["Hình tam giác", "Diện tích hình tam giác", "Hình thang", "Diện tích hình thang", "Hình tròn, đường tròn", "Chu vi và diện tích hình tròn"]
  },
  {
    id: "m5_c4", subject: "Toán", grade: "5", domain: MATH_DOMAINS.GEOMETRY_MEASURE,
    name: "Số đo thời gian. Chuyển động đều",
    lessons: ["Bảng đơn vị đo thời gian", "Vận tốc", "Quãng đường", "Thời gian", "Chuyển động ngược chiều, cùng chiều"]
  },

  // =================================================================
  // THCS (Lớp 6 - 9) - TOÁN
  // =================================================================
  // LỚP 6
  {
    id: "m6_c1", subject: "Toán", grade: "6", domain: MATH_DOMAINS.ALGEBRA,
    name: "Số tự nhiên",
    lessons: ["Tập hợp số tự nhiên", "Các phép tính trong tập hợp số tự nhiên", "Lũy thừa với số mũ tự nhiên", "Thứ tự thực hiện phép tính", "Quan hệ chia hết", "Số nguyên tố. Hợp số", "ƯCLN và BCNN"]
  },
  {
    id: "m6_c2", subject: "Toán", grade: "6", domain: MATH_DOMAINS.ALGEBRA,
    name: "Số nguyên",
    lessons: ["Số nguyên âm", "Tập hợp các số nguyên", "Phép cộng và trừ số nguyên", "Quy tắc dấu ngoặc", "Phép nhân và chia số nguyên"]
  },
  {
    id: "m6_c3", subject: "Toán", grade: "6", domain: MATH_DOMAINS.ALGEBRA,
    name: "Phân số và Số thập phân",
    lessons: ["Mở rộng phân số", "Các phép tính về phân số", "Số thập phân", "Các phép tính với số thập phân", "Tỉ số và tỉ số phần trăm"]
  },
  {
    id: "m6_c4", subject: "Toán", grade: "6", domain: MATH_DOMAINS.GEOMETRY_MEASURE,
    name: "Hình học trực quan & phẳng",
    lessons: ["Tam giác đều, hình vuông, lục giác đều", "Hình chữ nhật, hình thoi, hình bình hành, hình thang cân", "Điểm, đường thẳng", "Đoạn thẳng. Trung điểm đoạn thẳng", "Góc. Số đo góc"]
  },
  {
    id: "m6_c5", subject: "Toán", grade: "6", domain: MATH_DOMAINS.STATS,
    name: "Thống kê và Xác suất",
    lessons: ["Thu thập và tổ chức dữ liệu", "Biểu đồ cột, biểu đồ cột kép", "Xác suất thực nghiệm"]
  },

  // LỚP 7
  {
    id: "m7_c1", subject: "Toán", grade: "7", domain: MATH_DOMAINS.ALGEBRA,
    name: "Số hữu tỉ",
    lessons: ["Tập hợp số hữu tỉ", "Cộng, trừ, nhân, chia số hữu tỉ", "Lũy thừa của số hữu tỉ", "Quy tắc dấu ngoặc"]
  },
  {
    id: "m7_c2", subject: "Toán", grade: "7", domain: MATH_DOMAINS.ALGEBRA,
    name: "Số thực",
    lessons: ["Số vô tỉ. Căn bậc hai số học", "Số thực", "Làm tròn số"]
  },
  {
    id: "m7_c3", subject: "Toán", grade: "7", domain: MATH_DOMAINS.GEOMETRY_MEASURE,
    name: "Hình học phẳng",
    lessons: ["Góc ở vị trí đặc biệt", "Tia phân giác", "Hai đường thẳng song song", "Định lí và chứng minh định lí", "Tam giác bằng nhau"]
  },
  {
    id: "m7_c4", subject: "Toán", grade: "7", domain: MATH_DOMAINS.ALGEBRA,
    name: "Đại số",
    lessons: ["Tỉ lệ thức", "Đại lượng tỉ lệ thuận, tỉ lệ nghịch", "Biểu thức đại số", "Đa thức một biến"]
  },

  // LỚP 8
  {
    id: "m8_c1", subject: "Toán", grade: "8", domain: MATH_DOMAINS.ALGEBRA,
    name: "Đa thức nhiều biến",
    lessons: ["Đơn thức và đa thức nhiều biến", "Các phép tính với đa thức", "Hằng đẳng thức đáng nhớ", "Phân tích đa thức thành nhân tử"]
  },
  {
    id: "m8_c2", subject: "Toán", grade: "8", domain: MATH_DOMAINS.ALGEBRA,
    name: "Phân thức đại số",
    lessons: ["Phân thức đại số", "Cộng, trừ phân thức", "Nhân, chia phân thức"]
  },
  {
    id: "m8_c3", subject: "Toán", grade: "8", domain: MATH_DOMAINS.ALGEBRA,
    name: "Hàm số và Phương trình",
    lessons: ["Hàm số bậc nhất", "Đồ thị hàm số bậc nhất", "Phương trình bậc nhất một ẩn"]
  },
  {
    id: "m8_c4", subject: "Toán", grade: "8", domain: MATH_DOMAINS.GEOMETRY_MEASURE,
    name: "Hình học",
    lessons: ["Tứ giác", "Định lí Thalès", "Tam giác đồng dạng", "Hình chóp tam giác đều", "Hình chóp tứ giác đều"]
  },

  // LỚP 9
  {
    id: "m9_c1", subject: "Toán", grade: "9", domain: MATH_DOMAINS.ALGEBRA,
    name: "Phương trình và Hệ phương trình",
    lessons: ["Phương trình bậc nhất hai ẩn", "Hệ hai phương trình bậc nhất hai ẩn", "Giải hệ phương trình"]
  },
  {
    id: "m9_c2", subject: "Toán", grade: "9", domain: MATH_DOMAINS.ALGEBRA,
    name: "Phương trình bậc hai",
    lessons: ["Căn bậc hai", "Hàm số y = ax²", "Phương trình bậc hai một ẩn", "Định lí Viète"]
  },
  {
    id: "m9_c3", subject: "Toán", grade: "9", domain: MATH_DOMAINS.GEOMETRY_MEASURE,
    name: "Hình học",
    lessons: ["Hệ thức lượng trong tam giác vuông", "Tỉ số lượng giác", "Đường tròn", "Góc với đường tròn", "Hình trụ, hình nón, hình cầu"]
  },

  // =================================================================
  // THPT (Lớp 10 - 12) - TOÁN
  // =================================================================
  // LỚP 10
  {
    id: "m10_c1", subject: "Toán", grade: "10", domain: MATH_DOMAINS.ALGEBRA,
    name: "Mệnh đề và Tập hợp",
    lessons: ["Mệnh đề", "Tập hợp", "Các phép toán trên tập hợp"]
  },
  {
    id: "m10_c2", subject: "Toán", grade: "10", domain: MATH_DOMAINS.ALGEBRA,
    name: "Bất phương trình và Hệ BPT",
    lessons: ["Bất phương trình bậc nhất hai ẩn", "Hệ bất phương trình bậc nhất hai ẩn"]
  },
  {
    id: "m10_c3", subject: "Toán", grade: "10", domain: MATH_DOMAINS.ALGEBRA,
    name: "Hàm số bậc hai",
    lessons: ["Hàm số và đồ thị", "Hàm số bậc hai", "Dấu của tam thức bậc hai"]
  },
  {
    id: "m10_c4", subject: "Toán", grade: "10", domain: MATH_DOMAINS.GEOMETRY_MEASURE,
    name: "Vectơ",
    lessons: ["Khái niệm vectơ", "Tổng và hiệu của hai vectơ", "Tích của vectơ với một số", "Tích vô hướng của hai vectơ"]
  },
  {
    id: "m10_c5", subject: "Toán", grade: "10", domain: MATH_DOMAINS.STATS,
    name: "Thống kê và Xác suất",
    lessons: ["Số đặc trưng đo xu thế trung tâm", "Số đặc trưng đo độ phân tán", "Xác suất của biến cố"]
  },

  // LỚP 11
  {
    id: "m11_c1", subject: "Toán", grade: "11", domain: MATH_DOMAINS.ALGEBRA,
    name: "Lượng giác",
    lessons: ["Góc lượng giác", "Giá trị lượng giác", "Công thức lượng giác", "Hàm số lượng giác", "Phương trình lượng giác cơ bản"]
  },
  {
    id: "m11_c2", subject: "Toán", grade: "11", domain: MATH_DOMAINS.ALGEBRA,
    name: "Dãy số",
    lessons: ["Dãy số", "Cấp số cộng", "Cấp số nhân"]
  },
  {
    id: "m11_c3", subject: "Toán", grade: "11", domain: MATH_DOMAINS.ANALYSIS,
    name: "Giới hạn và Hàm số liên tục",
    lessons: ["Giới hạn của dãy số", "Giới hạn của hàm số", "Hàm số liên tục"]
  },
  {
    id: "m11_c4", subject: "Toán", grade: "11", domain: MATH_DOMAINS.ANALYSIS,
    name: "Đạo hàm",
    lessons: ["Định nghĩa và ý nghĩa của đạo hàm", "Quy tắc tính đạo hàm", "Đạo hàm cấp hai"]
  },
  {
    id: "m11_c5", subject: "Toán", grade: "11", domain: MATH_DOMAINS.GEOMETRY_MEASURE,
    name: "Hình học không gian",
    lessons: ["Đường thẳng và mặt phẳng song song", "Hai mặt phẳng song song", "Đường thẳng vuông góc với mặt phẳng", "Hai mặt phẳng vuông góc"]
  },

  // LỚP 12
  {
    id: "m12_c1", subject: "Toán", grade: "12", domain: MATH_DOMAINS.ANALYSIS,
    name: "Ứng dụng đạo hàm",
    lessons: ["Tính đơn điệu của hàm số", "Cực trị của hàm số", "GTLN và GTNN của hàm số", "Đường tiệm cận", "Khảo sát và vẽ đồ thị hàm số"]
  },
  {
    id: "m12_c2", subject: "Toán", grade: "12", domain: MATH_DOMAINS.ANALYSIS,
    name: "Nguyên hàm và Tích phân",
    lessons: ["Nguyên hàm", "Tích phân", "Ứng dụng hình học của tích phân"]
  },
  {
    id: "m12_c3", subject: "Toán", grade: "12", domain: MATH_DOMAINS.GEOMETRY_MEASURE,
    name: "Phương pháp tọa độ trong không gian",
    lessons: ["Hệ tọa độ trong không gian", "Phương trình mặt phẳng", "Phương trình đường thẳng", "Mặt cầu"]
  },
  {
    id: "m12_c4", subject: "Toán", grade: "12", domain: MATH_DOMAINS.ALGEBRA,
    name: "Số phức (Nếu có trong chương trình)",
    lessons: ["Số phức", "Cộng, trừ và nhân số phức", "Phép chia số phức", "Phương trình bậc hai với hệ số thực"]
  },

  // =================================================================
  // VẬT LÍ (PHYSICS)
  // =================================================================
  // THCS (6-9): Tích hợp trong KHTN
  {
    id: "p6_c1", subject: "Vật lí", grade: "6", domain: SCIENCE_DOMAINS.MECHANICS,
    name: "Các phép đo", lessons: ["Đo chiều dài", "Đo khối lượng", "Đo thời gian", "Đo nhiệt độ"]
  },
  {
    id: "p6_c2", subject: "Vật lí", grade: "6", domain: SCIENCE_DOMAINS.MECHANICS,
    name: "Lực và Chuyển động", lessons: ["Lực và tác dụng của lực", "Lực tiếp xúc và không tiếp xúc", "Lực ma sát", "Trọng lượng, lực hấp dẫn"]
  },
  {
    id: "p7_c1", subject: "Vật lí", grade: "7", domain: SCIENCE_DOMAINS.MECHANICS,
    name: "Tốc độ", lessons: ["Tốc độ chuyển động", "Đo tốc độ", "Đồ thị quãng đường - thời gian"]
  },
  {
    id: "p7_c2", subject: "Vật lí", grade: "7", domain: SCIENCE_DOMAINS.ACOUSTICS,
    name: "Âm thanh", lessons: ["Sóng âm", "Độ to và độ cao của âm", "Phản xạ âm"]
  },
  {
    id: "p7_c3", subject: "Vật lí", grade: "7", domain: SCIENCE_DOMAINS.OPTICS,
    name: "Ánh sáng", lessons: ["Sự phản xạ ánh sáng", "Ảnh qua gương phẳng"]
  },
  {
    id: "p8_c1", subject: "Vật lí", grade: "8", domain: SCIENCE_DOMAINS.MECHANICS,
    name: "Áp suất", lessons: ["Khối lượng riêng", "Áp suất chất lỏng", "Áp suất khí quyển", "Lực đẩy Archimedes"]
  },
  {
    id: "p8_c2", subject: "Vật lí", grade: "8", domain: SCIENCE_DOMAINS.ELECTRICITY,
    name: "Điện học", lessons: ["Hiện tượng nhiễm điện", "Dòng điện, nguồn điện", "Mạch điện", "Tác dụng của dòng điện"]
  },
  {
    id: "p9_c1", subject: "Vật lí", grade: "9", domain: SCIENCE_DOMAINS.ENERGY,
    name: "Năng lượng", lessons: ["Động năng, thế năng", "Cơ năng", "Định luật bảo toàn năng lượng"]
  },
  {
    id: "p9_c2", subject: "Vật lí", grade: "9", domain: SCIENCE_DOMAINS.OPTICS,
    name: "Quang học", lessons: ["Khúc xạ ánh sáng", "Thấu kính hội tụ, phân kì", "Mắt và các tật của mắt"]
  },
  {
    id: "p9_c3", subject: "Vật lí", grade: "9", domain: SCIENCE_DOMAINS.ELECTRICITY,
    name: "Điện từ học", lessons: ["Từ trường", "Cảm ứng điện từ", "Dòng điện xoay chiều", "Máy biến thế"]
  },

  // THPT (10-12)
  {
    id: "p10_c1", subject: "Vật lí", grade: "10", domain: SCIENCE_DOMAINS.MECHANICS,
    name: "Động học", lessons: ["Mô tả chuyển động", "Chuyển động thẳng biến đổi đều", "Sự rơi tự do", "Chuyển động ném"]
  },
  {
    id: "p10_c2", subject: "Vật lí", grade: "10", domain: SCIENCE_DOMAINS.MECHANICS,
    name: "Động lực học", lessons: ["Ba định luật Newton", "Một số lực thường gặp", "Moment lực. Cân bằng vật rắn"]
  },
  {
    id: "p10_c3", subject: "Vật lí", grade: "10", domain: SCIENCE_DOMAINS.ENERGY,
    name: "Năng lượng và Động lượng", lessons: ["Công và công suất", "Động năng và thế năng", "Động lượng. Định luật bảo toàn động lượng"]
  },
  
  {
    id: "p11_c1", subject: "Vật lí", grade: "11", domain: SCIENCE_DOMAINS.MECHANICS,
    name: "Dao động", lessons: ["Dao động điều hòa", "Mô tả dao động", "Năng lượng trong dao động điều hòa", "Dao động tắt dần, cưỡng bức"]
  },
  {
    id: "p11_c2", subject: "Vật lí", grade: "11", domain: SCIENCE_DOMAINS.ACOUSTICS,
    name: "Sóng", lessons: ["Mô tả sóng", "Sóng ngang, sóng dọc", "Sóng điện từ", "Giao thoa sóng", "Sóng dừng"]
  },
  {
    id: "p11_c3", subject: "Vật lí", grade: "11", domain: SCIENCE_DOMAINS.ELECTRICITY,
    name: "Điện trường", lessons: ["Lực tương tác tĩnh điện", "Điện trường", "Thế năng điện. Điện thế", "Tụ điện"]
  },
  {
    id: "p11_c4", subject: "Vật lí", grade: "11", domain: SCIENCE_DOMAINS.ELECTRICITY,
    name: "Dòng điện", lessons: ["Cường độ dòng điện", "Điện trở. Định luật Ohm", "Nguồn điện", "Năng lượng và công suất điện"]
  },

  {
    id: "p12_c1", subject: "Vật lí", grade: "12", domain: SCIENCE_DOMAINS.THERMAL,
    name: "Vật lí nhiệt", lessons: ["Mô hình động học phân tử chất khí", "Nội năng. Định luật 1 nhiệt động lực học", "Nhiệt độ. Thang nhiệt độ"]
  },
  {
    id: "p12_c2", subject: "Vật lí", grade: "12", domain: SCIENCE_DOMAINS.THERMAL,
    name: "Khí lí tưởng", lessons: ["Phương trình trạng thái khí lí tưởng", "Quá trình đẳng nhiệt. Định luật Boyle", "Quá trình đẳng áp. Định luật Charles"]
  },
  {
    id: "p12_c3", subject: "Vật lí", grade: "12", domain: SCIENCE_DOMAINS.ELECTRICITY,
    name: "Từ trường", lessons: ["Từ trường", "Lực từ", "Cảm ứng từ"]
  },
  {
    id: "p12_c4", subject: "Vật lí", grade: "12", domain: SCIENCE_DOMAINS.MODERN_PHYSICS,
    name: "Vật lí hạt nhân", lessons: ["Cấu tạo hạt nhân", "Phóng xạ", "Phản ứng hạt nhân", "Năng lượng hạt nhân"]
  },

  // =================================================================
  // HÓA HỌC (CHEMISTRY)
  // =================================================================
  // THCS (6-9): Tích hợp trong KHTN
  {
    id: "ch6_c1", subject: "Hóa học", grade: "6", domain: SCIENCE_DOMAINS.MATTER,
    name: "Chất và sự biến đổi", lessons: ["Các thể của chất", "Oxygen và không khí", "Hỗn hợp và tách chất"]
  },
  {
    id: "ch7_c1", subject: "Hóa học", grade: "7", domain: SCIENCE_DOMAINS.MATTER,
    name: "Nguyên tử - Phân tử", lessons: ["Nguyên tử", "Nguyên tố hóa học", "Sơ lược bảng tuần hoàn", "Phân tử", "Liên kết hóa học"]
  },
  {
    id: "ch8_c1", subject: "Hóa học", grade: "8", domain: SCIENCE_DOMAINS.MATTER,
    name: "Phản ứng hóa học", lessons: ["Biến đổi vật lí, hóa học", "Phản ứng hóa học", "Định luật bảo toàn khối lượng", "Phương trình hóa học"]
  },
  {
    id: "ch8_c2", subject: "Hóa học", grade: "8", domain: SCIENCE_DOMAINS.MATTER,
    name: "Hợp chất vô cơ", lessons: ["Acid", "Base", "Oxide", "Muối", "Phân bón hóa học", "Thang pH"]
  },
  {
    id: "ch9_c1", subject: "Hóa học", grade: "9", domain: SCIENCE_DOMAINS.MATTER,
    name: "Kim loại và Phi kim", lessons: ["Tính chất kim loại", "Dãy hoạt động hóa học", "Tính chất phi kim", "Sơ lược nhóm Halogen"]
  },
  {
    id: "ch9_c2", subject: "Hóa học", grade: "9", domain: SCIENCE_DOMAINS.MATTER,
    name: "Hóa hữu cơ", lessons: ["Hợp chất hữu cơ", "Alkane (Metan)", "Alkene (Etilen)", "Ethylic alcohol", "Acetic acid"]
  },

  // THPT (10-12)
  {
    id: "ch10_c1", subject: "Hóa học", grade: "10", domain: SCIENCE_DOMAINS.MATTER,
    name: "Cấu tạo nguyên tử", lessons: ["Thành phần nguyên tử", "Cấu trúc lớp vỏ electron"]
  },
  {
    id: "ch10_c2", subject: "Hóa học", grade: "10", domain: SCIENCE_DOMAINS.MATTER,
    name: "Bảng tuần hoàn", lessons: ["Cấu tạo bảng tuần hoàn", "Xu hướng biến đổi tính chất"]
  },
  {
    id: "ch10_c3", subject: "Hóa học", grade: "10", domain: SCIENCE_DOMAINS.MATTER,
    name: "Liên kết hóa học", lessons: ["Liên kết ion", "Liên kết cộng hóa trị", "Liên kết hydrogen"]
  },
  {
    id: "ch10_c4", subject: "Hóa học", grade: "10", domain: SCIENCE_DOMAINS.PHYSICAL_CHEM,
    name: "Năng lượng hóa học", lessons: ["Phản ứng tỏa nhiệt, thu nhiệt", "Enthalpy tạo thành", "Biến thiên Enthalpy"]
  },
  {
    id: "ch10_c5", subject: "Hóa học", grade: "10", domain: SCIENCE_DOMAINS.PHYSICAL_CHEM,
    name: "Tốc độ phản ứng", lessons: ["Tốc độ phản ứng hóa học", "Các yếu tố ảnh hưởng đến tốc độ phản ứng"]
  },

  {
    id: "ch11_c1", subject: "Hóa học", grade: "11", domain: SCIENCE_DOMAINS.PHYSICAL_CHEM,
    name: "Cân bằng hóa học", lessons: ["Khái niệm về cân bằng hóa học", "Sự điện li", "pH của dung dịch"]
  },
  {
    id: "ch11_c2", subject: "Hóa học", grade: "11", domain: SCIENCE_DOMAINS.INORGANIC,
    name: "Nitrogen và Sulfur", lessons: ["Đơn chất Nitrogen", "Ammonia và muối ammonium", "Một số hợp chất của nitrogen", "Sulfur và Sulfur dioxide", "Sulfuric acid"]
  },
  {
    id: "ch11_c3", subject: "Hóa học", grade: "11", domain: SCIENCE_DOMAINS.ORGANIC,
    name: "Đại cương Hóa hữu cơ", lessons: ["Hợp chất hữu cơ", "Phương pháp tách biệt và tinh chế", "Công thức phân tử"]
  },
  {
    id: "ch11_c4", subject: "Hóa học", grade: "11", domain: SCIENCE_DOMAINS.ORGANIC,
    name: "Hydrocarbon", lessons: ["Alkane", "Hydrocarbon không no", "Arene (Hydrocarbon thơm)"]
  },

  {
    id: "ch12_c1", subject: "Hóa học", grade: "12", domain: SCIENCE_DOMAINS.ORGANIC,
    name: "Ester - Lipid", lessons: ["Ester", "Lipid", "Xà phòng và chất giặt rửa"]
  },
  {
    id: "ch12_c2", subject: "Hóa học", grade: "12", domain: SCIENCE_DOMAINS.ORGANIC,
    name: "Carbohydrate", lessons: ["Glucose và Fructose", "Saccharose và Maltose", "Tinh bột và Cellulose"]
  },
  {
    id: "ch12_c3", subject: "Hóa học", grade: "12", domain: SCIENCE_DOMAINS.ORGANIC,
    name: "Hợp chất chứa Nitrogen", lessons: ["Amin", "Amino acid", "Peptide và Protein"]
  },
  {
    id: "ch12_c4", subject: "Hóa học", grade: "12", domain: SCIENCE_DOMAINS.ORGANIC,
    name: "Polymer", lessons: ["Đại cương về polymer", "Vật liệu polymer"]
  },
  {
    id: "ch12_c5", subject: "Hóa học", grade: "12", domain: SCIENCE_DOMAINS.INORGANIC,
    name: "Pin điện và Điện phân", lessons: ["Pin điện hóa", "Điện phân", "Ăn mòn kim loại"]
  },
  {
    id: "ch12_c6", subject: "Hóa học", grade: "12", domain: SCIENCE_DOMAINS.INORGANIC,
    name: "Kim loại", lessons: ["Đại cương về kim loại chuyển tiếp", "Sơ lược về phức chất", "Sắt và hợp chất", "Một số kim loại quan trọng khác"]
  }
];

export const COGNITIVE_LEVELS = ["Biết", "Hiểu", "Vận dụng"];
export const QUESTION_TYPES = ["trắc nghiệm", "tự luận"];
