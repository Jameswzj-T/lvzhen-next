import type { ContentSources, FaultTopic, UnitExercise } from "./fault-unit";

export const administrativeHearingRevision =
  "administrative-hearing-2026-10-11.v1";

export const administrativeHearingSources: ContentSources = {
  "admin-hearing-article63": {
    title: "《行政处罚法》第63条：听证范围、组织与费用",
    url: "https://scjgj.beijing.gov.cn/cxfw/flfgcxfw/qt/202203/t20220331_2645278.html",
    note: "2026-10-11直接读取北京市市场监督管理局公开2021修订全文，第63条明列吊销许可证件等类型，当事人要求听证时机关应组织，且当事人不承担组织听证费用。本组给定处罚类型与机关权限，不展开罚款量化阈值、最终处罚实体正确性或撤销/无效后果。",
  },
  "admin-hearing-articles64-85": {
    title: "《行政处罚法》第64、85条：申请、事前通知与工作日",
    url: "https://scjgj.beijing.gov.cn/cxfw/flfgcxfw/qt/202203/t20220331_2645278.html",
    note: "同次直读第64条第1/2项及85条：告知后五日内提出申请，举行听证七日前通知时间地点；法中五日、七日为工作日，不含法定节假日。文本第86条载2021-07-15施行。只考本组明确申请与通知场景，不展开回避、缺席、保密与全部组织程序。案例和要求均自编。",
  },
};

export const administrativeHearingCaseFacts = {
  "ADMIN-HEARING-REQUEST-1":
    "本案为独立教学虚构。星禾印务公司因被调查的经营行为，收到有权行政机关发出的处罚事先告知书，拟作出的处罚是吊销该公司持有的一项经营许可证。拟处罚类型、机关权限与告知送达本身无争议，书面告知载有要求听证的权利。公司在收到告知后的第2个工作日明确提出听证申请，没有撤回或放弃。\n\n此前调查人员曾在办公室听取公司负责人半小时口头申辩，做了申辩记录，但没有组织过听证。机关准备拒绝这次申请，理由是“该说的已经让你说过，拿原来的申辩记录再看看就行，不必另开听证”。本问只判断申请范围、期限及该拒绝理由，不判断最终是否应当吊销或其他救济。",
  "ADMIN-HEARING-NOTICE-COST-1":
    "本案为另一独立教学虚构。有权行政机关拟对杉原培训公司作出吊销经营许可证的行政处罚，已经告知听证权利，公司在法定期限内提出了申请。机关决定组织听证，并在举行听证前仅2个工作日，首次通知公司听证的时间、地点；此前没有另行提前通知，公司也没有申请改期或改变该安排。\n\n通知同时要求公司先缴纳800元，明确这是行政机关组织这次听证的场地、记录费用，不是公司自行聘请律师的费用；不缴就不安排参加。公司对此提出异议。本问仅检查事前通知时间和这项费用要求，不评价调查结论、其他听证环节或最终处罚的效力。",
};

export const administrativeHearingExercises: UnitExercise[] = [
  {
    id: "admin-hearing-request-choice",
    hint: "先看拟处罚类型和提出申请的时间，再区分申辩与听证。",
    caseId: "ADMIN-HEARING-REQUEST-1",
    relatedTopicIds: ["admin-penalty-hearing"],
    kind: "objective",
    title: "听过申辩，还可以拒绝听证申请吗？",
    facts:
      "本案为独立教学虚构。星禾印务公司因被调查的经营行为，收到有权行政机关发出的处罚事先告知书，拟作出的处罚是吊销该公司持有的一项经营许可证。拟处罚类型、机关权限与告知送达本身无争议，书面告知载有要求听证的权利。公司在收到告知后的第2个工作日明确提出听证申请，没有撤回或放弃。\n\n此前调查人员曾在办公室听取公司负责人半小时口头申辩，做了申辩记录，但没有组织过听证。机关准备拒绝这次申请，理由是“该说的已经让你说过，拿原来的申辩记录再看看就行，不必另开听证”。本问只判断申请范围、期限及该拒绝理由，不判断最终是否应当吊销或其他救济。",
    prompt: "对星禾公司申请及机关拟拒绝的理由，哪项判断正确？",
    answer: "b",
    reference:
      "选B。拟吊销许可证件属于法定听证范围，告知后第2个工作日申请也在五个工作日以内。此前只听过申辩不能代替听证，公司依法要求后，机关应当组织。",
    sources: ["admin-hearing-article63", "admin-hearing-articles64-85"],
    choiceMode: "single",
    options: [
      {
        id: "a",
        text: "只要之前听过口头申辩，就不再需要组织听证。",
        explanation: "陈述申辩与本案依法申请的听证不同，前者不替代后者。",
      },
      {
        id: "b",
        text: "本次属于听证范围且申请及时，机关不能仅因曾听取申辩就拒绝组织。",
        explanation: "吊销许可、及时申请均有题述事实，机关应组织听证。",
      },
      {
        id: "c",
        text: "听证只适用于罚款，吊销许可证不属于听证范围。",
        explanation: "第63条明确列有吊销许可证件。",
      },
      {
        id: "d",
        text: "提出听证申请就证明公司没有违法，机关必须终止处罚。",
        explanation: "程序权利和最终实体判断不同。",
      },
    ],
  },
  {
    id: "admin-hearing-request-explain",
    hint: "先看拟处罚类型和提出申请的时间，再区分申辩与听证。",
    caseId: "ADMIN-HEARING-REQUEST-1",
    relatedTopicIds: ["admin-penalty-hearing"],
    kind: "subjective",
    title: "区分申辩与依法申请的听证",
    facts:
      "本案为独立教学虚构。星禾印务公司因被调查的经营行为，收到有权行政机关发出的处罚事先告知书，拟作出的处罚是吊销该公司持有的一项经营许可证。拟处罚类型、机关权限与告知送达本身无争议，书面告知载有要求听证的权利。公司在收到告知后的第2个工作日明确提出听证申请，没有撤回或放弃。\n\n此前调查人员曾在办公室听取公司负责人半小时口头申辩，做了申辩记录，但没有组织过听证。机关准备拒绝这次申请，理由是“该说的已经让你说过，拿原来的申辩记录再看看就行，不必另开听证”。本问只判断申请范围、期限及该拒绝理由，不判断最终是否应当吊销或其他救济。",
    prompt:
      "本次拟处罚是否属于听证范围，公司申请是否及时？机关能否仅因已经听过口头申辩而拒绝组织听证？请结合题设说明。",
    answer: "",
    reference:
      "拟吊销许可证件属于听证范围；公司于告知后第2个工作日提出，未超过五个工作日的申请期限。公司依法要求后机关应组织听证，原先的口头申辩及其记录不能替代该程序。是否最终吊销仍应依法决定。",
    sources: ["admin-hearing-article63", "admin-hearing-articles64-85"],
    criteria: [
      {
        id: "hearing-request-conditions",
        label: "联系处罚类型及申请时间",
        meaning:
          "说明拟吊销许可证件属于听证范围，告知后第2个工作日申请在法定五个工作日内。",
        acceptable:
          "“要吊销许可证本来就可申请听证，公司第2个工作日就提出，也来得及”即可；不要求背出所有处罚类型、条号或独立重复五日数字。",
        boundary:
          "仅说当事人有权申辩不等于说明听证范围；不额外考较大罚款地方阈值。",
      },
      {
        id: "hearing-not-replaced-by-defense",
        label: "说明应组织且申辩不能替代",
        meaning:
          "联系公司及时明确要求、未放弃而此前只有申辩，说明机关应组织听证，不能只拿旧申辩记录替代或拒绝。",
        acceptable:
          "“听过说明和正式听证不是一回事，这次依法申请了还得组织”可表达；不要求具体主持或笔录细则。",
        boundary:
          "如果认为听过申辩便可不组织，与本点相反；不要求推断处罚必撤销、当然无效、违法不成立或必须免罚。",
      },
    ],
  },
  {
    id: "admin-hearing-notice-cost-choice",
    hint: "把提前通知与费用分开核对，注意申请和通知是不同环节。",
    caseId: "ADMIN-HEARING-NOTICE-COST-1",
    relatedTopicIds: ["admin-penalty-hearing"],
    kind: "objective",
    title: "只提前两天通知，还要先交听证费？",
    facts:
      "本案为另一独立教学虚构。有权行政机关拟对杉原培训公司作出吊销经营许可证的行政处罚，已经告知听证权利，公司在法定期限内提出了申请。机关决定组织听证，并在举行听证前仅2个工作日，首次通知公司听证的时间、地点；此前没有另行提前通知，公司也没有申请改期或改变该安排。\n\n通知同时要求公司先缴纳800元，明确这是行政机关组织这次听证的场地、记录费用，不是公司自行聘请律师的费用；不缴就不安排参加。公司对此提出异议。本问仅检查事前通知时间和这项费用要求，不评价调查结论、其他听证环节或最终处罚的效力。",
    prompt: "只对本案两项安排，下列哪项正确？",
    answer: "c",
    reference:
      "选C。听证时间、地点应提前七个工作日通知，本案仅2个工作日不足；组织听证费用不应由当事人承担，不能以未交这800元拒绝安排参加。",
    sources: ["admin-hearing-article63", "admin-hearing-articles64-85"],
    choiceMode: "single",
    options: [
      {
        id: "a",
        text: "两项都合法，申请听证者自行承担时间与费用安排。",
        explanation: "当事人申请不免除法定通知期限和费用规则。",
      },
      {
        id: "b",
        text: "只要不收费，两天通知必然足够。",
        explanation: "免除组织费用不补足事前通知期限。",
      },
      {
        id: "c",
        text: "通知提前量不足，且不得要求公司承担这笔组织听证费用。",
        explanation:
          "两个独立要求分别对应七个工作日提前通知与当事人不承担组织费用。",
      },
      {
        id: "d",
        text: "有这两项问题就已证明公司从未违法，实体处罚必须永久取消。",
        explanation: "程序安排错误不直接证明实体违法事实不存在。",
      },
    ],
  },
  {
    id: "admin-hearing-notice-cost-explain",
    hint: "把提前通知与费用分开核对，注意申请和通知是不同环节。",
    caseId: "ADMIN-HEARING-NOTICE-COST-1",
    relatedTopicIds: ["admin-penalty-hearing"],
    kind: "subjective",
    title: "分别检查通知与组织费用",
    facts:
      "本案为另一独立教学虚构。有权行政机关拟对杉原培训公司作出吊销经营许可证的行政处罚，已经告知听证权利，公司在法定期限内提出了申请。机关决定组织听证，并在举行听证前仅2个工作日，首次通知公司听证的时间、地点；此前没有另行提前通知，公司也没有申请改期或改变该安排。\n\n通知同时要求公司先缴纳800元，明确这是行政机关组织这次听证的场地、记录费用，不是公司自行聘请律师的费用；不缴就不安排参加。公司对此提出异议。本问仅检查事前通知时间和这项费用要求，不评价调查结论、其他听证环节或最终处罚的效力。",
    prompt:
      "本案仅提前2个工作日通知时间、地点是否符合要求？要求公司先缴800元组织听证费，否则不安排参加，是否合适？请分别说明。",
    answer: "",
    reference:
      "不符合。行政机关应在举行听证的七个工作日前通知时间、地点，本案只提前2个工作日不足。该800元明确为行政机关组织听证的费用，当事人不承担，不能以拒交这笔费用阻止参加。这里只说明两项程序要求，不据此直接判断最终处罚必然无效或公司无违法。",
    sources: ["admin-hearing-article63", "admin-hearing-articles64-85"],
    criteria: [
      {
        id: "hearing-notice-time",
        label: "联系本案判断事前通知期限",
        meaning:
          "说明应在举行听证的七个工作日前通知时间、地点，本案首次通知只提前2个工作日不足。",
        acceptable:
          "“应提前七个工作日让公司知道时间地点，只给两天不够”即可，条号与逐字复述不要求。",
        boundary:
          "不能把申请五日与通知七日混同，或将本条七日理解为包含法定节假日；不考其他送达细则。",
      },
      {
        id: "hearing-organization-cost",
        label: "区分组织听证费用与自选服务费用",
        meaning:
          "联系800元明示为机关组织听证的场地记录费用，说明当事人不承担，不能以未付此费拒绝安排参加。",
        acceptable:
          "“这是机关办听证的钱，不能让公司先交了才让参加”即可；题设律师费排除无需再主动展开。",
        boundary:
          "不要求将一切法律服务费用都说成免费；不隐含要求论证处罚无效、撤销、国家赔偿或最终事实结论。",
      },
    ],
  },
];

export const administrativeHearingTopics: FaultTopic[] = [
  {
    id: "admin-penalty-hearing",
    title: "行政处罚听证申请与组织",
    headline: "申辩不替代听证；申请、通知和费用各有要求。",
    goal: "识别明确听证范围内的及时申请，并核对事前通知与组织费用。",
    prerequisite:
      "知道决定前应告知并听取陈述申辩，程序机会不直接决定最终处罚结果。",
    minutes: "8–12",
    paragraphs: [
      "拟作出吊销许可证件等法定类型处罚时，机关应告知听证权。当事人在告知后五个工作日内要求听证，机关应依法组织。此前已经口头或书面申辩，不等于已经进行听证，不能以此一概拒绝。",
      "机关应在举行听证的七个工作日前，通知当事人及有关人员时间、地点。五日申请与七日事前通知是不同环节；这些期间按工作日计算，不含法定节假日。",
      "当事人不承担行政机关组织听证的费用，不能要求先交这笔钱才安排参加。这不等于自行聘请律师等全部费用都免费。本单元只练明确的吊销许可、申请、通知与组织费用，不据程序问题直接宣布最终处罚当然无效或当事人必然无违法。",
    ],
    example: {
      title: "听过申辩，还可以拒绝听证申请吗？",
      facts:
        "本案为独立教学虚构。星禾印务公司因被调查的经营行为，收到有权行政机关发出的处罚事先告知书，拟作出的处罚是吊销该公司持有的一项经营许可证。拟处罚类型、机关权限与告知送达本身无争议，书面告知载有要求听证的权利。公司在收到告知后的第2个工作日明确提出听证申请，没有撤回或放弃。\n\n此前调查人员曾在办公室听取公司负责人半小时口头申辩，做了申辩记录，但没有组织过听证。机关准备拒绝这次申请，理由是“该说的已经让你说过，拿原来的申辩记录再看看就行，不必另开听证”。本问只判断申请范围、期限及该拒绝理由，不判断最终是否应当吊销或其他救济。",
      analysis:
        "选B。拟吊销许可证件属于法定听证范围，告知后第2个工作日申请也在五个工作日以内。此前只听过申辩不能代替听证，公司依法要求后，机关应当组织。",
    },
    pitfall: "把听过申辩当听证已经办完，或把五日申请、七日通知及费用混成一项。",
    recall: {
      prompt: "申请听证与机关通知分别是什么期限？组织费用由当事人承担吗？",
      reference:
        "通常告知后五个工作日内申请，机关在听证七个工作日前通知时间地点；当事人不承担机关组织听证的费用。申请后仍须依法组织，旧申辩记录不替代。",
    },
    sources: ["admin-hearing-article63", "admin-hearing-articles64-85"],
    exercises: administrativeHearingExercises,
  },
];
export const administrativeHearingChapter = {
  id: "ADMINISTRATIVE-HEARING",
  title: "行政处罚听证",
  section: "行政法",
  topicIds: ["admin-penalty-hearing"],
};
export const administrativeHearingContentPack = {
  revision: administrativeHearingRevision,
  snapshot: {
    topics: administrativeHearingTopics,
    sources: administrativeHearingSources,
  },
};
export const administrativeHearingDefaultQueues = {
  objective: administrativeHearingExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: administrativeHearingExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function administrativeHearingQuestion(id: string) {
  const q = administrativeHearingExercises.find((q) => q.id === id);
  return q ? structuredClone(q) : undefined;
}
export function administrativeHearingTopicForQuestion(id: string) {
  const t = administrativeHearingTopics.find((t) =>
    t.exercises.some((q) => q.id === id),
  );
  return t ? structuredClone(t) : undefined;
}
export function administrativeHearingSameCaseQuestions(id: string) {
  const q = administrativeHearingQuestion(id);
  return q
    ? structuredClone(
        administrativeHearingExercises.filter((x) => x.caseId === q.caseId),
      )
    : [];
}
export const administrativeHearingPublicRules = [
  {
    sourceId: "admin-hearing-article63",
    title: "第63条：法定听证与组织费用（教学摘要）",
    url: "https://scjgj.beijing.gov.cn/cxfw/flfgcxfw/qt/202203/t20220331_2645278.html",
    excerpt:
      "拟吊销许可证件等法定类型处罚，应告知听证权；当事人要求听证，机关应组织。当事人不承担行政机关组织听证的费用。此前申辩不等同已经组织听证。",
    checkedAt: "2026-10-11",
    scope: "法定吊销许可场景与组织费用，不含具体案例、参考答或最终处罚效力。",
  },
  {
    sourceId: "admin-hearing-articles64-85",
    title: "第64、85条：两种期间（教学摘要）",
    url: "https://scjgj.beijing.gov.cn/cxfw/flfgcxfw/qt/202203/t20220331_2645278.html",
    excerpt:
      "当事人应在告知后五日内提出听证要求；机关应在举行听证七日前通知时间地点。上述五日、七日为工作日，不含法定节假日。",
    checkedAt: "2026-10-11",
    scope: "申请与事前通知的基础期限，不含本题结论或全部听证程序。",
  },
];
