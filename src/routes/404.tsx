import { createFileRoute } from "@tanstack/react-router";
import { NotFound } from "@/components/site/NotFound";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/404")({
  head: () =>
    pageHead({
      title: "Page not found",
      description: "Oops! This scene doesn't exist.",
      path: "/404",
    }),
  component: NotFound,
});
