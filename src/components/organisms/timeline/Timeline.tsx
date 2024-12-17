import { CheckmarkIcon } from "react-hot-toast"

interface ITimelineData{
    title: string
    desc: string | number | boolean | any
    startDate: string
    endDate: string
}

interface ITimeline{
    data: ITimelineData[]
}

const Timeline:React.FC<ITimeline> = ({
    data
}) => {
  return (
    <div>
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
            {
                data.map((eachData)=>{
                    return(
                        <li>
                            <hr />
                            <div className="timeline-middle">
                            <CheckmarkIcon/>
                            </div>
                            <div className="timeline-end mb-10">
                            <time className="font-mono italic">{eachData.endDate}</time>
                            <div className="text-lg font-black">{eachData.title}</div>
                            {
                                eachData.desc
                            }
                            </div>
                            <hr />
                        </li>
                    )
                })
            }    
        </ul>
    </div>
  )
}

export default Timeline