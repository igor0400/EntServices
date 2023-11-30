import { formatKeyboard } from '../../common';

interface Props {
  items: { text: string; callback_data: string }[];
  pageItemsCount: number;
  rowLen: number;
  isEmptyFill: boolean;
}

export const createPagination = ({
  items,
  pageItemsCount = 20,
  rowLen = 5,
  isEmptyFill = false,
}: Props) => {
  const viewItems = [];

  // сделать пагинацию как в ZeroServices и добавить в createEvent

  return [...formatKeyboard(viewItems, rowLen, isEmptyFill)];
};
