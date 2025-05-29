import {useAppContext} from "../../context/AppContext.jsx";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";

const SellerLogin = () => {

    const {isSeller , setIsSeller , navigate , axios} = useAppContext();
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    useEffect(() => {
        if(isSeller) {
            navigate("/seller");
        }
    }, [isSeller]);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        console.log("Form submitted with", { email, password }); // ✅ STEP 1: Check if function is called

        try {
            const { data } = await axios.post("/api/seller/login", { email, password });
            console.log("Server response:", data); // ✅ STEP 2: See if response is coming

            if (data.success) {
                setIsSeller(true);
                toast.success("Login Successful");
                navigate("/seller");
            } else {
                console.log("Showing toast error:", data.message);
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Login Error:", error); // ✅ STEP 3: Check any Axios issues
            toast.error(error.message);
        }
    };



    return !isSeller && (
        <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center text-sm text-gray-600'>

            <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88
            rounded-lg shadow-xl border border-gray-200'>
                <p className='text-2xl font-medium m-auto'><span className='text-primary'>Seller </span>Login</p>

                <div className='w-full'>
                    <p>Email</p>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary' type="email" placeholder="Enter your Email" required/>
                </div><div className='w-full'>
                    <p>Password</p>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary' type="password" placeholder='Enter your password' required/>
                </div>
                <button className='bg-primary text-white w-full py-2 rounded-md cursor-pointer'>Login</button>
            </div>


        </form>
    )
}

export default SellerLogin;