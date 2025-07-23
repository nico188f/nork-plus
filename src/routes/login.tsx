import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import LoginDialog from "@/components/auth/LoginDialog";

export const Route = createFileRoute("/login")({
   component: RouteComponent,
});

function RouteComponent() {
   const [loginDialogOpen, setLoginDialogOpen] = useState(false);

   return (
      <>
         <Button onClick={() => setLoginDialogOpen(true)}>Login</Button>

         <LoginDialog open={loginDialogOpen} setOpen={setLoginDialogOpen} />
      </>
   );
}
