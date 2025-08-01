import { Link } from "@tanstack/react-router";

export default function Header() {
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
      </header>
   );
}
