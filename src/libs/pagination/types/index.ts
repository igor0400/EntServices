import { InlineBtnType } from 'src/general';

export interface CreatePaginationProps {
  userTelegramId: string;
  items: InlineBtnType[];
  pageItemsCount?: number;
  rowLen?: number;
  isEmptyFill?: boolean;
  isShowCount?: boolean;
  dontHideNavbar?: boolean;
}

export interface ChangePaginationPageProps {
  userTelegramId: string;
  page?: number;
}
