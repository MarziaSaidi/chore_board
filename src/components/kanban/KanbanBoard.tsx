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
import type { BoardMember, Task, TaskStatus } from "@/lib/supabase/types";

const COLUMNS: { status: TaskStatus; label: string }[] = [
  { status: "todo",        label: "To Do"       },
  { status: "in_progress", label: "In Progress" },
  { status: "done",        label: "Done"        },
];

const VALID_STATUSES = new Set(["todo", "in_progress", "done"]);

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

function DroppableColumn({
  status, label, tasks, boardId, members,
}: {
  status: TaskStatus; label: string; tasks: Task[]; boardId: string; members: BoardMember[];
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <section
      className="flex flex-col rounded-[var(--radius)] border-2 p-3"
      style={{
        background: isOver ? "var(--accent)" : "var(--muted)",
        borderColor: "var(--border)",
        boxShadow: "0 2px 0 0 var(--border)",
        transition: "background 0.15s",
      }}
    >
      <div className="mb-3 flex items-center justify-between px-1">
        <h2 className="text-sm font-bold" style={{ color: "var(--foreground)" }}>
          {label}
        </h2>
        <span
          className="rounded-full px-2 py-0.5 text-xs font-bold border-2"
          style={{ background: "var(--secondary)", color: "var(--secondary-foreground)", borderColor: "var(--border)" }}
        >
          {tasks.length}
        </span>
      </div>

      <SortableContext id={status} items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className="flex-1 space-y-2 min-h-[4rem] rounded-[var(--radius)]">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} boardId={boardId} members={members} />
          ))}
        </div>
      </SortableContext>

      <div className="mt-3">
        <AddTaskForm boardId={boardId} status={status} members={members} />
      </div>
    </section>
  );
}

export function KanbanBoard({ boardId, initialTasks, members }: {
  boardId: string; initialTasks: Task[]; members: BoardMember[];
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
    const overIndex = overTask ? columnTasks.findIndex((t) => t.id === overId) : columnTasks.length;
    const newPosition = computePosition(columnTasks, overIndex, activeId);
    setTasks((prev) =>
      prev.map((t) => t.id === activeId ? { ...t, status: targetStatus, position: newPosition } : t)
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
              members={members}
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
