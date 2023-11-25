import { gql } from "@apollo/client";

export const CORE_FIELDS_STUDENT = gql`
fragment CoreStudentFields on Student {
    studinfo {
        school
        Department
        levels
        gradYear
        isIT
      }
}`

export const CORE_FIELDS_ARTISAN = gql`
fragment CoreArtisanFields on Student {
  adderess
  shop
}`

export const CORE_FIELDS_PROFF= gql`
fragment CoreProffFields on Student {
  profIinfo {
    name
    certification
    competence
    experience
  }
  
}`

export const CORE_FIELDS_GRADUATE = gql`
fragment CoreGraduateFields on Graduate {
    GradInfo {
        nysc
        school
        jobType
        empStatus
        openJob
        prefJob
        WorkHis {
          company
          roles
          EEnd
          SStart
          ddescription
          createdAt
          updatedAt
        }
      }
}`