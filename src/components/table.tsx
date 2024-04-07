import { DataGrid, DataGridProps } from "@mui/x-data-grid";

const Table: React.FC<DataGridProps> = (props) => {
  return (
    <DataGrid
      {...props}
      hideFooter
      disableRowSelectionOnClick
      sx={{
        "& .MuiDataGrid-row:hover": {
          cursor: "pointer",
        },
      }}
      className="mt-8 dark:text-gray-300"
    />
  );
};

export default Table;
