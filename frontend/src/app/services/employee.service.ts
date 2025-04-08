import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private apollo: Apollo) {}

  getEmployees(): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`
        query {
          getAllEmployees {
            id
            first_name
            last_name
            email
            gender
            department
            designation
            salary
          }
        }
      `,
    }).valueChanges.pipe(map((result: any) => result.data.getAllEmployees));
  }

  addEmployee(emp: any): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation AddEmployee(
          $first_name: String!,
          $last_name: String!,
          $email: String!,
          $gender: String!,
          $designation: String!,
          $salary: Float!,
          $date_of_joining: String!,
          $department: String!,
          $employee_photo: String
        ) {
          addEmployee(
            first_name: $first_name,
            last_name: $last_name,
            email: $email,
            gender: $gender,
            designation: $designation,
            salary: $salary,
            date_of_joining: $date_of_joining,
            department: $department,
            employee_photo: $employee_photo
          ) {
            id
            first_name
          }
        }
      `,
      variables: {
        ...emp,
        salary: parseFloat(emp.salary)  // <-- cast to Float
      }
    });
  }
  
  

  getEmployeeById(id: string): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`
        query ($id: ID!) {
          searchEmployeeByEID(id: $id) {
            id
            first_name
            last_name
            email
            gender
            department
            designation
            salary
          }
        }
      `,
      variables: { id }
    }).valueChanges.pipe(map((result: any) => result.data.searchEmployeeByEID));
  }

  updateEmployee(id: string, emp: any): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateEmployee($id: ID!, $input: EmployeeInput!) {
          updateEmployee(id: $id, input: $input) {
            id
          }
        }
      `,
      variables: {
        id,
        input: emp
      }
    });
  }

  deleteEmployee(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation($id: ID!) {
          deleteEmployee(id: $id)
        }
      `,
      variables: { id }
    });
  }
  
}
