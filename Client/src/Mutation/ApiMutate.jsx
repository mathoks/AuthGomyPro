import {gql} from '@apollo/client'

export const ADD_NEW_USER = gql`
mutation createUser($info: userSignup) {
  createUser(info: $info) {
   code
   data {
     firstname
     user_id
     email
     username
   } 
   success
   message
  }
}
`
export const LOG_USER = gql`
mutation signUser($credentials: userSignin) {
  authenticate(credentials: $credentials) {
   code
   data 
   success
   message
  }
}`

export const LIKE_USER = gql`
mutation likeUser($ids: likes_dislikes) {
  rating_like(ids: $ids) {
    edges {
     node{
       name
       username
      about
      brandname
      cat_id
      user_id
      total
      phone
      lastname
      idx
      firstname
      email
      createdat
      city_id
      city {
        name
        cityname
      }
    }
     cursor
   }
   TotalCount {
     message
     code
     error
   }
  }
}`

export const GETREFRESH = gql`
mutation refreshQuery{
  refresh
}`

export const CHAT_MAIN = gql`
mutation addCHAT($info: chatPayload) {
  addChat(info: $info)
}`

export const IS_TYPING = gql`
mutation UserTyping($info: notify) {
  userTyping(info: $info)
}`
