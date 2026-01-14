import { SendIcon, User2, User2Icon } from "lucide-react";
import { Form } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Input } from "~/components/ui/input";
import MessageBubble from "../components/message-bubble";
import type { Route } from "./+types/survey";

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const answers = Object.fromEntries(formData);
  console.log(Object.values(answers).map((str) => Number(str)));
};



interface questions {
  question: string;
  options: string[];
}

const questions: questions[] = [
  {
    question: '당신이 가장 선호하는 개발 분야는 무엇인가요?',
    options: ['프론트엔드', '백엔드', '풀스택', '데브옵스', '블록체인'],
  },
  {
    question: '코드를 작성할 때 가장 중요하다고 생각하는 요소는?',
    options: ['가독성', '성능', '확장성', '테스트 가능성', '개발 속도'],
  },
  {
    question: '가장 자주 사용하는 언어는 무엇인가요?',
    options: ['JavaScript', 'Python', 'Java', 'C', 'Go', 'Rust'],
  },
  {
    question: '작업할 때 선호하는 환경은?',
    options: ['다크모드', '라이트모드', '자동', '상황에 따라 다름'],
  }
];

export default function Survey() {
    return <div className="grid grid-cols-3 w-screen gap-3">
        <Card>
  <CardHeader>
    <CardTitle>Sample1</CardTitle>
    <CardDescription>Card Description</CardDescription>
    <CardAction>Card Action</CardAction>
  </CardHeader>
  <CardContent className="overflow-y-auto h-[70vh]">
    <h1 className="font-bold text-xl">Survey Progress</h1>
    {questions.map((q, i) => (
        <div key={i} className="flex flex-col gap-5">
            <h1>{q.question}</h1>
            {q.options.map((o, j) => (
                <div key={j}>
                    <div>{o}</div>
                    <div className="w-full bg-gray-200"></div>
                    <div className="bg-blue-400 w-7 h-5"></div>
                </div>
            ))}
        </div>
    ))}
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
<Card>
  <CardHeader>
    <CardTitle>Live Chat</CardTitle>
  </CardHeader>
  <CardContent>
    {Array.from({length:10}).map((_, i) => (
    <MessageBubble sender={i%2 ==0}/>))}
  </CardContent>
  <CardFooter className="flex flex-row items-center">
    <Form>  
        <input type="text" placeholder="Type your message..." className="w-full border rounded-md px-3 py-2"/>
        <Button className="flex flex-row justify-center w-g h-6 absolute"><SendIcon/></Button>
    </Form> 
  </CardFooter>
</Card>
    </div>;
}