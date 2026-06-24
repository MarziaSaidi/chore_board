"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  pointerWithin,
  rectIntersection,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
  type CollisionDetection,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
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

const VALID_STATUSES = new Set(["todo", "in_progress", "done"]);

// Prefer pointerWithin (cursor-based) but fall back to rectIntersection for
// column drop zones when the pointer is between cards.
const collisionDetection: CollisionDetection = (args) => {
  const pointerCollisions = pointerWithin(args);
  if (pointerCollisions.length > 0) return pointerCollisions;
  return rectIntersection(args);
};

function computePosition(tasks: Task[], overIndex: number, activeId: string): number {
  const others = tasks.filter((t) => t.id !== activeId);
  const prev = others[overIndex - 1]?.position ?? 0;
  const next = others[overIndex]?.position ?? prev + 2;
  return (prev + next) / 2;
}

// ── Droppable column wrapper ───────────────────────────────────────

function DroppableColumn({
  status,
  label,
  tasks,
  boardId,
}: {
  status: TaskStatus;
  label: string;
  tasks: Task[];
  boardId: string;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <section
      className="flex flex-col rounded-2xl border border-zinc-200 bg-zinc-50/70 p-3 dark:border-zinc-800 dark:bg-zinc-900/50"
    >
      <div className="mb-3 flex items-center justify-between px-1">
        <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          {label}
        </h2>
        <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
          {tasks.length}
        </span>
      </div>

      <SortableContext
        id={status}
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          ref={setNodeRef}
          className={[
            "flex-1 space-y-2 min-h-[4rem] rounded-lg transition-colors",
            isOver ? "bg-indigo-50 dark:bg-indigo-950/20" : "",
          ].filter(Boolean).join(" ")}
        >
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} boardId={boardId} />
          ))}
        </div>
      </SortableContext>

      <div className="mt-3">
        <AddTaskForm boardId={boardId} status={status} />
      </div>
    </section>
  );
}

// ── Board ─────────────────────────────────────────────────────────

export function KanbanBoard({
  boardId,
  initialTasks,
}: {
  boardId: string;
  initialTasks: Task[];
}) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  useRealtimeTasks(boardId, setTasks);

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

    const overTask = tasks.find((t) => t.id === overId);
    const targetStatus: TaskStatus = VALID_STATUSES.has(overId)
      ? (overId as TaskStatus)
      : overTask?.status ?? (overId as TaskStatus);

    setTasks((prev) => {
      const activeIdx = prev.findIndex((t) => t.id === activeId);
      if (activeIdx === -1) return prev;
      if (prev[activeIdx].status === targetStatus) return prev;
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
    const targetStatus: TaskStatus = VALID_STATUSES.has(overId)
      ? (overId as TaskStatus)
      : overTask?.status ?? (overId as TaskStatus);

    const columnTasks = tasks.filter((t) => t.status === targetStatus);
    const overIndex = overTask
      ? columnTasks.findIndex((t) => t.id === overId)
      : columnTasks.length;

    const newPosition = computePosition(columnTasks, overIndex, activeId);

    setTasks((prev) =>
      prev.map((t) =>
        t.id === activeId ? { ...t, status: targetStatus, position: newPosition } : t
      )
    );

    moveTask(activeId, boardId, targetStatus, newPosition);
  }

  return (
    <DndContext
      id="kanban-dnd"
      sensors={sensors}
      collisionDetection={collisionDetection}
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
            <DroppableColumn
              key={column.status}
              status={column.status}
              label={column.label}
              tasks={columnTasks}
              boardId={boardId}
            />
          );
        })}
      </div>

      <DragOverlay>
        {activeTask ? <TaskCardDragOverlay task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
