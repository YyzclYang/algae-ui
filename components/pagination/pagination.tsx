import React, { useCallback, useMemo } from 'react';
import { classNames, scopedClassMaker, useControlState } from '../utils';
import './style/pagination.scss';

function pageListGenerator(
  currentPage: number,
  maxPage: number
): Array<number | 'prev' | 'next'> {
  const midPageList = [
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2
  ].reduce<Array<number>>((result, page) => {
    if (page < 1) {
      return [...result, currentPage + 2 + (1 - page)];
    } else if (page > maxPage) {
      return [...result, currentPage - 2 - (page - maxPage)];
    } else {
      return [...result, page];
    }
  }, []);

  return [1, ...midPageList, maxPage]
    .sort((a, b) => a - b)
    .filter(
      (page, index, pageList) =>
        page >= 1 && page <= maxPage && pageList.indexOf(page, 0) === index
    )
    .reduce<Array<number | 'prev' | 'next'>>((result, page) => {
      if (page > (result[result.length - 1] as number) + 1) {
        return [...result, page > currentPage ? 'next' : 'prev', page];
      } else {
        return [...result, page];
      }
    }, []);
}

const sc = scopedClassMaker('algae-ui-pagination');

interface PaginationProps {
  className?: string;
  current?: number;
  pageSize?: number;
  total: number;
  onChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = (props: PaginationProps) => {
  const { className, current, pageSize = 10, total, onChange } = props;
  const maxPage = Math.ceil(total / pageSize) || 1;
  const getTruePage = useCallback(
    (page: number) => {
      return page < 1 ? 1 : page > maxPage ? maxPage : page;
    },
    [maxPage]
  );
  const [currentPage, setCurrentPage] = useControlState(
    1,
    current === undefined ? undefined : getTruePage(current)
  );
  const pageList = useMemo(() => {
    return pageListGenerator(currentPage, maxPage);
  }, [currentPage, maxPage]);

  const setPage = useCallback(
    (page: number) => {
      if (page === currentPage) {
        return;
      }
      const truePage = getTruePage(page);
      setCurrentPage(truePage);
      onChange && onChange(truePage);
    },
    [currentPage, maxPage, onChange, getTruePage]
  );

  return (
    <div className={classNames(sc('wrapper'), className)}>
      <div className={classNames(sc('page-list'))}>
        {pageList.map((page) =>
          typeof page === 'number' ? (
            <span
              key={page}
              className={classNames(
                sc('page-item'),
                sc(`page-item-${page}`),
                currentPage === page ? 'active' : ''
              )}
              onClick={() => {
                setPage(page);
              }}
            >
              {page}
            </span>
          ) : (
            <span
              className={classNames(
                sc('page-item-ellipsis'),
                sc(`page-item-${page}`)
              )}
              key={page}
              onClick={() => {
                const nextPage = currentPage + 5 * (page === 'next' ? 1 : -1);
                setPage(nextPage);
              }}
            >
              •••
            </span>
          )
        )}
      </div>
    </div>
  );
};

Pagination.displayName = 'Pagination';
Pagination.defaultProps = {};

export default Pagination;
