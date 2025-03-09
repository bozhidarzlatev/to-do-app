export default function Header() {
    return (
        <header className="bg-blue-600 text-white py-4 text-center text-2xl font-bold flex items-center justify-center">
            <div className="flex items-center absolute left-4">
                <img
                    src="/bob.png"
                    alt="Logo"
                    className="w-8 h-auto  rounded-full filter brightness-0 invert"
                />
            </div>
            <span className="ml-10">To-Do App</span>
        </header>
    )

}