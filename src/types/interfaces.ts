export interface Tarefa {
  id: number;
  user_id: number;
  titulo: string;
  concluida: boolean;
  created_at: string;
}

export interface TarefaBackend {
  id: number | string;
  user_id: number | string;
  titulo?: string | null;
  concluida?: boolean | number | null;
  created_at?: string | null;
}
