"use client"

import { XCircle } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui/button"


export type UserInfo = {
  id: string
  role: "owner" | "admin" | "user"
  email: string
}

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
    cell: ({row}) => {
        return (
            <Button variant="ghost" size="icon">
                <XCircle className="h-4 w-4" />
            </Button>
        )
    }
  },
]
