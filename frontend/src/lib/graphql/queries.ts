import { gql } from "@apollo/client/core";

// Auth
export const LOGIN_MUTATION = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      accessToken
      user {
        id
        email
        name
        role
        createdAt
        updatedAt
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      accessToken
      user {
        id
        email
        name
        role
        createdAt
        updatedAt
      }
    }
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      name
      role
      createdAt
      updatedAt
    }
  }
`;

// Products
export const GET_PRODUCTS = gql`
  query Products {
    products {
      id
      name
      description
      sku
      category
      price
      quantity
      unit
      imageUrl
      createdAt
      updatedAt
    }
  }
`;

export const GET_PRODUCT = gql`
  query Product($id: ID!) {
    product(id: $id) {
      id
      name
      description
      sku
      category
      price
      quantity
      unit
      imageUrl
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
      description
      sku
      category
      price
      quantity
      unit
      imageUrl
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($input: UpdateProductInput!) {
    updateProduct(input: $input) {
      id
      name
      description
      sku
      category
      price
      quantity
      unit
      imageUrl
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

// Dashboard
export const GET_DASHBOARD_STATS = gql`
  query DashboardStats {
    dashboardStats {
      totalProducts
      totalQuantity
      totalInventoryValue
      lowStockCount
      categoriesCount
      categoryBreakdown {
        category
        count
        totalValue
      }
    }
  }
`;
