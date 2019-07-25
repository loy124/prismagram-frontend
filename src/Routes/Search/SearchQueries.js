import { gql } from "apollo-boost";

export const SEARCH = gql`
  query search($term: String!) {  
    searchPost(term: $term) {
      id
      files {
        url
      }
      likeCount
      commentCount
    }
    searchUser(term: $term) {
      id
      avatar
      username
      isFollowing
      isSelf
    }
  }
`;

// export const SEARCH_POSTS = gql`
//   searchPost($term:String){
//     searchPosts(term:$term){
//       files{
//         url
//       }
//       likeCount
//     }
//   }
// `;
