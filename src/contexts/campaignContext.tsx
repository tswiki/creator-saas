
'use client'

import React, { createContext, useContext, useState } from 'react';

type CampaignContextType = {
  campaignId: string;
  setCampaignId: (id: string) => void;
};

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export function CampaignProvider({ children }: { children: React.ReactNode }) {
  const [campaignId, setCampaignId] = useState<string>('');

  return (
    <CampaignContext.Provider value={{ campaignId, setCampaignId }}>
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaign() {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
}
