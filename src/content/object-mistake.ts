import type { FaultTopic, UnitExercise } from "./fault-unit";

export const objectMistakeRevision = "object-mistake-2026-09-14.v1";

// Source keys are scoped to this content pack; older packs keep their sources.
export const objectMistakeSources = {
  law: {
    title: "《刑法》第十四、二百三十四、二百六十四条",
    url: "https://fgk.chinatax.gov.cn/zcfgk/c100009/c5212248/content.html",
    note: "故意、故意伤害和盗窃的条文依据；2026-09-14 核对。认识错误的具体分类属于刑法解释，不能冒充条文原句。",
  },
  intent: {
    title: "中国政法大学法考学院：事实认识错误（一）",
    url: "https://www.cuploeru.com/articles/1497",
    note: "2026-04-15 教材讲解，用于区分对象错误与打击错误；属于教学解释，不是司法解释或官方评分细则。",
  },
};

export const objectMistakeKnowledge = {
  rule: "把面前的丙认成乙并加以侵害，是对象错误。两人同属该罪保护的对象时，认错具体身份通常不排除对丙的故意。要看误认是否改变了犯罪所要求的事实认识。",
  omission:
    "认对了对象却打偏，是打击错误；把他人财物当成自己的拿走，也不能套用‘认错物主不影响故意’。",
};

const personFacts =
  "甲与乙因停车发生争执。几天后，甲在车库看见一人穿着乙常穿的红外套，便跟到楼梯口，喊‘上次的账今天算’，用木棍连续击打其腿部，造成骨折。对方转身后，甲停手问‘你不是乙？’。查明被打者是乙的弟弟丙，当天借穿了乙的外套。";
const personReference =
  "甲对丙受伤具有故意，认错身份不使本次伤害变为过失。跟随、喊话及连续击打腿部支持其追求伤害眼前这个人；事后发现其是丙而非乙，只说明具体身份认错。乙、丙同属故意伤害罪保护的他人身体，没有因此改变伤害他人的事实认识。这是对象错误，不是认对目标却打偏。具体定罪还须审查伤情等其他条件。";

export const objectMistakeCases: { exam: boolean; exercise: UnitExercise }[] = [
  {
    exam: false,
    exercise: {
      id: "object-mistake-person",
      kind: "objective",
      optional: true,
      title: "车库里的红外套",
      facts: personFacts,
      prompt: "甲以‘打的不是乙’为由否认对丙受伤的故意。下列判断正确的是：",
      options: [
        {
          id: "a",
          text: "甲对丙只有过失，因为他事前与丙没有矛盾。",
          explanation:
            "是否与丙有矛盾涉及动机，不能代替甲对眼前这个人实施伤害时的认识和态度。",
        },
        {
          id: "b",
          text: "甲对丙仍有伤害故意，具体身份认错不改变本案判断。",
          explanation:
            "他主动追打的就是丙，只是把丙认成乙；两人都属于伤害罪保护的他人身体。",
        },
        {
          id: "c",
          text: "甲的动作没有打中原定的乙，因此属于打击错误。",
          explanation:
            "甲对眼前对象的身份发生误认，木棍也击中了该对象；并非认对对象后动作打偏。",
        },
      ],
      answer: "b",
      hint: "他击中的，是否就是当时盯住并追打的那个人？",
      reference: personReference,
      sources: ["law", "intent"],
    },
  },
  {
    exam: false,
    exercise: {
      id: "object-mistake-direction",
      kind: "objective",
      optional: true,
      title: "球场边的两起事件",
      facts:
        "球场边发生两起独立事件：甲将穿着乙球衣的丙叫作乙，走到丙面前将其打伤；丁与戊争吵后一直盯着戊，将水瓶掷向戊，瓶子从戊肩旁飞过，击伤身后的己。两人事后都说，受伤的不是原先想找的人。",
      prompt: "只区分错误类型，下列判断正确的是：",
      options: [
        {
          id: "a",
          text: "甲是对象错误，丁是打击错误。",
          explanation:
            "甲认错了眼前对象；丁盯住的是戊，投掷偏离后伤了己。错误发生的位置不同。",
        },
        {
          id: "b",
          text: "甲、丁都是对象错误，因为实际被害人都与原计划不同。",
          explanation:
            "被害人与计划不同并不足以区分类型，还要看是否认错对象，或是实施时发生偏离。",
        },
        {
          id: "c",
          text: "甲是打击错误，丁是对象错误。",
          explanation:
            "甲击中了自己认错的对象；丁没有把己当作戊，题中是投掷方向偏离。",
        },
      ],
      answer: "a",
      hint: "比较行为实施时面对的是谁，以及动作怎样造成结果。",
      reference:
        "甲属于对象错误：将丙认成乙并击中丙。丁属于打击错误：没有认错戊，但投掷偏离而伤己。两种类型不能仅凭‘伤了另一个人’区分。本题只考事实类型；丁对己的罪过及犯罪形态还涉及后续评价，不能从打击错误四个字直接推出唯一责任结论。",
      sources: ["intent"],
    },
  },
  {
    exam: true,
    exercise: {
      id: "object-mistake-camera",
      kind: "objective",
      optional: true,
      title: "寄存柜里的相机",
      facts:
        "摄影活动结束时，甲准备拿走乙的相机出售，按乙上次使用的柜号取走相机，实际该柜已换给丙使用。另一起事件中，丁取回寄存的相机，工作人员核对其寄存凭证后交给他一只同款箱；丁回家开箱发现不是自己的，立即联系归还。",
      prompt: "只判断取走相机当时是否具有盗窃故意，下列说法正确的是：",
      options: [
        {
          id: "a",
          text: "甲、丁都有，因为取走的都是他人的相机。",
          explanation:
            "他人财物被取走是客观事实，还须分别审查两人当时的认识；依凭证领取的经过，支持丁当时误以为拿的是自己的物品。",
        },
        {
          id: "b",
          text: "甲、丁都没有，因为二人都认错了物主。",
          explanation:
            "甲始终是在取走他人的相机出售，把丙的误认成乙的并未消除这一认识。",
        },
        {
          id: "c",
          text: "甲没有，丁有，因为丁发现以后归还也不能改变原来取走的事实。",
          explanation:
            "甲的错误不排除故意；丁是否有故意也不能只看取走结果或事后归还，要结合领取时的凭证与交付经过。",
        },
        {
          id: "d",
          text: "甲有；依本案领取经过，丁当时没有盗窃故意。",
          explanation:
            "甲只认错具体物主；丁凭自己的寄存凭证领取同款箱，支持其当时认为是在取回自己的物品。",
        },
      ],
      answer: "d",
      hint: "同样是认错物主，有人一直知道在拿他人的物品，有人是在领取自己的物品。",
      reference:
        "甲具有盗窃故意：其取走他人相机出售的计划，不因实际物主是丙而改变。丁凭自身寄存凭证领取工作人员交付的同款箱，这段经过支持他当时认为取回的是自己的物品，缺少盗取他人财物的认识和目的。及时联系归还是辅助事实，不能当作判断取走时故意的唯一理由。本题只判断故意；盗窃罪成立及处罚还需审查数额等条件。",
      sources: ["law", "intent"],
    },
  },
  {
    exam: false,
    exercise: {
      id: "object-mistake-person-reason",
      kind: "subjective",
      optional: true,
      title: "红外套：说明理由",
      facts: personFacts,
      prompt:
        "如何评价甲对丙受伤的罪过？认错身份对判断有何影响？请结合案情说明。",
      hint: "把实际击打的对象、具体身份的误认和伤害他人的认识联系起来。",
      reference: personReference,
      criteria: [
        {
          id: "conduct",
          label: "言行支持伤害故意",
          meaning: "跟随、喊话和连续击打腿部，支持甲主动追求伤害眼前这个人。",
          acceptable: "用连贯言行说明有意伤害，不要求照抄术语或全部动作。",
          boundary:
            "不能仅从骨折反推故意，也不能将没有与丙结怨等同于没有伤害故意。",
        },
        {
          id: "identity",
          label: "误认的是具体身份",
          meaning: "甲击中的就是当时追打的丙，只是将丙认作乙；属于对象错误。",
          acceptable: "说明认错人而非打偏，事实关系表达清楚即可。",
          boundary: "不把计划与实际身份不同直接称为打击错误。",
        },
        {
          id: "scope",
          label: "说明不排除故意的范围",
          meaning:
            "乙、丙均属伤害罪保护的他人身体，本次身份误认未消除伤害他人的认识，甲对丙仍有故意。",
          acceptable:
            "结合两人的法律性质和本案伤害行为说明，不强制使用构成要件等措辞。",
          boundary:
            "不能泛化为所有事实错误都不影响故意；不凭此直接补出伤情等级或定罪量刑。",
        },
      ],
      sources: ["law", "intent"],
    },
  },
];

export const objectMistakeTopic: FaultTopic = {
  id: "object-mistake",
  title: "对象错误",
  headline: "认错了谁，是否改变故意？",
  goal: "从案情区分身份误认与打击偏离，判断同类对象误认对故意的影响。",
  prerequisite: "接在故意、过失与意外事件之后。",
  minutes: "8–12",
  paragraphs: [objectMistakeKnowledge.rule, objectMistakeKnowledge.omission],
  example: {
    title: "车库里的红外套",
    facts: personFacts,
    analysis: personReference,
  },
  pitfall: objectMistakeKnowledge.omission,
  recall: {
    prompt: "为什么认错具体身份不一定排除故意？",
    reference:
      "要看错误是否改变了犯罪所要求的事实认识；同类对象的身份误认，与误以为拿的是自己物品，并不相同。",
  },
  sources: ["law", "intent"],
  exercises: objectMistakeCases.map(({ exercise }) => exercise),
};
