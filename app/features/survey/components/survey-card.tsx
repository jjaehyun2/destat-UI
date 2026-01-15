import { EyeIcon, UsersIcon } from "lucide-react";
import { Link } from "react-router"; // Remix v7 / React Router v7
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
  image: string | null; // null 허용으로 변경
  address: string;
}) {
  // 이미지가 없을 경우 보여줄 기본 이미지 (Placeholder)
  const displayImage = image || "https://github.com/shadcn.png"; 

  return (
    <Card className="max-w-92">
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <CardTitle>
            {/* 타이틀 클릭 시 이동 */}
            <Link to={`/survey/${address}`} className="hover:underline">
              {title}
            </Link>
          </CardTitle>
          <div className="flex flex-row gap-2">
            <div className="flex flex-row text-xs gap-0.5 items-center">
              <EyeIcon size={17} />
              {view ?? 0}
            </div>
            <div className="flex flex-row text-xs gap-0.5 items-center">
              <UsersIcon size={17} />
              {count}
            </div>
          </div>
        </div>
        <CardDescription className="line-clamp-2 min-h-10">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-video w-full overflow-hidden rounded-2xl">
            <img 
                className="h-full w-full object-cover" 
                src={displayImage} 
                alt={title} 
            />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          {/* Button asChild 패턴 사용 권장 */}
          <Link to={`/survey/${address}`}>Join</Link> 
        </Button>
      </CardFooter>
    </Card>
  );
}