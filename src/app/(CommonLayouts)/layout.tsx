import { Navbar1 } from "@/components/shared/navbar1";


const commonLayout = ({children} : {children : React.ReactNode}) => {
    return (
        <div>
            <Navbar1/>
            {children}
        </div>
    );
};

export default commonLayout;