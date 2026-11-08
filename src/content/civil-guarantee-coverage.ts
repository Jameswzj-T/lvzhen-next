import type { ContentSources, FaultTopic } from "./fault-unit";

// Original fictional cases. Paired forms share facts, not independent outcomes.
export const civilGuaranteeCoverageRevision =
  "civil-guarantee-coverage-2026-10-23.v1";

export const civilGuaranteeCoverageSources: ContentSources = {
  "civil-guarantee-coverage-period692": {
    title: "《民法典》第692条：未约定及与主债务同时届满的保证期间",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23实际读取北京市政府民法典全文第691—695条；页面2020-06-02发布，法典2020-05-28通过、2021-01-01施行。只考主债务履行期限明确的普通保证，未约定或与主债务同时届满的保证期间；不考最长期间、未定主债务期限或特殊保证。保证期间不等于诉讼时效。",
  },
  "civil-guarantee-coverage-exercise693": {
    title: "《民法典》第692—694条：保证期间内的行使方式",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读。一般保证须在保证期间对债务人起诉或申请仲裁，不能以仅向保证人催信替代；连带责任保证须在保证期间向保证人请求承担责任。两案避开届满临界日、没有其他异常抗辩，不把催告写成保证期间中断或重新计算，不另核诉讼时效具体届满日。",
  },
  "civil-guarantee-coverage-scope691": {
    title: "《民法典》第691条：法定保证范围与另行约定",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读。以已确认合法且实际发生的主债务本金、利息及实现债权费用作比较；无另约按法定范围，明确仅保本金时依约。两案保证有效、请求在保证期间内，仅问保证范围，不重判利率合法性、费用数额或公司担保决议。",
  },
  "civil-guarantee-coverage-change695": {
    title: "《民法典》第695条：未经书面同意的主债数额变更",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读。两案均为原买卖合同同一批货的价款协商变更，无新债替换、期限变化或保证人另行同意；减轻按变更后债务，增加部分不担保。保证范围明确仅本金，不扩展债权转让、债务转移或物保放弃。",
  },
  "civil-guarantee-coverage-security-order392": {
    title: "《民法典》第392、688条：物保与保证并存的实现顺序",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23实际读取北京市政府所载民法典全文目标条文及版本信息；2020-05-28公布、2021-01-01施行，页面2020-06-02发布并标示有效。顺序未约或不明时，区分债务人自己提供物保与第三人提供物保。两案保证合同均明确为连带责任保证，给定到期未还与一年保证期间内的请求日期，只考物保与保证的实现顺序，不混入一般保证先诉抗辩。",
  },
  "civil-guarantee-coverage-security-recourse392700": {
    title: "《民法典》第392、700条：担保人承担责任后向主债务人追偿",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23实际读取北京市政府所载民法典全文目标条文及版本信息；2020-05-28公布、2021-01-01施行，页面2020-06-02发布并标示有效。保证人依700条在实际承担保证责任的范围内追偿；第三人物保承担后依392条向主债务人追偿。两案只问已代偿、已抵债的本金，不按保证名义上限、财产估值或原债务总额扩大，不讨论担保人相互分担或新增利息费用。",
  },
};

export const civilGuaranteeCoverageTopics: FaultTopic[] = [
  {
    id: "civil-guarantee-period-default",
    title: "未约定或同时届满的保证期间",
    headline:
      "没约定保证期间，按主债务到期起六个月；约定与主债务同时届满，也按未约定处理。",
    goal: "保证期间未写或与主债务同日届满，如何处理？",
    prerequisite:
      "知道保证是为他人的债务提供担保，能区分一般保证和连带责任保证。",
    minutes: "6–10",
    paragraphs: [
      "保证期间是确定保证人是否继续承担保证责任的期间，不是普通债权诉讼时效。主债务履行期限明确而未约定保证期间时，按主债务到期起六个月。",
      "保证期间约定早于主债务履行期限，或者与主债务同时届满，视为没有约定。不能用这类约定让保证在债务刚到期时就当然消失。",
    ],
    example: {
      title: "保证合同中的空白栏目",
      facts:
        "本案为原创教学虚构。2025年，许禾向朋友陆宁借款4万元，钱已收到，约定3月10日到期。沈川与陆宁订立有效书面保证合同，保证方式已明确，但保证期间一栏留空，其他条款和补充协议也未约定保证期间。陆宁认为普通债权诉讼时效通常是三年，所以沈川至少应从主债务到期后继续保证三年。本题只确定保证期间的起点和时长。",
      analysis:
        "保证期间从主债务履行期限届满之日起算六个月，也就是以约定的3月10日到期为起点。双方没有约定保证期间，适用法定六个月。保证期间不是诉讼时效，不能直接套成三年。",
    },
    pitfall:
      "把保证期间直接套成诉讼时效三年，或者认为保证日与到期日相同就立即完全免责。",
    recall: {
      prompt: "保证期间未写或与主债务同日届满，如何处理？",
      reference:
        "没约定保证期间，按主债务到期起六个月；约定与主债务同时届满，也按未约定处理。",
    },
    sources: ["civil-guarantee-coverage-period692"],
    exercises: [
      {
        caseId: "civil-guarantee-coverage-period-not-agreed",
        relatedTopicIds: ["civil-guarantee-period-default"],
        facts:
          "本案为原创教学虚构。2025年，许禾向朋友陆宁借款4万元，钱已收到，约定3月10日到期。沈川与陆宁订立有效书面保证合同，保证方式已明确，但保证期间一栏留空，其他条款和补充协议也未约定保证期间。陆宁认为普通债权诉讼时效通常是三年，所以沈川至少应从主债务到期后继续保证三年。本题只确定保证期间的起点和时长。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        reference:
          "保证期间从主债务履行期限届满之日起算六个月，也就是以约定的3月10日到期为起点。双方没有约定保证期间，适用法定六个月。保证期间不是诉讼时效，不能直接套成三年。",
        sources: ["civil-guarantee-coverage-period692"],
        id: "civil-guarantee-coverage-period-not-agreed-choice",
        kind: "objective",
        choiceMode: "single",
        title: "保证合同中的空白栏目：选择判断",
        prompt: "这份合同的保证期间应如何确定？",
        options: [
          {
            id: "a",
            text: "从签保证合同之日起三年",
            explanation: "保证期间的法定起点和时长不是签约起三年。",
          },
          {
            id: "b",
            text: "从主债务履行期限届满之日起六个月",
            explanation: "没有约定保证期间，按第692条处理。",
          },
          {
            id: "c",
            text: "从主债务履行期限届满之日起三年",
            explanation: "混淆保证期间与诉讼时效。",
          },
          {
            id: "d",
            text: "没有写保证期间，保证人就永远不再负责",
            explanation: "未约定适用法定期间，不是永远免责或永久担保。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-guarantee-coverage-period-not-agreed",
        relatedTopicIds: ["civil-guarantee-period-default"],
        facts:
          "本案为原创教学虚构。2025年，许禾向朋友陆宁借款4万元，钱已收到，约定3月10日到期。沈川与陆宁订立有效书面保证合同，保证方式已明确，但保证期间一栏留空，其他条款和补充协议也未约定保证期间。陆宁认为普通债权诉讼时效通常是三年，所以沈川至少应从主债务到期后继续保证三年。本题只确定保证期间的起点和时长。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        reference:
          "保证期间从主债务履行期限届满之日起算六个月，也就是以约定的3月10日到期为起点。双方没有约定保证期间，适用法定六个月。保证期间不是诉讼时效，不能直接套成三年。",
        sources: ["civil-guarantee-coverage-period692"],
        id: "civil-guarantee-coverage-period-not-agreed-written",
        kind: "subjective",
        title: "保证合同中的空白栏目：写出分析",
        prompt:
          "本案保证期间从何时起算、持续多久？陆宁直接套用三年的想法是否正确？",
        criteria: [
          {
            id: "guarantee-default692",
            label: "法定期间及起点",
            meaning:
              "联系未约定保证期间、主债务3月10日到期，说明自履行期限届满起六个月，不能直接按诉讼时效三年。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或法条编号。",
            boundary:
              "说清起点和六个月即已表达与三年的区别，不要求另算具体截止日或重复一句否定。",
          },
        ],
      },
      {
        caseId: "civil-guarantee-coverage-period-same-day",
        relatedTopicIds: ["civil-guarantee-period-default"],
        facts:
          "本案为原创教学虚构。顾林向邹青借款3万元，约定2025年4月15日到期，钱已实际交付。林栩签订有效书面保证合同，保证条款写“保证期间至2025年4月15日止”，与主债务到期日相同，没有其他期间约定。主债务到期未还。林栩主张既然约定的保证日当天已经过去，次日自己就完全没有保证责任。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        reference:
          "林栩不能这样主张。保证期间与主债务履行期限同时届满，法律按没有约定保证期间处理，应从主债务4月15日到期起算六个月，而不是次日就当然免责。",
        sources: ["civil-guarantee-coverage-period692"],
        id: "civil-guarantee-coverage-period-same-day-choice",
        kind: "objective",
        choiceMode: "single",
        title: "两项期限写在同一天：选择判断",
        prompt: "对这项保证期间约定，应怎样处理？",
        options: [
          {
            id: "a",
            text: "按一天也没有保证责任处理",
            explanation:
              "与主债务同时届满的保证期间视为未约定，不使保证立即消失。",
          },
          {
            id: "b",
            text: "主债务没有归还，保证自动变成永久有效",
            explanation: "期间规则不取决于债务人是否一直不还。",
          },
          {
            id: "c",
            text: "保证合同整体当然无效",
            explanation: "期间约定按未约定处理，不使保证合同整体当然无效。",
          },
          {
            id: "d",
            text: "该期间视为未约定，适用主债务到期起六个月",
            explanation: "第692条对与主债务同时届满有明确处理。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-guarantee-coverage-period-same-day",
        relatedTopicIds: ["civil-guarantee-period-default"],
        facts:
          "本案为原创教学虚构。顾林向邹青借款3万元，约定2025年4月15日到期，钱已实际交付。林栩签订有效书面保证合同，保证条款写“保证期间至2025年4月15日止”，与主债务到期日相同，没有其他期间约定。主债务到期未还。林栩主张既然约定的保证日当天已经过去，次日自己就完全没有保证责任。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        reference:
          "林栩不能这样主张。保证期间与主债务履行期限同时届满，法律按没有约定保证期间处理，应从主债务4月15日到期起算六个月，而不是次日就当然免责。",
        sources: ["civil-guarantee-coverage-period692"],
        id: "civil-guarantee-coverage-period-same-day-written",
        kind: "subjective",
        title: "两项期限写在同一天：写出分析",
        prompt:
          "林栩能否仅因两个日期相同，就认为次日起完全没有保证责任？本案保证期间应怎样确定？",
        criteria: [
          {
            id: "guarantee-sameday692",
            label: "同时届满的处理",
            meaning:
              "联系两项期限同为4月15日，说明保证期间视为未约定、适用主债务到期起六个月，不是次日即免责。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或法条编号。",
            boundary:
              "不要求重新审查保证效力、精算截止时分或判断尚未发生的请求是否及时。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-guarantee-period-exercise",
    title: "保证期间内的行使方式",
    headline:
      "一般保证看期间内是否对债务人起诉或仲裁；连带保证看是否向保证人请求承担责任。",
    goal: "保证期间内，债权人应当对谁采取什么行动？",
    prerequisite:
      "知道保证是为他人的债务提供担保，能区分一般保证和连带责任保证。",
    minutes: "6–10",
    paragraphs: [
      "一般保证中，债权人应在保证期间内对债务人提起诉讼或申请仲裁；只给保证人发催告函，不能代替这一要求。连带责任保证中，应在保证期间内向保证人请求承担责任。",
      "保证期间不发生中止、中断和延长。按相应保证方式及时行使后，再区分后续诉讼时效；不能把及时请求解释为保证期间被重新延长，也不能认为任何保证都必须在该期间内起诉保证人。",
    ],
    example: {
      title: "催告函与九月的请求",
      facts:
        "本案为原创教学虚构。梁禾向沈序借款5万元，2025年1月10日到期。顾宁签署书面一般保证合同，双方没有约定保证期间，合同均有效。6月15日，沈序给顾宁送达催告函，请他承担保证责任，顾宁确认收到。此后直到9月，沈序从未对梁禾提起诉讼或申请仲裁，也没有主债务诉讼正在进行。9月沈序首次起诉顾宁，称6月的催告让保证期间重新计算，自己仍可要求顾宁负责。",
      analysis:
        "不能，顾宁已不再承担本案保证责任。未约定期间，适用主债务到期起六个月；沈序在这段期间内只催告顾宁，却没有起诉或申请仲裁债务人梁禾，未按一般保证的要求行使权利。保证期间也不会因这封催告函重新计算。",
    },
    pitfall:
      "将一般保证、连带保证的行使对象混为一谈，或把催告写成保证期间重新计算。",
    recall: {
      prompt: "保证期间内，债权人应当对谁采取什么行动？",
      reference:
        "一般保证看期间内是否对债务人起诉或仲裁；连带保证看是否向保证人请求承担责任。",
    },
    sources: ["civil-guarantee-coverage-exercise693"],
    exercises: [
      {
        caseId: "civil-guarantee-coverage-general-letter-only",
        relatedTopicIds: ["civil-guarantee-period-exercise"],
        facts:
          "本案为原创教学虚构。梁禾向沈序借款5万元，2025年1月10日到期。顾宁签署书面一般保证合同，双方没有约定保证期间，合同均有效。6月15日，沈序给顾宁送达催告函，请他承担保证责任，顾宁确认收到。此后直到9月，沈序从未对梁禾提起诉讼或申请仲裁，也没有主债务诉讼正在进行。9月沈序首次起诉顾宁，称6月的催告让保证期间重新计算，自己仍可要求顾宁负责。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        reference:
          "不能，顾宁已不再承担本案保证责任。未约定期间，适用主债务到期起六个月；沈序在这段期间内只催告顾宁，却没有起诉或申请仲裁债务人梁禾，未按一般保证的要求行使权利。保证期间也不会因这封催告函重新计算。",
        sources: ["civil-guarantee-coverage-exercise693"],
        id: "civil-guarantee-coverage-general-letter-only-choice",
        kind: "objective",
        choiceMode: "single",
        title: "催告函与九月的请求：选择判断",
        prompt: "仅按本案保证期间及行使方式，应怎样判断顾宁的责任？",
        options: [
          {
            id: "a",
            text: "顾宁不再承担保证责任，仅催告保证人未替代期间内对债务人起诉或仲裁",
            explanation:
              "一般保证须采取第693条要求的行使方式，保证期间不因催函重新计算。",
          },
          {
            id: "b",
            text: "顾宁仍应负责，任何催信都使保证期间重新算六个月",
            explanation: "保证期间不发生中止、中断或延长。",
          },
          {
            id: "c",
            text: "顾宁仍应负责，只要主债务没还就没有期间限制",
            explanation: "主债务尚未履行不排除保证期间规则。",
          },
          {
            id: "d",
            text: "顾宁不负责，只因为一般保证在任何情况下都完全免责",
            explanation:
              "一般保证不是永远免责，本案原因是没有在期间内按法定方式行使。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-guarantee-coverage-general-letter-only",
        relatedTopicIds: ["civil-guarantee-period-exercise"],
        facts:
          "本案为原创教学虚构。梁禾向沈序借款5万元，2025年1月10日到期。顾宁签署书面一般保证合同，双方没有约定保证期间，合同均有效。6月15日，沈序给顾宁送达催告函，请他承担保证责任，顾宁确认收到。此后直到9月，沈序从未对梁禾提起诉讼或申请仲裁，也没有主债务诉讼正在进行。9月沈序首次起诉顾宁，称6月的催告让保证期间重新计算，自己仍可要求顾宁负责。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        reference:
          "不能，顾宁已不再承担本案保证责任。未约定期间，适用主债务到期起六个月；沈序在这段期间内只催告顾宁，却没有起诉或申请仲裁债务人梁禾，未按一般保证的要求行使权利。保证期间也不会因这封催告函重新计算。",
        sources: ["civil-guarantee-coverage-exercise693"],
        id: "civil-guarantee-coverage-general-letter-only-written",
        kind: "subjective",
        title: "催告函与九月的请求：写出分析",
        prompt:
          "6月的催告函能否保留顾宁的保证责任至9月？请结合一般保证的行使方式和本案时间说明。",
        criteria: [
          {
            id: "guarantee-general-result",
            label: "期间届满后的责任",
            meaning:
              "认定6月催函不能保留本案保证责任，顾宁在本案期间届满后不再承担保证责任。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或法条编号。",
            boundary: "不把一般保证一概视为无责任，也不要求另算具体截止日。",
          },
          {
            id: "guarantee-general-method",
            label: "一般保证的行使方式",
            meaning:
              "联系只向保证人催告、六个月内未对梁禾起诉或仲裁，说明方式不符，催函不使保证期间重新计算。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或法条编号。",
            boundary:
              "表达“要在期间内告债务人，仅找保证人不够”即可，不要求额外讨论先诉抗辩例外或其他时效。",
          },
        ],
      },
      {
        caseId: "civil-guarantee-coverage-joint-timely-request",
        relatedTopicIds: ["civil-guarantee-period-exercise"],
        facts:
          "本案为原创教学虚构。何宁向周澈借款6万元，2025年1月10日到期。宋林签署有效书面连带责任保证合同，双方未约定保证期间。2月1日，周澈向宋林送达书面请求，明确要求其承担连带保证责任、偿还这6万元，宋林当日收到。9月1日周澈起诉宋林，主债务仍未归还。宋林仅以起诉时已经超过主债务到期后六个月为由要求免除保证责任，没有其他抗辩争议。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        reference:
          "宋林不能仅凭这个理由免责。连带责任保证要求债权人在保证期间内向保证人请求承担责任，周澈2月已经明确提出并送达，时间在六个月内。9月才起诉，不会抹掉此前的及时请求；这也不是保证期间被催告重新延长，后续诉讼时效按其规则另行计算。",
        sources: ["civil-guarantee-coverage-exercise693"],
        id: "civil-guarantee-coverage-joint-timely-request-choice",
        kind: "objective",
        choiceMode: "single",
        title: "请求付款与起诉的先后：选择判断",
        prompt: "宋林能否仅凭起诉时间超过六个月而免责？",
        options: [
          {
            id: "a",
            text: "可以，任何保证都必须在六个月内完成起诉",
            explanation:
              "连带责任保证在期间内请求保证人承担责任即可，不限于起诉方式。",
          },
          {
            id: "b",
            text: "可以，向保证人请求付款在任何保证中都没有意义",
            explanation: "连带保证期间内的请求是第693条认可的行使方式。",
          },
          {
            id: "c",
            text: "不可以，周澈已在保证期间内请求其承担连带保证责任",
            explanation:
              "2月的明确请求及时，9月起诉不能仅因原六个月过去而免责。",
          },
          {
            id: "d",
            text: "不可以，因为保证期间从2月起无限次自动延长",
            explanation: "及时请求的效果不能说成保证期间自动延长。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-guarantee-coverage-joint-timely-request",
        relatedTopicIds: ["civil-guarantee-period-exercise"],
        facts:
          "本案为原创教学虚构。何宁向周澈借款6万元，2025年1月10日到期。宋林签署有效书面连带责任保证合同，双方未约定保证期间。2月1日，周澈向宋林送达书面请求，明确要求其承担连带保证责任、偿还这6万元，宋林当日收到。9月1日周澈起诉宋林，主债务仍未归还。宋林仅以起诉时已经超过主债务到期后六个月为由要求免除保证责任，没有其他抗辩争议。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        reference:
          "宋林不能仅凭这个理由免责。连带责任保证要求债权人在保证期间内向保证人请求承担责任，周澈2月已经明确提出并送达，时间在六个月内。9月才起诉，不会抹掉此前的及时请求；这也不是保证期间被催告重新延长，后续诉讼时效按其规则另行计算。",
        sources: ["civil-guarantee-coverage-exercise693"],
        id: "civil-guarantee-coverage-joint-timely-request-written",
        kind: "subjective",
        title: "请求付款与起诉的先后：写出分析",
        prompt:
          "宋林的这一免责理由能否成立？2月的请求与9月的起诉分别有什么作用？",
        criteria: [
          {
            id: "guarantee-joint-result",
            label: "及时请求后的保证责任",
            meaning: "认定宋林不能仅以9月起诉超过原六个月为由免责。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或法条编号。",
            boundary: "只判断这项抗辩，不要求将保证责任等同已经完成执行。",
          },
          {
            id: "guarantee-joint-method",
            label: "连带保证的行使方式",
            meaning:
              "联系2月已向宋林明确请求承担保证责任并送达，说明在保证期间内行使，不必在该期间内另行完成起诉。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或法条编号。",
            boundary:
              "不强求背诵诉讼时效起点条号或计算时效届满日，不认可把效果说成保证期间无限延长。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-guarantee-scope",
    title: "保证范围与明确限缩约定",
    headline:
      "没有另约时按法定范围；明确只保本金时按约定，主债务与保证范围要分开。",
    goal: "利息和实现债权费用是否都由保证人承担？",
    prerequisite:
      "知道保证是为他人的债务提供担保，能区分一般保证和连带责任保证。",
    minutes: "6–10",
    paragraphs: [
      "保证范围通常包括主债权及其利息、违约金、损害赔偿金和实现债权的费用。当事人有其他约定的，按约定确定。",
      "明确只保本金、排除其他款项时，不能机械地把法定列举全部加回。未进入保证范围，不等于债务人对债权人的相关债务也消失。",
    ],
    example: {
      title: "欠款与实现债权的费用",
      facts:
        "本案为原创教学虚构。买方杨舒欠卖方庄晏设备货款10万元。江禾与庄晏签署有效的连带责任保证合同，为本笔债务提供保证，但未另外限制保证范围。债务到期未付，庄晏已在保证期间内向江禾请求承担责任。现已依法确认：主债务另应支付利息2000元、为实现本债权实际发生的费用1000元，上述金额和合法性均无争议。江禾主张自己只应保证10万元本金，其他两项一律不在范围内。",
      analysis:
        "江禾不能把这两项都排除。双方没有另约保证范围，法定范围包括主债权及其利息、实现债权的费用等。因此，本案10万元本金、已确认的2000元利息和1000元实现债权费用，都在保证范围内。",
    },
    pitfall:
      "把法定范围当成不能缩小的强制清单，或把保证人不担理解成债务人也不欠。",
    recall: {
      prompt: "利息和实现债权费用是否都由保证人承担？",
      reference:
        "没有另约时按法定范围；明确只保本金时按约定，主债务与保证范围要分开。",
    },
    sources: ["civil-guarantee-coverage-scope691"],
    exercises: [
      {
        caseId: "civil-guarantee-coverage-scope-no-other-agreement",
        relatedTopicIds: ["civil-guarantee-scope"],
        facts:
          "本案为原创教学虚构。买方杨舒欠卖方庄晏设备货款10万元。江禾与庄晏签署有效的连带责任保证合同，为本笔债务提供保证，但未另外限制保证范围。债务到期未付，庄晏已在保证期间内向江禾请求承担责任。现已依法确认：主债务另应支付利息2000元、为实现本债权实际发生的费用1000元，上述金额和合法性均无争议。江禾主张自己只应保证10万元本金，其他两项一律不在范围内。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        reference:
          "江禾不能把这两项都排除。双方没有另约保证范围，法定范围包括主债权及其利息、实现债权的费用等。因此，本案10万元本金、已确认的2000元利息和1000元实现债权费用，都在保证范围内。",
        sources: ["civil-guarantee-coverage-scope691"],
        id: "civil-guarantee-coverage-scope-no-other-agreement-choice",
        kind: "objective",
        choiceMode: "single",
        title: "欠款与实现债权的费用：选择判断",
        prompt: "仅看本案保证范围，哪项正确？",
        options: [
          {
            id: "a",
            text: "只包括10万元本金，因为所有保证天然都排除利息和费用",
            explanation:
              "无另约时，第691条法定范围包括主债权及利息、实现债权费用等。",
          },
          {
            id: "b",
            text: "包括本金及题述已确认的利息、实现债权费用",
            explanation: "未另约缩小范围，题述三项均可纳入。",
          },
          {
            id: "c",
            text: "只包括利息，不包括主债权本金",
            explanation: "保证范围包括主债权本身。",
          },
          {
            id: "d",
            text: "保证人只要愿意担保，债权人的一切个人开销都要承担",
            explanation: "实现债权费用应关联本债权，不能扩成任何个人开销。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-guarantee-coverage-scope-no-other-agreement",
        relatedTopicIds: ["civil-guarantee-scope"],
        facts:
          "本案为原创教学虚构。买方杨舒欠卖方庄晏设备货款10万元。江禾与庄晏签署有效的连带责任保证合同，为本笔债务提供保证，但未另外限制保证范围。债务到期未付，庄晏已在保证期间内向江禾请求承担责任。现已依法确认：主债务另应支付利息2000元、为实现本债权实际发生的费用1000元，上述金额和合法性均无争议。江禾主张自己只应保证10万元本金，其他两项一律不在范围内。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        reference:
          "江禾不能把这两项都排除。双方没有另约保证范围，法定范围包括主债权及其利息、实现债权的费用等。因此，本案10万元本金、已确认的2000元利息和1000元实现债权费用，都在保证范围内。",
        sources: ["civil-guarantee-coverage-scope691"],
        id: "civil-guarantee-coverage-scope-no-other-agreement-written",
        kind: "subjective",
        title: "欠款与实现债权的费用：写出分析",
        prompt:
          "江禾能否把已确认的2000元利息和1000元实现债权费用都排除？请说明本案保证范围。",
        criteria: [
          {
            id: "guarantee-scope-statutory",
            label: "无另约时的保证范围",
            meaning:
              "联系未限制保证范围，认定题述本金、利息和实现债权费用均被覆盖。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或法条编号。",
            boundary:
              "不要求另答未出现的违约金、损害赔偿或计算总额，不重判题设已确认的利率和费用合法性。",
          },
        ],
      },
      {
        caseId: "civil-guarantee-coverage-scope-principal-only",
        relatedTopicIds: ["civil-guarantee-scope"],
        facts:
          "本案为原创教学虚构。卢青欠宋宁一笔8万元货款，杜森在有效书面保证合同中明确约定“仅对这8万元本金承担连带保证责任，不承担利息、违约金及实现债权的费用”。到期后卢青未付，宋宁在保证期间内向杜森主张本金8万元、已依法确认的利息1500元和实现债权费用500元，称法律列有利息和费用，所以合同中的范围限制一概无效。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        reference:
          "不能要求杜森额外承担。本案明确约定只保证8万元本金，法律允许另约保证范围，应按该约定处理。利息和费用仍可能是卢青自己的债务，但不因此自动进入杜森已经限定的保证范围。",
        sources: ["civil-guarantee-coverage-scope691"],
        id: "civil-guarantee-coverage-scope-principal-only-choice",
        kind: "objective",
        choiceMode: "single",
        title: "保证合同的范围条款：选择判断",
        prompt: "仅看本案保证范围，杜森应按哪项承担？",
        options: [
          {
            id: "a",
            text: "本金、利息、费用全包括，保证范围不能约定",
            explanation: "第691条允许当事人另行约定保证范围。",
          },
          {
            id: "b",
            text: "全部免除，因为合同排除了利息就没有保证",
            explanation: "限制保证范围不等于保证整体失效。",
          },
          {
            id: "c",
            text: "只承担利息和费用，本金留给债务人",
            explanation: "与明确的仅保本金约定相反。",
          },
          {
            id: "d",
            text: "按约只承担8万元本金，额外两项不在本次保证内",
            explanation: "明确范围约定优先适用，债务人自身的其他义务另论。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-guarantee-coverage-scope-principal-only",
        relatedTopicIds: ["civil-guarantee-scope"],
        facts:
          "本案为原创教学虚构。卢青欠宋宁一笔8万元货款，杜森在有效书面保证合同中明确约定“仅对这8万元本金承担连带保证责任，不承担利息、违约金及实现债权的费用”。到期后卢青未付，宋宁在保证期间内向杜森主张本金8万元、已依法确认的利息1500元和实现债权费用500元，称法律列有利息和费用，所以合同中的范围限制一概无效。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        reference:
          "不能要求杜森额外承担。本案明确约定只保证8万元本金，法律允许另约保证范围，应按该约定处理。利息和费用仍可能是卢青自己的债务，但不因此自动进入杜森已经限定的保证范围。",
        sources: ["civil-guarantee-coverage-scope691"],
        id: "civil-guarantee-coverage-scope-principal-only-written",
        kind: "subjective",
        title: "保证合同的范围条款：写出分析",
        prompt:
          "宋宁能否要求杜森额外承担题述利息和费用？这与卢青自身是否欠这些款有什么区别？",
        criteria: [
          {
            id: "guarantee-scope-agreed",
            label: "明确约定的范围",
            meaning:
              "联系仅保本金并排除利息费用的条款，认定杜森只担8万元本金。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或法条编号。",
            boundary:
              "不要求背出全部法定范围；不能以法定范围为由否认有效的缩小约定。",
          },
          {
            id: "guarantee-scope-separation",
            label: "主债务与保证范围的区别",
            meaning: "说明未纳入保证范围不等于卢青的利息费用债务被免除。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或法条编号。",
            boundary:
              "可用“其余仍找卢青，而不是找杜森”表达，不要求讨论另案诉讼程序。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-guarantee-debt-change",
    title: "主债数额变更与保证责任",
    headline:
      "未经书面同意减轻债务，按减轻后负责；增加债务，增加部分不担保，原责任不当然消失。",
    goal: "主债数额改变后，保证人承担多少？",
    prerequisite:
      "知道保证是为他人的债务提供担保，能区分一般保证和连带责任保证。",
    minutes: "6–10",
    paragraphs: [
      "债权人与债务人未经保证人书面同意，协商减轻债务的，保证人仍对变更后的债务承担保证责任。原本应付10万元减为8万元，不能再要求保证人付原来已减掉的部分。",
      "未经保证人书面同意加重债务的，保证人对增加部分不承担保证责任，原责任仍须分别判断。这里仅改变同笔主债数额，不把债务转移或以新债替换原债混在一起。",
    ],
    example: {
      title: "设备价款下调之后",
      facts:
        "本案为原创教学虚构。顾澈向林书购买一台设备，原价款10万元，陈宁签署有效连带保证合同，明确仅保证这笔本金。交货前顾澈与林书在原合同上签补充协议，卖方给予折扣，把同一台设备的价款减至8万元，其他条款不变，没有另立新债。陈宁未书面同意该变更。设备按约交付，8万元到期未付，林书在保证期间内向陈宁请求10万元，认为未获保证人同意就只能继续按原价担保。",
      analysis:
        "陈宁按8万元承担本金保证责任。原合同价款已经从10万元减到8万元，属于减轻债务；即使未经保证人书面同意，保证人仍按变更后的债务负责。林书不能再把已减掉的2万元也向陈宁主张。",
    },
    pitfall:
      "把“未书面同意”一概说成完全免责，或一概说成保证人必须跟着主债加价。",
    recall: {
      prompt: "主债数额改变后，保证人承担多少？",
      reference:
        "未经书面同意减轻债务，按减轻后负责；增加债务，增加部分不担保，原责任不当然消失。",
    },
    sources: ["civil-guarantee-coverage-change695"],
    exercises: [
      {
        caseId: "civil-guarantee-coverage-debt-reduced-price",
        relatedTopicIds: ["civil-guarantee-debt-change"],
        facts:
          "本案为原创教学虚构。顾澈向林书购买一台设备，原价款10万元，陈宁签署有效连带保证合同，明确仅保证这笔本金。交货前顾澈与林书在原合同上签补充协议，卖方给予折扣，把同一台设备的价款减至8万元，其他条款不变，没有另立新债。陈宁未书面同意该变更。设备按约交付，8万元到期未付，林书在保证期间内向陈宁请求10万元，认为未获保证人同意就只能继续按原价担保。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        reference:
          "陈宁按8万元承担本金保证责任。原合同价款已经从10万元减到8万元，属于减轻债务；即使未经保证人书面同意，保证人仍按变更后的债务负责。林书不能再把已减掉的2万元也向陈宁主张。",
        sources: ["civil-guarantee-coverage-change695"],
        id: "civil-guarantee-coverage-debt-reduced-price-choice",
        kind: "objective",
        choiceMode: "single",
        title: "设备价款下调之后：选择判断",
        prompt: "本案本金保证责任应按多少认定？",
        options: [
          {
            id: "a",
            text: "按8万元，未经书面同意的减轻债务仍按变更后债务担保",
            explanation: "主债减轻，保证责任随变更后实际债务确定。",
          },
          {
            id: "b",
            text: "按10万元，只要保证人未同意就永远锁定原额",
            explanation: "减轻债务不让债权人继续按已不存在的原额请求保证。",
          },
          {
            id: "c",
            text: "按零，主合同任何变更都使保证全部消失",
            explanation: "第695条区分减轻与加重，不是全部免责。",
          },
          {
            id: "d",
            text: "由陈宁事后任意选一个金额",
            explanation: "保证范围按规则和实际主债确定，不由保证人随意选择。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-guarantee-coverage-debt-reduced-price",
        relatedTopicIds: ["civil-guarantee-debt-change"],
        facts:
          "本案为原创教学虚构。顾澈向林书购买一台设备，原价款10万元，陈宁签署有效连带保证合同，明确仅保证这笔本金。交货前顾澈与林书在原合同上签补充协议，卖方给予折扣，把同一台设备的价款减至8万元，其他条款不变，没有另立新债。陈宁未书面同意该变更。设备按约交付，8万元到期未付，林书在保证期间内向陈宁请求10万元，认为未获保证人同意就只能继续按原价担保。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        reference:
          "陈宁按8万元承担本金保证责任。原合同价款已经从10万元减到8万元，属于减轻债务；即使未经保证人书面同意，保证人仍按变更后的债务负责。林书不能再把已减掉的2万元也向陈宁主张。",
        sources: ["civil-guarantee-coverage-change695"],
        id: "civil-guarantee-coverage-debt-reduced-price-written",
        kind: "subjective",
        title: "设备价款下调之后：写出分析",
        prompt:
          "陈宁应按8万元还是10万元承担本金保证责任？未书面同意是否使结论不同？",
        criteria: [
          {
            id: "guarantee-change-reduced",
            label: "减轻债务后的保证范围",
            meaning:
              "联系同笔本金降为8万元，认定未经保证人书面同意也按变更后8万元负责。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或法条编号。",
            boundary:
              "不要求计算题目未提供的利息费用、另判担保期间或宣告保证合同无效。",
          },
        ],
      },
      {
        caseId: "civil-guarantee-coverage-debt-increased-price",
        relatedTopicIds: ["civil-guarantee-debt-change"],
        facts:
          "本案为原创教学虚构。周青向叶溪购买一套设备，原合同价款10万元。韩宁签署有效的连带保证合同，明确只担保该笔价款本金。交货前周青与叶溪在原合同上签补充协议，将同一套设备价款上调至12万元，付款日和其他条款保持，没有以新债替换原债。韩宁没有书面同意加价，也未另行承诺。设备依约交付，周青到期未付款，叶溪在保证期间内要求韩宁承担全部12万元本金。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        reference:
          "不能要求韩宁承担全部12万元。未经韩宁书面同意，周青与叶溪把原债务从10万元增到12万元，韩宁对新增2万元不承担保证责任；原来保证的10万元仍在范围内，不是因加价就全部免责。",
        sources: ["civil-guarantee-coverage-change695"],
        id: "civil-guarantee-coverage-debt-increased-price-choice",
        kind: "objective",
        choiceMode: "single",
        title: "原合同上的补充价款：选择判断",
        prompt: "韩宁的本金保证责任应怎样处理？",
        options: [
          {
            id: "a",
            text: "全部12万元都担保，因为主合同已经有效变更",
            explanation:
              "主合同加重不当然使未经书面同意的保证人一并承担增加部分。",
          },
          {
            id: "b",
            text: "全部免除，任何数额变更都消灭原保证",
            explanation: "增加部分不担保，不等于原来10万元一并免责。",
          },
          {
            id: "c",
            text: "仍担原10万元，新增2万元不承担",
            explanation: "未经保证人书面同意加重债务，保证人对加重部分不承担。",
          },
          {
            id: "d",
            text: "只担新增2万元，原10万元自动由其他人接走",
            explanation: "无此变更规则。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-guarantee-coverage-debt-increased-price",
        relatedTopicIds: ["civil-guarantee-debt-change"],
        facts:
          "本案为原创教学虚构。周青向叶溪购买一套设备，原合同价款10万元。韩宁签署有效的连带保证合同，明确只担保该笔价款本金。交货前周青与叶溪在原合同上签补充协议，将同一套设备价款上调至12万元，付款日和其他条款保持，没有以新债替换原债。韩宁没有书面同意加价，也未另行承诺。设备依约交付，周青到期未付款，叶溪在保证期间内要求韩宁承担全部12万元本金。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        reference:
          "不能要求韩宁承担全部12万元。未经韩宁书面同意，周青与叶溪把原债务从10万元增到12万元，韩宁对新增2万元不承担保证责任；原来保证的10万元仍在范围内，不是因加价就全部免责。",
        sources: ["civil-guarantee-coverage-change695"],
        id: "civil-guarantee-coverage-debt-increased-price-written",
        kind: "subjective",
        title: "原合同上的补充价款：写出分析",
        prompt:
          "叶溪能否要求韩宁承担全部12万元本金？原10万元和新增2万元分别怎样处理？",
        criteria: [
          {
            id: "guarantee-change-original",
            label: "原有责任保留",
            meaning: "认定韩宁仍对原10万元本金承担保证责任，不因加价全部免责。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或法条编号。",
            boundary:
              "不要求把原10万元再拆成比例，也不要求其他无争议担保条件重复论证。",
          },
          {
            id: "guarantee-change-addition",
            label: "增加部分不担保",
            meaning: "联系加价2万元未经韩宁书面同意，认定不承担该增加部分。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或法条编号。",
            boundary:
              "认可语义相同的“只保原金额”，不强制固定条号或重复写两次数额。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-security-order",
    title: "物保与保证并存的实现顺序",
    headline: "没有约定顺序时，先看物保由债务人自己还是第三人提供。",
    goal: "物保与保证并存时，是否总要先处理抵押物？",
    prerequisite: "知道抵押以财产担保债务，保证由保证人在范围内承担责任。",
    minutes: "6–10",
    paragraphs: [
      "物保与保证并存，先按约定实现债权。没有约定或约定不明，债务人自己提供物保的，应先就这项物保实现；不能只因保证写了连带，就直接跳过债务人的担保财产。",
      "物保由第三人提供、顺序又未约明时，债权人可以选择物保或保证，仍须符合该保证的方式、范围和期间。先物保不等于保证永久消灭，物保受偿后的不足仍可依保证处理；选择担保途径也不允许重复受偿。",
    ],
    example: {
      title: "雕刻机与还款请求",
      facts:
        "本案为原创教学虚构。纪凡向陶蕴借款10万元，约定2025年6月30日还本，届期未还。纪凡用自己所有的一台雕刻机为该债务设立抵押，签了抵押合同并办妥登记；梁松另签书面合同，为这10万元本金承担连带责任保证，保证期间自主债务履行期届满起一年。各方未约定物保与保证的实现顺序。7月10日，雕刻机仍完好放在纪凡的作坊，陶蕴尚未就它受偿，却要求梁松先付全部10万元，打算暂不处理雕刻机。",
      analysis:
        "陶蕴不能按这项主张先要求梁松支付全部10万元，应先就雕刻机的抵押实现债权。各方未约定顺序，而雕刻机是债务人纪凡自己提供的物保，适用先物保的规则；这并不使梁松的保证消灭，物保受偿后仍有不足的，再按保证范围要求承担。",
    },
    pitfall: "把所有物保都当成必须先实现，或把先物保误解成以后永远不承担保证。",
    recall: {
      prompt: "物保与保证并存时，是否总要先处理抵押物？",
      reference:
        "先按约定；无约或不明，债务人自供物保先实现，第三人物保则可选择物保或保证，保证自身条件仍须满足。",
    },
    sources: ["civil-guarantee-coverage-security-order392"],
    exercises: [
      {
        caseId: "civil-guarantee-coverage-case-order-debtor-collateral",
        relatedTopicIds: ["civil-security-order"],
        facts:
          "本案为原创教学虚构。纪凡向陶蕴借款10万元，约定2025年6月30日还本，届期未还。纪凡用自己所有的一台雕刻机为该债务设立抵押，签了抵押合同并办妥登记；梁松另签书面合同，为这10万元本金承担连带责任保证，保证期间自主债务履行期届满起一年。各方未约定物保与保证的实现顺序。7月10日，雕刻机仍完好放在纪凡的作坊，陶蕴尚未就它受偿，却要求梁松先付全部10万元，打算暂不处理雕刻机。",
        hint: "结合本案事实，说明结论和关键理由。",
        sources: ["civil-guarantee-coverage-security-order392"],
        id: "civil-guarantee-coverage-order-debtor-collateral-choice",
        kind: "objective",
        choiceMode: "single",
        title: "雕刻机与还款请求",
        prompt: "陶蕴能否跳过这台雕刻机的抵押，先要求梁松支付全部10万元本金？",
        options: [
          {
            id: "a",
            text: "能，只要写了连带保证，债务人自供的物保就不再影响顺序。",
            explanation: "连带保证不排除第392条对债务人自供物保的顺序要求。",
          },
          {
            id: "b",
            text: "不能，应先就纪凡自己提供的雕刻机抵押实现债权。",
            explanation:
              "未约定顺序且抵押物由债务人自己提供，应先就该物保实现。",
          },
          {
            id: "c",
            text: "不能，而且只要有这台抵押物，梁松的保证责任就永久消灭。",
            explanation: "先物保是顺序要求，不等于保证责任当然消灭。",
          },
          {
            id: "d",
            text: "能，因为借款到期后所有物保和保证都必须各先付10万元。",
            explanation: "既没有双重受偿规则，也不能绕过本案的法定顺序。",
          },
        ],
        answer: "b",
        reference:
          "选B。陶蕴不能按这项主张先要求梁松支付全部10万元，应先就雕刻机的抵押实现债权。各方未约定顺序，而雕刻机是债务人纪凡自己提供的物保，适用先物保的规则；这并不使梁松的保证消灭，物保受偿后仍有不足的，再按保证范围要求承担。",
      },
      {
        caseId: "civil-guarantee-coverage-case-order-debtor-collateral",
        relatedTopicIds: ["civil-security-order"],
        facts:
          "本案为原创教学虚构。纪凡向陶蕴借款10万元，约定2025年6月30日还本，届期未还。纪凡用自己所有的一台雕刻机为该债务设立抵押，签了抵押合同并办妥登记；梁松另签书面合同，为这10万元本金承担连带责任保证，保证期间自主债务履行期届满起一年。各方未约定物保与保证的实现顺序。7月10日，雕刻机仍完好放在纪凡的作坊，陶蕴尚未就它受偿，却要求梁松先付全部10万元，打算暂不处理雕刻机。",
        hint: "结合本案事实，说明结论和关键理由。",
        sources: ["civil-guarantee-coverage-security-order392"],
        id: "civil-guarantee-coverage-order-debtor-collateral-written",
        kind: "subjective",
        title: "抵押设备尚未变价时",
        prompt:
          "陶蕴能否跳过这台雕刻机的抵押，先要求梁松支付全部10万元本金？请完整写出判断及其事实理由。",
        answer: "",
        reference:
          "陶蕴不能按这项主张先要求梁松支付全部10万元，应先就雕刻机的抵押实现债权。各方未约定顺序，而雕刻机是债务人纪凡自己提供的物保，适用先物保的规则；这并不使梁松的保证消灭，物保受偿后仍有不足的，再按保证范围要求承担。",
        criteria: [
          {
            id: "mixed-order392-debtor",
            label: "债务人自供物保的顺序",
            meaning:
              "联系没有顺序约定、雕刻机由主债务人纪凡自己提供，说明应先就该物保实现，不能仅凭连带保证跳过。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "不要求计算设备变价金额或保证期间；先物保不等于保证责任永久消灭。",
          },
        ],
      },
      {
        caseId: "civil-guarantee-coverage-case-order-third-party-collateral",
        relatedTopicIds: ["civil-security-order"],
        facts:
          "本案为原创教学虚构。周吟向张沐借款8万元，约定2025年7月1日还本，到期没有归还。白宁用自己单独所有的一间商铺为周吟设立抵押，并办理登记；另一位朋友孟樾签书面连带责任保证合同，保证这8万元本金，保证期间自主债务履行期届满起一年。各方没有约定物保与保证的实现顺序。8月1日，张沐尚未从商铺受偿，先向孟樾发出承担8万元保证责任的通知。孟樾称必须先处理白宁的商铺，自己才可能付款。",
        hint: "结合本案事实，说明结论和关键理由。",
        sources: ["civil-guarantee-coverage-security-order392"],
        id: "civil-guarantee-coverage-order-third-party-collateral-choice",
        kind: "objective",
        choiceMode: "single",
        title: "商铺抵押与保证请求",
        prompt: "张沐是否必须先就白宁的商铺受偿，才能请求孟樾承担保证责任？",
        options: [
          {
            id: "a",
            text: "必须先处理商铺，因为所有物保都一律优先于保证。",
            explanation: "未约顺序时，要区分物保是债务人自供还是第三人提供。",
          },
          {
            id: "b",
            text: "不能请求孟樾，因为第三人物保一经登记，保证合同便自动消失。",
            explanation: "第三人抵押不使并存的保证自动消灭。",
          },
          {
            id: "c",
            text: "不必，可以选择请求孟樾在保证范围内承担，也可以就白宁的商铺实现抵押。",
            explanation:
              "物保来自第三人且未约顺序，本案又明确为连带保证并已及时请求，债权人有选择权。",
          },
          {
            id: "d",
            text: "不必，而且孟樾承担后张沐仍可再从商铺收取完整8万元而不扣除已收款。",
            explanation: "可以选择实现途径，不等于同一债权可以重复受偿。",
          },
        ],
        answer: "c",
        reference:
          "选C。张沐不必先就白宁的商铺受偿，可以请求孟樾在保证范围内承担这8万元。商铺由第三人白宁提供，各方又未约定顺序，第392条允许选择物保或保证；本案保证明确为连带责任，债务已到期未还，通知也在约定保证期间内，孟樾不能仅以商铺尚未处理为由拒绝。",
      },
      {
        caseId: "civil-guarantee-coverage-case-order-third-party-collateral",
        relatedTopicIds: ["civil-security-order"],
        facts:
          "本案为原创教学虚构。周吟向张沐借款8万元，约定2025年7月1日还本，到期没有归还。白宁用自己单独所有的一间商铺为周吟设立抵押，并办理登记；另一位朋友孟樾签书面连带责任保证合同，保证这8万元本金，保证期间自主债务履行期届满起一年。各方没有约定物保与保证的实现顺序。8月1日，张沐尚未从商铺受偿，先向孟樾发出承担8万元保证责任的通知。孟樾称必须先处理白宁的商铺，自己才可能付款。",
        hint: "结合本案事实，说明结论和关键理由。",
        sources: ["civil-guarantee-coverage-security-order392"],
        id: "civil-guarantee-coverage-order-third-party-collateral-written",
        kind: "subjective",
        title: "保证人收到的付款通知",
        prompt:
          "张沐是否必须先就白宁的商铺受偿，才能请求孟樾承担保证责任？请完整写出判断及其事实理由。",
        answer: "",
        reference:
          "张沐不必先就白宁的商铺受偿，可以请求孟樾在保证范围内承担这8万元。商铺由第三人白宁提供，各方又未约定顺序，第392条允许选择物保或保证；本案保证明确为连带责任，债务已到期未还，通知也在约定保证期间内，孟樾不能仅以商铺尚未处理为由拒绝。",
        criteria: [
          {
            id: "mixed-order392-third",
            label: "第三人物保与连带保证的选择",
            meaning:
              "联系商铺由第三人白宁提供、未约顺序及明确连带保证，说明张沐不必先实现商铺抵押，可直接请求孟樾在保证范围内承担。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "不把选择权扩大为重复受偿；不要求另写一般保证程序、具体保证期间计算或担保人分担。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-security-recourse",
    title: "担保人承担后的主债务人追偿",
    headline: "追偿看实际承担，不能把上限、估值和总债额当成已经代偿。",
    goal: "保证人和第三人物保承担责任后，可以向谁追偿多少？",
    prerequisite: "区分主债务人、债权人与提供担保的第三人。",
    minutes: "6–10",
    paragraphs: [
      "保证人承担保证责任后，除另有约定，可以在实际承担责任的范围内向主债务人追偿，并享有债权人对债务人的权利，但不得损害债权人利益。保证上限或主债总额，不等于本次实际代偿额。",
      "以自己财产提供物保的第三人，在承担担保责任后也可以向主债务人追偿。判断本次已抵债本金时，看实际冲抵多少债务，财产清单的估值不能直接代替这一数额。",
    ],
    example: {
      title: "保证付款后的金额争议",
      facts:
        "本案为原创教学虚构。韩秋向陆岑借款10万元，约定2025年7月1日归还本金。许季签书面合同，对其中6万元本金承担连带责任保证，保证期间自主债务履行期届满起一年。韩秋到期未还，陆岑7月20日向许季请求承担保证责任。许季依该保证实际支付4万元，陆岑的收据确认该款冲抵主债务本金4万元。许季没有再付其他款项，各方也未另行约定追偿。许季随后要求韩秋偿还6万元，理由是自己签的保证上限是6万元。",
      analysis:
        "许季就本次代付本金可以向韩秋追偿4万元。许季已依保证支付4万元，主债务本金也相应扣减4万元；无其他追偿约定时，应在这次实际承担的保证责任范围内追偿。保证上限6万元和原借款10万元，都不是许季已经代偿的金额。",
    },
    pitfall: "保证写了6万元或财产估值6万元，就不看实际只清偿4万元。",
    recall: {
      prompt: "保证人和第三人物保承担责任后，可以向谁追偿多少？",
      reference:
        "承担责任后，无另约可向主债务人追偿；本次已代偿、抵债的本金按实际承担额判断，不按上限、估值或总债额扩大。",
    },
    sources: ["civil-guarantee-coverage-security-recourse392700"],
    exercises: [
      {
        caseId: "civil-guarantee-coverage-case-recourse-guarantor-payment",
        relatedTopicIds: ["civil-security-recourse"],
        facts:
          "本案为原创教学虚构。韩秋向陆岑借款10万元，约定2025年7月1日归还本金。许季签书面合同，对其中6万元本金承担连带责任保证，保证期间自主债务履行期届满起一年。韩秋到期未还，陆岑7月20日向许季请求承担保证责任。许季依该保证实际支付4万元，陆岑的收据确认该款冲抵主债务本金4万元。许季没有再付其他款项，各方也未另行约定追偿。许季随后要求韩秋偿还6万元，理由是自己签的保证上限是6万元。",
        hint: "结合本案事实，说明结论和关键理由。",
        sources: ["civil-guarantee-coverage-security-recourse392700"],
        id: "civil-guarantee-coverage-recourse-guarantor-payment-choice",
        kind: "objective",
        choiceMode: "single",
        title: "保证付款后的金额争议",
        prompt: "就本次已代付的本金，许季可以向韩秋追偿多少？",
        options: [
          {
            id: "a",
            text: "6万元，只要保证上限写6万元就能全部追偿。",
            explanation: "保证范围的名义上限不等于已经实际承担的数额。",
          },
          {
            id: "b",
            text: "10万元，因为原借款总额是10万元。",
            explanation: "不能将自己没有清偿的主债务也纳入本次追偿。",
          },
          {
            id: "c",
            text: "0元，因为许季不是最初借款的人。",
            explanation: "保证人承担保证责任后，原则上可以向主债务人追偿。",
          },
          {
            id: "d",
            text: "4万元，按本次实际承担并冲抵的保证本金追偿。",
            explanation:
              "无另约，实际承担保证责任4万元，是本次本金追偿的范围。",
          },
        ],
        answer: "d",
        reference:
          "选D。许季就本次代付本金可以向韩秋追偿4万元。许季已依保证支付4万元，主债务本金也相应扣减4万元；无其他追偿约定时，应在这次实际承担的保证责任范围内追偿。保证上限6万元和原借款10万元，都不是许季已经代偿的金额。",
      },
      {
        caseId: "civil-guarantee-coverage-case-recourse-guarantor-payment",
        relatedTopicIds: ["civil-security-recourse"],
        facts:
          "本案为原创教学虚构。韩秋向陆岑借款10万元，约定2025年7月1日归还本金。许季签书面合同，对其中6万元本金承担连带责任保证，保证期间自主债务履行期届满起一年。韩秋到期未还，陆岑7月20日向许季请求承担保证责任。许季依该保证实际支付4万元，陆岑的收据确认该款冲抵主债务本金4万元。许季没有再付其他款项，各方也未另行约定追偿。许季随后要求韩秋偿还6万元，理由是自己签的保证上限是6万元。",
        hint: "结合本案事实，说明结论和关键理由。",
        sources: ["civil-guarantee-coverage-security-recourse392700"],
        id: "civil-guarantee-coverage-recourse-guarantor-payment-written",
        kind: "subjective",
        title: "收款凭据中的四万元",
        prompt:
          "就本次已代付的本金，许季可以向韩秋追偿多少？请完整写出判断及其事实理由。",
        answer: "",
        reference:
          "许季就本次代付本金可以向韩秋追偿4万元。许季已依保证支付4万元，主债务本金也相应扣减4万元；无其他追偿约定时，应在这次实际承担的保证责任范围内追偿。保证上限6万元和原借款10万元，都不是许季已经代偿的金额。",
        criteria: [
          {
            id: "mixed-recourse700-actual",
            label: "以实际承担的保证本金确定追偿",
            meaning:
              "联系实际代付并冲抵本金4万元、无另约，说明可以向主债务人韩秋追偿4万元，不能按保证上限6万元或总债10万元扩大。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "只问本次已代付本金，不要求新增利息费用、债权执行顺位或担保人之间分担。",
          },
        ],
      },
      {
        caseId:
          "civil-guarantee-coverage-case-recourse-third-party-realization",
        relatedTopicIds: ["civil-security-recourse"],
        facts:
          "本案为原创教学虚构。蒋苒向杜诺借款10万元，到期未还。齐航用自己的一台机床为该借款设立抵押，已经签约登记，抵押清单记载当时估值6万元。此后依法实现抵押，杜诺实际从机床变价款中受偿4万元，书面确认主债务本金由10万元减至6万元。齐航没有另替蒋苒支付其他款项，各方未另行约定追偿。齐航现要求蒋苒按清单估值返还6万元。",
        hint: "结合本案事实，说明结论和关键理由。",
        sources: ["civil-guarantee-coverage-security-recourse392700"],
        id: "civil-guarantee-coverage-recourse-third-party-realization-choice",
        kind: "objective",
        choiceMode: "single",
        title: "机床变价后的结算",
        prompt: "就本次已经抵债的本金，齐航可以向蒋苒追偿多少？",
        options: [
          {
            id: "a",
            text: "4万元，按这次实际承担并冲抵主债务的数额。",
            explanation:
              "第三人物保已承担责任，向主债务人的本次本金追偿按实际抵债4万元判断。",
          },
          {
            id: "b",
            text: "6万元，机床清单写过的估值就是追偿额。",
            explanation: "估值不等于本次实际承担并冲抵债务的数额。",
          },
          {
            id: "c",
            text: "10万元，第三人物保实现后便可追偿原债务全额。",
            explanation: "第三人没有承担的债务，不能计入本次已抵债本金追偿。",
          },
          {
            id: "d",
            text: "0元，只有保证人才有权向主债务人追偿。",
            explanation:
              "第392条同时确认提供物保的第三人承担担保责任后的追偿权。",
          },
        ],
        answer: "a",
        reference:
          "选A。齐航就本次抵债本金可以向蒋苒追偿4万元。齐航以自己的机床提供物保，抵押已经实现，实际用于偿还蒋苒本金的是4万元，第392条支持其承担责任后向主债务人追偿。清单估值6万元、原债务10万元都不能替代本次实际抵债的4万元。",
      },
      {
        caseId:
          "civil-guarantee-coverage-case-recourse-third-party-realization",
        relatedTopicIds: ["civil-security-recourse"],
        facts:
          "本案为原创教学虚构。蒋苒向杜诺借款10万元，到期未还。齐航用自己的一台机床为该借款设立抵押，已经签约登记，抵押清单记载当时估值6万元。此后依法实现抵押，杜诺实际从机床变价款中受偿4万元，书面确认主债务本金由10万元减至6万元。齐航没有另替蒋苒支付其他款项，各方未另行约定追偿。齐航现要求蒋苒按清单估值返还6万元。",
        hint: "结合本案事实，说明结论和关键理由。",
        sources: ["civil-guarantee-coverage-security-recourse392700"],
        id: "civil-guarantee-coverage-recourse-third-party-realization-written",
        kind: "subjective",
        title: "抵债收据与原估值",
        prompt:
          "就本次已经抵债的本金，齐航可以向蒋苒追偿多少？请完整写出判断及其事实理由。",
        answer: "",
        reference:
          "齐航就本次抵债本金可以向蒋苒追偿4万元。齐航以自己的机床提供物保，抵押已经实现，实际用于偿还蒋苒本金的是4万元，第392条支持其承担责任后向主债务人追偿。清单估值6万元、原债务10万元都不能替代本次实际抵债的4万元。",
        criteria: [
          {
            id: "mixed-recourse392-property",
            label: "第三人物保按实际抵债本金追偿",
            meaning:
              "联系齐航以自己的机床担保且已实现、实际抵债4万元，说明可向主债务人蒋苒追偿4万元，而非清单估值6万元或原债务10万元。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "不要求质疑题设已完成的实现程序、计算变价费用或讨论担保人之间分担；只判断本次抵债本金。",
          },
        ],
      },
    ],
  },
];

export const civilGuaranteeCoverageChapters = [
  {
    id: "CIV-GUARANTEE-PERIOD",
    title: "保证期间与权利行使",
    section: "民法",
    topicIds: [
      "civil-guarantee-period-default",
      "civil-guarantee-period-exercise",
    ],
  },
  {
    id: "CIV-GUARANTEE-SCOPE",
    title: "保证范围与主债变化",
    section: "民法",
    topicIds: ["civil-guarantee-scope", "civil-guarantee-debt-change"],
  },
  {
    id: "CIV-MIXED-SECURITY",
    title: "混合担保与承担后的追偿",
    section: "民法",
    topicIds: ["civil-security-order", "civil-security-recourse"],
  },
];

export const civilGuaranteeCoverageExercises =
  civilGuaranteeCoverageTopics.flatMap((topic) => topic.exercises);
export const civilGuaranteeCoverageContentPack = {
  revision: civilGuaranteeCoverageRevision,
  snapshot: {
    topics: civilGuaranteeCoverageTopics,
    sources: civilGuaranteeCoverageSources,
  },
};
export const civilGuaranteeCoverageDefaultQueues = {
  objective: civilGuaranteeCoverageExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilGuaranteeCoverageExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilGuaranteeCoverageQuestion(id: string) {
  const question = civilGuaranteeCoverageExercises.find((q) => q.id === id);
  return question ? structuredClone(question) : undefined;
}
export function civilGuaranteeCoverageTopicForQuestion(id: string) {
  return civilGuaranteeCoverageTopics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function civilGuaranteeCoverageSameCaseQuestions(id: string) {
  const question = civilGuaranteeCoverageQuestion(id);
  return question
    ? structuredClone(
        civilGuaranteeCoverageExercises.filter(
          (q) => q.caseId === question.caseId,
        ),
      )
    : [];
}
export function civilGuaranteeCoverageChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = civilGuaranteeCoverageChapters.find(
    (c) => c.id === chapterId,
  );
  return chapter
    ? civilGuaranteeCoverageTopics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}
