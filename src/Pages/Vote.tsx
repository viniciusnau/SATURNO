import React from 'react';
import { IVoteData, IPositionId } from '../Types/Types';
import { fetchListCandidates } from '../Services/Slices/getListCandidates';
import Table from '../Components/Table';
import { useDispatch, useSelector } from 'react-redux';

interface IData {}

const Vote: React.FC = () => {
    const dispatch = useDispatch<any>();
    const { data, loading, error } = useSelector(
        (state: any) => state.getListCandidates
    );

    return (
        <div>
            <h1> Dpg </h1>
            <Table rows={} columns={} checkboxSelection={} />
        </div>
    );
};

export default Vote;
