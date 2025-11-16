import MyAccountHeader from "./MyAccountHeader"

const MyAccountLayout = ({ children } : { children: React.ReactNode} ) => {
    return(
        <>
        <section className="mb-10">
            <div className="pt-10 pb-5 bg-white">
                <MyAccountHeader/>
            </div>
            {children}
        </section>
        </>
    )
}

export default MyAccountLayout