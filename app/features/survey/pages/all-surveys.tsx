import SurveyCard from "../components/survey-card";

export default function Allsurveys() {
    return <div className="grid grid-cols-2 gap-4">
        <div className="">
            <h1 className="text-2xl font-extrabold">Live Surveys</h1>
            <span className="font-extralight">join the surveys</span>
        </div>
        {Array.from({length:10}).map(() => (<SurveyCard/>))}
    </div>
}