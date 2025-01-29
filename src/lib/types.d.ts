
// types.d.ts
declare module '*.json' {
    const value: {
      type: string
      project_id: string
      private_key_id: string
      private_key: string
      client_email: string
      client_id: string
      auth_uri: string
      token_uri: string
      auth_provider_x509_cert_url: string
      client_x509_cert_url: string
    }
    export default value
  }

  
  export interface CampaignFormData {
    id: string
    idealCustomerProfile: string;
    businessType: string;
    solution: string;
    relevancePoint: string;
    language: string;
    tone: string;
    startDate: Date | null;
  }

  declare module 'date-fns' {
    export function format(date: Date | number, format: string): string;
  }