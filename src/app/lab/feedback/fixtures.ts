export const facts =
  "甲为使乙的一块白色布样留下无法清除的色斑，向它喷墨。已查明甲知道墨水可能永久染坏布样，也可能被洗净；他正是希望布样永久损坏才喷墨。布样最终永久损坏。";
export const prompt =
  "只分析甲喷墨时对布样永久损坏的心理，分别说明认识、态度与罪过类别。并说明是否必须确信损坏必然发生。";
export const answers = [
  "他明白可能染坏，喷墨就是冲着永久弄坏去的，是追求损坏的那种故意；不需要认定一定染坏。",
  "他知道可能染坏，也希望弄坏。但直接故意必须知道一定发生，所以这里只能算间接故意。",
  "直接故意。",
];
export const feedback = [
  {
    text: "你把可能损坏、希望损坏和类别联系起来，也说明不要求结果必然发生。",
    issue: "本次回答覆盖要点，没有实质问题。",
    term: "可用“直接故意”作规范名称，无需为此重写。",
    action: "结束本次练习",
    evidence: [
      ["他明白可能染坏", "认识：已表达"],
      ["喷墨就是冲着永久弄坏去的", "态度：已表达"],
      ["是追求损坏的那种故意", "类别：已表达"],
      ["不需要认定一定染坏", "概率规则：已表达"],
    ],
  },
  {
    text: "认识和态度已写出，但必然性门槛与本题依据冲突，导致类别判断错误。",
    issue: "重新说明是否必须确信一定损坏，再联系已写出的态度得出类别。",
    term: "当前先订正实质问题，无额外术语要求。",
    action: "订正概率规则",
    evidence: [
      ["他知道可能染坏", "认识：已表达"],
      ["也希望弄坏", "态度：已表达"],
      ["直接故意必须知道一定发生", "概率规则：存在冲突"],
      ["所以这里只能算间接故意", "类别：存在冲突"],
    ],
  },
  {
    text: "类别已写对；还没有说明认识、态度以及是否要求结果必然发生。",
    issue: "用一句话把认识、态度与是否必然发生连起来。",
    term: "“直接故意”名称已表达，无需更换术语。",
    action: "补充理由",
    evidence: [["直接故意。", "类别：已表达"]],
  },
];
export const editExample = "我想再补充一句理由。";
export const clarificationQuestion = "请说明你想补充的是哪一处理由。";
export const uncertainReason =
  "这是一条用于检查不确定状态展示的示例，不作法律判断。";
export const scenarios = [
  "CD-1 · 口语正确",
  "CD-2 · 局部矛盾",
  "CD-3 · 理由不足",
  "未作答",
  "等待 / 取消",
  "系统失败",
  "澄清（界面示意）",
  "暂停",
  "结束",
  "超时（界面示意）",
  "暂不能确认（uncertain · 界面示意）",
];
export type Phase =
  | "feedback"
  | "editing"
  | "waiting"
  | "unreviewed"
  | "error"
  | "clarification"
  | "paused"
  | "finished"
  | "cancelled"
  | "timeout"
  | "uncertain";
export function scenarioState(index: number): { draft: string; phase: Phase } {
  return {
    draft:
      index === 3
        ? ""
        : index === 6 || index === 10
          ? editExample
          : answers[index < 3 ? index : 0],
    phase:
      index < 3
        ? "feedback"
        : (
            [
              "editing",
              "waiting",
              "error",
              "clarification",
              "paused",
              "finished",
              "timeout",
              "uncertain",
            ] as Phase[]
          )[index - 3],
  };
}
