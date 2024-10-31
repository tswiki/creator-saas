

// app/types.ts
export interface ApiResponse {
  message: string;
  data?: {
    fullName: string;
    email: string;
    phoneNo: string;
  };
}

export interface ApiErrorResponse {
  message: string;
  errors?: Array<{
    code: string;
    message: string;
    path: string[];
  }>;
}