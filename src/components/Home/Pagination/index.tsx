import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    if (totalPages <= 1) return null

    return (
        <div className="flex items-center justify-center gap-2 py-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 border rounded cursor-pointer hover:bg-gray-50 disabled:opacity-50 disabled:cursor-default"
            >
                <ChevronLeft size={20} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-4 py-2 rounded cursor-pointer ${
                        currentPage === page
                            ? 'bg-[#02282c] text-white'
                            : 'border hover:bg-gray-50'
                    }`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border rounded cursor-pointer hover:bg-gray-50 disabled:opacity-50 disabled:cursor-default"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    )
}

export default Pagination
