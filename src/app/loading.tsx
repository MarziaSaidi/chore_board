import { Spinner } from "@/components/ui";

export default function RootLoading() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Spinner size="lg" label="Loading…" />
    </div>
  );
}
