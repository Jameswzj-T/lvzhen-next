import type { ContentSources, FaultTopic } from "./fault-unit";

// Original fictional cases. Paired forms share facts, not independent outcomes.
export const civilWorkMandateRevision = "civil-work-mandate-2026-10-23.v1";

export const civilWorkMandateSources: ContentSources = {
  "civil-work-mandate-third-party772": {
    title: "《民法典》第770、772、773条：承揽工作的第三人完成",
    url: "https://tjca.miit.gov.cn/zwgk/zcwj/flfg/art/2020/art_20cf1a2e1b854924b5caa744c8045d1f.html",
    note: "2026-10-23直接读取工信部天津通信管理局所载民法典全文；页面2020-06-18发布，法典2020-05-28通过、2021-01-01施行。只考普通家具定作、主要工作与辅助工作的区别及承揽人对第三人成果的责任；不涉及建设工程资质、违法转包或外部侵权责任。",
  },
  "civil-work-mandate-materials774": {
    title: "《民法典》第774、775条：承揽材料的提供与检验",
    url: "https://tjca.miit.gov.cn/zwgk/zcwj/flfg/art/2020/art_20cf1a2e1b854924b5caa744c8045d1f.html",
    note: "2026-10-23直接核读第774—775条。区分定作人提供材料时承揽人及时检验、发现不符时通知与不得擅换；承揽人提供材料时依约选材、接受定作人检验。两案不计算停工、材料损失或不合理图纸责任，不涉及建筑工程。",
  },
  "civil-work-mandate-quality781": {
    title: "《民法典》第780、781条：承揽成果的验收与质量救济",
    url: "https://tjca.miit.gov.cn/zwgk/zcwj/flfg/art/2020/art_20cf1a2e1b854924b5caa744c8045d1f.html",
    note: "2026-10-23直接核读。按具体约定比较不合格成果和符合原约定后改变喜好的两案；第781条为质量不符时合理选择修理、重作、减报酬、赔损等，不要求先穷尽一种才可选择其他，也不暗示所有救济可以重复获得。只问指定救济依据，不混用消费者特殊权利。",
  },
  "civil-work-mandate-termination787": {
    title: "《民法典》第787条：定作人在工作完成前解除",
    url: "https://tjca.miit.gov.cn/zwgk/zcwj/flfg/art/2020/art_20cf1a2e1b854924b5caa744c8045d1f.html",
    note: "2026-10-23直接核读。定作人完成前可随时解除，造成损失须赔偿；完成后不能仅因未交付就继续套用该项任意解除。两案只判断第787条解除与损失责任，不锁定全部损失总额或未约定的违约金，不排除有其他事实时的其他法定或约定权利。",
  },
  "civil-work-mandate-instructions922": {
    title: "《民法典》第919、922条：按指示处理与紧急变更",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23实际核读北京市政府所载民法典全文第919—933条及页面版本信息；2020-05-28公布、2021-01-01施行，页面2020-06-02发布并标示有效。两案只判断委托关系内部是否按指示妥当处理；一般变更须获同意，紧急且难以联系时须妥善处理并及时报告，不判断对外代理效力。",
  },
  "civil-work-mandate-subdelegation923": {
    title: "《民法典》第923条：转委托及责任边界",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23实际核读北京市政府所载民法典全文第919—933条及页面版本信息；2020-05-28公布、2021-01-01施行，页面2020-06-02发布并标示有效。分别给出明确同意与明确未同意、未追认；经同意时原受托人仅就选任和指示承担责任，未同意时原则上对第三人行为负责，保留维护委托人利益的紧急例外。",
  },
  "civil-work-mandate-expenses921": {
    title: "《民法典》第921条：费用预付、必要垫费及利息",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23实际核读北京市政府所载民法典全文第919—933条及页面版本信息；2020-05-28公布、2021-01-01施行，页面2020-06-02发布并标示有效。两案只问处理事务的正常费用预付、必要垫费偿还与利息义务；无偿不等于自担费用，不核定具体利率、利息金额或其他报酬。",
  },
  "civil-work-mandate-termination933": {
    title: "《民法典》第933条：随时解除与损失范围",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23实际核读北京市政府所载民法典全文第919—933条及页面版本信息；2020-05-28公布、2021-01-01施行，页面2020-06-02发布并标示有效。有偿案给可归责的临时反悔和不重复的直接损失、可得净利益；无偿案用突然急病检验不可归责例外，讲解同时保留无偿委托仅赔解除时间不当造成直接损失的规则。不扩展死亡、遗产、行纪或对外代理。",
  },
};

export const civilWorkMandateTopics: FaultTopic[] = [
  {
    id: "civil-work-third-party",
    title: "承揽工作的第三人完成",
    headline:
      "主要工作未经同意交给第三人，定作人可以解除；辅助工作可另找人，承揽人仍负责。",
    goal: "承揽主要工作和辅助工作交给第三人，有什么区别？",
    prerequisite: "知道定作人提出要求、承揽人完成并交付工作成果。",
    minutes: "6–10",
    paragraphs: [
      "主要工作通常应由承揽人以自己的设备、技术和劳力完成，当事人另有约定的除外。未经定作人同意把主要工作交给第三人，定作人可以解除合同。",
      "辅助工作可以交由第三人完成。无论转交主要工作还是辅助工作，承揽人对第三人完成的工作成果仍向定作人负责，不能只让定作人另找第三人。",
    ],
    example: {
      title: "雕花木柜的制作安排",
      facts:
        "本案为原创教学虚构。叶禾看中了木作师傅程宁的雕刻手艺，请他按图制作一只雕花木柜，约定柜体结构和整面雕刻由程宁制作，包装可另找人。合同没有其他允许转交柜体制作的约定。程宁未征求叶禾意见，就把柜体制作和全部雕刻交给另一家作坊，自己只负责收货和交付。叶禾得知后要求解除，程宁说只要到时能交出柜子，就不能解除。",
      analysis:
        "叶禾可以解除。她约定由程宁完成柜体结构和整面雕刻，这些是本单的主要工作；程宁未经她同意，把这些工作都交给另一家作坊，符合定作人可以解除的情形。不必等成品出现质量问题后才能提出。",
    },
    pitfall: "把允许交第三人完成，误认为原承揽人可以不再负责。",
    recall: {
      prompt: "承揽主要工作和辅助工作交给第三人，有什么区别？",
      reference:
        "主要工作未经同意交给第三人，定作人可以解除；辅助工作可另找人，承揽人仍负责。",
    },
    sources: ["civil-work-mandate-third-party772"],
    exercises: [
      {
        caseId: "civil-work-mandate-work-main-delegation",
        relatedTopicIds: ["civil-work-third-party"],
        facts:
          "本案为原创教学虚构。叶禾看中了木作师傅程宁的雕刻手艺，请他按图制作一只雕花木柜，约定柜体结构和整面雕刻由程宁制作，包装可另找人。合同没有其他允许转交柜体制作的约定。程宁未征求叶禾意见，就把柜体制作和全部雕刻交给另一家作坊，自己只负责收货和交付。叶禾得知后要求解除，程宁说只要到时能交出柜子，就不能解除。",
        hint: "结合本案事实，直接说明结论和关键理由。",
        reference:
          "叶禾可以解除。她约定由程宁完成柜体结构和整面雕刻，这些是本单的主要工作；程宁未经她同意，把这些工作都交给另一家作坊，符合定作人可以解除的情形。不必等成品出现质量问题后才能提出。",
        sources: ["civil-work-mandate-third-party772"],
        id: "civil-work-mandate-work-main-delegation-choice",
        kind: "objective",
        choiceMode: "single",
        title: "雕花木柜的制作安排：选择判断",
        prompt: "叶禾能否据此解除承揽合同？",
        options: [
          {
            id: "a",
            text: "可以，程宁未经同意把主要工作交给第三人完成",
            explanation:
              "柜体结构和整面雕刻是本单主要工作，未经定作人同意交第三人完成，定作人可以解除。",
          },
          {
            id: "b",
            text: "不能，承揽人只要承诺最终交货就可转交全部工作",
            explanation: "主要工作转交有同意要求，不能只看是否承诺交货。",
          },
          {
            id: "c",
            text: "不能，必须先证明成品质量不合格才有解除权",
            explanation: "第772条的此项解除不以已经出现质量问题为前提。",
          },
          {
            id: "d",
            text: "可以，但只因为任何辅助工作也必须先征得同意",
            explanation:
              "本案转交的是主要工作；不能把该规则扩大到一切辅助工作。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-work-mandate-work-main-delegation",
        relatedTopicIds: ["civil-work-third-party"],
        facts:
          "本案为原创教学虚构。叶禾看中了木作师傅程宁的雕刻手艺，请他按图制作一只雕花木柜，约定柜体结构和整面雕刻由程宁制作，包装可另找人。合同没有其他允许转交柜体制作的约定。程宁未征求叶禾意见，就把柜体制作和全部雕刻交给另一家作坊，自己只负责收货和交付。叶禾得知后要求解除，程宁说只要到时能交出柜子，就不能解除。",
        hint: "结合本案事实，直接说明结论和关键理由。",
        reference:
          "叶禾可以解除。她约定由程宁完成柜体结构和整面雕刻，这些是本单的主要工作；程宁未经她同意，把这些工作都交给另一家作坊，符合定作人可以解除的情形。不必等成品出现质量问题后才能提出。",
        sources: ["civil-work-mandate-third-party772"],
        id: "civil-work-mandate-work-main-delegation-written",
        kind: "subjective",
        title: "雕花木柜的制作安排：写出分析",
        prompt: "叶禾能否因程宁的这一安排解除合同？说明本案转交的是什么工作。",
        criteria: [
          {
            id: "work-main-right",
            label: "解除结论",
            meaning: "认定叶禾可以依主要工作未经同意转交而解除。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或法条编号。",
            boundary: "不以已发生质量缺陷作为本项解除的额外条件。",
          },
          {
            id: "work-main-ground",
            label: "主要工作与同意",
            meaning:
              "联系柜体结构及全部雕刻被转交、叶禾未同意，说明不是仅将辅助工作外包。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或法条编号。",
            boundary:
              "不要求判断第三人资质、承揽合同整体无效或建设工程转包规则。",
          },
        ],
      },
      {
        caseId: "civil-work-mandate-work-auxiliary-packing",
        relatedTopicIds: ["civil-work-third-party"],
        facts:
          "本案为原创教学虚构。乔舒委托木工顾远制作六把餐椅，合同约定由顾远完成木架、榫卯和打磨，未限制另找人包装。顾远亲自做好全部餐椅后，请包装工许树完成纸箱、内衬和封装。许树把金属钉朝向椅面，包装时刮伤椅背，顾远发现后仍按原样交货。乔舒要求顾远处理，顾远说包装是别人做的，应让乔舒自己去找许树。",
        hint: "结合本案事实，直接说明结论和关键理由。",
        reference:
          "顾远可以请许树完成包装，但仍要向乔舒负责。木架、榫卯和打磨由顾远完成，另交第三人的是包装这项辅助工作，合同也没有要求全部亲自完成。辅助工作交给别人，不会把顾远对定作人的责任一并转走。",
        sources: ["civil-work-mandate-third-party772"],
        id: "civil-work-mandate-work-auxiliary-packing-choice",
        kind: "objective",
        choiceMode: "single",
        title: "定制餐椅的包装：选择判断",
        prompt: "对这次包装安排及刮伤责任，以下哪项正确？",
        options: [
          {
            id: "a",
            text: "包装也必须本人完成，因此合同整体无效",
            explanation: "普通承揽允许将辅助工作交第三人；不因此整体无效。",
          },
          {
            id: "b",
            text: "可以请第三人包装，所以顾远对刮伤完全不负责",
            explanation:
              "允许辅助工作交第三人，不等于承揽人免除对其成果的责任。",
          },
          {
            id: "c",
            text: "可以请第三人包装，但顾远仍应向乔舒负责",
            explanation:
              "包装属于辅助工作；承揽人对第三人完成的辅助工作成果仍向定作人负责。",
          },
          {
            id: "d",
            text: "只要主要工作自己完成，辅助工作不受任何合同约束",
            explanation: "辅助工作仍应符合合同目的和质量要求。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-work-mandate-work-auxiliary-packing",
        relatedTopicIds: ["civil-work-third-party"],
        facts:
          "本案为原创教学虚构。乔舒委托木工顾远制作六把餐椅，合同约定由顾远完成木架、榫卯和打磨，未限制另找人包装。顾远亲自做好全部餐椅后，请包装工许树完成纸箱、内衬和封装。许树把金属钉朝向椅面，包装时刮伤椅背，顾远发现后仍按原样交货。乔舒要求顾远处理，顾远说包装是别人做的，应让乔舒自己去找许树。",
        hint: "结合本案事实，直接说明结论和关键理由。",
        reference:
          "顾远可以请许树完成包装，但仍要向乔舒负责。木架、榫卯和打磨由顾远完成，另交第三人的是包装这项辅助工作，合同也没有要求全部亲自完成。辅助工作交给别人，不会把顾远对定作人的责任一并转走。",
        sources: ["civil-work-mandate-third-party772"],
        id: "civil-work-mandate-work-auxiliary-packing-written",
        kind: "subjective",
        title: "定制餐椅的包装：写出分析",
        prompt:
          "顾远是否可以请许树包装？他能否以包装由别人完成为由拒绝对乔舒负责？",
        criteria: [
          {
            id: "work-aux-permitted",
            label: "辅助工作安排",
            meaning: "认定包装是辅助工作，本案可以交由许树完成。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或法条编号。",
            boundary: "不把主要工作未经同意转交的解除规则机械套到本案包装。",
          },
          {
            id: "work-aux-liability",
            label: "承揽人仍向定作人负责",
            meaning:
              "联系包装造成刮伤，说明顾远不能仅以许树动手为由拒绝对乔舒负责。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或法条编号。",
            boundary: "不要求另外认定乔舒与包装工的合同关系或计算损失数额。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-work-materials",
    title: "承揽材料的提供与检验",
    headline:
      "承揽人供料须依约并接受检验；定作人供料也须及时检验、通知，不能擅换。",
    goal: "谁提供材料，怎样影响检验和处理义务？",
    prerequisite: "知道定作人提出要求、承揽人完成并交付工作成果。",
    minutes: "6–10",
    paragraphs: [
      "承揽人提供材料，应当按照约定选用，并接受定作人检验。自己采购并不等于可以排除约定材料标准。",
      "定作人提供材料，承揽人仍要及时检验。发现材料不符合约定，应及时通知定作人更换、补齐或采取其他补救措施，不能擅自替换。",
    ],
    example: {
      title: "送到作坊的木料",
      facts:
        "本案为原创教学虚构。沈青请方林按图定作一张书桌，约定沈青提供指定白橡木料，方林负责加工。木料送来后，方林核对标签、纹理及随附材料清单，发现其中两块是橡胶木，与约定不符。沈青当时可以通过电话联系。方林还未开工，准备不通知沈青，直接把那两块换成自己仓库里另一种木料继续做。",
      analysis:
        "方林不能擅自换料，应及时通知沈青处理。他已经发现两块木料与约定不符，可以请沈青更换、补齐或采取其他补救措施；材料由沈青提供，也不免除方林及时检验和通知的义务。",
    },
    pitfall:
      "认为材料不是自己买的就不用检验，或者认为自己买的材料就不用让定作人查验。",
    recall: {
      prompt: "谁提供材料，怎样影响检验和处理义务？",
      reference:
        "承揽人供料须依约并接受检验；定作人供料也须及时检验、通知，不能擅换。",
    },
    sources: ["civil-work-mandate-materials774"],
    exercises: [
      {
        caseId: "civil-work-mandate-work-customer-materials",
        relatedTopicIds: ["civil-work-materials"],
        facts:
          "本案为原创教学虚构。沈青请方林按图定作一张书桌，约定沈青提供指定白橡木料，方林负责加工。木料送来后，方林核对标签、纹理及随附材料清单，发现其中两块是橡胶木，与约定不符。沈青当时可以通过电话联系。方林还未开工，准备不通知沈青，直接把那两块换成自己仓库里另一种木料继续做。",
        hint: "结合本案事实，直接说明结论和关键理由。",
        reference:
          "方林不能擅自换料，应及时通知沈青处理。他已经发现两块木料与约定不符，可以请沈青更换、补齐或采取其他补救措施；材料由沈青提供，也不免除方林及时检验和通知的义务。",
        sources: ["civil-work-mandate-materials774"],
        id: "civil-work-mandate-work-customer-materials-choice",
        kind: "objective",
        choiceMode: "single",
        title: "送到作坊的木料：选择判断",
        prompt: "方林此时应当怎样处理材料问题？",
        options: [
          {
            id: "a",
            text: "材料由沈青提供，方林没有任何检验、通知义务",
            explanation: "定作人供料时，承揽人仍应及时检验，发现不符及时通知。",
          },
          {
            id: "b",
            text: "先通知沈青更换、补齐或采取补救措施，不擅自更换",
            explanation:
              "承揽人已经发现材料不符，应通知定作人补救，不能自行替换。",
          },
          {
            id: "c",
            text: "只要自己认为换后的材料更好，就可以直接换",
            explanation: "承揽人不能单凭自己的偏好擅自更换定作人提供的材料。",
          },
          {
            id: "d",
            text: "应先照常加工，等交付后再通知材料不符",
            explanation: "明知供料不符还先做完，不能代替及时通知。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-work-mandate-work-customer-materials",
        relatedTopicIds: ["civil-work-materials"],
        facts:
          "本案为原创教学虚构。沈青请方林按图定作一张书桌，约定沈青提供指定白橡木料，方林负责加工。木料送来后，方林核对标签、纹理及随附材料清单，发现其中两块是橡胶木，与约定不符。沈青当时可以通过电话联系。方林还未开工，准备不通知沈青，直接把那两块换成自己仓库里另一种木料继续做。",
        hint: "结合本案事实，直接说明结论和关键理由。",
        reference:
          "方林不能擅自换料，应及时通知沈青处理。他已经发现两块木料与约定不符，可以请沈青更换、补齐或采取其他补救措施；材料由沈青提供，也不免除方林及时检验和通知的义务。",
        sources: ["civil-work-mandate-materials774"],
        id: "civil-work-mandate-work-customer-materials-written",
        kind: "subjective",
        title: "送到作坊的木料：写出分析",
        prompt: "方林能否直接换料加工？发现材料不符后应怎样做？",
        criteria: [
          {
            id: "work-customer-notify",
            label: "发现不符及时通知",
            meaning:
              "联系两块木料不是约定白橡木，说明应及时通知沈青更换或采取补救措施。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或法条编号。",
            boundary: "认可通知后由双方确定补救办法，不要求写齐所有补救方式。",
          },
          {
            id: "work-customer-no-switch",
            label: "不得擅自换料",
            meaning: "认定方林不能不通知沈青就自行换成仓库里的其他木料。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或法条编号。",
            boundary: "不要求计算供料方违约、停工损失或替代材料价值。",
          },
        ],
      },
      {
        caseId: "civil-work-mandate-work-contractor-materials",
        relatedTopicIds: ["civil-work-materials"],
        facts:
          "本案为原创教学虚构。宋溪请陈禾定作四扇柜门，约定陈禾负责采购并使用白橡木，不允许用复合板替代。双方约好在开工前一个下午查验材料，查验不会妨碍正常作业。材料买来后，陈禾却说材料是自己付钱采购的，宋溪无权检查，等最后看柜门就行。",
        hint: "结合本案事实，直接说明结论和关键理由。",
        reference:
          "陈禾不能拒绝。由他提供材料，就要按合同选用白橡木，并接受宋溪检验。双方已约好开工前查验，且不妨碍正常工作；材料是陈禾自己出钱采购的，不会排除这项义务。",
        sources: ["civil-work-mandate-materials774"],
        id: "civil-work-mandate-work-contractor-materials-choice",
        kind: "objective",
        choiceMode: "single",
        title: "柜门开工前的查验：选择判断",
        prompt: "宋溪能否依约检验陈禾提供的材料？",
        options: [
          {
            id: "a",
            text: "不能，谁付款买材料谁就能拒绝任何检验",
            explanation: "承揽人提供材料，也应依约选材并接受定作人检验。",
          },
          {
            id: "b",
            text: "不能，承揽人只需让定作人在交付后检查外观",
            explanation: "材料检验不只限于成品交付后的外观检验。",
          },
          {
            id: "c",
            text: "可以，因此宋溪可以随时停掉作坊全部工作",
            explanation: "检验权不允许无边界妨碍承揽人正常工作。",
          },
          {
            id: "d",
            text: "可以，陈禾供料应符合约定并接受这次材料检验",
            explanation:
              "本案已约定选材标准与不影响作业的检验时间，陈禾不能因自购而拒绝。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-work-mandate-work-contractor-materials",
        relatedTopicIds: ["civil-work-materials"],
        facts:
          "本案为原创教学虚构。宋溪请陈禾定作四扇柜门，约定陈禾负责采购并使用白橡木，不允许用复合板替代。双方约好在开工前一个下午查验材料，查验不会妨碍正常作业。材料买来后，陈禾却说材料是自己付钱采购的，宋溪无权检查，等最后看柜门就行。",
        hint: "结合本案事实，直接说明结论和关键理由。",
        reference:
          "陈禾不能拒绝。由他提供材料，就要按合同选用白橡木，并接受宋溪检验。双方已约好开工前查验，且不妨碍正常工作；材料是陈禾自己出钱采购的，不会排除这项义务。",
        sources: ["civil-work-mandate-materials774"],
        id: "civil-work-mandate-work-contractor-materials-written",
        kind: "subjective",
        title: "柜门开工前的查验：写出分析",
        prompt:
          "陈禾能否因为材料是自己采购的，就拒绝宋溪这次检验？请结合合同说明。",
        criteria: [
          {
            id: "work-own-inspection",
            label: "供料与检验义务",
            meaning:
              "认定陈禾应依约提供白橡木并接受宋溪这次材料检验，不能以自购拒绝。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或法条编号。",
            boundary: "不要求讨论突击检查、停工或成品交付后的所有救济。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-work-quality",
    title: "承揽成果质量与救济",
    headline:
      "先对照约定质量；成果不符时合理选择修理等救济，后来的偏好变化不能自动变成质量问题。",
    goal: "承揽成果怎样判断质量不符，怎样请求补救？",
    prerequisite: "知道定作人提出要求、承揽人完成并交付工作成果。",
    minutes: "6–10",
    paragraphs: [
      "承揽人完成工作后，应交付成果及必要技术资料、质量证明，定作人应验收。尺寸、颜色等已有明确约定，就先按该约定判断成果是否合格。",
      "成果不符合质量要求，可以合理选择修理、重作、减少报酬、赔偿损失等违约救济。请求应符合本案问题和实际损失，不能把已经合格但后来不喜欢的成果直接当成不合格。",
    ],
    example: {
      title: "定制书柜的尺寸",
      facts:
        "本案为原创教学虚构。叶宁请孙澈定作一个书柜，合同和双方确认的图纸写明外宽100厘米。孙澈交付时，书柜外宽110厘米，无法放入叶宁预留的100厘米位置；叶宁没有同意改尺寸。双方测量确认这一差异；另请木工查看，更换两侧板就能缩至100厘米，不影响其余部件，修理费300元，原定报酬4000元。叶宁要求孙澈免费修理到约定尺寸，孙澈说柜子已经做完，叶宁只能收下，不能再提质量要求。",
      analysis:
        "叶宁可以要求修理到约定的100厘米。书柜做成110厘米，既违反确认的尺寸，也放不进原定位置，工作成果不符合约定。修理能够达标、费用也合理，是本案合理的质量救济，孙澈不能只说“已经做完”就拒绝。",
    },
    pitfall:
      "只看有没有做完，不看是否符合约定；或者把自己临时改要求当成对方质量违约。",
    recall: {
      prompt: "承揽成果怎样判断质量不符，怎样请求补救？",
      reference:
        "先对照约定质量；成果不符时合理选择修理等救济，后来的偏好变化不能自动变成质量问题。",
    },
    sources: ["civil-work-mandate-quality781"],
    exercises: [
      {
        caseId: "civil-work-mandate-work-wrong-dimensions",
        relatedTopicIds: ["civil-work-quality"],
        facts:
          "本案为原创教学虚构。叶宁请孙澈定作一个书柜，合同和双方确认的图纸写明外宽100厘米。孙澈交付时，书柜外宽110厘米，无法放入叶宁预留的100厘米位置；叶宁没有同意改尺寸。双方测量确认这一差异；另请木工查看，更换两侧板就能缩至100厘米，不影响其余部件，修理费300元，原定报酬4000元。叶宁要求孙澈免费修理到约定尺寸，孙澈说柜子已经做完，叶宁只能收下，不能再提质量要求。",
        hint: "结合本案事实，直接说明结论和关键理由。",
        reference:
          "叶宁可以要求修理到约定的100厘米。书柜做成110厘米，既违反确认的尺寸，也放不进原定位置，工作成果不符合约定。修理能够达标、费用也合理，是本案合理的质量救济，孙澈不能只说“已经做完”就拒绝。",
        sources: ["civil-work-mandate-quality781"],
        id: "civil-work-mandate-work-wrong-dimensions-choice",
        kind: "objective",
        choiceMode: "single",
        title: "定制书柜的尺寸：选择判断",
        prompt: "叶宁请求修理到约定尺寸是否有依据？",
        options: [
          {
            id: "a",
            text: "有，工作成果不符合约定，可以合理请求修理",
            explanation:
              "外宽超出明确约定，且修理可行、费用合理，属于合理质量救济。",
          },
          {
            id: "b",
            text: "没有，承揽人只要完成物品就不再对质量负责",
            explanation: "完成工作不等于工作成果符合约定质量。",
          },
          {
            id: "c",
            text: "没有，只有先付清报酬才有权提出质量要求",
            explanation: "题设没有以先付清为本项质量请求的前提。",
          },
          {
            id: "d",
            text: "有，而且可以就同一修复损失获得无限次重复赔偿",
            explanation: "合理救济不等于同一损失可以重复获得赔偿。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-work-mandate-work-wrong-dimensions",
        relatedTopicIds: ["civil-work-quality"],
        facts:
          "本案为原创教学虚构。叶宁请孙澈定作一个书柜，合同和双方确认的图纸写明外宽100厘米。孙澈交付时，书柜外宽110厘米，无法放入叶宁预留的100厘米位置；叶宁没有同意改尺寸。双方测量确认这一差异；另请木工查看，更换两侧板就能缩至100厘米，不影响其余部件，修理费300元，原定报酬4000元。叶宁要求孙澈免费修理到约定尺寸，孙澈说柜子已经做完，叶宁只能收下，不能再提质量要求。",
        hint: "结合本案事实，直接说明结论和关键理由。",
        reference:
          "叶宁可以要求修理到约定的100厘米。书柜做成110厘米，既违反确认的尺寸，也放不进原定位置，工作成果不符合约定。修理能够达标、费用也合理，是本案合理的质量救济，孙澈不能只说“已经做完”就拒绝。",
        sources: ["civil-work-mandate-quality781"],
        id: "civil-work-mandate-work-wrong-dimensions-written",
        kind: "subjective",
        title: "定制书柜的尺寸：写出分析",
        prompt: "叶宁能否要求孙澈免费修理到约定尺寸？请结合本案说明理由。",
        criteria: [
          {
            id: "work-quality-repair",
            label: "修理请求",
            meaning: "认定叶宁可以合理请求孙澈修理到约定尺寸。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或法条编号。",
            boundary: "不要求同时罗列全部其他救济或推定所有损失金额。",
          },
          {
            id: "work-quality-facts",
            label: "质量不符的具体依据",
            meaning:
              "联系100厘米约定与110厘米交付差异、修理可行合理，说明不是仅凭不喜欢要求返工。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或法条编号。",
            boundary: "能说明尺寸不符及修理合理即可，不要求逐字复述所有事实。",
          },
        ],
      },
      {
        caseId: "civil-work-mandate-work-matching-color",
        relatedTopicIds: ["civil-work-quality"],
        facts:
          "本案为原创教学虚构。周遥请陆森定作一张展示台。两人确认了尺寸和深蓝色板，合同写明按该色板喷涂。交货时双方测得长宽高与图纸标注一致，喷涂颜色与封存的深蓝色板一致，表面平整，没有开裂或掉漆。周遥当天看见新的店面方案，更喜欢米白色，要求陆森以“质量不合格返工”的名义免费改色，双方此前没有另约免费改色服务。",
        hint: "结合本案事实，直接说明结论和关键理由。",
        reference:
          "周遥不能以质量不合格为由要求免费改色。双方原来确认的是深蓝色，交付的尺寸、工艺和颜色都符合约定。周遥后来喜欢米白色，是改变自己的要求，不是陆森交付不合格；另行改色应再协商，不能套用免费质量修理。",
        sources: ["civil-work-mandate-quality781"],
        id: "civil-work-mandate-work-matching-color-choice",
        kind: "objective",
        choiceMode: "single",
        title: "交付当天的新配色：选择判断",
        prompt: "周遥能否仅依工作成果质量不符合约定，要求免费改成米白色？",
        options: [
          {
            id: "a",
            text: "可以，定作人后来喜欢什么都属于原质量标准",
            explanation: "后来改变偏好不自动改变已经确认的标准。",
          },
          {
            id: "b",
            text: "可以，只要还没有实际使用就等于不合格",
            explanation: "是否使用不替代对照原约定质量的判断。",
          },
          {
            id: "c",
            text: "不能，本案成果符合原约定，改偏好不是质量不符",
            explanation: "原定深蓝色、交付也符合，不能以质量救济强制免费改色。",
          },
          {
            id: "d",
            text: "不能，因为所有承揽成果一经交付都不能修理",
            explanation:
              "质量不符的成果可以依法请求合理修理；本案不符这一前提。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-work-mandate-work-matching-color",
        relatedTopicIds: ["civil-work-quality"],
        facts:
          "本案为原创教学虚构。周遥请陆森定作一张展示台。两人确认了尺寸和深蓝色板，合同写明按该色板喷涂。交货时双方测得长宽高与图纸标注一致，喷涂颜色与封存的深蓝色板一致，表面平整，没有开裂或掉漆。周遥当天看见新的店面方案，更喜欢米白色，要求陆森以“质量不合格返工”的名义免费改色，双方此前没有另约免费改色服务。",
        hint: "结合本案事实，直接说明结论和关键理由。",
        reference:
          "周遥不能以质量不合格为由要求免费改色。双方原来确认的是深蓝色，交付的尺寸、工艺和颜色都符合约定。周遥后来喜欢米白色，是改变自己的要求，不是陆森交付不合格；另行改色应再协商，不能套用免费质量修理。",
        sources: ["civil-work-mandate-quality781"],
        id: "civil-work-mandate-work-matching-color-written",
        kind: "subjective",
        title: "交付当天的新配色：写出分析",
        prompt: "周遥能否以成果质量不合格为由要求免费改色？为什么？",
        criteria: [
          {
            id: "work-quality-standard",
            label: "原约定与新偏好的区别",
            meaning:
              "联系交付符合原确认色板且无质量缺陷，认定不能以质量不符为由强制免费改色。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或法条编号。",
            boundary:
              "不要求评价其他解除理由或计算另改颜色的价款；不据此否认所有质量修理权。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-work-termination",
    title: "定作人的解除与损失赔偿",
    headline:
      "工作完成前可以随时解除，造成损失应赔偿；未取货不等于工作尚未完成。",
    goal: "定作人的随时解除权到何时，解除后是否赔损失？",
    prerequisite: "知道定作人提出要求、承揽人完成并交付工作成果。",
    minutes: "6–10",
    paragraphs: [
      "在承揽人完成工作前，定作人可以随时解除。承揽人已经开工不当然排除这项权利，但解除造成承揽人损失的，定作人应当赔偿。",
      "工作完成与成果交付不是同一个时间点。全部工作已经完成，仅因尚未取货，不能把第787条的随时解除权一直延长到收货或使用之前。",
    ],
    example: {
      title: "制作中的木制展架",
      facts:
        "本案为原创教学虚构。贺宁请林澈定作一组木制展架。林澈按要求开工，已完成下料和部分组装，整组展架尚未做完，双方没有特殊解除约定。贺宁的活动后来取消，她通知林澈解除。林澈为本单购入的专用构件已切割成特定尺寸，无法退货或用于其他订单；双方确认这部分合理支出1200元因解除无法收回。林澈没有违反合同，贺宁却认为只要自己可以取消，就一分钱损失也不用承担。",
      analysis:
        "贺宁可以解除，但应赔偿这1200元已确认的损失。展架还没有完成，定作人此时有权解除；专用构件的合理支出因解除无法收回，是林澈因此受到的损失。有权取消，不等于可以把取消的损失全部留给对方。",
    },
    pitfall: "把有解除权理解成取消零成本，或者把未交付直接等同于未完成。",
    recall: {
      prompt: "定作人的随时解除权到何时，解除后是否赔损失？",
      reference:
        "工作完成前可以随时解除，造成损失应赔偿；未取货不等于工作尚未完成。",
    },
    sources: ["civil-work-mandate-termination787"],
    exercises: [
      {
        caseId: "civil-work-mandate-work-cancel-before-finish",
        relatedTopicIds: ["civil-work-termination"],
        facts:
          "本案为原创教学虚构。贺宁请林澈定作一组木制展架。林澈按要求开工，已完成下料和部分组装，整组展架尚未做完，双方没有特殊解除约定。贺宁的活动后来取消，她通知林澈解除。林澈为本单购入的专用构件已切割成特定尺寸，无法退货或用于其他订单；双方确认这部分合理支出1200元因解除无法收回。林澈没有违反合同，贺宁却认为只要自己可以取消，就一分钱损失也不用承担。",
        hint: "结合本案事实，直接说明结论和关键理由。",
        reference:
          "贺宁可以解除，但应赔偿这1200元已确认的损失。展架还没有完成，定作人此时有权解除；专用构件的合理支出因解除无法收回，是林澈因此受到的损失。有权取消，不等于可以把取消的损失全部留给对方。",
        sources: ["civil-work-mandate-termination787"],
        id: "civil-work-mandate-work-cancel-before-finish-choice",
        kind: "objective",
        choiceMode: "single",
        title: "制作中的木制展架：选择判断",
        prompt: "对解除及这1200元已确认损失，哪项判断正确？",
        options: [
          {
            id: "a",
            text: "不能解除，因为承揽人只要已经开工就必须继续",
            explanation: "任意解除权的时间界限是工作完成前，不是开工前。",
          },
          {
            id: "b",
            text: "可以解除，但不能因此免除对林澈所受损失的赔偿",
            explanation:
              "本案尚未完成，定作人可解除；造成的已确认损失仍应赔偿。",
          },
          {
            id: "c",
            text: "可以解除，并且解除权当然免除全部损失责任",
            explanation: "有解除权不等于无须赔偿因此造成的损失。",
          },
          {
            id: "d",
            text: "能否解除只取决于是否已经付清报酬",
            explanation: "付款状态不替代第787条的工作完成前这一判断。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-work-mandate-work-cancel-before-finish",
        relatedTopicIds: ["civil-work-termination"],
        facts:
          "本案为原创教学虚构。贺宁请林澈定作一组木制展架。林澈按要求开工，已完成下料和部分组装，整组展架尚未做完，双方没有特殊解除约定。贺宁的活动后来取消，她通知林澈解除。林澈为本单购入的专用构件已切割成特定尺寸，无法退货或用于其他订单；双方确认这部分合理支出1200元因解除无法收回。林澈没有违反合同，贺宁却认为只要自己可以取消，就一分钱损失也不用承担。",
        hint: "结合本案事实，直接说明结论和关键理由。",
        reference:
          "贺宁可以解除，但应赔偿这1200元已确认的损失。展架还没有完成，定作人此时有权解除；专用构件的合理支出因解除无法收回，是林澈因此受到的损失。有权取消，不等于可以把取消的损失全部留给对方。",
        sources: ["civil-work-mandate-termination787"],
        id: "civil-work-mandate-work-cancel-before-finish-written",
        kind: "subjective",
        title: "制作中的木制展架：写出分析",
        prompt: "贺宁现在能否解除？她能否以有权取消为由拒绝承担这1200元损失？",
        criteria: [
          {
            id: "work-terminate-before",
            label: "完成前的解除",
            meaning: "联系仅下料、部分组装且整组未完成，认定贺宁可以解除。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或法条编号。",
            boundary: "不把已经开工、是否付费设为排除此项解除权的条件。",
          },
          {
            id: "work-terminate-loss",
            label: "解除不免损失赔偿",
            meaning:
              "联系专用构件无法退用、确认1200元因解除损失，认定不能拒绝这笔赔偿。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或法条编号。",
            boundary: "不要求推定未给出的预期利润、全部损失总额或额外违约金。",
          },
        ],
      },
      {
        caseId: "civil-work-mandate-work-complete-awaiting-delivery",
        relatedTopicIds: ["civil-work-termination"],
        facts:
          "本案为原创教学虚构。顾青请方舒定作一套桌面模型，约定9月20日制作完成、9月22日取走。9月20日方舒已按全部要求完成模型，拍照发给顾青，双方确认没有待完成工序，顾青也未提出尺寸或制作问题。9月21日顾青因活动取消，通知方舒称自己还没取货，所以仍可按定作人的随时解除权取消，拒绝接收。合同没有完成后可任意取消的条款，本题只判断该随时解除权。",
        hint: "结合本案事实，直接说明结论和关键理由。",
        reference:
          "顾青不能再依这项随时解除权取消。本案9月20日已经完成全部工序，顾青也确认无待完成部分。第787条允许在工作完成前随时解除，不是允许在取货前一律取消；尚未取货不会让已经完成的工作变回未完成。",
        sources: ["civil-work-mandate-termination787"],
        id: "civil-work-mandate-work-complete-awaiting-delivery-choice",
        kind: "objective",
        choiceMode: "single",
        title: "制作完成后的通知：选择判断",
        prompt: "顾青能否仅凭尚未取走模型，继续行使工作完成前的随时解除权？",
        options: [
          {
            id: "a",
            text: "可以，工作完成前包括定作人尚未使用的全部期间",
            explanation: "实际使用不是第787条的时间界限。",
          },
          {
            id: "b",
            text: "可以，只要还没交付就永远属于尚未完成",
            explanation: "工作完成和成果交付是两个不同时间点。",
          },
          {
            id: "c",
            text: "不能，而且任何承揽合同在任何时候都不得解除",
            explanation: "本案不能套该项权利，不代表所有承揽合同均不得解除。",
          },
          {
            id: "d",
            text: "不能，模型已经完成，未取货不使工作回到未完成状态",
            explanation: "该项随时解除权以承揽人尚未完成工作为界。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-work-mandate-work-complete-awaiting-delivery",
        relatedTopicIds: ["civil-work-termination"],
        facts:
          "本案为原创教学虚构。顾青请方舒定作一套桌面模型，约定9月20日制作完成、9月22日取走。9月20日方舒已按全部要求完成模型，拍照发给顾青，双方确认没有待完成工序，顾青也未提出尺寸或制作问题。9月21日顾青因活动取消，通知方舒称自己还没取货，所以仍可按定作人的随时解除权取消，拒绝接收。合同没有完成后可任意取消的条款，本题只判断该随时解除权。",
        hint: "结合本案事实，直接说明结论和关键理由。",
        reference:
          "顾青不能再依这项随时解除权取消。本案9月20日已经完成全部工序，顾青也确认无待完成部分。第787条允许在工作完成前随时解除，不是允许在取货前一律取消；尚未取货不会让已经完成的工作变回未完成。",
        sources: ["civil-work-mandate-termination787"],
        id: "civil-work-mandate-work-complete-awaiting-delivery-written",
        kind: "subjective",
        title: "制作完成后的通知：写出分析",
        prompt:
          "顾青能否依工作完成前的随时解除权取消本单？说明未取货与未完成有什么不同。",
        criteria: [
          {
            id: "work-terminate-complete",
            label: "完成与交付的时间界限",
            meaning:
              "联系模型已经全部完成、双方确认无待完成工序，认定仅因未取货不能继续适用工作完成前任意解除。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或法条编号。",
            boundary:
              "只判断第787条这一依据，不要求评价题目没有提供的其他法定或约定解除权。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-mandate-instructions",
    title: "按指示处理与紧急变更",
    headline: "需要改动指示时先征同意，紧急难联络时妥善处理并报告。",
    goal: "受托人何时应先问，何时可以紧急处理？",
    prerequisite: "知道委托由受托人替委托人处理事务。",
    minutes: "6–10",
    paragraphs: [
      "受托人应按委托人的指示处理事务，需要变更时应经委托人同意。自己觉得更方便或更省钱，不当然获得改变具体指示的权限。",
      "情况紧急、难以联系委托人时，受托人应先妥善处理事务，事后及时报告。要同时看紧急程度、联系困难、措施是否妥当，以及事后报告。",
    ],
    example: {
      title: "搬家预约中的车型选择",
      facts:
        "本案为原创教学虚构。吴晓请袁澄代为联系搬家公司，明确指示预约6月18日上午的封闭厢式货车。6月1日，袁澄发现敞篷货车便宜，便自行改订敞篷车，想着能替吴晓省钱。当天吴晓手机畅通，袁澄还和他聊过别的事，却没有提起车型变更。",
      analysis:
        "袁澄自行改订不符合委托要求。吴晓明确要求封闭厢式货车，袁澄若要改用敞篷车，应先取得同意；当时联系方便、预约不急，不能只因觉得便宜就自行改变指示。",
    },
    pitfall: "把“替对方着想”当成随意改变指示的授权，或在紧急状态机械等待。",
    recall: {
      prompt: "受托人何时应先问，何时可以紧急处理？",
      reference:
        "一般变更应先获同意；紧急且难以联系时先妥善处理，事后及时报告。",
    },
    sources: ["civil-work-mandate-instructions922"],
    exercises: [
      {
        caseId: "civil-work-mandate-case-instructions-car-change",
        relatedTopicIds: ["civil-mandate-instructions"],
        facts:
          "本案为原创教学虚构。吴晓请袁澄代为联系搬家公司，明确指示预约6月18日上午的封闭厢式货车。6月1日，袁澄发现敞篷货车便宜，便自行改订敞篷车，想着能替吴晓省钱。当天吴晓手机畅通，袁澄还和他聊过别的事，却没有提起车型变更。",
        hint: "结合本案事实，说明结论和关键理由。",
        sources: ["civil-work-mandate-instructions922"],
        id: "civil-work-mandate-instructions-car-change-choice",
        kind: "objective",
        choiceMode: "single",
        title: "搬家预约中的车型选择",
        prompt: "袁澄自行改订敞篷车，是否符合这次委托的要求？",
        options: [
          {
            id: "a",
            text: "符合，只要费用更低就可以替代委托人的具体指示。",
            explanation: "节省费用不当然产生改变具体指示的权限。",
          },
          {
            id: "b",
            text: "不符合，应先取得吴晓同意后再变更车型。",
            explanation: "本案联系方便、事情不急，应遵照指示或先征得变更同意。",
          },
          {
            id: "c",
            text: "符合，只要袁澄主观上想帮助吴晓就够了。",
            explanation: "帮助的目的不能代替按照指示办理的义务。",
          },
          {
            id: "d",
            text: "不符合，因为委托人的任何指示在任何情况下都不得变更。",
            explanation: "变更经同意可以进行，紧急难以联系时也有妥善处理规则。",
          },
        ],
        answer: "b",
        reference:
          "选B。袁澄自行改订不符合委托要求。吴晓明确要求封闭厢式货车，袁澄若要改用敞篷车，应先取得同意；当时联系方便、预约不急，不能只因觉得便宜就自行改变指示。",
      },
      {
        caseId: "civil-work-mandate-case-instructions-car-change",
        relatedTopicIds: ["civil-mandate-instructions"],
        facts:
          "本案为原创教学虚构。吴晓请袁澄代为联系搬家公司，明确指示预约6月18日上午的封闭厢式货车。6月1日，袁澄发现敞篷货车便宜，便自行改订敞篷车，想着能替吴晓省钱。当天吴晓手机畅通，袁澄还和他聊过别的事，却没有提起车型变更。",
        hint: "结合本案事实，说明结论和关键理由。",
        sources: ["civil-work-mandate-instructions922"],
        id: "civil-work-mandate-instructions-car-change-written",
        kind: "subjective",
        title: "预约车型发生变化",
        prompt:
          "袁澄自行改订敞篷车，是否符合这次委托的要求？请完整写出判断及其事实理由。",
        answer: "",
        reference:
          "袁澄自行改订不符合委托要求。吴晓明确要求封闭厢式货车，袁澄若要改用敞篷车，应先取得同意；当时联系方便、预约不急，不能只因觉得便宜就自行改变指示。",
        criteria: [
          {
            id: "mandate-car922",
            label: "联系具体指示与可联系状态判断变更",
            meaning:
              "联系明确指定封闭厢车、可以联系且并不紧急，说明袁澄应先获同意，自行改订不符合要求。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "只判断委托内部按指示处理的义务，不要求评价搬家合同对外效力或计算损失。",
          },
        ],
      },
      {
        caseId: "civil-work-mandate-case-instructions-burst-pipe",
        relatedTopicIds: ["civil-mandate-instructions"],
        facts:
          "本案为原创教学虚构。远行的邹晴委托顾川代管房屋并处理报修，指示维修时联系乐安公司。一天水管突然爆裂，水不断浸泡地板，总阀锈死无法关闭。顾川连续拨打邹晴电话都未接通；乐安公司表示次日才能来，附近另一家有资质的维修公司可立即到场，报价与当地正常价格相当。顾川请该公司及时止漏。当晚联系上邹晴后，顾川立即报告经过，并发去现场照片、维修记录和收据。",
        hint: "结合本案事实，说明结论和关键理由。",
        sources: ["civil-work-mandate-instructions922"],
        id: "civil-work-mandate-instructions-burst-pipe-choice",
        kind: "objective",
        choiceMode: "single",
        title: "水管爆裂时的联络",
        prompt: "顾川改请另一家公司止漏，是否符合这次委托的要求？",
        options: [
          {
            id: "a",
            text: "不符合，只要没有事先取得同意，任何紧急处理都不允许。",
            explanation:
              "紧急且难以联系时，法律允许并要求妥善处理，事后及时报告。",
          },
          {
            id: "b",
            text: "符合，而且此后不必再向邹晴报告。",
            explanation: "紧急处理不免除事后及时报告义务。",
          },
          {
            id: "c",
            text: "符合，事态紧急、难以联系，处理及时妥当且事后立即报告。",
            explanation:
              "爆管持续造成损害、原公司不能及时到场，替代措施与及时报告均有事实支持。",
          },
          {
            id: "d",
            text: "不符合，因为必须等到原公司次日到场。",
            explanation:
              "机械等待会让损害扩大，不符合紧急情况下妥善处理事务的要求。",
          },
        ],
        answer: "c",
        reference:
          "选C。顾川的处理符合本案委托要求。爆管持续浸水、总阀无法关闭，原公司不能及时到场，顾川又一时联系不上邹晴，应当先妥善处理。他选择能立即到场、收费正常的有资质公司止漏，并在联系恢复后立即报告，符合紧急处理及事后报告的要求。",
      },
      {
        caseId: "civil-work-mandate-case-instructions-burst-pipe",
        relatedTopicIds: ["civil-mandate-instructions"],
        facts:
          "本案为原创教学虚构。远行的邹晴委托顾川代管房屋并处理报修，指示维修时联系乐安公司。一天水管突然爆裂，水不断浸泡地板，总阀锈死无法关闭。顾川连续拨打邹晴电话都未接通；乐安公司表示次日才能来，附近另一家有资质的维修公司可立即到场，报价与当地正常价格相当。顾川请该公司及时止漏。当晚联系上邹晴后，顾川立即报告经过，并发去现场照片、维修记录和收据。",
        hint: "结合本案事实，说明结论和关键理由。",
        sources: ["civil-work-mandate-instructions922"],
        id: "civil-work-mandate-instructions-burst-pipe-written",
        kind: "subjective",
        title: "报修安排临时变化",
        prompt:
          "顾川改请另一家公司止漏，是否符合这次委托的要求？请完整写出判断及其事实理由。",
        answer: "",
        reference:
          "顾川的处理符合本案委托要求。爆管持续浸水、总阀无法关闭，原公司不能及时到场，顾川又一时联系不上邹晴，应当先妥善处理。他选择能立即到场、收费正常的有资质公司止漏，并在联系恢复后立即报告，符合紧急处理及事后报告的要求。",
        criteria: [
          {
            id: "mandate-pipe922-emergency",
            label: "紧急且难以联系时妥善处理",
            meaning:
              "联系持续爆管、无法关阀、原公司不能及时到场及联系不上委托人，说明可以先采取本案适当的止漏措施。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不要求等待损失扩大，也不以紧急情况允许任意处置。",
          },
          {
            id: "mandate-pipe922-report",
            label: "事后及时报告",
            meaning:
              "联系当晚恢复联系后立即报告并提交维修记录，说明已履行紧急处理后的及时报告义务。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不要求固定报告格式、费用结算数额或对外代理效力分析。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-mandate-subdelegation",
    title: "转委托与原受托人的责任",
    headline: "是否获得同意或追认，会改变原受托人的责任范围。",
    goal: "经同意与未经同意的转委托，责任有什么区别？",
    prerequisite: "知道受托人原则上应亲自处理委托事务。",
    minutes: "6–10",
    paragraphs: [
      "受托人原则上亲自处理事务，经委托人同意可以转委托；事后追认也适用相应规则。经同意或追认后，委托人可以直接指示第三人，原受托人仅就第三人的选任和对其指示承担责任。",
      "未获同意或追认时，原受托人应对转委托第三人的行为承担责任。但为维护委托人利益，在紧急情况下需要转委托的除外。经同意不等于完全免责，未经同意也要保留这一紧急例外。",
    ],
    example: {
      title: "报名材料的经手人",
      facts:
        "本案为原创教学虚构。秦岚有偿委托沈承核对并提交展会报名材料，后来明确同意沈承将这项事务转委托他人。沈承选了有三年同类代办经验的周铭，事前查验其从业证明和近期逐笔按期提交的办理记录。沈承按主办方清单把文件逐项整理齐全，书面告知周铭报名网站、上传文件清单及6月30日17时的截止时间，并让其逐项核收。周铭实际上传时误选了自己的旧版文件，导致秦岚损失2000元。秦岚仅因周铭出了差错，要求沈承承担这笔损失。",
      analysis:
        "秦岚不能仅因周铭这次上传失误就要求沈承赔偿。转委托已经明确同意，沈承仅就周铭的选任及对其指示承担责任；本案已核验同类经验，材料和提交指示也正确完整，损失来自周铭自己的上传失误，并无沈承在选任、指示上的问题。",
    },
    pitfall: "把经同意理解为全免责，或把未经同意时的责任缩成只负责交代要求。",
    recall: {
      prompt: "经同意与未经同意的转委托，责任有什么区别？",
      reference:
        "经同意或追认，原受托人仅负选任、指示责任；未经同意或追认，原则上须对第三人行为负责，紧急维护委托人利益的情形除外。",
    },
    sources: ["civil-work-mandate-subdelegation923"],
    exercises: [
      {
        caseId: "civil-work-mandate-case-subdelegation-consented",
        relatedTopicIds: ["civil-mandate-subdelegation"],
        facts:
          "本案为原创教学虚构。秦岚有偿委托沈承核对并提交展会报名材料，后来明确同意沈承将这项事务转委托他人。沈承选了有三年同类代办经验的周铭，事前查验其从业证明和近期逐笔按期提交的办理记录。沈承按主办方清单把文件逐项整理齐全，书面告知周铭报名网站、上传文件清单及6月30日17时的截止时间，并让其逐项核收。周铭实际上传时误选了自己的旧版文件，导致秦岚损失2000元。秦岚仅因周铭出了差错，要求沈承承担这笔损失。",
        hint: "结合本案事实，说明结论和关键理由。",
        sources: ["civil-work-mandate-subdelegation923"],
        id: "civil-work-mandate-subdelegation-consented-choice",
        kind: "objective",
        choiceMode: "single",
        title: "报名材料的经手人",
        prompt: "秦岚能否仅因周铭这次上传失误，要求沈承承担损失？",
        options: [
          {
            id: "a",
            text: "不能仅据此要求；经同意转委托时，沈承仅就选任和指示承担责任，本案没有这两方面的问题。",
            explanation:
              "同意后的责任范围不是对第三人的所有行为当然负责，本案选任和指示均有相应事实。",
          },
          {
            id: "b",
            text: "能，因为只要曾经接受委托，就必须对任何第三人差错负责。",
            explanation: "忽略经同意转委托后第923条限定的责任范围。",
          },
          {
            id: "c",
            text: "不能，而且经同意后沈承即使选人失当、指示错误也一概免责。",
            explanation: "同意不免除选任及指示方面的责任。",
          },
          {
            id: "d",
            text: "能，因为转委托只有事后追认才有效，事先同意不算。",
            explanation: "第923条同时认可事先同意与事后追认。",
          },
        ],
        answer: "a",
        reference:
          "选A。秦岚不能仅因周铭这次上传失误就要求沈承赔偿。转委托已经明确同意，沈承仅就周铭的选任及对其指示承担责任；本案已核验同类经验，材料和提交指示也正确完整，损失来自周铭自己的上传失误，并无沈承在选任、指示上的问题。",
      },
      {
        caseId: "civil-work-mandate-case-subdelegation-consented",
        relatedTopicIds: ["civil-mandate-subdelegation"],
        facts:
          "本案为原创教学虚构。秦岚有偿委托沈承核对并提交展会报名材料，后来明确同意沈承将这项事务转委托他人。沈承选了有三年同类代办经验的周铭，事前查验其从业证明和近期逐笔按期提交的办理记录。沈承按主办方清单把文件逐项整理齐全，书面告知周铭报名网站、上传文件清单及6月30日17时的截止时间，并让其逐项核收。周铭实际上传时误选了自己的旧版文件，导致秦岚损失2000元。秦岚仅因周铭出了差错，要求沈承承担这笔损失。",
        hint: "结合本案事实，说明结论和关键理由。",
        sources: ["civil-work-mandate-subdelegation923"],
        id: "civil-work-mandate-subdelegation-consented-written",
        kind: "subjective",
        title: "同意转交后的材料差错",
        prompt:
          "秦岚能否仅因周铭这次上传失误，要求沈承承担损失？请完整写出判断及其事实理由。",
        answer: "",
        reference:
          "秦岚不能仅因周铭这次上传失误就要求沈承赔偿。转委托已经明确同意，沈承仅就周铭的选任及对其指示承担责任；本案已核验同类经验，材料和提交指示也正确完整，损失来自周铭自己的上传失误，并无沈承在选任、指示上的问题。",
        criteria: [
          {
            id: "mandate-sub923-consent",
            label: "经同意转委托后的责任范围",
            meaning:
              "联系明确同意，说明沈承仅就选任周铭及对其指示承担责任，不对周铭每次操作失误当然负责。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不能把经同意理解成原受托人任何情况下都免责。",
          },
          {
            id: "mandate-sub923-facts",
            label: "联系选任与指示事实得出本案结论",
            meaning:
              "联系核验同类经验、交清完整材料及正确要求、差错出自周铭上传，说明不能仅据此要求沈承赔偿。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "只评价沈承，不要求确定周铭应负何种责任或损失分担比例。",
          },
        ],
      },
      {
        caseId: "civil-work-mandate-case-subdelegation-unapproved",
        relatedTopicIds: ["civil-mandate-subdelegation"],
        facts:
          "本案为原创教学虚构。周芮有偿委托宋林亲自到打印店领取并送回一套参展原稿。宋林当天想去看电影，没有询问周芮，就把取送任务交给董鸣。周芮当时可以联系；宋林不赶时间，也没有突发情况。宋林向董鸣交代了取送要求，但董鸣取件后把文件袋遗忘在公共长椅上，原稿丢失，补制费800元已经确认。周芮得知后当即表示没有同意，也不追认这次转交。宋林称自己交代清楚，就不应负责。",
        hint: "结合本案事实，说明结论和关键理由。",
        sources: ["civil-work-mandate-subdelegation923"],
        id: "civil-work-mandate-subdelegation-unapproved-choice",
        kind: "objective",
        choiceMode: "single",
        title: "取件任务的临时转交",
        prompt: "宋林能否仅凭已经交代取送要求而免于承担本次损失？",
        options: [
          {
            id: "a",
            text: "能，只要把要求说清，未经同意转委托也只对指示负责。",
            explanation:
              "将经同意转委托的限定责任错误用于未经同意、追认的转委托。",
          },
          {
            id: "b",
            text: "能，因为董鸣的行为与原受托人永远无关。",
            explanation:
              "未经同意或追认时，原受托人原则上应对第三人的行为承担责任。",
          },
          {
            id: "c",
            text: "不能，但只是因为一切转委托都被法律绝对禁止。",
            explanation: "转委托可经同意或追认，紧急维护委托人利益也有例外。",
          },
          {
            id: "d",
            text: "不能，转交未经同意或追认，又没有紧急必要，应对董鸣的行为负责。",
            explanation:
              "看电影不是紧急维护委托人利益，本案符合未经批准转委托的责任规则。",
          },
        ],
        answer: "d",
        reference:
          "选D。宋林不能以交代过要求为由免于承担本次损失。他未经周芮同意转交，事后也未获追认，而且只是为了看电影，不存在紧急维护委托人利益的必要，因此应对董鸣丢失原稿的行为承担责任。",
      },
      {
        caseId: "civil-work-mandate-case-subdelegation-unapproved",
        relatedTopicIds: ["civil-mandate-subdelegation"],
        facts:
          "本案为原创教学虚构。周芮有偿委托宋林亲自到打印店领取并送回一套参展原稿。宋林当天想去看电影，没有询问周芮，就把取送任务交给董鸣。周芮当时可以联系；宋林不赶时间，也没有突发情况。宋林向董鸣交代了取送要求，但董鸣取件后把文件袋遗忘在公共长椅上，原稿丢失，补制费800元已经确认。周芮得知后当即表示没有同意，也不追认这次转交。宋林称自己交代清楚，就不应负责。",
        hint: "结合本案事实，说明结论和关键理由。",
        sources: ["civil-work-mandate-subdelegation923"],
        id: "civil-work-mandate-subdelegation-unapproved-written",
        kind: "subjective",
        title: "原稿补制费的争议",
        prompt:
          "宋林能否仅凭已经交代取送要求而免于承担本次损失？请完整写出判断及其事实理由。",
        answer: "",
        reference:
          "宋林不能以交代过要求为由免于承担本次损失。他未经周芮同意转交，事后也未获追认，而且只是为了看电影，不存在紧急维护委托人利益的必要，因此应对董鸣丢失原稿的行为承担责任。",
        criteria: [
          {
            id: "mandate-sub923-unapproved",
            label: "未经同意转委托的行为责任",
            meaning:
              "联系未同意、未追认且无紧急必要，说明宋林应对董鸣丢稿的行为负责，交代要求不能使其免责。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "不把规则扩为任何转委托都禁止，不要求分析对外代理、盗失物归属或诉讼程序。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-mandate-expenses",
    title: "委托事务的费用与垫付",
    headline: "费用不是报酬，无偿委托也要分清费用由谁负担。",
    goal: "预付费用、偿还垫费和垫费利息怎样处理？",
    prerequisite: "区分处理事务的支出与受托人取得的报酬。",
    minutes: "6–10",
    paragraphs: [
      "委托人应预付处理委托事务的费用。受托人不收报酬，并不当然表示替委托人承担正常办事费用。",
      "受托人为处理委托事务垫付必要费用的，委托人应偿还，并支付相应利息。费用确为处理该事务所必需，与具体利率、金额如何计算是不同问题。",
    ],
    example: {
      title: "寄运资料前的报价",
      facts:
        "本案为原创教学虚构。陆荞请朋友余衡无偿代为联系快递，办理家中一箱资料的跨市寄运。快递公司按正常报价收取运费及符合运输要求的包装费，共180元，先缴费才上门取件。余衡在寄运前请陆荞先付这笔钱。双方没有约定由余衡负担费用，陆荞却认为余衡答应免费帮忙，就应自己先出钱。",
      analysis:
        "余衡可以要求陆荞预付这180元。运费和符合运送要求的包装费是办理这次寄运所需的费用，应由委托人预付；余衡答应不收报酬，并不等于答应自己负担这些费用。",
    },
    pitfall:
      "把免费帮忙等同于自付所有费用，或因没约利息而否定必要垫费的法定利息。",
    recall: {
      prompt: "预付费用、偿还垫费和垫费利息怎样处理？",
      reference:
        "费用原则上由委托人预付；必要费用已经垫付的，应偿还并支付利息，不以受托人收取报酬为前提。",
    },
    sources: ["civil-work-mandate-expenses921"],
    exercises: [
      {
        caseId: "civil-work-mandate-case-expenses-prepayment",
        relatedTopicIds: ["civil-mandate-expenses"],
        facts:
          "本案为原创教学虚构。陆荞请朋友余衡无偿代为联系快递，办理家中一箱资料的跨市寄运。快递公司按正常报价收取运费及符合运输要求的包装费，共180元，先缴费才上门取件。余衡在寄运前请陆荞先付这笔钱。双方没有约定由余衡负担费用，陆荞却认为余衡答应免费帮忙，就应自己先出钱。",
        hint: "结合本案事实，说明结论和关键理由。",
        sources: ["civil-work-mandate-expenses921"],
        id: "civil-work-mandate-expenses-prepayment-choice",
        kind: "objective",
        choiceMode: "single",
        title: "寄运资料前的报价",
        prompt: "余衡能否在办理寄运前要求陆荞预付这180元？",
        options: [
          {
            id: "a",
            text: "不能，受托人没有报酬就应自己负担全部费用。",
            explanation: "无偿只是不收报酬，不等于自担处理委托事务的费用。",
          },
          {
            id: "b",
            text: "能，委托人应预付处理委托事务的费用，无偿帮忙不改变这一点。",
            explanation: "运费和必需包装费来自本次寄运，未约定由受托人自担。",
          },
          {
            id: "c",
            text: "不能，只有受托人已经垫付后，委托人才可能负担费用。",
            explanation: "第921条先规定费用预付，不限于事后偿还。",
          },
          {
            id: "d",
            text: "能，但只能因为180元应视为余衡收取的报酬。",
            explanation: "这笔钱支付给快递及包装服务，是费用而非余衡的报酬。",
          },
        ],
        answer: "b",
        reference:
          "选B。余衡可以要求陆荞预付这180元。运费和符合运送要求的包装费是办理这次寄运所需的费用，应由委托人预付；余衡答应不收报酬，并不等于答应自己负担这些费用。",
      },
      {
        caseId: "civil-work-mandate-case-expenses-prepayment",
        relatedTopicIds: ["civil-mandate-expenses"],
        facts:
          "本案为原创教学虚构。陆荞请朋友余衡无偿代为联系快递，办理家中一箱资料的跨市寄运。快递公司按正常报价收取运费及符合运输要求的包装费，共180元，先缴费才上门取件。余衡在寄运前请陆荞先付这笔钱。双方没有约定由余衡负担费用，陆荞却认为余衡答应免费帮忙，就应自己先出钱。",
        hint: "结合本案事实，说明结论和关键理由。",
        sources: ["civil-work-mandate-expenses921"],
        id: "civil-work-mandate-expenses-prepayment-written",
        kind: "subjective",
        title: "无偿帮忙中的费用安排",
        prompt:
          "余衡能否在办理寄运前要求陆荞预付这180元？请完整写出判断及其事实理由。",
        answer: "",
        reference:
          "余衡可以要求陆荞预付这180元。运费和符合运送要求的包装费是办理这次寄运所需的费用，应由委托人预付；余衡答应不收报酬，并不等于答应自己负担这些费用。",
        criteria: [
          {
            id: "mandate-exp921-prepay",
            label: "区分报酬与事务费用预付",
            meaning:
              "联系运费、包装费为本次寄运所需且未约定受托人自担，说明陆荞应预付，无偿帮忙不免除该义务。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不把费用当作报酬，不要求讨论快递运输责任或额外费用。",
          },
        ],
      },
      {
        caseId: "civil-work-mandate-case-expenses-advance-interest",
        relatedTopicIds: ["civil-mandate-expenses"],
        facts:
          "本案为原创教学虚构。韩筝无偿请梁越代办一次活动报名，报名费800元。报名即将截止，韩筝一时来不及转款，请梁越先按主办方公示收费垫付。梁越付款后取得正式收据，按约办妥报名。韩筝后来仍未偿付，梁越要求返还800元并支付这笔垫付款的利息。韩筝只愿还800元，理由是双方没有约定利息。",
        hint: "结合本案事实，说明结论和关键理由。",
        sources: ["civil-work-mandate-expenses921"],
        id: "civil-work-mandate-expenses-advance-interest-choice",
        kind: "objective",
        choiceMode: "single",
        title: "活动报名中的代垫款",
        prompt: "韩筝应否偿还800元并支付相应利息？",
        options: [
          {
            id: "a",
            text: "只还800元，因为没约定利息就一律没有利息义务。",
            explanation:
              "本案是处理委托事务垫付必要费用，第921条直接规定费用利息义务。",
          },
          {
            id: "b",
            text: "不用还，因为无偿受托人只能自行承担报名支出。",
            explanation: "不收报酬不等于为委托人承担所需费用。",
          },
          {
            id: "c",
            text: "只付利息、不还800元，因为这笔钱已经交给主办方。",
            explanation: "必要费用由受托人实际垫付，委托人仍应偿还。",
          },
          {
            id: "d",
            text: "应偿还800元并支付相应利息，这是为委托事务垫付的必要费用。",
            explanation: "请求对应第921条，不以另有付息约定为前提。",
          },
        ],
        answer: "d",
        reference:
          "选D。韩筝应偿还800元，并支付相应利息。梁越依韩筝请求，按主办方收费为完成报名垫付了必要费用，第921条要求委托人偿还并支付利息，未另约利息不能排除这项义务。",
      },
      {
        caseId: "civil-work-mandate-case-expenses-advance-interest",
        relatedTopicIds: ["civil-mandate-expenses"],
        facts:
          "本案为原创教学虚构。韩筝无偿请梁越代办一次活动报名，报名费800元。报名即将截止，韩筝一时来不及转款，请梁越先按主办方公示收费垫付。梁越付款后取得正式收据，按约办妥报名。韩筝后来仍未偿付，梁越要求返还800元并支付这笔垫付款的利息。韩筝只愿还800元，理由是双方没有约定利息。",
        hint: "结合本案事实，说明结论和关键理由。",
        sources: ["civil-work-mandate-expenses921"],
        id: "civil-work-mandate-expenses-advance-interest-written",
        kind: "subjective",
        title: "报名费偿还时的分歧",
        prompt: "韩筝应否偿还800元并支付相应利息？请完整写出判断及其事实理由。",
        answer: "",
        reference:
          "韩筝应偿还800元，并支付相应利息。梁越依韩筝请求，按主办方收费为完成报名垫付了必要费用，第921条要求委托人偿还并支付利息，未另约利息不能排除这项义务。",
        criteria: [
          {
            id: "mandate-exp921-repay",
            label: "偿还必要垫费",
            meaning:
              "联系应请求垫付公示报名费并办妥报名，说明韩筝应偿还800元。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不要求确定其他报酬、违约金或报名活动的收益。",
          },
          {
            id: "mandate-exp921-interest",
            label: "垫费的利息义务",
            meaning:
              "说明必要费用的垫付依法产生相应利息给付义务，不能仅因未约定利息拒绝。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "只判断应否付息，不要求选定具体利率、起止日或计算利息金额。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-mandate-termination",
    title: "委托解除与损失赔偿",
    headline: "随时解除不等于一律不赔，先看有偿、无偿及解除原因。",
    goal: "解除委托时，有偿、无偿和不可归责事由怎样影响赔偿？",
    prerequisite: "区分合同解除的权利与解除产生的损失。",
    minutes: "6–10",
    paragraphs: [
      "委托人或受托人都可以随时解除委托。解除造成对方损失时，还要另行判断赔偿，不能只因有解除权就认定免责。",
      "无偿委托，解除方赔偿因解除时间不当造成的直接损失；有偿委托，赔偿范围包括对方直接损失及合同履行后可以获得的利益，不能把毛报酬与净利益混同。",
      "解除基于不可归责于解除方的事由时，适用赔偿例外。要结合具体原因判断，不能仅因临近办事期限就忽略突发急病等事实，也不能把无偿理解为所有情形都不赔。",
    ],
    example: {
      title: "参展委托的临时取消",
      facts:
        "本案为原创教学虚构。周亭与程溪签订有偿委托合同，请程溪代办参展报名、资料递交和现场联络。程溪已经按约开始办理，进度正常，展会也将照常举行。周亭临时决定改去另一项活动，通知程溪不再继续委托。双方已核对：这次取消直接产生无法退回的车辆取消费400元；若合同完成，程溪扣除全部履行成本后可得净收益1600元，二者不重复。周亭认为自己随时能解除，所以这两项都不用赔。",
      analysis:
        "周亭可以解除委托，但应赔偿程溪的400元直接损失和1600元可得净利益。随时解除不等于一律免责；本案只是周亭自行改变行程，合同本可正常履行。对于有偿委托，这种解除造成的直接损失和合同履行后可得利益均在赔偿范围内，两项也没有重复计算。",
    },
    pitfall:
      "把随时解除、无偿帮忙或临近截止，分别当成一律免责或一律赔偿的公式。",
    recall: {
      prompt: "解除委托时，有偿、无偿和不可归责事由怎样影响赔偿？",
      reference:
        "双方可随时解除；可归责的解除中，无偿限时间不当的直接损失，有偿还包括履行可得利益；不可归责事由另有例外。",
    },
    sources: ["civil-work-mandate-termination933"],
    exercises: [
      {
        caseId: "civil-work-mandate-case-termination-paid",
        relatedTopicIds: ["civil-mandate-termination"],
        facts:
          "本案为原创教学虚构。周亭与程溪签订有偿委托合同，请程溪代办参展报名、资料递交和现场联络。程溪已经按约开始办理，进度正常，展会也将照常举行。周亭临时决定改去另一项活动，通知程溪不再继续委托。双方已核对：这次取消直接产生无法退回的车辆取消费400元；若合同完成，程溪扣除全部履行成本后可得净收益1600元，二者不重复。周亭认为自己随时能解除，所以这两项都不用赔。",
        hint: "结合本案事实，说明结论和关键理由。",
        sources: ["civil-work-mandate-termination933"],
        id: "civil-work-mandate-termination-paid-choice",
        kind: "objective",
        choiceMode: "single",
        title: "参展委托的临时取消",
        prompt: "周亭能否解除委托？对题述两项损失应怎样处理？",
        options: [
          {
            id: "a",
            text: "不能解除，只有程溪同意才允许退出有偿委托。",
            explanation:
              "第933条允许委托人或受托人随时解除，赔偿责任与解除权须分别判断。",
          },
          {
            id: "b",
            text: "可以解除，而且随时解除就当然不需赔偿任何损失。",
            explanation: "随时解除并不当然免除因可归责解除产生的损失赔偿。",
          },
          {
            id: "c",
            text: "可以解除，但应赔偿400元直接损失和1600元可得净利益。",
            explanation:
              "本案有偿委托因委托人自行改主意解除，两项损失明确且不重复。",
          },
          {
            id: "d",
            text: "可以解除，但只赔400元，任何委托都不赔履行后利益。",
            explanation:
              "有偿委托的第933条赔偿范围包括合同履行后可以获得的利益。",
          },
        ],
        answer: "c",
        reference:
          "选C。周亭可以解除委托，但应赔偿程溪的400元直接损失和1600元可得净利益。随时解除不等于一律免责；本案只是周亭自行改变行程，合同本可正常履行。对于有偿委托，这种解除造成的直接损失和合同履行后可得利益均在赔偿范围内，两项也没有重复计算。",
      },
      {
        caseId: "civil-work-mandate-case-termination-paid",
        relatedTopicIds: ["civil-mandate-termination"],
        facts:
          "本案为原创教学虚构。周亭与程溪签订有偿委托合同，请程溪代办参展报名、资料递交和现场联络。程溪已经按约开始办理，进度正常，展会也将照常举行。周亭临时决定改去另一项活动，通知程溪不再继续委托。双方已核对：这次取消直接产生无法退回的车辆取消费400元；若合同完成，程溪扣除全部履行成本后可得净收益1600元，二者不重复。周亭认为自己随时能解除，所以这两项都不用赔。",
        hint: "结合本案事实，说明结论和关键理由。",
        sources: ["civil-work-mandate-termination933"],
        id: "civil-work-mandate-termination-paid-written",
        kind: "subjective",
        title: "行程改变后的结算",
        prompt:
          "周亭能否解除委托？对题述两项损失应怎样处理？请完整写出判断及其事实理由。",
        answer: "",
        reference:
          "周亭可以解除委托，但应赔偿程溪的400元直接损失和1600元可得净利益。随时解除不等于一律免责；本案只是周亭自行改变行程，合同本可正常履行。对于有偿委托，这种解除造成的直接损失和合同履行后可得利益均在赔偿范围内，两项也没有重复计算。",
        criteria: [
          {
            id: "mandate-end933-right",
            label: "随时解除与赔偿分别判断",
            meaning:
              "说明周亭可以解除委托，但不能据此当然免除因这次临时改变行程造成的赔偿责任。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不要求程溪同意，也不把随时解除写成一律无赔偿。",
          },
          {
            id: "mandate-end933-paid-loss",
            label: "有偿委托的两类损失",
            meaning:
              "联系自行改主意而无外部阻碍的有偿委托，说明应赔400元直接损失和1600元履行后可得净利益。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "接受两类损失含义相同的表达，不要求另报合计或重算履行成本。",
          },
        ],
      },
      {
        caseId: "civil-work-mandate-case-termination-sudden-illness",
        relatedTopicIds: ["civil-mandate-termination"],
        facts:
          "本案为原创教学虚构。朱铭请朋友肖延无偿代为递交展会材料，截止时间是周五16时，材料早已备齐。周五上午，此前没有相关症状的肖延突发急性阑尾炎，被急救送医并立即手术，医生要求住院七天。肖延随即通知朱铭自己无法继续办理，朱铭收到通知后临时请人接办。朱铭要求肖延赔偿临时接办增加的600元直接支出，并赔偿自己主张的参展预期收益。",
        hint: "结合本案事实，说明结论和关键理由。",
        sources: ["civil-work-mandate-termination933"],
        id: "civil-work-mandate-termination-sudden-illness-choice",
        kind: "objective",
        choiceMode: "single",
        title: "截止日前的住院通知",
        prompt:
          "肖延能否解除委托？仅因这次解除，是否应赔偿朱铭主张的上述两项损失？",
        options: [
          {
            id: "a",
            text: "可以解除，本案因突发急病住院而无法继续，适用不可归责事由的例外，不应仅因这次解除赔偿上述损失。",
            explanation:
              "突然急救手术并及时通知的事实支持不可归责例外；不能机械地因临近截止就认定须赔。",
          },
          {
            id: "b",
            text: "不能解除，无偿受托人一经答应就必须亲自办完。",
            explanation: "无偿委托也可以随时解除。",
          },
          {
            id: "c",
            text: "可以解除，但无论病情如何都必须赔600元及全部预期收益。",
            explanation:
              "忽略不可归责例外，也将无偿委托的损失范围等同于有偿委托。",
          },
          {
            id: "d",
            text: "可以解除，而且只要无偿，任何时候任何原因解除都不需赔偿。",
            explanation:
              "无偿不等于一律免责，解除时间不当造成直接损失时仍可能承担赔偿。",
          },
        ],
        answer: "a",
        reference:
          "选A。肖延可以解除，本案不应仅因这次解除赔偿朱铭所述两项损失。此前无症状却突然急救手术并须住院，是不可归责于肖延的事由，且已立即通知，适用解除赔偿的例外。无偿委托通常也只赔因解除时间不当造成的直接损失，并不按有偿委托规则一概赔偿履行后可得利益。",
      },
      {
        caseId: "civil-work-mandate-case-termination-sudden-illness",
        relatedTopicIds: ["civil-mandate-termination"],
        facts:
          "本案为原创教学虚构。朱铭请朋友肖延无偿代为递交展会材料，截止时间是周五16时，材料早已备齐。周五上午，此前没有相关症状的肖延突发急性阑尾炎，被急救送医并立即手术，医生要求住院七天。肖延随即通知朱铭自己无法继续办理，朱铭收到通知后临时请人接办。朱铭要求肖延赔偿临时接办增加的600元直接支出，并赔偿自己主张的参展预期收益。",
        hint: "结合本案事实，说明结论和关键理由。",
        sources: ["civil-work-mandate-termination933"],
        id: "civil-work-mandate-termination-sudden-illness-written",
        kind: "subjective",
        title: "临时接办费用的请求",
        prompt:
          "肖延能否解除委托？仅因这次解除，是否应赔偿朱铭主张的上述两项损失？请完整写出判断及其事实理由。",
        answer: "",
        reference:
          "肖延可以解除，本案不应仅因这次解除赔偿朱铭所述两项损失。此前无症状却突然急救手术并须住院，是不可归责于肖延的事由，且已立即通知，适用解除赔偿的例外。无偿委托通常也只赔因解除时间不当造成的直接损失，并不按有偿委托规则一概赔偿履行后可得利益。",
        criteria: [
          {
            id: "mandate-end933-free-right",
            label: "无偿委托也可解除",
            meaning:
              "说明肖延可以解除，无偿答应并不使其必须在突发住院后继续亲自办理。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "不要求将暂时住院认定为丧失民事行为能力或适用死亡终止规则。",
          },
          {
            id: "mandate-end933-unattributable",
            label: "不可归责例外与无偿范围",
            meaning:
              "联系突然急救手术、须住院并立即通知，说明本次解除适用不可归责例外，不应赔题述损失；不能把无偿委托按有偿委托一概赔预期利益。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "不能只以无偿认定一概免责；不要求计算预期收益或另行评价医疗责任。",
          },
        ],
      },
    ],
  },
];

export const civilWorkMandateChapters = [
  {
    id: "CIV-WORK-PERFORMANCE",
    title: "承揽：工作安排与材料",
    section: "民法",
    topicIds: ["civil-work-third-party", "civil-work-materials"],
  },
  {
    id: "CIV-WORK-RESULTS",
    title: "承揽：成果质量与解除",
    section: "民法",
    topicIds: ["civil-work-quality", "civil-work-termination"],
  },
  {
    id: "CIV-MANDATE-PERFORMANCE",
    section: "民法",
    title: "委托事务的处理",
    topicIds: ["civil-mandate-instructions", "civil-mandate-subdelegation"],
  },
  {
    id: "CIV-MANDATE-SETTLEMENT",
    section: "民法",
    title: "委托费用与合同解除",
    topicIds: ["civil-mandate-expenses", "civil-mandate-termination"],
  },
];

export const civilWorkMandateExercises = civilWorkMandateTopics.flatMap(
  (topic) => topic.exercises,
);
export const civilWorkMandateContentPack = {
  revision: civilWorkMandateRevision,
  snapshot: {
    topics: civilWorkMandateTopics,
    sources: civilWorkMandateSources,
  },
};
export const civilWorkMandateDefaultQueues = {
  objective: civilWorkMandateExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilWorkMandateExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilWorkMandateQuestion(id: string) {
  const question = civilWorkMandateExercises.find((q) => q.id === id);
  return question ? structuredClone(question) : undefined;
}
export function civilWorkMandateTopicForQuestion(id: string) {
  return civilWorkMandateTopics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function civilWorkMandateSameCaseQuestions(id: string) {
  const question = civilWorkMandateQuestion(id);
  return question
    ? structuredClone(
        civilWorkMandateExercises.filter((q) => q.caseId === question.caseId),
      )
    : [];
}
export function civilWorkMandateChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = civilWorkMandateChapters.find((c) => c.id === chapterId);
  return chapter
    ? civilWorkMandateTopics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}
