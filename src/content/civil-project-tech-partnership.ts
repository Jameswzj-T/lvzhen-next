import type { ContentSources, FaultTopic } from "./fault-unit";

// Original fictional cases. Paired forms share facts, not independent outcomes.
export const civilProjectTechPartnershipRevision =
  "civil-project-tech-partnership-2026-10-24.v1";

export const civilProjectTechPartnershipSources: ContentSources = {
  "civil-code-791": {
    title: "《中华人民共和国民法典》第七百九十一条",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "经发包人同意，可将部分工作交有相应资质的第三人完成；禁止转包、违法分包、再分包，主体结构须承包人自行完成。本稿区分非主体专业分包与主体结构整体交他人独立施工。 本轮实际核读官方正文；民法典自2021年1月1日起施行，案例均为2026年教学虚构。",
  },
  "civil-code-799": {
    title: "《中华人民共和国民法典》第七百九十九条",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "竣工验收合格后，发包人应按约支付价款并接收工程；工程价款题已完成修复、复验合格且约定付款期届至。 本轮实际核读官方正文；民法典自2021年1月1日起施行，案例均为2026年教学虚构。",
  },
  "civil-code-801": {
    title: "《中华人民共和国民法典》第八百零一条",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "施工人原因造成质量不符合约定的，发包人可请求合理期限内无偿修理、返工、改建；修复并验收合格不等于永远不能请求价款。 本轮实际核读官方正文；民法典自2021年1月1日起施行，案例均为2026年教学虚构。",
  },
  "civil-code-803": {
    title: "《中华人民共和国民法典》第八百零三条",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "发包人未按约提供材料、设备、场地、资金、技术资料，承包人可顺延工期，并请求赔偿停工、窝工等损失；本题技术资料迟延、因果与合理损失有具体事实和凭证。 本轮实际核读官方正文；民法典自2021年1月1日起施行，案例均为2026年教学虚构。",
  },
  "civil-code-970": {
    title: "《中华人民共和国民法典》第九百七十条",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "可依合伙约定或全体决定委托部分合伙人执行事务，其他合伙人仍可监督；本稿核账限于合伙项目收支资料，不借用合伙企业法的专门规则。 本轮实际核读官方正文；民法典自2021年1月1日起施行，案例均为2026年教学虚构。",
  },
  "civil-code-971": {
    title: "《中华人民共和国民法典》第九百七十一条",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "合伙人不得仅因执行合伙事务请求报酬，合伙合同另约除外；本题未约执行报酬，必要垫付费用已另行报销。 本轮实际核读官方正文；民法典自2021年1月1日起施行，案例均为2026年教学虚构。",
  },
  "civil-code-972": {
    title: "《中华人民共和国民法典》第九百七十二条",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "利润与亏损依约；未约或不明先协商，协商不成按实缴比例，比例无法确定才平均。本题有银行转账记录可确定实缴比例。 本轮实际核读官方正文；民法典自2021年1月1日起施行，案例均为2026年教学虚构。",
  },
  "civil-code-973": {
    title: "《中华人民共和国民法典》第九百七十三条",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "合伙人对合伙债务连带负责，清偿超过内部应承担份额可追偿。本题债务用途、内部份额明确，不考终止清算或未授权交易。 本轮实际核读官方正文；民法典自2021年1月1日起施行，案例均为2026年教学虚构。",
  },
  "construction-interpretation-1-19": {
    title:
      "《最高人民法院关于审理建设工程施工合同纠纷案件适用法律问题的解释（一）》第十九条",
    url: "https://www.court.gov.cn/zixun/xiangqing/282111.html",
    note: "法释〔2020〕25号，2020年12月25日通过，自2021年1月1日起施行。本轮实际核读官方正文第1—37条，重点第1、10、12、19条。第19条区分约定计价及有效合同验收不合格时的违约处理；本稿付款题适用修复后验收合格与民法典799条，不套无效合同折价补偿。现行适用须同时核对2026解释（二）。",
  },
  "civil-tech-development-rights-code": {
    title: "《民法典》第859、860条：开发成果的专利申请权",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。区分委托开发与合作开发；不涉及职务发明、专利授权条件或另有特别法、另行归属约定的情形。",
  },
  "civil-tech-risk-code": {
    title: "《民法典》第857、858条：研发风险与失去开发意义",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。无法克服的技术困难导致失败，未约定且补充规则仍不能确定时合理分担；标的技术已公开而使履行失去意义，可解除。",
  },
  "civil-tech-license-code": {
    title: "《民法典》第866、867、872、873条：许可资料与再许可",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。按约交付资料、提供指导；未经允许不能把许可扩大给第三人。题设专利有效、合同有效，不考无效后的费用清算。",
  },
  "civil-tech-consult-code": {
    title: "《民法典》第878—884条：咨询决策与服务报酬",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。符合约定的咨询报告下作出决策的损失，未另约时由委托人承担；技术服务已按约完成，委托人拒绝受领仍须支付报酬。",
  },
  "civil-tech-interpretation-19": {
    title: "《技术合同司法解释》（2020年修正）第19条：分工参与研发",
    url: "https://ipr.mofcom.gov.cn/law/detail.shtml?id=2079",
    note: "2026-10-24直接核读所列官方版本正文。商务部官方法规库现行修正文本；条文仅用于区分合作研发与单纯出资的委托开发。2020修正自2021年1月1日起施行，末条2005年日期为原解释施行日期。",
  },
};

export const civilProjectTechPartnershipTopics: FaultTopic[] = [
  {
    id: "civil-construction-contracting",
    title: "建设工程的分包边界",
    headline: "部分专业工作可依法分包，主体结构须自行完成。",
    goal: "能根据范围、同意与资质判断本案分包是否允许。",
    prerequisite: "知道发包人、总承包人和专业分包人的区别。",
    minutes: "约12分钟",
    paragraphs: [
      "经发包人同意，承包人可将部分工作交有相应资质的第三人完成。总承包不等于所有细项都不得分包。",
      "主体结构的施工必须由承包人自行完成。发包人同意或接手企业有资质，都不能单独排除这一要求。",
      "全部转包、把全部工程拆开以分包之名转包、无相应资质分包及分包单位再分包，均有法律限制。判断时先看究竟交出了哪部分工作。",
    ],
    example: {
      title: "经同意的专业分包",
      facts:
        "本案为原创教学虚构，发生于2026年9月。澄安公司将一栋办公楼工程依法发包给具备相应资质的衡建公司。衡建拟仅将非主体结构部分的中央空调安装专业工程，分包给具备该项工程所需资质的清能公司，其他工程仍由衡建依约施工。澄安已书面同意这一安排，合同也允许这种专业分包。项目人员提出“只要是总承包，任何部分都不能交给其他施工企业”。",
      analysis:
        "可以。这是非主体结构的部分专业工程，已经发包人同意，清能也有相应资质。总承包不意味着每一项工作都必须由总承包人亲自施工。",
    },
    pitfall:
      "只见发包人同意就认为所有分包都允许，或反过来把全部专业分包都说成违法。",
    recall: {
      prompt:
        "批准非主体专业分包与批准主体结构整体交他人独立施工，结论是否相同？",
      reference:
        "不同。部分非主体专业工程符合同意、资质等条件时可以分包；主体结构仍须承包人自行完成。",
    },
    sources: ["civil-code-791"],
    exercises: [
      {
        caseId:
          "civil-project-tech-partnership-construction-approved-subcontract",
        relatedTopicIds: ["civil-construction-contracting"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。澄安公司将一栋办公楼工程依法发包给具备相应资质的衡建公司。衡建拟仅将非主体结构部分的中央空调安装专业工程，分包给具备该项工程所需资质的清能公司，其他工程仍由衡建依约施工。澄安已书面同意这一安排，合同也允许这种专业分包。项目人员提出“只要是总承包，任何部分都不能交给其他施工企业”。",
        hint: "直接说明结论和案情理由。",
        reference:
          "可以。这是非主体结构的部分专业工程，已经发包人同意，清能也有相应资质。总承包不意味着每一项工作都必须由总承包人亲自施工。",
        sources: ["civil-code-791"],
        id: "civil-project-tech-partnership-construction-approved-subcontract-choice",
        kind: "objective",
        choiceMode: "single",
        title: "经同意的专业分包（单选）",
        prompt: "本案中央空调安装专业工程能否按上述安排分包给清能？",
        options: [
          {
            id: "a",
            text: "可以。部分非主体专业工程经发包人同意，并交有相应资质的单位完成，符合本案条件。",
            explanation:
              "正确。题设不是将全部工程转包，也不是把主体结构交他人独立施工。",
          },
          {
            id: "b",
            text: "不可以。施工总承包人不得把任何一项专业工作交给其他企业。",
            explanation:
              "错误。法律允许符合条件的部分工作分包，不能把所有分包一律禁止。",
          },
          {
            id: "c",
            text: "可以，因此只要发包人同意，以后也可把全部工程转包出去。",
            explanation: "错误。发包人同意不能排除禁止全部转包的要求。",
          },
          {
            id: "d",
            text: "不可以，因为空调与建筑物固定连接就一律属于必须自行施工的主体结构。",
            explanation:
              "非主体空调专业工程不会仅因与建筑物连接就成为主体结构。",
          },
        ],
        answer: "a",
      },
      {
        caseId:
          "civil-project-tech-partnership-construction-approved-subcontract",
        relatedTopicIds: ["civil-construction-contracting"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。澄安公司将一栋办公楼工程依法发包给具备相应资质的衡建公司。衡建拟仅将非主体结构部分的中央空调安装专业工程，分包给具备该项工程所需资质的清能公司，其他工程仍由衡建依约施工。澄安已书面同意这一安排，合同也允许这种专业分包。项目人员提出“只要是总承包，任何部分都不能交给其他施工企业”。",
        hint: "直接说明结论和案情理由。",
        reference:
          "可以。这是非主体结构的部分专业工程，已经发包人同意，清能也有相应资质。总承包不意味着每一项工作都必须由总承包人亲自施工。",
        sources: ["civil-code-791"],
        id: "civil-project-tech-partnership-construction-approved-subcontract-written",
        kind: "subjective",
        title: "经同意的专业分包（自由作答）",
        prompt:
          "本案中央空调安装专业工程能否按上述安排分包给清能？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-project-tech-partnership-construction-approved-subcontract-permitted-subcontract",
            label: "符合条件的专业分包",
            meaning:
              "认可本案分包，结合非主体的部分专业工程、发包人书面同意与清能具备相应资质说明。",
            acceptable:
              "可说“只分出去空调这一部分，业主同意，对方资质也够，可以分包”，认可等义表达。",
            boundary:
              "不要求讨论招投标、合同效力诉讼或分包后的连带责任；不得把本案结论扩大到主体结构、全部转包或无资质分包。",
          },
        ],
      },
      {
        caseId: "civil-project-tech-partnership-construction-main-structure",
        relatedTopicIds: ["civil-construction-contracting"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。嘉原公司依法将一栋建筑的施工总承包交给森岳公司。森岳准备把现浇钢筋混凝土柱、梁、板组成的全部主体结构工程交给另一家具备相应资质的施工企业，由该企业独立组织施工和质量管理，森岳仅保留协调工作。这不是单纯安排劳务人员。嘉原书面表示同意，森岳据此认为自己无须施工主体结构。",
        hint: "直接说明结论和案情理由。",
        reference:
          "森岳不能这样分出去。现浇柱、梁、板是本工程的主体结构，必须由森岳自行完成。发包人同意、接手企业有资质，都不能改变这个要求。",
        sources: ["civil-code-791"],
        id: "civil-project-tech-partnership-construction-main-structure-choice",
        kind: "objective",
        choiceMode: "single",
        title: "发包人同意也不能分出主体结构（单选）",
        prompt:
          "森岳能否仅因嘉原同意、对方具备相应资质，就按上述方案把主体结构交给另一企业独立施工？",
        options: [
          {
            id: "a",
            text: "能。对方有资质，便可以承接总承包人打算分出的任何全部工程。",
            explanation:
              "错误。有相应资质不能排除主体结构必须自行完成及禁止转包的限制。",
          },
          {
            id: "b",
            text: "能。总承包人只保留协调工作，就已经等同于自行施工全部主体结构。",
            explanation:
              "错误。仅保留协调不能改变另一企业实际独立施工主体结构的事实。",
          },
          {
            id: "c",
            text: "不能。主体结构须自行完成，发包人同意和对方资质不能替代这一要求。",
            explanation:
              "正确。题设明确是主体结构整体交他人独立施工，而非普通劳务安排。",
          },
          {
            id: "d",
            text: "能。只要发包人书面同意，主体结构就不再受自行施工要求限制。",
            explanation:
              "错误。发包人同意不能解除法律对主体结构自行施工的要求。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-project-tech-partnership-construction-main-structure",
        relatedTopicIds: ["civil-construction-contracting"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。嘉原公司依法将一栋建筑的施工总承包交给森岳公司。森岳准备把现浇钢筋混凝土柱、梁、板组成的全部主体结构工程交给另一家具备相应资质的施工企业，由该企业独立组织施工和质量管理，森岳仅保留协调工作。这不是单纯安排劳务人员。嘉原书面表示同意，森岳据此认为自己无须施工主体结构。",
        hint: "直接说明结论和案情理由。",
        reference:
          "森岳不能这样分出去。现浇柱、梁、板是本工程的主体结构，必须由森岳自行完成。发包人同意、接手企业有资质，都不能改变这个要求。",
        sources: ["civil-code-791"],
        id: "civil-project-tech-partnership-construction-main-structure-written",
        kind: "subjective",
        title: "发包人同意也不能分出主体结构（自由作答）",
        prompt:
          "森岳能否仅因嘉原同意、对方具备相应资质，就按上述方案把主体结构交给另一企业独立施工？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-project-tech-partnership-construction-main-structure-self-performance",
            label: "主体结构须自行完成",
            meaning:
              "否定该方案，指出现浇柱梁板属于题设主体结构，须森岳自行完成，发包人同意不能替代。",
            acceptable:
              "可说“主体框架不能这样整块分出去，甲方同意、接手方有资质也不行”，认可等义表达。",
            boundary:
              "不考钢结构特殊事实、纯劳务用工、实际施工人索款或违法分包后的价款清算；不要求额外判断尚未订立的合同效力。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-construction-acceptance-payment",
    title: "质量验收、付款与发包人迟延",
    headline: "修复合格后看付款条件，发包人迟交资料须承担相应后果。",
    goal: "能判断修复验收后的到期款，以及发包人原因造成的工期与窝工损失。",
    prerequisite: "知道工程质量、付款条件、工期和损失是相互关联但不同的问题。",
    minutes: "约12分钟",
    paragraphs: [
      "施工质量不合约，发包人可请求承包人在合理期限内无偿修复。工程修复并验收合格后，仍要按约核对付款期限和应付金额，不能只因曾不合格就永久拒付。",
      "发包人未按约提供施工必需的技术资料等，造成施工停等，承包人可请求相应工期顺延及停工、窝工等损失赔偿。主张要对应迟延原因、工期影响和实际损失。",
      "质量修复、工期顺延、价款支付分别核对。修复合格不免除后续保修义务；窝工损失也要有实际依据。",
    ],
    example: {
      title: "修复并验收合格后的工程款",
      facts:
        "本案为原创教学虚构，发生于2026年9月。发包人晟园公司与有相应资质的瑞成公司订立有效书面施工合同。工程第一次验收发现瑞成施工造成的质量缺陷，瑞成随即自费修复，并在合同约定竣工期限内通过再次验收。双方确认工程已经验收合格，结算后剩余应付工程款为50万元，约定付款日也已届至。晟园仅以“第一次验收曾经不合格”为由，表示这50万元一分也不付。",
      analysis:
        "晟园应支付50万元。瑞成已在约定期限内自费修好并通过验收，剩余价款也已到期。第一次验收不合格已经解决，不能据此继续拒付。",
    },
    pitfall:
      "把第一次验收失败当成永久免付工程款，或认为发包人造成的等待成本只能由承包人吸收。",
    recall: {
      prompt:
        "修复后已验收合格且价款到期，还能仅凭曾有缺陷拒付吗？迟交必需图纸的后果如何处理？",
      reference:
        "不能仅凭原缺陷拒付已满足条件的到期款。图纸迟交造成工期及合理窝工损失的，可据实请求顺延与赔偿。",
    },
    sources: [
      "civil-code-799",
      "civil-code-801",
      "construction-interpretation-1-19",
      "civil-code-803",
    ],
    exercises: [
      {
        caseId: "civil-project-tech-partnership-construction-repair-payment",
        relatedTopicIds: ["civil-construction-acceptance-payment"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。发包人晟园公司与有相应资质的瑞成公司订立有效书面施工合同。工程第一次验收发现瑞成施工造成的质量缺陷，瑞成随即自费修复，并在合同约定竣工期限内通过再次验收。双方确认工程已经验收合格，结算后剩余应付工程款为50万元，约定付款日也已届至。晟园仅以“第一次验收曾经不合格”为由，表示这50万元一分也不付。",
        hint: "直接说明结论和案情理由。",
        reference:
          "晟园应支付50万元。瑞成已在约定期限内自费修好并通过验收，剩余价款也已到期。第一次验收不合格已经解决，不能据此继续拒付。",
        sources: [
          "civil-code-799",
          "civil-code-801",
          "construction-interpretation-1-19",
        ],
        id: "civil-project-tech-partnership-construction-repair-payment-choice",
        kind: "objective",
        choiceMode: "single",
        title: "修复并验收合格后的工程款（单选）",
        prompt:
          "晟园能否仅凭第一次验收曾不合格，就拒付本案已到期的50万元工程款？",
        options: [
          {
            id: "a",
            text: "不能，但晟园可以不区分质量情况，直接把50万元全部当作未来保修担保扣下。",
            explanation:
              "本题已确认50万元到期应付，没有将全部款项扣作保修担保的依据。",
          },
          {
            id: "b",
            text: "不能。工程已修复、验收合格，约定付款条件满足，应支付已到期的50万元。",
            explanation:
              "正确。第一次不合格已通过修复解决，不能据此永久排除合格工程的到期付款义务。",
          },
          {
            id: "c",
            text: "能。任何工程只要第一次验收不合格，承包人就永远无权请求任何工程款。",
            explanation: "错误。忽略了修复并验收合格的后续事实。",
          },
          {
            id: "d",
            text: "能。修复费用已经由瑞成承担，晟园就可以再没收所有剩余工程款。",
            explanation:
              "错误。承担修复费用不使已经满足付款条件的全部剩余价款当然消灭。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-project-tech-partnership-construction-repair-payment",
        relatedTopicIds: ["civil-construction-acceptance-payment"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。发包人晟园公司与有相应资质的瑞成公司订立有效书面施工合同。工程第一次验收发现瑞成施工造成的质量缺陷，瑞成随即自费修复，并在合同约定竣工期限内通过再次验收。双方确认工程已经验收合格，结算后剩余应付工程款为50万元，约定付款日也已届至。晟园仅以“第一次验收曾经不合格”为由，表示这50万元一分也不付。",
        hint: "直接说明结论和案情理由。",
        reference:
          "晟园应支付50万元。瑞成已在约定期限内自费修好并通过验收，剩余价款也已到期。第一次验收不合格已经解决，不能据此继续拒付。",
        sources: [
          "civil-code-799",
          "civil-code-801",
          "construction-interpretation-1-19",
        ],
        id: "civil-project-tech-partnership-construction-repair-payment-written",
        kind: "subjective",
        title: "修复并验收合格后的工程款（自由作答）",
        prompt:
          "晟园能否仅凭第一次验收曾不合格，就拒付本案已到期的50万元工程款？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-project-tech-partnership-construction-repair-payment-qualified-payment",
            label: "修复合格并到期应付款",
            meaning:
              "否定仅凭首次不合格拒付，结合自费修复、及时复验合格及50万元已到期说明应依约付款。",
            acceptable:
              "可说“已经按时修好、重新验过了，约定该付的50万就得付，不能一直拿第一次没过来说事”，认可等义表达。",
            boundary:
              "本题有效合同、结算及付款期明确；不要求引用无效合同折价补偿规则，也不把付款理解为免除所有后续保修责任。",
          },
        ],
      },
      {
        caseId: "civil-project-tech-partnership-construction-employer-drawings",
        relatedTopicIds: ["civil-construction-acceptance-payment"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。广桥公司与启卓公司订立有效书面施工合同，约定广桥在9月1日前提供该阶段施工必需的完整图纸。启卓按时安排人员、机械到场，广桥却到9月11日才交付图纸。进度记录确认这十天无法开展该工序，约定完工日也因此相应后移。启卓按合同及时提出顺延申请，并调配现场资源减少损失。人员工资、机械租赁凭证等证实合理窝工损失为3万元。广桥只以“施工单位应自己消化等待成本”为由，既不同意顺延，也拒绝赔偿。",
        hint: "直接说明结论和案情理由。",
        reference:
          "可以。广桥没有按约提供必需图纸，造成施工停等和工期延后。启卓已及时申请并减少损失，可请求顺延相应工期，并赔偿已证实的3万元合理窝工损失。",
        sources: ["civil-code-803"],
        id: "civil-project-tech-partnership-construction-employer-drawings-choice",
        kind: "objective",
        choiceMode: "single",
        title: "发包人迟交图纸导致窝工（单选）",
        prompt:
          "启卓能否请求顺延相应工期，并请求广桥赔偿上述3万元合理窝工损失？",
        options: [
          {
            id: "a",
            text: "不可以。承包人只要负责施工，就必须无条件承担发包人迟交资料的一切后果。",
            explanation:
              "错误。法律明确赋予相应工期顺延和停工、窝工损失赔偿请求。",
          },
          {
            id: "b",
            text: "只能顺延工期，发包人迟交必需图纸造成的合理窝工损失一律不能赔。",
            explanation: "错误。第803条同时规定相应损失赔偿，并不只处理工期。",
          },
          {
            id: "c",
            text: "只能赔钱，既定工期无论为何延误都绝对不能顺延。",
            explanation:
              "错误。将赔偿与工期顺延对立起来，抹去本案依法主张相应顺延的权利。",
          },
          {
            id: "d",
            text: "可以。必需图纸由发包人迟交，工期与已证实的合理窝工损失均可据此主张。",
            explanation:
              "正确。题设提供了发包人原因、工期影响、及时申请和合理损失的具体事实。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-project-tech-partnership-construction-employer-drawings",
        relatedTopicIds: ["civil-construction-acceptance-payment"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。广桥公司与启卓公司订立有效书面施工合同，约定广桥在9月1日前提供该阶段施工必需的完整图纸。启卓按时安排人员、机械到场，广桥却到9月11日才交付图纸。进度记录确认这十天无法开展该工序，约定完工日也因此相应后移。启卓按合同及时提出顺延申请，并调配现场资源减少损失。人员工资、机械租赁凭证等证实合理窝工损失为3万元。广桥只以“施工单位应自己消化等待成本”为由，既不同意顺延，也拒绝赔偿。",
        hint: "直接说明结论和案情理由。",
        reference:
          "可以。广桥没有按约提供必需图纸，造成施工停等和工期延后。启卓已及时申请并减少损失，可请求顺延相应工期，并赔偿已证实的3万元合理窝工损失。",
        sources: ["civil-code-803"],
        id: "civil-project-tech-partnership-construction-employer-drawings-written",
        kind: "subjective",
        title: "发包人迟交图纸导致窝工（自由作答）",
        prompt:
          "启卓能否请求顺延相应工期，并请求广桥赔偿上述3万元合理窝工损失？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-project-tech-partnership-construction-employer-drawings-extension",
            label: "发包人原因可顺延工期",
            meaning:
              "认可顺延相应工期，结合必需图纸迟交与进度记录确认的完工日影响。",
            acceptable:
              "可说“不是启卓自己拖延，是图纸晚到导致施工停了，所以工期应相应往后顺”，认可等义表达。",
            boundary:
              "不要求计算所有施工日历；本案已及时按约申请，不另设不存在的签证或通知障碍。",
          },
          {
            id: "civil-project-tech-partnership-construction-employer-drawings-idle-loss",
            label: "赔偿已证实的合理窝工损失",
            meaning:
              "认可3万元合理窝工损失请求，并联系迟交图纸的因果及工资、租赁凭证。",
            acceptable:
              "可说“这次等图纸白支出的合理人工和机械费用有证据，3万应由发包人赔”，等义即可。",
            boundary:
              "3万元为本案有证据的损失，不是统一比例或定额；不要求判断优先受偿、可得利润或未证实损失。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-tech-development-rights",
    title: "技术开发成果的专利申请权",
    headline: "委托开发先看约定；没有另约时，出资人不当然取得专利申请权。",
    goal: "禾岳仅以支付全部研发费为由主张专利申请权归自己，是否正确？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "委托开发中，一方出钱、提出要求，另一方研究开发。没有特别规定或另外约定，完成发明创造后的专利申请权归研究开发人。",
      "合作开发要求各方按约参与研发。申请权通常共有；一方不同意申请专利，其他方不能自行申请。不同意申请与放弃自己的申请权，是两回事。",
    ],
    example: {
      title: "谁出钱，申请权就归谁吗",
      facts:
        "本案为原创教学虚构，判断时间为2026年10月。禾岳公司委托澄芯公司开发一套新型温控装置，签订书面合同。禾岳支付全部研发费、提出性能要求，澄芯独立负责设计、试验和研发。装置研发成功，形成可申请专利的发明创造，双方未约定专利申请权归属，也没有适用的特别规定。禾岳称全部费用由自己支付，申请权就应归自己。",
      analysis:
        "不正确。申请权归研究开发人澄芯。双方属于委托开发，没有另行约定，禾岳支付研发费并不使其当然取得专利申请权。",
    },
    pitfall: "先看谁实际承担研发，再看成果归属约定；不能只凭谁付了钱判断。",
    recall: {
      prompt: "禾岳仅以支付全部研发费为由主张专利申请权归自己，是否正确？",
      reference: "委托开发先看约定；没有另约时，出资人不当然取得专利申请权。",
    },
    sources: [
      "civil-tech-development-rights-code",
      "civil-tech-interpretation-19",
    ],
    exercises: [
      {
        caseId: "civil-project-tech-partnership-tech-entrusted-patent",
        relatedTopicIds: ["civil-tech-development-rights"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。禾岳公司委托澄芯公司开发一套新型温控装置，签订书面合同。禾岳支付全部研发费、提出性能要求，澄芯独立负责设计、试验和研发。装置研发成功，形成可申请专利的发明创造，双方未约定专利申请权归属，也没有适用的特别规定。禾岳称全部费用由自己支付，申请权就应归自己。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不正确。申请权归研究开发人澄芯。双方属于委托开发，没有另行约定，禾岳支付研发费并不使其当然取得专利申请权。",
        sources: [
          "civil-tech-development-rights-code",
          "civil-tech-interpretation-19",
        ],
        id: "civil-project-tech-partnership-tech-entrusted-patent-choice",
        kind: "objective",
        choiceMode: "single",
        title: "谁出钱，申请权就归谁吗：选择判断",
        prompt: "禾岳仅以支付全部研发费为由主张专利申请权归自己，是否正确？",
        options: [
          {
            id: "a",
            text: "不正确，未另约时专利申请权归研究开发人澄芯",
            explanation: "本案为委托开发，适用第859条的默认归属规则。",
          },
          {
            id: "b",
            text: "正确，只要付清全部研发费就当然取得申请权",
            explanation: "出资不能替代专利申请权的归属规则。",
          },
          {
            id: "c",
            text: "不正确，但申请权当然由双方共有",
            explanation: "委托开发与合作开发的默认归属不同。",
          },
          {
            id: "d",
            text: "正确，因为澄芯只能按工资取得劳动报酬",
            explanation: "公司之间的委托研发不能直接改写成劳动关系。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-project-tech-partnership-tech-entrusted-patent",
        relatedTopicIds: ["civil-tech-development-rights"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。禾岳公司委托澄芯公司开发一套新型温控装置，签订书面合同。禾岳支付全部研发费、提出性能要求，澄芯独立负责设计、试验和研发。装置研发成功，形成可申请专利的发明创造，双方未约定专利申请权归属，也没有适用的特别规定。禾岳称全部费用由自己支付，申请权就应归自己。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不正确。申请权归研究开发人澄芯。双方属于委托开发，没有另行约定，禾岳支付研发费并不使其当然取得专利申请权。",
        sources: [
          "civil-tech-development-rights-code",
          "civil-tech-interpretation-19",
        ],
        id: "civil-project-tech-partnership-tech-entrusted-patent-written",
        kind: "subjective",
        title: "谁出钱，申请权就归谁吗：写出分析",
        prompt:
          "禾岳仅以支付全部研发费为由主张专利申请权归自己，是否正确？请结合案情说明理由。",
        criteria: [
          {
            id: "tech-entrusted-right",
            label: "认清委托开发的默认归属",
            meaning: "结合禾岳出资、澄芯独立研发且未另约，说明申请权归澄芯。",
            acceptable: "说明“这是委托开发，没约定时归研发方”即可。",
            boundary:
              "不要求讨论取得专利后的实施权，不把出资人当然当成申请权人。",
          },
        ],
      },
      {
        caseId: "civil-project-tech-partnership-tech-cooperative-objection",
        relatedTopicIds: ["civil-tech-development-rights"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。川序公司与溪原公司签订书面合作开发合同，分别承担控制算法设计与试验验证，两方共同完成一项可申请专利的发明创造。合同未另定专利申请权安排。溪原给川序发邮件，明确表示不愿申请专利，希望继续保密使用，也没有表示放弃自己的权利。川序准备以自己名义申请，并称“你不愿申请，我就能单独申请”。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。双方合作研发，申请权由双方共有；溪原明确不同意申请，川序不能自行申请。溪原希望保密，不等于放弃共有的申请权。",
        sources: [
          "civil-tech-development-rights-code",
          "civil-tech-interpretation-19",
        ],
        id: "civil-project-tech-partnership-tech-cooperative-objection-choice",
        kind: "objective",
        choiceMode: "single",
        title: "一方要申请，另一方要保密：选择判断",
        prompt: "川序能否据此自行申请专利？",
        options: [
          {
            id: "a",
            text: "能，不愿申请就视为放弃共有权利",
            explanation: "反对申请与放弃申请权不是同一意思。",
          },
          {
            id: "b",
            text: "能，只要先向对方发通知即可",
            explanation: "通知不能替代合作方的同意。",
          },
          {
            id: "c",
            text: "不能，合作方明确反对申请时不得自行申请",
            explanation: "第860条区分放弃申请权与不同意申请。",
          },
          {
            id: "d",
            text: "不能，因为任何合作开发成果都不得申请专利",
            explanation: "没有反对等障碍时，合作成果可以依法共同申请。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-project-tech-partnership-tech-cooperative-objection",
        relatedTopicIds: ["civil-tech-development-rights"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。川序公司与溪原公司签订书面合作开发合同，分别承担控制算法设计与试验验证，两方共同完成一项可申请专利的发明创造。合同未另定专利申请权安排。溪原给川序发邮件，明确表示不愿申请专利，希望继续保密使用，也没有表示放弃自己的权利。川序准备以自己名义申请，并称“你不愿申请，我就能单独申请”。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。双方合作研发，申请权由双方共有；溪原明确不同意申请，川序不能自行申请。溪原希望保密，不等于放弃共有的申请权。",
        sources: [
          "civil-tech-development-rights-code",
          "civil-tech-interpretation-19",
        ],
        id: "civil-project-tech-partnership-tech-cooperative-objection-written",
        kind: "subjective",
        title: "一方要申请，另一方要保密：写出分析",
        prompt: "川序能否据此自行申请专利？请结合案情说明理由。",
        criteria: [
          {
            id: "tech-cooperative-consent",
            label: "区分反对申请与放弃权利",
            meaning:
              "说明溪原明确反对申请，川序不能自行申请，也不能把反对当成放弃。",
            acceptable:
              "可说“她要继续保密，不是把权利让给你，所以你不能单独去申请”。",
            boundary:
              "不要求讨论转让或优先受让，也不推成合作开发永远不能申请专利。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-tech-development-risk",
    title: "技术开发的失败风险与解除",
    headline: "研发失败先查原因；技术障碍和违反合同，要分开看。",
    goal: "青棠能否仅凭项目失败，就要求砺新独自承担全部研发风险？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "遇到无法克服的技术困难，不等于研究开发人违约。风险先按约定分担；没有约定，补充规则仍不能确定时，由双方合理分担。",
      "发现可能导致失败的技术困难，应及时通知并减少损失；拖着不说而扩大损失，要对扩大部分负责。",
      "标的技术已由他人公开，导致原来的研发没有意义时，可以解除合同；不是只要外面出现相似技术就能解除。",
    ],
    example: {
      title: "没研发出来就全部退款吗",
      facts:
        "本案为原创教学虚构，判断时间为2026年10月。青棠公司委托砺新公司研发一种耐高温涂层。砺新按约投入人员、设备并开展试验，发现现有条件下无法克服的技术困难后，立即通知青棠并停止无效投入。双方共同认可的专家确认，项目失败确由这一技术困难造成，研发记录与约定的计划、步骤一致。合同没有风险分担约定，经补充协商和交易习惯仍不能确定。青棠要求砺新因“没做成”就独自承担全部研发损失。",
      analysis:
        "不能。失败来自无法克服的技术困难，砺新已按约研发并及时通知。双方未确定风险分担办法，应当合理分担，不能只因没做成就让砺新全担，也不能直接定为一人一半。",
    },
    pitfall: "合理分担不是固定各付一半；“项目失败”也不是直接认定违约的理由。",
    recall: {
      prompt: "青棠能否仅凭项目失败，就要求砺新独自承担全部研发风险？",
      reference: "研发失败先查原因；技术障碍和违反合同，要分开看。",
    },
    sources: ["civil-tech-risk-code"],
    exercises: [
      {
        caseId: "civil-project-tech-partnership-tech-unavoidable-risk",
        relatedTopicIds: ["civil-tech-development-risk"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。青棠公司委托砺新公司研发一种耐高温涂层。砺新按约投入人员、设备并开展试验，发现现有条件下无法克服的技术困难后，立即通知青棠并停止无效投入。双方共同认可的专家确认，项目失败确由这一技术困难造成，研发记录与约定的计划、步骤一致。合同没有风险分担约定，经补充协商和交易习惯仍不能确定。青棠要求砺新因“没做成”就独自承担全部研发损失。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。失败来自无法克服的技术困难，砺新已按约研发并及时通知。双方未确定风险分担办法，应当合理分担，不能只因没做成就让砺新全担，也不能直接定为一人一半。",
        sources: ["civil-tech-risk-code"],
        id: "civil-project-tech-partnership-tech-unavoidable-risk-choice",
        kind: "objective",
        choiceMode: "single",
        title: "没研发出来就全部退款吗：选择判断",
        prompt: "青棠能否仅凭项目失败，就要求砺新独自承担全部研发风险？",
        options: [
          {
            id: "a",
            text: "能，研发合同一律保证必定成功",
            explanation: "研发风险不能一律改写成成功保证。",
          },
          {
            id: "b",
            text: "不能，未能确定约定时应由双方合理分担技术风险",
            explanation: "本案失败来自无法克服的技术困难，且无研发违约。",
          },
          {
            id: "c",
            text: "不能，但全部风险必然由出资人青棠承担",
            explanation: "法条规定合理分担，不是全部转给委托人。",
          },
          {
            id: "d",
            text: "不能，因此法律已固定双方各负一半",
            explanation: "合理分担没有统一的一半比例。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-project-tech-partnership-tech-unavoidable-risk",
        relatedTopicIds: ["civil-tech-development-risk"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。青棠公司委托砺新公司研发一种耐高温涂层。砺新按约投入人员、设备并开展试验，发现现有条件下无法克服的技术困难后，立即通知青棠并停止无效投入。双方共同认可的专家确认，项目失败确由这一技术困难造成，研发记录与约定的计划、步骤一致。合同没有风险分担约定，经补充协商和交易习惯仍不能确定。青棠要求砺新因“没做成”就独自承担全部研发损失。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。失败来自无法克服的技术困难，砺新已按约研发并及时通知。双方未确定风险分担办法，应当合理分担，不能只因没做成就让砺新全担，也不能直接定为一人一半。",
        sources: ["civil-tech-risk-code"],
        id: "civil-project-tech-partnership-tech-unavoidable-risk-written",
        kind: "subjective",
        title: "没研发出来就全部退款吗：写出分析",
        prompt:
          "青棠能否仅凭项目失败，就要求砺新独自承担全部研发风险？请结合案情说明理由。",
        criteria: [
          {
            id: "tech-risk-sharing",
            label: "分清技术风险与违约",
            meaning:
              "结合无法克服的技术困难、按约研发和及时通知，说明未约定时合理分担，而非全由砺新承担。",
            acceptable: "能说清“不是违约导致失败，没约定就合理分担”即可。",
            boundary:
              "不要求自定分担百分比，也不能把任何研发失败都当成可以免责的技术风险。",
          },
        ],
      },
      {
        caseId: "civil-project-tech-partnership-tech-publication-termination",
        relatedTopicIds: ["civil-tech-development-risk"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。沐远公司与柏衡公司签订书面技术开发合同，研发一项新型节水工艺。开发期间，第三方公开发表了同一完整技术方案，已经可以直接实施。双方核验后确认，原定研发目标已能从公开资料中实现，继续开发已没有意义。合同尚有后续工作和经费未履行。沐远提出解除，柏衡称没有谁违约就绝对不能解除。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不正确。标的技术已由他人公开，且已使这份开发合同继续履行失去意义，沐远可以解除。解除依据是这一法定情形，并不以柏衡违约为前提。",
        sources: ["civil-tech-risk-code"],
        id: "civil-project-tech-partnership-tech-publication-termination-choice",
        kind: "objective",
        choiceMode: "single",
        title: "别人已经公开了这项技术：选择判断",
        prompt: "柏衡的说法是否正确？",
        options: [
          {
            id: "a",
            text: "正确，只有对方违约才有解除合同的可能",
            explanation: "技术开发另有技术公开、履行失去意义的解除情形。",
          },
          {
            id: "b",
            text: "正确，合同签订后即使研发完全失去意义也必须做完",
            explanation: "忽视了第857条规定。",
          },
          {
            id: "c",
            text: "不正确，因为任何相似技术一经发表都会使合同自动无效",
            explanation: "本题不是自动无效，也不是任何相似信息都足够。",
          },
          {
            id: "d",
            text: "不正确，同一技术已公开且研发失去意义，可以解除",
            explanation: "本题已明确公开内容足以实现原研发目标。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-project-tech-partnership-tech-publication-termination",
        relatedTopicIds: ["civil-tech-development-risk"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。沐远公司与柏衡公司签订书面技术开发合同，研发一项新型节水工艺。开发期间，第三方公开发表了同一完整技术方案，已经可以直接实施。双方核验后确认，原定研发目标已能从公开资料中实现，继续开发已没有意义。合同尚有后续工作和经费未履行。沐远提出解除，柏衡称没有谁违约就绝对不能解除。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不正确。标的技术已由他人公开，且已使这份开发合同继续履行失去意义，沐远可以解除。解除依据是这一法定情形，并不以柏衡违约为前提。",
        sources: ["civil-tech-risk-code"],
        id: "civil-project-tech-partnership-tech-publication-termination-written",
        kind: "subjective",
        title: "别人已经公开了这项技术：写出分析",
        prompt: "柏衡的说法是否正确？请结合案情说明理由。",
        criteria: [
          {
            id: "tech-publication-exit",
            label: "说明技术公开后的解除依据",
            meaning:
              "结合完整技术公开、原研发目标已可实现及继续履行无意义，说明可解除。",
            acceptable:
              "可说“别人已经公开了完整方案，这个研发继续做没有意义，可以解除”。",
            boundary:
              "不要求处理已付经费清算，不把合同解除说成自始无效或仅凭相似报道就自动解除。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-tech-license-obligations",
    title: "技术许可的资料与使用范围",
    headline: "许可人要交资料、给指导；被许可人也要守住许可范围。",
    goal: "泊言是否已完成许可人的合同义务？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "专利许可不能只给一个专利号。许可人还要按约交付相关技术资料，并提供必要技术指导。",
      "被许可人按约实施、支付费用。没有获得同意，不能擅自把专利许可给约定之外的第三人使用。",
    ],
    example: {
      title: "只给专利号算履行了吗",
      facts:
        "本案为原创教学虚构，判断时间为2026年10月。泊言公司将其有效专利许可给晴川公司实施。书面合同约定，泊言应交付完整工艺图纸并指导首次调试，晴川已按约支付首期使用费。泊言只发来专利号，拒交图纸和调试，称“允许你用就够了”。晴川因此无法按约开展生产。",
      analysis:
        "没有。泊言除了许可实施，还应按约交付图纸、提供调试指导。它拒绝履行这些义务并影响生产，应承担违约责任；仅发送专利号不够。",
    },
    pitfall: "合同给自己用的许可，不等于拿到了再许可他人的权利。",
    recall: {
      prompt: "泊言是否已完成许可人的合同义务？",
      reference: "许可人要交资料、给指导；被许可人也要守住许可范围。",
    },
    sources: ["civil-tech-license-code"],
    exercises: [
      {
        caseId: "civil-project-tech-partnership-tech-license-documents",
        relatedTopicIds: ["civil-tech-license-obligations"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。泊言公司将其有效专利许可给晴川公司实施。书面合同约定，泊言应交付完整工艺图纸并指导首次调试，晴川已按约支付首期使用费。泊言只发来专利号，拒交图纸和调试，称“允许你用就够了”。晴川因此无法按约开展生产。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "没有。泊言除了许可实施，还应按约交付图纸、提供调试指导。它拒绝履行这些义务并影响生产，应承担违约责任；仅发送专利号不够。",
        sources: ["civil-tech-license-code"],
        id: "civil-project-tech-partnership-tech-license-documents-choice",
        kind: "objective",
        choiceMode: "single",
        title: "只给专利号算履行了吗：选择判断",
        prompt: "泊言是否已完成许可人的合同义务？",
        options: [
          {
            id: "a",
            text: "没有，还须按约交付资料并提供必要指导",
            explanation:
              "第866条规定许可人的资料和指导义务，合同也有明确约定。",
          },
          {
            id: "b",
            text: "已经完成，许可人从不需要提供技术资料",
            explanation: "忽略法定及约定义务。",
          },
          {
            id: "c",
            text: "已经完成，被许可人交费后只能自己摸索",
            explanation: "支付费用不免除许可人的交付与指导义务。",
          },
          {
            id: "d",
            text: "没有，所以该专利权自动转移给晴川",
            explanation: "合同违约不会自动使专利权发生转让。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-project-tech-partnership-tech-license-documents",
        relatedTopicIds: ["civil-tech-license-obligations"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。泊言公司将其有效专利许可给晴川公司实施。书面合同约定，泊言应交付完整工艺图纸并指导首次调试，晴川已按约支付首期使用费。泊言只发来专利号，拒交图纸和调试，称“允许你用就够了”。晴川因此无法按约开展生产。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "没有。泊言除了许可实施，还应按约交付图纸、提供调试指导。它拒绝履行这些义务并影响生产，应承担违约责任；仅发送专利号不够。",
        sources: ["civil-tech-license-code"],
        id: "civil-project-tech-partnership-tech-license-documents-written",
        kind: "subjective",
        title: "只给专利号算履行了吗：写出分析",
        prompt: "泊言是否已完成许可人的合同义务？请结合案情说明理由。",
        criteria: [
          {
            id: "tech-license-delivery",
            label: "指出尚未履行的资料与指导义务",
            meaning:
              "联系拒交约定图纸、拒绝调试，说明泊言未履行许可义务、应承担违约责任。",
            acceptable: "能指出具体没有履行的义务即可，不要求计算退费数额。",
            boundary:
              "不认可“只要允许实施就不欠任何其他义务”，也不要求另行认定专利权转移。",
          },
        ],
      },
      {
        caseId: "civil-project-tech-partnership-tech-unauthorized-sublicense",
        relatedTopicIds: ["civil-tech-license-obligations"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。澄和公司取得远林公司的有效专利实施许可。书面合同仅允许澄和自己在约定工厂实施，明确没有再许可权。澄和已按约支付使用费，随后未获远林同意，收钱允许另外一家独立公司实施该专利。澄和称费用已经付清，便可自行安排别人使用。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不正确。澄和取得的是自己实施的许可，没有再许可权。擅自允许另一独立公司使用，应停止违约行为并承担违约责任；付清自己的使用费不等于买下再许可权。",
        sources: ["civil-tech-license-code"],
        id: "civil-project-tech-partnership-tech-unauthorized-sublicense-choice",
        kind: "objective",
        choiceMode: "single",
        title: "付了使用费就能再许可吗：选择判断",
        prompt: "澄和的说法是否正确，应如何处理？",
        options: [
          {
            id: "a",
            text: "正确，付清使用费就取得专利全部权利",
            explanation: "使用许可不等于专利权转让。",
          },
          {
            id: "b",
            text: "正确，只要向第三人收取的费用不高就可以",
            explanation: "是否擅自再许可不取决于转收费用高低。",
          },
          {
            id: "c",
            text: "不正确，应停止擅自再许可并承担违约责任",
            explanation: "合同许可范围和法定再许可限制均不能被付费事实替代。",
          },
          {
            id: "d",
            text: "不正确，但只要把向第三人收的费用交给远林，就可继续再许可",
            explanation: "交费给许可人不能自动取得未获同意的再许可权。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-project-tech-partnership-tech-unauthorized-sublicense",
        relatedTopicIds: ["civil-tech-license-obligations"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。澄和公司取得远林公司的有效专利实施许可。书面合同仅允许澄和自己在约定工厂实施，明确没有再许可权。澄和已按约支付使用费，随后未获远林同意，收钱允许另外一家独立公司实施该专利。澄和称费用已经付清，便可自行安排别人使用。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不正确。澄和取得的是自己实施的许可，没有再许可权。擅自允许另一独立公司使用，应停止违约行为并承担违约责任；付清自己的使用费不等于买下再许可权。",
        sources: ["civil-tech-license-code"],
        id: "civil-project-tech-partnership-tech-unauthorized-sublicense-written",
        kind: "subjective",
        title: "付了使用费就能再许可吗：写出分析",
        prompt: "澄和的说法是否正确，应如何处理？请结合案情说明理由。",
        criteria: [
          {
            id: "tech-sublicense-breach",
            label: "分清自行实施与再许可",
            meaning:
              "指出本题没有再许可权，付清费用也不能擅自许可第三人，应停止并承担违约责任。",
            acceptable: "说明“自己能用，不代表能再卖给别人用”并说清责任即可。",
            boundary: "不要求讨论无关的侵权赔偿计算、无效专利或专利转让登记。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-tech-consult-service",
    title: "技术咨询、服务的履行与报酬",
    headline:
      "咨询报告合约定，不等于保证投资成功；服务合约定，也不能靠拒收免付费。",
    goal: "锦岚的主张是否成立？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "技术咨询要按约提交符合要求的报告。委托人据此作出决策造成损失，双方没有另作安排时，由委托人承担。报告本身不合约定，处理就不同。",
      "技术服务的双方都要履行约定。受托人已按约完成服务，委托人拒收成果，已经支付的报酬不能追回，未付的仍应支付。",
    ],
    example: {
      title: "咨询过就保证项目盈利吗",
      facts:
        "本案为原创教学虚构，判断时间为2026年10月。锦岚公司委托知序公司对一条生产线升级作技术可行性分析。知序按期提交报告，内容达到合同要求，并如实分析了技术条件和市场风险，没有保证收益。锦岚依报告决定投资，后来因市场需求下降而亏损。双方未约定由知序承担投资决策损失。锦岚称“既然按你建议投了，亏损就全部由你赔”。",
      analysis:
        "不成立。知序已提交符合约定要求的报告，也没有保证收益。锦岚据此作投资决策产生的损失，应由锦岚承担；技术咨询不等于替委托人保证投资盈利。",
    },
    pitfall:
      "判断报酬先核对谁履行、谁违约，不能只看最后是否赚到钱或愿不愿意接收。",
    recall: {
      prompt: "锦岚的主张是否成立？",
      reference:
        "咨询报告合约定，不等于保证投资成功；服务合约定，也不能靠拒收免付费。",
    },
    sources: ["civil-tech-consult-code"],
    exercises: [
      {
        caseId: "civil-project-tech-partnership-tech-consult-decision-loss",
        relatedTopicIds: ["civil-tech-consult-service"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。锦岚公司委托知序公司对一条生产线升级作技术可行性分析。知序按期提交报告，内容达到合同要求，并如实分析了技术条件和市场风险，没有保证收益。锦岚依报告决定投资，后来因市场需求下降而亏损。双方未约定由知序承担投资决策损失。锦岚称“既然按你建议投了，亏损就全部由你赔”。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不成立。知序已提交符合约定要求的报告，也没有保证收益。锦岚据此作投资决策产生的损失，应由锦岚承担；技术咨询不等于替委托人保证投资盈利。",
        sources: ["civil-tech-consult-code"],
        id: "civil-project-tech-partnership-tech-consult-decision-loss-choice",
        kind: "objective",
        choiceMode: "single",
        title: "咨询过就保证项目盈利吗：选择判断",
        prompt: "锦岚的主张是否成立？",
        options: [
          {
            id: "a",
            text: "成立，只要采用了咨询意见，所有投资亏损都由受托人承担",
            explanation: "第881条并未让合格咨询自动成为投资收益保证。",
          },
          {
            id: "b",
            text: "不成立，合格报告下的决策损失未另约时由委托人承担",
            explanation: "本题报告履约、风险已如实分析且没有另行分担约定。",
          },
          {
            id: "c",
            text: "成立，只要公司付过咨询费，决策风险就一律转移",
            explanation: "报酬支付不产生无限风险承担。",
          },
          {
            id: "d",
            text: "不成立，因为任何技术咨询受托人都不承担任何违约责任",
            explanation: "不合约定的报告、迟延等仍可能构成违约。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-project-tech-partnership-tech-consult-decision-loss",
        relatedTopicIds: ["civil-tech-consult-service"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。锦岚公司委托知序公司对一条生产线升级作技术可行性分析。知序按期提交报告，内容达到合同要求，并如实分析了技术条件和市场风险，没有保证收益。锦岚依报告决定投资，后来因市场需求下降而亏损。双方未约定由知序承担投资决策损失。锦岚称“既然按你建议投了，亏损就全部由你赔”。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不成立。知序已提交符合约定要求的报告，也没有保证收益。锦岚据此作投资决策产生的损失，应由锦岚承担；技术咨询不等于替委托人保证投资盈利。",
        sources: ["civil-tech-consult-code"],
        id: "civil-project-tech-partnership-tech-consult-decision-loss-written",
        kind: "subjective",
        title: "咨询过就保证项目盈利吗：写出分析",
        prompt: "锦岚的主张是否成立？请结合案情说明理由。",
        criteria: [
          {
            id: "tech-consult-risk",
            label: "区分合格咨询与投资担保",
            meaning:
              "结合报告合约定、没有保证收益和另行风险安排，说明决策损失由锦岚承担。",
            acceptable:
              "可说“报告该做的已做好，没承诺保收益，这次市场亏损不能都让咨询方赔”。",
            boundary: "不能扩大为咨询方报告有错误、未履约也永远免责。",
          },
        ],
      },
      {
        caseId: "civil-project-tech-partnership-tech-service-refused-result",
        relatedTopicIds: ["civil-tech-consult-service"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。竹溪工厂委托维禾公司解决生产线温度控制不稳定的问题，约定报酬2万元，已先付1万元。维禾按期完成调试，稳定性达到约定指标，并提交记录、方案，按约向工厂人员讲解了操作方法。工厂没有提出质量异议，只因随后决定更换整条生产线，便拒绝接收成果，要求退回已付1万元，也不愿支付剩余1万元。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。维禾已经按约完成服务并交付方案，工厂自行改变计划、拒绝接收，不能把责任转给维禾。已付的1万元不能追回，剩余1万元仍应支付。",
        sources: ["civil-tech-consult-code"],
        id: "civil-project-tech-partnership-tech-service-refused-result-choice",
        kind: "objective",
        choiceMode: "single",
        title: "不接收调试成果就能退费吗：选择判断",
        prompt: "工厂能否以自己不再接收成果为由退费并免付剩余报酬？",
        options: [
          {
            id: "a",
            text: "能，委托人只要不接收，报酬义务就自动消失",
            explanation: "拒收不能抹去受托人已经完成的合格服务。",
          },
          {
            id: "b",
            text: "能，只要以后不用该成果，就可以无条件退款",
            explanation: "是否继续利用与已履行服务的报酬不是一回事。",
          },
          {
            id: "c",
            text: "不能退已付款，但未付款一律不用付",
            explanation: "第884条同时规定未支付的报酬应当支付。",
          },
          {
            id: "d",
            text: "不能，已付报酬不能追回，剩余报酬仍应支付",
            explanation: "本题服务合约定，委托人仅因自身计划变更而拒收。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-project-tech-partnership-tech-service-refused-result",
        relatedTopicIds: ["civil-tech-consult-service"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。竹溪工厂委托维禾公司解决生产线温度控制不稳定的问题，约定报酬2万元，已先付1万元。维禾按期完成调试，稳定性达到约定指标，并提交记录、方案，按约向工厂人员讲解了操作方法。工厂没有提出质量异议，只因随后决定更换整条生产线，便拒绝接收成果，要求退回已付1万元，也不愿支付剩余1万元。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。维禾已经按约完成服务并交付方案，工厂自行改变计划、拒绝接收，不能把责任转给维禾。已付的1万元不能追回，剩余1万元仍应支付。",
        sources: ["civil-tech-consult-code"],
        id: "civil-project-tech-partnership-tech-service-refused-result-written",
        kind: "subjective",
        title: "不接收调试成果就能退费吗：写出分析",
        prompt:
          "工厂能否以自己不再接收成果为由退费并免付剩余报酬？请结合案情说明理由。",
        criteria: [
          {
            id: "tech-service-reward",
            label: "说明合格服务被拒收后的报酬",
            meaning:
              "联系服务已按约完成且拒收仅因工厂自身计划，说明已付不退、剩余仍付。",
            acceptable: "能把两部分报酬说清楚即可，不要求背诵条号。",
            boundary:
              "本题不涉及质量不合格、受托人违约或双方另有解除结算协议。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-partnership-operations",
    title: "民事合伙的执行与监督",
    headline: "委托执行不取消监督，执行事务不当然另有报酬。",
    goal: "能区分执行权、监督权和执行事务报酬。",
    prerequisite:
      "知道自然人可为共同事业订立共享利益、共担风险的民事合伙合同。",
    minutes: "约12分钟",
    paragraphs: [
      "全体合伙人可约定或共同决定委托一个、数个合伙人执行事务。其他合伙人不再执行日常事务，仍有权监督执行情况。",
      "为监督核对本项目的收支、凭证，与自己接管日常执行是两回事。不能只因已经委托一人管事，就拒绝其余合伙人合理监督。",
      "合伙人执行合伙事务，默认不能因此另要报酬；合伙合同另有约定的除外。报酬、必要费用返还与利润分配要分别判断。",
    ],
    example: {
      title: "委托一人执行后仍可监督",
      facts:
        "本案为原创教学虚构，发生于2026年9月。林晴、顾安、孟秋三人以个人身份共同出资做一批手工文创产品，协议约定共享收益、共担风险。三人一致委托顾安办理项目采购和收支，林晴、孟秋不再负责日常执行。林晴为核对项目资金使用，要求查看本项目采购合同、支出凭证和收支账目。顾安拒绝，理由是“既然由我执行，其他人就不能再监督，也不能核对这些项目账”。",
      analysis:
        "不能。委托顾安执行事务，不会取消林晴作为合伙人的监督权。林晴为监督而核对本项目采购、支出和账目，应当允许。",
    },
    pitfall: "把委托执行理解为其他人不得再问账，或把执行事务自动按工资索酬。",
    recall: {
      prompt:
        "只委托一人执行后，其他合伙人还能监督吗？执行人是否当然有额外报酬？",
      reference:
        "其他合伙人仍可监督。执行人无报酬约定时，不能仅因执行合伙事务另行索酬。",
    },
    sources: ["civil-code-970", "civil-code-971"],
    exercises: [
      {
        caseId: "civil-project-tech-partnership-partnership-supervision",
        relatedTopicIds: ["civil-partnership-operations"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。林晴、顾安、孟秋三人以个人身份共同出资做一批手工文创产品，协议约定共享收益、共担风险。三人一致委托顾安办理项目采购和收支，林晴、孟秋不再负责日常执行。林晴为核对项目资金使用，要求查看本项目采购合同、支出凭证和收支账目。顾安拒绝，理由是“既然由我执行，其他人就不能再监督，也不能核对这些项目账”。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。委托顾安执行事务，不会取消林晴作为合伙人的监督权。林晴为监督而核对本项目采购、支出和账目，应当允许。",
        sources: ["civil-code-970"],
        id: "civil-project-tech-partnership-partnership-supervision-choice",
        kind: "objective",
        choiceMode: "single",
        title: "委托一人执行后仍可监督（单选）",
        prompt:
          "顾安能否仅以自己受托执行事务、林晴不再日常执行为由，拒绝林晴监督并核对项目收支？",
        options: [
          {
            id: "a",
            text: "不能。其他合伙人即使不再执行，仍有权监督，核对本项目收支属于相应监督。",
            explanation: "正确。受托执行与其他合伙人的监督权可以同时存在。",
          },
          {
            id: "b",
            text: "能。全体委托一人执行后，其他合伙人的一切监督权都自动消灭。",
            explanation: "错误。民法典明确保留其他合伙人的监督权。",
          },
          {
            id: "c",
            text: "能。只有日常亲自采购的人才能核对合伙项目资金使用。",
            explanation: "错误。监督权不以亲自执行日常事务为前提。",
          },
          {
            id: "d",
            text: "不能，因此林晴可不经其他人同意接管顾安正在执行的日常采购。",
            explanation: "合理监督不等于可以无视已有委托安排直接接管日常执行。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-project-tech-partnership-partnership-supervision",
        relatedTopicIds: ["civil-partnership-operations"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。林晴、顾安、孟秋三人以个人身份共同出资做一批手工文创产品，协议约定共享收益、共担风险。三人一致委托顾安办理项目采购和收支，林晴、孟秋不再负责日常执行。林晴为核对项目资金使用，要求查看本项目采购合同、支出凭证和收支账目。顾安拒绝，理由是“既然由我执行，其他人就不能再监督，也不能核对这些项目账”。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。委托顾安执行事务，不会取消林晴作为合伙人的监督权。林晴为监督而核对本项目采购、支出和账目，应当允许。",
        sources: ["civil-code-970"],
        id: "civil-project-tech-partnership-partnership-supervision-written",
        kind: "subjective",
        title: "委托一人执行后仍可监督（自由作答）",
        prompt:
          "顾安能否仅以自己受托执行事务、林晴不再日常执行为由，拒绝林晴监督并核对项目收支？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-project-tech-partnership-partnership-supervision-supervision",
            label: "未执行合伙人仍可监督",
            meaning:
              "否定顾安的拒绝，说明委托执行不剥夺其他合伙人的监督权，林晴可核对本项目相关收支资料。",
            acceptable:
              "可说“让顾安管事不等于其他合伙人不能看项目账，林晴仍能监督这笔钱怎么用”，认可等义表达。",
            boundary:
              "不要求撤回委托、重新参与执行或引用合伙企业法；监督范围限于合伙项目，不扩大到无关私人账目。",
          },
        ],
      },
      {
        caseId:
          "civil-project-tech-partnership-partnership-default-remuneration",
        relatedTopicIds: ["civil-partnership-operations"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。赵序、沈清、方禾以个人身份共同出资承做一项布艺设计项目，约定共享收益、共担风险，并一致委托赵序执行采购、联系客户等合伙事务。合伙合同没有约定执行事务的报酬，也没有其他报酬约定。赵序垫付的合理项目费用已经凭票报销。月末，他只因自己花时间执行事务，就要求从合伙财产中另取4000元劳务报酬，另两人不同意。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。合伙人执行合伙事务，默认不能因此请求报酬，另有约定才例外。本案没有这种约定，赵序不能仅凭投入时间就另取4000元。",
        sources: ["civil-code-971"],
        id: "civil-project-tech-partnership-partnership-default-remuneration-choice",
        kind: "objective",
        choiceMode: "single",
        title: "执行事务是否当然有额外报酬（单选）",
        prompt:
          "赵序能否在没有报酬约定的情况下，仅因执行这些合伙事务就要求另付4000元报酬？",
        options: [
          {
            id: "a",
            text: "能。必要费用已获报销，就自动产生一份同样独立的劳务报酬。",
            explanation: "错误。费用返还和执行事务报酬不是自动相互派生的权利。",
          },
          {
            id: "b",
            text: "不能，因此赵序也永远无权按合伙约定分享任何项目利润。",
            explanation: "错误。没有执行报酬不等于合伙人的利润分配权消失。",
          },
          {
            id: "c",
            text: "不能。合伙合同没有约定执行报酬，不能仅因执行合伙事务另行索取。",
            explanation:
              "正确。符合民法典第971条的默认规则，本题也明确费用报销与报酬分开。",
          },
          {
            id: "d",
            text: "能。执行事务的合伙人只要工作过，就当然可以自行确定报酬金额。",
            explanation: "错误。投入时间并不替代合伙合同中的报酬约定。",
          },
        ],
        answer: "c",
      },
      {
        caseId:
          "civil-project-tech-partnership-partnership-default-remuneration",
        relatedTopicIds: ["civil-partnership-operations"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。赵序、沈清、方禾以个人身份共同出资承做一项布艺设计项目，约定共享收益、共担风险，并一致委托赵序执行采购、联系客户等合伙事务。合伙合同没有约定执行事务的报酬，也没有其他报酬约定。赵序垫付的合理项目费用已经凭票报销。月末，他只因自己花时间执行事务，就要求从合伙财产中另取4000元劳务报酬，另两人不同意。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。合伙人执行合伙事务，默认不能因此请求报酬，另有约定才例外。本案没有这种约定，赵序不能仅凭投入时间就另取4000元。",
        sources: ["civil-code-971"],
        id: "civil-project-tech-partnership-partnership-default-remuneration-written",
        kind: "subjective",
        title: "执行事务是否当然有额外报酬（自由作答）",
        prompt:
          "赵序能否在没有报酬约定的情况下，仅因执行这些合伙事务就要求另付4000元报酬？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-project-tech-partnership-partnership-default-remuneration-no-default-pay",
            label: "执行事务默认无额外报酬",
            meaning:
              "否定本次4000元请求，说明没有报酬约定时不能仅因执行合伙事务索酬。",
            acceptable:
              "可说“合伙人管项目本身不会自动另算工资，协议没约好，不能自己加这4000元”，认可等义表达。",
            boundary:
              "不要求否定合理费用报销或正常利润分配，也不涉及另行雇佣或劳动关系。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-partnership-debt-exit",
    title: "合伙债务与内部亏损分担",
    headline: "合伙债务对外连带；内部怎么分，先看约定、协商，再看实缴。",
    goal: "能区分外部债务责任、内部追偿与无约定亏损的分担。",
    prerequisite:
      "知道本章处理民事合伙合同，不预设登记合伙企业或有限合伙身份。",
    minutes: "约12分钟",
    paragraphs: [
      "合伙人对合伙债务承担连带责任，不能仅拿内部份额限制外部债权人。清偿超过自己应承担份额后，可以向其他合伙人追偿。",
      "内部利润、亏损先按合伙合同；没有约定或不清楚，先协商。协商不成按实缴出资比例；无法确定比例时，才平均分配、分担。",
      "一人对外还清债务后，内部仍按应负份额结算；没有约定亏损比例，也不是立刻平均分。",
    ],
    example: {
      title: "内部份额不限制对外债务",
      facts:
        "本案为原创教学虚构，发生于2026年9月。梁砚、舒宁、季然三人以个人身份合伙制作展陈道具，共享收益、共担风险。三人为合伙项目共同采购材料，形成对供应商诚木的10万元到期债务，材料已交付。三人明确约定，本笔债务内部由梁砚负担5万元、舒宁3万元、季然2万元。诚木没有同意按这些份额分别免除责任，现向梁砚请求支付全部10万元。梁砚提出“我内部只分到5万元，外面也只能找我要5万元”。",
      analysis:
        "诚木可以要求梁砚支付全部10万元，内部份额不能限制对外连带责任。梁砚若独自付清，超过自己5万元份额的部分，可向舒宁追偿3万元、向季然追偿2万元。",
    },
    pitfall: "用内部份额对抗债权人，或在实缴比例清楚时直接平均分担。",
    recall: {
      prompt: "谁对外清偿、内部最后各担多少，为什么要分开看？",
      reference:
        "对外依法连带负责；内部按各人应负份额结算，超过份额可追偿。无约定时按协商、实缴比例、无法确定才平均的顺序处理。",
    },
    sources: ["civil-code-973", "civil-code-972"],
    exercises: [
      {
        caseId:
          "civil-project-tech-partnership-partnership-joint-debt-recourse",
        relatedTopicIds: ["civil-partnership-debt-exit"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。梁砚、舒宁、季然三人以个人身份合伙制作展陈道具，共享收益、共担风险。三人为合伙项目共同采购材料，形成对供应商诚木的10万元到期债务，材料已交付。三人明确约定，本笔债务内部由梁砚负担5万元、舒宁3万元、季然2万元。诚木没有同意按这些份额分别免除责任，现向梁砚请求支付全部10万元。梁砚提出“我内部只分到5万元，外面也只能找我要5万元”。",
        hint: "直接说明结论和案情理由。",
        reference:
          "诚木可以要求梁砚支付全部10万元，内部份额不能限制对外连带责任。梁砚若独自付清，超过自己5万元份额的部分，可向舒宁追偿3万元、向季然追偿2万元。",
        sources: ["civil-code-973"],
        id: "civil-project-tech-partnership-partnership-joint-debt-recourse-choice",
        kind: "objective",
        choiceMode: "single",
        title: "内部份额不限制对外债务（单选）",
        prompt:
          "诚木能否要求梁砚支付全部10万元？如果梁砚独自付清，他可向另外两人追偿多少？",
        options: [
          {
            id: "a",
            text: "可以请求梁砚付10万元；他付清后又可向舒宁、季然各要回10万元。",
            explanation:
              "错误。内部追偿以超过自身份额的部分及其他人相应份额为界，不能重复获偿。",
          },
          {
            id: "b",
            text: "可以请求梁砚支付10万元；他独自付清后，可向舒宁追3万元、季然追2万元。",
            explanation:
              "正确。对外承担连带责任，内部超过自身份额的清偿可以追偿。",
          },
          {
            id: "c",
            text: "只能请求梁砚付5万元，因为内部约定会自动约束外部债权人。",
            explanation: "错误。把内部承担份额直接当成对外责任上限。",
          },
          {
            id: "d",
            text: "可以请求梁砚付10万元，但他付清后无论如何都不能向其他合伙人追偿。",
            explanation:
              "错误。合伙人清偿超过应负份额时，依法可以向其他合伙人追偿。",
          },
        ],
        answer: "b",
      },
      {
        caseId:
          "civil-project-tech-partnership-partnership-joint-debt-recourse",
        relatedTopicIds: ["civil-partnership-debt-exit"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。梁砚、舒宁、季然三人以个人身份合伙制作展陈道具，共享收益、共担风险。三人为合伙项目共同采购材料，形成对供应商诚木的10万元到期债务，材料已交付。三人明确约定，本笔债务内部由梁砚负担5万元、舒宁3万元、季然2万元。诚木没有同意按这些份额分别免除责任，现向梁砚请求支付全部10万元。梁砚提出“我内部只分到5万元，外面也只能找我要5万元”。",
        hint: "直接说明结论和案情理由。",
        reference:
          "诚木可以要求梁砚支付全部10万元，内部份额不能限制对外连带责任。梁砚若独自付清，超过自己5万元份额的部分，可向舒宁追偿3万元、向季然追偿2万元。",
        sources: ["civil-code-973"],
        id: "civil-project-tech-partnership-partnership-joint-debt-recourse-written",
        kind: "subjective",
        title: "内部份额不限制对外债务（自由作答）",
        prompt:
          "诚木能否要求梁砚支付全部10万元？如果梁砚独自付清，他可向另外两人追偿多少？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-project-tech-partnership-partnership-joint-debt-recourse-external-joint",
            label: "对外连带责任",
            meaning:
              "认可诚木可请求梁砚支付全部10万元，指出合伙债务对外连带，内部份额不能作为只付5万元的理由。",
            acceptable:
              "可说“合伙欠的这10万，债主可以找梁砚一个人先要清，三人私下怎么分不能挡债主”，认可等义表达。",
            boundary:
              "债务系共同采购形成已明确；不考未经授权交易、登记合伙企业类型或先执行合伙财产的程序。",
          },
          {
            id: "civil-project-tech-partnership-partnership-joint-debt-recourse-internal-recourse",
            label: "超内部份额可追偿",
            meaning:
              "指出独自付清后，超过梁砚应负5万元的部分可向舒宁追3万元、季然追2万元。",
            acceptable:
              "可说“梁砚先全还了，再找舒宁拿3万、季然拿2万，自己担5万”，意思相同即可。",
            boundary:
              "不把对外连带写成内部三人一律平均，也不允许超过本案已付总额与相应内部份额重复收款。",
          },
        ],
      },
      {
        caseId:
          "civil-project-tech-partnership-partnership-actual-contribution-loss",
        relatedTopicIds: ["civil-partnership-debt-exit"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。方舟、许然、沈禾三人以个人身份共同出资办一项手作市集项目，协议约定共享利益、共担风险，但没有约定亏损分担比例。项目阶段结算确认需由三人内部承担的亏损共5万元，三人协商多次仍未达成比例约定。银行转账和入账记录能够确定实缴出资：方舟6万元、许然3万元、沈禾1万元。许然主张“合同没写比例，就必须三个人平均分这5万元”。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不正确。没有约定且协商不成，但实缴比例能够确定，应按6∶3∶1分担。方舟承担3万元，许然承担1.5万元，沈禾承担0.5万元。",
        sources: ["civil-code-972"],
        id: "civil-project-tech-partnership-partnership-actual-contribution-loss-choice",
        kind: "objective",
        choiceMode: "single",
        title: "没有约定亏损比例时按什么分担（单选）",
        prompt: "许然主张立即平均分担是否正确？本案三人应各分担多少亏损？",
        options: [
          {
            id: "a",
            text: "正确。只要合同没写，协商结果和实缴比例都不必再考虑。",
            explanation: "错误。忽略了先协商、协商不成按实缴比例的递补顺序。",
          },
          {
            id: "b",
            text: "不正确，应按三人将来承诺投入的金额分担，不看已有实缴记录。",
            explanation:
              "本题无约定且协商不成，法定递补看可确定的实缴出资比例。",
          },
          {
            id: "c",
            text: "不正确，应由日常负责经营的合伙人承担全部亏损。",
            explanation: "执行事务身份不使内部亏损一律由该人独自承担。",
          },
          {
            id: "d",
            text: "不正确。应按实缴6∶3∶1分担，分别为3万元、1.5万元、0.5万元。",
            explanation:
              "正确。能确定实缴比例时先按该比例，不能直接跳到平均分担。",
          },
        ],
        answer: "d",
      },
      {
        caseId:
          "civil-project-tech-partnership-partnership-actual-contribution-loss",
        relatedTopicIds: ["civil-partnership-debt-exit"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。方舟、许然、沈禾三人以个人身份共同出资办一项手作市集项目，协议约定共享利益、共担风险，但没有约定亏损分担比例。项目阶段结算确认需由三人内部承担的亏损共5万元，三人协商多次仍未达成比例约定。银行转账和入账记录能够确定实缴出资：方舟6万元、许然3万元、沈禾1万元。许然主张“合同没写比例，就必须三个人平均分这5万元”。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不正确。没有约定且协商不成，但实缴比例能够确定，应按6∶3∶1分担。方舟承担3万元，许然承担1.5万元，沈禾承担0.5万元。",
        sources: ["civil-code-972"],
        id: "civil-project-tech-partnership-partnership-actual-contribution-loss-written",
        kind: "subjective",
        title: "没有约定亏损比例时按什么分担（自由作答）",
        prompt:
          "许然主张立即平均分担是否正确？本案三人应各分担多少亏损？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-project-tech-partnership-partnership-actual-contribution-loss-actual-share",
            label: "协商不成按可确定实缴比例",
            meaning:
              "否定立即平均，说明应按已证实的6∶3∶1实缴比例，给出方舟3万元、许然1.5万元、沈禾0.5万元。",
            acceptable:
              "可用60%、30%、10%及对应金额表达；说“平均要等出资比例都确定不了，这里按实际投入分”并算对即可。",
            boundary:
              "不要求背完整法条；本案比例已可确定，不得跳过实缴规则直接平均，也不得凭空改成认缴比例。",
          },
        ],
      },
    ],
  },
];

export const civilProjectTechPartnershipChapters = [
  {
    id: "CIV-CONSTRUCTION-CONTRACT",
    title: "建设工程合同",
    section: "民法",
    topicIds: [
      "civil-construction-contracting",
      "civil-construction-acceptance-payment",
    ],
  },
  {
    id: "CIV-TECH-DEVELOPMENT",
    title: "技术开发合同",
    section: "民法",
    topicIds: ["civil-tech-development-rights", "civil-tech-development-risk"],
  },
  {
    id: "CIV-TECH-LICENSE-SERVICE",
    title: "技术许可、咨询与服务",
    section: "民法",
    topicIds: ["civil-tech-license-obligations", "civil-tech-consult-service"],
  },
  {
    id: "CIV-PARTNERSHIP-CONTRACT",
    title: "合伙合同",
    section: "民法",
    topicIds: ["civil-partnership-operations", "civil-partnership-debt-exit"],
  },
];

export const civilProjectTechPartnershipExercises =
  civilProjectTechPartnershipTopics.flatMap((topic) => topic.exercises);
export const civilProjectTechPartnershipContentPack = {
  revision: civilProjectTechPartnershipRevision,
  snapshot: {
    topics: civilProjectTechPartnershipTopics,
    sources: civilProjectTechPartnershipSources,
  },
};
export const civilProjectTechPartnershipDefaultQueues = {
  objective: civilProjectTechPartnershipExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilProjectTechPartnershipExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilProjectTechPartnershipQuestion(id: string) {
  const question = civilProjectTechPartnershipExercises.find(
    (q) => q.id === id,
  );
  return question ? structuredClone(question) : undefined;
}
export function civilProjectTechPartnershipTopicForQuestion(id: string) {
  return civilProjectTechPartnershipTopics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function civilProjectTechPartnershipSameCaseQuestions(id: string) {
  const question = civilProjectTechPartnershipQuestion(id);
  return question
    ? structuredClone(
        civilProjectTechPartnershipExercises.filter(
          (q) => q.caseId === question.caseId,
        ),
      )
    : [];
}
export function civilProjectTechPartnershipChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = civilProjectTechPartnershipChapters.find(
    (c) => c.id === chapterId,
  );
  return chapter
    ? civilProjectTechPartnershipTopics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}
