import { createFileRoute } from "@tanstack/react-router";
import CalendarDemo from "../components/calendar-demo";

export const Route = createFileRoute("/calenderTest")({
   component: CalendarDemo,
});
