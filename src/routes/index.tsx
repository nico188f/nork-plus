import { createFileRoute } from "@tanstack/react-router";
import LargeCalender from "@/components/largeCalender/LargeCalender";

export const Route = createFileRoute("/")({
   component: App,
});

function App() {
   return <LargeCalender />;
}
