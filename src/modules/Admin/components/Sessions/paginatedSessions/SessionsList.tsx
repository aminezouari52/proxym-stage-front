import { useState } from 'react';
import SessionsPage from './SessionsPage';
import ReactPaginate from 'react-paginate';
import './sessionsList.css';

import { Flex } from '@chakra-ui/react';

const SessionsList = ({
  sessionsPerPage,
  sessions,
}: {
  sessionsPerPage: number;
  sessions: any;
}) => {
  // Here we use item offsets; we could also use page offsets
  const [itemOffset, setItemOffset] = useState(0);

  // following the API or data you're working with.
  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + sessionsPerPage;
  const currentSessions = sessions?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(sessions?.length / sessionsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * sessionsPerPage) % sessions?.length;
    setItemOffset(newOffset);
  };

  return (
    <Flex flexDirection="column">
      <SessionsPage currentSessions={currentSessions} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="suivant >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< précédent"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        activeClassName="active"
        pageClassName="page-item"
        previousClassName="page-item"
        nextClassName="page-item"
        breakClassName="page-item"
        disabledClassName="disabled"
        pageLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        breakLinkClassName="page-link"
      />
    </Flex>
  );
};

export default SessionsList;
