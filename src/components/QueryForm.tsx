import React, { useState } from 'react';
import { postQuery } from '../services/api';
import { ApiResponse } from '../types';

interface QueryFormProps {
  onResults: (data: ApiResponse) => void;
}

const QueryForm: React.FC<QueryFormProps> = ({ onResults }) => {
  const [query, setQuery] = useState('Brill-Noether theoryについて解説して');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await postQuery(query);
      onResults(response);
    } catch (error: any) {
      console.error('Error fetching data:', error);
      if (error.response?.status === 405) {
        setError('CORS エラー: APIサーバーでCORSの設定を確認してください。');
      } else if (error.code === 'ECONNREFUSED') {
        setError('接続エラー: localhost:8000のAPIサーバーが起動していません。');
      } else {
        setError(`エラーが発生しました: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>AI Query Client</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '16px' }}>
            質問を入力してください:
          </label>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%',
              minHeight: '120px',
              padding: '12px',
              border: '2px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px',
              fontFamily: 'inherit',
              resize: 'vertical',
              transition: 'border-color 0.2s ease',
              outline: 'none'
            }}
            placeholder="例: Brill-Noether theoryについて解説して"
            onFocus={(e) => e.target.style.borderColor = '#007bff'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        </div>

        {error && (
          <div style={{
            color: '#721c24',
            backgroundColor: '#f8d7da',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '15px',
            border: '1px solid #f5c6cb'
          }}>
            ⚠️ {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '12px 24px',
            backgroundColor: loading ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            justifyContent: 'center',
            minHeight: '48px',
            transition: 'background-color 0.2s ease',
            opacity: loading ? 0.7 : 1
          }}
          onMouseOver={(e) => {
            if (!loading) e.currentTarget.style.backgroundColor = '#0056b3';
          }}
          onMouseOut={(e) => {
            if (!loading) e.currentTarget.style.backgroundColor = '#007bff';
          }}
        >
          {loading ? (
            <>
              <div style={{
                width: '18px',
                height: '18px',
                border: '2px solid #ffffff',
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              AI が回答を生成中...
            </>
          ) : (
            <>🚀 質問を送信</>
          )}
        </button>

        {loading && (
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        )}
      </form>
    </div>
  );
};

export default QueryForm;