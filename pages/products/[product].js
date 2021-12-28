import ProductContent from "../../components/ProductContent";
import { getAllProducts, getProduct } from "../../lib/shopify";

const Product = ({ product }) => {
  return (
    <div>
      <ProductContent product={product} />
    </div>
  );
};

export default Product;

export const getStaticPaths = async () => {
  try {
    const products = await getAllProducts();

    const paths = products.map((item) => {
      const handle = String(item.node.handle);

      return {
        params: {
          product: handle,
        },
      };
    });

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getStaticProps = async ({ params }) => {
  try {
    const product = await getProduct(params.product);

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.log(error);
    return;
  }
};
