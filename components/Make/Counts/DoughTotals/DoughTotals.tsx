interface DoughTotalsPropTypes {
    doughCount: { [p: string]: number } | undefined,
}

const DoughTotals = ({ doughCount }: DoughTotalsPropTypes) => (
  <div className="h-auto pt-8 pb-20 sm:pt-8 sm:pb-16 align-middle items-center">
    <h2 className="font-bold text-donutPurple mx-5 mt-4">Dough Counts:</h2>
    <div className="h-auto align-middle w-auto items-center self-center justify-center">
      <div>
        {doughCount && Object.entries(doughCount).map((dough) => (
          <div
            key={dough[0]}
            className="flex flex-row align-middle items-center p-4 m-4 rounded-xl bg-white shadow"
          >
            <p className="text-donutPurple text-xl font-extrabold mx-4">{dough[1]}</p>
            <p className="text-sm">{dough[0].replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^\w/, (c) => c.toUpperCase())}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default DoughTotals
