import { useState } from 'react';
import CandidatesPage from './CandidatesPage';
import ReactPaginate from 'react-paginate';
import './candidatesList.css';

import { Flex } from '@chakra-ui/react';
import PerPageMenu from './PerPageMenu';

const CandidatesList = ({
  candidatesPerPage,
  candidates,
  setNumberCandidatesPerPageHandler,
}: {
  candidatesPerPage: number;
  candidates: any;
  setNumberCandidatesPerPageHandler: any;
}) => {
  // Here we use item offsets; we could also use page offsets
  const [itemOffset, setItemOffset] = useState(0);

  // following the API or data you're working with.
  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + candidatesPerPage;
  const currentCandidates = candidates?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(candidates?.length / candidatesPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * candidatesPerPage) % candidates?.length;
    setItemOffset(newOffset);
  };

  return (
    <Flex flexDirection="column">
      <CandidatesPage currentCandidates={currentCandidates} />
      <Flex alignItems="center" justifyContent="space-evenly">
        <PerPageMenu
          data={candidates}
          numberCandidatesPerPage={candidatesPerPage}
          setNumberCandidatesPerPageHandler={setNumberCandidatesPerPageHandler}
        />
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
    </Flex>
  );
};

export default CandidatesList;
