import {gql} from '@apollo/client'

export const GET_ALL_USERS = gql`
query usersQuery( $lim: Int, $after: String) {
    Users(lim: $lim, after: $after) {
      ... on List {
      pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      cursor
      node {
        __typename
        createdat
        username
        user_id
        phone
        name
        lastname
        idx
        about
        brandname
        firstname
        email
        city_id
        total
        city {
          name
          cityname
        }
      }
    }
      }
  }

}`

export const GETLOGEDUSER = gql`
query userQuery{
  me{
    username
    email
    firstname
    user_id
  }
}`



export const GET_USER_INFO = gql`
query itemQuery($itemId: ID!) {
    item(id: $itemId) {
        firstname
        name
        username
        phone
        email
        user_id
        idx
        cat_id
        city_id
        createdat
        about
        lastname
        brandname
        category {
          __typename
        }
        city {
            cityname
            name
        }
  }
}
  `

export const GET_SEARCH_RESULT = gql`
query searchQuery( $searchText: String, $filterText: String) {
    Search(searchText: $searchText, filterText: $filterText) {
      
        __typename
        createdat
        username
        user_id
        phone
        name
        lastname
        idx
        about
        brandname
        firstname
        email
        total
        city_id
        city {
          name
          cityname
        }
      
  },
}`
export const GET_MAIN_CHAT = gql`
  query mainChatQuery {
  getMainChat {
    idx
    message
    user_id
    username
    timestamp
  }
}`


