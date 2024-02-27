"use client";

import { useRouter } from "next/navigation";
import { getAdmins } from "@/actions/login-actions";
import { AdminTable } from "@/components/adminpanel/admintable";
import { Button } from "@/components/ui/button";
import { columns, UserInfo } from "@/components/adminpanel/columns";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const adminpanel = () => {
  const { data: admins } = useQuery({
    queryKey: [],
    queryFn: () => getAdmins(),
  });

  if (!admins) {
    return null;
  }

  const router = useRouter();

    const handleGoAdmin = () => {
        router.push("/admin");
    };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-20">
        <div>
            <AdminTable columns={columns} data={admins} />
        </div>

        <div>
            <div className="mt-8 justify-center">
              <Button className="bg-[--clr_secondary] hover:bg-[--clr_primary] text-white px-12" onClick={handleGoAdmin}>
                  <Link href="/admin">Set new admin</Link>
              </Button>
            </div>
        </div>
    </div>

  );
};

export default adminpanel;

// export default function goAdmin() {
//     return (
//       <div className="h-screen flex items-center">
//         <div className="mt-8">
//           <Button
//             className="bg-[--clr_secondary] hover:bg-[--clr_primary] text-white px-12"
//             onClick={handleGoAdmin}>
//             <Link href="/admin">Get started</Link>
//           </Button>
//         </div>
//       </div>
//     );
//   }