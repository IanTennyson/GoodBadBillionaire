
import { defineStore } from 'pinia';
import { type BillionaireData, Judges, FinalVerdict } from '../types.ts';

export const useBillionaireStore = defineStore('billionaireStore', {
  state: (): { billionaires: BillionaireData[] } => ({
    billionaires: [
      {
        id: 1,
        name: 'Jeff Bezos',
        profilePic: '/src/assets/profilepics/jeffbezos.png',
        gbb: {
          episodeTitle: 'Jeff Bezos: Get big fast',
          dateOfRecording: '29/08/2023',
          episodeUrl: 'https://www.bbc.co.uk/sounds/play/p0g8d4cm',
          verdict: {
            [Judges.Simon]: {
              wealth: 9.5,
              rags_to_riches: 6,
              villainy: 9,
              philanthropy: 0,
              power: 10,
              legacy: 10,
              good_bad_billionaire: FinalVerdict.BAD,
            },
            [Judges.Zing]: {
              wealth: 9.5,
              rags_to_riches: 7,
              villainy: 9.5,
              philanthropy: 0,
              power: 10,
              legacy: 10,
              good_bad_billionaire: FinalVerdict.BAD,
            },
          },
          timeOfRecording: {
            netWorth: 10,
          },
        },
        industry: 'Tech',
      }, {
        id: 2,
        name: 'Jeff Bezos',
        profilePic: '/src/assets/profilepics/jeffbezos.png',
        gbb: {
          episodeTitle: 'Jeff Bezos: Get big fast',
          dateOfRecording: '29/08/2023',
          episodeUrl: 'https://www.bbc.co.uk/sounds/play/p0g8d4cm',
          verdict: {
            [Judges.Simon]: {
              wealth: 9.5,
              rags_to_riches: 6,
              villainy: 9,
              philanthropy: 0,
              power: 10,
              legacy: 10,
              good_bad_billionaire: FinalVerdict.BAD,
            },
            [Judges.Zing]: {
              wealth: 9.5,
              rags_to_riches: 7,
              villainy: 9.5,
              philanthropy: 0,
              power: 10,
              legacy: 10,
              good_bad_billionaire: FinalVerdict.BAD,
            },
          },
          timeOfRecording: {
            netWorth: 10,
          },
        },
        industry: 'Tech',
      }, {
        id: 3,
        name: 'Jeff Bezos',
        profilePic: '/src/assets/profilepics/jeffbezos.png',
        gbb: {
          episodeTitle: 'Jeff Bezos: Get big fast',
          dateOfRecording: '29/08/2023',
          episodeUrl: 'https://www.bbc.co.uk/sounds/play/p0g8d4cm',
          verdict: {
            [Judges.Simon]: {
              wealth: 9.5,
              rags_to_riches: 6,
              villainy: 9,
              philanthropy: 0,
              power: 10,
              legacy: 10,
              good_bad_billionaire: FinalVerdict.BAD,
            },
            [Judges.Zing]: {
              wealth: 9.5,
              rags_to_riches: 7,
              villainy: 9.5,
              philanthropy: 0,
              power: 10,
              legacy: 10,
              good_bad_billionaire: FinalVerdict.BAD,
            },
          },
          timeOfRecording: {
            netWorth: 10,
          },
        },
        industry: 'Tech',
      }, {
        id: 4,
        name: 'Jeff Bezos',
        profilePic: '/src/assets/profilepics/jeffbezos.png',
        gbb: {
          episodeTitle: 'Jeff Bezos: Get big fast',
          dateOfRecording: '29/08/2023',
          episodeUrl: 'https://www.bbc.co.uk/sounds/play/p0g8d4cm',
          verdict: {
            [Judges.Simon]: {
              wealth: 9.5,
              rags_to_riches: 6,
              villainy: 9,
              philanthropy: 0,
              power: 10,
              legacy: 10,
              good_bad_billionaire: FinalVerdict.BAD,
            },
            [Judges.Zing]: {
              wealth: 9.5,
              rags_to_riches: 7,
              villainy: 9.5,
              philanthropy: 0,
              power: 10,
              legacy: 10,
              good_bad_billionaire: FinalVerdict.BAD,
            },
          },
          timeOfRecording: {
            netWorth: 10,
          },
        },
        industry: 'Tech',
      }
    ],
  }),
  actions: {
    getBillionaires() {
      return this.billionaires;
    },
    compareNetWorth(id: number) {
      const billionaire = this.billionaires.find(b => b.id === id);
      if (billionaire) {
        return {
          name: billionaire.name,
          originalNetWorth: billionaire.gbb.timeOfRecording.netWorth,
          currentNetWorth: 150, // Replace with live data if necessary
        };
      }
      return null;
    },
  },
});