export interface GlobalStateProps {
  children: React.ReactNode;
}

export interface GlobalContextValue {
  currentPage: string;
  updateCurrentPage: (value: string) => void;
}
