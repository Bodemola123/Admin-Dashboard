"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  MoreVertical,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { allUsersData } from "@/constant/users";
import { useState } from "react";
import Image from "next/image";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="border-btnlime"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="border-btnlime"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "user",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-btnlime"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Users
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center justify-start gap-2 text-btnlime text-center text-sm font-medium">
        <Image src="/avatar.png" alt="user" width={40} height={40} />
        <div className="text-left">
          <h3 className="text-[#2D2D2D] text-sm font-semibold product-sans capitalize">
            {row.getValue("user")}
          </h3>
          <span className="text-dovegray text-sm font-normal">
            exampleemail@gmail.com
            {/* {row.getValue("email")} */}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex items-center justify-start">
        <div
          className={`capitalize py-[2px] px-2 rounded-2xl ${
            row.getValue("status") === "active" && "text-[#027A48] bg-[#ECFDF3]"
          } ${
            row.getValue("status") === "inactive" &&
            "text-[#344054] bg-[#F2F4F7]"
          }`}
        >
          {row.getValue("status")}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <div className="flex items-center justify-start">
        <div
          className={`capitalize py-[2px] px-2 rounded-2xl ${
            row.getValue("role") === "developer" &&
            "text-[#4255FF] bg-[#ECFDF3]"
          } ${
            row.getValue("role") === "organization" &&
            "text-[#430099] bg-[#F2F4F7]"
          } ${row.getValue("role") === "-" && "text-[#027A48] bg-[#ECFDF3]"}`}
        >
          {row.getValue("role")}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "plan",
    header: "Plan",
    cell: ({ row }) => (
      <div className="flex items-center justify-start">
        <div
          className={`capitalize py-[2px] px-2 rounded-2xl ${
            row.getValue("plan") === "premium" && "text-[#46BA3C] bg-[#ECFDF3]"
          } ${
            row.getValue("plan") === "premium+" &&
            "text-[#46BA3C] bg-[#84DE7C59]"
          } ${row.getValue("plan") === "-" && "text-[#027A48] bg-[#ECFDF3]"}`}
        >
          {row.getValue("plan")}
        </div>
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem>View info</DropdownMenuItem>
            <DropdownMenuItem
            // onClick={() => row.getIsSelected()}
            // onCheckedChange={(value) => row.toggleSelected(!!value)}
            >
              Select account
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function AllUsersTable() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const data = allUsersData;

  const table = useReactTable({
    //note: {data} is a constant variable name. it shouldn't be changed when getting external api. instead make api name also {data}
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <Card className="text-dovegray border-0 bg-secondary">
      <CardContent className="mt-4 p-0">
        <div className="w-full">
          <div className="flex items-center py-4">
            <div className="max-w-[349px] w-full">
              <Input
                placeholder="Search Users"
                value={table.getColumn("user")?.getFilterValue() ?? ""}
                onChange={(event) =>
                  table.getColumn("user")?.setFilterValue(event.target.value)
                }
                className="w-full bg-transparent outline-none rounded-[10px] bg-white border-[#D0D5DD]"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="text-dovegray ml-auto bg-white hover:bg-white border border-[#D0D5DD] rounded-[10px]">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 text-dovegray bg-white shadow-xl text-fontlight rounded-2xl border-none p-4"
              >
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="rounded-md border-none">
            <Table>
              <TableHeader className="[&_tr]:border-b-1">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="border-b-1 hover:bg-btnlime/20 data-[state=selected]:bg-btnlime/30"
                  >
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} className=" text-fontlight">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody className="[&_tr:last-child]:border-0 bg-white">
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="border-t-1 hover:bg-btnlime/20 data-[state=selected]:bg-btnlime/30"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-72 text-center"
                    >
                      <div className="flex flex-col items-center">
                        <Image
                          src="/profile.png"
                          alt="profile"
                          width={105}
                          height={105}
                        />
                        <h3 className="text-[#1F1F1F] text-xl font-medium mt-3">
                          Nothing to Show here
                        </h3>
                        <span className="text-[#808080] tracking-normal text-base font-medium product-sans">
                          Users: No results.
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                // variant="outline"
                className="text-fontlight bg-btnlime border-none"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                // variant="outline"
                className="text-fontlight bg-btnlime border-none"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default AllUsersTable;
