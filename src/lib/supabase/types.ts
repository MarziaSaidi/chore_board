export type TaskStatus = "todo" | "in_progress" | "done";

export type Board = {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
};

export type Task = {
  id: string;
  board_id: string;
  user_id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  position: number;
  created_at: string;
};
