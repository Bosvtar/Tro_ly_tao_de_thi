
import React, { useState, useEffect, useRef } from 'react';
import { CURRICULUM, COGNITIVE_LEVELS, SUBJECTS, GRADES, GRADE_LEVELS } from './constants';
import { ExamConfig, ExamData, GeneratedQuestion, QuestionFormat, DifficultyConfig, CognitiveLevel, SelectedTopic, SubjectType, GradeType } from './types';
import { generateExamQuestions } from './services/geminiService';
import { QuestionCard } from './components/QuestionCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { TopicSelector } from './components/TopicSelector';
import { ApiKeyModal } from './components/ApiKeyModal';
import { Calculator, Sparkles, AlertCircle, Settings, RefreshCw, Layers, Zap, Printer, ArrowLeft, FlaskConical, AlertTriangle, Key } from 'lucide-react';

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
  const [qtyTF, setQtyTF] = useState(2); // New True/False quantity
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

  // API Key State
  const [apiKey, setApiKey] = useState<string>('');
  const [showKeyModal, setShowKeyModal] = useState(false);

  // Load API Key from local storage on mount
  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('gemini_api_key', key);
  };

  // --- RESIZE LOGIC ---
  const [sidebarWidth, setSidebarWidth] = useState(340); // Default width in px
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const startResizing = React.useCallback((mouseDownEvent: React.MouseEvent) => {
    mouseDownEvent.preventDefault();
    setIsResizing(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      // Constraints: Min 280px, Max 600px
      const newWidth = Math.max(280, Math.min(600, e.clientX));
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none'; // Prevent text selection while dragging
    } else {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing]);

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
    // Check for API Key first
    if (!apiKey) {
      setShowKeyModal(true);
      return;
    }

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
    let configCounts = { mcq: 0, tf: 0, short: 0, essay: 0 };
    if (mode === 'full') {
        configCounts = { mcq: qtyMCQ, tf: qtyTF, short: qtyShort, essay: qtyEssay };
    } else {
        if (quickType === 'mcq') configCounts.mcq = quickCount;
        if (quickType === 'tf') configCounts.tf = quickCount;
        if (quickType === 'short') configCounts.short = quickCount;
        if (quickType === 'essay') configCounts.essay = quickCount;
    }

    const totalQ = configCounts.mcq + configCounts.tf + configCounts.short + configCounts.essay;
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

      const questions = await generateExamQuestions(config, apiKey);
      
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
      if (err.message && err.message.includes("API Key")) {
        setError("API Key không hợp lệ hoặc đã hết hạn. Vui lòng kiểm tra lại.");
        setShowKeyModal(true);
      } else {
        setError("Hệ thống đang bận hoặc quá tải. Vui lòng thử lại sau giây lát.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    if (!examData) {
        window.print();
        return;
    }

    // Format date: DD-MM-YYYY
    const dateObj = new Date(examData.createdAt);
    const dateStr = `${dateObj.getDate().toString().padStart(2, '0')}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getFullYear()}`;
    
    // Pattern: Đề [Môn] - Lớp [Lớp] - Mã [Mã] - [Ngày]
    const fileName = `Đề ${examData.subject} - Lớp ${examData.grade} - Mã ${examData.id} - ${dateStr}`;
    
    // Set document title temporarily
    const originalTitle = document.title;
    document.title = fileName;
    
    window.print();
    
    // Restore title after print dialog closes
    setTimeout(() => {
        document.title = originalTitle;
    }, 1000);
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
             {/* Key Modal (Rendered here too just in case) */}
             <ApiKeyModal 
                isOpen={showKeyModal} 
                onClose={() => setShowKeyModal(false)} 
                onSave={handleSaveApiKey}
                currentKey={apiKey}
            />

            <div className="absolute top-4 right-4">
                 <button
                    onClick={() => setShowKeyModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-600 hover:text-indigo-600 hover:border-indigo-300 transition-all text-sm font-medium"
                 >
                    <Key size={16} /> {apiKey ? 'Cập nhật Key' : 'Nhập API Key'}
                 </button>
            </div>

            <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-4 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 mb-4">
                        <Sparkles className="text-white" size={32} />
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Trợ lý tạo đề thi AI</h1>
                    <p className="text-gray-500">Chương trình Giáo dục phổ thông 2018 (Lớp 1-12)</p>
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

                    {/* Grade Selection (Grouped by Levels) */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">2. Chọn lớp</label>
                        <div className="space-y-3">
                            {GRADE_LEVELS.map((level) => (
                                <div key={level.name} className="flex flex-col sm:flex-row gap-3">
                                    <div className="w-24 flex items-center text-sm font-bold text-gray-500 uppercase tracking-wider">{level.name}</div>
                                    <div className="flex-1 flex gap-2">
                                        {level.grades.map((g) => (
                                            <button
                                                key={g}
                                                onClick={() => setSelectedGrade(g)}
                                                className={`flex-1 py-2.5 rounded-lg font-bold text-lg transition-all border ${
                                                    selectedGrade === g
                                                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200'
                                                    : 'bg-white text-gray-500 border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
                                                }`}
                                            >
                                                {g}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button 
                        onClick={handleStartConfiguration}
                        className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-indigo-700 hover:shadow-indigo-300 transition-all transform hover:-translate-y-1 active:translate-y-0 text-lg flex items-center justify-center gap-2 mt-4"
                    >
                        Tiếp tục <Settings size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
  }

  // --- RENDER: MAIN APP ---
  return (
    <div className="min-h-screen print:bg-white bg-gray-50 flex flex-col">
      {/* API Key Modal */}
      <ApiKeyModal 
        isOpen={showKeyModal} 
        onClose={() => setShowKeyModal(false)} 
        onSave={handleSaveApiKey}
        currentKey={apiKey}
      />

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-20 print:hidden border-b border-gray-200 flex-none">
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
                    <h1 className="text-lg font-extrabold text-gray-900 leading-none">AI Exam Generator</h1>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">{selectedSubject} {selectedGrade} - GDPT 2018</p>
                </div>
            </div>
            
            <div className="flex items-center gap-2">
                 <button 
                    onClick={() => setShowKeyModal(true)}
                    className={`p-2 rounded-lg flex items-center gap-2 text-xs font-bold transition-all border ${apiKey ? 'bg-white text-green-600 border-green-200' : 'bg-red-50 text-red-600 border-red-200 animate-pulse'}`}
                    title="Cài đặt API Key"
                 >
                    <Key size={16} />
                    <span className="hidden sm:inline">{apiKey ? 'API Key: Đã lưu' : 'Nhập API Key'}</span>
                </button>

                {examData && (
                    <button 
                        onClick={handlePrint}
                        className="bg-gray-900 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold hover:bg-black transition-all shadow hover:shadow-lg active:scale-95 uppercase"
                    >
                        <Printer size={16} /> PDF/In
                    </button>
                )}
            </div>
        </div>
      </header>

      {/* Main Layout Container */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative print:block print:h-auto print:overflow-visible">
            
            {/* Sidebar Configuration */}
            <div 
                ref={sidebarRef}
                style={{ width: window.innerWidth >= 1024 ? sidebarWidth : '100%' }}
                className="bg-white lg:border-r border-gray-200 h-auto lg:h-[calc(100vh-65px)] overflow-y-auto custom-scrollbar flex-none print:hidden shadow-md lg:shadow-none z-10"
            >
                <div className="p-5">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Settings className="text-indigo-600" size={20} /> Cấu hình đề thi
                    </h2>

                    {/* Mode Switch */}
                    <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
                        <button 
                            onClick={() => setMode('full')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-md transition-all ${mode === 'full' ? 'bg-white shadow-sm text-indigo-700 ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <Layers size={14} /> Đề chuẩn
                        </button>
                        <button 
                            onClick={() => setMode('quick')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-md transition-all ${mode === 'quick' ? 'bg-white shadow-sm text-indigo-700 ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <Zap size={14} /> Đề nhanh
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Topic Selection */}
                        <TopicSelector 
                            subject={selectedSubject}
                            grade={selectedGrade}
                            selectedMap={selectedTopicsMap} 
                            onChange={setSelectedTopicsMap} 
                        />

                        {/* Difficulty Selection */}
                        <div className="border-t border-gray-100 pt-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Mức độ tư duy</label>
                            
                            <div className="flex gap-4 mb-3 text-xs">
                                <label className="flex items-center gap-1 cursor-pointer">
                                    <input 
                                        type="radio" name="diffMode" 
                                        checked={diffMode === 'fixed'} 
                                        onChange={() => setDiffMode('fixed')}
                                        className="text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span>Cố định</span>
                                </label>
                                <label className="flex items-center gap-1 cursor-pointer">
                                    <input 
                                        type="radio" name="diffMode" 
                                        checked={diffMode === 'ratio'} 
                                        onChange={() => setDiffMode('ratio')}
                                        className="text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span>Theo tỷ lệ</span>
                                </label>
                            </div>

                            {diffMode === 'fixed' ? (
                                <div className="grid grid-cols-3 gap-2">
                                    {COGNITIVE_LEVELS.map(lvl => (
                                        <button
                                            key={lvl}
                                            onClick={() => setFixedLevel(lvl as CognitiveLevel)}
                                            className={`py-2 rounded-lg text-xs font-bold transition-all border ${
                                                fixedLevel === lvl
                                                ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                                                : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                                            }`}
                                        >
                                            {lvl}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                    <div>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-green-700 font-medium">Biết: {ratioBiet}%</span>
                                        </div>
                                        <input 
                                            type="range" min="0" max="100" step="10"
                                            value={ratioBiet}
                                            onChange={(e) => setRatioBiet(Number(e.target.value))}
                                            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-blue-700 font-medium">Hiểu: {ratioHieu}%</span>
                                        </div>
                                        <input 
                                            type="range" min="0" max="100" step="10"
                                            value={ratioHieu}
                                            onChange={(e) => setRatioHieu(Number(e.target.value))}
                                            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                        />
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-bold pt-1 border-t border-gray-200">
                                        <span className="text-orange-700">Vận dụng:</span>
                                        <span className={`${getVandungRatio() < 0 ? 'text-red-500' : 'text-orange-700'}`}>
                                            {getVandungRatio()}%
                                        </span>
                                    </div>
                                    {getVandungRatio() < 0 && (
                                        <p className="text-[10px] text-red-500 mt-1">Tổng tỷ lệ đang vượt quá 100%!</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Quantity Config */}
                        <div className="border-t border-gray-100 pt-4">
                        {mode === 'full' ? (
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Cấu trúc đề</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm text-gray-700">Trắc nghiệm</label>
                                        <input 
                                            type="number" min="0" max="40"
                                            value={qtyMCQ}
                                            onChange={(e) => setQtyMCQ(Number(e.target.value))}
                                            className="w-16 text-center border border-gray-300 rounded-md p-1.5 text-sm focus:ring-indigo-500 focus:border-indigo-500 font-medium"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm text-gray-700">Đúng/Sai</label>
                                        <input 
                                            type="number" min="0" max="20"
                                            value={qtyTF}
                                            onChange={(e) => setQtyTF(Number(e.target.value))}
                                            className="w-16 text-center border border-gray-300 rounded-md p-1.5 text-sm focus:ring-indigo-500 focus:border-indigo-500 font-medium"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm text-gray-700">Trả lời ngắn</label>
                                        <input 
                                            type="number" min="0" max="20"
                                            value={qtyShort}
                                            onChange={(e) => setQtyShort(Number(e.target.value))}
                                            className="w-16 text-center border border-gray-300 rounded-md p-1.5 text-sm focus:ring-indigo-500 focus:border-indigo-500 font-medium"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm text-gray-700">Tự luận</label>
                                        <input 
                                            type="number" min="0" max="10"
                                            value={qtyEssay}
                                            onChange={(e) => setQtyEssay(Number(e.target.value))}
                                            className="w-16 text-center border border-gray-300 rounded-md p-1.5 text-sm focus:ring-indigo-500 focus:border-indigo-500 font-medium"
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Chọn dạng bài</label>
                                    <div className="grid grid-cols-1 gap-2">
                                        <button 
                                            onClick={() => setQuickType('mcq')}
                                            className={`p-2.5 rounded-lg border text-left flex items-center justify-between transition-all ${quickType === 'mcq' ? 'border-indigo-500 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500' : 'border-gray-200 hover:bg-gray-50'}`}
                                        >
                                            <span className="text-sm font-medium">Trắc nghiệm</span>
                                            {quickType === 'mcq' && <div className="w-2 h-2 rounded-full bg-indigo-600"></div>}
                                        </button>
                                        <button 
                                            onClick={() => setQuickType('tf')}
                                            className={`p-2.5 rounded-lg border text-left flex items-center justify-between transition-all ${quickType === 'tf' ? 'border-indigo-500 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500' : 'border-gray-200 hover:bg-gray-50'}`}
                                        >
                                            <span className="text-sm font-medium">Đúng/Sai</span>
                                            {quickType === 'tf' && <div className="w-2 h-2 rounded-full bg-indigo-600"></div>}
                                        </button>
                                        <button 
                                            onClick={() => setQuickType('short')}
                                            className={`p-2.5 rounded-lg border text-left flex items-center justify-between transition-all ${quickType === 'short' ? 'border-indigo-500 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500' : 'border-gray-200 hover:bg-gray-50'}`}
                                        >
                                            <span className="text-sm font-medium">Trả lời ngắn</span>
                                            {quickType === 'short' && <div className="w-2 h-2 rounded-full bg-indigo-600"></div>}
                                        </button>
                                        <button 
                                            onClick={() => setQuickType('essay')}
                                            className={`p-2.5 rounded-lg border text-left flex items-center justify-between transition-all ${quickType === 'essay' ? 'border-indigo-500 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500' : 'border-gray-200 hover:bg-gray-50'}`}
                                        >
                                            <span className="text-sm font-medium">Tự luận</span>
                                            {quickType === 'essay' && <div className="w-2 h-2 rounded-full bg-indigo-600"></div>}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Số lượng câu</label>
                                    <input 
                                        type="number" min="1" max="50"
                                        value={quickCount}
                                        onChange={(e) => setQuickCount(Number(e.target.value))}
                                        className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            </div>
                        )}
                        </div>

                        <button
                            onClick={generateExam}
                            disabled={loading || (diffMode === 'ratio' && ratioBiet + ratioHieu > 100)}
                            className={`w-full flex items-center justify-center gap-2 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg hover:shadow-indigo-200 mt-2 ${
                                loading || (diffMode === 'ratio' && ratioBiet + ratioHieu > 100)
                                ? 'bg-indigo-400 cursor-not-allowed' 
                                : 'bg-indigo-600 hover:bg-indigo-700 active:transform active:scale-98'
                            }`}
                        >
                            {loading ? 'Đang khởi tạo...' : 'Tạo đề thi ngay'}
                            {!loading && <Sparkles size={18} />}
                        </button>

                        <div className="mt-3 flex gap-2 items-start text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-100">
                          <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                          <p>Lưu ý: Nội dung được sinh bởi AI có thể chưa chính xác tuyệt đối. Vui lòng kiểm tra kỹ trước khi sử dụng.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Resizer Handle */}
            <div 
              className="w-1.5 bg-gray-200 hover:bg-indigo-400 cursor-col-resize hidden lg:flex print:hidden items-center justify-center transition-colors z-20 hover:w-2 -ml-1"
              onMouseDown={startResizing}
              title="Kéo để thay đổi kích thước"
            >
               <div className="h-8 w-0.5 bg-gray-400 rounded-full opacity-0 hover:opacity-100"></div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-4 lg:p-8 overflow-y-auto lg:h-[calc(100vh-65px)] custom-scrollbar print-content-container print:h-auto print:overflow-visible">
                {error && (
                    <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 flex items-start gap-3 mb-6 print:hidden animate-fade-in">
                        <AlertCircle className="mt-0.5 shrink-0" size={20} />
                        <div>
                            <p className="font-bold">Đã xảy ra lỗi</p>
                            <p className="text-sm mt-1">{error}</p>
                            {error.includes("API Key") && (
                                <button 
                                    onClick={() => setShowKeyModal(true)}
                                    className="text-sm font-bold text-red-800 underline mt-1"
                                >
                                    Cài đặt lại API Key
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {loading && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                    <LoadingSpinner />
                    <p className="text-gray-500 mt-4 text-sm animate-pulse">AI đang soạn thảo đề thi {selectedSubject} {selectedGrade}...</p>
                  </div>
                )}

                {!examData && !loading && !error && (
                    <div className="text-center py-24 bg-white rounded-xl border border-dashed border-gray-300 print:hidden flex flex-col items-center justify-center h-full">
                        <div className="bg-indigo-50 p-6 rounded-full mb-4">
                            {selectedSubject === 'Toán' ? <Calculator className="text-indigo-300" size={48} /> : (selectedSubject === 'Vật lí' ? <Zap className="text-indigo-300" size={48} /> : <FlaskConical className="text-indigo-300" size={48} />)}
                        </div>
                        <h3 className="text-gray-900 font-bold text-xl mb-2">Chưa có đề thi nào</h3>
                        <p className="text-gray-500 text-sm max-w-xs mx-auto mb-6">Vui lòng chọn bài học, cấu hình mức độ và bấm nút "Tạo đề thi ngay".</p>
                        
                        {!apiKey && (
                            <button 
                                onClick={() => setShowKeyModal(true)}
                                className="px-5 py-2.5 bg-white border border-indigo-200 text-indigo-700 rounded-lg shadow-sm hover:bg-indigo-50 font-medium transition-all text-sm flex items-center gap-2"
                            >
                                <Key size={16} /> Nhập API Key để bắt đầu
                            </button>
                        )}
                    </div>
                )}

                {examData && !loading && (
                    <div className="animate-fade-in print:w-full max-w-5xl mx-auto">
                        {/* Exam Paper Controls */}
                        <div className="bg-indigo-900 text-white p-4 rounded-t-xl flex justify-between items-center print:hidden shadow-lg controls">
                            <div className="flex items-center gap-3">
                                <span className="font-mono bg-white/10 px-3 py-1 rounded text-sm font-medium border border-white/20">Mã: {examData.id}</span>
                                <span className="text-sm font-light text-indigo-100 border-l border-indigo-700 pl-3 hidden sm:inline">{examData.questions.length} câu hỏi</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-white text-indigo-200 transition-colors select-none">
                                    <div className="relative inline-block w-10 h-6 align-middle select-none transition duration-200 ease-in">
                                        <input type="checkbox" name="toggle" id="toggle" checked={showSolutions} onChange={(e) => setShowSolutions(e.target.checked)} className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer left-1 top-1 transition-transform duration-200 ease-in-out checked:translate-x-full checked:border-indigo-600"/>
                                        <label htmlFor="toggle" className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${showSolutions ? 'bg-indigo-500' : 'bg-gray-700'}`}></label>
                                    </div>
                                    <span className="hidden sm:inline">Hiện đáp án</span>
                                </label>
                                <div className="h-6 w-px bg-indigo-700"></div>
                                <button onClick={generateExam} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-indigo-200 hover:text-white" title="Tạo lại đề mới">
                                    <RefreshCw size={18} />
                                </button>
                            </div>
                        </div>

                        {/* The Actual Paper */}
                        <div className="bg-white p-10 shadow-xl min-h-[800px] print:shadow-none print:p-0 print:w-full print:min-h-0 rounded-b-xl">
                            
                            {/* Exam Header REMOVED as requested */}

                            {/* Section: MCQ */}
                            {examData.questions.some(q => q.type === 'mcq') && (
                                <div className="mb-4 section-mcq">
                                    <h3 className="font-bold text-base uppercase mb-2 text-indigo-900 print:text-black border-b border-gray-200 pb-1 flex items-center gap-2">
                                        <span className="print:hidden w-1 h-5 bg-indigo-600 rounded-full"></span>
                                        Phần I. Trắc nghiệm
                                        <span className="text-xs font-normal normal-case text-gray-500 print:hidden ml-auto">Chọn đáp án đúng nhất</span>
                                    </h3>
                                    {examData.questions.filter(q => q.type === 'mcq').map((q, idx) => (
                                        <QuestionCard 
                                            key={q.id} 
                                            data={q} 
                                            index={idx} 
                                            showSolution={showSolutions} 
                                            onUpdate={(updated) => handleQuestionUpdate(updated, idx)}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Section: True/False */}
                            {examData.questions.some(q => q.type === 'tf') && (
                                <div className="mb-4 section-tf">
                                    <h3 className="font-bold text-base uppercase mb-2 text-indigo-900 print:text-black border-b border-gray-200 pb-1 flex items-center gap-2">
                                        <span className="print:hidden w-1 h-5 bg-indigo-600 rounded-full"></span>
                                        Phần II. Trắc nghiệm Đúng/Sai
                                        <span className="text-xs font-normal normal-case text-gray-500 print:hidden ml-auto">Trả lời Đúng hoặc Sai cho mỗi ý</span>
                                    </h3>
                                    {examData.questions.filter(q => q.type === 'tf').map((q, idx) => (
                                        <QuestionCard 
                                            key={q.id} 
                                            data={q} 
                                            index={idx + examData.questions.filter(x => x.type === 'mcq').length} 
                                            showSolution={showSolutions} 
                                            onUpdate={(updated) => handleQuestionUpdate(updated, idx + examData.questions.filter(x => x.type === 'mcq').length)}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Section: Short Answer */}
                            {examData.questions.some(q => q.type === 'short') && (
                                <div className="mb-4 section-short page-break-inside-avoid">
                                    <h3 className="font-bold text-base uppercase mb-2 text-indigo-900 print:text-black border-b border-gray-200 pb-1 flex items-center gap-2">
                                        <span className="print:hidden w-1 h-5 bg-indigo-600 rounded-full"></span>
                                        Phần III. Trắc nghiệm trả lời ngắn
                                    </h3>
                                    <p className="italic text-xs text-gray-600 mb-2 print:text-black print:text-xs">
                                        * Học sinh ghi kết quả vào ô trống.
                                    </p>
                                    {examData.questions.filter(q => q.type === 'short').map((q, idx) => (
                                        <QuestionCard 
                                            key={q.id} 
                                            data={q} 
                                            index={idx + examData.questions.filter(x => x.type === 'mcq' || x.type === 'tf').length} 
                                            showSolution={showSolutions} 
                                            onUpdate={(updated) => handleQuestionUpdate(updated, idx + examData.questions.filter(x => x.type === 'mcq' || x.type === 'tf').length)}
                                        />
                                    ))}
                                </div>
                            )}

                             {/* Section: Essay */}
                             {examData.questions.some(q => q.type === 'essay') && (
                                <div className="mb-4 section-essay page-break-inside-avoid">
                                    <h3 className="font-bold text-base uppercase mb-2 text-indigo-900 print:text-black border-b border-gray-200 pb-1 flex items-center gap-2">
                                        <span className="print:hidden w-1 h-5 bg-indigo-600 rounded-full"></span>
                                        Phần IV. Tự luận
                                    </h3>
                                    {examData.questions.filter(q => q.type === 'essay').map((q, idx) => (
                                        <QuestionCard 
                                            key={q.id} 
                                            data={q} 
                                            index={idx + examData.questions.filter(x => x.type !== 'essay').length} 
                                            showSolution={showSolutions} 
                                            onUpdate={(updated) => handleQuestionUpdate(updated, idx + examData.questions.filter(x => x.type !== 'essay').length)}
                                        />
                                    ))}
                                </div>
                            )}

                            <div className="text-center mt-12 pt-4 border-t border-gray-300 hidden print:block text-sm italic">
                                --- HẾT ---
                            </div>
                        </div>
                    </div>
                )}
            </div>
      </main>
      
      <style>{`
        .toggle-checkbox:checked {
          right: 0;
          border-color: #687280;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #4f46e5;
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #d1d5db; 
            border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #9ca3af; 
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
