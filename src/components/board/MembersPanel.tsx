"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { inviteMember, removeMember } from "@/app/boards/[id]/members-actions";
import type { BoardMember } from "@/lib/supabase/types";
import { Alert, Button } from "@/components/ui";

// ── Helpers ───────────────────────────────────────────────────────

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function Avatar({ profile }: { profile: BoardMember["profile"] }) {
  const display = profile.full_name ?? profile.email;
  return (
    <span
      title={display}
      aria-label={display}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700 ring-2 ring-white dark:bg-indigo-900 dark:text-indigo-300 dark:ring-zinc-900"
    >
      {getInitials(display)}
    </span>
  );
}

// ── Invite form submit button ─────────────────────────────────────

function InviteButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="sm" loading={pending} disabled={pending}>
      {pending ? "Inviting…" : "Invite"}
    </Button>
  );
}

// ── Main component ────────────────────────────────────────────────

export function MembersPanel({
  boardId,
  members,
  ownerId,
  currentUserId,
}: {
  boardId: string;
  members: BoardMember[];
  ownerId: string;
  currentUserId: string;
}) {
  const [state, action] = useActionState(inviteMember, null);
  const isOwner = currentUserId === ownerId;

  return (
    <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
        Members
        <span className="ml-2 rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
          {members.length}
        </span>
      </h2>

      {/* Member list */}
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
                  <p className="truncate text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    {display}
                  </p>
                  <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                    {m.profile.email}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {isThisOwner && (
                  <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
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
                      className="rounded p-1 text-xs text-zinc-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50"
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

      {/* Invite form — only visible to board owner */}
      {isOwner && (
        <form action={action} className="space-y-2">
          <input type="hidden" name="boardId" value={boardId} />

          {state?.type === "success" && (
            <Alert variant="success">{state.message}</Alert>
          )}
          {state?.type === "error" && (
            <Alert variant="error">{state.message}</Alert>
          )}

          <div className="flex gap-2">
            <input
              name="email"
              type="email"
              required
              placeholder="Invite by email…"
              className="min-w-0 flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
            />
            <InviteButton />
          </div>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            The person must have an account before they can be invited.
          </p>
        </form>
      )}
    </div>
  );
}
