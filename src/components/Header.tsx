import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "./ui/button";
import LoginDialog from "./auth/LoginDialog";
import { useAuthContext } from "@/hooks/user";

export default function Header() {
   const auth = useAuthContext();

   const [loginDialogOpen, setLoginDialogOpen] = useState(false);

   return (
      <header className="flex justify-between gap-2 bg-white p-2 text-black">
         <nav className="flex flex-row">
            <div className="px-2 font-bold">
               <Link to="/">Home</Link>
            </div>

            <div className="px-2 font-bold">
               <Link to="/demo/form/simple">Simple Form</Link>
            </div>

            <div className="px-2 font-bold">
               <Link to="/demo/form/address">Address Form</Link>
            </div>
         </nav>
         {auth.isLoggedIn ? (
            auth.profile.name
         ) : (
            <>
               <Button onClick={() => setLoginDialogOpen(true)}>Login</Button>

               <LoginDialog
                  open={loginDialogOpen}
                  setOpen={setLoginDialogOpen}
               />
            </>
         )}
      </header>
   );
}
