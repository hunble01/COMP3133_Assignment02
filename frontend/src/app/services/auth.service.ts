import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apollo: Apollo) {}

  signup(data: { username: string; email: string; password: string }) {
    return this.apollo.mutate({
      mutation: gql`
        mutation Signup($username: String!, $email: String!, $password: String!) {
          signup(username: $username, email: $email, password: $password) {
            id
            username
            email
          }
        }
      `,
      variables: data,
    }).pipe(map((res: any) => res.data.signup));
  }

  login(data: { email: string; password: string }) {
    return this.apollo.query({
      query: gql`
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password)
        }
      `,
      variables: data,
      fetchPolicy: 'no-cache',
    }).pipe(map((res: any) => res.data.login)); // token is returned directly
  }
}
