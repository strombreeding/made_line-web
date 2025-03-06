import { z } from "zod";

export default function useLoginHook() {
  const validateName = (name: string) => {
    // 1. 공백, 한글, 영어, 숫자를 허용하는 정규식
    const validCharacters = /^[가-힣a-zA-Z0-9\s]+$/;

    // 2. 한글 자음만 있는 경우를 체크하는 정규식
    const koreanConsonantsOnly = /^[ㄱ-ㅎ\s]+$/;

    // 3. 문자열이 비어있지 않은지 확인
    if (name.trim().length === 0) {
      throw new Error("이름을 입력해주세요.");
    }

    // 4. 유효한 문자만 포함되어 있는지 확인
    if (!validCharacters.test(name)) {
      throw new Error("유효한 문자만 입력해주세요.");
    }

    // 5. 한글 자음만 있는 경우 거부
    if (koreanConsonantsOnly.test(name)) {
      throw new Error("한글 자음은 포함될 수 없습니다.");
    }

    // 6. 숫자만으로 이루어진 경우 거부
    if (/^\d+$/.test(name.trim())) {
      throw new Error("이름은 숫자로만 이루어질 수 없습니다.");
    }

    // 모든 조건을 통과하면 true 반환
  };

  const validateDateFormat = (dateString: string) => {
    // YYYY-MM-DD 형식을 체크하는 정규식
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
    console.log(dateString);
    if (!dateFormatRegex.test(dateString)) {
      throw new Error("날짜 양식이 맞지 않습니다.");
    }

    // 날짜가 유효한지 확인
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    if (date.getFullYear() !== year) {
      throw new Error("유효하지 않은 연도 입니다.");
    }
    if (date.getMonth() !== month - 1) {
      throw new Error("유효하지 않은 월 입니다.");
    }
    if (date.getDate() !== day) {
      throw new Error("유효하지 않은 일자 입니다.");
    }
  };

  const emailValidation = (email: string) => {
    try {
      const EmailSchema = z.string().email("이메일 형식이 올바르지 않습니다.");
      EmailSchema.parse(email);
    } catch (err) {
      if (JSON.stringify(err).includes("이메일 형식")) {
        throw new Error("이메일 형식이 올바르지 않습니다.");
      }
      alert(err);
    }
  };

  const pwValidation = (pw: string) => {
    // 문 + 특 + 숫 포함
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).*$/;
    const isValid = regex.test(pw);
    if (!isValid) {
      throw new Error("비밀번호에 문자, 숫자, 특수문자를 포함해주세요.");
    }

    // 8자 이상 확인
    if (pw.length < 8) {
      throw new Error("비밀번호는 8자 이상 입력해주세요.");
    }
  };

  const locationValidation = (location: string) => {
    if (location === "default") {
      throw new Error("지점을 선택해주세요.");
    }
  };

  return {
    validateName,
    validateDateFormat,
    emailValidation,
    pwValidation,
    locationValidation,
  };
}
