import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { input, typeOfCoach } = await req.json();
  return NextResponse.json({
    msg: `
[${typeOfCoach}] 관련 질문에 대한 답입니다.

[질문]
${input}

[답변]

최근 체중 감량이 정체된 것으로 확인됩니다. 현재 진행 중인 운동 강도를 조정하여 인터벌 트레이닝(고강도-저강도 반복 운동) 20분 + 근력 운동 20분을 추천합니다. 식단 조절이 필요한 시점으로, 야식 섭취를 줄이고 단백질 섭취를 늘리는 것이 중요합니다. 운동 후 스트레칭을 충분히 하여 근육 회복을 돕고, 하루 7시간 이상의 수면을 권장합니다.
`,
  });
}
