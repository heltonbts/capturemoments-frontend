interface Props {
  imgSrc: string
  message: string
}

const EmptyCard = ({ imgSrc, message }: Props) => {
  return (
    <div>
      <div className="mt-20 flex flex-col items-center justify-center">
        <img src={imgSrc} alt="no notes" className="w-24" />
        <p className="mt-5 w-1/2 text-center text-sm leading-7 font-medium text-slate-700">
          {message}
        </p>
      </div>
    </div>
  )
}

export default EmptyCard
