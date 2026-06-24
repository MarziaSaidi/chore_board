import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Task } from "@/lib/supabase/types";

export function useRealtimeTasks(boardId: string, initialTasks: Task[]): Task[] {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // Sync if the server re-renders with fresh initialTasks (after revalidatePath)
  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel(`tasks:${boardId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tasks",
          filter: `board_id=eq.${boardId}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const incoming = payload.new as Task;
            setTasks((prev) =>
              prev.some((t) => t.id === incoming.id)
                ? prev
                : [...prev, incoming].sort((a, b) => a.position - b.position),
            );
          } else if (payload.eventType === "UPDATE") {
            const updated = payload.new as Task;
            setTasks((prev) =>
              prev.map((t) => (t.id === updated.id ? updated : t)),
            );
          } else if (payload.eventType === "DELETE") {
            const removed = payload.old as Pick<Task, "id">;
            setTasks((prev) => prev.filter((t) => t.id !== removed.id));
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [boardId]);

  return tasks;
}
