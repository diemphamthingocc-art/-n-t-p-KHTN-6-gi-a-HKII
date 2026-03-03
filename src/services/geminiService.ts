import React from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { ShortQuestion } from '../types';

export const gradeShortAnswers = async (
  questions: ShortQuestion[],
  userAnswers: string[]
): Promise<{ score: number; feedback: string }> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
  
  const answersToGrade = questions.map((q, i) => ({
    question: q.q,
    userAnswer: userAnswers[i],
    referenceAnswer: q.ref
  }));

  const prompt = `Bạn là một giáo viên Khoa học tự nhiên lớp 6. Hãy chấm điểm 6 câu trả lời ngắn của học sinh. 
  Mỗi câu tối đa 0.25 điểm. Tổng điểm tối đa là 1.5. 
  Dựa vào câu hỏi và đáp án tham khảo để chấm điểm khách quan.
  Hãy đưa ra nhận xét cực kỳ ngắn gọn, khích lệ học sinh.
  
  Dữ liệu bài làm: ${JSON.stringify(answersToGrade)}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: {
              type: Type.NUMBER,
              description: "Tổng điểm của 6 câu trả lời ngắn (0 - 1.5)",
            },
            feedback: {
              type: Type.STRING,
              description: "Nhận xét ngắn gọn về bài làm",
            },
          },
          required: ["score", "feedback"],
        },
      },
    });

    const result = JSON.parse(response.text || '{"score": 0, "feedback": "Không thể chấm điểm."}');
    return result;
  } catch (error) {
    console.error("AI Grading Error:", error);
    return { score: 0, feedback: "Lỗi kết nối AI khi chấm điểm." };
  }
};
