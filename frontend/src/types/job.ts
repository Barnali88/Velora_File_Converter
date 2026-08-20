export type Job = {
  id: number;
  tool_id: number;
  status: string;
  original_filename: string;
  output_filename?: string | null;
  created_at: string;
  error_message?: string | null;
};
