"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Eye, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { deleteTour } from "@/lib/api/mutations/tour";
import Link from "next/link";
import { toast } from "sonner";
// import { DeleteTour } from "@/actions/tours/delete-tour";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<TourFields>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "location",
    cell: ({ row }) => {
      const tour = row.original;
      const location = `${tour.state}, ${tour.country}`;
      return location;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ getValue }) => {
      const date = new Date(getValue() as string).toDateString();
      return date;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const tour = row.original;

      const handleDelete = async () => {
        const { error } = await deleteTour(tour.id);
        if (!error) {
          toast.success("Tour Deleted Successfully!");
        } else toast.error("Something Went Wrong!");
      };

      return (
        <div>
          <Button size={"icon"} variant={"ghost"} asChild>
            <Link href={`/tours/${tour.id}`} target="_blank">
              <Eye />
            </Link>
          </Button>
          <Button size={"icon"} variant={"ghost"} asChild>
            <Link href={`tours/${tour.id}`}>
              <Edit2 size={16} className="text-green-700" />
            </Link>
          </Button>
          <Button size={"icon"} variant={"ghost"} onClick={handleDelete}>
            <Trash2 size={16} className="text-destructive" />
          </Button>
        </div>
      );
    },
  },
];
