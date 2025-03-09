export default function Footer() {
    return(
        <footer className="fixed bottom-0 w-full bg-gray-200 text-center py-4 text-gray-600">
        <div className="flex justify-center space-x-4">
            <a
                href="https://github.com/bozhidarzlatev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black"
            >
                <i className="fab fa-github text-xl"></i>
            </a>
            <a
                href="https://www.linkedin.com/in/bozhidarzlatev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600"
            >
                <i className="fab fa-linkedin text-xl"></i>
            </a>
        </div>
        <p className="mt-2">
            © 2025 To-Do App. Designed and developed by Bozhidar Zlatev.
        </p>
    </footer>
    )
}