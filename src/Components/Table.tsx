import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface DataTableProps {
  rows: { id: number; lastName: string; firstName: string; age: number; }[];
  columns: GridColDef[];
  pageSize: number;
  checkboxSelection?: boolean;
  disableSelectionOnClick?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({ rows, columns, pageSize, checkboxSelection, disableSelectionOnClick }) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        // pageSize={pageSize}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default DataTable;
