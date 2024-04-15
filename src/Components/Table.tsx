import React, { useState } from 'react';
import { Box } from '@mui/material';
import styles from '../Styles/Table.module.css';
import Button from './Button';
import { fetchSelectCandidate } from '../Services/Slices/selectedCandidate';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from './Snackbar';
import { RiAddCircleLine } from 'react-icons/ri';

interface IData {
    row?: { id: number }[];
    checkboxSelection?: boolean;
    disableSelectionOnClick?: boolean;
    loading?: boolean;
    image?: string;
}

const Table: React.FC<IData> = ({ row, loading, image }) => {
    const dispatch = useDispatch<any>();
    const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const responseSelectedCandidates = useSelector(
        (state: any) => state.selectedCandidate.selectedCandidates
    );
    const maxCountCandidates = useSelector((state: any) => state.meId.maxCount);

    const handleCandidateClick = (rowId: any) => {
        const candidate = row?.find((candidate: any) => candidate.id === rowId);
        setSelectedCandidate(candidate);
    };

    const handleSelectedCandidate = () => {
        const totalCount = responseSelectedCandidates.length;
        if (totalCount >= maxCountCandidates) {
            setError('countmaxError');
            return;
        }
        const isCandidateAlreadySelected = responseSelectedCandidates.some(
            (candidate: any) =>
                candidate.id === selectedCandidate.id && candidate.id !== ''
        );
        if (isCandidateAlreadySelected) {
            setError('candidateDuplicateError');
            return;
        }
        dispatch(fetchSelectCandidate(selectedCandidate));
    };

    return (
        <div>
            {error && <Snackbar type={error} setShowSnackbar={setError} />}
            <Box className={styles.megaBox}>
                <Box className={styles.rowContainer}>
                    <h4> Candidatos </h4>
                    {loading && <Box className={styles.loadingContainer}></Box>}

                    {!loading && row?.length === 0 && (
                        <div className={styles.noResults}>
                            Nenhum resultado encontrado
                        </div>
                    )}

                    {row && row?.length > 0 && (
                        <>
                            <div>
                                {row?.map((row: any, index: number) => (
                                    <React.Fragment key={row.id}>
                                        {row.id !== null && (
                                            <div
                                                onClick={() =>
                                                    handleCandidateClick(row.id)
                                                }
                                                className={
                                                    selectedCandidate &&
                                                    selectedCandidate.id ===
                                                        row.id
                                                        ? styles.selected
                                                        : ''
                                                }
                                            >
                                                <div
                                                    className={
                                                        styles.candidateInfo
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            styles.circularImage
                                                        }
                                                    >
                                                        <img
                                                            src={image}
                                                            alt="Foto do Candidato"
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                            }}
                                                        />
                                                    </div>
                                                    <div
                                                        className={styles.info}
                                                    >
                                                        <div>{`${row.candidate}`}</div>
                                                        <div>{`${row.public_defense} - ${row.registration}`}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </>
                    )}
                </Box>
                <Box className={styles.detailsContainer}>
                    <div className={styles.detailscontainer}>
                        <h4> Detalhes do Candidato Selecionado: </h4>
                    </div>
                    <div className={styles.detailsContent}>
                        <img
                            src={image}
                            alt="Foto do Candidato"
                            className={styles.candidateImage}
                        />
                        <div className={styles.candidateSelect}>
                            {selectedCandidate ? (
                                <ul>
                                    <li>{`Candidato: ${selectedCandidate.candidate}`}</li>
                                    <li>{`Matrícula: ${selectedCandidate.registration}`}</li>
                                    <li>{`Nascimento: ${selectedCandidate.birth_date}`}</li>
                                    <li>{`Posse: ${selectedCandidate.start_date}`}</li>
                                    <li>{`Lotação: ${selectedCandidate.public_defense}`}</li>
                                    <li>{`Antiguidade: ${selectedCandidate.seniority}`}</li>
                                    <li>{`Categoria: ${selectedCandidate.category}`}</li>
                                </ul>
                            ) : (
                                <div className={styles.noCandidate}>
                                    Nenhum candidato selecionado
                                </div>
                            )}

                            {selectedCandidate && (
                                <Button
                                    className={styles.button}
                                    onClick={handleSelectedCandidate}
                                >
                                    <RiAddCircleLine />
                                </Button>
                            )}
                        </div>
                    </div>
                </Box>
            </Box>
        </div>
    );
};

export default Table;
