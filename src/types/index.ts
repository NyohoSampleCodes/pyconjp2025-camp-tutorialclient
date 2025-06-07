export interface ApiRequest {
  key: string;
  q: string;
  options: {
    models: string[];
    roles: string[];
    max_tokens: number;
  };
}

export interface ApiResponse {
  data: Array<{
    id: number;
    result: string;
    args: {
      query: string;
      role: string;
      model_name: string;
      temperature: number;
      max_tokens: number;
    };
  }>;
}