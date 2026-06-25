"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { inviteMember, removeMember } from "@/app/boards/[id]/members-actions";
import type { BoardMember } from "@/lib/supabase/types";
import { Alert, Button, Input } from "@/components/ui";

function getInitials(name: string): string {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

function Avatar({ profile }: { profile: BoardMember["profile"] }) {
  const display = profile.full_name ?? profile.email;
  return (
    <span
      title={display}
      aria-label={display}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold"
      style={{ background: "var(--primary)", color: "var(--primary-foreground)", borderColor: "var(--primary-border)" }}
    >
      {getInitials(display)}
    </span>
  );
}

function InviteButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="sm" loading={pending} disabled={pending}>
      {pending ? "Inviting…" : "Invite"}
    </Button>
  );
}

export function MembersPanel({ boardId, members, ownerId, currentUserId }: {
  boardId: string; members: BoardMember[]; ownerId: string; currentUserId: string;
}) {
  const [state, action] = useActionState(inviteMember, null);
  const isOwner = currentUserId === ownerId;

  return (
    <div
      className="mt-4 rounded-[var(--radius)] border-2 p-4"
      style={{ background: "var(--card)", borderColor: "var(--border)", boxShadow: "0 2px 0 0 var(--border)" }}
    >
      <h2 className="mb-3 text-sm font-bold" style={{ color: "var(--foreground)" }}>
        Members
        <span
          className="ml-2 rounded-full border-2 px-2 py-0.5 text-xs font-bold"
          style={{ background: "var(--muted)", color: "var(--muted-foreground)", borderColor: "var(--border)" }}
        >
          {members.length}
        </span>
      </h2>

      <ul className="mb-4 space-y-2">
        {members.map((m) => {
          const display = m.profile.full_name ?? m.profile.email;
          const isThisOwner = m.user_id === ownerId;
          const canRemove = isOwner && !isThisOwner;
          return (
            <li key={m.user_id} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <Avatar profile={m.profile} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold" style={{ color: "var(--foreground)" }}>{display}</p>
                  <p className="truncate text-xs" style={{ color: "var(--muted-foreground)" }}>{m.profile.email}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {isThisOwner && (
                  <span
                    className="rounded-full border-2 px-2 py-0.5 text-xs font-bold"
                    style={{ background: "var(--primary)", color: "var(--primary-foreground)", borderColor: "var(--primary-border)" }}
                  >
                    Owner
                  </span>
                )}
                {canRemove && (
                  <form action={removeMember}>
                    <input type="hidden" name="boardId" value={boardId} />
                    <input type="hidden" name="memberId" value={m.user_id} />
                    <button
                      type="submit"
                      aria-label={`Remove ${display}`}
                      className="rounded px-2 py-1 text-xs font-bold transition hover:opacity-70"
                      style={{ color: "var(--destructive)" }}
                    >
                      Remove
                    </button>
                  </form>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {isOwner && (
        <form action={action} className="space-y-2">
          <input type="hidden" name="boardId" value={boardId} />
          {state?.type === "success" && <Alert variant="success">{state.message}</Alert>}
          {state?.type === "error"   && <Alert variant="error">{state.message}</Alert>}
          <div className="flex gap-2">
            <Input
              name="email"
              type="email"
              required
              placeholder="Invite by email…"
              aria-label="Invite by email"
              className="min-w-0 flex-1"
            />
            <InviteButton />
          </div>
          <p className="text-xs font-bold" style={{ color: "var(--muted-foreground)" }}>
            The person must have an account before they can be invited.
          </p>
        </form>
      )}
    </div>
  );
}
