"use client";

import { getAdmins } from "@/actions/login-actions";
import { AdminTable } from "@/components/adminpanel/admintable";
import { columns, UserInfo } from "@/components/adminpanel/columns";

import { useQuery } from "@tanstack/react-query";
  


const adminpanel = () => {

    const {
        data: admins,
      } = useQuery({
        queryKey: [],
        queryFn: () => getAdmins(),
      });

      if (!admins) {
        return null;
      }

    return (
      <div className="h-screen flex justify-center items-center">
        <AdminTable columns={columns} data={admins} />
      </div>

      // add button that takes you to the admin page

    );
  }

  export default adminpanel;

  
  