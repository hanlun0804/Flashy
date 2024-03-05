"use client";

import { XCircle } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { setUserType } from "@/actions/admin-actions";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";

export type UserInfo = {
  id: string;
  role: "owner" | "admin" | "user";
  email: string;
};

export const columns: ColumnDef<UserInfo>[] = [
  {
    accessorKey: "role",
    header: "User type",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "delete",
    cell: ({ row }) => {
      const queryClient = useQueryClient();
      const { toast } = useToast();

      const handleDeleteAdmin = async () => {
        await setUserType(row.getValue("email"), "user");
        queryClient.invalidateQueries({
          queryKey: ["admins"],
        });
        toast({
          title: "Admin has been removed",
          description: "",
        });
      };

      return (
        <Button variant="ghost" size="icon" onClick={handleDeleteAdmin}>
          <XCircle className="h-4 w-4" />
        </Button>
      );
    },
  },
];
