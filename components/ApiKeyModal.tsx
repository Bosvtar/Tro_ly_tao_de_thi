
import React, { useState, useEffect } from 'react';
import { X, Key, ExternalLink } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (key: string) => void;
  currentKey: string;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onSave, currentKey }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (isOpen) {
      setInputValue(currentKey);
    }
  }, [isOpen, currentKey]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (inputValue.trim()) {
      onSave(inputValue.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden scale-100 transition-transform">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
              <Key size={20} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Cài đặt API Key</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          
          {/* Instruction Box */}
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
            <h4 className="font-bold text-blue-800 mb-3 text-sm">Làm thế nào để lấy API Key?</h4>
            
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-lg transition-colors mb-4 shadow-sm text-sm"
            >
              <Key size={16} /> Mở Google AI Studio để lấy API Key <ExternalLink size={14} />
            </a>

            <ol className="text-sm text-blue-700 space-y-1.5 list-decimal pl-4">
              <li>Đăng nhập bằng tài khoản Google</li>
              <li>Click "Create API Key" hoặc chọn key có sẵn</li>
              <li>Copy API key và paste vào ô bên dưới</li>
            </ol>
          </div>

          {/* Input Section */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Gemini API Key</label>
            <input 
              type="password"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Nhập API key của bạn"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-800"
            />
          </div>

          {/* Action Button */}
          <button 
            onClick={handleSave}
            disabled={!inputValue.trim()}
            className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-all ${
              inputValue.trim() 
                ? 'bg-indigo-500 hover:bg-indigo-600 hover:shadow-indigo-200 transform hover:-translate-y-0.5' 
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Lưu API Key
          </button>

          <p className="text-xs text-gray-500 text-center px-4">
            API key được lưu cục bộ trên trình duyệt của bạn và không được gửi đến server nào khác.
          </p>
        </div>
      </div>
    </div>
  );
};
