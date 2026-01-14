import { EyeIcon, UsersIcon, ViewIcon } from "lucide-react"
import { Link } from "react-router"
import { Button } from "~/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from "~/components/ui/card"


export default function SurveyCard() {
  return (
    <Link to="/survey/surveyId">
      <Card>
        <CardHeader>
          <div className="flex-row justify-between items-center">
            <CardTitle>Sample Surveys</CardTitle>
            <div className="flex flex-row gap-2">
              <div className="flex flex-row text.xs gap-0.5">
                <EyeIcon size={15}/> 1600
                </div>
                </div>
            <UsersIcon size={15}/>  58
          </div>
          <CardTitle className="flex flex-row">Sample Survey</CardTitle>
          <CardDescription className="line-clamp-2 min-h-8">This is a sample survey description.This is a sample survey description.</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent>
          <img 
            className="rounded-2xl"
            src = {"https://previews.123rf.com/images/wojtylas69/wojtylas691304/wojtylas69130400059/19194529-brick-wall-with-no-background.jpg"}/>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            Join
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}