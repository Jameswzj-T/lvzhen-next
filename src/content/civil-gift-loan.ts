import type { ContentSources, FaultTopic } from "./fault-unit";

// Original fictional cases. Paired forms share facts, not independent outcomes.
export const civilGiftLoanRevision = "civil-gift-loan-2026-10-23.v1";

export const civilGiftLoanSources: ContentSources = {
  "civil-gift-loan-delivery679": {
    title: "《民法典》第667、679条：自然人借款的成立",
    url: "https://tjca.miit.gov.cn/zwgk/zcwj/flfg/art/2020/art_20cf1a2e1b854924b5caa744c8045d1f.html",
    note: "2026-10-23直接核读工信部天津通信管理局所载民法典全文，页面2020-06-18发布；法典2020-05-28通过、2021-01-01施行。最高法同文页本轮读取超时，未把搜索摘要当作读取成功。本组限普通自然人借款，以未提供和已实际到账作对照，只问成立时间，不扩展预约、缔约过失或资金损失。",
  },
  "civil-gift-loan-principal670": {
    title: "《民法典》第670条：预扣利息与实际本金",
    url: "https://tjca.miit.gov.cn/zwgk/zcwj/flfg/art/2020/art_20cf1a2e1b854924b5caa744c8045d1f.html",
    note: "2026-10-23直接核读。预扣利息以实际提供的数额作为返还与计息本金；借款人取得全款后的个人支出另论。两案只问本金基数，不确认所约利率、预扣利息金额依法可得，不计算逾期利息或变相费用。",
  },
  "civil-gift-loan-interest680": {
    title: "《民法典》第680条：自然人借款的借期利息",
    url: "https://tjca.miit.gov.cn/zwgk/zcwj/flfg/art/2020/art_20cf1a2e1b854924b5caa744c8045d1f.html",
    note: "2026-10-23直接核读。区分未约利息、约定不明且不能补充；两案均为普通自然人之间、借期未届满，只问借期内利息，不把无借期利息等同于逾期责任一概免除，不涉及企业或职业放贷、利率上限。",
  },
  "civil-gift-loan-term675": {
    title: "《民法典》第675、677条：无期限催还与提前还款",
    url: "https://tjca.miit.gov.cn/zwgk/zcwj/flfg/art/2020/art_20cf1a2e1b854924b5caa744c8045d1f.html",
    note: "2026-10-23直接核读。无期限案给出约定、补充与交易习惯均不能确定期限，催告期限经借款人确认足够且已届满；不让考生猜一天是否合理。提前还款案将计息标准依法有效作为给定前提，只考无另约时按实际借期计息，不核定具体利率或金额。",
  },
  "civil-gift-loan-gift-revocation658": {
    title: "《民法典》第224、657、658条：普通动产赠与与任意撤销",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23实际核读北京市政府所载法典全文；2020-05-28公布、2021-01-01施行，页面发布日期2020-06-02，页面标示有效。最高法原文页本轮两次超时，未将失败页面当作已读全文。两案均为普通个人间无偿赠与，无公证或公益、道德义务性质，以实际交付区分权利是否已转移；不涉及房屋登记或其他交付方式。",
  },
  "civil-gift-loan-gift-notarized660": {
    title: "《民法典》第658、660条：经公证赠与的交付与赔偿",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23实际核读北京市政府所载法典全文；2020-05-28公布、2021-01-01施行，页面发布日期2020-06-02，页面标示有效。最高法原文页本轮两次超时，未将失败页面当作已读全文。限真实经公证的赠与合同；未交付也不能仅凭反悔任意撤销。故意毁坏应交付财产时适用第660条第二款，不扩大为所有赠与的无过错赔偿。",
  },
  "civil-gift-loan-gift-statutory663": {
    title: "《民法典》第661、663—665条：附义务赠与的法定撤销",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23实际核读北京市政府所载法典全文；2020-05-28公布、2021-01-01施行，页面发布日期2020-06-02，页面标示有效。最高法原文页本轮两次超时，未将失败页面当作已读全文。本组由赠与人本人在一年内撤销；已读第664条，继承人或法定代理人的六个月规则限该条特殊事由，不移用到本组。依法撤销后可请求返还，单纯社交不满不替代法定事由。",
  },
  "civil-gift-loan-gift-hardship666": {
    title: "《民法典》第666条：经济显著恶化后的停止履行",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23实际核读北京市政府所载法典全文；2020-05-28公布、2021-01-01施行，页面发布日期2020-06-02，页面标示有效。最高法原文页本轮两次超时，未将失败页面当作已读全文。两案以已公证赠与排除任意撤销的捷径，以收入、可用财产和必要支出说明严重影响家庭生活或生产经营；仅据该条不能当然追回已交付财产。",
  },
};

export const civilGiftLoanTopics: FaultTopic[] = [
  {
    id: "civil-gift-free-revocation",
    title: "普通赠与的任意撤销",
    headline: "先看赠与财产的权利是否已经转移。",
    goal: "普通赠与在交付前后，反悔的效力有什么区别？",
    prerequisite: "知道赠与是无偿给予自己的财产、对方表示接受。",
    minutes: "6–10",
    paragraphs: [
      "普通赠与中，赠与人可以在赠与财产的权利转移前撤销。这里用普通动产的实际交付判断：尚未交付时通常尚未转移，已经交付给受赠人时所有权通常已经转移。",
      "签了普通赠与协议，不当然排除交付前任意撤销；权利转移后也不能只因后悔任意索回。经公证的赠与以及依法不得撤销的公益、道德义务性质赠与有例外，法定撤销另有条件。",
    ],
    example: {
      title: "电脑交付前的通知",
      facts:
        "本案为原创教学虚构。2025年5月1日，沈静因另购新机，与摄影同好罗扬签了一份赠与协议，将自己的一台闲置笔记本电脑无偿送给罗扬，罗扬接受，双方约定5月20日送到罗扬家。协议没有公证。5月10日电脑仍在沈静处自用，沈静改变主意，当天通知罗扬取消赠与，通知已收到。罗扬要求按已经签字的协议交付。",
      analysis:
        "沈静可以撤销这次赠与。电脑仍在沈静处，尚未交付给罗扬，权利尚未转移；本案是未公证的普通赠与，沈静可以在此时任意撤销，签字本身不排除这一权利。",
    },
    pitfall: "把“赠与没有收钱”理解为交付以后仍能随时反悔。",
    recall: {
      prompt: "普通赠与在交付前后，反悔的效力有什么区别？",
      reference:
        "普通赠与在财产权利转移前可以任意撤销；权利转移后，单纯后悔不足以索回。公证等法定例外另论。",
    },
    sources: ["civil-gift-loan-gift-revocation658"],
    exercises: [
      {
        caseId: "civil-gift-loan-case-gift-before-delivery",
        relatedTopicIds: ["civil-gift-free-revocation"],
        facts:
          "本案为原创教学虚构。2025年5月1日，沈静因另购新机，与摄影同好罗扬签了一份赠与协议，将自己的一台闲置笔记本电脑无偿送给罗扬，罗扬接受，双方约定5月20日送到罗扬家。协议没有公证。5月10日电脑仍在沈静处自用，沈静改变主意，当天通知罗扬取消赠与，通知已收到。罗扬要求按已经签字的协议交付。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-gift-loan-gift-revocation658"],
        id: "civil-gift-loan-gift-before-delivery-choice",
        kind: "objective",
        choiceMode: "single",
        title: "电脑交付前的通知",
        prompt: "沈静能否仅因改变主意撤销这次赠与？",
        options: [
          {
            id: "a",
            text: "不能，赠与协议一经签字就必须交付。",
            explanation: "普通赠与的书面形式不当然排除权利转移前的任意撤销。",
          },
          {
            id: "b",
            text: "不能，只有罗扬同意取消时才能撤销。",
            explanation:
              "本案适用赠与人在权利转移前的任意撤销，不以受赠人同意为条件。",
          },
          {
            id: "c",
            text: "可以，普通赠与尚未交付、权利尚未转移。",
            explanation:
              "协议未公证，赠与财产权利尚未转移，符合第658条的任意撤销边界。",
          },
          {
            id: "d",
            text: "可以，因为任何赠与无论是否交付都能随时反悔。",
            explanation:
              "本案可撤销不等于交付后仍可任意撤销，也不涵盖公证等例外。",
          },
        ],
        answer: "c",
        reference:
          "选C。沈静可以撤销这次赠与。电脑仍在沈静处，尚未交付给罗扬，权利尚未转移；本案是未公证的普通赠与，沈静可以在此时任意撤销，签字本身不排除这一权利。",
      },
      {
        caseId: "civil-gift-loan-case-gift-before-delivery",
        relatedTopicIds: ["civil-gift-free-revocation"],
        facts:
          "本案为原创教学虚构。2025年5月1日，沈静因另购新机，与摄影同好罗扬签了一份赠与协议，将自己的一台闲置笔记本电脑无偿送给罗扬，罗扬接受，双方约定5月20日送到罗扬家。协议没有公证。5月10日电脑仍在沈静处自用，沈静改变主意，当天通知罗扬取消赠与，通知已收到。罗扬要求按已经签字的协议交付。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-gift-loan-gift-revocation658"],
        id: "civil-gift-loan-gift-before-delivery-explain",
        kind: "subjective",
        title: "电脑交付安排发生变化",
        prompt:
          "沈静能否仅因改变主意撤销这次赠与？请写出结论并结合案情说明理由。",
        answer: "",
        reference:
          "沈静可以撤销这次赠与。电脑仍在沈静处，尚未交付给罗扬，权利尚未转移；本案是未公证的普通赠与，沈静可以在此时任意撤销，签字本身不排除这一权利。",
        criteria: [
          {
            id: "gift-before658",
            label: "联系尚未交付判断任意撤销",
            meaning:
              "联系普通赠与未公证、电脑尚未交付而权利未转移，说明沈静可以撤销，签字不当然排除该权利。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不要求讨论其他交付方式、撤销后的费用或诉讼程序。",
          },
        ],
      },
      {
        caseId: "civil-gift-loan-case-gift-after-delivery",
        relatedTopicIds: ["civil-gift-free-revocation"],
        facts:
          "本案为原创教学虚构。2025年6月1日，程聿把自己的一台旧相机无偿送给朋友孟修，孟修表示接受，当天拿走相机。双方未约定孟修需要做任何事情，赠与也未经公证。8月，该型号二手价格上涨，程聿因觉得自己送亏了，要求孟修返还相机。程聿仅以价格上涨、自己后悔为由。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-gift-loan-gift-revocation658"],
        id: "civil-gift-loan-gift-after-delivery-choice",
        kind: "objective",
        choiceMode: "single",
        title: "相机行情变化后的请求",
        prompt: "程聿能否仅凭上述理由撤销赠与并要回相机？",
        options: [
          {
            id: "a",
            text: "不能，相机已经交付，仅因价格上涨后悔不足以撤销。",
            explanation:
              "普通动产已交付，不能再依第658条任意撤销；题述理由也不是法定撤销事由。",
          },
          {
            id: "b",
            text: "可以，因为相机涨价后赠与就自动失效。",
            explanation: "事后价格上涨不会使已完成的赠与自动失效。",
          },
          {
            id: "c",
            text: "可以，因为未公证的赠与即使交付也随时可以撤销。",
            explanation: "未公证不等于权利转移后仍能任意撤销。",
          },
          {
            id: "d",
            text: "不能，只因为赠与一经签约就一律没有撤销的可能。",
            explanation:
              "本案不能仅凭后悔撤销，但不能由此排除交付前任意撤销和法定撤销。",
          },
        ],
        answer: "a",
        reference:
          "选A。程聿不能仅凭价格上涨和后悔撤销赠与、要回相机。孟修已经接受并取走相机，所有权已随交付转移，任意撤销的时间已过；相机涨价也不是本案的法定撤销事由。",
      },
      {
        caseId: "civil-gift-loan-case-gift-after-delivery",
        relatedTopicIds: ["civil-gift-free-revocation"],
        facts:
          "本案为原创教学虚构。2025年6月1日，程聿把自己的一台旧相机无偿送给朋友孟修，孟修表示接受，当天拿走相机。双方未约定孟修需要做任何事情，赠与也未经公证。8月，该型号二手价格上涨，程聿因觉得自己送亏了，要求孟修返还相机。程聿仅以价格上涨、自己后悔为由。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-gift-loan-gift-revocation658"],
        id: "civil-gift-loan-gift-after-delivery-explain",
        kind: "subjective",
        title: "交付相机后的争议",
        prompt:
          "程聿能否仅凭上述理由撤销赠与并要回相机？请写出结论并结合案情说明理由。",
        answer: "",
        reference:
          "程聿不能仅凭价格上涨和后悔撤销赠与、要回相机。孟修已经接受并取走相机，所有权已随交付转移，任意撤销的时间已过；相机涨价也不是本案的法定撤销事由。",
        criteria: [
          {
            id: "gift-after658",
            label: "区分交付后的反悔与撤销事由",
            meaning:
              "联系相机已交付而所有权转移，说明程聿不能再任意撤销；单纯涨价、后悔不足以支持返还请求。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "只判断题述反悔理由，不要求罗列全部法定撤销事由。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-gift-notarized",
    title: "经公证赠与的履行",
    headline: "公证赠与不能仅因尚未交付而任意反悔。",
    goal: "赠与合同已经公证，未交付或故意毁损时怎样处理？",
    prerequisite: "先区分普通赠与的权利转移前任意撤销。",
    minutes: "6–10",
    paragraphs: [
      "经过公证的赠与合同不适用任意撤销。赠与人没有交付时，受赠人可以请求交付，不能仅以无偿或财产尚未转移为由拒绝。",
      "这类依法应当交付的赠与财产，因赠与人故意或重大过失而毁损、灭失，赠与人应承担赔偿责任。公证并不排除另有事实支持的法定撤销或经济显著恶化规则。",
    ],
    example: {
      title: "小提琴的交付日期",
      facts:
        "本案为原创教学虚构。2025年3月，方叙与同好周澈订立赠与合同，将自己的一把小提琴无偿赠给周澈，周澈接受，双方到公证机构对赠与合同办理了公证，约定5月1日交付。到期时小提琴仍完好保存在方叙处，方叙收入和财产均未变化，只说“还没给出去，我就能反悔”，拒绝交付。周澈请求交付。",
      analysis:
        "方叙不能仅凭尚未交付而任意撤销，周澈可以请求依约交付小提琴。赠与合同已经公证，不适用普通赠与在权利转移前的任意撤销规则；方叙仅改变主意，不能据此拒绝交付。",
    },
    pitfall: "把“尚未交付”一概当成公证赠与也可任意撤销的理由。",
    recall: {
      prompt: "赠与合同已经公证，未交付或故意毁损时怎样处理？",
      reference:
        "经公证赠与排除任意撤销，受赠人可请求交付；赠与人故意或重大过失毁损应交付财产时须赔偿。",
    },
    sources: ["civil-gift-loan-gift-notarized660"],
    exercises: [
      {
        caseId: "civil-gift-loan-case-gift-notarized-delivery",
        relatedTopicIds: ["civil-gift-notarized"],
        facts:
          "本案为原创教学虚构。2025年3月，方叙与同好周澈订立赠与合同，将自己的一把小提琴无偿赠给周澈，周澈接受，双方到公证机构对赠与合同办理了公证，约定5月1日交付。到期时小提琴仍完好保存在方叙处，方叙收入和财产均未变化，只说“还没给出去，我就能反悔”，拒绝交付。周澈请求交付。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-gift-loan-gift-notarized660"],
        id: "civil-gift-loan-gift-notarized-delivery-choice",
        kind: "objective",
        choiceMode: "single",
        title: "小提琴的交付日期",
        prompt: "方叙能否仅凭尚未交付而反悔？周澈能否请求交付？",
        options: [
          {
            id: "a",
            text: "方叙可以任意撤销，周澈只能接受，因为小提琴尚未交付。",
            explanation: "经公证的赠与合同排除第658条第一款的任意撤销。",
          },
          {
            id: "b",
            text: "方叙可以任意撤销，但必须先征得公证机构同意。",
            explanation: "法律没有本题所说的经公证机构同意即可任意撤销的规则。",
          },
          {
            id: "c",
            text: "方叙不能任意撤销，但周澈仍不能请求交付。",
            explanation: "第660条明确支持经公证赠与的受赠人请求交付。",
          },
          {
            id: "d",
            text: "方叙不能仅凭反悔任意撤销，周澈可以请求依约交付。",
            explanation: "公证排除任意撤销，本案又没有其他拒绝履行的事实依据。",
          },
        ],
        answer: "d",
        reference:
          "选D。方叙不能仅凭尚未交付而任意撤销，周澈可以请求依约交付小提琴。赠与合同已经公证，不适用普通赠与在权利转移前的任意撤销规则；方叙仅改变主意，不能据此拒绝交付。",
      },
      {
        caseId: "civil-gift-loan-case-gift-notarized-delivery",
        relatedTopicIds: ["civil-gift-notarized"],
        facts:
          "本案为原创教学虚构。2025年3月，方叙与同好周澈订立赠与合同，将自己的一把小提琴无偿赠给周澈，周澈接受，双方到公证机构对赠与合同办理了公证，约定5月1日交付。到期时小提琴仍完好保存在方叙处，方叙收入和财产均未变化，只说“还没给出去，我就能反悔”，拒绝交付。周澈请求交付。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-gift-loan-gift-notarized660"],
        id: "civil-gift-loan-gift-notarized-delivery-explain",
        kind: "subjective",
        title: "公证协议约定的交付",
        prompt:
          "方叙能否仅凭尚未交付而反悔？周澈能否请求交付？请写出结论并结合案情说明理由。",
        answer: "",
        reference:
          "方叙不能仅凭尚未交付而任意撤销，周澈可以请求依约交付小提琴。赠与合同已经公证，不适用普通赠与在权利转移前的任意撤销规则；方叙仅改变主意，不能据此拒绝交付。",
        criteria: [
          {
            id: "gift-notary658",
            label: "公证排除任意撤销",
            meaning:
              "联系赠与合同已经公证，说明方叙不能仅因财产尚未交付而任意撤销。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不把公证解释为排除一切法定撤销或经济恶化规则。",
          },
          {
            id: "gift-notary660-delivery",
            label: "受赠人可请求交付",
            meaning:
              "联系已到约定交付日期、小提琴仍完好可交付，说明周澈可要求依约交付。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不要求增加损害赔偿数额、公证程序或执行程序。",
          },
        ],
      },
      {
        caseId: "civil-gift-loan-case-gift-notarized-destruction",
        relatedTopicIds: ["civil-gift-notarized"],
        facts:
          "本案为原创教学虚构。2025年4月，季芮与朋友安禾签订并公证一份赠与合同，将自己收藏的一幅版画无偿赠给安禾，约定6月交付，安禾接受。5月，季芮只因不想再送这幅版画，故意将它撕碎，导致无法修复。安禾请求赔偿，季芮称“没收你的钱，毁了也不用负责”。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-gift-loan-gift-notarized660"],
        id: "civil-gift-loan-gift-notarized-destruction-choice",
        kind: "objective",
        choiceMode: "single",
        title: "版画交付前的处置",
        prompt: "季芮是否应对这幅版画的毁损承担赔偿责任？",
        options: [
          {
            id: "a",
            text: "不应承担，因为一切无偿赠与都免除赔偿。",
            explanation:
              "无偿性质不能排除第660条第二款针对故意或重大过失毁损应交付财产的责任。",
          },
          {
            id: "b",
            text: "应承担，公证赠与中应交付的版画被季芮故意毁损。",
            explanation:
              "本案财产属于依法应交付的公证赠与，且毁损出于赠与人故意。",
          },
          {
            id: "c",
            text: "不应承担，因为只有财产交付后毁损才可能赔偿。",
            explanation: "第660条第二款正可适用于应交付而尚未交付的赠与财产。",
          },
          {
            id: "d",
            text: "应承担，但只因为赠与人对任何原因的毁损都负无过错责任。",
            explanation:
              "本题责任以应交付赠与财产和故意毁损为根据，不是所有赠与均无过错赔偿。",
          },
        ],
        answer: "b",
        reference:
          "选B。季芮应承担赔偿责任。经过公证的赠与合同使这幅版画属于应当交付的财产，季芮又因反悔而故意将它毁损，符合第660条第二款的赔偿条件，不能以没有收钱为由免责。",
      },
      {
        caseId: "civil-gift-loan-case-gift-notarized-destruction",
        relatedTopicIds: ["civil-gift-notarized"],
        facts:
          "本案为原创教学虚构。2025年4月，季芮与朋友安禾签订并公证一份赠与合同，将自己收藏的一幅版画无偿赠给安禾，约定6月交付，安禾接受。5月，季芮只因不想再送这幅版画，故意将它撕碎，导致无法修复。安禾请求赔偿，季芮称“没收你的钱，毁了也不用负责”。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-gift-loan-gift-notarized660"],
        id: "civil-gift-loan-gift-notarized-destruction-explain",
        kind: "subjective",
        title: "版画损毁后的请求",
        prompt:
          "季芮是否应对这幅版画的毁损承担赔偿责任？请写出结论并结合案情说明理由。",
        answer: "",
        reference:
          "季芮应承担赔偿责任。经过公证的赠与合同使这幅版画属于应当交付的财产，季芮又因反悔而故意将它毁损，符合第660条第二款的赔偿条件，不能以没有收钱为由免责。",
        criteria: [
          {
            id: "gift-notary660-damage",
            label: "联系公证和故意毁损判断赔偿",
            meaning:
              "联系公证赠与中的版画依法应交付、季芮故意将其毁损，说明其应赔偿，无偿不是免责理由。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "不要求计算损失金额，也不把责任扩大为对任何原因毁损均须赔偿。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-gift-statutory-revocation",
    title: "赠与的法定撤销",
    headline: "已交付以后，也要看是否出现法定撤销事由。",
    goal: "附义务不履行与单纯不满，为什么会得出不同结论？",
    prerequisite: "知道任意撤销原则上止于赠与财产权利转移前。",
    minutes: "6–10",
    paragraphs: [
      "受赠人严重侵害赠与人或其近亲属合法权益、对赠与人有扶养义务而不履行，或者不履行赠与合同约定的义务，赠与人可以依法撤销。附义务应由合同约定，赠与人的单方期待不能直接变成义务。",
      "赠与人应在知道或应当知道撤销事由起一年内行使撤销权。依法撤销后，可以请求返还赠与财产；已经交付并不排除这种法定撤销。",
      "受赠人违法导致赠与人死亡或丧失民事行为能力时，继承人或法定代理人另有撤销权，自知道或应当知道撤销事由起六个月内行使；这与赠与人本人的一年期间不同。",
    ],
    example: {
      title: "电脑与旧照片的约定",
      facts:
        "本案为原创教学虚构。2025年2月，郁航将自己一台闲置电脑无偿赠给摄影同好何霖。何霖接受，双方在赠与合同中约定何霖附带为郁航整理、扫描30张旧照片，6月30日前交回原件及电子文件。电脑和照片当月已经交给何霖。期限届满仍未完成，7月1日何霖明确表示虽有时间和设备，也不打算履行这一约定。9月1日，郁航的撤销赠与通知到达何霖，并要求返还电脑。",
      analysis:
        "郁航可以撤销赠与并请求返还电脑。何霖接受了整理、扫描照片的附带义务，到期后仍明确拒绝履行，属于法定撤销事由；电脑已经交付不妨碍这项法定撤销。郁航在得知拒绝履行后两个月内发出并送达撤销通知，没有超过一年的行使期间，撤销后可请求返还赠与财产。",
    },
    pitfall: "只看有没有在一年内提出，却不审查是否存在法定事由。",
    recall: {
      prompt: "附义务不履行与单纯不满，为什么会得出不同结论？",
      reference:
        "合同约定义务到期而拒不履行，可以构成法定撤销事由；单纯不合心意不等于法定事由。赠与人本人应在一年内行使，依法撤销后可请求返还。",
    },
    sources: ["civil-gift-loan-gift-statutory663"],
    exercises: [
      {
        caseId: "civil-gift-loan-case-gift-duty-refusal",
        relatedTopicIds: ["civil-gift-statutory-revocation"],
        facts:
          "本案为原创教学虚构。2025年2月，郁航将自己一台闲置电脑无偿赠给摄影同好何霖。何霖接受，双方在赠与合同中约定何霖附带为郁航整理、扫描30张旧照片，6月30日前交回原件及电子文件。电脑和照片当月已经交给何霖。期限届满仍未完成，7月1日何霖明确表示虽有时间和设备，也不打算履行这一约定。9月1日，郁航的撤销赠与通知到达何霖，并要求返还电脑。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-gift-loan-gift-statutory663"],
        id: "civil-gift-loan-gift-duty-refusal-choice",
        kind: "objective",
        choiceMode: "single",
        title: "电脑与旧照片的约定",
        prompt: "郁航能否在9月撤销赠与并请求返还电脑？",
        options: [
          {
            id: "a",
            text: "不能，因为电脑已经交付，任何撤销权都已消灭。",
            explanation: "交付后不能任意撤销，不等于不能依法定事由撤销。",
          },
          {
            id: "b",
            text: "不能，因为不履行附带义务只能请求继续履行，不能撤销赠与。",
            explanation:
              "第663条第一款第三项将不履行赠与合同约定义务列为撤销事由。",
          },
          {
            id: "c",
            text: "可以，因为何霖拒绝履行约定义务，郁航在一年内撤销后可请求返还。",
            explanation:
              "明确附义务、到期拒不履行和及时行使撤销权均有事实支撑。",
          },
          {
            id: "d",
            text: "可以，但适用的撤销期间一律是知道事由后六个月。",
            explanation:
              "本案是赠与人本人依第663条撤销，适用一年，不是第664条特殊主体的六个月。",
          },
        ],
        answer: "c",
        reference:
          "选C。郁航可以撤销赠与并请求返还电脑。何霖接受了整理、扫描照片的附带义务，到期后仍明确拒绝履行，属于法定撤销事由；电脑已经交付不妨碍这项法定撤销。郁航在得知拒绝履行后两个月内发出并送达撤销通知，没有超过一年的行使期间，撤销后可请求返还赠与财产。",
      },
      {
        caseId: "civil-gift-loan-case-gift-duty-refusal",
        relatedTopicIds: ["civil-gift-statutory-revocation"],
        facts:
          "本案为原创教学虚构。2025年2月，郁航将自己一台闲置电脑无偿赠给摄影同好何霖。何霖接受，双方在赠与合同中约定何霖附带为郁航整理、扫描30张旧照片，6月30日前交回原件及电子文件。电脑和照片当月已经交给何霖。期限届满仍未完成，7月1日何霖明确表示虽有时间和设备，也不打算履行这一约定。9月1日，郁航的撤销赠与通知到达何霖，并要求返还电脑。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-gift-loan-gift-statutory663"],
        id: "civil-gift-loan-gift-duty-refusal-explain",
        kind: "subjective",
        title: "约定事项到期后的通知",
        prompt:
          "郁航能否在9月撤销赠与并请求返还电脑？请写出结论并结合案情说明理由。",
        answer: "",
        reference:
          "郁航可以撤销赠与并请求返还电脑。何霖接受了整理、扫描照片的附带义务，到期后仍明确拒绝履行，属于法定撤销事由；电脑已经交付不妨碍这项法定撤销。郁航在得知拒绝履行后两个月内发出并送达撤销通知，没有超过一年的行使期间，撤销后可请求返还赠与财产。",
        criteria: [
          {
            id: "gift-duty663-ground",
            label: "不履行约定义务构成法定事由",
            meaning:
              "联系何霖接受附带义务、到期后有能力仍明确拒不履行，说明郁航可依法定事由撤销，交付并不排除这项撤销权。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不要求评价照片价值或把此案改写为等价有偿买卖。",
          },
          {
            id: "gift-duty663-time665-return",
            label: "及时撤销及返还后果",
            meaning:
              "联系郁航在知悉拒绝履行后两个月内通知到达，未超过一年；说明依法撤销后可请求返还电脑。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不要求固定日期计算格式、六个月特殊规则或诉讼程序。",
          },
        ],
      },
      {
        caseId: "civil-gift-loan-case-gift-social-disappointment",
        relatedTopicIds: ["civil-gift-statutory-revocation"],
        facts:
          "本案为原创教学虚构。2025年3月，许舟将自己的一对桌面音箱无偿送给同事顾桐，顾桐接受并搬回家，双方没有约定顾桐须回礼、赴宴或提供其他服务。5月，许舟邀请顾桐参加一次普通聚餐，顾桐因已有出行安排婉拒。许舟觉得对方“不够热情”，仅因此要求撤销赠与、返还音箱。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-gift-loan-gift-statutory663"],
        id: "civil-gift-loan-gift-social-disappointment-choice",
        kind: "objective",
        choiceMode: "single",
        title: "音箱赠送后的聚餐",
        prompt: "许舟能否仅因顾桐没有参加这次聚餐而撤销赠与、要回音箱？",
        options: [
          {
            id: "a",
            text: "可以，受赠人未满足赠与人的一切期待都属于违约。",
            explanation: "赠与人的单方期待不等于赠与合同约定的义务。",
          },
          {
            id: "b",
            text: "不能，音箱已交付，题述未赴聚餐也没有构成法定撤销事由。",
            explanation: "无赴宴等约定义务，正常婉拒聚餐不能替代法定撤销条件。",
          },
          {
            id: "c",
            text: "可以，只要许舟在得知未赴宴后一年内提出。",
            explanation: "在一年内提出也仍须有法定撤销事由，期间不能替代事由。",
          },
          {
            id: "d",
            text: "不能，但只因为同事之间赠与一律不得撤销。",
            explanation:
              "同事身份不决定撤销权，本案取决于已交付及欠缺题述撤销事由。",
          },
        ],
        answer: "b",
        reference:
          "选B。许舟不能仅凭这次未赴聚餐撤销赠与、要回音箱。音箱已经交付，不能再任意反悔；双方也没有约定顾桐须赴宴，正常婉拒聚餐不构成本案的法定撤销事由。许舟的社交期待落空本身不足以索回赠与。",
      },
      {
        caseId: "civil-gift-loan-case-gift-social-disappointment",
        relatedTopicIds: ["civil-gift-statutory-revocation"],
        facts:
          "本案为原创教学虚构。2025年3月，许舟将自己的一对桌面音箱无偿送给同事顾桐，顾桐接受并搬回家，双方没有约定顾桐须回礼、赴宴或提供其他服务。5月，许舟邀请顾桐参加一次普通聚餐，顾桐因已有出行安排婉拒。许舟觉得对方“不够热情”，仅因此要求撤销赠与、返还音箱。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-gift-loan-gift-statutory663"],
        id: "civil-gift-loan-gift-social-disappointment-explain",
        kind: "subjective",
        title: "一次未赴约后的返还请求",
        prompt:
          "许舟能否仅因顾桐没有参加这次聚餐而撤销赠与、要回音箱？请写出结论并结合案情说明理由。",
        answer: "",
        reference:
          "许舟不能仅凭这次未赴聚餐撤销赠与、要回音箱。音箱已经交付，不能再任意反悔；双方也没有约定顾桐须赴宴，正常婉拒聚餐不构成本案的法定撤销事由。许舟的社交期待落空本身不足以索回赠与。",
        criteria: [
          {
            id: "gift-social663",
            label: "区分单方期待与法定撤销事由",
            meaning:
              "联系赠与已交付、没有赴宴义务及顾桐正常婉拒，说明仅因此不满不能撤销索回。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "不要求穷举全部法定撤销事由，也不将同事关系作为独立判断规则。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-gift-hardship",
    title: "经济显著恶化后的停止履行",
    headline: "看经济变化是否严重影响生产经营或家庭生活。",
    goal: "经济显著恶化时，未履行与已履行的赠与怎样区分？",
    prerequisite: "区分停止后续履行与撤销后返还。",
    minutes: "6–10",
    paragraphs: [
      "赠与人的经济状况显著恶化，严重影响其生产经营或者家庭生活，可以不再履行赠与义务。应结合收入、可用财产及必要支出判断，不能把任何经济波动都等同于这一条件。",
      "这项规则也可以适用于经公证的赠与。它支持停止尚未履行的部分，不能仅凭经济恶化就当然要求返还此前已经交付的财产。",
    ],
    example: {
      title: "八万元赠与的履行日期",
      facts:
        "本案为原创教学虚构。2025年1月，梁乔与好友夏宁订立并公证赠与合同，约定9月无偿赠给夏宁8万元，夏宁接受。当时梁乔每月工资2万元，存款18万元。6月，用人单位关闭，梁乔失去工资，随后家人接受必要治疗，存款支付医疗费后只剩2万元。现有凭证表明，全家没有其他收入和可用于履行的财产，每月必要房租、饮食及后续治疗费约1万元，赠与款尚未支付。梁乔通知夏宁不再支付这8万元。",
      analysis:
        "梁乔可以因本案经济变化不再履行这笔尚未支付的赠与。订约后工资中断，必要医疗支出又使存款从18万元降至2万元，全家缺少其他收入和可用财产；继续支付8万元会严重影响基本家庭生活，符合第666条。合同已经公证，不妨碍适用这项规则。",
    },
    pitfall: "把可以不再履行，写成全部赠与自动失效并一律返还。",
    recall: {
      prompt: "经济显著恶化时，未履行与已履行的赠与怎样区分？",
      reference:
        "达到显著恶化且严重影响的条件，可以不再履行后续赠与；仅此依据不当然追回已经交付的财产。",
    },
    sources: ["civil-gift-loan-gift-hardship666"],
    exercises: [
      {
        caseId: "civil-gift-loan-case-gift-family-hardship",
        relatedTopicIds: ["civil-gift-hardship"],
        facts:
          "本案为原创教学虚构。2025年1月，梁乔与好友夏宁订立并公证赠与合同，约定9月无偿赠给夏宁8万元，夏宁接受。当时梁乔每月工资2万元，存款18万元。6月，用人单位关闭，梁乔失去工资，随后家人接受必要治疗，存款支付医疗费后只剩2万元。现有凭证表明，全家没有其他收入和可用于履行的财产，每月必要房租、饮食及后续治疗费约1万元，赠与款尚未支付。梁乔通知夏宁不再支付这8万元。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-gift-loan-gift-hardship666"],
        id: "civil-gift-loan-gift-family-hardship-choice",
        kind: "objective",
        choiceMode: "single",
        title: "八万元赠与的履行日期",
        prompt: "梁乔能否因上述经济变化不再履行这笔赠与？",
        options: [
          {
            id: "a",
            text: "可以，因为失业和必要医疗支出使经济显著恶化，继续赠与会严重影响家庭生活。",
            explanation:
              "具体收入、财产及必要支出足以支持第666条条件，经公证不排除该条。",
          },
          {
            id: "b",
            text: "不能，因为赠与一经公证，任何经济变化都不影响履行。",
            explanation: "公证排除任意撤销，不排除符合第666条的停止履行。",
          },
          {
            id: "c",
            text: "可以，但只因为任何公证赠与在未付款前都能任意撤销。",
            explanation:
              "本案不是第658条的任意撤销，而是有具体重大经济困难支持第666条。",
          },
          {
            id: "d",
            text: "不能，因为必须等梁乔实际无法支付房租后才能适用该规则。",
            explanation:
              "已有经济状况足以显示继续履行会严重影响家庭生活，不以实际陷入断供为前提。",
          },
        ],
        answer: "a",
        reference:
          "选A。梁乔可以因本案经济变化不再履行这笔尚未支付的赠与。订约后工资中断，必要医疗支出又使存款从18万元降至2万元，全家缺少其他收入和可用财产；继续支付8万元会严重影响基本家庭生活，符合第666条。合同已经公证，不妨碍适用这项规则。",
      },
      {
        caseId: "civil-gift-loan-case-gift-family-hardship",
        relatedTopicIds: ["civil-gift-hardship"],
        facts:
          "本案为原创教学虚构。2025年1月，梁乔与好友夏宁订立并公证赠与合同，约定9月无偿赠给夏宁8万元，夏宁接受。当时梁乔每月工资2万元，存款18万元。6月，用人单位关闭，梁乔失去工资，随后家人接受必要治疗，存款支付医疗费后只剩2万元。现有凭证表明，全家没有其他收入和可用于履行的财产，每月必要房租、饮食及后续治疗费约1万元，赠与款尚未支付。梁乔通知夏宁不再支付这8万元。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-gift-loan-gift-hardship666"],
        id: "civil-gift-loan-gift-family-hardship-explain",
        kind: "subjective",
        title: "家庭支出变化后的赠与",
        prompt:
          "梁乔能否因上述经济变化不再履行这笔赠与？请写出结论并结合案情说明理由。",
        answer: "",
        reference:
          "梁乔可以因本案经济变化不再履行这笔尚未支付的赠与。订约后工资中断，必要医疗支出又使存款从18万元降至2万元，全家缺少其他收入和可用财产；继续支付8万元会严重影响基本家庭生活，符合第666条。合同已经公证，不妨碍适用这项规则。",
        criteria: [
          {
            id: "gift-family666",
            label: "联系经济恶化及家庭生活判断停止履行",
            meaning:
              "联系工资中断、医疗支出耗尽主要存款、仅剩2万元且每月必要支出约1万元，说明经济显著恶化并严重影响家庭生活，可不再支付；公证不排除第666条。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "不要求等待家庭实际断供、计算损害赔偿或引用任意撤销规则。",
          },
        ],
      },
      {
        caseId: "civil-gift-loan-case-gift-business-hardship",
        relatedTopicIds: ["civil-gift-hardship"],
        facts:
          "本案为原创教学虚构。2025年1月，经营个人木工作坊的陶临与同学陆原订立并公证赠与合同，无偿赠给陆原12万元用于购买个人音乐器材，陆原接受。合同约定2月、8月各付6万元，陶临已按约支付第一期。6月，作坊主要设备在火灾中烧毁，停产后持续亏损。现有账目表明，陶临仅余可动用资金4万元，已到期的职工工资和维持场地的必要房租合计5万元，且无其他收入或可处置财产。陶临据此通知陆原，第二期不再支付，并要求退回已付的第一期。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-gift-loan-gift-hardship666"],
        id: "civil-gift-loan-gift-business-hardship-choice",
        kind: "objective",
        choiceMode: "single",
        title: "两期赠与与设备损失",
        prompt:
          "仅根据这些经济变化，陶临对第二期付款和第一期返还的主张各应如何判断？",
        options: [
          {
            id: "a",
            text: "第二期仍必须支付，第一期也不能要求返还，因为公证排除一切停止履行。",
            explanation:
              "公证不排除第666条；本案具体账目支持经济显著恶化且严重影响生产经营。",
          },
          {
            id: "b",
            text: "第二期可以不再支付，第一期也当然应返还，因为经济恶化使全部赠与自动失效。",
            explanation: "第666条允许不再履行，不使已经履行的赠与自动失效。",
          },
          {
            id: "c",
            text: "第二期仍必须支付，但第一期应退回以支持作坊继续经营。",
            explanation: "把尚未履行与已履行的后果倒置，缺少法律根据。",
          },
          {
            id: "d",
            text: "第二期可以不再支付，但不能仅凭经济恶化要求退回第一期。",
            explanation:
              "第666条支持停止后续履行，不当然产生追回已经赠与款项的权利。",
          },
        ],
        answer: "d",
        reference:
          "选D。陶临可以不再支付第二期6万元，但不能仅凭这次经济恶化要求陆原退回已付的第一期。设备损失、停产亏损及现有资金连必要工资房租都不足，表明经济显著恶化并严重影响生产经营，符合第666条；该条只支持不再履行后续赠与，并不使已付第一期当然返还。",
      },
      {
        caseId: "civil-gift-loan-case-gift-business-hardship",
        relatedTopicIds: ["civil-gift-hardship"],
        facts:
          "本案为原创教学虚构。2025年1月，经营个人木工作坊的陶临与同学陆原订立并公证赠与合同，无偿赠给陆原12万元用于购买个人音乐器材，陆原接受。合同约定2月、8月各付6万元，陶临已按约支付第一期。6月，作坊主要设备在火灾中烧毁，停产后持续亏损。现有账目表明，陶临仅余可动用资金4万元，已到期的职工工资和维持场地的必要房租合计5万元，且无其他收入或可处置财产。陶临据此通知陆原，第二期不再支付，并要求退回已付的第一期。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-gift-loan-gift-hardship666"],
        id: "civil-gift-loan-gift-business-hardship-explain",
        kind: "subjective",
        title: "后一期款项及已付款的争议",
        prompt:
          "仅根据这些经济变化，陶临对第二期付款和第一期返还的主张各应如何判断？请写出结论并结合案情说明理由。",
        answer: "",
        reference:
          "陶临可以不再支付第二期6万元，但不能仅凭这次经济恶化要求陆原退回已付的第一期。设备损失、停产亏损及现有资金连必要工资房租都不足，表明经济显著恶化并严重影响生产经营，符合第666条；该条只支持不再履行后续赠与，并不使已付第一期当然返还。",
        criteria: [
          {
            id: "gift-business666-future",
            label: "经济恶化支持停止后续履行",
            meaning:
              "联系设备损失、停产亏损、可用资金不足必要工资和房租，说明严重影响生产经营，可以不再支付第二期，公证不排除该规则。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不要求证明某一特定灾害类型、保险或破产程序。",
          },
          {
            id: "gift-business666-past",
            label: "已交付部分不当然返还",
            meaning:
              "说明第666条停止履行的效果针对未履行部分，不能仅凭经济恶化要求返还已付的第一期6万元。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "只判断题述经济困难这一依据，不排除另有事实时可能发生的其他法定权利。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-loan-delivery",
    title: "自然人借款的成立",
    headline: "自然人之间借钱，要到贷款人实际提供借款时，借款合同才成立。",
    goal: "自然人借款什么时候成立？",
    prerequisite: "知道借款应当返还，并能区分签字、收款和还款。",
    minutes: "6–10",
    paragraphs: [
      "普通自然人之间的借款合同，在贷款人提供借款时成立。只有借条、签字或口头承诺，尚未实际提供资金，还不够。",
      "转款已经实际到账、借款人能够控制使用时，通常已经提供了借款。不必等借款人把钱花掉，也不必等到还款。",
    ],
    example: {
      title: "签字后的转款安排",
      facts:
        "本案为原创教学虚构。周禾与朋友许远签了一份借款文书，写明许远借给周禾3万元，三天后转款。到约定转款日，许远尚未转账，也未用现金或其他方式把钱交给周禾。两人均为有完全民事行为能力的普通自然人。周禾说：“借款文书签了，借款合同当天就成立了。”本题只讨论借款合同是否成立。",
      analysis:
        "借款合同还没有成立。许远虽然签了文书，但3万元一直没有交给周禾。自然人之间的借款合同在贷款人提供借款时成立，签字本身不够。",
    },
    pitfall: "把签字时间、约定转款时间和实际到账时间混在一起。",
    recall: {
      prompt: "自然人借款什么时候成立？",
      reference: "自然人之间借钱，要到贷款人实际提供借款时，借款合同才成立。",
    },
    sources: ["civil-gift-loan-delivery679"],
    exercises: [
      {
        caseId: "civil-gift-loan-loan-signed-before-transfer",
        facts:
          "本案为原创教学虚构。周禾与朋友许远签了一份借款文书，写明许远借给周禾3万元，三天后转款。到约定转款日，许远尚未转账，也未用现金或其他方式把钱交给周禾。两人均为有完全民事行为能力的普通自然人。周禾说：“借款文书签了，借款合同当天就成立了。”本题只讨论借款合同是否成立。",
        sources: ["civil-gift-loan-delivery679"],
        hint: "把签字日期和实际提供资金的时间分开看。",
        reference:
          "借款合同还没有成立。许远虽然签了文书，但3万元一直没有交给周禾。自然人之间的借款合同在贷款人提供借款时成立，签字本身不够。",
        id: "civil-gift-loan-loan-signed-before-transfer-choice",
        kind: "objective",
        choiceMode: "single",
        title: "签字后的转款安排：选择判断",
        prompt: "此时两人之间的借款合同处于什么状态？",
        options: [
          {
            id: "A",
            text: "签字时已经成立，是否实际转款只影响履行",
            explanation: "自然人之间的借款合同自提供借款时成立，不能只看签字。",
          },
          {
            id: "B",
            text: "尚未成立，因为许远还没有提供借款",
            explanation:
              "许远没有转款或以其他方式提供借款，尚未满足本案的成立条件。",
          },
          {
            id: "C",
            text: "已经成立，因为文书写清了借款金额",
            explanation: "金额明确不能代替实际提供借款。",
          },
          {
            id: "D",
            text: "必须等周禾还款后才成立",
            explanation: "还款是成立后的履行，不是成立条件。",
          },
        ],
        answer: "B",
      },
      {
        caseId: "civil-gift-loan-loan-signed-before-transfer",
        facts:
          "本案为原创教学虚构。周禾与朋友许远签了一份借款文书，写明许远借给周禾3万元，三天后转款。到约定转款日，许远尚未转账，也未用现金或其他方式把钱交给周禾。两人均为有完全民事行为能力的普通自然人。周禾说：“借款文书签了，借款合同当天就成立了。”本题只讨论借款合同是否成立。",
        sources: ["civil-gift-loan-delivery679"],
        hint: "把签字日期和实际提供资金的时间分开看。",
        reference:
          "借款合同还没有成立。许远虽然签了文书，但3万元一直没有交给周禾。自然人之间的借款合同在贷款人提供借款时成立，签字本身不够。",
        id: "civil-gift-loan-loan-signed-before-transfer-written",
        kind: "subjective",
        title: "签字后的转款安排：写出分析",
        prompt:
          "两人的借款合同是否已经成立？说明签字和实际提供借款在本案中的作用。",
        criteria: [
          {
            id: "loan-signed-status",
            label: "成立结论",
            meaning: "认定尚未成立。",
            acceptable: "尚未成立、还没有成立等同义表达均可。",
            boundary:
              "把签字、金额确定或约定转款日到来当作已经成立，不符合本案。",
          },
          {
            id: "loan-signed-provision",
            label: "实际提供借款",
            meaning:
              "联系许远尚未以任何方式提供3万元，说明自然人借款需实际提供。",
            acceptable: "说明钱还没给，只有借款文书还不够即可，不要求背法条。",
            boundary:
              "只说合同没有成立，不说明实际提供这一条件，理由尚未完成。",
          },
        ],
      },
      {
        caseId: "civil-gift-loan-loan-received-date",
        facts:
          "本案为原创教学虚构。林妍与朋友程书都是有完全民事行为能力的普通自然人。9月2日，两人签了借款文书，约定程书借给林妍2万元。9月5日程书将2万元转进林妍本人账户，当天实际到账，林妍确认收到并可自由使用。此前程书没有提供过这笔借款。",
        sources: ["civil-gift-loan-delivery679"],
        hint: "提供资金与借款人之后如何花钱，是两个时间点。",
        reference:
          "合同在9月5日成立。当天2万元实际到账，林妍已经收到并能使用，程书完成了提供借款。9月2日只有签字，尚未提供资金；林妍收到后暂时不花钱，也不影响合同成立。",
        id: "civil-gift-loan-loan-received-date-choice",
        kind: "objective",
        choiceMode: "single",
        title: "文书与到账的两天：选择判断",
        prompt: "这笔自然人借款合同何时成立？",
        options: [
          {
            id: "A",
            text: "9月2日签字时",
            explanation: "签字时借款尚未实际提供。",
          },
          {
            id: "B",
            text: "林妍第一次花掉这笔钱时",
            explanation: "收到并取得控制后不需要再等实际消费。",
          },
          {
            id: "C",
            text: "9月5日借款实际到账时",
            explanation: "当天程书实际提供借款，林妍收到并取得控制。",
          },
          {
            id: "D",
            text: "林妍还清2万元时",
            explanation: "返还本金不是成立条件。",
          },
        ],
        answer: "C",
      },
      {
        caseId: "civil-gift-loan-loan-received-date",
        facts:
          "本案为原创教学虚构。林妍与朋友程书都是有完全民事行为能力的普通自然人。9月2日，两人签了借款文书，约定程书借给林妍2万元。9月5日程书将2万元转进林妍本人账户，当天实际到账，林妍确认收到并可自由使用。此前程书没有提供过这笔借款。",
        sources: ["civil-gift-loan-delivery679"],
        hint: "提供资金与借款人之后如何花钱，是两个时间点。",
        reference:
          "合同在9月5日成立。当天2万元实际到账，林妍已经收到并能使用，程书完成了提供借款。9月2日只有签字，尚未提供资金；林妍收到后暂时不花钱，也不影响合同成立。",
        id: "civil-gift-loan-loan-received-date-written",
        kind: "subjective",
        title: "文书与到账的两天：写出分析",
        prompt: "这笔借款合同在哪一天成立？林妍尚未花钱是否影响成立？",
        criteria: [
          {
            id: "loan-received-date",
            label: "成立时间",
            meaning: "认定9月5日实际到账时成立。",
            acceptable: "9月5日、收到并能控制该2万元之时均可。",
            boundary: "认定签字日或还款日成立不符合本案。",
          },
          {
            id: "loan-received-control",
            label: "提供与使用的区别",
            meaning: "联系到账并可使用，说明不必等林妍消费。",
            acceptable: "实际收到就已提供，不需要花出去等同义表达可。",
            boundary:
              "只重复签了文书，或认为没花钱就没成立，没有解释本案关键事实。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-loan-prepaid-interest",
    title: "预扣利息与借款本金",
    headline: "利息从本金里预先扣走时，本金按实际提供的数额认定。",
    goal: "预扣利息后，借款本金怎样计算？",
    prerequisite: "知道借款应当返还，并能区分签字、收款和还款。",
    minutes: "6–10",
    paragraphs: [
      "贷款人不能先从本金中扣利息、再要求借款人按全额本金返还。已经预扣的，应按实际提供的借款数额返还和计息。",
      "借款人完整收到钱后，自己拿去付房租、买东西，是收款后的支出，不是贷款人预扣。这些花费不会减少原借款本金。",
    ],
    example: {
      title: "借条与转款的差额",
      facts:
        "本案为原创教学虚构。普通自然人顾辰向朋友沈宁借钱。借条上写本金10万元，沈宁在转款时先扣下1万元，说这是预先收取的利息，实际只给顾辰9万元。此后沈宁没有补付差额，顾辰也没有归还过本金。本题只确定应返还本金及计息的本金基数，不讨论利率、利息总额或逾期责任。",
      analysis:
        "本金按9万元认定，返还和计息都以9万元为基数。借条虽写10万元，沈宁先扣了1万元利息，顾辰实际只拿到9万元。预扣利息时，法律以实际借款数额计算本金。",
    },
    pitfall: "把借条金额、实际提供额和借款人后来剩余的钱当成同一个数。",
    recall: {
      prompt: "预扣利息后，借款本金怎样计算？",
      reference: "利息从本金里预先扣走时，本金按实际提供的数额认定。",
    },
    sources: ["civil-gift-loan-principal670"],
    exercises: [
      {
        caseId: "civil-gift-loan-loan-deducted-interest",
        facts:
          "本案为原创教学虚构。普通自然人顾辰向朋友沈宁借钱。借条上写本金10万元，沈宁在转款时先扣下1万元，说这是预先收取的利息，实际只给顾辰9万元。此后沈宁没有补付差额，顾辰也没有归还过本金。本题只确定应返还本金及计息的本金基数，不讨论利率、利息总额或逾期责任。",
        sources: ["civil-gift-loan-principal670"],
        hint: "先列出真正交到借款人手里的数额。",
        reference:
          "本金按9万元认定，返还和计息都以9万元为基数。借条虽写10万元，沈宁先扣了1万元利息，顾辰实际只拿到9万元。预扣利息时，法律以实际借款数额计算本金。",
        id: "civil-gift-loan-loan-deducted-interest-choice",
        kind: "objective",
        choiceMode: "single",
        title: "借条与转款的差额：选择判断",
        prompt: "本案应以多少元作为应返还本金及计息的本金基数？",
        options: [
          {
            id: "A",
            text: "10万元，因为借条写了10万元",
            explanation: "预扣的利息不能计入尚未实际提供的本金。",
          },
          {
            id: "B",
            text: "9万元，以实际提供的数额为准",
            explanation: "实际只提供9万元，应以9万元作为本金基数。",
          },
          {
            id: "C",
            text: "8万元，应再扣一次已经收取的1万元",
            explanation: "9万元已经是实际提供额，不能再重复扣减。",
          },
          {
            id: "D",
            text: "不必返还任何本金，因为利息被预扣",
            explanation: "预扣利息影响本金基数，不使实际收到的借款免于返还。",
          },
        ],
        answer: "B",
      },
      {
        caseId: "civil-gift-loan-loan-deducted-interest",
        facts:
          "本案为原创教学虚构。普通自然人顾辰向朋友沈宁借钱。借条上写本金10万元，沈宁在转款时先扣下1万元，说这是预先收取的利息，实际只给顾辰9万元。此后沈宁没有补付差额，顾辰也没有归还过本金。本题只确定应返还本金及计息的本金基数，不讨论利率、利息总额或逾期责任。",
        sources: ["civil-gift-loan-principal670"],
        hint: "先列出真正交到借款人手里的数额。",
        reference:
          "本金按9万元认定，返还和计息都以9万元为基数。借条虽写10万元，沈宁先扣了1万元利息，顾辰实际只拿到9万元。预扣利息时，法律以实际借款数额计算本金。",
        id: "civil-gift-loan-loan-deducted-interest-written",
        kind: "subjective",
        title: "借条与转款的差额：写出分析",
        prompt: "应按多少本金返还和计息？说明预扣的1万元怎样影响本金基数。",
        criteria: [
          {
            id: "loan-deducted-base",
            label: "实际本金",
            meaning: "认定应返还和计息的本金基数为9万元。",
            acceptable: "九万元、90000元均可。",
            boundary: "认定10万元或再次扣减为8万元不符合本案。",
          },
          {
            id: "loan-deducted-reason",
            label: "预扣利息的处理",
            meaning: "联系10万元中预扣1万元、仅提供9万元，说明应按实际提供额。",
            acceptable: "说明预扣的利息不是实际给出的本金即可。",
            boundary:
              "只报9万元而未说明实际提供与预扣的关系，理由未完成；不要求另算利息。",
          },
        ],
      },
      {
        caseId: "civil-gift-loan-loan-spent-after-receipt",
        facts:
          "本案为原创教学虚构。普通自然人陆青借给朋友方明4万元，4万元已完整转入方明本人账户，陆青没有预扣款项，也未让方明转回任何费用。方明随后拿其中2000元向自己的房东支付房租。还款时，方明说：“我实际剩下能用的只有3.8万元，所以本金只能算3.8万元。”此前没有还过本金。",
        sources: ["civil-gift-loan-principal670"],
        hint: "看钱是否已经完整提供，而不是还剩多少没花。",
        reference:
          "本金是4万元。陆青已经把4万元完整交给方明，没有预扣利息或要求返还费用。2000元房租是方明收款后自己的支出，不是贷款人少给的钱，不能从借款本金里扣除。",
        id: "civil-gift-loan-loan-spent-after-receipt-choice",
        kind: "objective",
        choiceMode: "single",
        title: "到账后的房租支出：选择判断",
        prompt: "这笔借款的本金应如何认定？",
        options: [
          {
            id: "A",
            text: "3.8万元，扣除方明支付的房租",
            explanation: "借款人收款后的个人支出不减少已经提供的本金。",
          },
          {
            id: "B",
            text: "4.2万元，房租也要加进本金",
            explanation: "房租不构成陆青另行提供的借款。",
          },
          {
            id: "C",
            text: "没有本金，因为钱已经部分花掉",
            explanation: "花掉借款不会消灭返还本金义务。",
          },
          {
            id: "D",
            text: "4万元，陆青已完整提供这笔借款",
            explanation: "陆青没有预扣，方明之后怎样支出不改变本金。",
          },
        ],
        answer: "D",
      },
      {
        caseId: "civil-gift-loan-loan-spent-after-receipt",
        facts:
          "本案为原创教学虚构。普通自然人陆青借给朋友方明4万元，4万元已完整转入方明本人账户，陆青没有预扣款项，也未让方明转回任何费用。方明随后拿其中2000元向自己的房东支付房租。还款时，方明说：“我实际剩下能用的只有3.8万元，所以本金只能算3.8万元。”此前没有还过本金。",
        sources: ["civil-gift-loan-principal670"],
        hint: "看钱是否已经完整提供，而不是还剩多少没花。",
        reference:
          "本金是4万元。陆青已经把4万元完整交给方明，没有预扣利息或要求返还费用。2000元房租是方明收款后自己的支出，不是贷款人少给的钱，不能从借款本金里扣除。",
        id: "civil-gift-loan-loan-spent-after-receipt-written",
        kind: "subjective",
        title: "到账后的房租支出：写出分析",
        prompt: "方明应返还的本金是多少？他的房租支出与预扣利息有什么不同？",
        criteria: [
          {
            id: "loan-spent-base",
            label: "本金结论",
            meaning: "认定应返还本金4万元。",
            acceptable: "四万元、40000元均可。",
            boundary: "按剩余现金3.8万元计算本金不符合本案。",
          },
          {
            id: "loan-spent-distinction",
            label: "个人支出与预扣的区别",
            meaning:
              "联系已完整到账、房租付给方明自己的房东，说明个人花费不减少实际借款。",
            acceptable: "已收到全部借款，后来自己花钱不减本金即可。",
            boundary: "只看到花了2000元就按预扣利息扣本金，混淆两种事实。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-loan-interest",
    title: "自然人借款的借期利息",
    headline:
      "没约利息，或自然人借款利息约定不明且补充不成，借期内按无息处理。",
    goal: "自然人借款没说清利息时，借期利息如何处理？",
    prerequisite: "知道借款应当返还，并能区分签字、收款和还款。",
    minutes: "6–10",
    paragraphs: [
      "借款合同没有约定支付利息的，视为没有利息。贷款人不能在借出之后单方指定银行利率或市场利率。",
      "自然人之间虽提过利息，却没有说清标准，之后又谈不成补充协议，也按没有利息处理。这里讲借期内利息；逾期责任、非自然人借款要分别判断。",
    ],
    example: {
      title: "半年借款的利息请求",
      facts:
        "本案为原创教学虚构。普通自然人叶舒借给朋友唐禾2万元，约定借期半年，钱已交付。两人没有约定借期内支付利息，借条和后续沟通都没有利息条款。借出三个月后，叶舒要求唐禾从借出之日起按银行同期利率付息。借期尚未届满，本题不涉及逾期。",
      analysis:
        "唐禾不必支付这笔借期内利息。双方没有约定支付利息，法律按没有利息处理，叶舒不能事后单方加上银行利率。这里解决的是借期内利息，到期仍应返还本金。",
    },
    pitfall:
      "写过“利息”就认为贷款人可以事后任意定价，或把借期无息说成永远没有任何逾期责任。",
    recall: {
      prompt: "自然人借款没说清利息时，借期利息如何处理？",
      reference:
        "没约利息，或自然人借款利息约定不明且补充不成，借期内按无息处理。",
    },
    sources: ["civil-gift-loan-interest680"],
    exercises: [
      {
        caseId: "civil-gift-loan-loan-no-interest-agreement",
        facts:
          "本案为原创教学虚构。普通自然人叶舒借给朋友唐禾2万元，约定借期半年，钱已交付。两人没有约定借期内支付利息，借条和后续沟通都没有利息条款。借出三个月后，叶舒要求唐禾从借出之日起按银行同期利率付息。借期尚未届满，本题不涉及逾期。",
        sources: ["civil-gift-loan-interest680"],
        hint: "把约定的借期内利息与逾期责任区分开。",
        reference:
          "唐禾不必支付这笔借期内利息。双方没有约定支付利息，法律按没有利息处理，叶舒不能事后单方加上银行利率。这里解决的是借期内利息，到期仍应返还本金。",
        id: "civil-gift-loan-loan-no-interest-agreement-choice",
        kind: "objective",
        choiceMode: "single",
        title: "半年借款的利息请求：选择判断",
        prompt: "叶舒提出的借期内利息请求应怎样处理？",
        options: [
          {
            id: "A",
            text: "应支付，因为借钱通常要有回报",
            explanation: "不能用通常想法补出双方没有约定的借期利息。",
          },
          {
            id: "B",
            text: "应由叶舒单方选择一个银行利率",
            explanation: "贷款人不能单方增加未约定的借期利息。",
          },
          {
            id: "C",
            text: "不支持，未约定利息视为没有借期利息",
            explanation: "借款合同未约定支付利息，本案借期内按无息处理。",
          },
          {
            id: "D",
            text: "不付利息就连本金也不必返还",
            explanation: "借期无息不免除到期返还本金的义务。",
          },
        ],
        answer: "C",
      },
      {
        caseId: "civil-gift-loan-loan-no-interest-agreement",
        facts:
          "本案为原创教学虚构。普通自然人叶舒借给朋友唐禾2万元，约定借期半年，钱已交付。两人没有约定借期内支付利息，借条和后续沟通都没有利息条款。借出三个月后，叶舒要求唐禾从借出之日起按银行同期利率付息。借期尚未届满，本题不涉及逾期。",
        sources: ["civil-gift-loan-interest680"],
        hint: "把约定的借期内利息与逾期责任区分开。",
        reference:
          "唐禾不必支付这笔借期内利息。双方没有约定支付利息，法律按没有利息处理，叶舒不能事后单方加上银行利率。这里解决的是借期内利息，到期仍应返还本金。",
        id: "civil-gift-loan-loan-no-interest-agreement-written",
        kind: "subjective",
        title: "半年借款的利息请求：写出分析",
        prompt: "唐禾是否应支付叶舒现在要求的借期内利息？说明理由。",
        criteria: [
          {
            id: "loan-no-interest-result",
            label: "借期利息结论",
            meaning: "认定不支持现提出的借期内利息。",
            acceptable: "没有约定所以借期无息、不用支付这笔利息均可。",
            boundary: "用银行利率或市场利率自动补上利息不符合本案。",
          },
          {
            id: "loan-no-interest-ground",
            label: "约定与请求的关系",
            meaning: "联系双方未约定利息，说明贷款人不能单方增加。",
            acceptable: "未约利息视为无息即可，不要求固定措辞。",
            boundary:
              "只说朋友之间不应收利息、或说本金也不用还，不是本案依据。",
          },
        ],
      },
      {
        caseId: "civil-gift-loan-loan-vague-interest",
        facts:
          "本案为原创教学虚构。普通自然人许松借给朋友韩安3万元，约定借期一年并已交款。借条只写“还钱时付些利息”，没有利率、金额或计算办法。后来两人协商，仍无法就利息达成补充协议；两人此前没有借贷交易习惯。借出四个月后，许松要求按自己选定的年利率计算。本题只问借期内利息，不涉及逾期。",
        sources: ["civil-gift-loan-interest680"],
        hint: "利息有无明确标准，不能只看是否写过“利息”二字。",
        reference:
          "许松不能按自己选定的利率收息，本案借期按无息处理。“付些利息”没有说明计算标准，双方后来也没能谈成补充协议。自然人之间的借款遇到这种情况，视为没有利息，而不是由贷款人单方定价。",
        id: "civil-gift-loan-loan-vague-interest-choice",
        kind: "objective",
        choiceMode: "single",
        title: "借条上的几句客气话：选择判断",
        prompt: "本案借期内利息应怎样处理？",
        options: [
          {
            id: "A",
            text: "按没有利息处理",
            explanation:
              "自然人借款利息约定不明、又不能补充，本案借期按无息处理。",
          },
          {
            id: "B",
            text: "按许松单方指定的利率处理",
            explanation: "有付些利息的表述，不等于贷款人可以单方确定标准。",
          },
          {
            id: "C",
            text: "无论是否自然人，一律按市场利率处理",
            explanation: "自然人之间利息约定不明有专门的无息规则。",
          },
          {
            id: "D",
            text: "因利息说不清，借款合同整体当然无效",
            explanation: "利息约定不明不使已经交付的借款合同当然无效。",
          },
        ],
        answer: "A",
      },
      {
        caseId: "civil-gift-loan-loan-vague-interest",
        facts:
          "本案为原创教学虚构。普通自然人许松借给朋友韩安3万元，约定借期一年并已交款。借条只写“还钱时付些利息”，没有利率、金额或计算办法。后来两人协商，仍无法就利息达成补充协议；两人此前没有借贷交易习惯。借出四个月后，许松要求按自己选定的年利率计算。本题只问借期内利息，不涉及逾期。",
        sources: ["civil-gift-loan-interest680"],
        hint: "利息有无明确标准，不能只看是否写过“利息”二字。",
        reference:
          "许松不能按自己选定的利率收息，本案借期按无息处理。“付些利息”没有说明计算标准，双方后来也没能谈成补充协议。自然人之间的借款遇到这种情况，视为没有利息，而不是由贷款人单方定价。",
        id: "civil-gift-loan-loan-vague-interest-written",
        kind: "subjective",
        title: "借条上的几句客气话：写出分析",
        prompt:
          "许松能否按自己选定的利率收取借期利息？本案应如何处理利息约定不明的问题？",
        criteria: [
          {
            id: "loan-vague-result",
            label: "不明利息的结论",
            meaning: "认定借期按无息处理，不支持单方所选利率。",
            acceptable: "自然人借款约定不明按没有利息处理即可。",
            boundary: "仅凭写过利息二字就认可贷款人自行定价，不符合本案。",
          },
          {
            id: "loan-vague-ground",
            label: "适用事实与范围",
            meaning: "联系双方均为自然人、利息标准不明且补充协商不成。",
            acceptable: "自然人借款利息没说清且后来谈不拢等同义表达可。",
            boundary:
              "照搬非自然人借款的市场利率补充办法，或宣告本金免还，不符合本案。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-loan-repayment-term",
    title: "借款期限与提前返还",
    headline:
      "没定还款日，可催告在合理期限内还；提前还款无另约的，按实际借期计息。",
    goal: "未定还款日和提前还款，各怎样处理？",
    prerequisite: "知道借款应当返还，并能区分签字、收款和还款。",
    minutes: "6–10",
    paragraphs: [
      "还款期限没有约定、也无法通过补充约定等方式确定时，借款人可以随时还，贷款人也可以催告在合理期限内还。没写日期不等于永远不用还。",
      "借款人提前返还借款，双方没有另约的，利息按实际借款期间计算。明确有效的利息约定仍适用，只是不自动算满原约定的全部期间。",
    ],
    example: {
      title: "收到催还通知之后",
      facts:
        "本案为原创教学虚构。普通自然人沈月借给朋友贺林5万元，已经交付。双方没有约定还款日，后来未达成补充约定，依合同相关内容和交易习惯也无法确定期限。沈月发出书面催还通知，要求一个月内还款；贺林签收时回复：“一个月足够我安排。”一个月过去，贺林仍未归还，却说借条没有还款日期，沈月就不能要求还钱。本题只问本金返还。",
      analysis:
        "沈月可以要求返还5万元。还款日无法确定时，贷款人可以催告借款人在合理期限内返还。沈月已经给了一个月，贺林也确认足够安排，现在期限已过，不能再用“没写还款日”拒绝还款。",
    },
    pitfall:
      "把未约期限等同于贷款人不能催还，或把原定一年等同于提前还款也必须付满一年利息。",
    recall: {
      prompt: "未定还款日和提前还款，各怎样处理？",
      reference:
        "没定还款日，可催告在合理期限内还；提前还款无另约的，按实际借期计息。",
    },
    sources: ["civil-gift-loan-term675"],
    exercises: [
      {
        caseId: "civil-gift-loan-loan-no-term-notice",
        facts:
          "本案为原创教学虚构。普通自然人沈月借给朋友贺林5万元，已经交付。双方没有约定还款日，后来未达成补充约定，依合同相关内容和交易习惯也无法确定期限。沈月发出书面催还通知，要求一个月内还款；贺林签收时回复：“一个月足够我安排。”一个月过去，贺林仍未归还，却说借条没有还款日期，沈月就不能要求还钱。本题只问本金返还。",
        sources: ["civil-gift-loan-term675"],
        hint: "未约定还款日时，查看催告和给出的还款时间。",
        reference:
          "沈月可以要求返还5万元。还款日无法确定时，贷款人可以催告借款人在合理期限内返还。沈月已经给了一个月，贺林也确认足够安排，现在期限已过，不能再用“没写还款日”拒绝还款。",
        id: "civil-gift-loan-loan-no-term-notice-choice",
        kind: "objective",
        choiceMode: "single",
        title: "收到催还通知之后：选择判断",
        prompt: "沈月现在能否要求贺林返还5万元本金？",
        options: [
          {
            id: "A",
            text: "不能，没有还款日就永远不能请求返还",
            explanation: "没有约定期限不等于永久免还。",
          },
          {
            id: "B",
            text: "不能，必须由贺林自己决定哪天还",
            explanation: "贷款人也可以催告借款人在合理期限内返还。",
          },
          {
            id: "C",
            text: "只能请求一半，因为双方对期限都有疏漏",
            explanation: "期限未约定不按过错比例削减本金。",
          },
          {
            id: "D",
            text: "可以，已催告并给足合理期限，期限现已届满",
            explanation: "本案明确给出一个月足够安排且已过，沈月可请求返还。",
          },
        ],
        answer: "D",
      },
      {
        caseId: "civil-gift-loan-loan-no-term-notice",
        facts:
          "本案为原创教学虚构。普通自然人沈月借给朋友贺林5万元，已经交付。双方没有约定还款日，后来未达成补充约定，依合同相关内容和交易习惯也无法确定期限。沈月发出书面催还通知，要求一个月内还款；贺林签收时回复：“一个月足够我安排。”一个月过去，贺林仍未归还，却说借条没有还款日期，沈月就不能要求还钱。本题只问本金返还。",
        sources: ["civil-gift-loan-term675"],
        hint: "未约定还款日时，查看催告和给出的还款时间。",
        reference:
          "沈月可以要求返还5万元。还款日无法确定时，贷款人可以催告借款人在合理期限内返还。沈月已经给了一个月，贺林也确认足够安排，现在期限已过，不能再用“没写还款日”拒绝还款。",
        id: "civil-gift-loan-loan-no-term-notice-written",
        kind: "subjective",
        title: "收到催还通知之后：写出分析",
        prompt: "沈月现在能否要求返还本金？借条没有还款日是否足以拒绝还款？",
        criteria: [
          {
            id: "loan-notice-result",
            label: "本金返还结论",
            meaning: "认定现在可以请求返还5万元。",
            acceptable: "应还本金、不能因没写日期一直不还等同义表达可。",
            boundary:
              "认定只能借款人自行决定、贷款人永远不能催还，不符合本案。",
          },
          {
            id: "loan-notice-ground",
            label: "合理期限催告",
            meaning: "联系期限无法确定、一个月催告已足够且届满，说明请求依据。",
            acceptable:
              "说明已经催告并给了合理还款时间且到期即可，不要求照抄回复。",
            boundary: "只说借钱总要还，没有说明本案何时可以催还，理由未完成。",
          },
        ],
      },
      {
        caseId: "civil-gift-loan-loan-early-repayment",
        facts:
          "本案为原创教学虚构。普通自然人陶宁向朋友江舟借款6万元，钱已交付，原定一年后还清。双方已明确约定利息计算标准，该标准依法有效；本题只讨论计息期间，不讨论利率效力和金额。借出六个月时，陶宁提前归还全部本金。双方没有另行约定提前还款应按原整年计息或收取补偿，江舟却要求收满一年的利息。",
        sources: ["civil-gift-loan-term675"],
        hint: "题目已经给定有效利息约定，这次只判断计息到哪一天。",
        reference:
          "江舟不能收满一年的利息，应按实际借款的六个月计息。陶宁已提前还清全部本金，双方又没有约定提前还款仍按整年计算。原来的一年期限，不会把实际借期自动延长为一年。",
        id: "civil-gift-loan-loan-early-repayment-choice",
        kind: "objective",
        choiceMode: "single",
        title: "借期中途还清：选择判断",
        prompt: "本案应按多长借款期间计算利息？",
        options: [
          {
            id: "A",
            text: "一年，因为原约定借期是一年",
            explanation: "没有另约时，提前归还按实际借款期间计息。",
          },
          {
            id: "B",
            text: "六个月，按实际借款期间计算",
            explanation:
              "已经在六个月时归还全部本金，且没有不同的提前还款约定。",
          },
          {
            id: "C",
            text: "零个月，提前还款就不用支付任何利息",
            explanation:
              "本题已给定明确有效的利息约定，提前返还不免去实际借期利息。",
          },
          {
            id: "D",
            text: "由江舟事后另定，陶宁必须接受",
            explanation: "贷款人不能事后单方延长已经结束的计息期间。",
          },
        ],
        answer: "B",
      },
      {
        caseId: "civil-gift-loan-loan-early-repayment",
        facts:
          "本案为原创教学虚构。普通自然人陶宁向朋友江舟借款6万元，钱已交付，原定一年后还清。双方已明确约定利息计算标准，该标准依法有效；本题只讨论计息期间，不讨论利率效力和金额。借出六个月时，陶宁提前归还全部本金。双方没有另行约定提前还款应按原整年计息或收取补偿，江舟却要求收满一年的利息。",
        sources: ["civil-gift-loan-term675"],
        hint: "题目已经给定有效利息约定，这次只判断计息到哪一天。",
        reference:
          "江舟不能收满一年的利息，应按实际借款的六个月计息。陶宁已提前还清全部本金，双方又没有约定提前还款仍按整年计算。原来的一年期限，不会把实际借期自动延长为一年。",
        id: "civil-gift-loan-loan-early-repayment-written",
        kind: "subjective",
        title: "借期中途还清：写出分析",
        prompt: "江舟能否要求按整年计息？应怎样确定本案的计息期间？",
        criteria: [
          {
            id: "loan-early-period",
            label: "计息期间结论",
            meaning: "认定按实际六个月计息，不支持一年利息。",
            acceptable: "实际借期半年、六个月均可。",
            boundary: "认定应收整年或提前还款一律无息，不符合本案。",
          },
          {
            id: "loan-early-ground",
            label: "提前还款规则",
            meaning: "联系提前全部还本、无不同约定，说明按实际借期计息。",
            acceptable: "没有另约，提前还清就只算实际借用时间即可。",
            boundary: "忽略题设有效利息约定、只套用无约定无息，偏离本问。",
          },
        ],
      },
    ],
  },
];

export const civilGiftLoanChapters = [
  {
    id: "CIV-GIFT-PERFORMANCE",
    title: "赠与的履行与任意撤销",
    section: "民法",
    topicIds: ["civil-gift-free-revocation", "civil-gift-notarized"],
  },
  {
    id: "CIV-GIFT-REVOCATION",
    title: "赠与的法定撤销与停止履行",
    section: "民法",
    topicIds: ["civil-gift-statutory-revocation", "civil-gift-hardship"],
  },
  {
    id: "CIV-LOAN-FORMATION",
    title: "自然人借款：成立与本金",
    section: "民法",
    topicIds: ["civil-loan-delivery", "civil-loan-prepaid-interest"],
  },
  {
    id: "CIV-LOAN-PERFORMANCE",
    title: "自然人借款：利息与还款",
    section: "民法",
    topicIds: ["civil-loan-interest", "civil-loan-repayment-term"],
  },
];

export const civilGiftLoanExercises = civilGiftLoanTopics.flatMap(
  (topic) => topic.exercises,
);
export const civilGiftLoanContentPack = {
  revision: civilGiftLoanRevision,
  snapshot: {
    topics: civilGiftLoanTopics,
    sources: civilGiftLoanSources,
  },
};
export const civilGiftLoanDefaultQueues = {
  objective: civilGiftLoanExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilGiftLoanExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilGiftLoanQuestion(id: string) {
  const question = civilGiftLoanExercises.find((q) => q.id === id);
  return question ? structuredClone(question) : undefined;
}
export function civilGiftLoanTopicForQuestion(id: string) {
  return civilGiftLoanTopics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function civilGiftLoanSameCaseQuestions(id: string) {
  const question = civilGiftLoanQuestion(id);
  return question
    ? structuredClone(
        civilGiftLoanExercises.filter((q) => q.caseId === question.caseId),
      )
    : [];
}
export function civilGiftLoanChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = civilGiftLoanChapters.find((c) => c.id === chapterId);
  return chapter
    ? civilGiftLoanTopics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}
