import { useState } from "react"
import { Search, ArrowUpDown, ArrowUp, ArrowDown, AlertTriangle } from "lucide-react"

const Table = ({
  // Data
  data = [],
  columns = [],

  // Basic config
  title = "Data Table",
  subtitle = "Manage your data",
  showSearch = true,
  showPagination = true,
  itemsPerPage = 10,

  // Callbacks
  onRowClick = null,
  onRowHover = null,
  onRowLeave = null,
  onSort = null,
  onSearch = null,

  // Custom renders
  renderFilters = null,
  renderHeaderActions = null,
  renderEmptyState = null,

  // Highlighting
  highlightCondition = null,

  // Styling
  className = "",
}) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("")
  const [sortOrder, setSortOrder] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)

  // Basic search
  const filteredData = data.filter((item) => {
    if (!searchTerm) return true
    return Object.values(item).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase()))
  })

  // Basic sorting
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortBy) return 0
    const aValue = a[sortBy]
    const bValue = b[sortBy]
    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage)

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
    if (onSort) onSort(field, sortOrder)
  }

  const handleSearch = (value) => {
    setSearchTerm(value)
    setCurrentPage(1)
    if (onSearch) onSearch(value)
  }

  const getSortIcon = (field) => {
    if (sortBy !== field) return <ArrowUpDown className="w-4 h-4" />
    return sortOrder === "asc" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
  }

  return (
    <div className={`bg-white ${className}`}>
      {/* Search and Filters */}
      {title && (showSearch || renderFilters) && (
        <div className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200/50 sticky top-0 z-30">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                <p className="text-gray-600 mt-1">{subtitle}</p>
              </div>
              <div className="flex space-x-3">{renderHeaderActions && renderHeaderActions()}</div>
            </div>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Search and Filters */}
        {(showSearch || renderFilters) && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 mb-6 hover:shadow-2xl transition-all duration-300">
            <div className="p-6">
              {showSearch && (
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search claims..."
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
              )}
              {renderFilters && <div className="pt-4 border-t border-gray-200">{renderFilters()}</div>}
            </div>
          </div>
        )}

        {/* Empty State */}
        {data.length === 0 && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-12 text-center">
            {renderEmptyState ? (
              renderEmptyState()
            ) : (
              <>
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Data Found</h3>
                <p className="text-gray-500">No data available to display.</p>
              </>
            )}
          </div>
        )}

        {/* Table */}
        {data.length > 0 && (
          <div className="rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden bg-white hover:shadow-2xl transition-all duration-300">
            {title && (
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {title} ({filteredData.length} total)
                  </h2>
                  <div className="text-sm text-gray-500">{subtitle}</div>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={column.key}
                        className={`px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                          column.sortable ? "cursor-pointer hover:bg-gray-100" : ""
                        }`}
                        onClick={() => column.sortable && handleSort(column.key)}
                      >
                        <div className="flex items-center">
                          {column.label}
                          {column.sortable && getSortIcon(column.key)}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {paginatedData.map((item, index) => {
                    const isHighlighted = highlightCondition && highlightCondition(item)
                    return (
                      <tr
                        key={item.id || index}
                        className={`transition-colors duration-150 ${
                          isHighlighted
                            ? "bg-purple-50 hover:bg-purple-100 border-l-4 border-purple-500"
                            : "hover:bg-gray-50"
                        } ${onRowClick ? "cursor-pointer" : ""}`}
                        onClick={() => onRowClick && onRowClick(item)}
                        onMouseEnter={(e) => onRowHover && onRowHover(item, e)}
                        onMouseLeave={() => onRowLeave && onRowLeave()}
                      >
                        {columns.map((column) => (
                          <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {column.render ? column.render(item[column.key], item) : item[column.key]}
                            </div>
                          </td>
                        ))}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {showPagination && totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-white">
                <div className="text-sm text-gray-500">
                  Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredData.length)} of{" "}
                  {filteredData.length}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <div className="flex space-x-1">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 text-sm rounded ${
                          currentPage === i + 1 ? "bg-red-800 text-white" : "border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Table
