export interface BookData {
  title: string;
  key: string;
  cover_id: number;
  authors: { key: string; name: string }[];
  first_publish_year: number;
}
