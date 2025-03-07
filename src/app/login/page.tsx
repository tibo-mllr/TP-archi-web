export default function LoginPage() {
    return <>
        <h1>Login</h1>
        <form className="flex flex-col gap-4">
            <input type="text" placeholder="Username" className="bg-gray-500 border-black-700"/>
            <input type="password" placeholder="Password" className="bg-gray-500 border-black-700"/>
            <button type="submit" className="bg-blue-500 text-white border border-white-700">Login</button>
        </form>
    </>
}