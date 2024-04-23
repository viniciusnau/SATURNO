import React, { useState } from 'react';
import { Box } from '@mui/material';
import styles from '../Styles/Table.module.css';
import Button from './Button';
import { fetchSelectCandidate } from '../Services/Slices/selectedCandidate';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from './Snackbar';
import { RiAddCircleLine } from 'react-icons/ri';
import Nubsaibot from "../Assets/Nubsaibot.jpg";
import avatar from "../Assets/avatar.svg";
import subzero from "../Assets/subzero.jpeg";
import scorpion from "../Assets/scorpion.jpeg";
import raiden from "../Assets/raiden.jpeg";
import liukang from "../Assets/liukang.jpeg";
import shang from "../Assets/shang.jpeg";
import cage from "../Assets/cage.jpeg";
import kitana from "../Assets/kitana.jpeg";


interface IData {
    row?: { id: number, image: any }[];
    image?: any;
    checkboxSelection?: boolean;
    disableSelectionOnClick?: boolean;
    loading?: boolean;
}

const Table: React.FC<IData> = ({ row, loading }) => {
    const dispatch = useDispatch<any>();
    const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
    const [selectedCandidateImage, setSelectedCandidateImage] = useState<string | null>(null); // State to track selected candidate's image
    const [error, setError] = useState<any>(null);
    const responseSelectedCandidates = useSelector(
        (state: any) => state.selectedCandidate.selectedCandidates
    );
    const maxCountCandidates = useSelector((state: any) => state.meId.maxCount);

    const formatDate = (dateString: string | number | Date) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleCandidateClick = (rowId: any) => {
        const candidate = row?.find((candidate: any) => candidate.id === rowId);
        if (candidate) {
            if (candidate.id === 39) {
                setSelectedCandidateImage(Nubsaibot);
            }
            else if (candidate.id === 28) {
                setSelectedCandidateImage(subzero);
            }
            else if (candidate.id === 27) {
                setSelectedCandidateImage(scorpion);
            }
            else if (candidate.id === 26) {
                setSelectedCandidateImage(raiden);
            }
            else if (candidate.id === 25) {
                setSelectedCandidateImage(liukang);
            }
            else if (candidate.id === 24) {
                setSelectedCandidateImage(shang);
            }
            else if (candidate.id === 23) {
                setSelectedCandidateImage(cage);
            }
            else if (candidate.id === 22) {
                setSelectedCandidateImage(kitana);
            }
            else {
                setSelectedCandidateImage(avatar);
            }
        }
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

    const loadImage = (row: any) => {
        if (row.id === 39) {
            return Nubsaibot;
        }
        else if (row.id === 28) {
            return subzero;
        }
        else if (row.id === 27) {
            return scorpion;
        }
        else if (row.id === 26) {
            return raiden;
        }
        else if (row.id === 25) {
            return liukang;
        }
        else if (row.id === 24) {
            return shang;
        }
        else if (row.id === 23) {
            return cage;
        }
        else if (row.id === 22) {
            return kitana;
        }
        else {
            return avatar;
        }
    }

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
                                                            src={loadImage(row)}
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
                            src={selectedCandidateImage || avatar}
                            alt="Foto do Candidato"
                            className={styles.candidateImage}
                        />
                        <div className={styles.candidateSelect}>
                            {selectedCandidate ? (
                                <ul>
                                    <li>{`Candidato: ${selectedCandidate.candidate}`}</li>
                                    <li>{`Matrícula: ${selectedCandidate.registration}`}</li>
                                    <li>{`Nascimento: ${formatDate(selectedCandidate.birth_date)}`}</li>
                                    <li>{`Posse: ${formatDate(selectedCandidate.start_date)}`}</li>
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
                                    Adicionar
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
