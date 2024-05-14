import Button from './Button';
import Loading from './Loading';
import { neverNull } from './Helper';
import styles from '../Styles/MiniTable.module.css';
import { useDispatch } from 'react-redux';
import { removeCandidate } from '../Services/Slices/selectedCandidate';
import { DeleteOutlined } from '@mui/icons-material';

interface Column {
    title: string;
    property: string;
    isDeletable?: boolean;
}

interface TableProps {
    title?: string;
    columns: Column[];
    data: any[];
    isEmpty?: boolean;
    loading?: boolean;
    error?: boolean;
}

const MiniTable: React.FC<TableProps> = ({
    title,
    columns,
    data,
    isEmpty,
    loading,
    error,
}) => {
    const dispatch = useDispatch<any>();

    const handleDeleteCandidate = (index: number) => {
        dispatch(removeCandidate(index));
    };

    const actionColumn: Column = {
        title: 'Remover',
        property: 'actions',
    };

    const updatedColumns = [...columns, actionColumn];

    return (
        <div className={styles.content}>
            <div className={styles.header}>
                {title && (
                    <div
                        className={styles.headerTable}
                        style={{
                            color: 'initial',
                        }}
                    >
                        {title}
                    </div>
                )}
            </div>
            <div className={styles.container}>
                <div className={styles.tableHeader}>
                    {updatedColumns.map((column, index) => (
                        <div key={index} className={styles.columnHeader}>
                            <div className={styles.columnTitle}>
                                {column.title}
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.tableBody}>
                    {loading ? (
                        <div style={{ marginBottom: '3rem' }}>
                            <Loading size="4rem" type="spin" />
                        </div>
                    ) : (
                        <>
                            {isEmpty || error ? (
                                <div
                                    className={styles.empty}
                                    style={{ color: 'initial' }}
                                >
                                    {isEmpty
                                        ? 'Selecione um candidato'
                                        : 'Não foi possível carregar as informações!'}
                                </div>
                            ) : (
                                <>
                                    {data?.map((row, rowIndex) => (
                                        <div
                                            key={rowIndex}
                                            className={styles.tableRow}
                                        >
                                            {columns.map(
                                                (column, columnIndex) => (
                                                    <div
                                                        key={columnIndex}
                                                        className={styles.row}
                                                    >
                                                        <div
                                                            className={
                                                                styles.tableCell
                                                            }
                                                            style={{
                                                                color: 'initial',
                                                            }}
                                                        >
                                                            {neverNull(
                                                                row[
                                                                column
                                                                    .property
                                                                ]
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                            <div className={styles.row}>
                                                <Button
                                                    onClick={() =>
                                                        handleDeleteCandidate(
                                                            rowIndex
                                                        )
                                                    }
                                                    className={
                                                        styles.deleteButton
                                                    }
                                                >
                                                    <DeleteOutlined />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MiniTable;
