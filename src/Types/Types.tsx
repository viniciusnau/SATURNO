export interface IVoteData {
  position: any;
  chosen_person?: number;
  voting_person: any;
}

export interface IVoteState {
  data: any[];
  loading: boolean;
  error: boolean;
}

export interface IRegisterState {
  data: any[];
  loading: boolean;
  error: boolean;
}
export interface IRegister {
  name: string;
  registration: string;
  email: string;
  password: string;
}

export interface IPositionId {
  position_id: number;
}

export interface IListCandidatesState {
  data: any[];
  loading: boolean;
  error: boolean;
}

export interface Candidate {
  id: string;
  name: string;
}

export interface RootState {
  selectedCandidates: Candidate[];
}