import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { userMessage } from '../../../utills/store';
import { useRecoilState } from 'recoil';
import { GET_SEARCH_RESULT } from '../../../Query/Api';
import { getParams } from '../../../utills/getParams';

export const useSearch = (list) => {
  const [message, setMessage] = useRecoilState(userMessage);
  const query = getParams('q');

  // Clean 'null' values from the 'list' variable
  const striped = list?.replace(/\bnull\b/g, '');

  try {
    const [fetchSearch, { data, loading }] = useLazyQuery(GET_SEARCH_RESULT, {
      variables: {
        searchText: query,
        filterText: striped,
      },
      fetchPolicy: 'no-cache',
    });

    async function submit() {
      try {
        await fetchSearch();
      } catch (error) {
        if (error.message) {
          setMessage(error.message);
        }
      }
    }

    return { loading, submit, message, data };
  } catch (error) {
    setMessage(error.message);
    throw new Error('An error occurred while performing the search.');
  }
};
