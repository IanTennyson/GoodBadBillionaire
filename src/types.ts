
export enum FinalVerdict {
  GOOD = "GOOD",
  BAD = "BAD",
  BILLIONAIRE = "BILLIONAIRE",
}

export enum Judges {
  Simon = "Simon Jack",
  Zing = "Zing Tsjeng",
}


type Verdict = {
  wealth: number;
  rags_to_riches: number;
  villainy: number;
  philanthropy: number;
  power: number;
  legacy: number;
  good_bad_billionaire: FinalVerdict;
}

type GoodBadBillionaire = {
  episodeTitle: string;
  dateOfRecording: string;
  episodeUrl: string;
  verdict: {
    [judge: string]: Verdict;
  };
  timeOfRecording: {
    netWorth: number;
  };
}

export type BillionaireData = {
  id: number;
  name: string;
  profilePic: string;
  gbb: GoodBadBillionaire; // Metadata related to the Good Bad Billionaire episode
  industry: string;
};
