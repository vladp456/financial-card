import { useQuantRankingQuery } from '../hooks/useQuantRankingQuery'
import QuantRankingTableRow from './QuantRankingTableRow'
import CardError from './shared/CardError'
import TableSkeleton from './shared/TableSkeleton'

const QuantRanking = () => {
  const { data, isLoading, isError } = useQuantRankingQuery()

  if (isLoading) return <TableSkeleton rowCount={7} className='mb-6' />

  if (isError || !data) return <CardError minHeight={295} />

  return (
    <div className='p-4 bg-white'>
      <h2 className='font-semibold text-2xl mb-2 text-gray'>
        Quant Ranking
      </h2>

      <table className='w-full text-left mb-4'>
        <tbody className='[&_tr:not(:last-child)]:border-b [&_tr]:border-gray-300'>
          <QuantRankingTableRow label='Sector' value={data.sector} />
          <QuantRankingTableRow label='Industry' value={data.industry} className="gap-7" />
          <QuantRankingTableRow
            label='Ranked Overall'
            value={data.rankings.overall}
          />
          <QuantRankingTableRow
            label='Ranked in Sector'
            value={data.rankings.sector}
          />
          <QuantRankingTableRow
            label='Ranked in Industry'
            value={data.rankings.industry_specific}
          />
        </tbody>
      </table>

      <a href='#' className='text-blue font-semibold'>
        Quant Ratings Beat The Market &#187;
      </a>
    </div>
  )
}

export default QuantRanking
