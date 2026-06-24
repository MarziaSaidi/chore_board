"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createBoard } from "@/app/dashboard/actions";
import { Alert, Button, Input } from "@/components/ui";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" loading={pending} className="shrink-0">
      {pending ? "Creating…" : "Create board"}
    </Button>
  );
}

export function CreateBoardForm() {
  const [state, action] = useActionState(createBoard, null);

  return (
    <div className="space-y-3">
      <form action={action} className="flex gap-3">
        <Input
          name="title"
          type="text"
          required
          maxLength={120}
          placeholder="New board name…"
          aria-label="Board name"
        />
        <SubmitButton />
      </form>
      {state?.error ? (
        <Alert variant="error">{state.error}</Alert>
      ) : null}
    </div>
  );
}
