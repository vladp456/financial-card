import { useFactorGradesQuery } from '../hooks/useFactorGradesQuery'
import CardError from './shared/CardError'
import TableSkeleton from './shared/TableSkeleton'

interface Props {
  isPremiumUser: boolean
}

const FactorGrades = ({ isPremiumUser = false }: Props) => {
  const { data, isLoading, isError } = useFactorGradesQuery(isPremiumUser)

  if (isLoading) return <TableSkeleton rowCount={6} className='mb-4' />

  if (isError || !data || !data.now) return <CardError minHeight={255} />

  const { now, threeM, sixM } = data
  const factorNames = Object.keys(now)

  return (
    <div className='p-4 bg-white'>
      <h2 className='font-semibold text-2xl mb-2 text-[#757575]'>
        Factor Grades
      </h2>

      <table className='w-full text-left'>
        <thead>
          <tr className='text-[#757575] [&_th]:font-normal text-xs'>
            <th className='py-1 px-2'></th>
            <th className='py-1 px-2'>Now</th>
            <th className='py-1 px-2'>3M ago</th>
            <th className='py-1 px-2'>6M ago</th>
          </tr>
        </thead>

        <tbody>
          {factorNames.map(factor => (
            <tr
              key={factor}
              className='[&_td]:font-semibold [&_td:not(:first-child)]:text-center'
            >
              <td className='py-1 pr-2 text-[#3769D4]'>{factor}</td>
              <td className='py-1 px-2'>{now?.[factor] ?? '-'}</td>
              <td className='py-1 px-2'>{threeM?.[factor] ?? '-'}</td>
              <td className='py-1 px-2'>{sixM?.[factor] ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FactorGrades
