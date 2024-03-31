export interface SearchOptions {
  type?: 'book' | 'subject' | 'author';
  sort?: 'new';
  title?: string;
  author?: string;
  subject_keyword?: string;
}
