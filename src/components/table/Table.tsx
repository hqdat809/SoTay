import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { IUserDetail } from "../../interfaces/user-interfaces";

import { ICategory } from "../../interfaces/category-interface";
import { TRootState } from "../../stores/reducers";
import CategoryColumn from "./category-columns/CategoryColumn";
import ActionColumn from "./user-columns/ActionColumn";

interface IOwnerEquipmentProps {
  userId: number;
}

const OwnerColumn = ({ userId }: IOwnerEquipmentProps) => {
  const userOwner = useSelector((state: TRootState) =>
    state.user.users.find((u: IUserDetail) => u.id === userId)
  );
  return (
    <div>
      {userOwner?.firstName} {userOwner?.lastName}
    </div>
  );
};

export const userColumn: GridColDef[] = [
  {
    field: "id",
    headerName: "UID",
    flex: 3,
  },
  { field: "email", headerName: "Email", flex: 2 },
  {
    field: "accessExpiration",
    headerName: "Ngày hết hạn",
    flex: 2,
    valueGetter: (params: GridValueGetterParams) => {
      const timestamp = params.row.accessExpiration;
      const date = new Date(timestamp);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const year = date.getFullYear();
      return timestamp ? `${day}/${month}/${year}` : "";
    },
  },
  {
    field: "a",
    headerName: "",
    width: 50,
    renderCell: (params: GridRenderCellParams<IUserDetail>) => (
      <ActionColumn userDetail={params.row} />
    ),
  },
];

export const historyColumn: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    minWidth: 250,
    valueGetter: (params: GridValueGetterParams) => {
      const str = `${params.row.firstName} ${params.row.lastName}`;

      return str;
    },
  },
  { field: "address", headerName: "Address", minWidth: 220 },
  { field: "email", headerName: "Email", minWidth: 300 },
];

export const categoryColumn: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
  },
  {
    field: "text",
    headerName: "Question",
    minWidth: 300,
  },
  {
    field: "answer",
    headerName: "Answer",
    flex: 1,
  },
  {
    field: "a",
    headerName: "",
    maxWidth: 50,
    renderCell: (params: GridRenderCellParams<ICategory>) => (
      <CategoryColumn categoryDetail={params.row} />
    ),
  },
];

interface ITableProps {
  rows?: any[];
  columns: GridColDef[];
  isLoading?: boolean;
  notCheckBoxSelection?: boolean;
  setSelection?: (selection: any[]) => void;
}

export default function Table({
  setSelection,
  rows,
  columns,
  isLoading,
  notCheckBoxSelection,
}: ITableProps) {
  return (
    <div style={{ height: "100%", width: "100%", maxWidth: "100%" }}>
      <DataGrid
        rows={!isLoading ? rows || [] : []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 12 },
          },
        }}
        onRowSelectionModelChange={(ids) => {
          const selectedRowsData = ids.map((id) =>
            rows?.find((row) => row.id === id)
          );
          setSelection?.(selectedRowsData);
        }}
        pageSizeOptions={[5, 10, 12]}
        checkboxSelection={!notCheckBoxSelection}
        loading={isLoading}
      />
    </div>
  );
}
