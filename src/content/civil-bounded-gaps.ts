import type { ContentSources, FaultTopic } from "./fault-unit";

// Original fictional cases. Paired forms share facts, not independent outcomes.
export const civilBoundedGapsRevision = "civil-bounded-gaps-2026-10-27.v1";

export const civilBoundedGapsSources: ContentSources = {
  "gaps-guardianship": {
    title: "《民法典》第31、34—37条",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "限定争议指定、监护人严重失职的撤销与抚养义务，不编刑事或家事诉讼规则。 2026-10-27直接核读官方文本相关条文；民法典2021-01-01施行。原创教学虚构，不来自机构题库。",
  },
  "gaps-voidable": {
    title: "《民法典》第147、151—152条",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "只补重大误解与显失公平。欺诈、胁迫复用旧题，不另设期间专项。 2026-10-27直接核读官方文本相关条文；民法典2021-01-01施行。原创教学虚构，不来自机构题库。",
  },
  "gaps-general-interpretation": {
    title: "民法典总则编司法解释第19条",
    url: "https://www.court.gov.cn/fabu/xiangqing/347221.html",
    note: "法释〔2022〕6号，2022-03-01施行；实际阅读第19—24条及监护、宣告相关条文。重大误解须是影响意思表示的错误，排除正常商业风险。 2026-10-27直接核读官方文本相关条文；民法典2021-01-01施行。原创教学虚构，不来自机构题库。",
  },
  "gaps-declarations": {
    title: "《民法典》第40—43、46—49条",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "区分申请条件、财产代管和死亡后果；事故无法生存须有关机关证明，不编公告程序。 2026-10-27直接核读官方文本相关条文；民法典2021-01-01施行。原创教学虚构，不来自机构题库。",
  },
  "gaps-condition-term": {
    title: "《民法典》第158—160条",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "限定不当阻止生效条件与明确生效期限；不混入可任意撤销赠与、行政审批等特别规则。 2026-10-27直接核读官方文本相关条文；民法典2021-01-01施行。原创教学虚构，不来自机构题库。",
  },
  "gaps-organizations": {
    title: "《民法典》第60—61、102—104条",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "普通采购的法定代表人与独立责任；依法登记个人独资企业不足清偿时的无限责任。保留特别法例外，不扩公司担保和股东出资责任。 2026-10-27直接核读官方文本相关条文；民法典2021-01-01施行。原创教学虚构，不来自机构题库。",
  },
  "gaps-deposit": {
    title: "《民法典》第570—573条",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "区分提存条件、实际交付成立与范围内视为交付；不指定未经核实的地方受理机关或公证程序。 2026-10-27直接核读官方文本相关条文；民法典2021-01-01施行。原创教学虚构，不来自机构题库。",
  },
  "gaps-energy": {
    title: "《民法典》第648、651、654、656条",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "供电质量损失及欠费中止的催告、合理期限和国家程序要求；水气热参照，不虚构统一停供天数。 2026-10-27直接核读官方文本相关条文；民法典2021-01-01施行。原创教学虚构，不来自机构题库。",
  },
  "gaps-condominium": {
    title: "《民法典》第271、278、282条",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "共有部分经营净收入归属及改变共有部分用途的双重参与、同意比例。题设每户一人且面积相等，避免混淆票数和面积。 2026-10-27直接核读官方文本相关条文；民法典2021-01-01施行。原创教学虚构，不来自机构题库。",
  },
  "civil-gap-adoption-code": {
    title: "《民法典》第1093—1107条：收养登记与必要同意",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-27定向核读。实际核读1093—1107条，拟题只用1104、1105并明确其余法定条件。收养自民政登记成立，协议、公证、实际照料不能代替；八周岁以上须被收养人本人同意。年龄按1104不是旧法十周岁；不展开医学资格、涉外或解除。",
  },
  "civil-gap-estate-code": {
    title: "《民法典》第1145—1149条：遗产管理",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-27定向核读。实际核读1145—1149条。遗嘱执行人为管理人；无执行人才依继承人推选、共同担任等规则处理，争议可申请法院指定。职责包括清单、报告、保全遗产、债权债务等；故意或重大过失造成相应损害须担责，免费不免此责；不编统一报酬比例。",
  },
  "civil-gap-divorce-code": {
    title: "《民法典》第1087—1092条：离婚财产、补偿与隐藏财产",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-27定向核读。实际核读1087—1092条。1088补偿以较多家庭义务为基础，不限夫妻分别财产制，不与1090困难帮助或1091过错损害赔偿混同。1092隐藏共同财产可少分不分，但不能声称每案必然全部没收。",
  },
  "civil-gap-divorce-interpretation": {
    title: "《婚姻家庭编解释（二）》第21—22条",
    url: "https://www.huichang.gov.cn/hcxxxgk/hc2685/202503/81351bb08a084106a6fad2713afc5461.shtml",
    note: "2026-10-27定向核读。法释〔2025〕1号，2025-02-01施行。改用会昌县政府县司法局独立全文页，实际核读法释编号及第20—23条，重点第21条补偿数额考量时间、精力、对双方影响、给付能力、当地收入；第22生活困难帮助另项。不据此虚构固定家务年薪、统一补偿比例或金额。",
  },
  "civil-gap-network-code": {
    title: "《民法典》第1194—1197条：网络服务者的通知与反通知",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-27定向核读。实际核读1194—1197条。1195通知需初步证据及真实身份，及时转送并按证据与服务类型采取措施；不及时措施，对扩大损害与用户连带。1196反通知需不侵权初步证据及真实身份；转送到达权利人后合理期限未收到已投诉/起诉通知才及时终止措施。不用电商法十五日替代本条合理期限。",
  },
  "civil-gap-network-interpretation": {
    title: "《利用信息网络侵害人身权益规定》2020修订决定第二十六项",
    url: "https://www.court.gov.cn/fabu/xiangqing/282621.html",
    note: "2026-10-27定向核读。法释〔2020〕17号，2021-01-01施行。实际核读该决定版本头和第二十六项第1—9项：原第6条修订为按服务类型性质、有效通知形式准确度、权益类型程度综合判断及时性；原第9条改列知道或应当知道因素；条文顺序同时调整。未沿用2014原文中的旧侵权责任法、被删有效通知条款或旧条号。拟题不设统一处理小时。",
  },
  "civil-gap-energy-business-rules": {
    title: "《供电营业规则》第69—72条（2024年第14号令）",
    url: "https://www.hengqin.gov.cn/lab/flfg/bmgz/content/post_3731363.html",
    note: "2026-10-27定向核读。国家发展改革委2024-02-08第14号令，2024-06-01施行；先核发改委发布页与新版正文，后用横琴官方完整转载核读69—72条。69(二)为欠费超过30日且催交合理期限仍未交；70为通常停止供电通知程序：停电前3—7日送达通知、前30分钟再通知；71计划检修提前7日与临时检修等有专门通知规定。旧版68条不是本版条号；不为水气热编统一天数。",
  },
  "civil-gap-energy-regulation": {
    title: "《电力供应与使用条例》第27—28、39条（2019修订）",
    url: "https://xzfg.moj.gov.cn/front/law/detail?LawID=461",
    note: "2026-10-27定向核读。司法部国家行政法规库，沿革列1996发布、2016及2019修订。实际核读版本头和27—28、39条。39条欠费逾期超过30日，经催交仍未交付，可按国家程序停止供电；不是一逾期即断电。",
  },
};

export const civilBoundedGapsTopics: FaultTopic[] = [
  {
    id: "civil-guardianship-selection-duty",
    title: "监护人的确定与职责",
    headline: "有争议可直接请法院指定；严重失职可撤销，抚养义务仍在。",
    goal: "外祖母能否直接向法院申请指定监护人？法院应按什么原则决定？",
    prerequisite: "知道自然人与组织可以依法享有权利、承担义务。",
    minutes: "约8分钟",
    paragraphs: [
      "监护人有争议时，可以直接向法院申请指定，不必先取得居委会的指定决定。法院在有资格的人中，尊重被监护人真实意愿，按最有利于其利益的原则决定。",
      "监护人要保护被监护人的人身和财产。严重伤害、遗弃照料等达到法定情形的，可由法院依申请撤销资格并另作安排。",
      "父母被撤销监护资格后，仍须依法承担抚养费。撤销的是监护资格，不是把对子女的抚养义务一并免除。",
    ],
    example: {
      title: "监护人有争议能否直接找法院",
      facts:
        "2026年9月，13岁的许禾父母均已去世。祖父母、外祖父母均健在并有监护能力，双方对由谁担任监护人争执不下。许禾一直随外祖母生活，学校、就医安排稳定，明确希望继续与外祖母生活。祖父收入更高，认为应由自己担任。外祖母拟直接向法院申请指定，祖父称必须先由居委会指定，法院只能照收入高低决定。",
      analysis:
        "可以直接申请。法院应在有监护资格的人中，尊重许禾的真实意愿，选择最有利于他的人。稳定照料、上学就医和本人的意愿都要考虑，不能只比收入。",
    },
    pitfall: "只比谁有钱，或以监护资格撤销为由拒付抚养费。",
    recall: {
      prompt: "本组最容易混淆的两种情况，区别在哪里？",
      reference: "有争议可直接请法院指定；严重失职可撤销，抚养义务仍在。",
    },
    sources: ["gaps-guardianship"],
    exercises: [
      {
        caseId: "civil-bounded-gaps-guardian-court-selection",
        relatedTopicIds: ["civil-guardianship-selection-duty"],
        facts:
          "2026年9月，13岁的许禾父母均已去世。祖父母、外祖父母均健在并有监护能力，双方对由谁担任监护人争执不下。许禾一直随外祖母生活，学校、就医安排稳定，明确希望继续与外祖母生活。祖父收入更高，认为应由自己担任。外祖母拟直接向法院申请指定，祖父称必须先由居委会指定，法院只能照收入高低决定。",
        hint: "先说结论，再结合案情说明理由。",
        reference:
          "可以直接申请。法院应在有监护资格的人中，尊重许禾的真实意愿，选择最有利于他的人。稳定照料、上学就医和本人的意愿都要考虑，不能只比收入。",
        sources: ["gaps-guardianship"],
        id: "civil-bounded-gaps-guardian-court-selection-choice",
        kind: "objective",
        choiceMode: "single",
        title: "监护人有争议能否直接找法院（单选）",
        prompt: "外祖母能否直接向法院申请指定监护人？法院应按什么原则决定？",
        options: [
          {
            id: "a",
            text: "可以直接申请；应结合许禾意愿和照料情况，按最有利于其利益的原则指定。",
            explanation:
              "正确。可以直接申请。法院应在有监护资格的人中，尊重许禾的真实意愿，选择最有利于他的人。稳定照料、上学就医和本人的意愿都要考虑，不能只比收入。",
          },
          {
            id: "b",
            text: "不可以，法院只能在居委会先指定后才受理。",
            explanation: "法律允许有关当事人直接申请法院指定。",
          },
          {
            id: "c",
            text: "可以，但祖父收入更高，依法必须指定祖父。",
            explanation: "收入只是可能考量的情况，不是唯一标准。",
          },
          {
            id: "d",
            text: "可以，但13岁孩子的意愿在任何情况下都不能考虑。",
            explanation: "指定时应尊重被监护人的真实意愿。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-bounded-gaps-guardian-court-selection",
        relatedTopicIds: ["civil-guardianship-selection-duty"],
        facts:
          "2026年9月，13岁的许禾父母均已去世。祖父母、外祖父母均健在并有监护能力，双方对由谁担任监护人争执不下。许禾一直随外祖母生活，学校、就医安排稳定，明确希望继续与外祖母生活。祖父收入更高，认为应由自己担任。外祖母拟直接向法院申请指定，祖父称必须先由居委会指定，法院只能照收入高低决定。",
        hint: "先说结论，再结合案情说明理由。",
        reference:
          "可以直接申请。法院应在有监护资格的人中，尊重许禾的真实意愿，选择最有利于他的人。稳定照料、上学就医和本人的意愿都要考虑，不能只比收入。",
        sources: ["gaps-guardianship"],
        id: "civil-bounded-gaps-guardian-court-selection-written",
        kind: "subjective",
        title: "监护人有争议能否直接找法院（自由作答）",
        prompt:
          "外祖母能否直接向法院申请指定监护人？法院应按什么原则决定？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-bounded-gaps-guardian-court-selection-1",
            label: "可直接申请指定",
            meaning: "说明外祖母可以直接申请法院指定，不必先走居委会指定。",
            acceptable:
              "认可法律含义相同的自然表达，不要求固定措辞或背诵条号。",
            boundary: "不要求展开具体诉讼程序。",
          },
          {
            id: "civil-bounded-gaps-guardian-court-selection-2",
            label: "按被监护人利益决定",
            meaning: "联系稳定照料及许禾意愿，说明不能只以收入决定。",
            acceptable:
              "认可法律含义相同的自然表达，不要求固定措辞或背诵条号。",
            boundary: "不要求断言法院必然指定某一人。",
          },
        ],
      },
      {
        caseId: "civil-bounded-gaps-guardian-revocation-support",
        relatedTopicIds: ["civil-guardianship-selection-duty"],
        facts:
          "2026年9月，9岁程安由父亲监护。父亲长期将他独自留在家中，连续数日不提供饭食，孩子因脱水住院；学校多次联系父亲，他仍拒绝安排照料。民政部门申请撤销其监护资格。法院查清这些事实，依法撤销父亲的监护资格并指定有能力的外祖母监护。父亲随后称既然已不再当监护人，就不再支付任何抚养费。",
        hint: "先说结论，再结合案情说明理由。",
        reference:
          "撤销有依据。父亲长期拒绝照料，已使孩子陷入危困。撤销后他仍是依法负有抚养义务的父亲，不能因此拒付抚养费。",
        sources: ["gaps-guardianship"],
        id: "civil-bounded-gaps-guardian-revocation-support-choice",
        kind: "objective",
        choiceMode: "single",
        title: "撤销监护资格后还要付抚养费吗（单选）",
        prompt: "本案撤销监护资格有无依据？父亲能否因此不付抚养费？",
        options: [
          {
            id: "a",
            text: "撤销没有依据，只有父亲主动同意才可撤销。",
            explanation:
              "法定严重失职情形可由法院依申请撤销，不以其同意为条件。",
          },
          {
            id: "b",
            text: "撤销有依据，父亲的抚养义务也随之全部消灭。",
            explanation: "监护资格与依法负担抚养费的义务要分开。",
          },
          {
            id: "c",
            text: "撤销有依据；父亲仍须依法承担抚养费。",
            explanation:
              "正确。撤销有依据。父亲长期拒绝照料，已使孩子陷入危困。撤销后他仍是依法负有抚养义务的父亲，不能因此拒付抚养费。",
          },
          {
            id: "d",
            text: "撤销有依据，外祖母先替父亲承担一年后，父亲才恢复付款义务。",
            explanation: "不存在本题所称一年的法定免责期。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-bounded-gaps-guardian-revocation-support",
        relatedTopicIds: ["civil-guardianship-selection-duty"],
        facts:
          "2026年9月，9岁程安由父亲监护。父亲长期将他独自留在家中，连续数日不提供饭食，孩子因脱水住院；学校多次联系父亲，他仍拒绝安排照料。民政部门申请撤销其监护资格。法院查清这些事实，依法撤销父亲的监护资格并指定有能力的外祖母监护。父亲随后称既然已不再当监护人，就不再支付任何抚养费。",
        hint: "先说结论，再结合案情说明理由。",
        reference:
          "撤销有依据。父亲长期拒绝照料，已使孩子陷入危困。撤销后他仍是依法负有抚养义务的父亲，不能因此拒付抚养费。",
        sources: ["gaps-guardianship"],
        id: "civil-bounded-gaps-guardian-revocation-support-written",
        kind: "subjective",
        title: "撤销监护资格后还要付抚养费吗（自由作答）",
        prompt:
          "本案撤销监护资格有无依据？父亲能否因此不付抚养费？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-bounded-gaps-guardian-revocation-support-1",
            label: "识别严重失职",
            meaning: "联系拒绝照料、脱水住院和持续危险说明符合撤销条件。",
            acceptable:
              "认可法律含义相同的自然表达，不要求固定措辞或背诵条号。",
            boundary: "不要求评价父亲的刑事责任。",
          },
          {
            id: "civil-bounded-gaps-guardian-revocation-support-2",
            label: "抚养义务继续",
            meaning: "说明撤销监护资格不免除父亲依法负担抚养费。",
            acceptable:
              "认可法律含义相同的自然表达，不要求固定措辞或背诵条号。",
            boundary: "不要求计算抚养费金额。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-mistake-unfairness",
    title: "重大误解与显失公平",
    headline: "关键事实认错、被利用危困，都可能请求撤销；不是只要后悔就能撤。",
    goal: "鲜禾能否以重大误解请求撤销本次购买？",
    prerequisite: "知道自然人与组织可以依法享有权利、承担义务。",
    minutes: "约8分钟",
    paragraphs: [
      "对交易性质、标的规格等重要内容产生错误认识，并因此作出本不会作出的交易，可以请求法院或仲裁机构撤销。一般经营风险和事后觉得不划算，要与此区分。",
      "显失公平不仅要看价格差距，还要看对方是否利用危困、缺乏判断能力等情形，导致订约时权利义务明显失衡。",
      "这两类行为可以依法请求撤销，不是订约时就当然无效。行使权利还受法定期间限制；本组两案均及时提出请求。",
    ],
    example: {
      title: "设备关键参数看错能否撤销",
      facts:
        "2026年10月，鲜禾合作社采购净水设备，日产水量是其确定采购的核心条件。负责人误把一台设备的“每日600升”看成“每日6000升”，据此购买；以600升产能无法满足合作社需求，若知道真实参数不会购买。卖方未诱导该错误，也不知道负责人看错。不存在由买方承担这种误认风险的交易习惯。负责人两日后发现，立即向法院申请撤销。",
      analysis:
        "可以。鲜禾把决定是否购买的日产水量看错了，真实参数下不会购买，属于对标的重要规格的重大误解。卖方没有欺骗，不妨碍鲜禾依法请求撤销。",
    },
    pitfall: "只凭价格低就认定显失公平，或把可撤销说成自动无效。",
    recall: {
      prompt: "本组最容易混淆的两种情况，区别在哪里？",
      reference:
        "关键事实认错、被利用危困，都可能请求撤销；不是只要后悔就能撤。",
    },
    sources: ["gaps-voidable", "gaps-general-interpretation"],
    exercises: [
      {
        caseId: "civil-bounded-gaps-mistake-output-specification",
        relatedTopicIds: ["civil-mistake-unfairness"],
        facts:
          "2026年10月，鲜禾合作社采购净水设备，日产水量是其确定采购的核心条件。负责人误把一台设备的“每日600升”看成“每日6000升”，据此购买；以600升产能无法满足合作社需求，若知道真实参数不会购买。卖方未诱导该错误，也不知道负责人看错。不存在由买方承担这种误认风险的交易习惯。负责人两日后发现，立即向法院申请撤销。",
        hint: "先说结论，再结合案情说明理由。",
        reference:
          "可以。鲜禾把决定是否购买的日产水量看错了，真实参数下不会购买，属于对标的重要规格的重大误解。卖方没有欺骗，不妨碍鲜禾依法请求撤销。",
        sources: ["gaps-voidable", "gaps-general-interpretation"],
        id: "civil-bounded-gaps-mistake-output-specification-choice",
        kind: "objective",
        choiceMode: "single",
        title: "设备关键参数看错能否撤销（单选）",
        prompt: "鲜禾能否以重大误解请求撤销本次购买？",
        options: [
          {
            id: "a",
            text: "不可以，只有卖方实施欺诈才有撤销的可能。",
            explanation: "重大误解与欺诈是不同的撤销事由。",
          },
          {
            id: "b",
            text: "可以，关键产能的误认影响了购买决定，可依法请求撤销。",
            explanation:
              "正确。可以。鲜禾把决定是否购买的日产水量看错了，真实参数下不会购买，属于对标的重要规格的重大误解。卖方没有欺骗，不妨碍鲜禾依法请求撤销。",
          },
          {
            id: "c",
            text: "可以，所以合同无需法院处理就已经自动无效。",
            explanation: "重大误解是可撤销事由，不是自动无效。",
          },
          {
            id: "d",
            text: "不可以，所有由自己看错参数造成的错误都只能自行承担。",
            explanation: "自身误认不当然排除重大误解，但须满足重要性等条件。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-bounded-gaps-mistake-output-specification",
        relatedTopicIds: ["civil-mistake-unfairness"],
        facts:
          "2026年10月，鲜禾合作社采购净水设备，日产水量是其确定采购的核心条件。负责人误把一台设备的“每日600升”看成“每日6000升”，据此购买；以600升产能无法满足合作社需求，若知道真实参数不会购买。卖方未诱导该错误，也不知道负责人看错。不存在由买方承担这种误认风险的交易习惯。负责人两日后发现，立即向法院申请撤销。",
        hint: "先说结论，再结合案情说明理由。",
        reference:
          "可以。鲜禾把决定是否购买的日产水量看错了，真实参数下不会购买，属于对标的重要规格的重大误解。卖方没有欺骗，不妨碍鲜禾依法请求撤销。",
        sources: ["gaps-voidable", "gaps-general-interpretation"],
        id: "civil-bounded-gaps-mistake-output-specification-written",
        kind: "subjective",
        title: "设备关键参数看错能否撤销（自由作答）",
        prompt: "鲜禾能否以重大误解请求撤销本次购买？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-bounded-gaps-mistake-output-specification-1",
            label: "关键规格影响交易决定",
            meaning: "联系600与6000升的差别及实际需求，说明不是单纯后悔。",
            acceptable:
              "认可法律含义相同的自然表达，不要求固定措辞或背诵条号。",
            boundary: "不以卖方欺诈为必要前提，不讨论质量违约。",
          },
          {
            id: "civil-bounded-gaps-mistake-output-specification-2",
            label: "依法请求撤销",
            meaning: "认可重大误解下向法院请求撤销，而不是当然无效。",
            acceptable:
              "认可法律含义相同的自然表达，不要求固定措辞或背诵条号。",
            boundary: "原答无需复述具体天数；事实已是发现后两日。",
          },
        ],
      },
      {
        caseId: "civil-bounded-gaps-unfair-emergency-equipment",
        relatedTopicIds: ["civil-mistake-unfairness"],
        facts:
          "2026年10月，沈清为给父亲缴纳当天必须到账的手术押金，急需8万元。其一套设备已有近期评估和稳定成交记录，价值约60万元。买方梁越知道沈清当天来不及找其他买家或借款，提出只付8万元买断设备，并表示必须当晚签约付款。沈清为筹手术费接受。交易后一周，沈清向法院请求撤销；梁越称她签字时知道设备价值，便不可能撤销。",
        hint: "先说结论，再结合案情说明理由。",
        reference:
          "可以。梁越明知沈清急需手术费，利用她来不及另筹钱的处境，以8万元买下价值约60万元的设备，订约时明显失衡。沈清知道价格低并签了字，也不妨碍依法请求撤销。",
        sources: ["gaps-voidable"],
        id: "civil-bounded-gaps-unfair-emergency-equipment-choice",
        kind: "objective",
        choiceMode: "single",
        title: "利用急需用钱压价购买（单选）",
        prompt: "沈清能否以显失公平请求撤销？",
        options: [
          {
            id: "a",
            text: "不可以，只要卖方知道市场价并签字，任何压价都有效且不能撤销。",
            explanation: "知价和签字不排除利用危困形成显失公平。",
          },
          {
            id: "b",
            text: "可以，任何低于市场价的出售都当然属于显失公平。",
            explanation: "仍要考察利用危困等情形，不能只看低价。",
          },
          {
            id: "c",
            text: "不可以，只有梁越威胁伤害沈清才可撤销。",
            explanation: "本案不必满足胁迫条件；利用危困是另一种撤销依据。",
          },
          {
            id: "d",
            text: "可以，梁越利用急迫处境使交易成立时明显失衡。",
            explanation:
              "正确。可以。梁越明知沈清急需手术费，利用她来不及另筹钱的处境，以8万元买下价值约60万元的设备，订约时明显失衡。沈清知道价格低并签了字，也不妨碍依法请求撤销。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-bounded-gaps-unfair-emergency-equipment",
        relatedTopicIds: ["civil-mistake-unfairness"],
        facts:
          "2026年10月，沈清为给父亲缴纳当天必须到账的手术押金，急需8万元。其一套设备已有近期评估和稳定成交记录，价值约60万元。买方梁越知道沈清当天来不及找其他买家或借款，提出只付8万元买断设备，并表示必须当晚签约付款。沈清为筹手术费接受。交易后一周，沈清向法院请求撤销；梁越称她签字时知道设备价值，便不可能撤销。",
        hint: "先说结论，再结合案情说明理由。",
        reference:
          "可以。梁越明知沈清急需手术费，利用她来不及另筹钱的处境，以8万元买下价值约60万元的设备，订约时明显失衡。沈清知道价格低并签了字，也不妨碍依法请求撤销。",
        sources: ["gaps-voidable"],
        id: "civil-bounded-gaps-unfair-emergency-equipment-written",
        kind: "subjective",
        title: "利用急需用钱压价购买（自由作答）",
        prompt: "沈清能否以显失公平请求撤销？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-bounded-gaps-unfair-emergency-equipment-1",
            label: "利用危困而非单纯低价",
            meaning: "联系当天手术费、筹资困难及梁越知情压价说明。",
            acceptable:
              "认可法律含义相同的自然表达，不要求固定措辞或背诵条号。",
            boundary: "不得把任何低价交易一概判为显失公平。",
          },
          {
            id: "civil-bounded-gaps-unfair-emergency-equipment-2",
            label: "明显失衡可请求撤销",
            meaning: "联系8万与60万及订约时情形，认可请求撤销而非自动无效。",
            acceptable:
              "认可法律含义相同的自然表达，不要求固定措辞或背诵条号。",
            boundary: "不要求展开其他撤销事由或期间专项。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-disappearance-death",
    title: "宣告失踪与宣告死亡",
    headline:
      "失踪以代管财产为主，死亡宣告另有条件；不能把失联直接当成已经死亡。",
    goal: "能否申请宣告失踪？失踪宣告后能否据此分遗产，已到期债务如何支付？",
    prerequisite: "知道自然人与组织可以依法享有权利、承担义务。",
    minutes: "约8分钟",
    paragraphs: [
      "下落不明满二年，利害关系人可以申请宣告失踪。失踪人财产由代管人管理，应付债务从其财产中支付。",
      "一般下落不明满四年，或因意外事件下落不明满二年，可以申请宣告死亡。事故后有关机关证明不可能生存的，不受二年限制。",
      "宣告失踪不等于死亡，也不因此开始继承。符合法定条件时，可以直接申请宣告死亡，不必先宣告失踪。",
    ],
    example: {
      title: "失联三年后能否直接分遗产",
      facts:
        "方宁自2023年6月离家后再无音讯，家属持续寻找。至2026年10月仍找不到，既无发生意外事件的线索，也无实际死亡证据。其配偶拟向法院申请宣告失踪，并把方宁账户里的钱作为遗产分给自己和孩子。方宁还有一笔已经到期、凭据明确的借款。",
      analysis:
        "可以申请宣告失踪，方宁失联已超过二年。但失踪宣告不等于死亡，不能据此分遗产。已到期借款应由财产代管人从方宁财产中支付。",
    },
    pitfall: "把二年失踪当成当然死亡，或认为必须先失踪再死亡。",
    recall: {
      prompt: "本组最容易混淆的两种情况，区别在哪里？",
      reference:
        "失踪以代管财产为主，死亡宣告另有条件；不能把失联直接当成已经死亡。",
    },
    sources: ["gaps-declarations"],
    exercises: [
      {
        caseId: "civil-bounded-gaps-disappearance-property-custody",
        relatedTopicIds: ["civil-disappearance-death"],
        facts:
          "方宁自2023年6月离家后再无音讯，家属持续寻找。至2026年10月仍找不到，既无发生意外事件的线索，也无实际死亡证据。其配偶拟向法院申请宣告失踪，并把方宁账户里的钱作为遗产分给自己和孩子。方宁还有一笔已经到期、凭据明确的借款。",
        hint: "先说结论，再结合案情说明理由。",
        reference:
          "可以申请宣告失踪，方宁失联已超过二年。但失踪宣告不等于死亡，不能据此分遗产。已到期借款应由财产代管人从方宁财产中支付。",
        sources: ["gaps-declarations"],
        id: "civil-bounded-gaps-disappearance-property-custody-choice",
        kind: "objective",
        choiceMode: "single",
        title: "失联三年后能否直接分遗产（单选）",
        prompt:
          "能否申请宣告失踪？失踪宣告后能否据此分遗产，已到期债务如何支付？",
        options: [
          {
            id: "a",
            text: "可以申请失踪；财产应代管，不能据此继承，到期债务从方宁财产中支付。",
            explanation:
              "正确。可以申请宣告失踪，方宁失联已超过二年。但失踪宣告不等于死亡，不能据此分遗产。已到期借款应由财产代管人从方宁财产中支付。",
          },
          {
            id: "b",
            text: "不可以，宣告失踪一律要求下落不明满四年。",
            explanation: "二年是失踪条件，普通死亡宣告才有四年要求。",
          },
          {
            id: "c",
            text: "可以，失踪宣告作出后财产立即成为遗产。",
            explanation: "失踪不是死亡，不能因此开始继承。",
          },
          {
            id: "d",
            text: "可以，但债务只能由代管人用个人财产偿还。",
            explanation: "代管不是承接个人债务，款项从失踪人财产中支付。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-bounded-gaps-disappearance-property-custody",
        relatedTopicIds: ["civil-disappearance-death"],
        facts:
          "方宁自2023年6月离家后再无音讯，家属持续寻找。至2026年10月仍找不到，既无发生意外事件的线索，也无实际死亡证据。其配偶拟向法院申请宣告失踪，并把方宁账户里的钱作为遗产分给自己和孩子。方宁还有一笔已经到期、凭据明确的借款。",
        hint: "先说结论，再结合案情说明理由。",
        reference:
          "可以申请宣告失踪，方宁失联已超过二年。但失踪宣告不等于死亡，不能据此分遗产。已到期借款应由财产代管人从方宁财产中支付。",
        sources: ["gaps-declarations"],
        id: "civil-bounded-gaps-disappearance-property-custody-written",
        kind: "subjective",
        title: "失联三年后能否直接分遗产（自由作答）",
        prompt:
          "能否申请宣告失踪？失踪宣告后能否据此分遗产，已到期债务如何支付？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-bounded-gaps-disappearance-property-custody-1",
            label: "满足失踪申请条件",
            meaning: "联系自2023年失联已满二年，认可申请宣告失踪。",
            acceptable:
              "认可法律含义相同的自然表达，不要求固定措辞或背诵条号。",
            boundary: "无需计算具体公告期间。",
          },
          {
            id: "civil-bounded-gaps-disappearance-property-custody-2",
            label: "代管不同于继承",
            meaning: "说明不能因失踪而分遗产，债务由代管人从方宁财产中支付。",
            acceptable:
              "认可法律含义相同的自然表达，不要求固定措辞或背诵条号。",
            boundary: "不要求确定某位代管人一定被指定。",
          },
        ],
      },
      {
        caseId: "civil-bounded-gaps-death-accident-proof",
        relatedTopicIds: ["civil-disappearance-death"],
        facts:
          "2025年4月，季安乘船时遭遇沉船事故，此后下落不明。2026年10月，有关机关根据事故调查、所在舱位和救援结果出具证明，确认季安不可能生存。季安配偶直接向法院申请宣告死亡，其他亲属认为必须等到事故满二年，且先办理失踪宣告。",
        hint: "先说结论，再结合案情说明理由。",
        reference:
          "可以。季安因事故下落不明，已有有关机关证明不可能生存，申请不受二年限制，也不必先宣告失踪。证明本身不等于判决，仍须由法院依法作出死亡宣告。",
        sources: ["gaps-declarations"],
        id: "civil-bounded-gaps-death-accident-proof-choice",
        kind: "objective",
        choiceMode: "single",
        title: "事故后未满二年能否申请死亡宣告（单选）",
        prompt: "季安配偶现在能否直接申请宣告死亡？",
        options: [
          {
            id: "a",
            text: "不可以，所有事故失联都必须一律满二年。",
            explanation: "有关机关证明不可能生存的，是二年限制的法定例外。",
          },
          {
            id: "b",
            text: "不可以，任何死亡宣告都必须先经过失踪宣告。",
            explanation: "先宣告失踪不是宣告死亡的必经前提。",
          },
          {
            id: "c",
            text: "可以，有关机关的不可能生存证明使本案不受二年限制，且不用先宣告失踪。",
            explanation:
              "正确。可以。季安因事故下落不明，已有有关机关证明不可能生存，申请不受二年限制，也不必先宣告失踪。证明本身不等于判决，仍须由法院依法作出死亡宣告。",
          },
          {
            id: "d",
            text: "不必申请，证明一出具就自动等于法院死亡宣告。",
            explanation: "有关机关证明是申请依据，不代替法院的死亡宣告。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-bounded-gaps-death-accident-proof",
        relatedTopicIds: ["civil-disappearance-death"],
        facts:
          "2025年4月，季安乘船时遭遇沉船事故，此后下落不明。2026年10月，有关机关根据事故调查、所在舱位和救援结果出具证明，确认季安不可能生存。季安配偶直接向法院申请宣告死亡，其他亲属认为必须等到事故满二年，且先办理失踪宣告。",
        hint: "先说结论，再结合案情说明理由。",
        reference:
          "可以。季安因事故下落不明，已有有关机关证明不可能生存，申请不受二年限制，也不必先宣告失踪。证明本身不等于判决，仍须由法院依法作出死亡宣告。",
        sources: ["gaps-declarations"],
        id: "civil-bounded-gaps-death-accident-proof-written",
        kind: "subjective",
        title: "事故后未满二年能否申请死亡宣告（自由作答）",
        prompt: "季安配偶现在能否直接申请宣告死亡？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-bounded-gaps-death-accident-proof-1",
            label: "事故证明的期间例外",
            meaning: "联系机关证明不可能生存，认可未满二年也可申请。",
            acceptable:
              "认可法律含义相同的自然表达，不要求固定措辞或背诵条号。",
            boundary: "不能仅凭家属推测适用这一例外。",
          },
          {
            id: "civil-bounded-gaps-death-accident-proof-2",
            label: "可直接申请但须法院宣告",
            meaning: "说明无需先失踪，仍由法院依法宣告死亡。",
            acceptable:
              "认可法律含义相同的自然表达，不要求固定措辞或背诵条号。",
            boundary: "不要求回答本案未问的婚姻恢复和遗产返还。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-condition-term-effects",
    title: "法律行为的条件与期限",
    headline: "条件看是否发生，期限看何时到来；不能为自己得利而操纵条件。",
    goal: "远辰能否据此主张生效条件未成就、合同不生效？",
    prerequisite: "知道自然人与组织可以依法享有权利、承担义务。",
    minutes: "约8分钟",
    paragraphs: [
      "约定某个将来不确定的事实发生时生效，是附生效条件；条件成就时发生效力。",
      "一方为了自己的利益，不正当地阻止生效条件成就，法律视为条件已经成就。判断要结合实际干预行为，不能只看最终有没有拿到文件。",
      "约定一个确定日期开始生效，是附生效期限。期限到来前，不能只因已经签字就认为约定的效力已经开始。",
    ],
    example: {
      title: "为另找低价设备扣下报告",
      facts:
        "2026年9月，青禾与远辰签署设备租赁合同，约定青禾设备通过双方选定机构的性能测试并取得合格报告时合同生效。测试记录显示各指标均达约定标准。远辰为把同一批次租赁安排改给报价更低的另一方，私下要求检测员扣下报告，并删掉生成报告所需的合格记录。青禾没有其他违约。远辰随后仅以“没有合格报告”为由主张合同从未生效。",
      analysis:
        "不能。设备已达标，远辰为了自己获利，故意扣报告、删记录来阻止条件成就。法律视为条件已经成就，远辰不能用自己造成的障碍逃开合同。",
    },
    pitfall: "把人为阻止条件作为不生效理由，或把签约日等同于约定生效日。",
    recall: {
      prompt: "本组最容易混淆的两种情况，区别在哪里？",
      reference: "条件看是否发生，期限看何时到来；不能为自己得利而操纵条件。",
    },
    sources: ["gaps-condition-term"],
    exercises: [
      {
        caseId: "civil-bounded-gaps-condition-obstruct-test",
        relatedTopicIds: ["civil-condition-term-effects"],
        facts:
          "2026年9月，青禾与远辰签署设备租赁合同，约定青禾设备通过双方选定机构的性能测试并取得合格报告时合同生效。测试记录显示各指标均达约定标准。远辰为把同一批次租赁安排改给报价更低的另一方，私下要求检测员扣下报告，并删掉生成报告所需的合格记录。青禾没有其他违约。远辰随后仅以“没有合格报告”为由主张合同从未生效。",
        hint: "先说结论，再结合案情说明理由。",
        reference:
          "不能。设备已达标，远辰为了自己获利，故意扣报告、删记录来阻止条件成就。法律视为条件已经成就，远辰不能用自己造成的障碍逃开合同。",
        sources: ["gaps-condition-term"],
        id: "civil-bounded-gaps-condition-obstruct-test-choice",
        kind: "objective",
        choiceMode: "single",
        title: "为另找低价设备扣下报告（单选）",
        prompt: "远辰能否据此主张生效条件未成就、合同不生效？",
        options: [
          {
            id: "a",
            text: "能，只要没有纸面合格报告，任何情况下都绝不生效。",
            explanation: "不能忽略一方为自己利益不正当阻止条件的事实。",
          },
          {
            id: "b",
            text: "不能，为自己利益不正当阻止条件成就的，视为条件已经成就。",
            explanation:
              "正确。不能。设备已达标，远辰为了自己获利，故意扣报告、删记录来阻止条件成就。法律视为条件已经成就，远辰不能用自己造成的障碍逃开合同。",
          },
          {
            id: "c",
            text: "不能，因为所有附条件约定一经签字就自动作废。",
            explanation: "附条件约定可以有效；本案适用阻止条件的特别规则。",
          },
          {
            id: "d",
            text: "能，设备实际达标也只能由青禾承担当事人篡改记录的风险。",
            explanation: "本案障碍由远辰为了自己利益故意制造，不应由青禾承担。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-bounded-gaps-condition-obstruct-test",
        relatedTopicIds: ["civil-condition-term-effects"],
        facts:
          "2026年9月，青禾与远辰签署设备租赁合同，约定青禾设备通过双方选定机构的性能测试并取得合格报告时合同生效。测试记录显示各指标均达约定标准。远辰为把同一批次租赁安排改给报价更低的另一方，私下要求检测员扣下报告，并删掉生成报告所需的合格记录。青禾没有其他违约。远辰随后仅以“没有合格报告”为由主张合同从未生效。",
        hint: "先说结论，再结合案情说明理由。",
        reference:
          "不能。设备已达标，远辰为了自己获利，故意扣报告、删记录来阻止条件成就。法律视为条件已经成就，远辰不能用自己造成的障碍逃开合同。",
        sources: ["gaps-condition-term"],
        id: "civil-bounded-gaps-condition-obstruct-test-written",
        kind: "subjective",
        title: "为另找低价设备扣下报告（自由作答）",
        prompt:
          "远辰能否据此主张生效条件未成就、合同不生效？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-bounded-gaps-condition-obstruct-test-1",
            label: "识别不当阻止",
            meaning:
              "联系远辰为另作交易扣报告、删合格记录说明其为自己利益制造障碍。",
            acceptable:
              "认可法律含义相同的自然表达，不要求固定措辞或背诵条号。",
            boundary: "不要求讨论检测员另行承担何种责任。",
          },
          {
            id: "civil-bounded-gaps-condition-obstruct-test-2",
            label: "视为条件成就",
            meaning: "否定未生效主张，说明适用视为生效条件已经成就的规则。",
            acceptable:
              "认可法律含义相同的自然表达，不要求固定措辞或背诵条号。",
            boundary: "不是说所有附条件合同签字就生效。",
          },
        ],
      },
      {
        caseId: "civil-bounded-gaps-term-december-effective",
        relatedTopicIds: ["civil-condition-term-effects"],
        facts:
          "2026年10月20日，安禾与澄源签署一份普通设备租赁合同，双方在合同中明确写明“本合同自2026年12月1日起生效”，也没有另行约定提前履行。10月25日，澄源仅以双方已经签字为由，声称合同效力已从10月20日开始。双方对日期含义没有争议，合同没有其他效力问题。",
        hint: "先说结论，再结合案情说明理由。",
        reference:
          "没有。双方明确把12月1日约定为生效日，这是确定会到来的生效期限。签字使合同成立，约定的合同效力到12月1日才开始。",
        sources: ["gaps-condition-term"],
        id: "civil-bounded-gaps-term-december-effective-choice",
        kind: "objective",
        choiceMode: "single",
        title: "签字日与约定生效日不同（单选）",
        prompt:
          "该合同的效力是否已经从10月20日开始？约定属于附条件还是附期限？",
        options: [
          {
            id: "a",
            text: "已经开始，任何合同签字后都不得约定以后生效。",
            explanation: "当事人可以依法约定生效期限。",
          },
          {
            id: "b",
            text: "没有，但12月1日是不确定是否发生的生效条件。",
            explanation: "确定的日历日期属于期限，不是是否发生不确定的条件。",
          },
          {
            id: "c",
            text: "已经开始，写明生效日期只能解释为设备交付日期。",
            explanation: "题设明确约定合同生效，不存在把它改释为交付日的依据。",
          },
          {
            id: "d",
            text: "没有，这是附生效期限，约定的合同效力从12月1日开始。",
            explanation:
              "正确。没有。双方明确把12月1日约定为生效日，这是确定会到来的生效期限。签字使合同成立，约定的合同效力到12月1日才开始。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-bounded-gaps-term-december-effective",
        relatedTopicIds: ["civil-condition-term-effects"],
        facts:
          "2026年10月20日，安禾与澄源签署一份普通设备租赁合同，双方在合同中明确写明“本合同自2026年12月1日起生效”，也没有另行约定提前履行。10月25日，澄源仅以双方已经签字为由，声称合同效力已从10月20日开始。双方对日期含义没有争议，合同没有其他效力问题。",
        hint: "先说结论，再结合案情说明理由。",
        reference:
          "没有。双方明确把12月1日约定为生效日，这是确定会到来的生效期限。签字使合同成立，约定的合同效力到12月1日才开始。",
        sources: ["gaps-condition-term"],
        id: "civil-bounded-gaps-term-december-effective-written",
        kind: "subjective",
        title: "签字日与约定生效日不同（自由作答）",
        prompt:
          "该合同的效力是否已经从10月20日开始？约定属于附条件还是附期限？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-bounded-gaps-term-december-effective-1",
            label: "生效期限不同于条件",
            meaning: "说明确定的12月1日是生效期限。",
            acceptable:
              "认可法律含义相同的自然表达，不要求固定措辞或背诵条号。",
            boundary: "不要求说明合同各项附随义务的提前效力。",
          },
          {
            id: "civil-bounded-gaps-term-december-effective-2",
            label: "成立与约定效力区分",
            meaning: "说明已经签约不等于约定的效力提前，12月1日起生效。",
            acceptable:
              "认可法律含义相同的自然表达，不要求固定措辞或背诵条号。",
            boundary: "不要求讨论本题没有的提前履行。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-legal-nonlegal-organizations",
    title: "法人和非法人组织的责任",
    headline: "法人对外独立负责；非法人组织是否追到出资人，要看法律。",
    goal: "基金会能否以内部限额为由拒绝承担本案采购合同责任？",
    prerequisite: "知道自然人与组织可以依法享有权利、承担义务。",
    minutes: "约8分钟",
    paragraphs: [
      "法定代表人以法人名义办理普通交易，法律后果由法人承受。内部对代表权的限制，不能用来对抗善意相对人。",
      "法人以其全部财产独立承担责任，不能只因为代表人在合同上签字，就把法人债务改成代表人的个人债务。",
      "非法人组织可以自己名义从事民事活动，但不因此成为法人。其财产不足清偿时，出资人或设立人原则上承担无限责任，法律另有规定的按规定。",
    ],
    example: {
      title: "内部采购限额能否对抗交易方",
      facts:
        "2026年9月，依法登记的澄远公益基金会需要采购办公电脑，法定代表人周宁以基金会名义签下10万元普通采购合同。基金会章程规定，超过5万元的此类采购须经理事会同意，周宁没有履行该内部手续。卖方事前查看登记确认周宁身份，对该内部限制毫不知情，也没有异常情况提示应进一步核查。基金会收货后，仅以未经内部同意为由拒付。",
      analysis:
        "不能。周宁以基金会名义进行普通采购，卖方对内部限制不知情且没有应当知道的情形。基金会不能拿内部限额对抗卖方，应由基金会承担合同责任。",
    },
    pitfall: "把任何有营业执照的组织都当法人，或一律按登记出资额限制责任。",
    recall: {
      prompt: "本组最容易混淆的两种情况，区别在哪里？",
      reference: "法人对外独立负责；非法人组织是否追到出资人，要看法律。",
    },
    sources: ["gaps-organizations"],
    exercises: [
      {
        caseId: "civil-bounded-gaps-legal-representative-internal-limit",
        relatedTopicIds: ["civil-legal-nonlegal-organizations"],
        facts:
          "2026年9月，依法登记的澄远公益基金会需要采购办公电脑，法定代表人周宁以基金会名义签下10万元普通采购合同。基金会章程规定，超过5万元的此类采购须经理事会同意，周宁没有履行该内部手续。卖方事前查看登记确认周宁身份，对该内部限制毫不知情，也没有异常情况提示应进一步核查。基金会收货后，仅以未经内部同意为由拒付。",
        hint: "先说结论，再结合案情说明理由。",
        reference:
          "不能。周宁以基金会名义进行普通采购，卖方对内部限制不知情且没有应当知道的情形。基金会不能拿内部限额对抗卖方，应由基金会承担合同责任。",
        sources: ["gaps-organizations"],
        id: "civil-bounded-gaps-legal-representative-internal-limit-choice",
        kind: "objective",
        choiceMode: "single",
        title: "内部采购限额能否对抗交易方（单选）",
        prompt: "基金会能否以内部限额为由拒绝承担本案采购合同责任？",
        options: [
          {
            id: "a",
            text: "不能，内部限制不能对抗善意卖方，合同后果由基金会承受。",
            explanation:
              "正确。不能。周宁以基金会名义进行普通采购，卖方对内部限制不知情且没有应当知道的情形。基金会不能拿内部限额对抗卖方，应由基金会承担合同责任。",
          },
          {
            id: "b",
            text: "能，任何违反内部限额的普通采购都当然对外无效。",
            explanation: "内部限制不得对抗善意相对人，不能一概否定外部交易。",
          },
          {
            id: "c",
            text: "不能，但必须由周宁个人承担全部货款，基金会无需付款。",
            explanation: "代表人以法人名义正常交易，法律后果原则上由法人承受。",
          },
          {
            id: "d",
            text: "能，公益法人依法不能进行任何办公物品采购。",
            explanation: "公益目的不意味着禁止为运营进行正常采购。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-bounded-gaps-legal-representative-internal-limit",
        relatedTopicIds: ["civil-legal-nonlegal-organizations"],
        facts:
          "2026年9月，依法登记的澄远公益基金会需要采购办公电脑，法定代表人周宁以基金会名义签下10万元普通采购合同。基金会章程规定，超过5万元的此类采购须经理事会同意，周宁没有履行该内部手续。卖方事前查看登记确认周宁身份，对该内部限制毫不知情，也没有异常情况提示应进一步核查。基金会收货后，仅以未经内部同意为由拒付。",
        hint: "先说结论，再结合案情说明理由。",
        reference:
          "不能。周宁以基金会名义进行普通采购，卖方对内部限制不知情且没有应当知道的情形。基金会不能拿内部限额对抗卖方，应由基金会承担合同责任。",
        sources: ["gaps-organizations"],
        id: "civil-bounded-gaps-legal-representative-internal-limit-written",
        kind: "subjective",
        title: "内部采购限额能否对抗交易方（自由作答）",
        prompt:
          "基金会能否以内部限额为由拒绝承担本案采购合同责任？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-bounded-gaps-legal-representative-internal-limit-1",
            label: "内部限制不能对抗善意方",
            meaning: "联系普通采购、卖方不知限制且无异常，否定以内部手续拒付。",
            acceptable:
              "认可法律含义相同的自然表达，不要求固定措辞或背诵条号。",
            boundary: "不延伸到担保、投资或法定须特别决议的交易。",
          },
          {
            id: "civil-bounded-gaps-legal-representative-internal-limit-2",
            label: "法人承担交易后果",
            meaning: "说明本案合同责任由基金会承担，不直接改为代表人个人债务。",
            acceptable:
              "认可法律含义相同的自然表达，不要求固定措辞或背诵条号。",
            boundary: "内部追责另论，原答无需展开。",
          },
        ],
      },
      {
        caseId: "civil-bounded-gaps-unincorporated-sole-investor",
        relatedTopicIds: ["civil-legal-nonlegal-organizations"],
        facts:
          "2026年9月，许舟以个人财产出资5万元，依法登记成立个人独资企业“舟行修理站”，营业执照明确标注企业类型。修理站经营中欠下20万元货款，企业现有财产只够偿还3万元。许舟个人另有足以清偿的财产，却称企业已经登记，自己最多只以最初投入的5万元负责。",
        hint: "先说结论，再结合案情说明理由。",
        reference:
          "不能。个人独资企业属于非法人组织，不是有限责任法人。企业先清偿3万元后，剩余17万元仍由投资人许舟以个人财产承担无限责任，不能以登记出资5万元为限。",
        sources: ["gaps-organizations"],
        id: "civil-bounded-gaps-unincorporated-sole-investor-choice",
        kind: "objective",
        choiceMode: "single",
        title: "个人独资企业的钱不够还债（单选）",
        prompt: "许舟能否仅以最初出资5万元为限，拒绝清偿企业财产不足部分？",
        options: [
          {
            id: "a",
            text: "能，任何依法登记的企业都只以注册出资额负责。",
            explanation: "登记不等于取得有限责任；个人独资企业不同于法人。",
          },
          {
            id: "b",
            text: "能，企业支付3万元后，其余债务当然全部消灭。",
            explanation: "财产不足不意味着债务消灭。",
          },
          {
            id: "c",
            text: "不能，企业不足清偿的17万元仍由投资人以个人财产承担。",
            explanation:
              "正确。不能。个人独资企业属于非法人组织，不是有限责任法人。企业先清偿3万元后，剩余17万元仍由投资人许舟以个人财产承担无限责任，不能以登记出资5万元为限。",
          },
          {
            id: "d",
            text: "不能，因此许舟须在20万元货款之外再另罚5万元出资额。",
            explanation: "无限责任是清偿债务，不是另加同额罚款。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-bounded-gaps-unincorporated-sole-investor",
        relatedTopicIds: ["civil-legal-nonlegal-organizations"],
        facts:
          "2026年9月，许舟以个人财产出资5万元，依法登记成立个人独资企业“舟行修理站”，营业执照明确标注企业类型。修理站经营中欠下20万元货款，企业现有财产只够偿还3万元。许舟个人另有足以清偿的财产，却称企业已经登记，自己最多只以最初投入的5万元负责。",
        hint: "先说结论，再结合案情说明理由。",
        reference:
          "不能。个人独资企业属于非法人组织，不是有限责任法人。企业先清偿3万元后，剩余17万元仍由投资人许舟以个人财产承担无限责任，不能以登记出资5万元为限。",
        sources: ["gaps-organizations"],
        id: "civil-bounded-gaps-unincorporated-sole-investor-written",
        kind: "subjective",
        title: "个人独资企业的钱不够还债（自由作答）",
        prompt:
          "许舟能否仅以最初出资5万元为限，拒绝清偿企业财产不足部分？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-bounded-gaps-unincorporated-sole-investor-1",
            label: "识别非法人组织",
            meaning: "说明个人独资企业不因登记成为有限责任法人。",
            acceptable:
              "认可法律含义相同的自然表达，不要求固定措辞或背诵条号。",
            boundary: "不把本题扩成普通合伙和有限合伙的全部例外。",
          },
          {
            id: "civil-bounded-gaps-unincorporated-sole-investor-2",
            label: "不足部分无限责任",
            meaning: "说明剩余17万元由许舟个人财产清偿，非仅限5万出资。",
            acceptable:
              "认可法律含义相同的自然表达，不要求固定措辞或背诵条号。",
            boundary: "有法律另定的组织应依特别法；本题限定个人独资。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-deposit-discharge",
    title: "债务提存的条件与成立",
    headline: "符合条件并实际交到提存部门，才在提存范围内算交付。",
    goal: "提存成立后，陆安能否要求禾川把同一笔3万元再付一次？",
    prerequisite: "知道自然人与组织可以依法享有权利、承担义务。",
    minutes: "约8分钟",
    paragraphs: [
      "债权人无正当理由拒收、下落不明等使债务难以履行时，债务人可依法提存。标的不适宜保管或费用过高，可依法变卖、拍卖后提存价款。",
      "交付标的物或依法处置所得价款给提存部门时，提存才成立。仅填申请、自己另存银行或口头说要提存，都不能代替这一步。",
      "提存成立后，在提存范围内视为已经交付。债务人还应依法及时通知相关权利人。",
    ],
    example: {
      title: "无理由拒收货款后的依法提存",
      facts:
        "2026年9月，禾川应向陆安支付已到期货款3万元。商品质量、金额和履行地点均无争议，禾川按约足额付款，陆安仅因另有私人矛盾拒收，并拒绝提供其他合法收款方式。禾川将3万元实际交给依法办理提存的部门，办妥提存并及时通知陆安。陆安仍要求禾川再向自己支付同一笔货款。",
      analysis:
        "不能。陆安无正当理由拒收，禾川已将全部3万元依法交付提存并通知。该范围内视为已经交付，陆安应依法领取提存款，不能要求禾川重复付款。",
    },
    pitfall: "把已经申请提存等同于已经交付，或把自留资金当作提存。",
    recall: {
      prompt: "本组最容易混淆的两种情况，区别在哪里？",
      reference: "符合条件并实际交到提存部门，才在提存范围内算交付。",
    },
    sources: ["gaps-deposit"],
    exercises: [
      {
        caseId: "civil-bounded-gaps-deposit-refusal-payment",
        relatedTopicIds: ["civil-deposit-discharge"],
        facts:
          "2026年9月，禾川应向陆安支付已到期货款3万元。商品质量、金额和履行地点均无争议，禾川按约足额付款，陆安仅因另有私人矛盾拒收，并拒绝提供其他合法收款方式。禾川将3万元实际交给依法办理提存的部门，办妥提存并及时通知陆安。陆安仍要求禾川再向自己支付同一笔货款。",
        hint: "先说结论，再结合案情说明理由。",
        reference:
          "不能。陆安无正当理由拒收，禾川已将全部3万元依法交付提存并通知。该范围内视为已经交付，陆安应依法领取提存款，不能要求禾川重复付款。",
        sources: ["gaps-deposit"],
        id: "civil-bounded-gaps-deposit-refusal-payment-choice",
        kind: "objective",
        choiceMode: "single",
        title: "无理由拒收货款后的依法提存（单选）",
        prompt: "提存成立后，陆安能否要求禾川把同一笔3万元再付一次？",
        options: [
          {
            id: "a",
            text: "能，债权人拒收后债务人仍只能一直保管现金等其接受。",
            explanation: "符合法定条件可以依法提存，并非只能无限等待。",
          },
          {
            id: "b",
            text: "不能，依法成立的足额提存在该范围内已发生交付效力。",
            explanation:
              "正确。不能。陆安无正当理由拒收，禾川已将全部3万元依法交付提存并通知。该范围内视为已经交付，陆安应依法领取提存款，不能要求禾川重复付款。",
          },
          {
            id: "c",
            text: "能，提存只是留个付款意向，永远不产生交付效力。",
            explanation: "实际交付提存部门并成立后，范围内视为交付。",
          },
          {
            id: "d",
            text: "不能，因为债权人一拒收就自动免除了全部债务，无需提存。",
            explanation: "拒收不等于免除债务；本案依足额提存产生交付效力。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-bounded-gaps-deposit-refusal-payment",
        relatedTopicIds: ["civil-deposit-discharge"],
        facts:
          "2026年9月，禾川应向陆安支付已到期货款3万元。商品质量、金额和履行地点均无争议，禾川按约足额付款，陆安仅因另有私人矛盾拒收，并拒绝提供其他合法收款方式。禾川将3万元实际交给依法办理提存的部门，办妥提存并及时通知陆安。陆安仍要求禾川再向自己支付同一笔货款。",
        hint: "先说结论，再结合案情说明理由。",
        reference:
          "不能。陆安无正当理由拒收，禾川已将全部3万元依法交付提存并通知。该范围内视为已经交付，陆安应依法领取提存款，不能要求禾川重复付款。",
        sources: ["gaps-deposit"],
        id: "civil-bounded-gaps-deposit-refusal-payment-written",
        kind: "subjective",
        title: "无理由拒收货款后的依法提存（自由作答）",
        prompt:
          "提存成立后，陆安能否要求禾川把同一笔3万元再付一次？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-bounded-gaps-deposit-refusal-payment-1",
            label: "存在提存条件",
            meaning:
              "联系按约足额付款、无其他争议及私人矛盾拒收，说明可以提存。",
            acceptable:
              "认可法律含义相同的自然表达，不要求固定措辞或背诵条号。",
            boundary: "不要求讨论本题未出现的提存费用或领取期间。",
          },
          {
            id: "civil-bounded-gaps-deposit-refusal-payment-2",
            label: "实际提存免于重复交付",
            meaning: "联系已依法足额交付，说明同笔货款范围内无需重复付款。",
            acceptable:
              "认可法律含义相同的自然表达，不要求固定措辞或背诵条号。",
            boundary: "不把未提存的其他债务一并消灭。",
          },
        ],
      },
      {
        caseId: "civil-bounded-gaps-deposit-application-not-delivery",
        relatedTopicIds: ["civil-deposit-discharge"],
        facts:
          "2026年10月，远禾欠沈安5万元已到期价款，沈安长期下落不明，无法联系。10月1日远禾向提存部门提交申请，但5万元仍留在自己的银行账户；直到10月3日才将款项实际交给提存部门并获收存凭证。远禾在10月2日对外声称自己已经通过提存完成这笔交付。",
        hint: "先说结论，再结合案情说明理由。",
        reference:
          "没有。10月2日只是提交了申请，钱仍在远禾账户里。到10月3日实际交给提存部门，提存才成立，才在该5万元范围内视为交付。",
        sources: ["gaps-deposit"],
        id: "civil-bounded-gaps-deposit-application-not-delivery-choice",
        kind: "objective",
        choiceMode: "single",
        title: "只交申请还没有交钱（单选）",
        prompt: "截至10月2日，远禾是否已通过提存完成该笔交付？提存何时成立？",
        options: [
          {
            id: "a",
            text: "已经完成，提存申请一受理就等于交付全部款项。",
            explanation: "提交申请与交付标的物是不同步骤。",
          },
          {
            id: "b",
            text: "已经完成，只要在自己账户为债权人预留金额就算提存。",
            explanation: "自己账户的资金仍未交给提存部门。",
          },
          {
            id: "c",
            text: "没有，提存只有债权人实际把款项领走之后才成立。",
            explanation: "成立时间是交付提存部门时，不必等债权人领取。",
          },
          {
            id: "d",
            text: "没有，实际交到提存部门的10月3日才成立。",
            explanation:
              "正确。没有。10月2日只是提交了申请，钱仍在远禾账户里。到10月3日实际交给提存部门，提存才成立，才在该5万元范围内视为交付。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-bounded-gaps-deposit-application-not-delivery",
        relatedTopicIds: ["civil-deposit-discharge"],
        facts:
          "2026年10月，远禾欠沈安5万元已到期价款，沈安长期下落不明，无法联系。10月1日远禾向提存部门提交申请，但5万元仍留在自己的银行账户；直到10月3日才将款项实际交给提存部门并获收存凭证。远禾在10月2日对外声称自己已经通过提存完成这笔交付。",
        hint: "先说结论，再结合案情说明理由。",
        reference:
          "没有。10月2日只是提交了申请，钱仍在远禾账户里。到10月3日实际交给提存部门，提存才成立，才在该5万元范围内视为交付。",
        sources: ["gaps-deposit"],
        id: "civil-bounded-gaps-deposit-application-not-delivery-written",
        kind: "subjective",
        title: "只交申请还没有交钱（自由作答）",
        prompt:
          "截至10月2日，远禾是否已通过提存完成该笔交付？提存何时成立？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-bounded-gaps-deposit-application-not-delivery-1",
            label: "申请不等于交付",
            meaning: "联系10月2日款仍在自己账户，否定已经提存交付。",
            acceptable:
              "认可法律含义相同的自然表达，不要求固定措辞或背诵条号。",
            boundary: "不要求核算迟延损失或利息。",
          },
          {
            id: "civil-bounded-gaps-deposit-application-not-delivery-2",
            label: "成立时间与范围",
            meaning: "说明10月3日实际交部门时成立，仅在5万元范围内视为交付。",
            acceptable:
              "认可法律含义相同的自然表达，不要求固定措辞或背诵条号。",
            boundary: "不要求援引条号。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-energy-supply-duty",
    title: "供用合同的安全供给与欠费处理",
    headline: "供电要达安全质量标准；欠费也要按催告和法定程序处理。",
    goal: "供电企业能否据此拒绝赔偿这6万元损失？",
    prerequisite: "知道自然人与组织可以依法享有权利、承担义务。",
    minutes: "约8分钟",
    paragraphs: [
      "供电企业应按国家标准和约定安全、连续、可靠供电。违反供电质量要求造成损失，应承担相应赔偿责任。",
      "用户应及时支付电费。逾期应依约支付违约金；催告后在合理期限仍不支付，供电企业才可按国家规定程序中止，不能想停就停。",
      "供用水、气、热力合同参照供用电合同规则。各类供应的具体管理程序仍须核对对应规定，不能把某一种能源的天数直接套给全部供应。",
    ],
    example: {
      title: "电压失常烧坏设备由谁负责",
      facts:
        "2026年9月，供电企业与恒禾小厂签有供用电合同。该供电企业负责的设备已连续出现电压异常预警，值班人员收到记录后一直没有处理。后来异常电压进入小厂，烧坏正常使用的生产设备，鉴定确认损失6万元由该供电质量问题直接造成。小厂已按时交费，厂内线路和设备没有问题。供电企业称自己只负责把电送到，设备损失一概由用户负责。",
      analysis:
        "不能。供电企业有按标准安全、可靠供电的义务，收到异常预警却未处理，供电质量问题直接烧坏设备。已确认的6万元损失应由其赔偿。",
    },
    pitfall: "把欠费当成可以当场拉闸的理由，或认为供方对供电质量从不负责。",
    recall: {
      prompt: "本组最容易混淆的两种情况，区别在哪里？",
      reference: "供电要达安全质量标准；欠费也要按催告和法定程序处理。",
    },
    sources: [
      "gaps-energy",
      "civil-gap-energy-business-rules",
      "civil-gap-energy-regulation",
    ],
    exercises: [
      {
        caseId: "civil-bounded-gaps-energy-quality-damage",
        relatedTopicIds: ["civil-energy-supply-duty"],
        facts:
          "2026年9月，供电企业与恒禾小厂签有供用电合同。该供电企业负责的设备已连续出现电压异常预警，值班人员收到记录后一直没有处理。后来异常电压进入小厂，烧坏正常使用的生产设备，鉴定确认损失6万元由该供电质量问题直接造成。小厂已按时交费，厂内线路和设备没有问题。供电企业称自己只负责把电送到，设备损失一概由用户负责。",
        hint: "先说结论，再结合案情说明理由。",
        reference:
          "不能。供电企业有按标准安全、可靠供电的义务，收到异常预警却未处理，供电质量问题直接烧坏设备。已确认的6万元损失应由其赔偿。",
        sources: ["gaps-energy"],
        id: "civil-bounded-gaps-energy-quality-damage-choice",
        kind: "objective",
        choiceMode: "single",
        title: "电压失常烧坏设备由谁负责（单选）",
        prompt: "供电企业能否据此拒绝赔偿这6万元损失？",
        options: [
          {
            id: "a",
            text: "不能，违反供电质量义务并直接造成设备损失，应赔偿。",
            explanation:
              "正确。不能。供电企业有按标准安全、可靠供电的义务，收到异常预警却未处理，供电质量问题直接烧坏设备。已确认的6万元损失应由其赔偿。",
          },
          {
            id: "b",
            text: "能，供电企业只要送出过电，就不再对电压质量负责。",
            explanation: "供电义务包括安全和质量要求，不止是否通电。",
          },
          {
            id: "c",
            text: "能，所有用电设备损害均由用户自行承担，不问原因。",
            explanation: "应按损害原因和义务违反确定责任。",
          },
          {
            id: "d",
            text: "不能，因此即使没有损失和因果关系，也一律按设备总价双倍赔偿。",
            explanation:
              "本题赔偿以实际损失和因果关系为基础，不是统一双倍赔偿。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-bounded-gaps-energy-quality-damage",
        relatedTopicIds: ["civil-energy-supply-duty"],
        facts:
          "2026年9月，供电企业与恒禾小厂签有供用电合同。该供电企业负责的设备已连续出现电压异常预警，值班人员收到记录后一直没有处理。后来异常电压进入小厂，烧坏正常使用的生产设备，鉴定确认损失6万元由该供电质量问题直接造成。小厂已按时交费，厂内线路和设备没有问题。供电企业称自己只负责把电送到，设备损失一概由用户负责。",
        hint: "先说结论，再结合案情说明理由。",
        reference:
          "不能。供电企业有按标准安全、可靠供电的义务，收到异常预警却未处理，供电质量问题直接烧坏设备。已确认的6万元损失应由其赔偿。",
        sources: ["gaps-energy"],
        id: "civil-bounded-gaps-energy-quality-damage-written",
        kind: "subjective",
        title: "电压失常烧坏设备由谁负责（自由作答）",
        prompt: "供电企业能否据此拒绝赔偿这6万元损失？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-bounded-gaps-energy-quality-damage-1",
            label: "供方质量义务及违反",
            meaning:
              "联系多次预警未处理和电压异常，说明供方未履行安全质量供电义务。",
            acceptable:
              "认可法律含义相同的自然表达，不要求固定措辞或背诵条号。",
            boundary: "不泛化为电网任何意外都必须赔。",
          },
          {
            id: "civil-bounded-gaps-energy-quality-damage-2",
            label: "相应损失赔偿",
            meaning: "根据鉴定确认因果，说明应赔6万元实际损失。",
            acceptable:
              "认可法律含义相同的自然表达，不要求固定措辞或背诵条号。",
            boundary: "不要求讨论不存在的用户过错或不可抗力。",
          },
        ],
      },
      {
        caseId: "civil-bounded-gaps-energy-unannounced-arrears-cutoff",
        relatedTopicIds: ["civil-energy-supply-duty"],
        facts:
          "2026年9月，诚禾小厂拖欠供电企业两期电费。该企业没有催告缴费，没有给出催告后的合理付款期限，也没有发出停电通知，直接在上班时拉闸停供。当天电网正常，小厂没有危害供电安全、窃电等情况。供电企业称“只要欠费，程序都可以省掉”。",
        hint: "先说结论，再结合案情说明理由。",
        reference:
          "不符合。小厂应补交欠费，但这不等于供电企业能省略程序。供方须先催告，合理期限仍未支付时，再按国家规定程序中止；本次既未催告，也未通知，不能这样直接拉闸。",
        sources: [
          "gaps-energy",
          "civil-gap-energy-business-rules",
          "civil-gap-energy-regulation",
        ],
        id: "civil-bounded-gaps-energy-unannounced-arrears-cutoff-choice",
        kind: "objective",
        choiceMode: "single",
        title: "欠费后能否未经催告直接停电（单选）",
        prompt: "供电企业本次直接停供是否符合欠费中止供电的要求？",
        options: [
          {
            id: "a",
            text: "符合，合同一有欠费就自动授权随时拉闸且无需通知。",
            explanation:
              "欠费中止须满足催告、合理期限及国家程序，不能直接跳过。",
          },
          {
            id: "b",
            text: "不符合，所以小厂从此也无需清偿任何已欠电费。",
            explanation: "供方程序违法不当然免掉用户的付款义务。",
          },
          {
            id: "c",
            text: "不符合，欠费不免除催告、合理期限和国家规定的停供程序。",
            explanation:
              "正确。不符合。小厂应补交欠费，但这不等于供电企业能省略程序。供方须先催告，合理期限仍未支付时，再按国家规定程序中止；本次既未催告，也未通知，不能这样直接拉闸。",
          },
          {
            id: "d",
            text: "符合，因为停供程序只约束物业公司，不约束供电企业。",
            explanation: "供电企业中止供电本身也受法定程序约束。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-bounded-gaps-energy-unannounced-arrears-cutoff",
        relatedTopicIds: ["civil-energy-supply-duty"],
        facts:
          "2026年9月，诚禾小厂拖欠供电企业两期电费。该企业没有催告缴费，没有给出催告后的合理付款期限，也没有发出停电通知，直接在上班时拉闸停供。当天电网正常，小厂没有危害供电安全、窃电等情况。供电企业称“只要欠费，程序都可以省掉”。",
        hint: "先说结论，再结合案情说明理由。",
        reference:
          "不符合。小厂应补交欠费，但这不等于供电企业能省略程序。供方须先催告，合理期限仍未支付时，再按国家规定程序中止；本次既未催告，也未通知，不能这样直接拉闸。",
        sources: [
          "gaps-energy",
          "civil-gap-energy-business-rules",
          "civil-gap-energy-regulation",
        ],
        id: "civil-bounded-gaps-energy-unannounced-arrears-cutoff-written",
        kind: "subjective",
        title: "欠费后能否未经催告直接停电（自由作答）",
        prompt:
          "供电企业本次直接停供是否符合欠费中止供电的要求？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-bounded-gaps-energy-unannounced-arrears-cutoff-1",
            label: "否定省略程序的停供",
            meaning: "联系未催告、未给期限和未通知，说明本次不合要求。",
            acceptable:
              "认可法律含义相同的自然表达，不要求固定措辞或背诵条号。",
            boundary: "不要求记具体天数，不编造所有能源通用期限。",
          },
          {
            id: "civil-bounded-gaps-energy-unannounced-arrears-cutoff-2",
            label: "欠费义务与供方程序分开",
            meaning:
              "说明小厂仍应缴欠费，催告后合理期限不付才可依法按程序停供。",
            acceptable:
              "认可法律含义相同的自然表达，不要求固定措辞或背诵条号。",
            boundary: "不扩大为任何情形下永远不得停电。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-condominium-common-management",
    title: "业主共有收益与共同决定",
    headline:
      "共有经营收入扣合理成本后归业主；改变共有用途须满足特别表决比例。",
    goal: "扣除6000元合理成本后的2.4万元，应归物业还是归业主共有？",
    prerequisite: "知道自然人与组织可以依法享有权利、承担义务。",
    minutes: "约8分钟",
    paragraphs: [
      "住宅等专有部分归各业主所有，专有部分以外的共有部分由业主共同享有和管理。",
      "物业利用共有部分获得收入，扣除合理成本后属于业主共有。钱由物业经手，不等于净收入就变成物业的自有收入。",
      "改变共有部分用途等事项，参与表决的业主人数和面积须各达三分之二以上；同意人数和面积须各达参与表决者的四分之三以上。分母是参与表决者，不能只看普通过半。",
    ],
    example: {
      title: "电梯广告扣除成本后归谁",
      facts:
        "2026年9月，青汀小区已依法共同决定在业主共有的电梯内投放广告，并委托物业办理。一个月共收广告费3万元，双方无争议的合理招租和维护成本为6000元。合同未约定物业可另取利润，物业也已另收约定物业费，却把余下2.4万元全记成自己的经营利润，理由是广告客户由自己联系。",
      analysis:
        "归业主共有。广告利用的是共有电梯，扣除合理成本后的2.4万元属于业主。物业联系客户、代收款，并不能据此把净收入留下作自己的利润。",
    },
    pitfall: "把共有经营净收入据为己有，或把特别事项按普通过半表决。",
    recall: {
      prompt: "本组最容易混淆的两种情况，区别在哪里？",
      reference:
        "共有经营收入扣合理成本后归业主；改变共有用途须满足特别表决比例。",
    },
    sources: ["gaps-condominium"],
    exercises: [
      {
        caseId: "civil-bounded-gaps-condominium-advertising-net-income",
        relatedTopicIds: ["civil-condominium-common-management"],
        facts:
          "2026年9月，青汀小区已依法共同决定在业主共有的电梯内投放广告，并委托物业办理。一个月共收广告费3万元，双方无争议的合理招租和维护成本为6000元。合同未约定物业可另取利润，物业也已另收约定物业费，却把余下2.4万元全记成自己的经营利润，理由是广告客户由自己联系。",
        hint: "先说结论，再结合案情说明理由。",
        reference:
          "归业主共有。广告利用的是共有电梯，扣除合理成本后的2.4万元属于业主。物业联系客户、代收款，并不能据此把净收入留下作自己的利润。",
        sources: ["gaps-condominium"],
        id: "civil-bounded-gaps-condominium-advertising-net-income-choice",
        kind: "objective",
        choiceMode: "single",
        title: "电梯广告扣除成本后归谁（单选）",
        prompt: "扣除6000元合理成本后的2.4万元，应归物业还是归业主共有？",
        options: [
          {
            id: "a",
            text: "归物业，任何由物业联系到的广告款都属于物业自有财产。",
            explanation: "收入来源是共有部分，不能只按谁联系客户决定归属。",
          },
          {
            id: "b",
            text: "归业主共有，物业经手不改变共有经营净收入的归属。",
            explanation:
              "正确。归业主共有。广告利用的是共有电梯，扣除合理成本后的2.4万元属于业主。物业联系客户、代收款，并不能据此把净收入留下作自己的利润。",
          },
          {
            id: "c",
            text: "归业主共有3万元，任何合理成本也一律不准扣除。",
            explanation: "规则明确允许先扣除合理成本。",
          },
          {
            id: "d",
            text: "归某位电梯使用次数最多的业主个人所有。",
            explanation: "这是共有部分经营净收益，不按谁使用最多变为个人所有。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-bounded-gaps-condominium-advertising-net-income",
        relatedTopicIds: ["civil-condominium-common-management"],
        facts:
          "2026年9月，青汀小区已依法共同决定在业主共有的电梯内投放广告，并委托物业办理。一个月共收广告费3万元，双方无争议的合理招租和维护成本为6000元。合同未约定物业可另取利润，物业也已另收约定物业费，却把余下2.4万元全记成自己的经营利润，理由是广告客户由自己联系。",
        hint: "先说结论，再结合案情说明理由。",
        reference:
          "归业主共有。广告利用的是共有电梯，扣除合理成本后的2.4万元属于业主。物业联系客户、代收款，并不能据此把净收入留下作自己的利润。",
        sources: ["gaps-condominium"],
        id: "civil-bounded-gaps-condominium-advertising-net-income-written",
        kind: "subjective",
        title: "电梯广告扣除成本后归谁（自由作答）",
        prompt:
          "扣除6000元合理成本后的2.4万元，应归物业还是归业主共有？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-bounded-gaps-condominium-advertising-net-income-1",
            label: "识别共有部分收益",
            meaning: "联系广告投放于共有电梯，说明净收入归业主共有。",
            acceptable:
              "认可法律含义相同的自然表达，不要求固定措辞或背诵条号。",
            boundary: "不要求重新审查题设已合法完成的广告共同决定。",
          },
          {
            id: "civil-bounded-gaps-condominium-advertising-net-income-2",
            label: "正确扣除合理成本",
            meaning: "说明3万减6000为2.4万，不能由物业据为自有利润。",
            acceptable:
              "认可法律含义相同的自然表达，不要求固定措辞或背诵条号。",
            boundary: "不要求决定全体业主如何进一步分配或使用。",
          },
        ],
      },
      {
        caseId: "civil-bounded-gaps-condominium-purpose-vote",
        relatedTopicIds: ["civil-condominium-common-management"],
        facts:
          "2026年9月，沐禾小区有100户业主，每户各有一套面积相同的住宅，每户也只有一名登记业主。拟将业主共有活动室改为对外收费的经营场所。80户参与表决，50户赞成，30户反对；同意方与反对方各自面积占比与人数占比相同。召集人称参加者已过半同意，可以据此通过改变共有用途的方案。",
        hint: "先说结论，再结合案情说明理由。",
        reference:
          "没有。80户参与，人数和面积都已达到三分之二，参与门槛满足。但改变共有用途须经参与者人数、面积各四分之三以上同意，即本案至少60户；只有50户赞成，方案未通过。",
        sources: ["gaps-condominium"],
        id: "civil-bounded-gaps-condominium-purpose-vote-choice",
        kind: "objective",
        choiceMode: "single",
        title: "把共有活动室改成经营场所（单选）",
        prompt: "本次表决是否已达到改变共有部分用途的法定通过比例？",
        options: [
          {
            id: "a",
            text: "已经达到，所有业主共同事项都只须参与者过半同意。",
            explanation: "改变共有部分用途适用四分之三特别同意门槛。",
          },
          {
            id: "b",
            text: "没有，因为即使80户参与，也未达到参与表决必须全体到场的要求。",
            explanation: "参与门槛为人数与面积各三分之二以上，不是全体到场。",
          },
          {
            id: "c",
            text: "已经达到，因为50户占全体一半就自动达到四分之三。",
            explanation: "本案同意比例50/80为62.5%，不足四分之三。",
          },
          {
            id: "d",
            text: "没有，参与门槛已满足，但赞成者未达参与表决人数和面积的四分之三。",
            explanation:
              "正确。没有。80户参与，人数和面积都已达到三分之二，参与门槛满足。但改变共有用途须经参与者人数、面积各四分之三以上同意，即本案至少60户；只有50户赞成，方案未通过。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-bounded-gaps-condominium-purpose-vote",
        relatedTopicIds: ["civil-condominium-common-management"],
        facts:
          "2026年9月，沐禾小区有100户业主，每户各有一套面积相同的住宅，每户也只有一名登记业主。拟将业主共有活动室改为对外收费的经营场所。80户参与表决，50户赞成，30户反对；同意方与反对方各自面积占比与人数占比相同。召集人称参加者已过半同意，可以据此通过改变共有用途的方案。",
        hint: "先说结论，再结合案情说明理由。",
        reference:
          "没有。80户参与，人数和面积都已达到三分之二，参与门槛满足。但改变共有用途须经参与者人数、面积各四分之三以上同意，即本案至少60户；只有50户赞成，方案未通过。",
        sources: ["gaps-condominium"],
        id: "civil-bounded-gaps-condominium-purpose-vote-written",
        kind: "subjective",
        title: "把共有活动室改成经营场所（自由作答）",
        prompt:
          "本次表决是否已达到改变共有部分用途的法定通过比例？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-bounded-gaps-condominium-purpose-vote-1",
            label: "参与门槛达标",
            meaning: "说明80/100的人数与等面积参与达到三分之二。",
            acceptable:
              "认可法律含义相同的自然表达，不要求固定措辞或背诵条号。",
            boundary: "不要求对计算过程使用固定格式。",
          },
          {
            id: "civil-bounded-gaps-condominium-purpose-vote-2",
            label: "特别同意门槛未达标",
            meaning:
              "说明须达到参与者人数及面积四分之三，本案50/80不足，方案未通过。",
            acceptable:
              "认可法律含义相同的自然表达，不要求固定措辞或背诵条号。",
            boundary: "不能误用全体业主人数作为四分之三的分母。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-adoption-formation",
    title: "收养的成立与同意",
    headline: "收养要登记；八周岁以上，还要孩子本人同意。",
    goal: "赵远关于收养关系已经成立的说法是否正确？",
    prerequisite: "知道本节涉及的当事人及基本法律关系。",
    minutes: "约8分钟",
    paragraphs: [
      "收养关系从县级以上民政部门登记之日起成立。签协议、办公证、一起生活，都不能代替登记。",
      "收养人和送养人须自愿。被收养人已满八周岁，还须取得他本人的同意，成年人不能替他说同意。",
      "收养还有年龄、抚养能力等法定条件。本节先抓登记和必要同意，不能只看大人是否谈妥。",
    ],
    example: {
      title: "公证后尚未登记",
      facts:
        "2026年7月，赵远、宁溪夫妻与县儿童福利机构就收养七岁的孤儿小澄签订书面协议，并办理公证。夫妻二人均38岁、没有子女，已通过收养评估，其余法定条件均已满足。小澄在二人家中生活了三个月，但各方一直没有到民政部门办理收养登记。赵远认为，既然协议已公证又一起生活，法定收养关系已经成立。",
      analysis:
        "不正确。小澄虽已共同生活三个月，协议也经过公证，但还没有民政登记，收养关系尚未成立。应依法办理登记，公证不能替代登记。",
    },
    pitfall: "把照料时间、公证或成年人的签字当成收养已经成立。",
    recall: {
      prompt: "协议已经公证，是否还需民政登记？孩子已满八周岁时，还需谁同意？",
      reference: "仍需民政登记；还需被收养的孩子本人同意。",
    },
    sources: ["civil-gap-adoption-code"],
    exercises: [
      {
        caseId: "civil-bounded-gaps-adoption-notarized-no-registration",
        relatedTopicIds: ["civil-adoption-formation"],
        facts:
          "2026年7月，赵远、宁溪夫妻与县儿童福利机构就收养七岁的孤儿小澄签订书面协议，并办理公证。夫妻二人均38岁、没有子女，已通过收养评估，其余法定条件均已满足。小澄在二人家中生活了三个月，但各方一直没有到民政部门办理收养登记。赵远认为，既然协议已公证又一起生活，法定收养关系已经成立。",
        hint: "先回答设问，再说明案情理由。",
        reference:
          "不正确。小澄虽已共同生活三个月，协议也经过公证，但还没有民政登记，收养关系尚未成立。应依法办理登记，公证不能替代登记。",
        sources: ["civil-gap-adoption-code"],
        id: "civil-bounded-gaps-adoption-notarized-no-registration-choice",
        kind: "objective",
        choiceMode: "single",
        title: "公证后尚未登记（单选）",
        prompt: "赵远关于收养关系已经成立的说法是否正确？",
        options: [
          {
            id: "a",
            text: "不正确，尚未办理民政登记，收养关系还未成立。",
            explanation: "正确。协议、公证和实际照料都不能替代法定登记。",
          },
          {
            id: "b",
            text: "正确，收养协议一经公证，收养关系立即成立。",
            explanation: "公证不是法定收养关系成立的时点。",
          },
          {
            id: "c",
            text: "正确，实际共同生活满三个月即可代替登记。",
            explanation: "法律没有本题所说的三个月自动成立规则。",
          },
          {
            id: "d",
            text: "不正确，收养关系须等小澄年满十八周岁才成立。",
            explanation: "收养未成年人可以在依法登记时成立，不必等成年。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-bounded-gaps-adoption-notarized-no-registration",
        relatedTopicIds: ["civil-adoption-formation"],
        facts:
          "2026年7月，赵远、宁溪夫妻与县儿童福利机构就收养七岁的孤儿小澄签订书面协议，并办理公证。夫妻二人均38岁、没有子女，已通过收养评估，其余法定条件均已满足。小澄在二人家中生活了三个月，但各方一直没有到民政部门办理收养登记。赵远认为，既然协议已公证又一起生活，法定收养关系已经成立。",
        hint: "先回答设问，再说明案情理由。",
        reference:
          "不正确。小澄虽已共同生活三个月，协议也经过公证，但还没有民政登记，收养关系尚未成立。应依法办理登记，公证不能替代登记。",
        sources: ["civil-gap-adoption-code"],
        id: "civil-bounded-gaps-adoption-notarized-no-registration-written",
        kind: "subjective",
        title: "公证后尚未登记（自由作答）",
        prompt: "赵远关于收养关系已经成立的说法是否正确？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-bounded-gaps-adoption-registration-required",
            label: "尚未成立收养关系",
            meaning: "否定赵远的说法，联系未办理民政登记说明目前尚未成立。",
            acceptable: "认可意思清楚的日常表达，不要求逐字背诵术语或条号。",
            boundary: "本案其余收养条件均已满足，不另考收养资格。",
          },
          {
            id: "civil-bounded-gaps-adoption-notary-no-substitute",
            label: "公证与照料不能代替登记",
            meaning: "说明已公证、共同生活也不能替代民政登记。",
            acceptable: "认可意思清楚的日常表达，不要求逐字背诵术语或条号。",
            boundary: "不要求讨论协议的独立财产效力或户籍办理。",
          },
        ],
      },
      {
        caseId: "civil-bounded-gaps-adoption-child-refuses",
        relatedTopicIds: ["civil-adoption-formation"],
        facts:
          "2026年9月，夫妻许言、林霁拟收养十岁的孤儿小禾。二人和依法送养的儿童福利机构均已同意，收养人的其他法定条件均满足。民政人员单独征求小禾意见时，小禾能清楚表达自己的想法，反复表示不愿意被这对夫妻收养。许言提出由送养机构代小禾签字，先办登记，以后再劝她。",
        hint: "先回答设问，再说明案情理由。",
        reference:
          "不能。小禾已十岁，收养必须征得她本人同意。成年双方同意，也不能代替她的意愿；在她明确拒绝时，不能按这个方案办理收养。",
        sources: ["civil-gap-adoption-code"],
        id: "civil-bounded-gaps-adoption-child-refuses-choice",
        kind: "objective",
        choiceMode: "single",
        title: "十岁孩子表示不同意（单选）",
        prompt: "能否由送养机构代替小禾同意，按现方案办理收养登记？",
        options: [
          {
            id: "a",
            text: "能，只要收养人与送养机构都同意，孩子的意见不影响。",
            explanation: "八周岁以上被收养人的同意是另外必要的条件。",
          },
          {
            id: "b",
            text: "能，十岁孩子尚未成年，可由送养机构代为同意。",
            explanation: "未成年不等于本人同意可以被监护人或送养人替代。",
          },
          {
            id: "c",
            text: "不能，小禾已满八周岁，必须取得她本人同意。",
            explanation: "正确。机构不能替代达到法定年龄的孩子表示同意。",
          },
          {
            id: "d",
            text: "不能，但只需等小禾满十二周岁，再由机构代签即可。",
            explanation: "没有满十二周岁后可代签的规则；本人的同意不能被替代。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-bounded-gaps-adoption-child-refuses",
        relatedTopicIds: ["civil-adoption-formation"],
        facts:
          "2026年9月，夫妻许言、林霁拟收养十岁的孤儿小禾。二人和依法送养的儿童福利机构均已同意，收养人的其他法定条件均满足。民政人员单独征求小禾意见时，小禾能清楚表达自己的想法，反复表示不愿意被这对夫妻收养。许言提出由送养机构代小禾签字，先办登记，以后再劝她。",
        hint: "先回答设问，再说明案情理由。",
        reference:
          "不能。小禾已十岁，收养必须征得她本人同意。成年双方同意，也不能代替她的意愿；在她明确拒绝时，不能按这个方案办理收养。",
        sources: ["civil-gap-adoption-code"],
        id: "civil-bounded-gaps-adoption-child-refuses-written",
        kind: "subjective",
        title: "十岁孩子表示不同意（自由作答）",
        prompt:
          "能否由送养机构代替小禾同意，按现方案办理收养登记？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-bounded-gaps-adoption-child-consent",
            label: "需要孩子本人同意",
            meaning: "联系小禾十岁且明确拒绝，说明不得由送养机构代替她同意。",
            acceptable: "认可意思清楚的日常表达，不要求逐字背诵术语或条号。",
            boundary: "本案不涉及孩子无法表达意愿的情形，不自行推定例外。",
          },
          {
            id: "civil-bounded-gaps-adoption-current-plan-fails",
            label: "目前不能按该方案办理",
            meaning:
              "明确该同意欠缺使当前收养方案不能办理，不以先登记后劝说补足。",
            acceptable: "认可意思清楚的日常表达，不要求逐字背诵术语或条号。",
            boundary: "不要求列举收养人其他资格或评估细则。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-estate-administrator",
    title: "遗产管理人的确定与职责",
    headline: "有遗嘱执行人，先由他管理；管理遗产也有保全义务。",
    goal: "本案应由谁担任遗产管理人？",
    prerequisite: "知道本节涉及的当事人及基本法律关系。",
    minutes: "约8分钟",
    paragraphs: [
      "被继承人死亡后，有遗嘱执行人的，由遗嘱执行人担任遗产管理人。没有执行人，才由继承人及时推选等规则接续。",
      "遗产管理人要清理遗产、制作清单、向继承人报告，采取必要措施保护遗产，并处理债权债务等事项。",
      "管理人因故意或者重大过失造成继承人、受遗赠人或债权人损害，应承担责任。没有收取报酬，也不能放任遗产受损。",
    ],
    example: {
      title: "遗嘱已指定执行人",
      facts:
        "孟秋于2026年8月去世。她留有合法有效的遗嘱，明确指定老同事顾安为遗嘱执行人，顾安愿意履职。孟秋的两个成年女儿都是继承人。大女儿以自己年长、继承份额较大为由，要求不经顾安同意便由自己单独接管全部遗产，认为顾安不是继承人就无权担任遗产管理人。",
      analysis:
        "应由顾安担任。孟秋已在有效遗嘱中指定他为遗嘱执行人，依法就由他担任遗产管理人。顾安不是继承人，不影响该资格；大女儿年长或份额较大，也不能据此取代他。",
    },
    pitfall: "把长子女身份当成当然管理资格，或把免费管理当成任何损害都免责。",
    recall: {
      prompt: "有遗嘱执行人时，继承人要重新投票才能有管理人吗？",
      reference: "不需要。有遗嘱执行人时，由他担任遗产管理人。",
    },
    sources: ["civil-gap-estate-code"],
    exercises: [
      {
        caseId: "civil-bounded-gaps-estate-named-executor",
        relatedTopicIds: ["civil-estate-administrator"],
        facts:
          "孟秋于2026年8月去世。她留有合法有效的遗嘱，明确指定老同事顾安为遗嘱执行人，顾安愿意履职。孟秋的两个成年女儿都是继承人。大女儿以自己年长、继承份额较大为由，要求不经顾安同意便由自己单独接管全部遗产，认为顾安不是继承人就无权担任遗产管理人。",
        hint: "先回答设问，再说明案情理由。",
        reference:
          "应由顾安担任。孟秋已在有效遗嘱中指定他为遗嘱执行人，依法就由他担任遗产管理人。顾安不是继承人，不影响该资格；大女儿年长或份额较大，也不能据此取代他。",
        sources: ["civil-gap-estate-code"],
        id: "civil-bounded-gaps-estate-named-executor-choice",
        kind: "objective",
        choiceMode: "single",
        title: "遗嘱已指定执行人（单选）",
        prompt: "本案应由谁担任遗产管理人？",
        options: [
          {
            id: "a",
            text: "由大女儿担任，因为继承份额最大者当然优先。",
            explanation: "管理人资格不以继承份额最大为当然标准。",
          },
          {
            id: "b",
            text: "由顾安担任，因为他是遗嘱指定的执行人。",
            explanation: "正确。有遗嘱执行人时，由其担任遗产管理人。",
          },
          {
            id: "c",
            text: "由两个女儿共同担任，任何非继承人都不能管理遗产。",
            explanation:
              "有遗嘱执行人时不直接适用继承人未推选而共同担任的规则。",
          },
          {
            id: "d",
            text: "只能由法院先指定，遗嘱不能指定执行人。",
            explanation: "本案已有明确有效指定，不需要以法院指定作为成立前提。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-bounded-gaps-estate-named-executor",
        relatedTopicIds: ["civil-estate-administrator"],
        facts:
          "孟秋于2026年8月去世。她留有合法有效的遗嘱，明确指定老同事顾安为遗嘱执行人，顾安愿意履职。孟秋的两个成年女儿都是继承人。大女儿以自己年长、继承份额较大为由，要求不经顾安同意便由自己单独接管全部遗产，认为顾安不是继承人就无权担任遗产管理人。",
        hint: "先回答设问，再说明案情理由。",
        reference:
          "应由顾安担任。孟秋已在有效遗嘱中指定他为遗嘱执行人，依法就由他担任遗产管理人。顾安不是继承人，不影响该资格；大女儿年长或份额较大，也不能据此取代他。",
        sources: ["civil-gap-estate-code"],
        id: "civil-bounded-gaps-estate-named-executor-written",
        kind: "subjective",
        title: "遗嘱已指定执行人（自由作答）",
        prompt: "本案应由谁担任遗产管理人？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-bounded-gaps-estate-executor-manager",
            label: "执行人担任管理人",
            meaning: "指出顾安是合法遗嘱指定的执行人，应由他担任遗产管理人。",
            acceptable: "认可意思清楚的日常表达，不要求逐字背诵术语或条号。",
            boundary: "本案遗嘱与指定有效且顾安愿意履职，不考其拒绝或撤换。",
          },
          {
            id: "civil-bounded-gaps-estate-heir-status-not-required",
            label: "非继承人不妨碍担任",
            meaning: "否定仅因非继承人排除顾安或仅凭长幼、份额取代他的说法。",
            acceptable: "认可意思清楚的日常表达，不要求逐字背诵术语或条号。",
            boundary: "不要求讨论遗嘱执行人与受遗赠人的利益冲突。",
          },
        ],
      },
      {
        caseId: "civil-bounded-gaps-estate-ignored-leak",
        relatedTopicIds: ["civil-estate-administrator"],
        facts:
          "2026年9月，继承人一致推选沈禾为遗产管理人，沈禾同意免费管理。遗产仓库的保管员三次提醒他：屋顶破损，雨水正流向一箱画作；隔壁有空置干燥房，可以立即免费转移。沈禾收到现场照片后仍回复“等分遗产时再说”，接下来数日既未转移也未遮盖，最终画作严重受潮。经查，及时转移就能避免这次损失。沈禾认为自己未收费，不应赔偿。",
        hint: "先回答设问，再说明案情理由。",
        reference:
          "不能。沈禾有保护遗产的职责，收到多次漏雨提醒，又能方便地免费转移，却一直不处理，造成了本可避免的损失，属于重大过失，应承担赔偿责任。免费管理不能免除这项责任。",
        sources: ["civil-gap-estate-code"],
        id: "civil-bounded-gaps-estate-ignored-leak-choice",
        kind: "objective",
        choiceMode: "single",
        title: "管理遗产时放着漏雨不管（单选）",
        prompt: "沈禾能否以免费管理为由免除这次画作损失的责任？",
        options: [
          {
            id: "a",
            text: "能，遗产管理人只要未收报酬就不承担赔偿责任。",
            explanation: "免费不免除故意或重大过失造成损害的责任。",
          },
          {
            id: "b",
            text: "能，保护遗产只是继承人的责任，管理人只负责制作清单。",
            explanation: "防止遗产毁损灭失也是遗产管理人的法定职责。",
          },
          {
            id: "c",
            text: "不能，因此任何遗产自然损耗都应由管理人全额赔偿。",
            explanation:
              "本案责任来自重大过失和损害因果，不是管理人对一切损耗无条件负责。",
          },
          {
            id: "d",
            text: "不能，沈禾因重大过失未保护遗产并造成损失，应承担责任。",
            explanation:
              "正确。多次明确提醒、便利可行的保护措施及因果关系均有事实支持。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-bounded-gaps-estate-ignored-leak",
        relatedTopicIds: ["civil-estate-administrator"],
        facts:
          "2026年9月，继承人一致推选沈禾为遗产管理人，沈禾同意免费管理。遗产仓库的保管员三次提醒他：屋顶破损，雨水正流向一箱画作；隔壁有空置干燥房，可以立即免费转移。沈禾收到现场照片后仍回复“等分遗产时再说”，接下来数日既未转移也未遮盖，最终画作严重受潮。经查，及时转移就能避免这次损失。沈禾认为自己未收费，不应赔偿。",
        hint: "先回答设问，再说明案情理由。",
        reference:
          "不能。沈禾有保护遗产的职责，收到多次漏雨提醒，又能方便地免费转移，却一直不处理，造成了本可避免的损失，属于重大过失，应承担赔偿责任。免费管理不能免除这项责任。",
        sources: ["civil-gap-estate-code"],
        id: "civil-bounded-gaps-estate-ignored-leak-written",
        kind: "subjective",
        title: "管理遗产时放着漏雨不管（自由作答）",
        prompt:
          "沈禾能否以免费管理为由免除这次画作损失的责任？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-bounded-gaps-estate-preservation-duty",
            label: "未履行必要保护职责",
            meaning:
              "联系反复提醒和可免费转移仍不处理，指出违反遗产保护义务且达到重大过失。",
            acceptable: "认可意思清楚的日常表达，不要求逐字背诵术语或条号。",
            boundary: "不因一次普通保管疏漏便推定所有损失都须管理人赔偿。",
          },
          {
            id: "civil-bounded-gaps-estate-liability-unpaid",
            label: "应赔偿且免费不免责",
            meaning:
              "联系及时转移即可避免的损失，认定应承担责任，否定免费即免责。",
            acceptable: "认可意思清楚的日常表达，不要求逐字背诵术语或条号。",
            boundary: "不要求计算损失金额、报酬或各继承人份额。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-divorce-property-compensation",
    title: "离婚时的补偿与财产分割",
    headline: "家务付出较多可请求补偿，隐藏共同财产可能少分或不分。",
    goal: "周序这两个理由能否排除沈清的补偿请求？",
    prerequisite: "知道本节涉及的当事人及基本法律关系。",
    minutes: "约8分钟",
    paragraphs: [
      "一方因育儿、照料老人、协助另一方工作等承担较多义务，离婚时可以请求补偿。共同财产已经分割，也不当然排除这项请求。",
      "补偿看投入的时间、精力、对双方的影响、对方给付能力等具体情况。法律没有统一的家务年薪或补偿比例。",
      "隐藏、转移共同财产，离婚分割时可以少分或者不分。应先把隐藏财产查清并纳入分割，再评价行为后果。",
    ],
    example: {
      title: "分过共同财产还可请求补偿吗",
      facts:
        "沈清与周序于2026年9月诉讼离婚。婚后七年，沈清为接送和照顾两个孩子缩短工作时间，主要承担孩子就医、学校事务和家中老人的日常照料，周序则长期在外地工作。这些情况有双方聊天记录和就医、学校材料证明。双方没有约定分别财产制，共同财产已依法分割。沈清另请求补偿，周序只以“已经分过财产、又不是分别财产制”为由拒绝。",
      analysis:
        "不能。沈清多年承担了较多育儿、照料老人的义务，离婚时可以请求周序补偿。这项请求不以分别财产制为前提，也不因已分共同财产就消失；具体金额可先协商，协商不成由法院结合付出等情况确定。",
    },
    pitfall: "把补偿限于分别财产制，或认为转走的钱还回来就不再影响分割。",
    recall: {
      prompt: "共同财产制下已分了财产，承担较多家庭义务的一方还能请求补偿吗？",
      reference: "可以。补偿针对较多家庭义务的付出，不以分别财产制为前提。",
    },
    sources: ["civil-gap-divorce-code", "civil-gap-divorce-interpretation"],
    exercises: [
      {
        caseId: "civil-bounded-gaps-divorce-extra-housework",
        relatedTopicIds: ["civil-divorce-property-compensation"],
        facts:
          "沈清与周序于2026年9月诉讼离婚。婚后七年，沈清为接送和照顾两个孩子缩短工作时间，主要承担孩子就医、学校事务和家中老人的日常照料，周序则长期在外地工作。这些情况有双方聊天记录和就医、学校材料证明。双方没有约定分别财产制，共同财产已依法分割。沈清另请求补偿，周序只以“已经分过财产、又不是分别财产制”为由拒绝。",
        hint: "先回答设问，再说明案情理由。",
        reference:
          "不能。沈清多年承担了较多育儿、照料老人的义务，离婚时可以请求周序补偿。这项请求不以分别财产制为前提，也不因已分共同财产就消失；具体金额可先协商，协商不成由法院结合付出等情况确定。",
        sources: ["civil-gap-divorce-code", "civil-gap-divorce-interpretation"],
        id: "civil-bounded-gaps-divorce-extra-housework-choice",
        kind: "objective",
        choiceMode: "single",
        title: "分过共同财产还可请求补偿吗（单选）",
        prompt: "周序这两个理由能否排除沈清的补偿请求？",
        options: [
          {
            id: "a",
            text: "不能；沈清承担较多家庭义务，可以另请求补偿。",
            explanation: "正确。共同财产制和已分财产都不当然排除1088条补偿。",
          },
          {
            id: "b",
            text: "能；只有约定各自财产各自所有的夫妻才可请求补偿。",
            explanation: "这是错误沿用旧制度的限制，民法典1088条没有该前提。",
          },
          {
            id: "c",
            text: "能；只要分过共同财产，所有家庭义务付出都不得再补偿。",
            explanation: "分割共同财产与家务劳动补偿是不同问题。",
          },
          {
            id: "d",
            text: "不能；所以法院必须把周序婚后全部收入都作为补偿交给沈清。",
            explanation: "请求权成立不等于补偿金额自动等于另一方全部收入。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-bounded-gaps-divorce-extra-housework",
        relatedTopicIds: ["civil-divorce-property-compensation"],
        facts:
          "沈清与周序于2026年9月诉讼离婚。婚后七年，沈清为接送和照顾两个孩子缩短工作时间，主要承担孩子就医、学校事务和家中老人的日常照料，周序则长期在外地工作。这些情况有双方聊天记录和就医、学校材料证明。双方没有约定分别财产制，共同财产已依法分割。沈清另请求补偿，周序只以“已经分过财产、又不是分别财产制”为由拒绝。",
        hint: "先回答设问，再说明案情理由。",
        reference:
          "不能。沈清多年承担了较多育儿、照料老人的义务，离婚时可以请求周序补偿。这项请求不以分别财产制为前提，也不因已分共同财产就消失；具体金额可先协商，协商不成由法院结合付出等情况确定。",
        sources: ["civil-gap-divorce-code", "civil-gap-divorce-interpretation"],
        id: "civil-bounded-gaps-divorce-extra-housework-written",
        kind: "subjective",
        title: "分过共同财产还可请求补偿吗（自由作答）",
        prompt: "周序这两个理由能否排除沈清的补偿请求？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-bounded-gaps-divorce-compensation-grounds",
            label: "承担较多家庭义务可请求补偿",
            meaning:
              "联系长期育儿、照料老人及工作时间减少，说明沈清可以请求补偿。",
            acceptable: "认可意思清楚的日常表达，不要求逐字背诵术语或条号。",
            boundary:
              "不要求一方完全无业；也不把付出较多等同对方必有离婚过错。",
          },
          {
            id: "civil-bounded-gaps-divorce-compensation-independent",
            label: "共同制和分割不排除补偿",
            meaning: "否定分别财产制限制及已分财产即排除请求的说法。",
            acceptable: "认可意思清楚的日常表达，不要求逐字背诵术语或条号。",
            boundary: "不要求预定金额；不与困难帮助或过错损害赔偿混算。",
          },
        ],
      },
      {
        caseId: "civil-bounded-gaps-divorce-hidden-savings",
        relatedTopicIds: ["civil-divorce-property-compensation"],
        facts:
          "2026年9月，许言与林晴的离婚诉讼正在审理。许言把婚后积蓄的共同存款30万元转到哥哥账户，请哥哥暂存，并在财产申报表中写“无其他存款”。转账聊天记录写着“等离完再还给我”。林晴查到银行流水和这些记录，证明并不存在许言所称的借款偿还。许言随后同意把钱转回，主张这样就应和没有隐藏行为时完全一样分割。",
        hint: "先回答设问，再说明案情理由。",
        reference:
          "这30万元应纳入夫妻共同财产分割。许言为把钱留给自己而转账隐瞒，法院可以让他少分或者不分；把钱转回，不会自动抹去隐藏行为的分割后果。",
        sources: ["civil-gap-divorce-code"],
        id: "civil-bounded-gaps-divorce-hidden-savings-choice",
        kind: "objective",
        choiceMode: "single",
        title: "把共同存款转给亲属隐瞒（单选）",
        prompt: "法院分割共同财产时，应如何处理这30万元和许言的隐藏行为？",
        options: [
          {
            id: "a",
            text: "哥哥收到款后就变成个人财产，林晴不能请求分割。",
            explanation: "转到他人账户暂存不会改变本案共同财产性质。",
          },
          {
            id: "b",
            text: "只要钱已转回，就必须与没有隐藏行为时完全相同分割。",
            explanation: "追回财产不当然消除1092条下可少分不分的后果。",
          },
          {
            id: "c",
            text: "把30万元纳入分割，并可因许言隐藏财产让其少分或不分。",
            explanation: "正确。财产归属与隐藏行为造成的分割后果都需处理。",
          },
          {
            id: "d",
            text: "只要隐藏过一笔钱，法院就必须让许言对全部共同财产一分不得。",
            explanation:
              "1092条规定可以少分或者不分，不是所有案件自动适用唯一比例。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-bounded-gaps-divorce-hidden-savings",
        relatedTopicIds: ["civil-divorce-property-compensation"],
        facts:
          "2026年9月，许言与林晴的离婚诉讼正在审理。许言把婚后积蓄的共同存款30万元转到哥哥账户，请哥哥暂存，并在财产申报表中写“无其他存款”。转账聊天记录写着“等离完再还给我”。林晴查到银行流水和这些记录，证明并不存在许言所称的借款偿还。许言随后同意把钱转回，主张这样就应和没有隐藏行为时完全一样分割。",
        hint: "先回答设问，再说明案情理由。",
        reference:
          "这30万元应纳入夫妻共同财产分割。许言为把钱留给自己而转账隐瞒，法院可以让他少分或者不分；把钱转回，不会自动抹去隐藏行为的分割后果。",
        sources: ["civil-gap-divorce-code"],
        id: "civil-bounded-gaps-divorce-hidden-savings-written",
        kind: "subjective",
        title: "把共同存款转给亲属隐瞒（自由作答）",
        prompt:
          "法院分割共同财产时，应如何处理这30万元和许言的隐藏行为？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-bounded-gaps-divorce-hidden-common-estate",
            label: "隐藏款仍属共同财产",
            meaning: "联系婚后共同积蓄和亲属暂存，说明30万元仍须纳入分割。",
            acceptable: "认可意思清楚的日常表达，不要求逐字背诵术语或条号。",
            boundary: "不扩展到真实偿债、赠与有效性或债权人撤销诉讼。",
          },
          {
            id: "civil-bounded-gaps-divorce-hidden-consequence",
            label: "可少分不分且返还不当然消除",
            meaning: "指出隐藏财产可导致许言少分或不分，转回不自动排除此后果。",
            acceptable: "认可意思清楚的日常表达，不要求逐字背诵术语或条号。",
            boundary:
              "认可依法裁量的表述，不要求固定扣减比例，也不接受必然全部没收。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-network-provider-duty",
    title: "网络服务者的通知与反通知",
    headline: "通知后要及时处理，反通知也要转送并留出合理维权时间。",
    goal: "青岸平台需否承担责任，责任范围是什么？",
    prerequisite: "知道本节涉及的当事人及基本法律关系。",
    minutes: "约8分钟",
    paragraphs: [
      "权利人通知平台处理侵权内容，要附侵权初步证据和真实身份信息。平台应及时转送通知，并按证据与服务类型采取必要措施。",
      "平台未及时处理，造成损害扩大，应就扩大部分与发帖人承担连带责任。不能一概说内容由用户发布，平台就不用管。",
      "用户可提交不侵权声明、初步证据和真实身份信息。平台须转送权利人；声明到达后的合理期限内未收到已投诉或起诉通知，才应及时终止原措施。",
    ],
    example: {
      title: "投诉后平台一直不处理",
      facts:
        "2026年9月，用户程某在青岸平台发帖公开宋宁未公开的家庭住址和私人电话。宋宁通过平台投诉入口提交真实身份信息、准确链接、帖子截图及其私人信息来源材料，请求删除。平台确认已收到，工作人员也确认这些内容可以立即屏蔽，却连续十日未转送投诉、未采取任何措施，帖子继续传播，宋宁遭受新增骚扰和损失。现已查明该帖侵权，且平台及时屏蔽本可避免上述新增损害。",
      analysis:
        "需要。宋宁已提交身份和侵权初步证据，平台能够及时处理却一直不处理，造成损害扩大。平台应对这部分扩大损害，与程某承担连带责任；不是仅因帖子由用户发布就免责。",
    },
    pitfall: "把所有损害都自动算给平台，或一收到反通知就立即恢复内容。",
    recall: {
      prompt: "收到用户不侵权声明，就应立即恢复被删内容吗？",
      reference:
        "不能。先转送权利人并告知维权途径，再按法定的合理期限规则处理。",
    },
    sources: ["civil-gap-network-code", "civil-gap-network-interpretation"],
    exercises: [
      {
        caseId: "civil-bounded-gaps-network-notice-expanding-loss",
        relatedTopicIds: ["civil-network-provider-duty"],
        facts:
          "2026年9月，用户程某在青岸平台发帖公开宋宁未公开的家庭住址和私人电话。宋宁通过平台投诉入口提交真实身份信息、准确链接、帖子截图及其私人信息来源材料，请求删除。平台确认已收到，工作人员也确认这些内容可以立即屏蔽，却连续十日未转送投诉、未采取任何措施，帖子继续传播，宋宁遭受新增骚扰和损失。现已查明该帖侵权，且平台及时屏蔽本可避免上述新增损害。",
        hint: "先回答设问，再说明案情理由。",
        reference:
          "需要。宋宁已提交身份和侵权初步证据，平台能够及时处理却一直不处理，造成损害扩大。平台应对这部分扩大损害，与程某承担连带责任；不是仅因帖子由用户发布就免责。",
        sources: ["civil-gap-network-code", "civil-gap-network-interpretation"],
        id: "civil-bounded-gaps-network-notice-expanding-loss-choice",
        kind: "objective",
        choiceMode: "single",
        title: "投诉后平台一直不处理（单选）",
        prompt: "青岸平台需否承担责任，责任范围是什么？",
        options: [
          {
            id: "a",
            text: "不需要，因为平台不是帖子作者就不承担任何责任。",
            explanation: "通知后平台仍负有及时转送并采取必要措施的义务。",
          },
          {
            id: "b",
            text: "需要，平台对未及时处理造成的扩大损害与程某承担连带责任。",
            explanation:
              "正确。通知、未及时措施和新增损害的因果关系均已有事实。",
          },
          {
            id: "c",
            text: "需要，所以平台自动对通知前后全部损害承担全部赔偿。",
            explanation:
              "本题按1195条考通知后未及时处理造成的扩大损害，不能自动扩大到全部。",
          },
          {
            id: "d",
            text: "不需要，必须先取得法院判决再通知，平台才需要处理。",
            explanation: "通知可附初步证据，不以已有胜诉判决为前提。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-bounded-gaps-network-notice-expanding-loss",
        relatedTopicIds: ["civil-network-provider-duty"],
        facts:
          "2026年9月，用户程某在青岸平台发帖公开宋宁未公开的家庭住址和私人电话。宋宁通过平台投诉入口提交真实身份信息、准确链接、帖子截图及其私人信息来源材料，请求删除。平台确认已收到，工作人员也确认这些内容可以立即屏蔽，却连续十日未转送投诉、未采取任何措施，帖子继续传播，宋宁遭受新增骚扰和损失。现已查明该帖侵权，且平台及时屏蔽本可避免上述新增损害。",
        hint: "先回答设问，再说明案情理由。",
        reference:
          "需要。宋宁已提交身份和侵权初步证据，平台能够及时处理却一直不处理，造成损害扩大。平台应对这部分扩大损害，与程某承担连带责任；不是仅因帖子由用户发布就免责。",
        sources: ["civil-gap-network-code", "civil-gap-network-interpretation"],
        id: "civil-bounded-gaps-network-notice-expanding-loss-written",
        kind: "subjective",
        title: "投诉后平台一直不处理（自由作答）",
        prompt: "青岸平台需否承担责任，责任范围是什么？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-bounded-gaps-network-notice-duty",
            label: "通知后未及时采取措施",
            meaning:
              "联系身份、准确链接和初步证据齐备，平台能屏蔽却持续不处理，说明违反通知后的处理义务。",
            acceptable: "认可意思清楚的日常表达，不要求逐字背诵术语或条号。",
            boundary:
              "不设统一必须几小时删除，也不把一切投诉自动当作必须永久删除。",
          },
          {
            id: "civil-bounded-gaps-network-expanded-joint-liability",
            label: "扩大损害承担连带责任",
            meaning: "说明平台对未及时措施造成的扩大损害与用户连带负责。",
            acceptable: "认可意思清楚的日常表达，不要求逐字背诵术语或条号。",
            boundary:
              "本题限1195条通知路径，不因抽象应知推定其对全部原始损害负责。",
          },
        ],
      },
      {
        caseId: "civil-bounded-gaps-network-counter-notice-order",
        relatedTopicIds: ["civil-network-provider-duty"],
        facts:
          "2026年9月，孟安向青岸平台投诉用户李青发布的一组照片未经其许可，平台依通知暂时屏蔽。李青随即提交不存在侵权的书面声明、本人真实身份信息及双方授权使用照片的聊天记录，足以作为不侵权的初步证据。平台尚未把这些材料转给孟安，也未告知孟安投诉或起诉的途径，工作人员就准备当天直接恢复照片，理由是“用户已经反对，平台这边流程就结束了”。",
        hint: "先回答设问，再说明案情理由。",
        reference:
          "不能立即恢复。平台应先把声明转送孟安，并告知她可以投诉或起诉。自声明到达孟安后，在合理期限内未收到她已经投诉或起诉的通知，才应及时终止屏蔽措施。",
        sources: ["civil-gap-network-code"],
        id: "civil-bounded-gaps-network-counter-notice-order-choice",
        kind: "objective",
        choiceMode: "single",
        title: "收到反通知后怎么处理（单选）",
        prompt: "平台能否收到这份声明就立即恢复照片？应按什么顺序处理？",
        options: [
          {
            id: "a",
            text: "可以，只要李青反对，原通知和屏蔽措施立即全部失效。",
            explanation: "反通知启动后续转送和期限程序，不会一收到就当然恢复。",
          },
          {
            id: "b",
            text: "不能，任何通知一旦提交，相关内容都必须永久屏蔽。",
            explanation: "1196条规定了符合条件时及时终止措施的机制。",
          },
          {
            id: "c",
            text: "不能，必须等待孟安书面同意恢复，永远不受合理期限约束。",
            explanation:
              "权利人合理期限内未通知已投诉或起诉，也会触发终止措施规则。",
          },
          {
            id: "d",
            text: "不能立即恢复；应先转送孟安并告知维权途径，再依合理期限规则决定何时终止措施。",
            explanation: "正确。收到反通知与可以立即终止措施不是同一时点。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-bounded-gaps-network-counter-notice-order",
        relatedTopicIds: ["civil-network-provider-duty"],
        facts:
          "2026年9月，孟安向青岸平台投诉用户李青发布的一组照片未经其许可，平台依通知暂时屏蔽。李青随即提交不存在侵权的书面声明、本人真实身份信息及双方授权使用照片的聊天记录，足以作为不侵权的初步证据。平台尚未把这些材料转给孟安，也未告知孟安投诉或起诉的途径，工作人员就准备当天直接恢复照片，理由是“用户已经反对，平台这边流程就结束了”。",
        hint: "先回答设问，再说明案情理由。",
        reference:
          "不能立即恢复。平台应先把声明转送孟安，并告知她可以投诉或起诉。自声明到达孟安后，在合理期限内未收到她已经投诉或起诉的通知，才应及时终止屏蔽措施。",
        sources: ["civil-gap-network-code"],
        id: "civil-bounded-gaps-network-counter-notice-order-written",
        kind: "subjective",
        title: "收到反通知后怎么处理（自由作答）",
        prompt:
          "平台能否收到这份声明就立即恢复照片？应按什么顺序处理？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-bounded-gaps-network-counter-transfer",
            label: "先转送并告知维权途径",
            meaning:
              "指出应把声明转送原权利人并告知可投诉或起诉，不能略过该步。",
            acceptable: "认可意思清楚的日常表达，不要求逐字背诵术语或条号。",
            boundary:
              "题设声明具备真实身份和初步证据，不要求平台先作实体终局裁判。",
          },
          {
            id: "civil-bounded-gaps-network-counter-reasonable-period",
            label: "到达后合理期限决定终止",
            meaning:
              "说明自声明到达权利人后合理期限未收到已投诉或起诉通知，才应及时终止措施，否定立即恢复。",
            acceptable: "认可意思清楚的日常表达，不要求逐字背诵术语或条号。",
            boundary: "不用统一十五日、三日等数字替代民法典1196的合理期限。",
          },
        ],
      },
    ],
  },
];

export const civilBoundedGapsChapters = [
  {
    id: "CIV-GUARDIANSHIP",
    title: "监护人的确定与职责",
    section: "民法",
    topicIds: ["civil-guardianship-selection-duty"],
  },
  {
    id: "CIV-MISTAKE-UNFAIRNESS",
    title: "重大误解与显失公平",
    section: "民法",
    topicIds: ["civil-mistake-unfairness"],
  },
  {
    id: "CIV-DECLARATIONS",
    title: "宣告失踪与宣告死亡",
    section: "民法",
    topicIds: ["civil-disappearance-death"],
  },
  {
    id: "CIV-CONDITION-TERM",
    title: "法律行为的条件与期限",
    section: "民法",
    topicIds: ["civil-condition-term-effects"],
  },
  {
    id: "CIV-ORGANIZATIONS",
    title: "法人和非法人组织",
    section: "民法",
    topicIds: ["civil-legal-nonlegal-organizations"],
  },
  {
    id: "CIV-TENDER-DEPOSIT",
    title: "债务消灭：提存",
    section: "民法",
    topicIds: ["civil-deposit-discharge"],
  },
  {
    id: "CIV-ENERGY-SUPPLY",
    title: "供用电、水、气、热力合同",
    section: "民法",
    topicIds: ["civil-energy-supply-duty"],
  },
  {
    id: "CIV-CONDOMINIUM",
    title: "建筑物区分所有权",
    section: "民法",
    topicIds: ["civil-condominium-common-management"],
  },
  {
    id: "CIV-ADOPTION",
    title: "收养的成立与同意",
    section: "民法",
    topicIds: ["civil-adoption-formation"],
  },
  {
    id: "CIV-ESTATE-ADMINISTRATOR",
    title: "遗产管理人的确定与职责",
    section: "民法",
    topicIds: ["civil-estate-administrator"],
  },
  {
    id: "CIV-DIVORCE-PROPERTY",
    title: "离婚时的补偿与财产分割",
    section: "民法",
    topicIds: ["civil-divorce-property-compensation"],
  },
  {
    id: "CIV-NETWORK-PROVIDER",
    title: "网络服务者的通知与反通知",
    section: "民法",
    topicIds: ["civil-network-provider-duty"],
  },
];

export const civilBoundedGapsExercises = civilBoundedGapsTopics.flatMap(
  (topic) => topic.exercises,
);
export const civilBoundedGapsContentPack = {
  revision: civilBoundedGapsRevision,
  snapshot: {
    topics: civilBoundedGapsTopics,
    sources: civilBoundedGapsSources,
  },
};
export const civilBoundedGapsDefaultQueues = {
  objective: civilBoundedGapsExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilBoundedGapsExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilBoundedGapsQuestion(id: string) {
  const question = civilBoundedGapsExercises.find((q) => q.id === id);
  return question ? structuredClone(question) : undefined;
}
export function civilBoundedGapsTopicForQuestion(id: string) {
  return civilBoundedGapsTopics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function civilBoundedGapsSameCaseQuestions(id: string) {
  const question = civilBoundedGapsQuestion(id);
  return question
    ? structuredClone(
        civilBoundedGapsExercises.filter((q) => q.caseId === question.caseId),
      )
    : [];
}
export function civilBoundedGapsChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = civilBoundedGapsChapters.find((c) => c.id === chapterId);
  return chapter
    ? civilBoundedGapsTopics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}
