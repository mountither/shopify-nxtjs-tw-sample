

const navigation = [
    {name: 'About us', href:'#'},
    {name: 'Enquiries', href:'#'},
    {name: 'Privacy Policy', href:'#'},
    {name: 'Terms and Conditions', href:'#'},
]

const Footer = () => {
    return (
        <footer className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
                <nav className="flex flex-wrap justify-center">
                    {
                        navigation.map((route, i)=>{
                            return(
                                <div key={`${route.name}-${i}`} className="px-6 py-2">
                                    <a href={route.href} className="text-gray-500 hover:text-gray-900">
                                        {route.name}
                                    </a>
                                </div>
                            )
                        })
                    }
                </nav>
                <p className="mt-0 text-center text-gray-300">&copy; {new Date().getFullYear()} Sample Store, All Rights Reserved</p>
            </div>
        </footer>
    )
}

export default Footer
