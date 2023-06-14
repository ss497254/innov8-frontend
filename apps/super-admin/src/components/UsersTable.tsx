import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Spinner } from "common";
import { ResponseType, UserType } from "common/src/types";
import React from "react";
import useSWR from "swr";

const columns: GridColDef[] = [
  {
    field: "avatarUrl",
    headerName: "Avatar",
    headerAlign: "center",
    disableColumnMenu: true,
    width: 80,
    renderCell: ({ row: { avatarUrl } }) => (
      <img src={avatarUrl} className="h-9 w-9 mx-auto" />
    ),
  },

  {
    field: "firstName",
    headerName: "First Name",
    minWidth: 160,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    minWidth: 160,
  },
];

interface UsersTableProps extends React.PropsWithChildren {
  url: string;
  heading: string;
}

export const UsersTable: React.FC<UsersTableProps> = ({ url, heading }) => {
  const { data: res, isLoading } = useSWR<ResponseType<UserType[]>>(url);
  return (
    <div className="space-y-6 py-4 md:bg-white md:p-6 lg:p-8 md:shadow-md rounded-md">
      <h3>{heading}</h3>
      {isLoading ? (
        <Spinner className="mx-auto" size={32} />
      ) : (
        <DataGrid
          rows={res?.data || []}
          className="bg-white border !border-slate-300 !rounded"
          classes={{
            columnHeader: "bg-gray-100",
            footerContainer: "bg-gray-100",
          }}
          showColumnVerticalBorder
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      )}
    </div>
  );
};
