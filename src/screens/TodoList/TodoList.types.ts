export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
}

export type ListSection = {
  data: TodoItem[];
  title: string;
};
