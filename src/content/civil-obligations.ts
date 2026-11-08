import type { ContentSources, FaultTopic } from "./fault-unit";

// Original fictional cases. Paired forms share facts, not independent outcomes.
export const civilObligationsRevision = "civil-obligations-2026-10-22.v1";

export const civilObligationsSources: ContentSources = {
  "civil-obligation-preservation-subrogation-code": {
    title: "《民法典》第535条：债权人代位权",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-22直接读取最高法转载法典；2021-01-01施行。限普通到期债权及债务人对相对人的到期金钱债权，行使范围以债权人的到期债权为限；专属权利除外，不展开第536条未到期债权特殊保全。",
  },
  "civil-obligation-preservation-subrogation-2023": {
    title: "合同编通则解释第33、34条：怠于行使与专属权利",
    url: "https://policy.mofcom.gov.cn/claw/clawContent.shtml?id=98680",
    note: "法释〔2023〕13号，2023-12-04公布、2023-12-05施行；2026-10-22实际读取商务部官方转载，页面信息来源为最高人民法院网、标示现行有效。最高法主站两次超时，国际商事法庭入口重定向失败，天津海事法院转载超时；不将失败入口的搜索摘要算作已读正文。",
  },
  "civil-obligation-preservation-revocation-code": {
    title: "《民法典》第538—541条：债权人撤销权及期间",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-22直接读取第538—541条。两案均有处分前已存在的债权，处分影响债权实现，并于处分当年数月内起诉。无偿处分不以受赠人知情为必要；明显低价有偿处分还需相对人知道或应当知道。只判断能否请求法院撤销，不增加费用或执行分配。",
  },
  "civil-obligation-preservation-revocation-2023": {
    title: "合同编通则解释第42条：明显不合理价格的判断",
    url: "https://policy.mofcom.gov.cn/claw/clawContent.shtml?id=98680",
    note: "2026-10-22实际读取商务部官方转载第42条。以交易当地通常判断、市场价或指导价作参照；低于70%一般可认定，不能把任何折扣都判成明显不合理。本案用正常市价10万元、售价2万元及相对人明确知情的事实，不考关联交易或比例临界点。",
  },
  "civil-obligation-assignment-notice": {
    title: "《民法典》第545、546条：债权转让与通知",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-22直接核读最高法所载法典全文；2020-05-28通过、2021-01-01施行。题设为可转让的普通借款债权，通知由原债权人发出并到达；区分转让本身与对债务人生效，不考受让人诉讼通知、重复转让、限制转让条款或保理。",
  },
  "civil-obligation-assignment-defense": {
    title: "《民法典》第548、549条：转让后的抗辩与抵销",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-22核读第548、549条。已偿还部分可向受让人提出；抵销案例给明接到通知时已有对让与人的普通金钱债权，且先于所转让债权到期，不考恶意取得或同一合同的另一种抵销路径。",
  },
  "civil-obligation-setoff-notice": {
    title: "《民法典》第568条：法定抵销的通知",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-22直接核读第568条。案例中双方金钱债务均已到期，无不得抵销约定或特殊性质，明确无条件抵销通知已到达受让人；不把仅持有反向债权写成抵销自动完成。",
  },
  "civil-obligation-debt-transfer": {
    title: "《民法典》第551条：债务转移须债权人同意",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-22直接核读第551条及同页第552条作区分。题设明确是由第三人全部替换原债务人的安排，不是债务加入；催告后的沉默视为不同意。有效同意后的题目只问原债务人是否仍负该笔债务，不涉及独立担保或同意效力瑕疵。",
  },
  "civil-obligation-debt-joining": {
    title: "《民法典》第552条：债务加入及承担范围",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-22直接核读第552条。以明确保留原债务人责任、第三人直接承诺共同偿还的表达排除保证歧义；分别给出债权人接受及收到通知翌日明确拒绝。只问加入范围内的连带清偿，不扩张到债权人重复受偿。",
  },
  "civil-obligation-assignment-notice-2023": {
    title: "合同编通则解释第48条：通知前后的履行对象",
    url: "https://policy.mofcom.gov.cn/claw/clawContent.shtml?id=98680",
    note: "法释〔2023〕13号，2023-12-05施行；2026-10-22直接读取商务部转载的最高法原文第48条及其现行有效元数据，明确通知前向让与人履行可对抗受让人。本组不考直接起诉送达起诉状的通知方式。",
  },
};

export const civilObligationsTopics: FaultTopic[] = [
  {
    id: "civil-preservation-subrogation",
    title: "普通代位权与专属权利",
    headline:
      "债务人不追索自己的债权，可能影响你的到期债权；但不是任何权利都能代位。",
    goal: "联系到期、怠于行使与影响实现判断能否代位，并守住范围和专属权利边界。",
    prerequisite: "能区分债权人、债务人和债务人的相对人。",
    minutes: "6–10",
    paragraphs: [
      "债务人怠于行使自己对相对人的债权，影响债权人的到期债权实现，债权人可以向法院请求以自己的名义代位行使。债务人未还到期债务，又未以诉讼或仲裁追索，致债权人的到期债权不能实现，可以认定为这里的怠于行使；不能只凭发过催款信息就排除。",
      "代位行使范围以债权人自己的到期债权为限，也不能超过债务人对相对人原有的权利。赡养费等专属于债务人自身的权利不适用代位；不能把所有到期金钱请求都当成可代位。",
    ],
    example: {
      title: "两笔到期债权之间",
      facts:
        "本案为原创教学虚构。2026年1月，丁原向周澄借款6万元，款已交付，约定3月1日归还。丁原另向秦越出售一批家具，9万元货款于2月1日到期；秦越承认欠款且有能力支付。至4月丁原仍未还周澄。周澄多次请他追索，丁原只给秦越发催款信息，既未起诉也未申请仲裁。经查，丁原除这笔货款外，没有其他可供清偿的财产。周澄拟以自己名义向法院请求秦越支付9万元。",
      analysis:
        "周澄可以以自己名义提起代位诉讼，但不能请求全部9万元，范围限于6万元。丁原未还到期借款，只发信息而未诉讼或仲裁追索到期货款，又无其他清偿财产，已影响周澄到期债权实现；普通货款债权也不属于专属权利。代位范围不得超过周澄自己的6万元到期债权。",
    },
    pitfall: "只见相对人欠款就请求全部金额，或漏掉专属权利的限制。",
    recall: {
      prompt: "普通代位权要先联系哪些事实，范围又受什么限制？",
      reference:
        "联系债权到期、债务人怠于行使及影响实现，向法院以自己名义行使；以自己的到期债权和债务人原有权利为限，专属权利除外。",
    },
    sources: [
      "civil-obligation-preservation-subrogation-code",
      "civil-obligation-preservation-subrogation-2023",
    ],
    exercises: [
      {
        caseId: "civil-obligation-case-subrogation-goods",
        relatedTopicIds: ["civil-preservation-subrogation"],
        facts:
          "本案为原创教学虚构。2026年1月，丁原向周澄借款6万元，款已交付，约定3月1日归还。丁原另向秦越出售一批家具，9万元货款于2月1日到期；秦越承认欠款且有能力支付。至4月丁原仍未还周澄。周澄多次请他追索，丁原只给秦越发催款信息，既未起诉也未申请仲裁。经查，丁原除这笔货款外，没有其他可供清偿的财产。周澄拟以自己名义向法院请求秦越支付9万元。",
        hint: "结合本案事实说明判断和理由即可。",
        sources: [
          "civil-obligation-preservation-subrogation-code",
          "civil-obligation-preservation-subrogation-2023",
        ],
        id: "civil-obligation-subrogation-goods-choice",
        kind: "objective",
        choiceMode: "single",
        title: "两笔到期债权之间",
        prompt: "关于周澄的代位请求，哪项判断正确？",
        options: [
          {
            id: "a",
            text: "周澄不是家具买卖合同当事人，不能提起代位诉讼。",
            explanation:
              "代位权允许债权人依法以自己的名义行使债务人对相对人的权利。",
          },
          {
            id: "b",
            text: "周澄可以代位，但范围以其6万元到期债权为限。",
            explanation:
              "本案到期、怠于行使及影响实现的事实具备，范围不因货款有9万元而扩大。",
          },
          {
            id: "c",
            text: "周澄可以代位请求全部9万元，因为丁原确有这笔货款债权。",
            explanation: "代位行使范围受债权人自己的到期债权限制。",
          },
          {
            id: "d",
            text: "丁原发过催款信息，就必然排除怠于行使，无须再看是否诉讼、仲裁及影响实现。",
            explanation:
              "未履行对债权人的到期债务，也未以诉讼或仲裁主张相对人债权，致到期债权不能实现，可认定怠于行使。",
          },
        ],
        answer: "b",
        reference:
          "选B。周澄可以以自己名义代位请求秦越履行，但范围限于6万元。丁原未偿还到期借款，也未通过诉讼或仲裁追索已到期货款，且没有其他清偿财产，影响周澄的到期债权实现；不能因货款有9万元就请求全部9万元。",
      },
      {
        caseId: "civil-obligation-case-subrogation-goods",
        relatedTopicIds: ["civil-preservation-subrogation"],
        facts:
          "本案为原创教学虚构。2026年1月，丁原向周澄借款6万元，款已交付，约定3月1日归还。丁原另向秦越出售一批家具，9万元货款于2月1日到期；秦越承认欠款且有能力支付。至4月丁原仍未还周澄。周澄多次请他追索，丁原只给秦越发催款信息，既未起诉也未申请仲裁。经查，丁原除这笔货款外，没有其他可供清偿的财产。周澄拟以自己名义向法院请求秦越支付9万元。",
        hint: "结合本案事实说明判断和理由即可。",
        sources: [
          "civil-obligation-preservation-subrogation-code",
          "civil-obligation-preservation-subrogation-2023",
        ],
        id: "civil-obligation-subrogation-goods-explain",
        kind: "subjective",
        title: "到期货款与出借人的诉请",
        prompt:
          "周澄能否以自己的名义提起代位诉讼？其请求秦越支付全部9万元能否获得支持？请说明。",
        answer: "",
        reference:
          "周澄可以以自己名义提起代位诉讼，但不能请求全部9万元，范围限于6万元。丁原未还到期借款，只发信息而未诉讼或仲裁追索到期货款，又无其他清偿财产，已影响周澄到期债权实现；普通货款债权也不属于专属权利。代位范围不得超过周澄自己的6万元到期债权。",
        criteria: [
          {
            id: "civil-obligation-subrogation-goods-basis",
            label: "联系怠于行使和影响实现判断代位",
            meaning:
              "联系借款及货款均到期、丁原未诉讼或仲裁追索且无其他清偿财产，说明周澄可向法院以自己名义代位行使该普通货款债权。",
            acceptable:
              "认可法律含义相同、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "不要求先取得对丁原的胜诉判决，也不要求管辖、当事人列明或执行程序。",
          },
          {
            id: "civil-obligation-subrogation-goods-limit",
            label: "以出借人的到期债权限制范围",
            meaning:
              "说明虽有9万元货款，周澄的代位范围仍限于自己的6万元到期债权，不能全额请求9万元。",
            acceptable:
              "认可法律含义相同、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不要求计算利息、费用或代位履行后的全部债权消灭关系。",
          },
        ],
      },
      {
        caseId: "civil-obligation-case-subrogation-support",
        relatedTopicIds: ["civil-preservation-subrogation"],
        facts:
          "本案为原创教学虚构。梁素向徐澈借款2万元，借款已交付，约定2026年5月1日归还，到期后未还。梁素的成年儿子柳安还欠她已到期的8000元赡养费，款项用于梁素日常基本生活。梁素一直没有起诉或申请仲裁追索，除该赡养费请求外也无其他可供清偿徐澈的财产。徐澈在6月拟以自己的名义代位向柳安请求支付这8000元。",
        hint: "结合本案事实说明判断和理由即可。",
        sources: [
          "civil-obligation-preservation-subrogation-code",
          "civil-obligation-preservation-subrogation-2023",
        ],
        id: "civil-obligation-subrogation-support-choice",
        kind: "objective",
        choiceMode: "single",
        title: "赡养费与另一笔到期借款",
        prompt: "徐澈能否代位行使这项赡养费请求权？",
        options: [
          {
            id: "a",
            text: "可以，凡是已经到期的金钱请求权都可以代位。",
            explanation: "金钱请求权也可能属于专属权利。",
          },
          {
            id: "b",
            text: "可以，只要债务人没有其他财产，就不再受专属权利限制。",
            explanation: "影响债权实现不能排除专属权利的法定限制。",
          },
          {
            id: "c",
            text: "不能，赡养费请求权属于专属于梁素自身的权利。",
            explanation: "第535条排除专属权利，解释第34条列明赡养费请求权。",
          },
          {
            id: "d",
            text: "不能，因为徐澈自己的2万元借款尚未到期。",
            explanation: "题设借款已于5月1日到期，不能靠改写事实得出结论。",
          },
        ],
        answer: "c",
        reference:
          "选C。徐澈不能代位行使该赡养费请求权。虽然借款已到期、梁素也未追索，但赡养费请求权专属于梁素自身，不能仅因它也是金钱请求或梁素缺少财产，就用代位权行使。",
      },
      {
        caseId: "civil-obligation-case-subrogation-support",
        relatedTopicIds: ["civil-preservation-subrogation"],
        facts:
          "本案为原创教学虚构。梁素向徐澈借款2万元，借款已交付，约定2026年5月1日归还，到期后未还。梁素的成年儿子柳安还欠她已到期的8000元赡养费，款项用于梁素日常基本生活。梁素一直没有起诉或申请仲裁追索，除该赡养费请求外也无其他可供清偿徐澈的财产。徐澈在6月拟以自己的名义代位向柳安请求支付这8000元。",
        hint: "结合本案事实说明判断和理由即可。",
        sources: [
          "civil-obligation-preservation-subrogation-code",
          "civil-obligation-preservation-subrogation-2023",
        ],
        id: "civil-obligation-subrogation-support-explain",
        kind: "subjective",
        title: "出借人对赡养费提出的请求",
        prompt:
          "徐澈认为“借款和赡养费都到期，梁素又不追，我就能代位”，是否成立？请说明。",
        answer: "",
        reference:
          "不成立。赡养费请求权属于专属于梁素自身的权利，依法不能由徐澈代位行使。借款到期、梁素没有追索及缺少其他清偿财产，都不能替代或排除这一限制。",
        criteria: [
          {
            id: "civil-obligation-subrogation-support-exclusive",
            label: "联系赡养费的专属性否定代位",
            meaning:
              "指出所请求的是梁素自身的赡养费，属于专属权利，不能仅凭两项债权到期、怠于追索或无其他财产而代位。",
            acceptable:
              "认可法律含义相同、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "只判断代位权，不要求讨论其他追债方式或赡养费执行问题。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-preservation-revocation",
    title: "无偿处分与明显低价处分的撤销",
    headline: "财产流出影响还债，要分清是否有偿，再判断相对人知情条件。",
    goal: "根据处分前的债权、责任财产变化与相对人所知判断撤销条件。",
    prerequisite: "知道债权人撤销与合同当事人因欺诈等撤销是不同问题。",
    minutes: "6–10",
    paragraphs: [
      "债务人无偿转让财产、放弃债权等，影响债权人的债权实现，债权人可以请求法院撤销。无偿赠与不以受赠人知道欠款或财产不足为必要，不能仅因受赠人不知情就拒绝保护已有债权。",
      "明显不合理低价转让财产等有偿处分，除影响债权实现外，还要求相对人知道或者应当知道该情形。价格是否明显不合理，要结合交易当地的市场价格等判断，不能把任何折扣都当成可撤销。",
      "撤销权应自知道或者应当知道撤销事由之日起一年内行使；从行为发生起五年内未行使，撤销权消灭。债权人应依法请求法院撤销，不能直接把受让财产拿来归自己所有。",
    ],
    example: {
      title: "设备赠与后的借款清偿",
      facts:
        "本案为原创教学虚构。2026年1月，程屿向向晴借款6万元，款已交付，约定4月30日归还。3月10日，程屿把自己一台价值6万元的设备无偿赠与陆乙并交付；陆乙受赠时不知道程屿欠向晴的钱，也不知道其财产情况。赠与后程屿没有其他可用于清偿的财产，借款到期仍未还。向晴5月1日得知赠与及财产情况，6月1日向法院请求撤销这次赠与。",
      analysis:
        "向晴可以请求法院撤销这次赠与，陆乙不知情不足以阻止。借款债权1月已经存在，程屿3月无偿送出设备后无其他清偿财产，已影响债权实现；这种无偿处分不以受赠人知道欠款为条件。6月起诉仍在法定撤销期间内。",
    },
    pitfall:
      "无偿赠与也要求受赠人知情，或者有偿低价时只看打折、不看影响与相对人知情。",
    recall: {
      prompt: "赠与与明显低价出售影响债权实现时，知情条件怎样区分？",
      reference:
        "无偿赠与不以受赠人知情为必要；明显低价有偿处分还要求相对人知道或应当知道。另须在知道事由后一年、行为发生后五年的界限内请求法院撤销。",
    },
    sources: [
      "civil-obligation-preservation-revocation-code",
      "civil-obligation-preservation-revocation-2023",
    ],
    exercises: [
      {
        caseId: "civil-obligation-case-revocation-gift",
        relatedTopicIds: ["civil-preservation-revocation"],
        facts:
          "本案为原创教学虚构。2026年1月，程屿向向晴借款6万元，款已交付，约定4月30日归还。3月10日，程屿把自己一台价值6万元的设备无偿赠与陆乙并交付；陆乙受赠时不知道程屿欠向晴的钱，也不知道其财产情况。赠与后程屿没有其他可用于清偿的财产，借款到期仍未还。向晴5月1日得知赠与及财产情况，6月1日向法院请求撤销这次赠与。",
        hint: "结合本案事实说明判断和理由即可。",
        sources: [
          "civil-obligation-preservation-revocation-code",
          "civil-obligation-preservation-revocation-2023",
        ],
        id: "civil-obligation-revocation-gift-choice",
        kind: "objective",
        choiceMode: "single",
        title: "设备赠与后的借款清偿",
        prompt: "关于向晴的撤销请求，哪项正确？",
        options: [
          {
            id: "a",
            text: "可以请求撤销，赠与使已存在债权难以实现，不以陆乙知情为必要。",
            explanation:
              "本案属于无偿处分，且债权在先、影响实现和行使期间均有事实支持。",
          },
          {
            id: "b",
            text: "不能请求撤销，必须证明陆乙知道欠款并有意帮助逃债。",
            explanation: "把有偿处分的相对人知情条件加给了本案无偿赠与。",
          },
          {
            id: "c",
            text: "不能请求撤销，因为赠与发生时借款尚未到期，向晴就没有可保护的债权。",
            explanation:
              "借款债权在赠与前已存在；第538条撤销不以处分时债权已到期为必要。",
          },
          {
            id: "d",
            text: "向晴无需请求法院撤销，可以直接把设备据为己有。",
            explanation: "撤销权不是直接取得受赠物所有权的依据。",
          },
        ],
        answer: "a",
        reference:
          "选A。向晴可以请求法院撤销赠与。其借款债权先于赠与存在，程屿无偿送出设备后无其他清偿财产，影响债权实现；无偿处分不要求受赠人陆乙知情。6月起诉也在知道事由后一年及行为发生后五年以内。",
      },
      {
        caseId: "civil-obligation-case-revocation-gift",
        relatedTopicIds: ["civil-preservation-revocation"],
        facts:
          "本案为原创教学虚构。2026年1月，程屿向向晴借款6万元，款已交付，约定4月30日归还。3月10日，程屿把自己一台价值6万元的设备无偿赠与陆乙并交付；陆乙受赠时不知道程屿欠向晴的钱，也不知道其财产情况。赠与后程屿没有其他可用于清偿的财产，借款到期仍未还。向晴5月1日得知赠与及财产情况，6月1日向法院请求撤销这次赠与。",
        hint: "结合本案事实说明判断和理由即可。",
        sources: [
          "civil-obligation-preservation-revocation-code",
          "civil-obligation-preservation-revocation-2023",
        ],
        id: "civil-obligation-revocation-gift-explain",
        kind: "subjective",
        title: "出借人对赠与设备的诉请",
        prompt:
          "向晴能否请求撤销赠与？陆乙主张自己受赠时不知道欠款，是否足以阻止撤销？请说明。",
        answer: "",
        reference:
          "向晴可以请求法院撤销这次赠与，陆乙不知情不足以阻止。借款债权1月已经存在，程屿3月无偿送出设备后无其他清偿财产，已影响债权实现；这种无偿处分不以受赠人知道欠款为条件。6月起诉仍在法定撤销期间内。",
        criteria: [
          {
            id: "civil-obligation-revocation-gift-basis",
            label: "联系既存债权与无偿处分的影响",
            meaning:
              "联系借款债权先存在、设备被无偿送出后无其他清偿财产，说明向晴可请求法院撤销。",
            acceptable:
              "认可法律含义相同、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "不要求分析直接取得设备、费用或后续执行；期间明显未届满，不要求精算末日。",
          },
          {
            id: "civil-obligation-revocation-gift-knowledge",
            label: "区分无偿处分的受赠人知情要求",
            meaning:
              "说明本案无偿赠与不以陆乙知道欠款或财产不足为必要，其不知情不能单独阻止撤销。",
            acceptable:
              "认可法律含义相同、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不把有偿低价处分的相对人知情条件加到本案。",
          },
        ],
      },
      {
        caseId: "civil-obligation-case-revocation-low-price",
        relatedTopicIds: ["civil-preservation-revocation"],
        facts:
          "本案为原创教学虚构。2026年1月，苏苗向宋启借款10万元，款已交付，约定4月30日归还。3月1日，苏苗将唯一可供清偿的设备以2万元卖给钱骁并交付；该设备状况正常，同型号同成色的当地市价为10万元，钱骁签约前已看过估价材料。苏苗同时向钱骁出示借款收据并明说：“还欠宋启10万元，卖掉后我只剩这2万元，其他财产没有，肯定还不上。”钱骁仍按2万元成交。借款到期未还，苏苗仅余2万元无其他清偿财产。宋启5月1日得知全部情况，6月1日起诉请求撤销该转让。",
        hint: "结合本案事实说明判断和理由即可。",
        sources: [
          "civil-obligation-preservation-revocation-code",
          "civil-obligation-preservation-revocation-2023",
        ],
        id: "civil-obligation-revocation-low-price-choice",
        kind: "objective",
        choiceMode: "single",
        title: "设备折价转让与既存借款",
        prompt: "关于宋启的撤销请求，哪项判断正确？",
        options: [
          {
            id: "a",
            text: "不能撤销，因为2万元也是真实支付，有对价的交易绝不适用撤销。",
            explanation: "有偿处分达到第539条条件时也可撤销。",
          },
          {
            id: "b",
            text: "只要价格略低于市价就能撤销，是否影响实现、钱骁是否知情都不重要。",
            explanation:
              "并非任何折扣都属于明显低价，还要结合影响实现及相对人知情。",
          },
          {
            id: "c",
            text: "必须证明钱骁与苏苗是亲属，才能撤销低价转让。",
            explanation: "亲属关系不是第539条一般适用的必要条件。",
          },
          {
            id: "d",
            text: "可以请求撤销，价格仅为市价20%，影响债权实现，钱骁还明确知道该情形。",
            explanation: "价格、财产不足及受让人知情的决定性事实均已给出。",
          },
        ],
        answer: "d",
        reference:
          "选D。宋启可以请求法院撤销。2万元仅为10万元市价的20%，属于明显不合理低价；转让后苏苗仅余2万元，无法清偿先已存在的10万元债权。钱骁看过收据并听到苏苗明确说明，知道转让将影响清偿，宋启又在法定期间内起诉。",
      },
      {
        caseId: "civil-obligation-case-revocation-low-price",
        relatedTopicIds: ["civil-preservation-revocation"],
        facts:
          "本案为原创教学虚构。2026年1月，苏苗向宋启借款10万元，款已交付，约定4月30日归还。3月1日，苏苗将唯一可供清偿的设备以2万元卖给钱骁并交付；该设备状况正常，同型号同成色的当地市价为10万元，钱骁签约前已看过估价材料。苏苗同时向钱骁出示借款收据并明说：“还欠宋启10万元，卖掉后我只剩这2万元，其他财产没有，肯定还不上。”钱骁仍按2万元成交。借款到期未还，苏苗仅余2万元无其他清偿财产。宋启5月1日得知全部情况，6月1日起诉请求撤销该转让。",
        hint: "结合本案事实说明判断和理由即可。",
        sources: [
          "civil-obligation-preservation-revocation-code",
          "civil-obligation-preservation-revocation-2023",
        ],
        id: "civil-obligation-revocation-low-price-explain",
        kind: "subjective",
        title: "出借人对设备出售的诉请",
        prompt:
          "宋启能否请求撤销转让？请联系成交价、苏苗剩余财产和钱骁签约前获知的情况说明。",
        answer: "",
        reference:
          "宋启可以请求法院撤销这次转让。售价2万元仅为正常市价10万元的20%，明显不合理；苏苗转让后只余2万元，影响其对宋启既存10万元债务的清偿。钱骁看过借款收据并听到苏苗说明无法还债，明知该情形仍购买，满足有偿低价处分的相对人知情要求。6月起诉未超过法定撤销期间。",
        criteria: [
          {
            id: "civil-obligation-revocation-low-price-effect",
            label: "联系明显低价及财产不足判断影响实现",
            meaning:
              "联系2万元对10万元市价、转让后仅余2万元及先已存在的10万元借款，说明这是影响债权实现的明显低价处分，可依法请求撤销。",
            acceptable:
              "认可法律含义相同、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不要求精算撤销末日或另答返还、费用和分配程序。",
          },
          {
            id: "civil-obligation-revocation-low-price-knowledge",
            label: "联系受让人获知的信息满足知情条件",
            meaning:
              "联系钱骁看过收据及苏苗明确说明无其他财产、不能还债，说明其知道处分影响宋启债权实现，不能只凭有低价就省略此条件。",
            acceptable:
              "认可法律含义相同、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "认可知道或应当知道的等义判断，不要求证明亲属关系或另行恶意串通。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-assignment-notice",
    title: "债权转让与通知",
    headline: "普通债权可以转让；通知到达后，债务人应向新债权人履行。",
    goal: "债权转让的通知，与债务人同意有什么区别？",
    prerequisite: "知道债权人可以请求债务人按约履行，能分清谁欠谁钱。",
    minutes: "6–10",
    paragraphs: [
      "债权转让是“谁有权收款”发生变化。普通借款债权通常可以转让，无须债务人先同意，但须向债务人通知。未通知时，这次转让对债务人不发生效力。",
      "债务人不知转让、通知前已向原债权人还款的，不应为同一笔债务再付一次。通知到达后，债务尚未清偿的，应向受让人履行；仍可提出原来依法享有的抗辩。",
    ],
    example: {
      title: "还款后才收到转让通知",
      facts:
        "本案为原创教学虚构。秦川借给陆宁3万元，双方约定2026年9月10日归还。9月1日秦川与余青签约，将这笔普通借款债权转让给余青，但两人均未向陆宁告知，陆宁也不知此事。9月10日陆宁依原约向秦川足额还款，并取得收条。9月12日陆宁才收到秦川的转让通知，余青随后要求陆宁再付3万元。",
      analysis:
        "余青不能要求陆宁再付。陆宁不知转让，收到通知前已按原约向秦川还清3万元，转让当时对陆宁不发生效力。余青不能让陆宁为同一笔借款付两次；余青与秦川之间如何结算另行处理。",
    },
    pitfall: "把“需要通知”误读成“需要批准”，或把没通知说成转让合同一概无效。",
    recall: {
      prompt: "债权转让的通知，与债务人同意有什么区别？",
      reference:
        "普通债权转让通常无须债务人同意；须通知债务人，转让才对其发生效力。",
    },
    sources: [
      "civil-obligation-assignment-notice",
      "civil-obligation-assignment-notice-2023",
    ],
    exercises: [
      {
        caseId: "CIV-OBLIGATION-NOTICE-PAID",
        facts:
          "本案为原创教学虚构。秦川借给陆宁3万元，双方约定2026年9月10日归还。9月1日秦川与余青签约，将这笔普通借款债权转让给余青，但两人均未向陆宁告知，陆宁也不知此事。9月10日陆宁依原约向秦川足额还款，并取得收条。9月12日陆宁才收到秦川的转让通知，余青随后要求陆宁再付3万元。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: [
          "civil-obligation-assignment-notice",
          "civil-obligation-assignment-notice-2023",
        ],
        id: "civil-obligation-notice-paid-choice",
        kind: "objective",
        choiceMode: "single",
        title: "还款后才收到转让通知",
        prompt: "余青能否因这次转让，要求陆宁再付3万元？请说明。",
        options: [
          {
            id: "a",
            text: "能，债权一经转让，陆宁此前向秦川还款一律无效。",
            explanation: "未通知时，转让对陆宁不发生效力；不能要求其重复还款。",
          },
          {
            id: "b",
            text: "不能，陆宁不知转让且在收到通知前已向秦川足额履行。",
            explanation:
              "未通知的转让对陆宁不发生效力，这次还款可以向余青主张。",
          },
          {
            id: "c",
            text: "能，陆宁应先得到余青同意，才能按原借款约定还款。",
            explanation: "在不知转让、未获通知时，陆宁无须向余青取得还款许可。",
          },
          {
            id: "d",
            text: "不能，因为未经陆宁同意，秦川与余青之间的转让合同无效。",
            explanation:
              "通知和债务人同意是不同问题，普通债权转让不以陆宁同意为一般条件。",
          },
        ],
        answer: "b",
        reference:
          "选B。陆宁不知道债权转让，收到通知前向秦川还清了3万元。这次转让当时对陆宁还没有效力，余青不能再向陆宁要同一笔钱。",
        relatedTopicIds: ["civil-assignment-notice"],
      },
      {
        caseId: "CIV-OBLIGATION-NOTICE-PAID",
        facts:
          "本案为原创教学虚构。秦川借给陆宁3万元，双方约定2026年9月10日归还。9月1日秦川与余青签约，将这笔普通借款债权转让给余青，但两人均未向陆宁告知，陆宁也不知此事。9月10日陆宁依原约向秦川足额还款，并取得收条。9月12日陆宁才收到秦川的转让通知，余青随后要求陆宁再付3万元。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: [
          "civil-obligation-assignment-notice",
          "civil-obligation-assignment-notice-2023",
        ],
        id: "civil-obligation-notice-paid-explain",
        kind: "subjective",
        title: "说明通知前还款的效力",
        prompt: "余青能否因这次转让，要求陆宁再付3万元？请说明。",
        answer: "",
        reference:
          "余青不能要求陆宁再付。陆宁不知转让，收到通知前已按原约向秦川还清3万元，转让当时对陆宁不发生效力。余青不能让陆宁为同一笔借款付两次；余青与秦川之间如何结算另行处理。",
        criteria: [
          {
            id: "notice-paid-discharge",
            label: "收到通知前的还款可向受让人主张",
            meaning:
              "联系陆宁不知转让、9月10日足额还款而9月12日才收到通知，说明余青不能要求重复偿还。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "不要求处理秦川与余青的内部结算，也不能将未通知说成转让合同本身当然无效。",
          },
        ],
        relatedTopicIds: ["civil-assignment-notice"],
      },
      {
        caseId: "CIV-OBLIGATION-NOTICE-RECEIVED",
        facts:
          "本案为原创教学虚构。陶宁向舒禾借款4万元，约定2026年10月1日归还。9月1日舒禾与周岑签约，将全部债权转让给周岑，借款没有限制转让约定。9月3日陶宁收到舒禾签发的书面通知，载明该笔借款、受让人周岑及收款方式。到期后周岑催还，陶宁承认借款未还，只说“你们没问过我，我只向舒禾还”。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: [
          "civil-obligation-assignment-notice",
          "civil-obligation-assignment-notice-2023",
        ],
        id: "civil-obligation-notice-received-choice",
        kind: "objective",
        choiceMode: "single",
        title: "收到通知后仍只认原债权人",
        prompt: "陶宁能否只因自己没有同意转让，就拒绝向周岑还款？请说明。",
        options: [
          {
            id: "a",
            text: "能，更换债权人必须取得陶宁同意。",
            explanation: "这里是普通债权转让，不是债务转移。",
          },
          {
            id: "b",
            text: "能，通知只能让陶宁知道，不能改变其向谁履行。",
            explanation: "通知到达后，转让对陶宁发生效力。",
          },
          {
            id: "c",
            text: "不能，普通债权转让不以陶宁同意为条件，通知已到达，应向周岑履行。",
            explanation:
              "本案债权可转让，通知到达且债务未清，陶宁不能以未同意拒绝。",
          },
          {
            id: "d",
            text: "不能，因为陶宁没有在三日内反对，就视为签订了新借款。",
            explanation: "无须凭空创设三日反对期限或新借款合同。",
          },
        ],
        answer: "c",
        reference:
          "选C。陶宁已经收到原债权人的转让通知，这笔到期借款应向周岑归还。普通债权转让需要通知债务人，通常不需要债务人批准。",
        relatedTopicIds: ["civil-assignment-notice"],
      },
      {
        caseId: "CIV-OBLIGATION-NOTICE-RECEIVED",
        facts:
          "本案为原创教学虚构。陶宁向舒禾借款4万元，约定2026年10月1日归还。9月1日舒禾与周岑签约，将全部债权转让给周岑，借款没有限制转让约定。9月3日陶宁收到舒禾签发的书面通知，载明该笔借款、受让人周岑及收款方式。到期后周岑催还，陶宁承认借款未还，只说“你们没问过我，我只向舒禾还”。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: [
          "civil-obligation-assignment-notice",
          "civil-obligation-assignment-notice-2023",
        ],
        id: "civil-obligation-notice-received-explain",
        kind: "subjective",
        title: "说明通知到达后向谁还款",
        prompt: "陶宁能否只因自己没有同意转让，就拒绝向周岑还款？请说明。",
        answer: "",
        reference:
          "陶宁应向周岑还这4万元。舒禾转让的是普通借款债权，无须先取得陶宁同意；书面通知已经到达，转让对陶宁发生效力。陶宁承认借款未还，不能仅以“我没同意”拒付。",
        criteria: [
          {
            id: "notice-received-payee",
            label: "区分通知与同意并确定收款人",
            meaning:
              "联系可转让的借款债权、原债权人的通知已到达和借款未还，说明无须陶宁同意，陶宁应向周岑履行。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不要求讨论保理、多重转让或转让通知的撤销。",
          },
        ],
        relatedTopicIds: ["civil-assignment-notice"],
      },
    ],
  },
  {
    id: "civil-assignment-defenses",
    title: "债权转让后的抗辩与抵销",
    headline: "债权换了人，原有的还款抗辩和符合条件的抵销机会仍可保留。",
    goal: "债权转让后，债务人的抗辩与抵销是否一概消失？",
    prerequisite: "知道债权人可以请求债务人按约履行，能分清谁欠谁钱。",
    minutes: "6–10",
    paragraphs: [
      "受让人取得的是原有债权。债务人原本已还部分款项、债权原本存在其他抗辩的，收到转让通知后仍可向受让人提出，不因换了收款人就失去。",
      "向受让人抵销须满足法定条件。其中一种情形是：接到转让通知时，债务人已对原债权人享有债权，而且自己的债权先于转让债权到期或同时到期。满足抵销条件后，还须向受让人作出抵销通知。",
    ],
    example: {
      title: "转让通知上的金额与收条不一致",
      facts:
        "本案为原创教学虚构。沈庭借给许舟2万元。2026年8月1日许舟先还5000元，沈庭当面收款并出具收条，其余1.5万元尚未归还。9月1日沈庭向罗羽转让这笔债权，转让文件仍写2万元；9月3日许舟收到通知。到期后罗羽要求2万元，许舟出示8月1日的真实收条。",
      analysis:
        "许舟可以向罗羽主张已经还过5000元，剩余应还1.5万元。债权转让后，债务人对原债权人的抗辩仍可向受让人提出。转让文件写2万元，也不能把已清偿部分重新变成债务。",
    },
    pitfall:
      "以为受让人不知原先还款就能重新全额收款，或把任何互欠款项都看成自动抵销。",
    recall: {
      prompt: "债权转让后，债务人的抗辩与抵销是否一概消失？",
      reference:
        "原有抗辩可向受让人提出；抵销须满足条件并通知，不能仅凭互欠款项自动认定。",
    },
    sources: [
      "civil-obligation-assignment-defense",
      "civil-obligation-setoff-notice",
    ],
    exercises: [
      {
        caseId: "CIV-OBLIGATION-DEFENSE-PAID",
        facts:
          "本案为原创教学虚构。沈庭借给许舟2万元。2026年8月1日许舟先还5000元，沈庭当面收款并出具收条，其余1.5万元尚未归还。9月1日沈庭向罗羽转让这笔债权，转让文件仍写2万元；9月3日许舟收到通知。到期后罗羽要求2万元，许舟出示8月1日的真实收条。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-obligation-assignment-defense"],
        id: "civil-obligation-defense-part-paid-choice",
        kind: "objective",
        choiceMode: "single",
        title: "转让通知上的金额与收条不一致",
        prompt: "许舟能否向罗羽主张已还的5000元？剩余应还多少？",
        options: [
          {
            id: "a",
            text: "不能，收条只能对沈庭使用，应向罗羽再付2万元。",
            explanation: "债务人可向受让人主张对让与人的已有抗辩。",
          },
          {
            id: "b",
            text: "能，罗羽只能请求剩余1.5万元。",
            explanation: "转让不会使已偿还的5000元重新发生。",
          },
          {
            id: "c",
            text: "不能，除非许舟证明罗羽受让时知道收条。",
            explanation: "此处抗辩的保留不以受让人事先知道还款为条件。",
          },
          {
            id: "d",
            text: "能，而且因金额有误，剩余1.5万元也当然免除。",
            explanation: "已有部分清偿不等于剩余债务全部消灭。",
          },
        ],
        answer: "b",
        reference:
          "选B。许舟可以拿收条向罗羽主张已还5000元，只需还剩余1.5万元。债权转让不会把已还的钱重新变成欠款。",
        relatedTopicIds: ["civil-assignment-defenses"],
      },
      {
        caseId: "CIV-OBLIGATION-DEFENSE-PAID",
        facts:
          "本案为原创教学虚构。沈庭借给许舟2万元。2026年8月1日许舟先还5000元，沈庭当面收款并出具收条，其余1.5万元尚未归还。9月1日沈庭向罗羽转让这笔债权，转让文件仍写2万元；9月3日许舟收到通知。到期后罗羽要求2万元，许舟出示8月1日的真实收条。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-obligation-assignment-defense"],
        id: "civil-obligation-defense-part-paid-explain",
        kind: "subjective",
        title: "说明转让后如何使用原还款凭证",
        prompt: "许舟能否向罗羽主张已还的5000元？剩余应还多少？",
        answer: "",
        reference:
          "许舟可以向罗羽主张已经还过5000元，剩余应还1.5万元。债权转让后，债务人对原债权人的抗辩仍可向受让人提出。转让文件写2万元，也不能把已清偿部分重新变成债务。",
        criteria: [
          {
            id: "defense-part-paid-retain",
            label: "保留部分清偿抗辩并确认余额",
            meaning:
              "联系转让前真实还款及收条，说明对罗羽仍可主张已还5000元，余额1.5万元。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不要求分析沈庭对罗羽的转让担保或违约责任。",
          },
        ],
        relatedTopicIds: ["civil-assignment-defenses"],
      },
      {
        caseId: "CIV-OBLIGATION-DEFENSE-SETOFF",
        facts:
          "本案为原创教学虚构。高溪欠叶衡5万元，约定2026年10月1日归还；叶衡另欠高溪2万元，已于2026年7月1日到期，至今未还。两笔均为普通借款，没有不得抵销的约定。9月1日高溪收到叶衡的通知：5万元债权已转让给宋清。11月1日高溪向宋清发出明确、无条件的抵销通知，宋清当日收到，所用的正是上述2万元债权。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: [
          "civil-obligation-assignment-defense",
          "civil-obligation-setoff-notice",
        ],
        id: "civil-obligation-defense-setoff-choice",
        kind: "objective",
        choiceMode: "single",
        title: "债权转让前双方互相欠款",
        prompt: "高溪能否向宋清主张这2万元抵销？抵销后还需向宋清支付多少？",
        options: [
          {
            id: "a",
            text: "不能，债权人一换人，所有反向债权均失去抵销机会。",
            explanation: "民法典第549条保留符合条件的抵销。",
          },
          {
            id: "b",
            text: "能，因为两人互相欠钱，无论取得债权时间及到期时间如何都可抵销。",
            explanation:
              "本案成立依赖通知时已有反向债权及相应到期条件，不能无条件推广。",
          },
          {
            id: "c",
            text: "能，抵销后这笔5万元债务全部免除。",
            explanation: "2万元抵销只消灭同额部分，余额3万元。",
          },
          {
            id: "d",
            text: "能，高溪在收到转让通知时已有对叶衡的债权，且该债权更早到期；抵销后应付宋清3万元。",
            explanation: "两笔同种到期借款满足本题条件，抵销通知已到达。",
          },
        ],
        answer: "d",
        reference:
          "选D。收到转让通知时，高溪已有对叶衡的2万元到期债权，且早于5万元债权到期，可以向宋清抵销。无条件抵销通知已到达，5万元减去2万元，剩余还3万元。",
        relatedTopicIds: ["civil-assignment-defenses"],
      },
      {
        caseId: "CIV-OBLIGATION-DEFENSE-SETOFF",
        facts:
          "本案为原创教学虚构。高溪欠叶衡5万元，约定2026年10月1日归还；叶衡另欠高溪2万元，已于2026年7月1日到期，至今未还。两笔均为普通借款，没有不得抵销的约定。9月1日高溪收到叶衡的通知：5万元债权已转让给宋清。11月1日高溪向宋清发出明确、无条件的抵销通知，宋清当日收到，所用的正是上述2万元债权。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: [
          "civil-obligation-assignment-defense",
          "civil-obligation-setoff-notice",
        ],
        id: "civil-obligation-defense-setoff-explain",
        kind: "subjective",
        title: "说明转让后的抵销条件和余额",
        prompt: "高溪能否向宋清主张这2万元抵销？抵销后还需向宋清支付多少？",
        answer: "",
        reference:
          "可以抵销2万元。高溪收到转让通知时就有对叶衡的债权，而且这2万元比转让的5万元更早到期，符合向受让人抵销的条件。两笔都是到期借款，抵销通知已到达宋清，因此抵销后还应付宋清3万元。",
        criteria: [
          {
            id: "defense-setoff-eligibility",
            label: "联系通知时已有债权及先到期说明可抵销",
            meaning:
              "说明9月1日通知时高溪已有对叶衡的2万元债权，且7月到期早于所转让债权10月到期，故可对宋清主张。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "认可日期关系的自然概括，不要求逐字复述条文；不能只以任何互欠款项都能抵销作理由。",
          },
          {
            id: "defense-setoff-balance",
            label: "联系抵销通知到达说明剩余3万元",
            meaning:
              "联系两笔金钱债务到期、无条件抵销通知已到达，说明2万元范围抵销，尚欠宋清3万元。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不要求处理利息、诉讼费用或其他债务。",
          },
        ],
        relatedTopicIds: ["civil-assignment-defenses"],
      },
    ],
  },
  {
    id: "civil-debt-transfer-consent",
    title: "债务转移与债权人同意",
    headline:
      "用新债务人替换原债务人，需要债权人同意；催告后没回复，视为不同意。",
    goal: "全部替换还款人，需要什么？催告后沉默怎么办？",
    prerequisite: "知道债权人可以请求债务人按约履行，能分清谁欠谁钱。",
    minutes: "6–10",
    paragraphs: [
      "债务转移是“谁负责还款”发生替换。把全部或部分债务交给第三人，需要债权人同意。债务人和第三人之间自己约好，并不就能让原债务人对债权人免责。",
      "催告债权人在合理期限内同意，债权人始终未表示的，视为不同意。债权人明确同意全部替换、原债务人退出后，应向新债务人请求履行；新债务人后来无力偿还，本身不会使原债务自动恢复。",
    ],
    example: {
      title: "替换还款人的提议没有得到回复",
      facts:
        "本案为原创教学虚构。程岚欠顾槐6万元。程岚与孟舟约定，由孟舟全部替换程岚承担这笔债务，但须等顾槐同意；双方没有另外约定孟舟与程岚一起还款或为程岚提供保证。他们共同通知顾槐并催告其在合理的15日期限内答复，顾槐收到后始终没有表示。期满后程岚主张自己已无需还钱。",
      analysis:
        "程岚没有退出，仍须承担6万元债务。由孟舟全部替换程岚，需要债权人顾槐同意。即使已经合理催告，顾槐始终没回复，也依法视为不同意，不能据此免除程岚。",
    },
    pitfall: "把债权转让的通知规则，或债务加入的未拒绝规则，套到替换债务人上。",
    recall: {
      prompt: "全部替换还款人，需要什么？催告后沉默怎么办？",
      reference:
        "需要债权人同意；催告后没表示，视为不同意。有效全部转移后，由新债务人承担。",
    },
    sources: ["civil-obligation-debt-transfer"],
    exercises: [
      {
        caseId: "CIV-OBLIGATION-TRANSFER-SILENCE",
        facts:
          "本案为原创教学虚构。程岚欠顾槐6万元。程岚与孟舟约定，由孟舟全部替换程岚承担这笔债务，但须等顾槐同意；双方没有另外约定孟舟与程岚一起还款或为程岚提供保证。他们共同通知顾槐并催告其在合理的15日期限内答复，顾槐收到后始终没有表示。期满后程岚主张自己已无需还钱。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-obligation-debt-transfer"],
        id: "civil-obligation-transfer-silence-choice",
        kind: "objective",
        choiceMode: "single",
        title: "替换还款人的提议没有得到回复",
        prompt: "顾槐的沉默是否使程岚退出这笔债务？请说明。",
        options: [
          {
            id: "a",
            text: "是，债权人在合理催告期限内不反对，就视为同意全部转移。",
            explanation: "债务转移催告后未表示，法定结果是视为不同意。",
          },
          {
            id: "b",
            text: "是，只要孟舟愿意承担，就无须顾槐同意。",
            explanation: "替换债务人涉及债权实现，须债权人同意。",
          },
          {
            id: "c",
            text: "否，顾槐未表示视为不同意，程岚仍应承担原债务。",
            explanation: "本案不是保留原债务人的债务加入。",
          },
          {
            id: "d",
            text: "否，因为法律从不允许把债务交给别人承担。",
            explanation: "经债权人同意可以转移，不能一概否认。",
          },
        ],
        answer: "c",
        reference:
          "选C。程岚仍须还款。这次是用孟舟替换原债务人，需要顾槐同意；催告后顾槐未回复，依法视为不同意，不能当成默认放行。",
        relatedTopicIds: ["civil-debt-transfer-consent"],
      },
      {
        caseId: "CIV-OBLIGATION-TRANSFER-SILENCE",
        facts:
          "本案为原创教学虚构。程岚欠顾槐6万元。程岚与孟舟约定，由孟舟全部替换程岚承担这笔债务，但须等顾槐同意；双方没有另外约定孟舟与程岚一起还款或为程岚提供保证。他们共同通知顾槐并催告其在合理的15日期限内答复，顾槐收到后始终没有表示。期满后程岚主张自己已无需还钱。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-obligation-debt-transfer"],
        id: "civil-obligation-transfer-silence-explain",
        kind: "subjective",
        title: "说明沉默对替换债务人的影响",
        prompt: "顾槐的沉默是否使程岚退出这笔债务？请说明。",
        answer: "",
        reference:
          "程岚没有退出，仍须承担6万元债务。由孟舟全部替换程岚，需要债权人顾槐同意。即使已经合理催告，顾槐始终没回复，也依法视为不同意，不能据此免除程岚。",
        criteria: [
          {
            id: "transfer-silence-consent",
            label: "债务转移须同意，催告后沉默不使原债务人免责",
            meaning:
              "联系全部替换的约定，说明须顾槐同意；催告后未回复视为不同意，程岚仍负6万元债务。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "不要求判断孟舟与程岚内部安排的履行责任，不把本题改成债务加入或保证。",
          },
        ],
        relatedTopicIds: ["civil-debt-transfer-consent"],
      },
      {
        caseId: "CIV-OBLIGATION-TRANSFER-CONSENT",
        facts:
          "本案为原创教学虚构。陆栩欠秦岑4万元。秦岑、陆栩与梁禾签署书面协议，明确由梁禾全部替换陆栩承担这笔债务，秦岑同意陆栩退出。各方均为完全民事行为能力人，协议是其真实意思，没有其他效力问题，陆栩也未另行承诺担保。到期后梁禾无力偿还，秦岑仅以原先是陆栩借钱为由，又要求陆栩偿还原4万元。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-obligation-debt-transfer"],
        id: "civil-obligation-transfer-consent-choice",
        kind: "objective",
        choiceMode: "single",
        title: "同意更换还款人后，新债务人无力偿还",
        prompt:
          "秦岑能否仅因梁禾无力偿还，要求陆栩重新承担这笔借款债务？请说明。",
        options: [
          {
            id: "a",
            text: "能，最初借钱的人永远不能退出债务。",
            explanation: "经债权人同意，可以发生本案全部债务转移。",
          },
          {
            id: "b",
            text: "不能，秦岑已明确同意全部替换并让陆栩退出，应向梁禾请求履行。",
            explanation: "新债务人无力偿还，本身不会恢复已退出者的债务。",
          },
          {
            id: "c",
            text: "能，债务转移的同意在新债务人无力偿还时自动撤销。",
            explanation: "题设没有这种约定或其他撤销事由。",
          },
          {
            id: "d",
            text: "不能，所以连梁禾的4万元债务也一并免除。",
            explanation: "转移更换义务人，并非免除该笔债务。",
          },
        ],
        answer: "b",
        reference:
          "选B。秦岑已经同意梁禾全部接替，并让陆栩退出，应向梁禾追偿。梁禾后来无力还款，不会自动让陆栩重新负起这笔债务。",
        relatedTopicIds: ["civil-debt-transfer-consent"],
      },
      {
        caseId: "CIV-OBLIGATION-TRANSFER-CONSENT",
        facts:
          "本案为原创教学虚构。陆栩欠秦岑4万元。秦岑、陆栩与梁禾签署书面协议，明确由梁禾全部替换陆栩承担这笔债务，秦岑同意陆栩退出。各方均为完全民事行为能力人，协议是其真实意思，没有其他效力问题，陆栩也未另行承诺担保。到期后梁禾无力偿还，秦岑仅以原先是陆栩借钱为由，又要求陆栩偿还原4万元。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-obligation-debt-transfer"],
        id: "civil-obligation-transfer-consent-explain",
        kind: "subjective",
        title: "说明有效转移后应向谁追偿",
        prompt:
          "秦岑能否仅因梁禾无力偿还，要求陆栩重新承担这笔借款债务？请说明。",
        answer: "",
        reference:
          "不能。秦岑已明确同意梁禾全部替换陆栩，陆栩退出该笔债务，新的还款义务人是梁禾。梁禾后来无力偿还，不会自动恢复陆栩的原债务；题设也没有陆栩另外提供担保的事实。",
        criteria: [
          {
            id: "transfer-consent-release",
            label: "明确同意全部转移后原债务人退出",
            meaning:
              "联系三方有效书面协议及秦岑明确同意，说明梁禾承担原4万元，陆栩已退出，梁禾无力偿还不使陆栩自动恢复责任。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "只评价题设借款债务，不要求虚构欺诈、撤销、另行担保或其他责任。",
          },
        ],
        relatedTopicIds: ["civil-debt-transfer-consent"],
      },
    ],
  },
  {
    id: "civil-debt-joining",
    title: "债务加入与连带范围",
    headline:
      "增加一个共同还款人，原债务人仍负责；第三人只在自己愿承担的范围内负责。",
    goal: "债务加入后，原债务人与第三人各承担什么？",
    prerequisite: "知道债权人可以请求债务人按约履行，能分清谁欠谁钱。",
    minutes: "6–10",
    paragraphs: [
      "债务加入保留原债务人，再增加第三人共同承担。第三人可与债务人约定后通知债权人，也可直接向债权人表示愿意加入。债权人未在合理期限内明确拒绝的，可以要求第三人在其愿意承担的范围内，与债务人承担连带债务。",
      "先看承诺到底是“我也直接一起还”，还是“他不能还时我再负责”，不能一见第三人就统称保证。债务加入不增加债权金额；任何一方清偿都要相应扣减，债权人不得重复收款。",
    ],
    example: {
      title: "第三人承诺共同偿还其中两万元",
      facts:
        "本案为原创教学虚构。唐清欠余川3万元，已到期。周宁向余川书面表示：“唐清原来的还款责任保留。我也一起承担其中2万元，你可以直接向我要求这2万元，不必先找唐清。我付多少，这笔借款就相应减少多少。”余川当日回复接受。",
      analysis:
        "唐清仍应还原来的3万元。周宁明确保留唐清责任并承诺直接一起还款，属于债务加入，在其承诺的2万元内与唐清承担连带债务，余川可以直接找周宁。任一人还的钱都要从这笔借款中扣除，总受偿最多3万元。",
    },
    pitfall:
      "把增加共同还款人当成原债务人自动退出，或把两人的责任金额相加当作可收总额。",
    recall: {
      prompt: "债务加入后，原债务人与第三人各承担什么？",
      reference:
        "原债务人仍负原债务；第三人在愿承担范围内连带清偿，同一债权不能重复受偿。",
    },
    sources: ["civil-obligation-debt-joining"],
    exercises: [
      {
        caseId: "CIV-OBLIGATION-JOIN-LIMIT",
        facts:
          "本案为原创教学虚构。唐清欠余川3万元，已到期。周宁向余川书面表示：“唐清原来的还款责任保留。我也一起承担其中2万元，你可以直接向我要求这2万元，不必先找唐清。我付多少，这笔借款就相应减少多少。”余川当日回复接受。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-obligation-debt-joining"],
        id: "civil-obligation-joining-limit-choice",
        kind: "objective",
        choiceMode: "single",
        title: "第三人承诺共同偿还其中两万元",
        prompt: "余川可如何请求唐清、周宁还款？请说明周宁的范围及总受偿上限。",
        options: [
          {
            id: "a",
            text: "只能先找唐清，确认其无财产后才可找周宁。",
            explanation: "周宁承诺直接共同偿还，不是要求先向唐清追索的保证。",
          },
          {
            id: "b",
            text: "唐清已完全退出，只能找周宁要3万元。",
            explanation: "原债务保留，且周宁只承诺其中2万元。",
          },
          {
            id: "c",
            text: "可以向唐清要原3万元，并在其中2万元范围内请求周宁连带清偿；同一笔债权合计最多受偿3万元。",
            explanation:
              "加入不免除原债务，第三人只在承诺范围内承担，也不能重复受偿。",
          },
          {
            id: "d",
            text: "可以分别从唐清收3万元、周宁收2万元，合计5万元。",
            explanation: "增加义务人没有增加原债权金额。",
          },
        ],
        answer: "c",
        reference:
          "选C。唐清仍欠3万元；周宁加入其中2万元，在这2万元内与唐清承担连带清偿。余川可以直接请求周宁，但同一笔借款总共只能收回3万元，不能收5万元。",
        relatedTopicIds: ["civil-debt-joining"],
      },
      {
        caseId: "CIV-OBLIGATION-JOIN-LIMIT",
        facts:
          "本案为原创教学虚构。唐清欠余川3万元，已到期。周宁向余川书面表示：“唐清原来的还款责任保留。我也一起承担其中2万元，你可以直接向我要求这2万元，不必先找唐清。我付多少，这笔借款就相应减少多少。”余川当日回复接受。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-obligation-debt-joining"],
        id: "civil-obligation-joining-limit-explain",
        kind: "subjective",
        title: "说明共同还款的范围",
        prompt: "余川可如何请求唐清、周宁还款？请说明周宁的范围及总受偿上限。",
        answer: "",
        reference:
          "唐清仍应还原来的3万元。周宁明确保留唐清责任并承诺直接一起还款，属于债务加入，在其承诺的2万元内与唐清承担连带债务，余川可以直接找周宁。任一人还的钱都要从这笔借款中扣除，总受偿最多3万元。",
        criteria: [
          {
            id: "joining-limit-joint",
            label: "识别债务加入并保留原债务人责任",
            meaning:
              "联系保留唐清责任、可直接请求周宁共同偿还的明确表示，说明周宁加入，唐清仍对原债务负责，不要求先向唐清追索。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "不要求使用固定术语；不能把该明确共同偿还安排判为仅在唐清不能还时才负责。",
          },
          {
            id: "joining-limit-amount",
            label: "第三人限2万元且不得重复受偿",
            meaning:
              "说明周宁只在2万元范围与唐清连带清偿，唐清原债务3万元，各方清偿相应扣减，余川总受偿不超过3万元。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不要求讨论利息、追偿或执行程序。",
          },
        ],
        relatedTopicIds: ["civil-debt-joining"],
      },
      {
        caseId: "CIV-OBLIGATION-JOIN-REJECT",
        facts:
          "本案为原创教学虚构。顾遥欠叶宁5万元，已经到期。顾遥与章禾商定：顾遥原有责任保留，章禾愿意同时承担这笔债务，叶宁可以直接向章禾请求5万元，不必先追索顾遥。他们将这一约定通知叶宁。叶宁收到的次日书面明确表示：“我不同意章禾加入，只向顾遥主张。”此后章禾没有另向叶宁承诺，叶宁又改变主意要求章禾按上述约定还款。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-obligation-debt-joining"],
        id: "civil-obligation-joining-rejected-choice",
        kind: "objective",
        choiceMode: "single",
        title: "收到共同还款通知后当即拒绝",
        prompt:
          "叶宁能否仅凭这份已被自己及时明确拒绝的约定，要求章禾承担债务加入责任？顾遥是否仍应还款？",
        options: [
          {
            id: "a",
            text: "能，顾遥与章禾约好后，叶宁的及时拒绝没有任何作用。",
            explanation:
              "债权人在合理期限内明确拒绝的，不按这份约定使第三人向其承担加入责任。",
          },
          {
            id: "b",
            text: "不能；叶宁已在合理期限内明确拒绝，不能只凭该被拒绝的安排要求章禾承担加入责任，顾遥仍负5万元债务。",
            explanation: "及时明确拒绝与始终未表示不同；顾遥原责任未免除。",
          },
          {
            id: "c",
            text: "不能，而且顾遥的原5万元借款也因拒绝而消灭。",
            explanation: "拒绝第三人加入不等于免除原债务。",
          },
          {
            id: "d",
            text: "能，因为债权人对债务加入作出的拒绝一律视为无效。",
            explanation: "第552条保留债权人在合理期限内明确拒绝的选择。",
          },
        ],
        answer: "b",
        reference:
          "选B。叶宁次日已明确拒绝，不能仅凭该安排要求章禾承担加入责任。拒绝增加义务人不等于免除顾遥，原5万元仍应由顾遥偿还。",
        relatedTopicIds: ["civil-debt-joining"],
      },
      {
        caseId: "CIV-OBLIGATION-JOIN-REJECT",
        facts:
          "本案为原创教学虚构。顾遥欠叶宁5万元，已经到期。顾遥与章禾商定：顾遥原有责任保留，章禾愿意同时承担这笔债务，叶宁可以直接向章禾请求5万元，不必先追索顾遥。他们将这一约定通知叶宁。叶宁收到的次日书面明确表示：“我不同意章禾加入，只向顾遥主张。”此后章禾没有另向叶宁承诺，叶宁又改变主意要求章禾按上述约定还款。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-obligation-debt-joining"],
        id: "civil-obligation-joining-rejected-explain",
        kind: "subjective",
        title: "说明及时拒绝共同还款安排的结果",
        prompt:
          "叶宁能否仅凭这份已被自己及时明确拒绝的约定，要求章禾承担债务加入责任？顾遥是否仍应还款？",
        answer: "",
        reference:
          "不能仅凭这份约定要求章禾还款。叶宁收到通知次日就明确拒绝，属于在合理期限内明确拒绝，章禾不因这个被拒绝的安排向叶宁承担债务加入责任。顾遥原来的5万元债务没有消灭，叶宁仍可向顾遥主张。",
        criteria: [
          {
            id: "joining-rejected-effect",
            label: "及时明确拒绝阻止该安排产生加入责任",
            meaning:
              "联系叶宁次日书面拒绝、章禾未另行承诺，说明不能仅凭被拒绝的约定要求章禾承担加入责任；顾遥原5万元仍在。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "只判断题设这一安排，不要求处理假设的新协议、第三人利益合同或顾遥与章禾内部关系。",
          },
        ],
        relatedTopicIds: ["civil-debt-joining"],
      },
    ],
  },
];

export const civilObligationsChapters = [
  {
    id: "CIV-PRESERVATION",
    title: "债权保全",
    section: "民法",
    topicIds: [
      "civil-preservation-subrogation",
      "civil-preservation-revocation",
    ],
  },
  {
    id: "CIV-ASSIGNMENT",
    title: "债权转让",
    section: "民法",
    topicIds: ["civil-assignment-notice", "civil-assignment-defenses"],
  },
  {
    id: "CIV-DEBT-ASSUMPTION",
    title: "债务转移与加入",
    section: "民法",
    topicIds: ["civil-debt-transfer-consent", "civil-debt-joining"],
  },
];

export const civilObligationsExercises = civilObligationsTopics.flatMap(
  (topic) => topic.exercises,
);
export const civilObligationsContentPack = {
  revision: civilObligationsRevision,
  snapshot: {
    topics: civilObligationsTopics,
    sources: civilObligationsSources,
  },
};
export const civilObligationsDefaultQueues = {
  objective: civilObligationsExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilObligationsExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilObligationsQuestion(id: string) {
  const question = civilObligationsExercises.find((q) => q.id === id);
  return question ? structuredClone(question) : undefined;
}
export function civilObligationsTopicForQuestion(id: string) {
  return civilObligationsTopics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function civilObligationsSameCaseQuestions(id: string) {
  const question = civilObligationsQuestion(id);
  return question
    ? structuredClone(
        civilObligationsExercises.filter((q) => q.caseId === question.caseId),
      )
    : [];
}
export function civilObligationsChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = civilObligationsChapters.find((c) => c.id === chapterId);
  return chapter
    ? civilObligationsTopics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}
