import Image from "next/image";
import Link from "next/link";
import { currencyFormatter } from "../utils/helpers";

const ProductCard = ({ product }) => {
  const { handle, title } = product.node;

  const { altText, originalSrc } = product.node.images.edges[0].node;

  const price = product.node.priceRange.minVariantPrice.amount;
  return (
    <Link href={`/products/${handle}`}>
      <a className="group">
        <div className="w-full bg-gray-200 rounded-3xl overflow-hidden group-hover:opacity-75 transition-opacity hover:transition-opacity hover:duration-500 duration-500">
          <div className="relative h-72">
            <Image
              src={originalSrc}
              alt={altText}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <h3 className="mt-5 text-lg font-medium text-gray-800">{title}</h3>
        <p className="mt-1 text-sm text-gray-600">{currencyFormatter.format(price)}</p>
      </a>
    </Link>
  );
};

export default ProductCard;
