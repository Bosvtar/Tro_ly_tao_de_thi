
import React, { useState, useEffect } from 'react';
import { GeneratedQuestion } from '../types';
import { CheckCircle, ChevronDown, ChevronUp, Pencil, Save, X } from 'lucide-react';

// Helper component to render LaTeX mixed with text
const LatexRenderer: React.FC<{ content: string }> = ({ content }) => {
  if (!content) return null;

  // Split by $...$ (inline math)
  const parts = content.split(/(\$[^$]+\$)/g);

  return (
    <span>
      {parts.map((part, i) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          const latex = part.slice(1, -1);
          try {
            if ((window as any).katex) {
               const html = (window as any).katex.renderToString(latex, {
                 throwOnError: false,
                 displayMode: false,
                 output: 'html'
               });
               return <span key={i} dangerouslySetInnerHTML={{ __html: html }} />;
            }
          } catch (e) {
             console.error("LaTeX render error:", e);
          }
          return <code key={i} className="font-mono bg-gray-100 px-1 rounded text-sm text-indigo-700">{part}</code>;
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
};

interface QuestionCardProps {
  data: GeneratedQuestion;
  index: number;
  showSolution: boolean;
  onUpdate: (updatedQuestion: GeneratedQuestion) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ data, index, showSolution, onUpdate }) => {
  const [localOpen, setLocalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<GeneratedQuestion>(data);

  useEffect(() => {
    setEditData(data);
  }, [data]);

  const isOpen = showSolution || localOpen;

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(data);
    setIsEditing(false);
  };

  // Helper to remove prefixes like "A.", "B)", "a.", "b:" from text
  const cleanOptionText = (text: string) => {
    if (!text) return "";
    // Regex to match start of string with single letter A-D or a-d, followed by . ) or : and optional space
    return text.replace(/^[A-Da-d][\.\)\:]\s*/, "");
  };

  // Helper to determine grid layout based on option length
  const getGridClass = (options: string[] | undefined) => {
    if (!options || options.length === 0) return "grid-cols-1";
    
    // Calculate max length of options (after cleaning)
    const maxLen = Math.max(...options.map(o => cleanOptionText(o).length));
    
    // Logic: 
    // < 15 chars: 4 columns (1 row) -> e.g. Numbers, short words
    // < 40 chars: 2 columns (2 rows) -> e.g. Short sentences
    // >= 40 chars: 1 column (4 rows) -> e.g. Long sentences
    
    if (maxLen < 15) {
        return "grid-cols-1 md:grid-cols-4 print:grid-cols-4";
    } else if (maxLen < 40) {
        return "grid-cols-1 md:grid-cols-2 print:grid-cols-2";
    } else {
        return "grid-cols-1";
    }
  };

  // --- EDIT MODE RENDER (Raw Text for Editing) ---
  if (isEditing) {
    return (
      <div className="bg-white p-5 rounded-lg border-2 border-indigo-200 shadow-lg mb-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-bold text-indigo-700">Chỉnh sửa câu {index + 1}</h4>
          <div className="flex gap-2">
            <button onClick={handleCancel} className="p-1 text-gray-500 hover:text-gray-700"><X size={20} /></button>
            <button onClick={handleSave} className="p-1 text-green-600 hover:text-green-800"><Save size={20} /></button>
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Câu hỏi (LaTeX dùng $...$)</label>
            <textarea 
              className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-indigo-200 font-mono"
              rows={3}
              value={editData.question}
              onChange={(e) => setEditData({...editData, question: e.target.value})}
            />
          </div>

          {(editData.type === 'mcq' || editData.type === 'tf') && editData.options && (
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                {editData.type === 'tf' ? 'Các mệnh đề (a, b, c, d)' : 'Lựa chọn (A, B, C, D)'}
              </label>
              <div className="grid grid-cols-1 gap-2">
                {editData.options.map((opt, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <span className="font-bold w-4">{String.fromCharCode(97 + i)})</span>
                    <input
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                        value={opt}
                        onChange={(e) => {
                        const newOptions = [...(editData.options || [])];
                        newOptions[i] = e.target.value;
                        setEditData({...editData, options: newOptions});
                        }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Đáp án đúng</label>
              <input 
                className="w-full p-2 border border-gray-300 rounded text-sm font-bold text-green-700"
                value={editData.answer}
                onChange={(e) => setEditData({...editData, answer: e.target.value})}
                placeholder={editData.type === 'tf' ? 'Đúng - Sai - Sai - Đúng' : ''}
              />
            </div>
            {editData.type === 'essay' && (
               <div>
               <label className="block text-xs font-medium text-gray-500 mb-1">Điểm</label>
               <input 
                 type="number" step="0.25"
                 className="w-full p-2 border border-gray-300 rounded text-sm"
                 value={editData.points || 0}
                 onChange={(e) => setEditData({...editData, points: Number(e.target.value)})}
               />
             </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Lời giải / Hướng dẫn</label>
            <textarea 
              className="w-full p-2 border border-gray-300 rounded text-sm"
              rows={2}
              value={editData.solution}
              onChange={(e) => setEditData({...editData, solution: e.target.value})}
            />
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW MODE RENDER (With LaTeX) ---
  const renderContent = () => {
    switch (data.type) {
      case 'mcq':
        const gridClass = getGridClass(data.options);
        // Reduced gap for tighter printing
        return (
          <div className={`grid gap-2 mt-1 print:gap-y-1 print:gap-x-4 ${gridClass}`}>
            {data.options?.map((opt, idx) => (
              <div key={idx} className="flex items-center p-1 rounded border border-gray-100 print:border-none print:p-0">
                <span className="font-bold mr-2 text-sm w-5 h-5 flex items-center justify-center bg-gray-100 rounded-full print:bg-transparent print:border print:border-gray-400 print:w-auto print:h-auto print:inline-block print:mr-1">
                  {String.fromCharCode(65 + idx)}.
                </span>
                <span className="text-gray-800 text-sm print:text-base leading-tight">
                  <LatexRenderer content={cleanOptionText(opt)} />
                </span>
              </div>
            ))}
          </div>
        );
      case 'tf':
        return (
            <div className="mt-1">
                {data.options?.map((opt, idx) => (
                    <div key={idx} className="flex items-start gap-2 py-0.5 leading-tight">
                        <span className="font-bold text-sm w-5">{String.fromCharCode(97 + idx)})</span>
                        <div className="flex-1 text-sm text-gray-800">
                            <LatexRenderer content={cleanOptionText(opt)} />
                        </div>
                    </div>
                ))}
            </div>
        );
      case 'short':
        return (
          <div className="mt-2 mb-1 p-2 bg-gray-50 border border-dashed border-gray-300 rounded text-sm text-gray-500 print:border-b print:border-t-0 print:border-x-0 print:border-gray-400 print:bg-transparent print:rounded-none print:h-6 print:w-1/2 print:mt-1">
            Điền đáp án...
          </div>
        );
      case 'essay':
        return (
          <div className="mt-2 h-24 border border-gray-200 rounded bg-white print:h-32 print:border print:border-gray-300 w-full"></div>
        );
      default:
        return null;
    }
  };

  return (
    // Applied mb-2 which is approx 0.5rem (8px), close to 6pt.
    // Leading-tight is 1.25, leading-none is 1. Used leading-tight for readability.
    <div className="question-card bg-white p-5 rounded-lg border border-gray-200 shadow-sm mb-4 break-inside-avoid print:shadow-none print:border-none print:p-0 print:mb-2 print:text-justify">
      <div className="flex justify-between items-start mb-1 group">
        <h4 className="font-bold text-gray-900 flex items-center gap-2">
          <span className="text-indigo-600 print:text-black whitespace-nowrap text-base">Câu {index + 1}:</span>
          
          {/* Display points only for essay */}
          {data.points && (
             <span className="text-sm font-normal text-gray-500 print:text-black italic">({data.points} điểm)</span>
          )}
        </h4>
        
        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity print:hidden"
            title="Chỉnh sửa câu hỏi"
          >
            <Pencil size={14} />
          </button>
        </div>
      </div>

      <div className="text-gray-800 text-base whitespace-pre-wrap leading-tight font-medium print:leading-tight">
        <LatexRenderer content={data.question} />
      </div>

      {renderContent()}

      {/* Interactive Toggle for solution (Screen only) */}
      <div className="print:hidden mt-2 flex justify-end no-print">
        <button 
          onClick={() => setLocalOpen(!localOpen)}
          className="text-xs text-indigo-500 flex items-center hover:text-indigo-700 transition-colors"
        >
          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          <span className="ml-1">{isOpen ? 'Ẩn lời giải' : 'Xem lời giải'}</span>
        </button>
      </div>

      {/* Solution Section */}
      {isOpen && (
        <div className="mt-2 p-3 bg-green-50 border border-green-100 rounded text-sm print:bg-transparent print:border-0 print:p-0 print:mt-1 print:text-gray-600 print:italic print:leading-tight">
          <div className="font-bold text-green-800 mb-1 flex items-center gap-1 print:text-black print:not-italic">
            <CheckCircle size={14} className="print:hidden" />
            <span>Đáp án: <LatexRenderer content={data.answer} /></span>
          </div>
          <div className="text-gray-700 whitespace-pre-wrap print:text-gray-600">
            <span className="font-semibold print:hidden">Lời giải chi tiết: </span>
            <LatexRenderer content={data.solution} />
          </div>
        </div>
      )}
    </div>
  );
};
