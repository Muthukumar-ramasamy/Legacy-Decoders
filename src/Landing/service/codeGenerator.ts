import axios from 'axios';

const BASE_URL = 'http://7158-106-51-1-131.ngrok-free.app'; // Replace this with your API base URL

const storyToCode = {
  generateProjectStructure: async (payload: { story: string, tech: string, user_name: string, brdFile: FormData }) => {
    console.log(payload, "kkk")
    const url = `/api/legacy/generate-structure?story=${payload.story}&tech=${payload.tech}&user_name=${payload.user_name}`
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    try {
      // const response = await axios.post(`${BASE_URL}/${url}`, payload.brdFile, config);
      // if(response){
      //   return response
      // }
      return {
        "content": "The project structure for the Authentication Application in Spring Boot has been successfully created and saved in a text file. Here's the download link for the text file containing the project structure:\n\n[Download Project Structure](sandbox:/mnt/data/authentication_application_structure.txt)\n\nHere is the JSON response with the project structure and download link:\n\n```json\n{\n  \"project_structure\": \"\"\"\nauthentication-application/\n|-- src/\n|   |-- main/\n|   |   |-- java/\n|   |   |   |-- com/\n|   |   |   |   |-- example/\n|   |   |   |   |   |-- authapp/\n|   |   |   |   |   |   |-- config/ (directory)\n|   |   |   |   |   |   |   |-- SecurityConfig.java (Java file)\n|   |   |   |   |   |   |-- controller/ (directory)\n|   |   |   |   |   |   |   |-- UserController.java (Java file)\n|   |   |   |   |   |   |-- model/ (directory)\n|   |   |   |   |   |   |   |-- User.java (Java file)\n|   |   |   |   |   |   |-- repository/ (directory)\n|   |   |   |   |   |   |   |-- UserRepository.java (Java file)\n|   |   |   |   |   |   |-- service/ (directory)\n|   |   |   |   |   |   |   |-- UserService.java (Java file)\n|   |   |   |   |   |   |-- Application.java (Java file)\n|   |   |-- resources/ (directory)\n|   |   |   |-- application.properties (Properties file)\n|-- test/\n|   |-- java/\n|   |   |-- com/\n|   |   |   |-- example/\n|   |   |   |   |-- authapp/\n|   |   |   |   |   |-- UserControllerTest.java (Java file)\n|-- Dockerfile (Docker file)\n|-- pom.xml (Maven file)\n|-- README.md (Markdown file)\n  \"\"\",\n  \"link_to_download\": \"sandbox:/mnt/data/authentication_application_structure.txt\"\n}\n```",
        "s3_url": "https://legacy-transformers.s3.amazonaws.com/null/1715699235396/structure.txt",
        "project_id": 3
      }
    } catch (error) {
      throw error.response.data;
    }
  },

  generateBrd: async (payload: { story: string, tech: string, user_name: string }) => {
    console.log(payload, "kkk")
    const url = `/api/legacy/generate-brd`
    const config = {
      headers: {
        'content-type': 'application/json'
      }
    }
    try {
      // const response = await axios.post(`${BASE_URL}/${url}`, payload, config);
      // if(response){
      //   return response
      // }
      return {
        "content": "# Business Requirements Document (BRD)\n\n## Project Title: Spring Boot Authentication Application .This document will be updated as the project evolves and further needs are identified. Approval from key stakeholders is required to finalize this BRD.\n\n---\n\n### Sign-off\n[Stakeholder Title/Name]  \n[Date]\n\n[Stakeholder Title/Name]  \n[Date]\n\n---\n\nThis BRD serves as a foundational document, guiding the development of a secure and efficient authentication application using the specified tech stack. Further details and technical specifications will be outlined in the Systems Requirement Specification (SRS) and the final technical design document (TDD).",
        "s3_url": "url",
        "project_id": 1
      }
    } catch (error) {
      throw error.response.data;
    }
  },

  getStructureByProjectId: async (projectId: string) => {
    console.log(projectId, "kkk")
    const url = `/api/legacy/generate-structure/${projectId}`
    const config = {
      headers: {
        'content-type': 'application/json'
      }
    }
    try {
      // const response = await axios.get(`${BASE_URL}/${url}`,config);
      // if(response){
      //   return response
      // }
      return {
        "content": "The project structure for the Authentication Application in Spring Boot has been successfully created and saved in a text file. Here's the download link for the text file containing the project structure:\n\n[Download Project Structure](sandbox:/mnt/data/authentication_application_structure.txt)\n\nHere is the JSON response with the project structure and download link:\n\n```json\n{\n  \"project_structure\": \"\"\"\nauthentication-application/\n|-- src/\n|   |-- main/\n|   |   |-- java/\n|   |   |   |-- com/\n|   |   |   |   |-- example/\n|   |   |   |   |   |-- authapp/\n|   |   |   |   |   |   |-- config/ (directory)\n|   |   |   |   |   |   |   |-- SecurityConfig.java (Java file)\n|   |   |   |   |   |   |-- controller/ (directory)\n|   |   |   |   |   |   |   |-- UserController.java (Java file)\n|   |   |   |   |   |   |-- model/ (directory)\n|   |   |   |   |   |   |   |-- User.java (Java file)\n|   |   |   |   |   |   |-- repository/ (directory)\n|   |   |   |   |   |   |   |-- UserRepository.java (Java file)\n|   |   |   |   |   |   |-- service/ (directory)\n|   |   |   |   |   |   |   |-- UserService.java (Java file)\n|   |   |   |   |   |   |-- Application.java (Java file)\n|   |   |-- resources/ (directory)\n|   |   |   |-- application.properties (Properties file)\n|-- test/\n|   |-- java/\n|   |   |-- com/\n|   |   |   |-- example/\n|   |   |   |   |-- authapp/\n|   |   |   |   |   |-- UserControllerTest.java (Java file)\n|-- Dockerfile (Docker file)\n|-- pom.xml (Maven file)\n|-- README.md (Markdown file)\n  \"\"\",\n  \"link_to_download\": \"sandbox:/mnt/data/authentication_application_structure.txt\"\n}\n```",
        "s3_url": "https://legacy-transformers.s3.amazonaws.com/null/1715699235396/structure.txt",
        "project_id": 3
      }
    } catch (error) {
      throw error.response.data;
    }
  },

  getProjectZip: async (projectId: number) => {
    console.log(projectId, "kkk")
    const url = `/api/legacy/generate-code/${projectId}`
    const config = {
      headers: {
        'content-type': 'application/json'
      }
    }
    try {
      // const response = await axios.get(`${BASE_URL}/${url}`,config);
      // if(response){
      //   return response
      // }
      return {
        "content": "The project structure for the Authentication Application in Spring Boot has been successfully created and saved in a text file. Here's the download link for the text file containing the project structure:\n\n[Download Project Structure](sandbox:/mnt/data/authentication_application_structure.txt)\n\nHere is the JSON response with the project structure and download link:\n\n```json\n{\n  \"project_structure\": \"\"\"\nauthentication-application/\n|-- src/\n|   |-- main/\n|   |   |-- java/\n|   |   |   |-- com/\n|   |   |   |   |-- example/\n|   |   |   |   |   |-- authapp/\n|   |   |   |   |   |   |-- config/ (directory)\n|   |   |   |   |   |   |   |-- SecurityConfig.java (Java file)\n|   |   |   |   |   |   |-- controller/ (directory)\n|   |   |   |   |   |   |   |-- UserController.java (Java file)\n|   |   |   |   |   |   |-- model/ (directory)\n|   |   |   |   |   |   |   |-- User.java (Java file)\n|   |   |   |   |   |   |-- repository/ (directory)\n|   |   |   |   |   |   |   |-- UserRepository.java (Java file)\n|   |   |   |   |   |   |-- service/ (directory)\n|   |   |   |   |   |   |   |-- UserService.java (Java file)\n|   |   |   |   |   |   |-- Application.java (Java file)\n|   |   |-- resources/ (directory)\n|   |   |   |-- application.properties (Properties file)\n|-- test/\n|   |-- java/\n|   |   |-- com/\n|   |   |   |-- example/\n|   |   |   |   |-- authapp/\n|   |   |   |   |   |-- UserControllerTest.java (Java file)\n|-- Dockerfile (Docker file)\n|-- pom.xml (Maven file)\n|-- README.md (Markdown file)\n  \"\"\",\n  \"link_to_download\": \"sandbox:/mnt/data/authentication_application_structure.txt\"\n}\n```",
        "s3_url": "https://legacy-transformers.s3.amazonaws.com/null/1715699235396/structure.txt",
        "project_id": 3
      }
    } catch (error) {
      throw error.response.data;
    }
  },

};

export default storyToCode;
