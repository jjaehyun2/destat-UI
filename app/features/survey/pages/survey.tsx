import { SendIcon } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Form } from "react-router";
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import MessageBubble from "../components/message-bubble";
import { SURVEY_ABI } from "~/features/survey/constant";
import { supabase } from "~/postgres/supaclient";
import type { Route } from "./+types/survey";

export const loader = async ({ params }: Route.ComponentProps) => {
  const id = params.surveyId;
  await supabase.rpc("increment_survey_view", {survey_id: id} );
};
export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const answers = Object.fromEntries(formData);
  console.log(Object.values(answers).map((str) => Number(str)));
};

interface Question {
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    question: "하루 평균 물 섭취량은?",
    options: ["500ml 미만", "500ml~1L", "1L~1.5L", "1.5L~2L", "2L 이상"],
  },
  {
    question: "하루 평균 수면 시간은?",
    options: ["5시간 미만", "5~6시간", "6~7시간", "7~8시간", "8시간 이상"],
  },
  {
    question: "일주일 평균 외식(배달 포함) 횟수는?",
    options: ["0회", "1~2회", "3~4회", "5~6회", "매일"],
  },
  {
    question: "하루 평균 스마트폰 사용 시간은?",
    options: ["1시간 미만", "1~3시간", "3~5시간", "5~7시간", "7시간 이상"],
  },
  {
    question: "하루 평균 독서(전자책 포함) 시간은?",
    options: ["하지 않음", "30분 미만", "1시간 미만", "1~2시간", "2시간 이상"],
  },
  {
    question: "하루 중 가장 집중력이 높은 시간대는?",
    options: ["이른 아침", "오전", "오후", "저녁", "심야"],
  },
  {
    question: "하루 평균 카페인 섭취량은?",
    options: ["마시지 않음", "1잔", "2잔", "3잔", "4잔 이상"],
  },
  {
    question: "주말 휴식 시 선호하는 장소는?",
    options: ["집(침대/소파)", "카페", "공원이나 야외", "영화관/쇼핑몰", "여행지"],
  },
  {
    question: "자신의 삶에 대한 전반적인 만족도는?",
    options: ["매우 불만족", "불만족", "보통", "만족", "매우 만족"],
  },
  {
    question: "새로운 정보를 얻는 주된 경로는?",
    options: ["뉴스/신문", "SNS(인스타그램 등)", "유튜브", "커뮤니티/블로그", "지인"],
  },
];

export default function Survey({ params }: Route.ComponentProps) {
  const { data: contractQuestions } = useReadContract({
    address: params.surveyId as `0x{string}`,
    abi: SURVEY_ABI,
    functionName: "getQuestion",
    args: [],
  });
  const { data: title } = useReadContract({
    address: params.surveyId as `0x{string}`,
    abi: SURVEY_ABI,
    functionName: "title",
    args: [],
  });
  const { data: description } = useReadContract({
    address: params.surveyId as `0x{string}`,
    abi: SURVEY_ABI,
    functionName: "description",
    args: [],
  });
  const { writeContract } = useWriteContract();
  const { address } = useAccount();
  const submitAnswer = (e: React.FormEvent<HTMLFormElement>) => {
    if (!address) {
      alert("Please connect wallet before submitting answer");
      return;
    }
    const formData = new FormData(e.currentTarget);
    const answers: number[] = [];
    for (const value of formData.values()) {
      answers.push(Number(value));
    }
    writeContract({
      address: params.surveyId as `0x{string}`,
      abi: SURVEY_ABI,
      functionName: "submitAnswer",
      args: [
        {
          respondent: address,
          answers,
        },
      ],
    });
  };
  const { data: answers } = useReadContract({
    address: params.surveyId as `0x{string}`,
    abi: SURVEY_ABI,
    functionName: "getAnswers",
    args: [],
  });
  const { data: target } = useReadContract({
    address: params.surveyId as `0x{string}`,
    abi: SURVEY_ABI,
    functionName: "targetNumber",
    args: [],
  });
  const [counts, setCounts] = useState<Number[][]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const countAnswers = () => {
    if (!target) return;
    return questions?.map((q, i) => {
      const count = Array.from({ length: q.options.length }).fill(
        0,
      ) as number[];
      answers?.map((answer) => count[answer.answers[i]]++);
      return count.map((n) => (n / Number(target)) * 100);
    });
  };

  useEffect(() => {
    if (!answers || !questions || !address) {
      return;
    }
    for (const answer of answers) {
      if (answer.respondent === address) {
        setCounts(countAnswers() || []);
        setIsAnswered(true);
        return;
      }
    }
  }, [answers, address, target]);
  return (
    <div className="grid grid-cols-3 gap-3 ">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="font-extrabold text-3xl">Sample Survey</CardTitle>
          <CardDescription>This is Sample survey</CardDescription>
        </CardHeader>
        {isAnswered ? (
          <CardContent className="overflow-y-auto h-[70vh]">
            <h1 className="font-semibold text-xl pb-4">Survey Progress</h1>
            <div className="gap-5 grid grid-cols-2">
              {questions?.map((q, i) => (
                <div key={i}className="flex flex-col">
                  <h1 className="font-bold">{q.question}</h1>
                  <div className="flex flex-col pl-2 gap-1">
                    {q.options.map((o, j) => (
                      <div className="flex flex-row justify-center items-center relative">
                        <div className="left-2 absolute text-xs font-semibold text-neutral-500">
                          {o}
                        </div>
                        <div className="w-full bg-gray-200 h-5 rounded-full overflow-hidden">
                          <div
                            className="bg-primary/30 w-14 h-5 rounded-full"
                            style={{ width: `${counts[i][j]}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        ) : (
          <CardContent className="overflow-y-auto h-[70vh]">
            <Form onSubmit={submitAnswer} className="grid grid-cols-2">
              {questions?.map((q, i) => (
                <div className="flex flex-col">
                  <span className="mt-5 mb-1">{q.question}</span>
                  {q.options.map((o, j) => (
                    <label className="flex items-center gap-1">
                      <Input
                        type="radio"
                        name={i.toString()}
                        value={j.toString()}
                        className="hidden peer"
                      ></Input>
                      <span className="w-4 h-4 rounded-full border-2 peer-checked:bg-primary"></span>
                      <span className="font-semibold">{o}</span>
                    </label>
                  ))}
                </div>
              ))}
              <Button type="submit" className="w-full mt-3">
                Submit
              </Button>
            </Form>
          </CardContent>
        )}
      </Card>
      <Card className="col-span-1 flex flex-col">
        <CardHeader>
          <CardTitle>Live Chat</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5 overflow-y-auto h-[70vh]">
          {Array.from({ length: 20 }).map((_, i) => (
            <MessageBubble sender={i % 2 == 0} />
          ))}
        </CardContent>
        <CardFooter className="w-full">
          <Form className="flex flex-row items-center relative w-full">
            <input
              type="text"
              placeholder="type a message..."
              className="border w-full h-8 rounded-2xl px-2 text-xs"
            />
            <Button className="flex flex-row justify-center items-center w-6 h-6 absolute right-2">
              <SendIcon />
            </Button>
          </Form>
        </CardFooter>
      </Card>
    </div>
  );
}