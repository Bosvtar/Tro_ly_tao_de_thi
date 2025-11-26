import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CURRICULUM, SUBJECTS, GRADES, COGNITIVE_LEVELS } from './constants';
import { ExamConfig, ExamData, GeneratedQuestion, QuestionFormat, DifficultyConfig, CognitiveLevel, SelectedTopic, SubjectType, GradeType } from './types';
import { generateExamQuestions } from './services/geminiService';
import { QuestionCard } from './components/QuestionCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { TopicSelector } from './components/TopicSelector';
import { Calculator, Sparkles, AlertCircle, FileText, Settings, RefreshCw, Layers, Zap, Printer, ArrowLeft, FlaskConical, GripVertical, ExternalLink, Key, ShieldCheck, Check, BookOpen } from 'lucide-react';

// --- MAIN APP COMPONENT ---
const App: React.FC = () => {
  // --- Global Selection State ---
  const [step, setStep] = useState<'select' | 'configure'>('select');
  const [selectedSubject, setSelectedSubject] = useState<SubjectType>('Toán');
  const [selectedGrade, setSelectedGrade] = useState<GradeType>('6');

  // Config State
  const [mode, setMode] = useState<'quick' | 'full'>('full');
  
  // Selection State: { chapterId: [lessonNames] }
  const [selectedTopicsMap, setSelectedTopicsMap] = useState<Record<string, string[]>>({});

  // Reset topics when subject/grade changes
  useEffect(() => {
    setSelectedTopicsMap({});
  }, [selectedSubject, selectedGrade]);

  // Difficulty State
  const [diffMode, setDiffMode] = useState<'fixed' | 'ratio'>('fixed');
  const [fixedLevel, setFixedLevel] = useState<CognitiveLevel>('Hiểu');
  const [ratioBiet, setRatioBiet] = useState(30);
  const [ratioHieu, setRatioHieu] = useState(40);
  // ratioVandung is calculated automatically

  // Quantities for Full Mode
  const [qtyMCQ, setQtyMCQ] = useState(4);
  const [qtyShort, setQtyShort] = useState(2);
  const [qtyEssay, setQtyEssay] = useState(1);

  // Quick Mode Selection
  const [quickType, setQuickType] = useState<QuestionFormat>('mcq');
  const [quickCount, setQuickCount] = useState(5);

  // App Logic State
  const [loading, setLoading] = useState(false);
  const [examData, setExamData] = useState<ExamData | null>(null);
  const [showSolutions, setShowSolutions] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Resizable Sidebar State ---
  const [sidebarWidth, setSidebarWidth] = useState(350);
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing && sidebarRef.current) {
        const sidebarRect = sidebarRef.current.getBoundingClientRect();
        // Calculate width relative to the sidebar's left position
        // Since sidebar is on the left, width is essentially mouseX
        // However, in flex layout, we just set width. 
        // Need to check layout context. Assuming full screen width minus mouseX if right side?
        // Actually, just using clientX is fine for left sidebar.
        const newWidth = mouseMoveEvent.clientX;
        
        // Min 280px, Max 600px
        if (newWidth >= 280 && newWidth <= 700) {
          setSidebarWidth(newWidth);
        }
      }
    },
    [isResizing]
  );

  useEffect(() => {
    if (isResizing) {
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResizing);
    }
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing, resize, stopResizing]);


  const getVandungRatio = () => {
    const remaining = 100 - ratioBiet - ratioHieu;
    return remaining > 0 ? remaining : 0;
  };

  const handleStartConfiguration = () => {
    // Auto-select the first chapter of the subject/grade to prevent empty state
    const firstChapter = CURRICULUM.find(c => c.subject === selectedSubject && c.grade === selectedGrade);
    if (firstChapter) {
        setSelectedTopicsMap({
            [firstChapter.id]: [...firstChapter.lessons]
        });
    }
    setStep('configure');
  };

  const generateExam = async () => {
    setLoading(true);
    setError(null);
    setExamData(null);

    // Validate Selection
    if (Object.keys(selectedTopicsMap).length === 0) {
        setError("Vui lòng chọn ít nhất 1 bài học.");
        setLoading(false);
        return;
    }

    if (diffMode === 'ratio' && (ratioBiet + ratioHieu > 100)) {
        setError("Tổng tỷ lệ Biết + Hiểu không được vượt quá 100%.");
        setLoading(false);
        return;
    }

    // Convert map to API format
    const selectedTopicsList: SelectedTopic[] = Object.keys(selectedTopicsMap).map(cId => {
        const chapter = CURRICULUM.find(c => c.id === cId);
        return {
            chapterName: chapter ? chapter.name : "",
            lessons: selectedTopicsMap[cId]
        };
    });

    // Calculate effective counts
    let configCounts = { mcq: 0, short: 0, essay: 0 };
    if (mode === 'full') {
        configCounts = { mcq: qtyMCQ, short: qtyShort, essay: qtyEssay };
    } else {
        if (quickType === 'mcq') configCounts.mcq = quickCount;
        if (quickType === 'short') configCounts.short = quickCount;
        if (quickType === 'essay') configCounts.essay = quickCount;
    }

    const totalQ = configCounts.mcq + configCounts.short + configCounts.essay;
    if (totalQ === 0) {
        setError("Vui lòng chọn ít nhất 1 câu hỏi.");
        setLoading(false);
        return;
    }

    // Difficulty Config
    const difficultyConfig: DifficultyConfig = {
        mode: diffMode,
        fixedLevel: diffMode === 'fixed' ? fixedLevel : undefined,
        ratio: diffMode === 'ratio' ? { biet: ratioBiet, hieu: ratioHieu, vandung: getVandungRatio() } : { biet:0, hieu:0, vandung:0 }
    };

    try {
      const config: ExamConfig = {
        subject: selectedSubject,
        grade: selectedGrade,
        mode,
        topics: selectedTopicsList,
        difficultyConfig,
        counts: configCounts
      };

      // Pass userApiKey to service
      const questions = await generateExamQuestions(config);
      
      const examCode = Math.floor(100 + Math.random() * 900).toString();
      // Generate title based on first selected chapter
      const firstChapName = selectedTopicsList[0]?.chapterName || "Tổng hợp";
      const titleSuffix = selectedTopicsList.length > 1 ? " (và các chương khác)" : "";

      setExamData({
        id: examCode,
        subject: selectedSubject,
        grade: selectedGrade,
        title: `Đề kiểm tra: ${firstChapName}${titleSuffix}`,
        questions,
        createdAt: Date.now()
      });

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Hệ thống đang bận hoặc quá tải. Vui lòng kiểm tra API Key.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportWord = () => {
    if (!examData) return;

    // Build HTML content for Word
    let bodyContent = '';

    // Header
    bodyContent += `
        <div style="font-family: 'Times New Roman', serif; margin-bottom: 20px;">
            <table style="width: 100%; border: none; margin-bottom: 20px;">
                <tr>
                    <td style="text-align: center; width: 40%; vertical-align: top;">
                        <p style="margin: 0; font-weight: bold;">Phòng GD&ĐT ........................</p>
                        <p style="margin: 0; font-weight: bold;">Trường THCS ........................</p>
                    </td>
                    <td style="text-align: center; width: 60%; vertical-align: top;">
                        <h2 style="margin: 0; font-size: 16pt; text-transform: uppercase;">ĐỀ KIỂM TRA ${examData.subject.toUpperCase()} ${examData.grade}</h2>
                        <p style="margin: 5px 0; font-style: italic;">${examData.title}</p>
                        <p style="margin: 0;">Thời gian: 45 phút - Mã đề: ${examData.id}</p>
                    </td>
                </tr>
            </table>
            <p style="margin-bottom: 20px;"><b>Họ và tên:</b> .............................................................. <b>Lớp:</b> ..........</p>
    `;

    // Process questions
    let qIndex = 1;
    
    // Part 1: MCQ
    const mcqs = examData.questions.filter(q => q.type === 'mcq');
    if (mcqs.length > 0) {
        bodyContent += `<h3 style="margin-top: 15px; margin-bottom: 10px;">Phần I. TRẮC NGHIỆM</h3>`;
        mcqs.forEach((q) => {
            bodyContent += `<div style="margin-bottom: 10px;"><b>Câu ${qIndex++}:</b> ${q.question}</div>`;
            if (q.options) {
                bodyContent += `<table style="width: 100%; margin-bottom: 10px;"><tr>`;
                q.options.forEach((opt, idx) => {
                    const label = String.fromCharCode(65 + idx);
                    bodyContent += `<td style="width: 25%; padding: 5px;"><b>${label}.</b> ${opt}</td>`;
                });
                bodyContent += `</tr></table>`;
            }
        });
    }

    // Part 2: Short
    const shorts = examData.questions.filter(q => q.type === 'short');
    if (shorts.length > 0) {
        bodyContent += `<h3 style="margin-top: 15px; margin-bottom: 10px;">Phần II. TRẢ LỜI NGẮN</h3>`;
        shorts.forEach((q) => {
            bodyContent += `<div style="margin-bottom: 15px;"><b>Câu ${qIndex++}:</b> ${q.question} <br/><br/>Trả lời: .......................................</div>`;
        });
    }

    // Part 3: Essay
    const essays = examData.questions.filter(q => q.type === 'essay');
    if (essays.length > 0) {
        bodyContent += `<h3 style="margin-top: 15px; margin-bottom: 10px;">Phần III. TỰ LUẬN</h3>`;
        essays.forEach((q) => {
            bodyContent += `<div style="margin-bottom: 30px;"><b>Câu ${qIndex++} (${q.points} điểm):</b> ${q.question} <br/><br/><br/><br/><br/></div>`;
        });
    }

    // Solutions (if needed, usually teachers want this at the end)
    bodyContent += `<br/><hr/><h3 style="text-align: center;">HƯỚNG DẪN GIẢI CHI TIẾT</h3>`;
    examData.questions.forEach((q, i) => {
         bodyContent += `<div style="margin-bottom: 10px;"><b>Câu ${i+1}:</b> Đáp án: <b>${q.answer}</b>. <br/><i>HD: ${q.solution}</i></div>`;
    });

    bodyContent += `</div>`;

    const htmlString = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' 
              xmlns:w='urn:schemas-microsoft-com:office:word' 
              xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
            <meta charset='utf-8'>
            <title>${examData.title}</title>
        </head>
        <body>${bodyContent}</body>
        </html>
    `;

    const blob = new Blob(['\ufeff', htmlString], {
        type: 'application/msword'
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `De_${examData.subject}_${examData.grade}_${examData.id}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleQuestionUpdate = (updatedQ: GeneratedQuestion, index: number) => {
    if (!examData) return;
    const newQuestions = [...examData.questions];
    newQuestions[index] = updatedQ;
    setExamData({ ...examData, questions: newQuestions });
  };

  // --- RENDER: SELECTION SCREEN ---
  if (step === 'select') {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-4 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 mb-4">
                        <Sparkles className="text-white" size={32} />
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Trợ lý tạo đề thi AI</h1>
                    <p className="text-gray-500">Chương trình Giáo dục phổ thông 2018</p>
                </div>

                <div className="space-y-8">
                    {/* Subject Selection */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">1. Chọn môn học</label>
                        <div className="grid grid-cols-3 gap-4">
                            {SUBJECTS.map((sub) => {
                                const Icon = sub.id === 'Toán' ? Calculator : (sub.id === 'Vật lí' ? Zap : FlaskConical);
                                return (
                                    <button
                                        key={sub.id}
                                        onClick={() => setSelectedSubject(sub.id)}
                                        className={`relative overflow-hidden rounded-xl border-2 p-4 flex flex-col items-center gap-3 transition-all duration-200 ${
                                            selectedSubject === sub.id
                                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md scale-105'
                                            : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50 text-gray-600'
                                        }`}
                                    >
                                        <Icon size={28} />
                                        <span className="font-bold">{sub.name}</span>
                                        {selectedSubject === sub.id && (
                                            <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-transparent border-r-indigo-600" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Grade Selection */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">2. Chọn lớp</label>
                        <div className="flex justify-between gap-4 bg-gray-50 p-2 rounded-xl border border-gray-200">
                            {GRADES.map((g) => (
                                <button
                                    key={g}
                                    onClick={() => setSelectedGrade(g)}
                                    className={`flex-1 py-3 rounded-lg font-bold text-lg transition-all ${
                                        selectedGrade === g
                                        ? 'bg-white shadow text-indigo-600 ring-2 ring-indigo-100'
                                        : 'text-gray-400 hover:text-gray-600'
                                    }`}
                                >
                                    Lớp {g}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button 
                        onClick={handleStartConfiguration}
                        className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-indigo-700 hover:shadow-indigo-300 transition-all transform hover:-translate-y-1 active:translate-y-0 text-lg flex items-center justify-center gap-2"
                    >
                        Tiếp tục <Settings size={20} />
                    </button>
                </div>
            </div>
        );
  }

  // --- RENDER: MAIN APP (Configure & View) ---
  return (
    <div className="min-h-screen pb-20 print:pb-0 print:bg-white bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-20 print:hidden border-b border-gray-200 shrink-0">
        <div className="w-full px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button 
                    onClick={() => setStep('select')}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-indigo-600 transition-colors"
                    title="Quay lại chọn môn"
                >
                    <ArrowLeft size={20} />
                </button>
                <div className="bg-indigo-600 text-white p-2 rounded-lg shadow-md shadow-indigo-200">
                    {selectedSubject === 'Toán' ? <Calculator size={20} /> : (selectedSubject === 'Vật lí' ? <Zap size={20} /> : <FlaskConical size={20} />)}
                </div>
                <div>
                    <h1 className="text-lg font-extrabold text-gray-900 leading-none">AI Exam Gen</h1>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">{selectedSubject} {selectedGrade} - GDPT 2018</p>
                </div>
            </div>
            
            <div className="flex items-center gap-2">
                {/* Settings button removed to comply with API Key guidelines */}
                {examData && (
                    <>
                    <button 
                        onClick={handleExportWord}
                        className="bg-blue-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold hover:bg-blue-700 transition-all shadow hover:shadow-lg active:scale-95 uppercase"
                    >
                        <FileText size={16} /> Word
                    </button>
                    <button 
                        onClick={handlePrint}
                        className="bg-gray-900 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold hover:bg-black transition-all shadow hover:shadow-lg active:scale-95 uppercase"
                    >
                        <Printer size={16} /> In đề
                    </button>
                    </>
                )}
            </div>
        </div>
      </header>
      
      {/* Main Layout (Sidebar + Content) */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        
        {/* SIDEBAR (Configuration) */}
        <aside 
            ref={sidebarRef}
            className="bg-white border-r border-gray-200 overflow-y-auto no-scrollbar shrink-0 print:hidden"
            style={{ width: window.innerWidth >= 1024 ? sidebarWidth : '100%' }}
        >
          <div className="p-4 space-y-6">
            
            {/* 1. Mode Selection */}
            <div className="bg-indigo-50/50 p-1 rounded-lg flex text-sm font-semibold border border-indigo-100">
                <button 
                    onClick={() => setMode('full')}
                    className={`flex-1 py-1.5 px-3 rounded-md flex items-center justify-center gap-2 transition-all ${mode === 'full' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-indigo-600'}`}
                >
                    <Layers size={16} /> Đề hoàn chỉnh
                </button>
                <button 
                    onClick={() => setMode('quick')}
                    className={`flex-1 py-1.5 px-3 rounded-md flex items-center justify-center gap-2 transition-all ${mode === 'quick' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-indigo-600'}`}
                >
                    <Zap size={16} /> Tạo nhanh
                </button>
            </div>

            {/* 2. Topic Selection */}
            <div>
                <label className="text-sm font-bold text-gray-800 mb-2 block flex items-center gap-2">
                    <BookOpen size={16} className="text-indigo-500" />
                    Phạm vi kiến thức
                </label>
                <TopicSelector 
                    subject={selectedSubject} 
                    grade={selectedGrade} 
                    selectedMap={selectedTopicsMap} 
                    onChange={setSelectedTopicsMap} 
                />
            </div>

            {/* 3. Difficulty */}
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Mức độ khó</label>
                <div className="flex gap-2 mb-3">
                    <button onClick={() => setDiffMode('fixed')} className={`flex-1 py-1 text-xs font-bold rounded ${diffMode === 'fixed' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>Cố định</button>
                    <button onClick={() => setDiffMode('ratio')} className={`flex-1 py-1 text-xs font-bold rounded ${diffMode === 'ratio' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>Tỷ lệ %</button>
                </div>
                
                {diffMode === 'fixed' ? (
                    <div className="flex gap-1">
                        {COGNITIVE_LEVELS.map(level => (
                            <button
                                key={level}
                                onClick={() => setFixedLevel(level as CognitiveLevel)}
                                className={`flex-1 py-1.5 text-xs font-medium border rounded transition-colors ${fixedLevel === level ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-gray-200 text-gray-600'}`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-medium w-16 text-green-700">Biết ({ratioBiet}%)</span>
                            <input type="range" className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600" value={ratioBiet} min="0" max="100" onChange={(e) => setRatioBiet(Number(e.target.value))} />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-medium w-16 text-yellow-700">Hiểu ({ratioHieu}%)</span>
                            <input type="range" className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-600" value={ratioHieu} min="0" max="100" onChange={(e) => setRatioHieu(Number(e.target.value))} />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-medium w-16 text-red-700">Vận dụng ({getVandungRatio()}%)</span>
                            <div className="flex-1 h-1.5 bg-red-100 rounded-lg relative overflow-hidden">
                                <div style={{width: `${getVandungRatio()}%`}} className="absolute top-0 left-0 h-full bg-red-500"></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 4. Configuration (Counts) */}
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                 <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Cấu trúc đề</label>
                 
                 {mode === 'full' ? (
                     <div className="grid grid-cols-3 gap-3">
                         <div>
                             <label className="block text-[10px] text-gray-500 font-bold mb-1">Trắc nghiệm</label>
                             <input type="number" min="0" max="50" className="w-full p-1.5 text-sm border border-gray-300 rounded text-center font-bold" value={qtyMCQ} onChange={(e) => setQtyMCQ(Number(e.target.value))} />
                         </div>
                         <div>
                             <label className="block text-[10px] text-gray-500 font-bold mb-1">Trả lời ngắn</label>
                             <input type="number" min="0" max="20" className="w-full p-1.5 text-sm border border-gray-300 rounded text-center font-bold" value={qtyShort} onChange={(e) => setQtyShort(Number(e.target.value))} />
                         </div>
                         <div>
                             <label className="block text-[10px] text-gray-500 font-bold mb-1">Tự luận</label>
                             <input type="number" min="0" max="10" className="w-full p-1.5 text-sm border border-gray-300 rounded text-center font-bold" value={qtyEssay} onChange={(e) => setQtyEssay(Number(e.target.value))} />
                         </div>
                     </div>
                 ) : (
                    <div className="flex gap-3">
                        <select 
                            className="flex-1 p-1.5 text-sm border border-gray-300 rounded bg-white"
                            value={quickType}
                            onChange={(e) => setQuickType(e.target.value as QuestionFormat)}
                        >
                            <option value="mcq">Trắc nghiệm</option>
                            <option value="short">Trả lời ngắn</option>
                            <option value="essay">Tự luận</option>
                        </select>
                        <input 
                            type="number" min="1" max="50" 
                            className="w-16 p-1.5 text-sm border border-gray-300 rounded text-center font-bold" 
                            value={quickCount} 
                            onChange={(e) => setQuickCount(Number(e.target.value))} 
                        />
                        <span className="text-sm flex items-center text-gray-500">câu</span>
                    </div>
                 )}
            </div>

            {/* Generate Button */}
            <button 
                onClick={generateExam}
                disabled={loading}
                className={`w-full py-3 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-300 active:scale-95'}`}
            >
                {loading ? <RefreshCw className="animate-spin" /> : <Sparkles />}
                {loading ? 'Đang khởi tạo...' : 'Tạo đề thi ngay'}
            </button>
          </div>
        </aside>

        {/* Resizer Handle */}
        <div
          className="w-1 bg-gray-100 hover:bg-indigo-400 cursor-col-resize hidden lg:flex items-center justify-center group transition-colors print:hidden z-10"
          onMouseDown={startResizing}
        >
            <GripVertical size={12} className="text-gray-300 group-hover:text-white transition-colors" />
        </div>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto bg-gray-50/50 p-6 print:p-0 print:overflow-visible">
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700 animate-fade-in">
                    <AlertCircle />
                    <span className="font-medium">{error}</span>
                </div>
            )}

            {loading ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <LoadingSpinner />
                    <p className="mt-4 text-sm font-medium animate-pulse">AI đang soạn thảo đề thi dựa trên yêu cầu của bạn...</p>
                    <p className="text-xs mt-2 text-gray-300">Quá trình này có thể mất 15-30 giây</p>
                </div>
            ) : !examData ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-300 p-10 text-center border-2 border-dashed border-gray-200 rounded-3xl m-4">
                    <div className="bg-white p-6 rounded-full shadow-sm mb-4">
                        <FileText size={48} className="text-gray-200" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-400 mb-2">Chưa có đề thi nào</h3>
                    <p className="text-gray-400 max-w-md">Hãy chọn chủ đề và cấu hình bên cột trái, sau đó nhấn "Tạo đề thi" để bắt đầu.</p>
                </div>
            ) : (
                <div className="max-w-4xl mx-auto bg-white min-h-[29.7cm] shadow-lg print:shadow-none print:w-full">
                    {/* Exam Header (Print Style) */}
                    <div className="p-8 pb-4 print:p-0">
                        <div className="hidden print:flex justify-between mb-6 font-serif">
                             <div className="text-center w-5/12">
                                <p className="font-bold m-0">Phòng GD&ĐT ........................</p>
                                <p className="font-bold m-0">Trường THCS ........................</p>
                             </div>
                             <div className="text-center w-7/12">
                                <h2 className="font-bold text-xl uppercase m-0">ĐỀ KIỂM TRA {examData.subject.toUpperCase()} {examData.grade}</h2>
                                <p className="italic m-0 my-1">{examData.title}</p>
                                <p className="m-0">Thời gian làm bài: 45 phút</p>
                                <p className="font-bold border border-black px-2 py-0.5 inline-block mt-2 text-sm">Mã đề: {examData.id}</p>
                             </div>
                        </div>
                        
                        <div className="hidden print:block mb-6 font-serif">
                            <p className="m-0"><b>Họ và tên:</b> ........................................................................................ <b>Lớp:</b> ..........</p>
                            <div className="w-full border-b-2 border-black mt-2"></div>
                        </div>

                        {/* Screen Header */}
                        <div className="print:hidden border-b border-gray-100 pb-4 mb-6 flex justify-between items-end">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{examData.title}</h2>
                                <div className="flex gap-4 mt-2 text-sm text-gray-500 font-medium">
                                    <span className="flex items-center gap-1"><Layers size={14} /> {examData.questions.length} câu</span>
                                    <span className="flex items-center gap-1"><Settings size={14} /> Mã đề: {examData.id}</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => setShowSolutions(!showSolutions)}
                                className={`text-sm font-bold px-4 py-2 rounded-lg transition-colors border ${showSolutions ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                            >
                                {showSolutions ? 'Ẩn tất cả lời giải' : 'Xem tất cả lời giải'}
                            </button>
                        </div>

                        {/* Exam Content */}
                        <div className="space-y-8 font-serif print:text-justify">
                            {/* Part 1: MCQ */}
                            {examData.questions.some(q => q.type === 'mcq') && (
                                <div>
                                    <h3 className="font-bold text-lg mb-4 text-indigo-900 print:text-black uppercase">I. Phần Trắc nghiệm</h3>
                                    <div className="space-y-1">
                                        {examData.questions
                                            .filter(q => q.type === 'mcq')
                                            .map((q, idx) => (
                                            <QuestionCard 
                                                key={q.id} 
                                                data={q} 
                                                index={idx} 
                                                showSolution={showSolutions}
                                                onUpdate={(uq) => handleQuestionUpdate(uq, examData.questions.findIndex(x => x.id === q.id))}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Part 2: Short Answer */}
                            {examData.questions.some(q => q.type === 'short') && (
                                <div>
                                    <h3 className="font-bold text-lg mb-4 text-indigo-900 print:text-black uppercase mt-8 break-before-auto">II. Phần Trả lời ngắn</h3>
                                    <div className="space-y-1">
                                        {examData.questions
                                            .filter(q => q.type === 'short')
                                            .map((q, idx) => (
                                            <QuestionCard 
                                                key={q.id} 
                                                data={q} 
                                                index={idx} 
                                                showSolution={showSolutions}
                                                onUpdate={(uq) => handleQuestionUpdate(uq, examData.questions.findIndex(x => x.id === q.id))}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Part 3: Essay */}
                            {examData.questions.some(q => q.type === 'essay') && (
                                <div>
                                    <h3 className="font-bold text-lg mb-4 text-indigo-900 print:text-black uppercase mt-8 break-before-auto">III. Phần Tự luận</h3>
                                    <div className="space-y-1">
                                        {examData.questions
                                            .filter(q => q.type === 'essay')
                                            .map((q, idx) => (
                                            <QuestionCard 
                                                key={q.id} 
                                                data={q} 
                                                index={idx} 
                                                showSolution={showSolutions}
                                                onUpdate={(uq) => handleQuestionUpdate(uq, examData.questions.findIndex(x => x.id === q.id))}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </main>
      </div>
    </div>
  );
};

export default App;