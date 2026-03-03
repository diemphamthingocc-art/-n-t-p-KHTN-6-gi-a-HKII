import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Microscope, 
  ShieldAlert, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  Eye, 
  Send,
  Trophy
} from 'lucide-react';
import { mcqQuestions, tfQuestions, shortQuestions } from './data';
import { QuizResult } from './types';
import { gradeShortAnswers } from './services/geminiService';

type Screen = 'start' | 'quiz' | 'result';

export default function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [violationCount, setViolationCount] = useState(0);
  const [showCheatModal, setShowCheatModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);
  
  const [userMCQ, setUserMCQ] = useState<(number | null)[]>(new Array(mcqQuestions.length).fill(null));
  const [userTF, setUserTF] = useState<(boolean | null)[][]>(tfQuestions.map(q => new Array(q.i.length).fill(null)));
  const [userShort, setUserShort] = useState<string[]>(new Array(shortQuestions.length).fill(''));
  
  const [result, setResult] = useState<QuizResult | null>(null);

  const submitQuiz = useCallback(async (auto = false) => {
    if (screen !== 'quiz' || isSubmitting) return;
    
    setIsSubmitting(true);
    setShowCheatModal(false);

    let mcqScore = 0;
    userMCQ.forEach((ans, i) => {
      if (ans === mcqQuestions[i].c) mcqScore += 0.25;
    });

    let tfScore = 0;
    userTF.forEach((row, i) => {
      row.forEach((ans, j) => {
        if (ans !== null && ans === tfQuestions[i].a[j]) tfScore += 0.25;
      });
    });

    try {
      const aiResult = await gradeShortAnswers(shortQuestions, userShort);
      let total = mcqScore + tfScore + aiResult.score;
      
      let feedback = aiResult.feedback;
      if (auto && violationCount >= 3) {
        total = total * 0.5;
        feedback = "BÀI LÀM BỊ TRỪ 50% ĐIỂM VÌ VI PHẠM GIAN LẬN QUÁ NHIỀU LẦN. " + feedback;
      }

      setResult({
        total: parseFloat(total.toFixed(1)),
        mcqScore,
        tfScore,
        shortScore: aiResult.score,
        feedback
      });
      setScreen('result');
    } catch (error) {
      setResult({
        total: parseFloat((mcqScore + tfScore).toFixed(1)),
        mcqScore,
        tfScore,
        shortScore: 0,
        feedback: "Lỗi kết nối AI."
      });
      setScreen('result');
    } finally {
      setIsSubmitting(false);
    }
  }, [screen, isSubmitting, userMCQ, userTF, userShort, violationCount]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (screen === 'quiz' && document.visibilityState === 'hidden') {
        setViolationCount(prev => {
          const next = prev + 1;
          setShowCheatModal(true);
          if (next >= 3) {
            submitQuiz(true);
          }
          return next;
        });
      }
    };

    const handleBlur = () => {
      if (screen === 'quiz') {
        setViolationCount(prev => {
          const next = prev + 1;
          setShowCheatModal(true);
          if (next >= 3) {
            submitQuiz(true);
          }
          return next;
        });
      }
    };

    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'u')) || e.key === 'F12') {
        e.preventDefault();
      }
    };

    if (screen === 'quiz') {
      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('blur', handleBlur);
      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [screen, submitQuiz]);

  const startQuiz = () => {
    setScreen('quiz');
    setViolationCount(0);
    setIsReviewMode(false);
    setUserMCQ(new Array(mcqQuestions.length).fill(null));
    setUserTF(tfQuestions.map(q => new Array(q.i.length).fill(null)));
    setUserShort(new Array(shortQuestions.length).fill(''));
  };

  const renderStartScreen = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center bg-white p-10 rounded-3xl shadow-xl border border-slate-100"
    >
      <div className="inline-block p-4 bg-blue-50 rounded-2xl mb-6">
        <Microscope className="w-16 h-16 text-blue-600" />
      </div>
      <h1 className="text-2xl font-black text-slate-800 mb-2 uppercase tracking-tight">Kiểm tra KHTN 6 - Đề 003</h1>
      <p className="text-slate-500 text-xs mb-4 italic">Trọng tâm: Tế bào - Tổ chức đa bào - 5 Giới</p>
      
      <div className="bg-red-50 p-4 rounded-2xl mb-8 border border-red-100">
        <p className="text-[10px] font-black text-red-600 uppercase mb-1 flex items-center justify-center">
          <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse mr-2"></span> Chế độ chống gian lận đang bật
        </p>
        <p className="text-slate-500 text-[10px]">Hệ thống sẽ nộp bài tự động nếu bạn chuyển tab quá 3 lần.</p>
      </div>
      
      <div className="space-y-2 mb-10 text-left">
        <div className="p-3 bg-slate-50 rounded-xl flex items-center text-xs font-bold">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>Phần I: 18 câu Trắc nghiệm (4.5đ)
        </div>
        <div className="p-3 bg-slate-50 rounded-xl flex items-center text-xs font-bold">
          <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>Phần II: 4 câu Đúng/Sai (4.0đ)
        </div>
        <div className="p-3 bg-slate-50 rounded-xl flex items-center text-xs font-bold">
          <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>Phần III: 6 câu Vận dụng (1.5đ)
        </div>
      </div>

      <button 
        onClick={startQuiz}
        className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-700 transition active:scale-95 shadow-lg shadow-blue-100 uppercase"
      >
        Bắt đầu làm bài
      </button>
    </motion.div>
  );

  const renderQuizArea = () => (
    <div className="space-y-10 pb-24">
      <section>
        <div className="section-header">Phần I: Trắc nghiệm (MCQ)</div>
        <div className="space-y-4 mt-4">
          {mcqQuestions.map((q, i) => (
            <div key={i} className="quiz-card p-5">
              <p className="font-bold text-slate-800 mb-4 text-xs">{i + 1}. {q.q}</p>
              <div className="space-y-2">
                {q.a.map((opt, j) => {
                  const isCorrect = j === q.c;
                  const isSelected = userMCQ[i] === j;
                  let statusClass = "";
                  if (isReviewMode) {
                    if (isCorrect) statusClass = "correct-ans";
                    else if (isSelected) statusClass = "wrong-ans";
                  }

                  return (
                    <label key={j} className="block">
                      <input 
                        type="radio" 
                        name={`mcq${i}`} 
                        value={j} 
                        className="hidden"
                        disabled={isReviewMode}
                        checked={isSelected}
                        onChange={() => {
                          const next = [...userMCQ];
                          next[i] = j;
                          setUserMCQ(next);
                        }}
                      />
                      <div className={`option-label ${statusClass} ${!isReviewMode && isSelected ? 'border-blue-600 bg-blue-50' : ''}`}>
                        <span className="w-5 h-5 rounded-full border border-slate-200 mr-3 flex items-center justify-center text-[10px]">
                          {String.fromCharCode(65 + j)}
                        </span>
                        {opt}
                        {isReviewMode && isCorrect && (
                          <span className="correct-badge">{isSelected ? 'ĐÚNG' : 'ĐÁP ÁN'}</span>
                        )}
                        {isReviewMode && isSelected && !isCorrect && (
                          <span className="wrong-badge">SAI</span>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="section-header">Phần II: Đúng / Sai</div>
        <div className="space-y-4 mt-4">
          {tfQuestions.map((q, i) => (
            <div key={i} className="quiz-card p-5">
              <p className="font-bold text-slate-800 mb-4 text-xs">{i + 19}. {q.q}</p>
              {q.i.map((sub, j) => {
                const userAns = userTF[i][j];
                const correctAns = q.a[j];
                
                return (
                  <div key={j} className="p-3 bg-slate-50 rounded-lg mb-2">
                    <span className="font-medium text-slate-600 text-[11px] block mb-2">{sub}</span>
                    <div className="flex gap-2">
                      <label className={`px-3 py-1 rounded border cursor-pointer text-xs font-bold transition-colors
                        ${userAns === true ? (isReviewMode ? (correctAns === true ? 'bg-green-600 text-white' : 'bg-red-600 text-white') : 'bg-blue-600 text-white') : 'bg-white'}
                        ${isReviewMode && correctAns === true && userAns !== true ? 'border-green-600 border-2' : ''}
                      `}>
                        <input 
                          type="radio" 
                          name={`tf${i}_${j}`} 
                          value="true" 
                          className="hidden"
                          disabled={isReviewMode}
                          checked={userAns === true}
                          onChange={() => {
                            const next = [...userTF];
                            next[i] = [...next[i]];
                            next[i][j] = true;
                            setUserTF(next);
                          }}
                        />
                        ĐÚNG
                      </label>
                      <label className={`px-3 py-1 rounded border cursor-pointer text-xs font-bold transition-colors
                        ${userAns === false ? (isReviewMode ? (correctAns === false ? 'bg-green-600 text-white' : 'bg-red-600 text-white') : 'bg-red-600 text-white') : 'bg-white'}
                        ${isReviewMode && correctAns === false && userAns !== false ? 'border-green-600 border-2' : ''}
                      `}>
                        <input 
                          type="radio" 
                          name={`tf${i}_${j}`} 
                          value="false" 
                          className="hidden"
                          disabled={isReviewMode}
                          checked={userAns === false}
                          onChange={() => {
                            const next = [...userTF];
                            next[i] = [...next[i]];
                            next[i][j] = false;
                            setUserTF(next);
                          }}
                        />
                        SAI
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="section-header">Phần III: Trả lời ngắn - AI Chấm điểm</div>
        <div className="space-y-4 mt-4">
          {shortQuestions.map((q, i) => (
            <div key={i} className="quiz-card p-5 border-l-4 border-emerald-500">
              <p className="font-bold text-slate-800 mb-4 text-xs">{i + 23}. {q.q}</p>
              <textarea 
                value={userShort[i]}
                disabled={isReviewMode}
                onChange={(e) => {
                  const next = [...userShort];
                  next[i] = e.target.value;
                  setUserShort(next);
                }}
                className="w-full p-4 border rounded-xl text-xs outline-none focus:ring-2 focus:ring-emerald-200 h-28" 
                placeholder="Câu trả lời của em..."
              />
              {isReviewMode && (
                <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded-lg text-[10px] italic">
                  <strong className="block not-italic text-blue-900 mb-1">Đáp án tham khảo:</strong> {q.ref}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {!isReviewMode && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t flex justify-center z-50">
          <button 
            onClick={() => submitQuiz()}
            disabled={isSubmitting}
            className="max-w-md w-full bg-slate-900 text-white font-black py-4 rounded-2xl shadow-xl hover:bg-black transition flex items-center justify-center uppercase text-sm disabled:opacity-50"
          >
            {isSubmitting ? (
              <><span className="loader"></span> AI ĐANG CHẤM ĐIỂM...</>
            ) : (
              <><Send className="w-4 h-4 mr-2" /> Gửi bài & Phân tích kết quả</>
            )}
          </button>
        </div>
      )}
    </div>
  );

  const renderResultArea = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center bg-white p-10 rounded-3xl shadow-2xl border border-slate-100"
    >
      <div className="mb-4">
        {violationCount >= 3 ? (
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-600" />
        ) : (
          <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
        )}
        <h2 className="text-lg font-black text-slate-800 uppercase mb-2">
          {violationCount >= 3 ? "BÀI LÀM VI PHẠM" : "Kết quả bài làm"}
        </h2>
      </div>
      <div className={`text-6xl font-black mb-6 ${violationCount >= 3 ? 'text-red-600' : 'text-blue-600'}`}>
        {result?.total}
      </div>
      <div className="text-left space-y-3 mb-8 text-xs font-bold uppercase text-slate-500 border-b pb-6">
        <div className="flex justify-between">
          <span>Trắc nghiệm khách quan</span>
          <span>{result?.mcqScore.toFixed(2)} / 4.5</span>
        </div>
        <div className="flex justify-between">
          <span>Trắc nghiệm Đúng/Sai</span>
          <span>{result?.tfScore.toFixed(2)} / 4.0</span>
        </div>
        <div className="flex justify-between">
          <span>Vận dụng (AI chấm)</span>
          <span>{result?.shortScore.toFixed(2)} / 1.5</span>
        </div>
        <div className={`flex justify-between ${violationCount > 0 ? 'text-red-500' : ''}`}>
          <span>Số lần chuyển Tab</span>
          <span>{violationCount} lần</span>
        </div>
      </div>
      <div className="p-5 bg-blue-50 text-blue-800 rounded-2xl text-xs italic text-left leading-relaxed border border-blue-100 mb-6">
        Nhận xét: {result?.feedback}
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={() => {
            setIsReviewMode(true);
            setScreen('quiz');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 transition uppercase text-[10px] tracking-wider flex items-center justify-center"
        >
          <Eye className="w-3 h-3 mr-1" /> Xem lại chi tiết
        </button>
        <button 
          onClick={() => setScreen('start')}
          className="bg-slate-100 text-slate-800 font-bold py-4 rounded-xl hover:bg-slate-200 transition uppercase text-[10px] tracking-wider flex items-center justify-center"
        >
          <RotateCcw className="w-3 h-3 mr-1" /> Làm lại bài
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 min-h-screen">
      <AnimatePresence mode="wait">
        {screen === 'start' && renderStartScreen()}
        {screen === 'quiz' && renderQuizArea()}
        {screen === 'result' && renderResultArea()}
      </AnimatePresence>

      {/* Cheat Warning Modal */}
      <AnimatePresence>
        {showCheatModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-8 rounded-[2rem] max-w-sm w-full text-center border-4 border-red-600"
            >
              <ShieldAlert className="w-20 h-20 mx-auto mb-4 text-red-600" />
              <h3 className="text-xl font-black text-red-600 uppercase mb-2">CẢNH BÁO GIAN LẬN!</h3>
              <p className="text-slate-600 text-sm mb-6">
                {violationCount >= 3 
                  ? "BẠN VI PHẠM QUÁ 3 LẦN. HỆ THỐNG SẼ TỰ ĐỘNG NỘP BÀI!" 
                  : "Bạn vừa rời khỏi màn hình bài thi. Vui lòng quay lại ngay!"}
              </p>
              <div className="text-xs font-bold text-slate-400 mb-6 italic">
                Lần vi phạm: <span className="text-red-600 text-lg">{violationCount}</span>/3
              </div>
              {violationCount < 3 && (
                <button 
                  onClick={() => setShowCheatModal(false)}
                  className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl uppercase text-xs"
                >
                  Tôi đã hiểu
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
