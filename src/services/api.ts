import axios from 'axios';
import { ApiRequest, ApiResponse } from '../types';

const API_URL = 'http://localhost:8000/multi-async';

// Configure axios client
const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
});

export const postQuery = async (query: string): Promise<ApiResponse> => {
  const requestData: ApiRequest = {
    key: 'pyconjp2025',
    q: query,
    options: {
      models: [
        'gemini-2.0-flash',
        'gemini-1.5-flash'
      ],
      roles: [
        'あなたは日本の中学生です。',
        'あなたは数学者です。'
      ],
      max_tokens: 1024,
    },
  };

  try {
    const response = await apiClient.post('/multi-async', requestData);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};