const domain = process.env.SHOPIFY_STORE_DOMAIN;
const sfAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;

const ShopifyData = async (query) => {
  const URL = `https://${domain}/api/2021-07/graphql.json`;

  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": sfAccessToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  try {
    const data = await fetch(URL, options).then((response) => {
      return response.json();
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductsInCollection = async () => {
  const query = `
  {
    collectionByHandle(handle: "frontpage") {
      title
      products(first: 25) {
        edges {
          node {
            id
            title
            priceRange{
              minVariantPrice{
                amount
              }
            }
            handle
            images(first: 5) {
              edges {
                node {
                  originalSrc
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
  `;

  const response = await ShopifyData(query);

  const allProducts = response.data.collectionByHandle.products.edges
    ? response.data.collectionByHandle.products.edges
    : [];

  return allProducts;
};

export const getAllProducts = async () => {
  const query = `
  {
    products(first: 250){
      edges{
        node{
          handle
          id
        }
      }
    }
  }
  `;

  const response = await ShopifyData(query);

  const products = response.data.products.edges
    ? response.data.products.edges
    : [];

  return products;
};

export const getProduct = async (handle) => {
  const query = `
  {
    productByHandle(handle: "${handle}") {
      collections(first: 1) {
        edges {
          node {
            products(first: 5) {
              edges {
                node {
                  priceRange {
                    minVariantPrice {
                      amount
                    }
                  }
                  handle
                  title
                  id
                  images(first: 5) {
                    edges {
                      node {
                        originalSrc
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      id
      title
      handle
      description
      images(first: 5) {
        edges {
          node {
            originalSrc
            altText
          }
        }
      }
      options {
        name
        values
        id
      }
      variants(first: 25) {
        edges {
          node {
            selectedOptions {
              name
              value
            }
            image {
              originalSrc
              altText
            }
            title
            id
            priceV2 {
              amount
            }
          }
        }
      }
    }
  }
  `;

  const response = await ShopifyData(query);
  const product = response.data.productByHandle
    ? response.data.productByHandle
    : [];
  return product;
};

export const createCheckout = async (id, quantity) => {
  const query = `
  mutation {
    checkoutCreate(input: {lineItems: [{variantId: "${id}", quantity: ${quantity}}]}) {
      checkout {
        id
        webUrl
      }
    }
  }
  
  `;
  const response = await ShopifyData(query);
  const checkout = response.data.checkoutCreate.checkout
    ? response.data.checkoutCreate.checkout
    : [];
  return checkout;
};

export const updateCheckout = async (id, lineItems) => {
  const lineItemsObj = lineItems.map((item) => {
    return `{
      variantId: "${item.id}",
      quantity: ${item.variantQuantity}
    }`;
  });

  const query = `
    mutation {
      checkoutLineItemsReplace(lineItems:[${lineItemsObj}], checkoutId:"${id}"){
      checkout{
        id
        webUrl
        lineItems(first:25){
          edges{
            node{
              id
              title
              quantity
            }
          }
        }
      }
    }
    }
   
   `;

  const response = await ShopifyData(query);

  const checkout = response.data.checkoutLineItemsReplace.checkout
    ? response.data.checkoutLineItemsReplace.checkout
    : [];

  return checkout;
};
