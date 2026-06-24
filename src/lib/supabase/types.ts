export type TaskStatus = "todo" | "in_progress" | "done";

export type Board = {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
};

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
};

export type BoardMember = {
  user_id: string;
  profile: Profile;
};

export type Task = {
  id: string;
  board_id: string;
  user_id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  position: number;
  assignee_id: string | null;
  created_at: string;
};
