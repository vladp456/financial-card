interface Props {
  rowCount: number
  className?: string
}

const TableSkeleton = ({ rowCount, className = '' }: Props) => (
  <div className='p-5 bg-white shadow animate-pulse w-full'>
    <div className={`h-6 bg-gray-200 w-1/2 ${className}`} />

    {Array.from({ length: rowCount }).map((_, i) => (
      <div key={i} className='h-4 bg-gray-200 mb-4 last:mb-0' />
    ))}
  </div>
)

export default TableSkeleton
