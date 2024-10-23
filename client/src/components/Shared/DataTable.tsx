/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface Column {
  header: string;
  accessorKey: string;
  cell?: (props: { row: any }) => React.ReactNode;
}

interface DataTableProps {
  data: any[] | null;
  columns: Column[];
  isLoading?: boolean;
}

const getNestedValue = (obj: any, path: string) => {
  return path.split(".").reduce((value, key) => value?.[key], obj);
};

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.accessorKey}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={column.accessorKey}>
                  <Skeleton className="bg-white h-4 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (!data) return null;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.accessorKey}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((column) => (
              <TableCell key={column.accessorKey}>
                {column.cell
                  ? column.cell({ row }) 
                  : getNestedValue(row, column.accessorKey)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
