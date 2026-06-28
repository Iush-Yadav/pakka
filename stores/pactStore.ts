import { create } from 'zustand';
import type { Pact, PactHistoryItem, CheckInResult, PactMember } from '@/types';
import { activePacts, pactHistory as initialHistory } from '@/lib/mockData';

interface PactState {
  activePacts: Pact[];
  pactHistory: PactHistoryItem[];
  draftLocation?: { address: string; latitude: number; longitude: number; radius: number };
  
  // Actions
  addPact: (pact: Pact) => void;
  joinPact: (pactId: string, member: PactMember) => void;
  checkIn: (pactId: string, userId: string) => void;
  resolvePact: (result: CheckInResult) => void;
  setDraftLocation: (loc: { address: string; latitude: number; longitude: number; radius: number } | undefined) => void;
}

export const usePactStore = create<PactState>((set) => ({
  activePacts: activePacts,
  pactHistory: initialHistory,
  draftLocation: undefined,
  
  setDraftLocation: (loc) => set({ draftLocation: loc }),
  
  addPact: (pact) => set((state) => ({ 
    activePacts: [pact, ...state.activePacts],
    draftLocation: undefined // reset after creation
  })),
  
  joinPact: (pactId, member) => set((state) => ({
    activePacts: state.activePacts.map(p => {
      if (p.id === pactId) {
        return {
          ...p,
          members: [...p.members, member],
          totalMembers: p.totalMembers + 1
        };
      }
      return p;
    })
  })),
  
  checkIn: (pactId, userId) => set((state) => ({
    activePacts: state.activePacts.map(p => {
      if (p.id === pactId) {
        const updatedMembers = p.members.map(m => 
          m.userId === userId 
            ? { ...m, checkInStatus: 'checked_in' as const, checkInTime: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
            : m
        );
        return { ...p, members: updatedMembers, checkedInCount: p.checkedInCount + 1 };
      }
      return p;
    })
  })),
  
  resolvePact: (result) => set((state) => {
    // Remove from active pacts and move to history
    const completedPact = state.activePacts.find(p => p.id === result.pactId);
    
    if (!completedPact) return state;
    
    const newHistoryItem: PactHistoryItem = {
      id: completedPact.id,
      name: completedPact.name,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      time: completedPact.time,
      status: 'completed',
      showedUp: `${result.checkedInCount}/${result.totalMembers} showed up`,
      members: result.members
    };
    
    return {
      activePacts: state.activePacts.filter(p => p.id !== result.pactId),
      pactHistory: [newHistoryItem, ...state.pactHistory]
    };
  })
}));
