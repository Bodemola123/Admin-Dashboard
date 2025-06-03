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
// import { allUsersData } from "@/constant/users";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const getRandomStatus = () => (Math.random() < 0.5 ? "active" : "inactive");

function getTruncatedPageNumbers(current, total) {
  const delta = 1;
  const range = [];
  const left = current - delta;
  const right = current + delta;

  for (let i = 0; i < total; i++) {
    if (i === 0 || i === total - 1 || (i >= left && i <= right)) {
      range.push(i);
    } else if (
      (i === left - 1 && left > 1) ||
      (i === right + 1 && right < total - 2)
    ) {
      range.push("...");
    }
  }

  return range.filter((v, i, a) => a[i - 1] !== v); // Remove duplicate ellipses
}


const slugify = (str) =>
  str?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

export const columns = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="border-btnlime"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="border-btnlime"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
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
        <Image src="/Avatar.svg" alt="user" width={40} height={40} />
        <div className="text-left">
          <h3 className="text-[#2D2D2D] text-sm font-semibold product-sans capitalize">
            {row.getValue("user")}
          </h3>
          <span className="text-dovegray text-sm font-normal">
            {row.original.email}
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
    accessorKey: "skill",
    header: "Skill Level",
    cell: ({ row }) => (
      <div className="flex items-center justify-start">
        <div className="capitalize py-[2px] px-2 rounded-2xl text-[#430099] bg-[#F2F4F7]">
          {row.getValue("skill")}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "plan",
    header: "Plan",
    cell: ({ row }) => (
      <div className="flex items-center justify-start">
        <div className="capitalize py-[2px] px-2 rounded-2xl text-[#027A48] bg-[#ECFDF3]">
          {row.getValue("plan")}
        </div>
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
    const user = row.original; // Full row object with all fields
    const slug = `${user.id}-${slugify(user.email)}`; // or organization_email

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

            <DropdownMenuSeparator />
          <Link href={`/userDetails/${slug}`}>
            <DropdownMenuItem>View info</DropdownMenuItem>
          </Link>
            {/* <DropdownMenuItem
            >
              Select account
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function AllUsersTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  // const data = allUsersData;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
  
      try {
        // Check if data is already in sessionStorage
        const cachedData = sessionStorage.getItem("userData");
        if (cachedData) {
          setData(JSON.parse(cachedData));
          setLoading(false);
          return;
        }
  
        // Otherwise, fetch from API
        const res = await axios.get(
          "https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api"
        );
  
        const transformed = res.data.map((user) => ({
          id: user.user_id,
          user: user.fullname ?? "-",
          email: user.email ?? "-",
          status: getRandomStatus(),
          skill: user.skill_level || "-",
          plan: "Premium+", // Default plan
        }));
        console.log("Fetched data:", res.data);
  
  
        setData(transformed);
        sessionStorage.setItem("userData", JSON.stringify(transformed));
      } catch (err) {
        console.error("Failed to fetch users", err);
        setError("Failed to load organizations. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

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
        {loading ? (
          <div className="h-screen flex flex-col gap-2 items-center justify-center text-lg font-medium">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-gray-700"></div>
            Loading users...
          </div>
        ) : error ? (
          <div className="h-screen flex flex-col items-center justify-center text-center text-red-500">
            <p>{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Retry
            </Button>
          </div>
        ) : (
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
<div className="flex items-center justify-between py-4 w-full">
  {/* Show Rows per page */}
<div className="flex items-center gap-2.5 text-sm text-muted-foreground">
  Show
  <div className="relative">
    <select
      className="appearance-none border border-[#F0F9EB] bg-white rounded-[25px] pl-3 pr-8 py-1.5 text-base text-[#333] cursor-pointer focus:outline-none"
      value={table.getState().pagination.pageSize}
      onChange={(e) => {
        table.setPageSize(Number(e.target.value));
      }}
    >
      {[10, 20, 30, 40, 50].map((size) => (
        <option key={size} value={size}>
          {size}
        </option>
      ))}
    </select>
    {/* Custom Arrow Icon */}
    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#A5A5A5]">
      <svg
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M10 12l-4-4h8l-4 4z" />
      </svg>
    </div>
  </div>
  Rows per page
</div>


  {/* Pagination Controls */}
  <div className="space-x-4 flex items-center justify-center">
    {/* Prev Button */}
    <div className="flex items-center gap-2.5">
      <Button
        className="rounded-[25px] bg-[#FFFFFF] border-[0.9px] border-[#F0F9EB] p-[6px] hover:bg-[#ffffff]"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <FaAngleLeft className="text-[8.5px] text-[#A5A5A5]" />
      </Button>
      <p className="text-fontlight">Prev</p>
    </div>

    {/* Page Numbers */}
<div className="flex flex-row px-4 py-2.5 gap-2.5 rounded-[25px] bg-[#ffffff] border-[0.9px] border-[#F0F9EB]">
  {table.getPageCount() > 0 &&
    getTruncatedPageNumbers(
      table.getState().pagination.pageIndex,
      table.getPageCount()
    ).map((page, idx) => {
      if (page === "...") {
        return (
          <span
            key={`ellipsis-${idx}`}
            className="text-[#A5A5A5] text-base font-semibold"
          >
            ...
          </span>
        );
      }

      const isActive = page === table.getState().pagination.pageIndex;

      return (
        <button
          key={page}
          onClick={() => table.setPageIndex(Number(page))}
          className={`px-1.5 py-1 flex items-center justify-center rounded-[20px] text-base font-normal ${
            isActive
              ? "bg-[#46BA3C] text-[#F5F5F5]"
              : "text-[#A5A5A5] hover:bg-[#f0f0f0]"
          }`}
        >
          {Number(page) + 1}
        </button>
      );
    })}
</div>


    {/* Next Button */}
    <div className="flex flex-row-reverse items-center gap-2.5">
      <Button
        className="text-[#a5a5a5] rounded-[25px] bg-[#FFFFFF] border-[0.9px] border-[#F0F9EB] p-[6px] hover:bg-[#ffffff]"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <FaAngleRight className="text-[8.5px]" />
      </Button>
      <p className="text-fontlight">Next</p>
    </div>
  </div>
</div>


          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default AllUsersTable;
