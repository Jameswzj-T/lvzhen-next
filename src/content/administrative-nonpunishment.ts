import type { ContentSources, FaultTopic, UnitExercise } from "./fault-unit";

export const administrativeNonpunishmentRevision =
  "administrative-nonpunishment-2026-10-11.v1";
const topicId = "admin-nonpunishment";
const minorCaseId = "ADMIN-MINOR-NO-HARM-1";
const firstCaseId = "ADMIN-FIRST-MINOR-HARM-1";
const lawUrl =
  "https://scjgj.beijing.gov.cn/cxfw/flfgcxfw/qt/202203/t20220331_2645278.html";

export const administrativeNonpunishmentSources: ContentSources = {
  "admin-nonpunishment-article33": {
    title: "《行政处罚法》第33条：法定不予、初次违法与教育",
    url: lawUrl,
    note: "2026-10-11直接读取北京市市场监督管理局刊载的2021修订全文。2021-01-22修订、2021-07-15施行。第一款第一句原文为‘不予行政处罚’，本单元以‘应当不予’说明其法定效果，不冒称原文含‘应当’二字；第二句为‘可以不予’。第三款规定依法不予时仍应教育，作为讲解补充、不另设必答。第二款无主观过错及特别规定不在本轮练习范围。案例、条件给定和得失点为自编教学内容，非官方试题或阅卷标准。",
  },
  "admin-nonpunishment-effect-directory": {
    title: "现行有效法律目录：行政处罚法2021修订版本",
    url: "https://www.samr.gov.cn/fgs/sjdt/art/2026/art_93a4fbac2ce14ab6baab60b0cd452ef4.html",
    note: "市场监管总局转载中国人大网目录，2026-09-18发布、截至2026-08-28。2026-10-11重读页面标题与截止日，并复用项目2026-10-10已核公开目录条目，行政处罚法列2021修订。网页解析缺段不代表法律失效；未把目录截止日改成今日，也未完成截止日之后全部废改的穷尽清理。",
  },
};

export const administrativeNonpunishmentCaseFacts = {
  [minorCaseId]: [
    "本案为教学虚构。梧页书店漏报了一项按规定应报送的例行经营信息，次日上午自查发现后即补齐报送。主管机关核对接收记录、后续办理情况和相关材料，确认没有耽误后续办理，也没有造成他人损失或其他危害后果。书店以前曾有同类违法记录。",
    "本题给定：该漏报依法构成行政违法，主管机关有权处理；本次违法行为已经依法认定为轻微，补报属于及时改正，没有造成危害后果，且本次不属于初次违法。这里不要求你另行认定行业报送义务、轻微程度或初次违法的口径，只按《行政处罚法》第33条第1款判断。",
  ].join("\n\n"),
  [firstCaseId]: [
    "本案为另一独立教学虚构。青禾公司没有按规定更新一项应向服务对象公开的办理信息，两名服务对象照旧信息前来，因而各多跑了一趟。公司发现后立即更新信息，并逐一通知已预约的服务对象。主管机关调查了信息发布记录、相关人员说明和整改情况。",
    "本题给定：该行为依法构成行政违法，主管机关有权处理；这是公司初次违法，已经发生的危害后果依法认定为轻微，更新和通知属于及时改正。危害后果确已发生，不能因后来改正就视为从未发生。这里仅按《行政处罚法》第33条第1款判断，不另考具体行业义务、轻微尺度、地方裁量基准或其他不予处罚事由。",
  ].join("\n\n"),
};

const sources = ["admin-nonpunishment-article33"];
export const administrativeNonpunishmentExercises: UnitExercise[] = [
  {
    id: "admin-minor-no-harm-choice",
    caseId: minorCaseId,
    relatedTopicIds: [topicId],
    kind: "objective",
    choiceMode: "single",
    title: "不是第一次，就一定要罚吗？",
    facts: administrativeNonpunishmentCaseFacts[minorCaseId],
    prompt: "按题设已经确定的条件，以下判断哪项正确？",
    options: [
      {
        id: "a",
        text: "不是初次违法，就必须给予行政处罚。",
        explanation:
          "轻微、及时改正且没有危害后果这一法定不予情形，不以初次违法为条件。",
      },
      {
        id: "b",
        text: "应当不予行政处罚；本题满足的这组条件不要求初次违法。",
        explanation:
          "违法行为轻微、及时改正、无危害后果均已给定，适用第33条第1款第一句。",
      },
      {
        id: "c",
        text: "只能从轻或减轻处罚，不能不予处罚。",
        explanation: "题设满足法定不予条件，不能仅按从轻或者减轻处罚处理。",
      },
      {
        id: "d",
        text: "只要后来补报了，不论是否轻微、是否有危害，都不予处罚。",
        explanation:
          "及时改正只是条件之一，不能删掉违法行为轻微和没有危害后果。",
      },
    ],
    answer: "b",
    hint: "分清两句规定各自要求哪些条件，不要只盯着是否第一次。",
    reference:
      "选B。本次违法轻微、已及时改正且没有危害后果，适用法定不予行政处罚。该情形没有初次违法要求，既往记录不能成为本题排除不予处罚的理由；也不能推广成只要改正就一律不罚。",
    sources: [...sources],
  },
  {
    id: "admin-minor-no-harm-explain",
    caseId: minorCaseId,
    relatedTopicIds: [topicId],
    kind: "subjective",
    title: "有既往记录，还能适用不予处罚吗？",
    facts: administrativeNonpunishmentCaseFacts[minorCaseId],
    prompt:
      "有人认为：‘书店不是初次违法，所以即使本次轻微、已及时改正且没有危害后果，也不能不予处罚。’这一说法能否成立？请结合本次行为的条件说明应如何适用第33条第1款。",
    hint: "把本次已确定的三个条件与‘不是初次’分别放回对应规则。",
    reference:
      "不能成立。本次违法行为轻微、已及时改正且没有造成危害后果，依法不予行政处罚。第33条第1款第一句不要求初次违法，因此本题给定的非初次，并不排除适用这一情形。",
    criteria: [
      {
        id: "minor-no-harm-conditions",
        label: "联系本次轻微、改正与无危害",
        meaning:
          "结合题设本次违法轻微、及时改正且没有危害后果，说明满足法定不予行政处罚的条件和效果。",
        acceptable:
          "‘这次事情轻微，已经及时补好，也没造成危害，所以依法不罚’可表达完整含义；不要求照抄法条。",
        boundary:
          "只说已经补报，不能替代另外两个条件；只说‘可以考虑少罚’未表达本项法定不予效果。一段综合论证可同时承接两项，不强制独立结论句、条号或行业证据再认定。",
      },
      {
        id: "not-first-is-not-exclusion",
        label: "不把初次要求加到这一情形",
        meaning:
          "说明上述法定不予情形不要求初次违法，故不能仅凭本题给定的不是初次而否定不予处罚。",
        acceptable:
          "‘以前犯过不改变这次已满足的这组条件，初次不是这句话的门槛，所以那种说法不对’可以。",
        boundary:
          "不要求定义所有行业的初次违法口径，不需逐句比较第二句，也不要求教育措施、罚款金额或救济。不得扩大成重复违法一概不罚。",
      },
    ],
    sources: [...sources],
  },
  {
    id: "admin-first-minor-harm-choice",
    caseId: firstCaseId,
    relatedTopicIds: [topicId],
    kind: "objective",
    choiceMode: "single",
    title: "初次、后果轻微、及时改正意味着什么？",
    facts: administrativeNonpunishmentCaseFacts[firstCaseId],
    prompt: "只根据第33条第1款和题设，下列哪项最准确？",
    options: [
      {
        id: "a",
        text: "第一次违法，就必然不予行政处罚。",
        explanation: "既删掉其他条件，又把‘可以不予’改成自动保证不罚。",
      },
      {
        id: "b",
        text: "及时改正等于没有造成危害后果，因此必须按第一句不罚。",
        explanation: "题设明确轻微后果已经发生，改正不能把历史后果抹去。",
      },
      {
        id: "c",
        text: "满足初次违法、后果轻微并及时改正的条件，可以不予处罚，但不能由此断言必然不罚。",
        explanation:
          "对应第二句的条件和‘可以’效果，具体裁量须依法作出，本问不预定最终处理。",
      },
      {
        id: "d",
        text: "既然已经有危害后果，就不能适用任何第33条第1款的不予情形。",
        explanation:
          "第二句允许危害后果轻微，并非要求所有不予情形都必须完全无后果。",
      },
    ],
    answer: "c",
    hint: "‘没有后果’和‘后果轻微’不同；再看这句规定的法律效果。",
    reference:
      "选C。题设初次违法、危害后果轻微且及时改正，对应可以不予行政处罚。已经发生轻微后果，不宜改写成第一句的没有危害后果；‘可以’也不是必然不罚或者必须处罚。",
    sources: [...sources],
  },
  {
    id: "admin-first-minor-harm-explain",
    caseId: firstCaseId,
    relatedTopicIds: [topicId],
    kind: "subjective",
    title: "公司能要求一定不罚吗？",
    facts: administrativeNonpunishmentCaseFacts[firstCaseId],
    prompt:
      "公司说：‘这是第一次，后果轻微，我们也及时改了，所以依法一定不能处罚。’请说明本案对应第33条第1款的哪种情形，并判断这句‘一定不能处罚’是否成立。无需替机关决定具体罚不罚或罚多少。",
    hint: "先联系三个给定条件，再区别‘可以不予’与‘必然不予’。",
    reference:
      "本案属于初次违法、危害后果轻微并及时改正，可以不予行政处罚的情形。公司的三个条件与第二句对应，但‘可以不予’并不保证一定不罚；不能仅据这些条件就要求机关必须不予，也不能反过来预定必须处罚。",
    criteria: [
      {
        id: "first-minor-harm-conditions",
        label: "联系初次、轻微后果和及时改正",
        meaning:
          "联系公司初次违法、已发生但轻微的危害后果以及及时改正，识别对应第二句可以不予处罚的情形。",
        acceptable:
          "‘它第一次违法，造成的影响轻微并且及时纠正，落在可以不罚的那一类’足以承接本项。",
        boundary:
          "不能把已发生轻微后果写成没有后果，也不能仅凭第一次就认定符合全部条件。无需额外要求违法行为本身轻微，不要求另逐项反驳第一句或重作行业事实证明。",
      },
      {
        id: "may-is-not-must",
        label: "可以不罚，不等于保证不罚",
        meaning:
          "说明‘可以不予’不是必然不予，因此公司的‘一定不能处罚’不能由这组条件直接推出；本问不要求决定具体裁量结果。",
        acceptable:
          "‘这些条件给了依法不罚的可能，但不是只要符合就必须免罚，不能保证最后一定不罚’可以；与前项合写可同时成立。",
        boundary:
          "不得把‘可以’说成随意处理，也不预定必须处罚、罚款数额或地方清单结果。不要求固定措辞、条号、教育或其他责任作为额外得失点。",
      },
    ],
    sources: [...sources],
  },
];

export const administrativeNonpunishmentTopics: FaultTopic[] = [
  {
    id: topicId,
    title: "法定不予处罚与初次违法",
    headline: "不是所有第一次都不罚，也不是有过记录就一定要罚。",
    goal: "结合给定条件，分清法定不予处罚与可以不予处罚，不替材料不足的案件预定裁量结果。",
    prerequisite:
      "知道违法成立与最后是否给予行政处罚是两个需要分别判断的问题。",
    minutes: "8–12",
    paragraphs: [
      "先看本次行为：违法轻微、及时改正、没有造成危害后果，三项同时满足，依法不予行政处罚。这一情形没有‘初次违法’要求，不能仅因以前有记录就排除。只满足及时改正，也不能直接推成不罚。",
      "再看另一种情形：初次违法，危害后果轻微，并且及时改正，可以不予行政处罚。‘后果轻微’不同于‘没有后果’；‘可以不予’也不同于保证不罚。具体处理仍应依法裁量，既不预定必须处罚，也不是任意选择。",
      "不予处罚不等于认定行为从未违法。依法不予时，机关仍应对当事人进行教育。本节把违法性、轻微程度、初次和及时改正作为已确定的题设前提，不教统一金额、时限或跨行业的初次认定标准；无主观过错等其他不予事由留待后续。",
    ],
    example: {
      title: "先配条件，再判断法律效果",
      facts: administrativeNonpunishmentCaseFacts[minorCaseId],
      analysis:
        "书店这次轻微、及时改正而且无危害，应当不予处罚；不是初次并不排除第一句。若另案给的是初次、已有轻微危害并及时改正，则对应第二句的可以不予，不能照搬必然不罚。",
    },
    pitfall:
      "给第一句偷偷加上‘第一次’，或把第二句的‘可以’读成‘一定’，再用后来改正抹掉已经发生的轻微后果。",
    recall: {
      prompt:
        "违法轻微、及时改正且无危害，和初次违法、后果轻微且及时改正，两种情形的法律效果有何不同？",
      reference:
        "前者依法不予处罚，不要求初次；后者可以不予处罚，不能保证不罚。改正不能把已经发生的轻微后果改成没有后果。",
    },
    sources: Object.keys(administrativeNonpunishmentSources),
    exercises: administrativeNonpunishmentExercises,
  },
];
export const administrativeNonpunishmentChapter = {
  id: "ADMIN-ADMINISTRATIVE-ACTIONS",
  title: "行政行为基础",
  section: "行政法",
  topicIds: [topicId],
};
export const administrativeNonpunishmentContentPack = {
  revision: administrativeNonpunishmentRevision,
  snapshot: {
    topics: administrativeNonpunishmentTopics,
    sources: administrativeNonpunishmentSources,
  },
};
export const administrativeNonpunishmentDefaultQueues = {
  objective: administrativeNonpunishmentExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: administrativeNonpunishmentExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export const administrativeNonpunishmentPublicRules = [
  {
    sourceId: "admin-nonpunishment-article33",
    title: "第33条第1款：两种不予处罚情形（教学摘要，非逐字原文）",
    url: lawUrl,
    excerpt:
      "违法行为轻微、及时改正且没有危害后果的，不予行政处罚；初次违法、危害后果轻微并及时改正的，可以不予行政处罚。第一种情形不以初次为条件，第二种情形不表示自动保证不罚。",
    checkedAt: "2026-10-11",
    scope:
      "2021修订文本第1款；不提供行业轻微标准、初次认定口径或具体裁量结果。",
  },
];
