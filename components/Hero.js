import Link from "next/link"

const Hero = () => {
    return (
        <div className="my-48 mx-auto max-w-7xl px-4 sm:mt-24 md:mt-72 text-center">
            <h1 className="font-extrabold text-gray-900">

                <p className="text-xl sm:text-3xl md:text-4xl">Sample Shopify FE store</p>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-green-300 text-4xl sm:text-6xl md:text-7xl py-3">
                    eCommerce Sample slogan
                </p>
            </h1>
            <h2 className="mt-3 max-w-md mx-auto text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-x-3xl ">Shop all products
            </h2>
            <div className="mt-5 max-w-md mx-auto flex justify-center items-center md:mt-8">
                <Link href={"#"}>
                    <a className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium py-3 border-transparent rounded-md text-white bg-gray-900 hover:bg-gray-600">
                        Browse products
                    </a>
                </Link>
                <Link href={"#"}>
                    <a className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium py-3 border-transparent rounded-md text-black bg-white-900 hover:bg-gray-200">
                        Search products
                    </a>
                </Link>
            </div>

            
        </div>
    )
}

export default Hero
