import { EyeIcon, UsersIcon, ViewIcon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card";

export default function SurveyCard({
  title,
  description,
  view,
  count,
  image,
  address,
}: {
  title: string;
  description: string;
  view: number;
  count: number;
  image: string;
  address: string;
}) {
  return (
    // 전체를 감싸는 Link를 유지하되, 내부 Button에서는 Link를 제거하고 구조를 단순화합니다.
    <Link to={`/survey/${address}`} className="block transition-transform hover:scale-[1.02]">
      <Card className="max-w-92 h-full flex flex-col">
        <CardHeader>
          <div className="flex flex-row justify-between items-start gap-2">
            <CardTitle className="line-clamp-1">{title}</CardTitle>
            <div className="flex flex-row gap-2 shrink-0 text-muted-foreground">
              <div className="flex items-center text-xs gap-0.5">
                <EyeIcon size={14} />
                {view}
              </div>
              <div className="flex items-center text-xs gap-0.5">
                <UsersIcon size={14} />
                {count}
              </div>
            </div>
          </div>
          <CardDescription className="line-clamp-2 min-h-10">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          {/* w-2xl 대신 w-full과 aspect-video 등을 사용합니다. */}
          <img className="rounded-xl w-full aspect-video object-cover" src={image} />
        </CardContent>
        <CardFooter>
          {/* 이미 카드 전체가 Link이므로 Button 내부의 Link는 제거합니다. */}
          <Button className="w-full" asChild>
            <span>Join Survey</span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}