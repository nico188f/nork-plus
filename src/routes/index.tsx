import { createFileRoute } from "@tanstack/react-router";
import LargeCalendar from "@/components/largeCalendar/LargeCalendar";

export const Route = createFileRoute("/")({
   component: App,
});

function App() {
   return <LargeCalendar />;
}
