import { z } from "zod";

/** 닉네임: 2~16자, 공백 금지, 한글/영문/숫자/._- 만 허용
 *  - 시작/끝 특수문자(._-) 금지
 *  - 특수문자 2개 이상 연속 금지
 */
export const emailSchema = z
  .string()
  .min(1, "이메일을 입력해주세요.")
  .email("이메일 형식이 아닙니다.")
  .transform((v) => v.toLowerCase());

export const nicknameSchema = z
  .string()
  .trim()
  .min(2, "닉네임은 2자 이상이어야 합니다.")
  .max(16, "닉네임은 16자 이하여야 합니다.")
  // 허용 문자만
  .regex(
    /^[A-Za-z0-9가-힣._-]+$/,
    "닉네임은 한글/영문/숫자/._-만 사용할 수 있습니다.",
  )
  // 시작/끝 특수문자 금지
  .refine((v) => !/^[._-]|[._-]$/.test(v), {
    message: "닉네임은 특수문자로 시작하거나 끝날 수 없습니다.",
  })
  // 특수문자 연속 금지
  .refine((v) => !/[._-]{2,}/.test(v), {
    message: "특수문자를 연속해서 사용할 수 없습니다.",
  });

export const contentsSchema = z
  .string()
  .min(2, "설명은 2자 이상이어야 합니다.");

export const formSchema = z.object({
  nickname: nicknameSchema,
  email: emailSchema,
  contents: contentsSchema,
});

export type Form = z.infer<typeof emailSchema>;
