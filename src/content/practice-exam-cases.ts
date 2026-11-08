import type { UnitExercise } from "./fault-unit";

// Authored application exercises. Criminal Law arts. 14–15 checked 2026-09-14.
// These are simulation questions, not reproduced examination questions.
export const practiceExamRevision = "practice-exam-2026-09-14.v1";
export const practiceExamCases: { topicId: string; exercise: UnitExercise }[] =
  [
    {
      topicId: "intent",
      exercise: {
        id: "intent-exam-equipment",
        kind: "objective",
        optional: true,
        title: "设备坠落：区分两个结果",
        facts:
          "甲为报复乙，准备解开固定绳，让乙的设备从高处坠落摔毁。丙正在设备下方作业，丁劝甲停止，指出设备可能砸伤丙。甲看见丙尚未离开，仍说：‘设备必须毁掉，砸到他也无所谓。’甲随即解绳，设备坠落损毁，丙被砸伤。",
        prompt: "仅就甲对设备毁坏和丙受伤的心理态度，下列说法正确的是：",
        options: [
          {
            id: "a",
            text: "对两个结果均为直接故意，因为甲有意解开固定绳。",
            explanation:
              "有意实施动作不能代替对两个结果分别判断；甲追求设备损毁，但没有追求丙受伤。",
          },
          {
            id: "b",
            text: "对设备毁坏为直接故意，对丙受伤为间接故意。",
            explanation:
              "甲追求毁坏设备，且在明知可能砸伤丙的情况下接受受伤结果。",
          },
          {
            id: "c",
            text: "对设备毁坏为直接故意，对丙受伤为过于自信的过失。",
            explanation:
              "案情显示甲接受砸伤丙，未显示他轻信可以避免受伤；不能从不追求受伤直接推导过失。",
          },
          {
            id: "d",
            text: "对设备毁坏为间接故意，对丙受伤为疏忽大意的过失。",
            explanation:
              "设备损毁是甲追求的结果；甲也已经认识到砸伤丙的风险，并非疏忽而未预见。",
          },
        ],
        answer: "b",
        hint: "把设备损毁与人员受伤分开，分别找出甲的认识和态度。",
        reference:
          "甲追求设备损毁，对该结果是直接故意；甲已被提醒并看见丙仍在下方，却表示砸伤也无所谓，对丙受伤是间接故意。同一次解绳行为，对不同结果可以有不同心理态度。本题仅判断主观罪过，具体罪名及其他犯罪成立条件另行审查。",
        sources: ["law"],
      },
    },
    {
      topicId: "confidence",
      exercise: {
        id: "confidence-exam-cart",
        kind: "objective",
        optional: true,
        title: "搬运车：采取措施之后",
        facts:
          "甲驾驶电动搬运车搬运玻璃，发现货架倾斜，预见玻璃可能落下伤人。同事提醒他停车固定。甲凭以往搬运经验，认为降低速度并及时回正即可避免玻璃坠落，遂鸣笛、减速后继续行驶。甲高估了自己的控制能力，玻璃仍坠落砸伤路人。经查，甲当时确实相信这些操作足以避免伤人，并不接受伤人结果。",
        prompt: "关于甲对路人受伤的心理态度，下列说法正确的是：",
        options: [
          {
            id: "a",
            text: "明知有风险还继续行驶，必然属于间接故意。",
            explanation:
              "预见风险并继续行为不能单独证明放任，还要判断是否接受结果。",
          },
          {
            id: "b",
            text: "已经鸣笛并减速，因此不存在主观过错。",
            explanation:
              "采取措施不等于措施足以避免结果；本案明确存在对控制能力的高估和轻信。",
          },
          {
            id: "c",
            text: "已预见风险，却因高估控制能力轻信能避免，属于过于自信的过失。",
            explanation:
              "认识到风险、轻信避免以及不接受结果，与题设查明的心理一致。",
          },
          {
            id: "d",
            text: "没有及时停车，应认定为疏忽大意而没有预见。",
            explanation:
              "甲已经预见玻璃可能伤人，不能把操作上的失误直接等同于没有预见。",
          },
        ],
        answer: "c",
        hint: "分别检查是否预见风险，以及采取措施背后查明的结果态度。",
        reference:
          "甲已经预见玻璃坠落伤人的风险，却高估自身控制能力，轻信鸣笛、减速和回正即可避免，因此对受伤结果是过于自信的过失。既不能只因继续行驶认定故意，也不能只因采取措施排除过失。过失犯罪是否成立仍须结合具体法律规定及其他条件。",
        sources: ["law"],
      },
    },
  ];
