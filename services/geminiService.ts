
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ExamConfig, GeneratedQuestion } from "../types";

const questionSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING },
    type: { type: Type.STRING, enum: ["mcq", "tf", "short", "essay"] },
    chapter: { type: Type.STRING },
    lesson: { type: Type.STRING },
    difficulty: { type: Type.STRING, enum: ["Biết", "Hiểu", "Vận dụng"] },
    question: { type: Type.STRING },
    options: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      nullable: true,
      description: "For 'mcq': 4 options A-D. For 'tf': 4 statements a-d."
    },
    answer: { type: Type.STRING, description: "For 'tf': Sequence like 'Đúng-Sai-Đúng-Sai'." },
    solution: { type: Type.STRING, description: "Detailed step-by-step solution." },
    points: { type: Type.NUMBER, nullable: true },
  },
  required: ["type", "question", "answer", "solution", "chapter", "difficulty"],
};

const examResponseSchema: Schema = {
  type: Type.ARRAY,
  items: questionSchema
};

export const generateExamQuestions = async (config: ExamConfig, apiKey: string): Promise<GeneratedQuestion[]> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please configure it in settings.");
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });

  const totalQuestions = config.counts.mcq + config.counts.tf + config.counts.short + config.counts.essay;
  
  const topicListStr = config.topics.map(t => 
    `- Chương "${t.chapterName}": ${t.lessons.join(", ")}`
  ).join("\n");

  let difficultyInstruction = "";
  if (config.difficultyConfig.mode === 'fixed') {
    difficultyInstruction = `Tất cả câu hỏi phải ở mức độ: ${config.difficultyConfig.fixedLevel}.`;
  } else {
    const { biet, hieu, vandung } = config.difficultyConfig.ratio;
    difficultyInstruction = `Phân bố mức độ khó theo tỷ lệ: ${biet}% Biết (Nhận biết), ${hieu}% Hiểu (Thông hiểu), ${vandung}% Vận dụng (Vận dụng & Vận dụng cao).`;
  }

  const prompt = `
    Bạn là một Chuyên gia khảo thí và biên soạn đề thi cấp quốc gia, am hiểu sâu sắc chương trình GDPT 2018 môn ${config.subject} lớp ${config.grade}.

    NHIỆM VỤ: Tạo ${totalQuestions} câu hỏi phong phú, đa dạng và có tính phân hóa cao.

    THAM CHIẾU PHONG CÁCH:
    - Tham khảo các dạng bài tập sáng tạo từ "Kết nối tri thức", "Cánh diều", "Chân trời sáng tạo".
    - Mô phỏng cách đặt vấn đề thực tế của các trang "vietjack.com", "loigiaihay.com".
    - Cấu trúc lời giải phải rõ ràng, logic, giúp học sinh nắm vững phương pháp giải (tương tự sách giáo viên).

    PHẠM VI KIẾN THỨC:
    ${topicListStr}

    CẤU TRÚC ĐỀ:
    - MCQ: ${config.counts.mcq} câu.
    - Đúng/Sai (TF): ${config.counts.tf} câu.
    - Trả lời ngắn: ${config.counts.short} câu.
    - Tự luận: ${config.counts.essay} câu.

    ĐỘ KHÓ & PHÂN HÓA:
    ${difficultyInstruction}
    - Với mức "Vận dụng": Hãy tạo ra các bài toán liên hệ thực tiễn (STEM), bài toán có nhiều bước suy luận hoặc bài toán yêu cầu tư duy sáng tạo (tương tự các câu lấy điểm 9, 10 trong đề thi học kì). Tránh các câu hỏi lặp lại, sáo rỗng.

    QUY TẮC NỘI DUNG:
    - 'mcq': Lựa chọn nhiễu (distractors) phải logic, dễ gây nhầm lẫn nếu học sinh hiểu sai bản chất.
    - 'tf': Mỗi ý a, b, c, d phải khai thác một khía cạnh khác nhau của cùng một vấn đề/giả thiết.
    - 'short': Tập trung vào kết quả số học hoặc biểu thức rút gọn nhất.
    - 'essay': Yêu cầu trình bày lập luận.
    - 'solution': Phải cực kỳ chi tiết, giải thích tại sao chọn đáp án đó hoặc các bước biến đổi cụ thể.

    YÊU CẦU KỸ THUẬT:
    - Sử dụng LaTeX chuẩn: $...$ cho inline, $$...$$ cho block.
    - Công thức hóa học dùng $H_2O$, $SO_4^{2-}$.
    - Hình học: Mô tả rõ ràng các đỉnh, góc, quan hệ song song/vuông góc.

    Output JSON Array only.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: examResponseSchema,
        temperature: 0.8, // Tăng nhẹ để đa dạng nội dung
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response text received");

    const data = JSON.parse(text) as GeneratedQuestion[];
    
    return data.map((q, index) => ({
        ...q,
        id: q.id || `q-${Date.now()}-${index}`,
        options: (q.type === 'mcq' || q.type === 'tf') && (!q.options || q.options.length === 0) 
          ? ["A", "B", "C", "D"]
          : q.options
    }));

  } catch (error) {
    console.error("Error generating exam:", error);
    throw error;
  }
};
