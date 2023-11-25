import { gql } from "@apollo/client"
export const LIKE_SUBSCRIPTION = gql`
subscription Subscription {
    rating_like {
      TotalCount {
        message
        code
        error
      }
      edges {
        node {
          email
          about
          brandname
          cat_id
        }
      }
    }
  }
  `

  export const MAIN_CHAT_SUB = gql`
  subscription New_message {
  main_chat {
    message
    timestamp
    user_id
    username
  }
}`

export const TYPING = gql`
subscription typingEven {
    typing
  }
` 
