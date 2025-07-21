import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import login from "@/api/login";

export const Route = createFileRoute("/demo/tanstack-query")({
   component: TanStackQueryDemo,
});

function TanStackQueryDemo() {
   const { data, isSuccess, isError, error } = useQuery({
      queryKey: ["people"],
      queryFn: () => login({ email: "xxx", password: "xxx" }),
   });

   return (
      <div className="p-4">
         <h1 className="mb-4 text-2xl">People list</h1>
         {isSuccess ? (
            <div>
               <p>id: {data.memberId}</p>
               <p>name: {data.name}</p>
               <p>token: {data.token}</p>
            </div>
         ) : isError ? (
            error.message
         ) : (
            "loading"
         )}
      </div>
   );
}
