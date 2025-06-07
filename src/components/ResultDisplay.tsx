import React from 'react';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { ApiResponse } from '../types';

interface ResultDisplayProps {
  results: ApiResponse | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ results }) => {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('テキストがクリップボードにコピーされました！');
    } catch (err) {
      console.error('コピーに失敗しました:', err);
      alert('コピーに失敗しました');
    }
  };

  if (!results || !results.data || results.data.length === 0) {
    return null;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>Results</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {results.data.map((item) => (
          <div
            key={item.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: '#f9f9f9'
            }}
          >
            <div style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ color: '#007bff', margin: '0' }}>
                  Response {item.id}
                </h3>
                <button
                  onClick={() => copyToClipboard(item.result)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#218838'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
                >
                  📋 コピー
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
                <div>
                  <strong>Role:</strong> {item.args.role}
                </div>
                <div>
                  <strong>Model:</strong> {item.args.model_name}
                </div>
                <div>
                  <strong>Temperature:</strong> {item.args.temperature}
                </div>
                <div>
                  <strong>Max Tokens:</strong> {item.args.max_tokens}
                </div>
              </div>
            </div>
            <div>
              <strong style={{ display: 'block', marginBottom: '10px' }}>Result:</strong>
              <div
                style={{
                  backgroundColor: 'white',
                  padding: '15px',
                  borderRadius: '4px',
                  border: '1px solid #e0e0e0',
                  lineHeight: '1.6'
                }}
              >
                <ReactMarkdown
                  components={{
                    code: ({ inline, className, children, ...props }: any) => {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <SyntaxHighlighter
                          language={match[1]}
                          PreTag="div"
                          style={tomorrow as any}
                          customStyle={{
                            margin: '10px 0',
                            borderRadius: '6px',
                            fontSize: '14px'
                          }}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code
                          style={{
                            backgroundColor: '#f5f5f5',
                            padding: '2px 6px',
                            borderRadius: '3px',
                            fontSize: '0.9em',
                            fontFamily: 'Monaco, Consolas, "Lucida Console", monospace'
                          }}
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                    h1: ({ children }: any) => (
                      <h1 style={{
                        color: '#333',
                        borderBottom: '2px solid #007bff',
                        paddingBottom: '8px',
                        marginTop: '24px',
                        marginBottom: '16px'
                      }}>
                        {children}
                      </h1>
                    ),
                    h2: ({ children }: any) => (
                      <h2 style={{
                        color: '#333',
                        borderBottom: '1px solid #ddd',
                        paddingBottom: '6px',
                        marginTop: '20px',
                        marginBottom: '14px'
                      }}>
                        {children}
                      </h2>
                    ),
                    h3: ({ children }: any) => (
                      <h3 style={{
                        color: '#555',
                        marginTop: '18px',
                        marginBottom: '12px'
                      }}>
                        {children}
                      </h3>
                    ),
                    blockquote: ({ children }: any) => (
                      <blockquote style={{
                        borderLeft: '4px solid #007bff',
                        paddingLeft: '16px',
                        margin: '16px 0',
                        backgroundColor: '#f8f9fa',
                        padding: '12px 16px',
                        borderRadius: '4px',
                        fontStyle: 'italic'
                      }}>
                        {children}
                      </blockquote>
                    ),
                    ul: ({ children }: any) => (
                      <ul style={{
                        paddingLeft: '20px',
                        marginBottom: '12px',
                        listStyleType: 'disc'
                      }}>
                        {children}
                      </ul>
                    ),
                    ol: ({ children }: any) => (
                      <ol style={{
                        paddingLeft: '20px',
                        marginBottom: '12px'
                      }}>
                        {children}
                      </ol>
                    ),
                    li: ({ children }: any) => (
                      <li style={{
                        marginBottom: '6px',
                        lineHeight: '1.6'
                      }}>
                        {children}
                      </li>
                    ),
                    p: ({ children }: any) => (
                      <p style={{
                        marginBottom: '12px',
                        lineHeight: '1.7'
                      }}>
                        {children}
                      </p>
                    ),
                    table: ({ children }: any) => (
                      <table style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        margin: '16px 0',
                        border: '1px solid #ddd'
                      }}>
                        {children}
                      </table>
                    ),
                    th: ({ children }: any) => (
                      <th style={{
                        border: '1px solid #ddd',
                        padding: '8px 12px',
                        backgroundColor: '#f5f5f5',
                        fontWeight: 'bold',
                        textAlign: 'left'
                      }}>
                        {children}
                      </th>
                    ),
                    td: ({ children }: any) => (
                      <td style={{
                        border: '1px solid #ddd',
                        padding: '8px 12px'
                      }}>
                        {children}
                      </td>
                    ),
                  }}
                >
                  {item.result || 'No result available'}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultDisplay;