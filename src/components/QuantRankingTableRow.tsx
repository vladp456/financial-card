type RankingValue = string | { rank: number; total: number }

const QuantRankingTableRow = ({
  label,
  value,
  className = ''
}: {
  label: string
  value: RankingValue
  className?: string
}) => (
  <tr
    className={`flex justify-between [&_td]:font-semibold [&_td]:align-top [&_span]:font-bold ${className}`}
  >
    <td className='py-1 pr-2'>{label}</td>
    <td className='py-1 px-2 text-blue'>
      {typeof value === 'string' ? (
        value
      ) : (
        <>
          <span>{value.rank}</span> out of <span>{value.total}</span>
        </>
      )}
    </td>
  </tr>
)

export default QuantRankingTableRow
