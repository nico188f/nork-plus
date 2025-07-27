import { useForm } from "@tanstack/react-form";
import z from "zod";
import { useState } from "react";
import { AlertCircleIcon } from "lucide-react";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import type { AnyFieldApi } from "@tanstack/react-form";
import type { Profile } from "@/typesAndSchemas/Profile";
import loginHandler from "@/utils/auth/loginHandler";

type CancelableLoginFormProps = {
   canCancel: true;
   onCancel: () => void;
   onSubmit: () => void;
};

type LoginFormProps =
   | {
        canCancel: boolean;
        onSubmit: () => void;
     }
   | CancelableLoginFormProps;

function FieldInfo({ field }: { field: AnyFieldApi }) {
   const fieldIsValid = field.state.meta.isTouched && !field.state.meta.isValid;

   const newText = field.state.meta.errors.join(", ");

   const [displayedText, setDisplayedText] = useState(newText);

   if (newText !== displayedText) {
      setDisplayedText(newText);
   }

   return (
      <em
         className={`-mt-2 h-[16px] ${fieldIsValid ? "text-destructive" : "text-transparent"} text-xs transition-colors duration-300 ease-in-out`}
      >
         {displayedText}
      </em>
   );
}

function validateLoginIdentifier(loginIdentifier: string): string | undefined {
   if (!loginIdentifier) return "Field cannot be empty.";

   // removes white-space
   const sanitizedLoginIdentifier = loginIdentifier.replace(/\s/g, "");

   // test if number as string
   if (/^\d+$/.test(sanitizedLoginIdentifier))
      return sanitizedLoginIdentifier.length === 8
         ? undefined
         : "The phone number should be 8 digits long.";

   const emailValidationResult = z.email().safeParse(sanitizedLoginIdentifier);
   return emailValidationResult.success ? undefined : "Invalid email.";
}

export default function LoginForm(loginFormProps: LoginFormProps) {
   const form = useForm({
      defaultValues: {
         loginIdentifier: "",
         password: "",
      },
      validators: {
         onSubmitAsync: async ({ value }) => {
            const { loginIdentifier, password } = value;

            const loginIdentifierIsPhoneNumber = /^\d+$/.test(
               value.loginIdentifier,
            );

            let profile: Profile | undefined;

            try {
               profile = await loginHandler({
                  email: loginIdentifierIsPhoneNumber
                     ? undefined
                     : loginIdentifier,
                  phoneNo: loginIdentifierIsPhoneNumber
                     ? parseInt(loginIdentifier)
                     : undefined,
                  password,
               });
            } catch (e) {
               return "Email/Phone number or password is incorrect.";
            }
            toast.success("Login Successful", {
               description: `Welcome to NORK+ ${profile.name}!`,
            });
            loginFormProps.onSubmit();
         },
      },
   });

   const handleCancel = (cancel: () => void) => {
      form.clearFieldValues;
      form.setErrorMap({ onBlur: undefined, onChange: undefined });
      cancel();
   };

   return (
      <form
         onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
         }}
      >
         <form.Subscribe
            selector={(state): string | undefined => state.errorMap.onSubmit}
            children={(onSubmitError) =>
               onSubmitError ? (
                  <Alert variant="destructive" className="mb-5">
                     <AlertCircleIcon />
                     <AlertTitle>Invalid Login</AlertTitle>
                     <AlertDescription>{onSubmitError}</AlertDescription>
                  </Alert>
               ) : null
            }
         />
         <form.Field
            name="loginIdentifier"
            validators={{
               onBlur: ({ value }) => validateLoginIdentifier(value),
               onChange: ({ value, fieldApi }) => {
                  // Only validate on change if there's already an error
                  if (fieldApi.state.meta.errors.length > 0) {
                     fieldApi.setErrorMap({ onBlur: undefined });
                     validateLoginIdentifier(value);
                  }
               },
            }}
            children={(field) => (
               <div className="items-center gap-3 grid mb-5 w-full">
                  <Label htmlFor={field.name}>Email or Phone number</Label>
                  <Input
                     placeholder="Email or Phone number"
                     id={field.name}
                     name={field.name}
                     value={field.state.value}
                     onBlur={field.handleBlur}
                     onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
               </div>
            )}
         />
         <form.Field
            name="password"
            validators={{
               onBlur: ({ value }) => (value ? "" : "Field cannot be empty."),
               onChange: ({ value, fieldApi }) => {
                  // Only validate on change if there's already an error
                  if (fieldApi.state.meta.errors.length > 0) {
                     fieldApi.setErrorMap({ onBlur: undefined });
                     return value ? "" : "Field cannot be empty.";
                  }
               },
            }}
            children={(field) => (
               <div className="items-center gap-3 grid mb-5 w-full">
                  <Label htmlFor={field.name}>Email or Phone number</Label>
                  <Input
                     type="password"
                     placeholder="Password"
                     id={field.name}
                     name={field.name}
                     value={field.state.value}
                     onBlur={field.handleBlur}
                     onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
               </div>
            )}
         />

         <form.Subscribe
            selector={(state): [boolean, boolean, string, string] => [
               state.canSubmit,
               state.isSubmitting,
               state.values.loginIdentifier,
               state.values.password,
            ]}
            children={([
               canSubmit,
               isSubmitting,
               loginIdentifier,
               password,
            ]) => (
               <div className="flex justify-end">
                  {loginFormProps.canCancel && (
                     <Button
                        type="button"
                        variant={"outline"}
                        disabled={isSubmitting}
                        onClick={() =>
                           handleCancel(
                              (loginFormProps as CancelableLoginFormProps)
                                 .onCancel,
                           )
                        }
                     >
                        Cancel
                     </Button>
                  )}
                  <Button
                     type="submit"
                     className="ml-5"
                     disabled={
                        !canSubmit ||
                        isSubmitting ||
                        !!validateLoginIdentifier(loginIdentifier) ||
                        !password
                     }
                  >
                     {isSubmitting ? "Logging in..." : "Log in"}
                  </Button>
               </div>
            )}
         />
      </form>
   );
}
