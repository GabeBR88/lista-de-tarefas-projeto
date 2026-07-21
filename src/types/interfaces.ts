export interface Subtarefa {
  id: number;
  task_id: number;
  user_id: number;
  titulo: string;
  concluida: boolean;
  created_at: string;
  editando?: boolean;
}

export interface Tarefa {
  id: number;
  user_id: number;
  titulo: string;
  concluida: boolean;
  created_at: string;
  subtarefas?: Subtarefa[];
}

export interface TarefaBackend {
  id: number | string;
  user_id: number | string;
  titulo?: string | null;
  concluida?: boolean | number | null;
  created_at?: string | null;
  subtarefas?: SubtarefaBackend[];
}

export interface SubtarefaBackend {
  id: number | string;
  task_id: number | string;
  user_id: number | string;
  titulo?: string | null;
  concluida?: boolean | number | null;
  created_at?: string | null;
}
