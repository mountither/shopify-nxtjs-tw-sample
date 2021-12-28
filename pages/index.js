import Head from "next/head";
import ProductList from "../components/ProductList";
import { getProductsInCollection } from "../lib/shopify";


export default function Home({products}) {

  console.log(products)

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div >
      <ProductList products={products}/>
      </div>
    </>
  );
}


export async function getStaticProps(context) {

  const products = await getProductsInCollection();


  return {
    props: {
      products
    },
  }
}