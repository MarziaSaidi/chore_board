"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useRealtimeTasks } from "@/hooks/useRealtimeTasks";
import { moveTask } from "@/app/boards/[id]/actions";
import { AddTaskForm } from "./AddTaskForm";
import { TaskCard, TaskCardDragOverlay } from "./TaskCard";
import type { Task, TaskStatus } from "@/lib/supabase/types";

const COLUMNS: { status: TaskStatus; label: string }[] = [
  { status: "todo",        label: "To Do"       },
  { status: "in_progress", label: "In Progress" },
  { status: "done",        label: "Done"        },
];

function computePosition(tasks: Task[], overIndex: number, activeId: string): number {
  const others = tasks.filter((t) => t.id !== activeId);
  const prev = others[overIndex - 1]?.position ?? 0;
  const next = others[overIndex]?.position ?? prev + 2;
  return (prev + next) / 2;
}

export function KanbanBoard({
  boardId,
  initialTasks,
}: {
  boardId: string;
  initialTasks: Task[];
}) {
  const serverTasks = useRealtimeTasks(boardId, initialTasks);
  const [tasks, setTasks] = useState<Task[]>(serverTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // Keep local tasks in sync when server pushes updates (unless mid-drag)
  if (!activeTask && tasks !== serverTasks) {
    setTasks(serverTasks);
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  function onDragStart({ active }: DragStartEvent) {
    const task = tasks.find((t) => t.id === active.id);
    if (task) setActiveTask(task);
  }

  function onDragOver({ active, over }: DragOverEvent) {
    if (!over || active.id === over.id) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // overId is either a task id or a column status string
    const overTask = tasks.find((t) => t.id === overId);
    const targetStatus: TaskStatus = overTask
      ? overTask.status
      : (overId as TaskStatus);

    setTasks((prev) => {
      const activeIdx = prev.findIndex((t) => t.id === activeId);
      if (activeIdx === -1) return prev;

      const updated = [...prev];
      updated[activeIdx] = { ...updated[activeIdx], status: targetStatus };
      return updated;
    });
  }

  function onDragEnd({ active, over }: DragEndEvent) {
    setActiveTask(null);
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const overTask = tasks.find((t) => t.id === overId);
    const targetStatus: TaskStatus = overTask
      ? overTask.status
      : (overId as TaskStatus);

    const columnTasks = tasks.filter((t) => t.status === targetStatus);
    const overIndex = overTask
      ? columnTasks.findIndex((t) => t.id === overId)
      : columnTasks.length;

    const newPosition = computePosition(columnTasks, overIndex, activeId);

    // Optimistic: update position in local state
    setTasks((prev) =>
      prev.map((t) =>
        t.id === activeId ? { ...t, status: targetStatus, position: newPosition } : t
      )
    );

    // Persist to DB (fire-and-forget; realtime reconciles other users)
    moveTask(activeId, boardId, targetStatus, newPosition);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {COLUMNS.map((column) => {
          const columnTasks = tasks
            .filter((t) => t.status === column.status)
            .sort((a, b) => a.position - b.position);

          return (
            <section
              key={column.status}
              className="flex flex-col rounded-2xl border border-zinc-200 bg-zinc-50/70 p-3 dark:border-zinc-800 dark:bg-zinc-900/50"
            >
              <div className="mb-3 flex items-center justify-between px-1">
                <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  {column.label}
                </h2>
                <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                  {columnTasks.length}
                </span>
              </div>

              {/* Drop zone for the whole column when empty */}
              <SortableContext
                id={column.status}
                items={columnTasks.map((t) => t.id)}
                strategy={verticalListSortingStrategy}
              >
                <div
                  className="flex-1 space-y-2 min-h-[2rem]"
                  data-droppable-id={column.status}
                >
                  {columnTasks.map((task) => (
                    <TaskCard key={task.id} task={task} boardId={boardId} />
                  ))}
                </div>
              </SortableContext>

              <div className="mt-3">
                <AddTaskForm boardId={boardId} status={column.status} />
              </div>
            </section>
          );
        })}
      </div>

      {/* Ghost card that follows the cursor while dragging */}
      <DragOverlay>
        {activeTask ? <TaskCardDragOverlay task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
