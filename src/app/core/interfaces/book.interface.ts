export interface BookData {
  title: string;
  key: string;
  cover_i?: number;
  cover_id: number;
  authors: { key: string; name: string }[];
  first_publish_year: number;
  main_subject: string;
}
