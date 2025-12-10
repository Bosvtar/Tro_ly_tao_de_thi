
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
  NUM_ALG: "Số và Phép tính",
  GEOMETRY: "Hình học và Đo lường",
  STATS: "Thống kê và Xác suất",
  ALGEBRA: "Đại số và Giải tích"
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
  // TIỂU HỌC (Lớp 1 - 5) - TOÁN (GDPT 2018)
  // =================================================================
  
  // --- LỚP 1 ---
  {
    id: "m1_c1", subject: "Toán", grade: "1", domain: MATH_DOMAINS.NUM_ALG,
    name: "Các số đến 10",
    lessons: ["Các số 0, 1, 2, 3, 4, 5", "Các số 6, 7, 8, 9, 10", "Nhiều hơn, ít hơn, bằng nhau", "So sánh số"]
  },
  {
    id: "m1_c2", subject: "Toán", grade: "1", domain: MATH_DOMAINS.NUM_ALG,
    name: "Phép cộng, phép trừ trong phạm vi 10",
    lessons: ["Phép cộng trong phạm vi 10", "Phép trừ trong phạm vi 10", "Bảng cộng, bảng trừ"]
  },
  {
    id: "m1_c3", subject: "Toán", grade: "1", domain: MATH_DOMAINS.GEOMETRY,
    name: "Hình học và Đo lường",
    lessons: ["Hình vuông, hình tròn, hình tam giác, hình chữ nhật", "Khối lập phương, khối hộp chữ nhật", "Đo độ dài", "Xăng-ti-mét"]
  },
  {
    id: "m1_c4", subject: "Toán", grade: "1", domain: MATH_DOMAINS.NUM_ALG,
    name: "Các số đến 100",
    lessons: ["Chục và đơn vị", "Các số đến 100", "Phép cộng, phép trừ trong phạm vi 100 (không nhớ)"]
  },

  // --- LỚP 2 ---
  {
    id: "m2_c1", subject: "Toán", grade: "2", domain: MATH_DOMAINS.NUM_ALG,
    name: "Phép cộng, phép trừ (có nhớ) trong phạm vi 100",
    lessons: ["Phép cộng có tổng bằng 10", "Phép cộng có nhớ trong phạm vi 100", "Phép trừ có nhớ trong phạm vi 100"]
  },
  {
    id: "m2_c2", subject: "Toán", grade: "2", domain: MATH_DOMAINS.NUM_ALG,
    name: "Phép nhân và Phép chia",
    lessons: ["Làm quen với phép nhân", "Bảng nhân 2, 5", "Làm quen với phép chia", "Bảng chia 2, 5"]
  },
  {
    id: "m2_c3", subject: "Toán", grade: "2", domain: MATH_DOMAINS.GEOMETRY,
    name: "Hình học và Đo lường",
    lessons: ["Điểm, đoạn thẳng, đường thẳng, đường cong", "Ba điểm thẳng hàng", "Đề-xi-mét, Mét, Ki-lô-mét", "Khối trụ, khối cầu"]
  },

  // --- LỚP 3 ---
  {
    id: "m3_c1", subject: "Toán", grade: "3", domain: MATH_DOMAINS.NUM_ALG,
    name: "Phép nhân và phép chia trong phạm vi 1000",
    lessons: ["Bảng nhân 3, 4, 6, 7, 8, 9", "Bảng chia 3, 4, 6, 7, 8, 9", "Nhân/Chia số có 2,3 chữ số với số có 1 chữ số"]
  },
  {
    id: "m3_c2", subject: "Toán", grade: "3", domain: MATH_DOMAINS.GEOMETRY,
    name: "Góc và Hình",
    lessons: ["Góc vuông, góc không vuông", "Hình tam giác, hình tứ giác", "Hình chữ nhật, hình vuông", "Chu vi hình chữ nhật, hình vuông", "Diện tích hình chữ nhật, hình vuông"]
  },
  {
    id: "m3_c3", subject: "Toán", grade: "3", domain: MATH_DOMAINS.NUM_ALG,
    name: "Các số đến 100 000",
    lessons: ["Các số đến 100 000", "Phép cộng, phép trừ trong phạm vi 100 000", "Nhân/Chia số có 5 chữ số với số có 1 chữ số"]
  },

  // --- LỚP 4 ---
  {
    id: "m4_c1", subject: "Toán", grade: "4", domain: MATH_DOMAINS.NUM_ALG,
    name: "Số tự nhiên",
    lessons: ["Số có nhiều chữ số", "Hàng và lớp", "So sánh các số có nhiều chữ số", "Yến, tạ, tấn", "Giây, thế kỉ"]
  },
  {
    id: "m4_c2", subject: "Toán", grade: "4", domain: MATH_DOMAINS.NUM_ALG,
    name: "Bốn phép tính với số tự nhiên",
    lessons: ["Phép cộng, phép trừ", "Biểu thức có chứa chữ", "Tính chất giao hoán, kết hợp", "Nhân với số có hai chữ số", "Chia cho số có hai chữ số", "Trung bình cộng"]
  },
  {
    id: "m4_c3", subject: "Toán", grade: "4", domain: MATH_DOMAINS.NUM_ALG,
    name: "Phân số",
    lessons: ["Khái niệm phân số", "Phân số bằng nhau", "Quy đồng mẫu số", "Cộng, trừ, nhân, chia phân số"]
  },
  {
    id: "m4_c4", subject: "Toán", grade: "4", domain: MATH_DOMAINS.GEOMETRY,
    name: "Hình học",
    lessons: ["Góc nhọn, góc tù, góc bẹt", "Hai đường thẳng vuông góc, song song", "Hình bình hành", "Hình thoi"]
  },

  // --- LỚP 5 ---
  {
    id: "m5_c1", subject: "Toán", grade: "5", domain: MATH_DOMAINS.NUM_ALG,
    name: "Số thập phân",
    lessons: ["Khái niệm số thập phân", "Hàng của số thập phân", "Số thập phân bằng nhau", "So sánh hai số thập phân"]
  },
  {
    id: "m5_c2", subject: "Toán", grade: "5", domain: MATH_DOMAINS.NUM_ALG,
    name: "Các phép tính với số thập phân",
    lessons: ["Cộng hai số thập phân", "Trừ hai số thập phân", "Nhân số thập phân", "Chia số thập phân", "Tỉ số phần trăm"]
  },
  {
    id: "m5_c3", subject: "Toán", grade: "5", domain: MATH_DOMAINS.GEOMETRY,
    name: "Hình học",
    lessons: ["Hình tam giác", "Diện tích hình tam giác", "Hình thang", "Diện tích hình thang", "Hình tròn, đường tròn", "Chu vi và diện tích hình tròn"]
  },
  {
    id: "m5_c4", subject: "Toán", grade: "5", domain: MATH_DOMAINS.GEOMETRY,
    name: "Số đo thời gian & Chuyển động",
    lessons: ["Bảng đơn vị đo thời gian", "Cộng, trừ, nhân, chia số đo thời gian", "Vận tốc", "Quãng đường", "Thời gian", "Chuyển động đều"]
  },

  // =================================================================
  // THCS (Lớp 6 - 9) - TOÁN (GDPT 2018 - KNTT/Cánh Diều/CTST)
  // =================================================================
  
  // --- LỚP 6 ---
  {
    id: "m6_c1", subject: "Toán", grade: "6", domain: MATH_DOMAINS.NUM_ALG,
    name: "Tập hợp các số tự nhiên",
    lessons: ["Tập hợp", "Cách ghi số tự nhiên", "Thứ tự trong tập hợp số tự nhiên", "Phép cộng và phép trừ số tự nhiên", "Phép nhân và phép chia số tự nhiên", "Lũy thừa với số mũ tự nhiên", "Thứ tự thực hiện các phép tính"]
  },
  {
    id: "m6_c2", subject: "Toán", grade: "6", domain: MATH_DOMAINS.NUM_ALG,
    name: "Tính chia hết trong tập hợp số tự nhiên",
    lessons: ["Quan hệ chia hết và tính chất", "Dấu hiệu chia hết cho 2, cho 5", "Dấu hiệu chia hết cho 3, cho 9", "Số nguyên tố", "Hợp số", "Phân tích một số ra thừa số nguyên tố", "Ước chung và Ước chung lớn nhất", "Bội chung và Bội chung nhỏ nhất"]
  },
  {
    id: "m6_c3", subject: "Toán", grade: "6", domain: MATH_DOMAINS.NUM_ALG,
    name: "Số nguyên",
    lessons: ["Số nguyên âm và tập hợp các số nguyên", "Thứ tự trong tập hợp số nguyên", "Phép cộng số nguyên", "Phép trừ số nguyên. Quy tắc dấu ngoặc", "Quy tắc 'dấu ngoặc'", "Phép nhân số nguyên", "Phép chia hết. Ước và bội của một số nguyên"]
  },
  {
    id: "m6_c4", subject: "Toán", grade: "6", domain: MATH_DOMAINS.GEOMETRY,
    name: "Một số hình phẳng trong thực tiễn",
    lessons: ["Tam giác đều. Hình vuông. Lục giác đều", "Hình chữ nhật. Hình thoi. Hình bình hành. Hình thang cân", "Chu vi và diện tích của một số hình phẳng"]
  },
  {
    id: "m6_c5", subject: "Toán", grade: "6", domain: MATH_DOMAINS.GEOMETRY,
    name: "Tính đối xứng của hình phẳng",
    lessons: ["Hình có trục đối xứng", "Hình có tâm đối xứng"]
  },
  {
    id: "m6_c6", subject: "Toán", grade: "6", domain: MATH_DOMAINS.NUM_ALG,
    name: "Phân số",
    lessons: ["Mở rộng khái niệm phân số", "So sánh phân số", "Phép cộng và phép trừ phân số", "Phép nhân và phép chia phân số", "Hai bài toán về phân số"]
  },
  {
    id: "m6_c7", subject: "Toán", grade: "6", domain: MATH_DOMAINS.NUM_ALG,
    name: "Số thập phân",
    lessons: ["Số thập phân", "Tính toán với số thập phân", "Làm tròn số thập phân và ước lượng kết quả", "Tỉ số và tỉ số phần trăm", "Hai bài toán về tỉ số phần trăm"]
  },
  {
    id: "m6_c8", subject: "Toán", grade: "6", domain: MATH_DOMAINS.GEOMETRY,
    name: "Những hình hình học cơ bản",
    lessons: ["Điểm. Đường thẳng", "Điểm nằm giữa hai điểm. Tia", "Đoạn thẳng", "Trung điểm của đoạn thẳng", "Góc"]
  },
  {
    id: "m6_c9", subject: "Toán", grade: "6", domain: MATH_DOMAINS.STATS,
    name: "Dữ liệu và xác suất thực nghiệm",
    lessons: ["Dữ liệu và thu thập dữ liệu", "Biểu đồ cột", "Biểu đồ cột kép", "Kết quả có thể và sự kiện trong trò chơi, thí nghiệm", "Xác suất thực nghiệm"]
  },

  // --- LỚP 7 ---
  {
    id: "m7_c1", subject: "Toán", grade: "7", domain: MATH_DOMAINS.NUM_ALG,
    name: "Số hữu tỉ",
    lessons: ["Tập hợp các số hữu tỉ", "Cộng, trừ, nhân, chia số hữu tỉ", "Lũy thừa với số mũ tự nhiên của một số hữu tỉ", "Quy tắc dấu ngoặc và quy tắc chuyển vế"]
  },
  {
    id: "m7_c2", subject: "Toán", grade: "7", domain: MATH_DOMAINS.NUM_ALG,
    name: "Số thực",
    lessons: ["Số vô tỉ. Căn bậc hai số học", "Số thực. Giá trị tuyệt đối của một số thực", "Làm tròn số và ước lượng kết quả"]
  },
  {
    id: "m7_c3", subject: "Toán", grade: "7", domain: MATH_DOMAINS.GEOMETRY,
    name: "Góc và đường thẳng song song",
    lessons: ["Góc ở vị trí đặc biệt. Tia phân giác của một góc", "Hai đường thẳng song song và dấu hiệu nhận biết", "Tiên đề Euclid. Tính chất của hai đường thẳng song song", "Định lí và chứng minh định lí"]
  },
  {
    id: "m7_c4", subject: "Toán", grade: "7", domain: MATH_DOMAINS.GEOMETRY,
    name: "Tam giác bằng nhau",
    lessons: ["Tổng các góc trong một tam giác", "Hai tam giác bằng nhau. Trường hợp bằng nhau thứ nhất (c.c.c)", "Trường hợp bằng nhau thứ hai (c.g.c)", "Trường hợp bằng nhau thứ ba (g.c.g)", "Tam giác cân. Đường trung trực của đoạn thẳng"]
  },
  {
    id: "m7_c5", subject: "Toán", grade: "7", domain: MATH_DOMAINS.STATS,
    name: "Thu thập và biểu diễn dữ liệu",
    lessons: ["Thu thập và phân loại dữ liệu", "Biểu đồ hình quạt tròn", "Biểu đồ đoạn thẳng"]
  },
  {
    id: "m7_c6", subject: "Toán", grade: "7", domain: MATH_DOMAINS.NUM_ALG,
    name: "Tỉ lệ thức và Đại lượng tỉ lệ",
    lessons: ["Tỉ lệ thức", "Tính chất của dãy tỉ số bằng nhau", "Đại lượng tỉ lệ thuận", "Đại lượng tỉ lệ nghịch"]
  },
  {
    id: "m7_c7", subject: "Toán", grade: "7", domain: MATH_DOMAINS.NUM_ALG,
    name: "Biểu thức đại số",
    lessons: ["Biểu thức đại số", "Đa thức một biến", "Cộng và trừ đa thức một biến", "Phép nhân đa thức một biến", "Phép chia đa thức một biến"]
  },
  {
    id: "m7_c8", subject: "Toán", grade: "7", domain: MATH_DOMAINS.GEOMETRY,
    name: "Tam giác",
    lessons: ["Quan hệ giữa góc và cạnh đối diện trong một tam giác", "Quan hệ giữa đường vuông góc và đường xiên", "Quan hệ giữa ba cạnh của một tam giác", "Sự đồng quy của ba đường trung tuyến, ba đường phân giác", "Sự đồng quy của ba đường trung trực, ba đường cao"]
  },

  // --- LỚP 8 ---
  {
    id: "m8_c1", subject: "Toán", grade: "8", domain: MATH_DOMAINS.NUM_ALG,
    name: "Đa thức",
    lessons: ["Đơn thức và đa thức nhiều biến", "Các phép tính với đa thức nhiều biến", "Hằng đẳng thức đáng nhớ", "Phân tích đa thức thành nhân tử"]
  },
  {
    id: "m8_c2", subject: "Toán", grade: "8", domain: MATH_DOMAINS.NUM_ALG,
    name: "Phân thức đại số",
    lessons: ["Phân thức đại số", "Cộng và trừ phân thức", "Nhân và chia phân thức"]
  },
  {
    id: "m8_c3", subject: "Toán", grade: "8", domain: MATH_DOMAINS.NUM_ALG,
    name: "Hàm số và đồ thị",
    lessons: ["Hàm số bậc nhất", "Mặt phẳng tọa độ và đồ thị hàm số bậc nhất", "Hệ số góc của đường thẳng"]
  },
  {
    id: "m8_c4", subject: "Toán", grade: "8", domain: MATH_DOMAINS.GEOMETRY,
    name: "Hình học trực quan",
    lessons: ["Hình chóp tam giác đều", "Hình chóp tứ giác đều"]
  },
  {
    id: "m8_c5", subject: "Toán", grade: "8", domain: MATH_DOMAINS.GEOMETRY,
    name: "Tứ giác",
    lessons: ["Tứ giác", "Hình thang cân", "Hình bình hành", "Hình chữ nhật", "Hình thoi", "Hình vuông"]
  },
  {
    id: "m8_c6", subject: "Toán", grade: "8", domain: MATH_DOMAINS.GEOMETRY,
    name: "Định lí Thalès và Tam giác đồng dạng",
    lessons: ["Định lí Thalès trong tam giác", "Đường trung bình của tam giác", "Tính chất đường phân giác của tam giác", "Tam giác đồng dạng", "Các trường hợp đồng dạng của hai tam giác"]
  },
  {
    id: "m8_c7", subject: "Toán", grade: "8", domain: MATH_DOMAINS.STATS,
    name: "Mở đầu về tính xác suất của biến cố",
    lessons: ["Mô tả xác suất bằng tỉ số", "Xác suất thực nghiệm"]
  },
  {
    id: "m8_c8", subject: "Toán", grade: "8", domain: MATH_DOMAINS.NUM_ALG,
    name: "Phương trình",
    lessons: ["Phương trình bậc nhất một ẩn", "Giải bài toán bằng cách lập phương trình"]
  },

  // --- LỚP 9 ---
  {
    id: "m9_c1", subject: "Toán", grade: "9", domain: MATH_DOMAINS.NUM_ALG,
    name: "Hệ phương trình bậc nhất hai ẩn",
    lessons: ["Phương trình bậc nhất hai ẩn", "Hệ hai phương trình bậc nhất hai ẩn", "Giải hệ phương trình bằng phương pháp thế", "Giải hệ phương trình bằng phương pháp cộng đại số", "Giải bài toán bằng cách lập hệ phương trình"]
  },
  {
    id: "m9_c2", subject: "Toán", grade: "9", domain: MATH_DOMAINS.NUM_ALG,
    name: "Phương trình và bất phương trình bậc nhất một ẩn",
    lessons: ["Phương trình quy về phương trình bậc nhất một ẩn", "Bất đẳng thức", "Bất phương trình bậc nhất một ẩn"]
  },
  {
    id: "m9_c3", subject: "Toán", grade: "9", domain: MATH_DOMAINS.NUM_ALG,
    name: "Căn bậc hai và Căn bậc ba",
    lessons: ["Căn bậc hai", "Căn thức bậc hai", "Biến đổi đơn giản biểu thức chứa căn thức bậc hai", "Căn bậc ba"]
  },
  {
    id: "m9_c4", subject: "Toán", grade: "9", domain: MATH_DOMAINS.GEOMETRY,
    name: "Hệ thức lượng trong tam giác vuông",
    lessons: ["Tỉ số lượng giác của góc nhọn", "Một số hệ thức về cạnh và góc trong tam giác vuông", "Ứng dụng thực tế của tỉ số lượng giác"]
  },
  {
    id: "m9_c5", subject: "Toán", grade: "9", domain: MATH_DOMAINS.GEOMETRY,
    name: "Đường tròn",
    lessons: ["Đường tròn. Tính đối xứng của đường tròn", "Đường kính và dây của đường tròn", "Vị trí tương đối của đường thẳng và đường tròn", "Vị trí tương đối của hai đường tròn", "Tiếp tuyến của đường tròn", "Góc ở tâm. Số đo cung"]
  },
  {
    id: "m9_c6", subject: "Toán", grade: "9", domain: MATH_DOMAINS.NUM_ALG,
    name: "Hàm số y = ax² (a ≠ 0). Phương trình bậc hai một ẩn",
    lessons: ["Hàm số y = ax² (a ≠ 0)", "Phương trình bậc hai một ẩn", "Định lí Viète và ứng dụng", "Giải bài toán bằng cách lập phương trình"]
  },
  {
    id: "m9_c7", subject: "Toán", grade: "9", domain: MATH_DOMAINS.STATS,
    name: "Tần số và Tần số tương đối",
    lessons: ["Bảng tần số và tần số tương đối", "Biểu đồ tần số và biểu đồ tần số tương đối"]
  },
  {
    id: "m9_c8", subject: "Toán", grade: "9", domain: MATH_DOMAINS.STATS,
    name: "Xác suất của biến cố",
    lessons: ["Phép thử ngẫu nhiên và không gian mẫu", "Xác suất của biến cố"]
  },
  {
    id: "m9_c9", subject: "Toán", grade: "9", domain: MATH_DOMAINS.GEOMETRY,
    name: "Hình học không gian",
    lessons: ["Hình trụ", "Hình nón", "Hình cầu"]
  },

  // =================================================================
  // THPT (Lớp 10 - 12) - TOÁN (GDPT 2018)
  // =================================================================
  
  // --- LỚP 10 ---
  {
    id: "m10_c1", subject: "Toán", grade: "10", domain: MATH_DOMAINS.ALGEBRA,
    name: "Mệnh đề và Tập hợp",
    lessons: ["Mệnh đề", "Tập hợp", "Các phép toán trên tập hợp"]
  },
  {
    id: "m10_c2", subject: "Toán", grade: "10", domain: MATH_DOMAINS.ALGEBRA,
    name: "Bất phương trình và Hệ bất phương trình bậc nhất hai ẩn",
    lessons: ["Bất phương trình bậc nhất hai ẩn", "Hệ bất phương trình bậc nhất hai ẩn"]
  },
  {
    id: "m10_c3", subject: "Toán", grade: "10", domain: MATH_DOMAINS.GEOMETRY,
    name: "Hệ thức lượng trong tam giác",
    lessons: ["Giá trị lượng giác của một góc từ 0° đến 180°", "Định lí côsin và định lí sin", "Giải tam giác và ứng dụng thực tế"]
  },
  {
    id: "m10_c4", subject: "Toán", grade: "10", domain: MATH_DOMAINS.GEOMETRY,
    name: "Vectơ",
    lessons: ["Khái niệm vectơ", "Tổng và hiệu của hai vectơ", "Tích của một số với một vectơ", "Tích vô hướng của hai vectơ"]
  },
  {
    id: "m10_c5", subject: "Toán", grade: "10", domain: MATH_DOMAINS.ALGEBRA,
    name: "Hàm số, Đồ thị và Ứng dụng",
    lessons: ["Hàm số", "Hàm số bậc hai", "Dấu của tam thức bậc hai", "Phương trình quy về phương trình bậc hai"]
  },
  {
    id: "m10_c6", subject: "Toán", grade: "10", domain: MATH_DOMAINS.GEOMETRY,
    name: "Phương pháp tọa độ trong mặt phẳng",
    lessons: ["Tọa độ của vectơ", "Đường thẳng trong mặt phẳng tọa độ", "Đường tròn trong mặt phẳng tọa độ", "Ba đường conic"]
  },
  {
    id: "m10_c7", subject: "Toán", grade: "10", domain: MATH_DOMAINS.ALGEBRA,
    name: "Đại số tổ hợp",
    lessons: ["Quy tắc đếm", "Hoán vị, chỉnh hợp và tổ hợp", "Nhị thức Newton"]
  },
  {
    id: "m10_c8", subject: "Toán", grade: "10", domain: MATH_DOMAINS.STATS,
    name: "Tính xác suất theo định nghĩa cổ điển",
    lessons: ["Không gian mẫu và biến cố", "Xác suất của biến cố"]
  },

  // --- LỚP 11 ---
  {
    id: "m11_c1", subject: "Toán", grade: "11", domain: MATH_DOMAINS.ALGEBRA,
    name: "Hàm số lượng giác và Phương trình lượng giác",
    lessons: ["Góc lượng giác", "Giá trị lượng giác của một góc lượng giác", "Công thức lượng giác", "Hàm số lượng giác", "Phương trình lượng giác cơ bản"]
  },
  {
    id: "m11_c2", subject: "Toán", grade: "11", domain: MATH_DOMAINS.ALGEBRA,
    name: "Dãy số. Cấp số cộng và Cấp số nhân",
    lessons: ["Dãy số", "Cấp số cộng", "Cấp số nhân"]
  },
  {
    id: "m11_c3", subject: "Toán", grade: "11", domain: MATH_DOMAINS.STATS,
    name: "Các số đặc trưng đo xu thế trung tâm của mẫu số liệu ghép nhóm",
    lessons: ["Mẫu số liệu ghép nhóm", "Các số đặc trưng đo xu thế trung tâm"]
  },
  {
    id: "m11_c4", subject: "Toán", grade: "11", domain: MATH_DOMAINS.GEOMETRY,
    name: "Quan hệ song song trong không gian",
    lessons: ["Điểm, đường thẳng và mặt phẳng", "Hai đường thẳng song song", "Đường thẳng và mặt phẳng song song", "Hai mặt phẳng song song", "Phép chiếu song song"]
  },
  {
    id: "m11_c5", subject: "Toán", grade: "11", domain: MATH_DOMAINS.ALGEBRA,
    name: "Giới hạn. Hàm số liên tục",
    lessons: ["Giới hạn của dãy số", "Giới hạn của hàm số", "Hàm số liên tục"]
  },
  {
    id: "m11_c6", subject: "Toán", grade: "11", domain: MATH_DOMAINS.ALGEBRA,
    name: "Hàm số mũ và Hàm số lôgarit",
    lessons: ["Phép tính lũy thừa", "Phép tính lôgarit", "Hàm số mũ và hàm số lôgarit", "Phương trình, bất phương trình mũ và lôgarit"]
  },
  {
    id: "m11_c7", subject: "Toán", grade: "11", domain: MATH_DOMAINS.ALGEBRA,
    name: "Đạo hàm",
    lessons: ["Định nghĩa và ý nghĩa của đạo hàm", "Các quy tắc tính đạo hàm", "Đạo hàm cấp hai"]
  },
  {
    id: "m11_c8", subject: "Toán", grade: "11", domain: MATH_DOMAINS.GEOMETRY,
    name: "Quan hệ vuông góc trong không gian",
    lessons: ["Hai đường thẳng vuông góc", "Đường thẳng vuông góc với mặt phẳng", "Hai mặt phẳng vuông góc", "Khoảng cách", "Góc"]
  },
  {
    id: "m11_c9", subject: "Toán", grade: "11", domain: MATH_DOMAINS.STATS,
    name: "Xác suất",
    lessons: ["Biến cố giao và quy tắc nhân xác suất", "Biến cố hợp và quy tắc cộng xác suất"]
  },

  // --- LỚP 12 ---
  {
    id: "m12_c1", subject: "Toán", grade: "12", domain: MATH_DOMAINS.ALGEBRA,
    name: "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    lessons: ["Tính đơn điệu và cực trị của hàm số", "Giá trị lớn nhất và giá trị nhỏ nhất của hàm số", "Đường tiệm cận của đồ thị hàm số", "Khảo sát sự biến thiên và vẽ đồ thị hàm số", "Ứng dụng đạo hàm để giải quyết một số vấn đề thực tiễn"]
  },
  {
    id: "m12_c2", subject: "Toán", grade: "12", domain: MATH_DOMAINS.GEOMETRY,
    name: "Vectơ và hệ trục tọa độ trong không gian",
    lessons: ["Vectơ trong không gian", "Hệ trục tọa độ trong không gian", "Biểu thức tọa độ của các phép toán vectơ"]
  },
  {
    id: "m12_c3", subject: "Toán", grade: "12", domain: MATH_DOMAINS.STATS,
    name: "Các số đặc trưng đo mức độ phân tán cho mẫu số liệu ghép nhóm",
    lessons: ["Khoảng biến thiên và khoảng tứ phân vị", "Phương sai và độ lệch chuẩn"]
  },
  {
    id: "m12_c4", subject: "Toán", grade: "12", domain: MATH_DOMAINS.ALGEBRA,
    name: "Nguyên hàm và Tích phân",
    lessons: ["Nguyên hàm", "Tích phân", "Ứng dụng hình học của tích phân"]
  },
  {
    id: "m12_c5", subject: "Toán", grade: "12", domain: MATH_DOMAINS.GEOMETRY,
    name: "Phương pháp tọa độ trong không gian",
    lessons: ["Phương trình mặt phẳng", "Phương trình đường thẳng trong không gian", "Phương trình mặt cầu"]
  },
  {
    id: "m12_c6", subject: "Toán", grade: "12", domain: MATH_DOMAINS.STATS,
    name: "Xác suất có điều kiện",
    lessons: ["Xác suất có điều kiện", "Công thức xác suất toàn phần và công thức Bayes"]
  },


  // =================================================================
  // VẬT LÍ (PHYSICS) - GDPT 2018
  // =================================================================
  
  // --- VẬT LÍ 6 (Trích KHTN 6) ---
  {
    id: "p6_c1", subject: "Vật lí", grade: "6", domain: SCIENCE_DOMAINS.MECHANICS,
    name: "Phép đo", lessons: ["Đo chiều dài", "Đo khối lượng", "Đo thời gian", "Thang nhiệt độ Celsius. Đo nhiệt độ"]
  },
  {
    id: "p6_c2", subject: "Vật lí", grade: "6", domain: SCIENCE_DOMAINS.MECHANICS,
    name: "Lực và Chuyển động", lessons: ["Lực và tác dụng của lực", "Lực tiếp xúc và lực không tiếp xúc", "Biến dạng của lò xo. Phép đo lực", "Trọng lượng và lực hấp dẫn", "Lực ma sát"]
  },
  {
    id: "p6_c3", subject: "Vật lí", grade: "6", domain: SCIENCE_DOMAINS.ENERGY,
    name: "Năng lượng", lessons: ["Năng lượng và sự truyền năng lượng", "Bảo toàn năng lượng", "Năng lượng hao phí"]
  },
  {
    id: "p6_c4", subject: "Vật lí", grade: "6", domain: SCIENCE_DOMAINS.EARTH,
    name: "Trái Đất và Bầu trời", lessons: ["Chuyển động nhìn thấy của Mặt Trời", "Chuyển động nhìn thấy của Mặt Trăng", "Hệ Mặt Trời và Ngân Hà"]
  },

  // --- VẬT LÍ 7 (Trích KHTN 7) ---
  {
    id: "p7_c1", subject: "Vật lí", grade: "7", domain: SCIENCE_DOMAINS.MECHANICS,
    name: "Tốc độ", lessons: ["Tốc độ chuyển động", "Đo tốc độ", "Đồ thị quãng đường - thời gian"]
  },
  {
    id: "p7_c2", subject: "Vật lí", grade: "7", domain: SCIENCE_DOMAINS.ACOUSTICS,
    name: "Âm thanh", lessons: ["Mô tả sóng âm", "Độ to và độ cao của âm", "Phản xạ âm"]
  },
  {
    id: "p7_c3", subject: "Vật lí", grade: "7", domain: SCIENCE_DOMAINS.OPTICS,
    name: "Ánh sáng", lessons: ["Ánh sáng, tia sáng", "Sự phản xạ ánh sáng", "Ảnh của vật qua gương phẳng"]
  },
  {
    id: "p7_c4", subject: "Vật lí", grade: "7", domain: SCIENCE_DOMAINS.ELECTRICITY,
    name: "Từ trường", lessons: ["Nam châm", "Từ trường", "Từ trường Trái Đất", "Nam châm điện"]
  },

  // --- VẬT LÍ 8 (Trích KHTN 8) ---
  {
    id: "p8_c1", subject: "Vật lí", grade: "8", domain: SCIENCE_DOMAINS.MECHANICS,
    name: "Khối lượng riêng và Áp suất", lessons: ["Khối lượng riêng", "Áp suất trên một bề mặt", "Áp suất chất lỏng", "Áp suất khí quyển", "Lực đẩy Archimedes"]
  },
  {
    id: "p8_c2", subject: "Vật lí", grade: "8", domain: SCIENCE_DOMAINS.MECHANICS,
    name: "Tác dụng làm quay của lực", lessons: ["Moment lực", "Đòn bẩy"]
  },
  {
    id: "p8_c3", subject: "Vật lí", grade: "8", domain: SCIENCE_DOMAINS.ELECTRICITY,
    name: "Điện", lessons: ["Hiện tượng nhiễm điện do cọ xát", "Dòng điện. Nguồn điện", "Mạch điện và các thiết bị an toàn", "Tác dụng của dòng điện", "Cường độ dòng điện và hiệu điện thế"]
  },
  {
    id: "p8_c4", subject: "Vật lí", grade: "8", domain: SCIENCE_DOMAINS.THERMAL,
    name: "Nhiệt", lessons: ["Năng lượng nhiệt và nội năng", "Sự truyền nhiệt", "Sự nở vì nhiệt"]
  },

  // --- VẬT LÍ 9 (Trích KHTN 9) ---
  {
    id: "p9_c1", subject: "Vật lí", grade: "9", domain: SCIENCE_DOMAINS.ENERGY,
    name: "Năng lượng cơ học", lessons: ["Động năng. Thế năng", "Cơ năng"]
  },
  {
    id: "p9_c2", subject: "Vật lí", grade: "9", domain: SCIENCE_DOMAINS.OPTICS,
    name: "Ánh sáng", lessons: ["Hiện tượng khúc xạ ánh sáng", "Thấu kính hội tụ", "Thấu kính phân kì", "Mắt và các tật của mắt", "Kính lúp"]
  },
  {
    id: "p9_c3", subject: "Vật lí", grade: "9", domain: SCIENCE_DOMAINS.ELECTRICITY,
    name: "Điện từ", lessons: ["Từ trường của ống dây có dòng điện", "Lực từ", "Cảm ứng điện từ", "Dòng điện xoay chiều", "Máy biến thế"]
  },
  {
    id: "p9_c4", subject: "Vật lí", grade: "9", domain: SCIENCE_DOMAINS.ENERGY,
    name: "Năng lượng và cuộc sống", lessons: ["Vòng tuần hoàn năng lượng trên Trái Đất", "Năng lượng hóa thạch", "Năng lượng tái tạo"]
  },

  // --- VẬT LÍ 10 ---
  {
    id: "p10_c1", subject: "Vật lí", grade: "10", domain: SCIENCE_DOMAINS.MECHANICS,
    name: "Mở đầu và Động học", lessons: ["Mô tả chuyển động", "Chuyển động thẳng biến đổi đều", "Sự rơi tự do", "Chuyển động ném"]
  },
  {
    id: "p10_c2", subject: "Vật lí", grade: "10", domain: SCIENCE_DOMAINS.MECHANICS,
    name: "Động lực học", lessons: ["Tổng hợp và phân tích lực", "Ba định luật Newton", "Một số lực thường gặp", "Moment lực. Cân bằng của vật rắn"]
  },
  {
    id: "p10_c3", subject: "Vật lí", grade: "10", domain: SCIENCE_DOMAINS.ENERGY,
    name: "Năng lượng, Công, Công suất", lessons: ["Công và Công suất", "Cơ năng và định luật bảo toàn cơ năng", "Động lượng. Định luật bảo toàn động lượng"]
  },
  {
    id: "p10_c4", subject: "Vật lí", grade: "10", domain: SCIENCE_DOMAINS.MECHANICS,
    name: "Chuyển động tròn", lessons: ["Chuyển động tròn đều", "Lực hướng tâm"]
  },

  // --- VẬT LÍ 11 ---
  {
    id: "p11_c1", subject: "Vật lí", grade: "11", domain: SCIENCE_DOMAINS.MECHANICS,
    name: "Dao động", lessons: ["Mô tả dao động", "Phương trình dao động điều hòa", "Năng lượng trong dao động điều hòa", "Dao động tắt dần và hiện tượng cộng hưởng"]
  },
  {
    id: "p11_c2", subject: "Vật lí", grade: "11", domain: SCIENCE_DOMAINS.ACOUSTICS,
    name: "Sóng", lessons: ["Mô tả sóng", "Sóng ngang, sóng dọc, sự truyền năng lượng của sóng", "Sóng điện từ", "Giao thoa sóng", "Sóng dừng"]
  },
  {
    id: "p11_c3", subject: "Vật lí", grade: "11", domain: SCIENCE_DOMAINS.ELECTRICITY,
    name: "Điện trường", lessons: ["Lực tương tác tĩnh điện", "Khái niệm điện trường", "Điện trường đều", "Thế năng điện", "Điện thế", "Tụ điện"]
  },
  {
    id: "p11_c4", subject: "Vật lí", grade: "11", domain: SCIENCE_DOMAINS.ELECTRICITY,
    name: "Dòng điện", lessons: ["Cường độ dòng điện", "Điện trở. Định luật Ohm", "Nguồn điện", "Năng lượng điện. Công suất điện"]
  },

  // --- VẬT LÍ 12 ---
  {
    id: "p12_c1", subject: "Vật lí", grade: "12", domain: SCIENCE_DOMAINS.THERMAL,
    name: "Vật lí nhiệt", lessons: ["Sự chuyển thể của các chất", "Nội năng. Định luật 1 nhiệt động lực học", "Nhiệt độ. Thang nhiệt độ"]
  },
  {
    id: "p12_c2", subject: "Vật lí", grade: "12", domain: SCIENCE_DOMAINS.THERMAL,
    name: "Khí lí tưởng", lessons: ["Mô hình động học phân tử chất khí", "Phương trình trạng thái khí lí tưởng", "Quá trình đẳng nhiệt. Định luật Boyle", "Quá trình đẳng áp. Định luật Charles"]
  },
  {
    id: "p12_c3", subject: "Vật lí", grade: "12", domain: SCIENCE_DOMAINS.ELECTRICITY,
    name: "Từ trường", lessons: ["Khái niệm từ trường", "Lực từ", "Cảm ứng từ", "Dòng điện xoay chiều (Sơ lược)"]
  },
  {
    id: "p12_c4", subject: "Vật lí", grade: "12", domain: SCIENCE_DOMAINS.MODERN_PHYSICS,
    name: "Vật lí hạt nhân", lessons: ["Cấu tạo hạt nhân", "Năng lượng liên kết hạt nhân", "Phóng xạ", "Phản ứng hạt nhân", "Phản ứng phân hạch, nhiệt hạch"]
  },

  // =================================================================
  // HÓA HỌC (CHEMISTRY) - GDPT 2018
  // =================================================================
  
  // --- HÓA HỌC 6 (Trích KHTN 6) ---
  {
    id: "ch6_c1", subject: "Hóa học", grade: "6", domain: SCIENCE_DOMAINS.MATTER,
    name: "Chất và sự biến đổi", lessons: ["Sự đa dạng của chất", "Ba thể của chất", "Sự chuyển thể", "Oxygen và không khí"]
  },
  {
    id: "ch6_c2", subject: "Hóa học", grade: "6", domain: SCIENCE_DOMAINS.MATTER,
    name: "Hỗn hợp", lessons: ["Hỗn hợp, chất tinh khiết, dung dịch", "Tách chất ra khỏi hỗn hợp"]
  },
  {
    id: "ch6_c3", subject: "Hóa học", grade: "6", domain: SCIENCE_DOMAINS.MATTER,
    name: "Nhiên liệu và Nguyên liệu", lessons: ["Một số nhiên liệu thông dụng", "Một số nguyên liệu thông dụng"]
  },

  // --- HÓA HỌC 7 (Trích KHTN 7) ---
  {
    id: "ch7_c1", subject: "Hóa học", grade: "7", domain: SCIENCE_DOMAINS.MATTER,
    name: "Nguyên tử và Nguyên tố", lessons: ["Nguyên tử", "Nguyên tố hóa học", "Sơ lược về bảng tuần hoàn các nguyên tố hóa học"]
  },
  {
    id: "ch7_c2", subject: "Hóa học", grade: "7", domain: SCIENCE_DOMAINS.MATTER,
    name: "Phân tử và Liên kết", lessons: ["Phân tử. Đơn chất. Hợp chất", "Giới thiệu về liên kết hóa học (ion, cộng hóa trị)", "Hóa trị và công thức hóa học"]
  },

  // --- HÓA HỌC 8 (Trích KHTN 8) ---
  {
    id: "ch8_c1", subject: "Hóa học", grade: "8", domain: SCIENCE_DOMAINS.MATTER,
    name: "Phản ứng hóa học", lessons: ["Biến đổi vật lí và biến đổi hóa học", "Phản ứng hóa học", "Định luật bảo toàn khối lượng", "Phương trình hóa học", "Mol và tỉ khối của chất khí", "Tính theo phương trình hóa học", "Nồng độ dung dịch"]
  },
  {
    id: "ch8_c2", subject: "Hóa học", grade: "8", domain: SCIENCE_DOMAINS.MATTER,
    name: "Các hợp chất vô cơ", lessons: ["Acid", "Base", "Oxide", "Muối", "Phân bón hóa học", "Thang pH"]
  },

  // --- HÓA HỌC 9 (Trích KHTN 9) ---
  {
    id: "ch9_c1", subject: "Hóa học", grade: "9", domain: SCIENCE_DOMAINS.MATTER,
    name: "Kim loại", lessons: ["Tính chất chung của kim loại", "Dãy hoạt động hóa học", "Tách kim loại", "Hợp kim"]
  },
  {
    id: "ch9_c2", subject: "Hóa học", grade: "9", domain: SCIENCE_DOMAINS.MATTER,
    name: "Phi kim", lessons: ["Tính chất của phi kim", "Sơ lược về nhóm Halogen"]
  },
  {
    id: "ch9_c3", subject: "Hóa học", grade: "9", domain: SCIENCE_DOMAINS.MATTER,
    name: "Hóa hữu cơ", lessons: ["Hợp chất hữu cơ", "Cấu tạo phân tử hợp chất hữu cơ", "Alkane (Metan)", "Alkene (Etilen)", "Ethylic alcohol", "Acetic acid", "Ester - Lipid", "Carbohydrate (Glucose, Saccharose, Tinh bột, Cellulose)", "Protein và Polymer"]
  },

  // --- HÓA HỌC 10 ---
  {
    id: "ch10_c1", subject: "Hóa học", grade: "10", domain: SCIENCE_DOMAINS.MATTER,
    name: "Cấu tạo nguyên tử", lessons: ["Thành phần của nguyên tử", "Nguyên tố hóa học", "Cấu trúc lớp vỏ electron nguyên tử"]
  },
  {
    id: "ch10_c2", subject: "Hóa học", grade: "10", domain: SCIENCE_DOMAINS.MATTER,
    name: "Bảng tuần hoàn", lessons: ["Cấu tạo bảng tuần hoàn các nguyên tố hóa học", "Xu hướng biến đổi một số tính chất của nguyên tử"]
  },
  {
    id: "ch10_c3", subject: "Hóa học", grade: "10", domain: SCIENCE_DOMAINS.MATTER,
    name: "Liên kết hóa học", lessons: ["Liên kết ion", "Liên kết cộng hóa trị", "Liên kết hydrogen và tương tác van der Waals"]
  },
  {
    id: "ch10_c4", subject: "Hóa học", grade: "10", domain: SCIENCE_DOMAINS.MATTER,
    name: "Phản ứng oxi hóa - khử", lessons: ["Phản ứng oxi hóa - khử"]
  },
  {
    id: "ch10_c5", subject: "Hóa học", grade: "10", domain: SCIENCE_DOMAINS.PHYSICAL_CHEM,
    name: "Năng lượng hóa học", lessons: ["Enthalpy tạo thành và biến thiên enthalpy của phản ứng hóa học"]
  },
  {
    id: "ch10_c6", subject: "Hóa học", grade: "10", domain: SCIENCE_DOMAINS.PHYSICAL_CHEM,
    name: "Tốc độ phản ứng", lessons: ["Tốc độ phản ứng hóa học", "Các yếu tố ảnh hưởng đến tốc độ phản ứng"]
  },
  {
    id: "ch10_c7", subject: "Hóa học", grade: "10", domain: SCIENCE_DOMAINS.INORGANIC,
    name: "Nhóm Halogen", lessons: ["Nguyên tố nhóm VIIA", "Đơn chất halogen", "Hydrogen halide và một số phản ứng của ion halide"]
  },

  // --- HÓA HỌC 11 ---
  {
    id: "ch11_c1", subject: "Hóa học", grade: "11", domain: SCIENCE_DOMAINS.PHYSICAL_CHEM,
    name: "Cân bằng hóa học", lessons: ["Khái niệm về cân bằng hóa học", "Cân bằng trong dung dịch nước", "pH của dung dịch. Chuẩn độ acid-base"]
  },
  {
    id: "ch11_c2", subject: "Hóa học", grade: "11", domain: SCIENCE_DOMAINS.INORGANIC,
    name: "Nitrogen và Sulfur", lessons: ["Đơn chất Nitrogen", "Ammonia và muối ammonium", "Một số hợp chất của nitrogen với oxygen", "Sulfur và Sulfur dioxide", "Sulfuric acid và muối sulfate"]
  },
  {
    id: "ch11_c3", subject: "Hóa học", grade: "11", domain: SCIENCE_DOMAINS.ORGANIC,
    name: "Đại cương hóa học hữu cơ", lessons: ["Hợp chất hữu cơ và hóa học hữu cơ", "Phương pháp tách biệt và tinh chế hợp chất hữu cơ", "Công thức phân tử hợp chất hữu cơ", "Cấu tạo hóa học hợp chất hữu cơ"]
  },
  {
    id: "ch11_c4", subject: "Hóa học", grade: "11", domain: SCIENCE_DOMAINS.ORGANIC,
    name: "Hydrocarbon", lessons: ["Alkane", "Hydrocarbon không no", "Arene (Hydrocarbon thơm)"]
  },
  {
    id: "ch11_c5", subject: "Hóa học", grade: "11", domain: SCIENCE_DOMAINS.ORGANIC,
    name: "Dẫn xuất Halogen - Alcohol - Phenol", lessons: ["Dẫn xuất halogen", "Alcohol", "Phenol"]
  },
  {
    id: "ch11_c6", subject: "Hóa học", grade: "11", domain: SCIENCE_DOMAINS.ORGANIC,
    name: "Hợp chất Carbonyl - Acid Carboxylic", lessons: ["Hợp chất carbonyl", "Carboxylic acid"]
  },

  // --- HÓA HỌC 12 ---
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
    name: "Pin điện và Điện phân", lessons: ["Thế điện cực chuẩn", "Pin điện hóa", "Điện phân", "Ăn mòn kim loại"]
  },
  {
    id: "ch12_c6", subject: "Hóa học", grade: "12", domain: SCIENCE_DOMAINS.INORGANIC,
    name: "Đại cương về Kim loại", lessons: ["Nguyên tố nhóm IA", "Nguyên tố nhóm IIA"]
  },
  {
    id: "ch12_c7", subject: "Hóa học", grade: "12", domain: SCIENCE_DOMAINS.INORGANIC,
    name: "Sơ lược về phức chất và kim loại chuyển tiếp", lessons: ["Đại cương về kim loại chuyển tiếp", "Sơ lược về phức chất", "Sắt và một số kim loại quan trọng khác"]
  }
];

export const COGNITIVE_LEVELS = ["Biết", "Hiểu", "Vận dụng"];
export const QUESTION_TYPES = ["trắc nghiệm", "tự luận"];
