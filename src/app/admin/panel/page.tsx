import { AdminTable, Admintable } from "@/components/adminpanel/admintable";
// import { Column } from "@tanstack/react-table";
import { columns, UserInfo } from "@/components/adminpanel/columns";

async function getData(): Promise<UserInfo[]> {
    // Fetch data from your API here.
    return [
      {
        id: "728ed52f",
        role: "owner",
        email: "flashmaster@flashy.com",
      },
      // ...
    ]
  }


export default async function adminpanel() {

    const data = await getData()

    return (
      <div className="h-screen flex justify-center items-center">
        <AdminTable columns={columns} data={data} />
      </div>

      // add button that takes you to the admin page

    );
  }

  

  
  