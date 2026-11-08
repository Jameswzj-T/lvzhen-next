import type { FaultTopic, UnitExercise } from "./fault-unit";

export const blowMistakeRevision = "blow-mistake-2026-09-14.v1";

export const blowMistakeSources = {
  law: {
    title: "《中华人民共和国刑法》",
    url: "https://fgk.chinatax.gov.cn/zcfgk/c100009/c5212248/content.html",
    note: "2026-09-14 核对第十四至十六、二十三、二百三十二至二百三十五、二百七十五条；两种符合说属于解释观点，并非条文逐项规定。",
  },
  intent: {
    title: "中国政法大学法考学院：事实认识错误（二）",
    url: "https://wlkt.cuploeru.com/article/1494",
    note: "教材讲解，用于比较法定符合说与具体符合说；不是司法解释或官方评分细则。过失须另按刑法第十五条审查，不能由错误类型直接推出。",
  },
};

export const blowMistakeKnowledge = {
  rule: "认对了目标，实施时却偏离并伤及其他对象，是打击错误。同一犯罪构成范围内，法定符合说可认定对实际结果有故意；具体符合说不将对原定对象的故意直接用于另一对象。答题按题目指定的观点分析。",
  omission:
    "过失要另查注意义务和预见可能性；毁坏财物的故意不能直接当作伤人的故意。认错眼前对象并打中，则是对象错误。",
};

const warehouseFacts =
  "甲向乙索债，二人争吵后乙转身离开。甲跟到仓库门口，举枪朝乙胸部射击。乙侧身躲开，子弹击中门侧货架后的丙，丙当场死亡，乙没有受伤。监控显示，丙此前一直在货架后整理货物，甲开枪时看不到丙。";
const statutoryReference =
  "甲追上乙并朝其胸部射击，支持对乙的杀人故意；认出的目标是乙，射击却偏离并致丙死亡，属于打击错误。依法定符合说，原定侵害乙的生命与实际造成丙死亡，没有超出故意杀人罪的构成要件范围，可认定甲对丙死亡有故意。没有看见丙，不是本说排除故意的充分理由。本题只评价对丙死亡的罪过，不展开罪数或枪支犯罪。";
const concreteReference =
  "这是打击错误，甲没有把丙认成乙。依具体符合说，甲针对的是乙，丙并不在其具体侵害对象的认识范围内，不能把对乙的杀人故意直接用于丙死亡。对丙是否成立过失致人死亡，还要审查当时的注意义务及预见可能性；看不到丙，既不证明一定有过失，也不证明不可能预见。甲对乙已经着手杀人，因乙躲开而未得逞，属故意杀人未遂。";

export const blowMistakeCases: { exam: boolean; exercise: UnitExercise }[] = [
  {
    exam: false,
    exercise: {
      id: "blow-mistake-statutory",
      kind: "objective",
      optional: true,
      title: "仓库门口的一枪",
      facts: warehouseFacts,
      prompt: "依据法定符合说，仅判断甲对丙死亡的罪过，下列说法正确的是：",
      options: [
        {
          id: "a",
          text: "丙不在甲的视野内，甲对丙死亡的罪过只能按过失评价。",
          explanation:
            "这忽略了法定符合说在同一犯罪构成范围内评价故意的立场；过失也须单独审查。",
        },
        {
          id: "b",
          text: "原定与实际侵害均为他人生命，甲对丙死亡有故意。",
          explanation:
            "对乙的杀人故意与造成丙死亡，在故意杀人罪的构成要件范围内相符。",
        },
        {
          id: "c",
          text: "甲认错了被害人的身份，应按对象错误认定对丙的故意。",
          explanation:
            "甲追击的对象是乙，没有把丙认成乙；此处是实行偏离的打击错误。",
        },
      ],
      answer: "b",
      hint: "区分具体身份与故意杀人罪保护的生命，按本题指定观点评价。",
      reference: statutoryReference,
      sources: ["law", "intent"],
    },
  },
  {
    exam: false,
    exercise: {
      id: "blow-mistake-concrete",
      kind: "objective",
      optional: true,
      title: "同一案情：具体符合说",
      facts: warehouseFacts,
      prompt: "改依具体符合说，关于甲对丙死亡的罪过，下列说法正确的是：",
      options: [
        {
          id: "a",
          text: "乙与丙都是人，甲对丙死亡仍具有杀人故意。",
          explanation:
            "这是法定符合说在本案中的理由，不能直接替代题目指定的具体符合说。",
        },
        {
          id: "b",
          text: "甲没有看见丙，丙死亡属于不能预见的意外事件。",
          explanation:
            "实际没有看见不等于无法预见风险，仍须审查当时的环境和注意义务。",
        },
        {
          id: "c",
          text: "不能将针对乙的杀人故意用于丙死亡；有无过失还需另行审查。",
          explanation:
            "具体符合说区分具体侵害对象；排除对丙死亡的故意，不等于已证明过失或意外。",
        },
      ],
      answer: "c",
      hint: "本题改变的是评价观点，案情没有改变。没有故意以后还需要判断什么？",
      reference: concreteReference,
      sources: ["law", "intent"],
    },
  },
  {
    exam: true,
    exercise: {
      id: "blow-mistake-camera",
      kind: "objective",
      optional: true,
      title: "院内的摄影机",
      facts:
        "甲与乙因借用摄影器材发生争执。乙离开后，甲走入院落，搬起一块石头朝乙架设的摄影机砸去。石头从机身旁飞过，穿过虚掩的后门，击中在门后整理器材的丙，造成重伤。摄影机没有损坏。门板遮住了丙，甲所在位置看不到丙。",
      prompt: "依据法定符合说，关于甲对丙重伤的罪过，下列判断正确的是：",
      options: [
        {
          id: "a",
          text: "实行行为虽有偏离，故意毁坏摄影机仍足以认定故意伤害丙。",
          explanation:
            "毁坏财物与伤害身体不在同一犯罪构成范围内，不能据法定符合说直接将前一种故意用于后一结果。",
        },
        {
          id: "b",
          text: "原来针对财物，实际伤到人，属于对象错误，应按过失伤害评价。",
          explanation:
            "对象性质不同不等于对象错误。甲朝摄影机砸去，石头偏离后击中丙；过失也不能仅凭错误类型认定。",
        },
        {
          id: "c",
          text: "门板遮住了丙，足以认定甲对丙重伤不存在罪过。",
          explanation:
            "遮挡说明当时看不到人，不能单凭这一点排除对门后有人及砸击风险的预见可能性。",
        },
        {
          id: "d",
          text: "毁坏摄影机的故意不足以认定伤害丙的故意，是否存在过失须另查。",
          explanation:
            "这里跨越财产与身体两类犯罪构成；应另查伤人风险的认识、注意义务和预见可能性。",
        },
      ],
      answer: "d",
      hint: "法定符合说要求在相应犯罪构成范围内相符，并非把任何故意用于任何结果。",
      reference:
        "甲搬石头朝乙的摄影机砸去，支持毁坏财物的故意；石头偏离后伤及门后的丙，是打击错误。毁坏财物与伤害身体并非同一犯罪构成，不能仅凭毁财故意认定对丙重伤有伤害故意。过失责任须进一步审查甲是否应当且能够预见伤人风险，以及有无其他相关过错；门板遮挡本身不足以认定无罪过。本题不据现有事实强判过失或意外，也不展开毁财未遂的处罚问题。",
      sources: ["law", "intent"],
    },
  },
  {
    exam: false,
    exercise: {
      id: "blow-mistake-warehouse-reason",
      kind: "subjective",
      optional: true,
      title: "仓库门口：说明理由",
      facts: warehouseFacts,
      prompt:
        "甲的行为属于哪种错误？分别依法定符合说、具体符合说，说明甲对丙死亡的罪过如何评价。",
      hint: "先用案情区分认错与打偏，再分别说明两种观点；过失不要省略成立条件。",
      reference:
        "甲追击乙、朝乙胸部开枪，支持对乙的杀人故意；子弹偏离后击中丙，是打击错误。法定符合说关注同一犯罪构成内的符合：乙、丙均是故意杀人罪保护的生命，可认定对丙死亡有故意。具体符合说关注具体侵害对象：不能把针对乙的故意直接用于丙死亡；对丙是否有过失，还须核实注意义务与预见可能性。两种观点应分别说明，不能将其中一种的理由当作另一种。",
      criteria: [
        {
          id: "deviation",
          label: "从案情认定打击错误",
          meaning: "甲针对乙开枪，子弹偏离伤及丙，没有把丙认成乙。",
          acceptable: "说明目标与实行偏离即可，不要求重复全部案情。",
          boundary: "不能把被害人不同直接叫作对象错误。",
        },
        {
          id: "statutory",
          label: "法定符合说下的故意",
          meaning:
            "朝乙胸部开枪支持杀人故意；乙、丙的生命同属故意杀人罪构成要件保护的对象，依法定符合说对丙死亡有故意。",
          acceptable: "说明同一犯罪构成内相符及本案结论，允许自然语言表述。",
          boundary:
            "不能仅因丙死亡反推故意，也不能泛化为伤到任何对象都成立同一种故意。",
        },
        {
          id: "concrete",
          label: "具体符合说与过失条件",
          meaning:
            "具体符合说不将对乙的故意用于未在具体认识范围内的丙；过失须另外审查注意义务和预见可能性。",
          acceptable:
            "说明对丙无故意及过失须符合条件，不要求给出题目未提供的调查结论。",
          boundary: "不因属于打击错误就径认过失，也不因没看见丙就径认意外。",
        },
      ],
      sources: ["law", "intent"],
    },
  },
];

export const blowMistakeTopic: FaultTopic = {
  id: "blow-mistake",
  title: "打击错误",
  headline: "认对目标，却伤及另一对象",
  goal: "辨别实行偏离，并按指定观点评价实际结果的罪过。",
  prerequisite: "接在对象错误之后。",
  minutes: "8–12",
  paragraphs: [blowMistakeKnowledge.rule, blowMistakeKnowledge.omission],
  example: {
    title: "仓库门口的一枪",
    facts: warehouseFacts,
    analysis: statutoryReference,
  },
  pitfall: blowMistakeKnowledge.omission,
  recall: {
    prompt: "为什么同一案情在两种符合说下结论可能不同？",
    reference:
      "两说对故意所需的符合范围判断不同；先说明采用的观点，不能由错误类型直接推导过失。",
  },
  sources: ["law", "intent"],
  exercises: blowMistakeCases.map(({ exercise }) => exercise),
};
