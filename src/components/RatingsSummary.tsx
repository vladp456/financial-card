import { useRatingsSummaryQuery } from '../hooks/useRatingsSummaryQuery'
import CardError from './shared/CardError'
import TableSkeleton from './shared/TableSkeleton'

interface Props {
  isPremiumUser: boolean
}

const RatingsSummary = ({ isPremiumUser = false }: Props) => {
  const { data, isLoading, isError } = useRatingsSummaryQuery(isPremiumUser)

  if (isLoading) return <TableSkeleton rowCount={3} />

  if (isError || !data) return <CardError minHeight={170} />

  return (
    <div className='p-4 bg-white'>
      <h2 className='font-semibold text-2xl mb-2 text-[#757575]'>
        Ratings Summary
      </h2>

      <table className='w-full text-left'>
        <tbody>
          {Object.entries(data).map(([key, item]) => (
            <tr key={key} className='[&_td]:font-semibold'>
              <td className='py-1 pr-2 text-[#3769D4]'>
                {key.replace('_', ' ')}
              </td>
              <td className='py-1 px-2'>{item.rating}</td>
              <td className='py-1 px-2'>{item.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RatingsSummary
