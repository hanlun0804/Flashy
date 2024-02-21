"use client"

import { XCircle } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui/button"
import dropdownmenu

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
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
//   {
//     id: "tweak role",
//     cell: ({row}) => {
//         return (
//             <Button variant="outline" size="icon">
//                 <XCircle className="h-4 w-4" />
//             </Button>
//         )
//     }
//   },
]
