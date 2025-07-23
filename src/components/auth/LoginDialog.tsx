import LoginForm from "./LoginForm";
import type { Dispatch, SetStateAction } from "react";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";

type LoginProps = {
   open: boolean;
   setOpen: Dispatch<SetStateAction<boolean>>;
   loginReason?: string;
};

export default function LoginDialog(LoginProps: LoginProps) {
   const { open, setOpen, loginReason: loginRequestReason } = LoginProps;

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogContent
            className="w-1/3 min-w-xs max-w-md"
            aria-describedby={undefined}
         >
            <DialogHeader>
               <DialogTitle className="text-center">Login</DialogTitle>
               {loginRequestReason ? (
                  <DialogDescription style={{ color: "var(--destructive)" }}>
                     {loginRequestReason}
                  </DialogDescription>
               ) : (
                  ""
               )}
            </DialogHeader>
            <LoginForm
               canCancel={true}
               onCancel={() => setOpen(false)}
               onSubmit={() => setOpen(false)}
            />
         </DialogContent>
      </Dialog>
   );
}
