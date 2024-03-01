import React from "react";

export interface IVoteData {
    position: any;
    chosen_person?: number;
    voting_person: any;
}

export interface IVoteState {
    data: any[],
    loading: boolean;
    error: boolean;
}

export interface IPositionId {
    position_id: number;
}

export interface IListCandidatesState {
    data: any[];
    loading: boolean;
    error: boolean;
  }



