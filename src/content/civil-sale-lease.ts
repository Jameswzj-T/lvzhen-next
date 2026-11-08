import type { ContentSources, FaultTopic } from "./fault-unit";

// Original fictional cases. Paired forms share facts, not independent outcomes.
export const civilSaleLeaseRevision = "civil-sale-lease-2026-10-22.v1";

export const civilSaleLeaseSources: ContentSources = {
  "civil-sale-lease-risk604": {
    title: "《民法典》第604、605、610、611条：交付与风险负担",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-22直接核读最高法所载法典；2020-05-28通过、2021-01-01施行。本组用约定交付地点的特定普通动产、交付前后偶然灭失，没有另行风险约定、双方迟延受领或质量拒收；只判断风险及剩余价款，不展开运输、保险、违约损害赔偿。",
  },
  "civil-sale-lease-installment634": {
    title: "《民法典》第634条：分期价款的加速到期或解除",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-22直接核读第634条。普通分期买卖中，到期未付款达总价五分之一，还须经催告在合理期限内仍未付；全部价款请求应扣已付部分。两案仅问该条法定救济，不增加其他加速、解约条款，不涉及贷款或融资租赁。",
  },
  "civil-sale-lease-inspection620": {
    title: "《民法典》第620、621、622条：检验、通知与过短期限",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-22直接核读。区分及时检验并通知、签收不代替约定检验；对于客观无法完成全面检验的两日期限，仅作外观瑕疵异议期限。隐蔽问题发现后次日通知，远离合理期间和二年上限的临界，不假定签收后所有异议消灭。",
  },
  "civil-sale-lease-sample635": {
    title: "《民法典》第615、635、636条：凭样品买卖的质量",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-22直接核读。交货须符合封存样品及其说明；买受人不知道样品隐藏缺陷时，即使交货与样品相同，仍须符合同种物通常标准。两案只评合同质量是否合格，不展开通知迟延、质量赔偿、消费者或产品致害责任。",
  },
  "civil-sale-lease-repair-code": {
    title: "《民法典》第712、713条：租赁维修义务与费用",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-22直接核读最高法法典全文；2021-01-01施行。无另约时出租人维修，合理请求后不履行可自修并请求费用；承租人过错致损另论。只问题设正常维修费，不增加未给出的租金减免或损失额。",
  },
  "civil-sale-lease-sublease-code": {
    title: "《民法典》第716、718条：转租同意及知情未异议",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-22核读。未经同意转租，出租人可以解除；知道或应知后六个月未异议，视为同意。两案转租均未超过原剩余租期，分别给及时异议和明确知情超过六个月；不考次承租人代付、欠租或超期转租。",
  },
  "civil-sale-lease-ownership-code": {
    title: "《民法典》第725条：租赁占有期间所有权变动",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-22核读。限有效定期房屋租赁、承租人已按合同占有后的普通自愿出售并过户，不引入在先抵押实现、在先查封或司法拍卖。只判断原租约是否继续及原固定租金是否因售出自动改变。",
  },
  "civil-sale-lease-housing-2020-amend": {
    title: "法释〔2020〕17号第二十一部分：城镇房屋租赁解释的修正",
    url: "https://www.court.gov.cn/zixun/xiangqing/282621.html",
    note: "2020-12-29公布、2021-01-01施行；2026-10-22实际读到最高法修改决定第二十一部分第2、6、7项。第6项修正原第20条，支持普通所有权变动后继续履行原租约并保留例外；旧第21、23、24条等已删，不以2009旧版条号另增本组规则。该页不是独立现行合订页，未声称核遍全部后续清理。",
  },
  "civil-sale-lease-preemption-code": {
    title: "《民法典》第726、728条：房屋承租人优先购买与侵害后果",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-22核读。先合理期限通知，承租人按同等条件优先；通知后十五日未明确购买视为放弃。按份共有人行使优先及出卖给近亲属为例外。侵害可请求出租人赔偿，但不因此使对第三人的买卖合同无效；不考拍卖或赔偿数额。",
  },
};

export const civilSaleLeaseTopics: FaultTopic[] = [
  {
    id: "civil-sale-risk",
    title: "买卖中的交付与风险负担",
    headline: "一般买卖看交付前后分配偶然损失，不只看是否付清价款。",
    goal: "一般买卖怎样判断偶然灭失的风险？",
    prerequisite: "知道买卖双方分别负有交货和付款义务。",
    minutes: "6–10",
    paragraphs: [
      "在没有特别约定或法律例外时，物品交付前的毁损、灭失风险由卖方承担，交付后由买方承担。这里说的是偶然损失由谁承受，不能单用“谁已付款”作判断。",
      "合格物品依约交付后，买方尚未付清尾款，通常也已承担风险。质量问题导致不能实现合同目的而依法拒收、买方迟延受领等有专门规则，须根据相应事实另行判断。",
    ],
    example: {
      title: "全款付清，钢琴还在卖方处",
      facts:
        "本案为原创教学虚构。林澈向陶青购买一台编号P17的旧钢琴，价款3万元已经付清，约定9月10日在林澈家完成实物交付。9月7日钢琴仍由陶青存放，尚未交付，也不存在林澈拒收或迟延收取。当天仓库因突发雷击起火，钢琴灭失；双方确认陶青按正常标准保管，没有导致火灾或扩大损失。合同未另约风险承担。",
      analysis:
        "风险由陶青承担。钢琴约定9月10日送到林澈家，9月7日仍在陶青保管中，尚未交付，林澈也没有迟延收取。一般买卖的偶然毁损、灭失风险在交付前由卖方承担；付清价款本身不会把风险提前转给买方。",
    },
    pitfall: "把付款、所有权、风险和违约赔偿当成同一个问题。",
    recall: {
      prompt: "一般买卖怎样判断偶然灭失的风险？",
      reference:
        "先看有无特别规则或约定，再看是否交付。一般交付前卖方承担，交付后买方承担；付款不是唯一标准。",
    },
    sources: ["civil-sale-lease-risk604"],
    exercises: [
      {
        caseId: "CIV-SALE-LEASE-RISK-BEFORE",
        facts:
          "本案为原创教学虚构。林澈向陶青购买一台编号P17的旧钢琴，价款3万元已经付清，约定9月10日在林澈家完成实物交付。9月7日钢琴仍由陶青存放，尚未交付，也不存在林澈拒收或迟延收取。当天仓库因突发雷击起火，钢琴灭失；双方确认陶青按正常标准保管，没有导致火灾或扩大损失。合同未另约风险承担。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-sale-lease-risk604"],
        id: "civil-sale-lease-risk-before-choice",
        kind: "objective",
        choiceMode: "single",
        title: "全款付清，钢琴还在卖方处",
        prompt: "这台钢琴的偶然灭失风险由谁承担？全款已付是否改变判断？",
        options: [
          {
            id: "a",
            text: "林澈承担，因为价款付清就必然转移风险。",
            explanation: "本案一般风险转移看交付，不只看付款。",
          },
          {
            id: "b",
            text: "陶青承担，因为尚未交付，付款本身不改变本案风险分配。",
            explanation:
              "实物交付日期尚未到，买方也未迟延受领，适用交付前由卖方承担。",
          },
          {
            id: "c",
            text: "双方各半，因为双方都没有过错。",
            explanation: "没有过错不当然按一半分担风险。",
          },
          {
            id: "d",
            text: "林澈承担，因为只要签了买卖合同，风险就一律转移。",
            explanation:
              "本案不是在途货物等例外，一般不以签约作为风险转移时点。",
          },
        ],
        answer: "b",
        reference:
          "选B。钢琴还没有按约交付，风险由陶青承担。林澈已经付款，不等于已经承受钢琴偶然灭失的风险。",
        relatedTopicIds: ["civil-sale-risk"],
      },
      {
        caseId: "CIV-SALE-LEASE-RISK-BEFORE",
        facts:
          "本案为原创教学虚构。林澈向陶青购买一台编号P17的旧钢琴，价款3万元已经付清，约定9月10日在林澈家完成实物交付。9月7日钢琴仍由陶青存放，尚未交付，也不存在林澈拒收或迟延收取。当天仓库因突发雷击起火，钢琴灭失；双方确认陶青按正常标准保管，没有导致火灾或扩大损失。合同未另约风险承担。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-sale-lease-risk604"],
        id: "civil-sale-lease-risk-before-explain",
        kind: "subjective",
        title: "说明付款与交付前的风险",
        prompt: "这台钢琴的偶然灭失风险由谁承担？全款已付是否改变判断？",
        answer: "",
        reference:
          "风险由陶青承担。钢琴约定9月10日送到林澈家，9月7日仍在陶青保管中，尚未交付，林澈也没有迟延收取。一般买卖的偶然毁损、灭失风险在交付前由卖方承担；付清价款本身不会把风险提前转给买方。",
        criteria: [
          {
            id: "sale-risk-before-delivery",
            label: "联系尚未交付确定卖方风险",
            meaning:
              "联系钢琴未按约交到林澈处、买方无迟延受领和未另约，说明陶青承担，已付款不使本案风险提前转移。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "只问偶然灭失风险，不要求讨论退款程序、违约过错、保险或所有权。",
          },
        ],
        relatedTopicIds: ["civil-sale-risk"],
      },
      {
        caseId: "CIV-SALE-LEASE-RISK-AFTER",
        facts:
          "本案为原创教学虚构。秦杉向夏禾购买一台缝纫机，价款8000元。6月1日夏禾依约在秦杉工作室交付，秦杉检查数量和功能后接受，机器符合约定，余款2000元约定6月20日支付，没有保留所有权或其他风险约定。6月10日工作室遭突发雷击火灾，机器灭失，双方对此均无过错。秦杉据此拒付尾款。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-sale-lease-risk604"],
        id: "civil-sale-lease-risk-after-choice",
        kind: "objective",
        choiceMode: "single",
        title: "收到了机器，还有尾款未付",
        prompt:
          "交付后的这次偶然灭失由谁承担风险？秦杉能否仅因此拒付2000元尾款？",
        options: [
          {
            id: "a",
            text: "秦杉承担，不能仅因交付后的偶然灭失拒付尾款。",
            explanation: "合格机器已依约交付，风险转移不以付清全部价款为条件。",
          },
          {
            id: "b",
            text: "夏禾承担，因为尾款未清，风险始终由卖方承担。",
            explanation: "尾款未付不当然阻止风险在交付时转移。",
          },
          {
            id: "c",
            text: "双方分担，秦杉只须支付1000元。",
            explanation: "无依据将本案价款按一半分担。",
          },
          {
            id: "d",
            text: "无人承担，所以买卖双方的全部义务都消灭。",
            explanation:
              "风险规则正是分配无过错偶然损失，不等于价款义务自动免除。",
          },
        ],
        answer: "a",
        reference:
          "选A。机器合格且已依约交付，风险由秦杉承担。2000元尾款仍应按约支付，不能仅因后来火灾而拒付。",
        relatedTopicIds: ["civil-sale-risk"],
      },
      {
        caseId: "CIV-SALE-LEASE-RISK-AFTER",
        facts:
          "本案为原创教学虚构。秦杉向夏禾购买一台缝纫机，价款8000元。6月1日夏禾依约在秦杉工作室交付，秦杉检查数量和功能后接受，机器符合约定，余款2000元约定6月20日支付，没有保留所有权或其他风险约定。6月10日工作室遭突发雷击火灾，机器灭失，双方对此均无过错。秦杉据此拒付尾款。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-sale-lease-risk604"],
        id: "civil-sale-lease-risk-after-explain",
        kind: "subjective",
        title: "说明交付后灭失与尾款的关系",
        prompt:
          "交付后的这次偶然灭失由谁承担风险？秦杉能否仅因此拒付2000元尾款？",
        answer: "",
        reference:
          "秦杉承担风险，2000元尾款仍应按约支付。合格机器6月1日已经交付并接受，风险此时转给买方；交付后偶然灭失，不会因为尚有尾款未付就改由卖方承担。",
        criteria: [
          {
            id: "sale-risk-after-price",
            label: "联系合格交付说明买方风险及尾款保留",
            meaning:
              "联系6月1日机器合格交付、6月10日才偶然灭失且无另约，说明秦杉负风险，不能仅此拒付2000元。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不要求讨论保险、火灾侵权或假设的质量缺陷。",
          },
        ],
        relatedTopicIds: ["civil-sale-risk"],
      },
    ],
  },
  {
    id: "civil-sale-installment",
    title: "分期付款与全部价款请求",
    headline: "到期未付达到总价五分之一，还须合理催告后仍不付款。",
    goal: "分期价款加速的法定条件和金额怎样判断？",
    prerequisite: "知道买卖双方分别负有交货和付款义务。",
    minutes: "6–10",
    paragraphs: [
      "分期买卖中，到期未付价款达到全部价款的五分之一，经过催告在合理期限内仍未支付，卖方可以请求全部价款或者解除合同。达到比例和催告后仍未付款，须一起核对。",
      "请求全部价款时，已经支付的部分要扣除。解除后可按规则请求使用费，但不能把加速收款、解除取回和重复全额收款混成一件事。",
    ],
    example: {
      title: "两期价款未付后的催告",
      facts:
        "本案为原创教学虚构。顾原以10万元向罗清购买生产设备，约定2026年1月至10月每月1日支付1万元，设备已按约交付。顾原付了1、2月两期，3、4月各1万元均未付。罗清4月2日催告其在合理的20日期限内补付，到4月23日仍未支付，后续六期尚未到期。合同没有另外约定加速到期或解除条件。",
      analysis:
        "可以。顾原到期未付2万元，占10万元总价的五分之一；罗清催告后，合理期限已届满仍未付款，符合分期买卖的法定条件。罗清可选择请求全部未付价款8万元，或者解除合同，不能把已付2万元再算进去重复收取。",
    },
    pitfall:
      "只算出20%就立即加速，或者把“全部价款”理解成已经付过的也再付一遍。",
    recall: {
      prompt: "分期价款加速的法定条件和金额怎样判断？",
      reference:
        "到期未付达总价五分之一，合理催告后仍未付；请求全部未付部分时扣除已付款。",
    },
    sources: ["civil-sale-lease-installment634"],
    exercises: [
      {
        caseId: "CIV-SALE-LEASE-INSTALLMENT-DEMAND",
        facts:
          "本案为原创教学虚构。顾原以10万元向罗清购买生产设备，约定2026年1月至10月每月1日支付1万元，设备已按约交付。顾原付了1、2月两期，3、4月各1万元均未付。罗清4月2日催告其在合理的20日期限内补付，到4月23日仍未支付，后续六期尚未到期。合同没有另外约定加速到期或解除条件。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-sale-lease-installment634"],
        id: "civil-sale-lease-installment-demand-choice",
        kind: "objective",
        choiceMode: "single",
        title: "两期价款未付后的催告",
        prompt:
          "罗清此时能否依据分期付款规则请求全部未付价款，或者解除合同？已付2万元应如何对待？",
        options: [
          {
            id: "a",
            text: "不能，只有欠款达到全部价款一半才有这种救济。",
            explanation: "法定数额门槛为五分之一，并须满足催告后的条件。",
          },
          {
            id: "b",
            text: "不能，即使催告后未付，也永远只能逐期请求。",
            explanation: "满足第634条条件可请求全部未付价款或解除。",
          },
          {
            id: "c",
            text: "可以请求未付8万元或者解除；不能把已经付过的2万元再要一次。",
            explanation:
              "到期未付2万元占总价20%，经合理催告仍未付，且全部请求须扣已付部分。",
          },
          {
            id: "d",
            text: "可以同时取回设备，再让顾原把包括已付部分在内的10万元全部再付一遍。",
            explanation: "加速请求与解除是选择路径，不能由此重复受偿。",
          },
        ],
        answer: "c",
        reference:
          "选C。到期未付2万元占总价五分之一，合理催告期满仍未补付，罗清可请求全部未付8万元，或者解除合同。已付2万元应扣除，不能重复收取。",
        relatedTopicIds: ["civil-sale-installment"],
      },
      {
        caseId: "CIV-SALE-LEASE-INSTALLMENT-DEMAND",
        facts:
          "本案为原创教学虚构。顾原以10万元向罗清购买生产设备，约定2026年1月至10月每月1日支付1万元，设备已按约交付。顾原付了1、2月两期，3、4月各1万元均未付。罗清4月2日催告其在合理的20日期限内补付，到4月23日仍未支付，后续六期尚未到期。合同没有另外约定加速到期或解除条件。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-sale-lease-installment634"],
        id: "civil-sale-lease-installment-demand-explain",
        kind: "subjective",
        title: "说明未付款比例、催告和剩余金额",
        prompt:
          "罗清此时能否依据分期付款规则请求全部未付价款，或者解除合同？已付2万元应如何对待？",
        answer: "",
        reference:
          "可以。顾原到期未付2万元，占10万元总价的五分之一；罗清催告后，合理期限已届满仍未付款，符合分期买卖的法定条件。罗清可选择请求全部未付价款8万元，或者解除合同，不能把已付2万元再算进去重复收取。",
        criteria: [
          {
            id: "sale-installment-demand-basis",
            label: "联系五分之一及催告后未付确认救济",
            meaning:
              "联系两期到期未付2万元占总价20%，合理催告期满仍未补付，说明可选择请求全部未付价款或解除。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "本题只判断第634条救济，不要求另算使用费、损害赔偿或解除后返还。",
          },
          {
            id: "sale-installment-demand-balance",
            label: "扣除已付部分确定未付8万元",
            meaning:
              "说明总价10万元中已付2万元须扣除，加速请求限剩余8万元，不得重复计算。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不要求计算利息、违约金或未来价格。",
          },
        ],
        relatedTopicIds: ["civil-sale-installment"],
      },
      {
        caseId: "CIV-SALE-LEASE-INSTALLMENT-NO-DEMAND",
        facts:
          "本案为原创教学虚构。俞宁以8万元向何岑购买印刷设备，分四期各付2万元。第一期已付，第二期4月1日到期未付，第三、四期分别于7月1日和10月1日到期。4月2日何岑没有先催告补付款，也没有给任何补付期限，就要求俞宁立即支付剩余6万元。合同没有其他加速或解除条款，本问只按分期付款的法定规则判断。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-sale-lease-installment634"],
        id: "civil-sale-lease-installment-no-demand-choice",
        kind: "objective",
        choiceMode: "single",
        title: "一期未付款，卖方立即要求全部余额",
        prompt:
          "第二期未付已超过总价五分之一，何岑是否因此就能在4月2日要求全部6万元立即到期？请说明。",
        options: [
          {
            id: "a",
            text: "能，只要达到五分之一就不再需要其他步骤。",
            explanation: "还须经催告在合理期限内仍未付。",
          },
          {
            id: "b",
            text: "不能，尚未经合理期限催告；目前可主张已经到期的2万元。",
            explanation: "25%的比例够了，但不替代催告后仍未支付这一条件。",
          },
          {
            id: "c",
            text: "不能，因为总价五分之一必须恰好等于20%，超过反而不适用。",
            explanation: "达到包括等于或超过，问题在催告条件尚不具备。",
          },
          {
            id: "d",
            text: "能，因为分期付款中任一期未付，全部价款一律自动到期。",
            explanation: "不存在本题所称任一期未付即自动加速规则。",
          },
        ],
        answer: "b",
        reference:
          "选B。2万元占总价25%，数额门槛已经够，但何岑还没有催告并给予合理补付期限，不能只凭比例要求全部6万元立即到期。已经到期的2万元可以主张。",
        relatedTopicIds: ["civil-sale-installment"],
      },
      {
        caseId: "CIV-SALE-LEASE-INSTALLMENT-NO-DEMAND",
        facts:
          "本案为原创教学虚构。俞宁以8万元向何岑购买印刷设备，分四期各付2万元。第一期已付，第二期4月1日到期未付，第三、四期分别于7月1日和10月1日到期。4月2日何岑没有先催告补付款，也没有给任何补付期限，就要求俞宁立即支付剩余6万元。合同没有其他加速或解除条款，本问只按分期付款的法定规则判断。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-sale-lease-installment634"],
        id: "civil-sale-lease-installment-no-demand-explain",
        kind: "subjective",
        title: "第二期逾期后的余额请求",
        prompt:
          "第二期未付已超过总价五分之一，何岑是否因此就能在4月2日要求全部6万元立即到期？请说明。",
        answer: "",
        reference:
          "目前不能按这条规则要求全部6万元立即到期。第二期2万元占总价25%，虽已达到五分之一，但何岑没有先催告、给出合理补付期限。数额门槛和催告后仍未付要一起满足；此时可以主张已到期的2万元。",
        criteria: [
          {
            id: "sale-installment-no-demand-procedure",
            label: "达到比例不能替代催告后的条件",
            meaning:
              "联系2万元占8万元的25%已达比例但未先合理催告，说明尚不能依第634条使全部6万元立即到期，可主张已到期2万元。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "不要求假设其他违约、根本违约或合同另约；本题已限定法定分期付款路径。",
          },
        ],
        relatedTopicIds: ["civil-sale-installment"],
      },
    ],
  },
  {
    id: "civil-sale-inspection",
    title: "买卖中的检验和异议通知",
    headline:
      "收到、检验、通知是三件事；过短期限不能覆盖客观检不出的隐藏问题。",
    goal: "怎样区分签收、及时通知与过短检验期？",
    prerequisite: "知道买卖双方分别负有交货和付款义务。",
    minutes: "6–10",
    paragraphs: [
      "约定检验期限的，要在期限内检验，并把数量、质量不符合约定的情况通知卖方。只自己发现却一直不通知，和已经按期提出异议不同；签收本身也不当然取消约定的后续检验。",
      "期限短到按物品性质、交易习惯无法完成全面检验时，仅作为外观瑕疵异议期限。隐藏问题仍要在发现或应当发现后的合理期限内通知，并结合两年上限、质量保证期和卖方知情等专门规则判断，不能得出“永远不必通知”。",
    ],
    example: {
      title: "签收后两天发现数量少了",
      facts:
        "本案为原创教学虚构。沈原为工作室向陶箬订购100套灯具，约定收货后5日内检验并通知数量或外观异议。7月1日沈原收货并签署仅写明收到包装箱的送货单；7月3日拆箱清点只有90套，当日把清点照片及少10套的情况发送陶箬，陶箬已经收到并确认确实少装10套。陶箬仍以“签收就是全部检验合格”为由，拒绝处理。",
      analysis:
        "没有因签收而失效。沈原7月3日清点发现短少，当日通知到陶箬，在约定5日期限内。7月1日只确认收到包装箱，不会把双方约定的检验期限取消；本案又已确认确实少10套，陶箬不能只以签收拒绝处理。",
    },
    pitfall:
      "把签收当成一切质量合格，或把两天外观检查期套到需长期运行才能检出的内部问题。",
    recall: {
      prompt: "怎样区分签收、及时通知与过短检验期？",
      reference:
        "按约及时检验并通知；签收不自动取消后续检验，客观不能全面检验的短期限只作外观异议期。",
    },
    sources: ["civil-sale-lease-inspection620"],
    exercises: [
      {
        caseId: "CIV-SALE-LEASE-INSPECTION-NOTICE",
        facts:
          "本案为原创教学虚构。沈原为工作室向陶箬订购100套灯具，约定收货后5日内检验并通知数量或外观异议。7月1日沈原收货并签署仅写明收到包装箱的送货单；7月3日拆箱清点只有90套，当日把清点照片及少10套的情况发送陶箬，陶箬已经收到并确认确实少装10套。陶箬仍以“签收就是全部检验合格”为由，拒绝处理。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-sale-lease-inspection620"],
        id: "civil-sale-lease-inspection-notice-choice",
        kind: "objective",
        choiceMode: "single",
        title: "签收后两天发现数量少了",
        prompt:
          "沈原的数量异议是否因签收送货单就失效？请结合检验和通知时间说明。",
        options: [
          {
            id: "a",
            text: "失效，签收任何送货单都等于放弃约定检验期限。",
            explanation:
              "本案约定5日检验，签收只确认包装箱收到，不能抹去后续按约检验。",
          },
          {
            id: "b",
            text: "失效，只能当天当场开箱，后来通知都不算。",
            explanation: "双方明确约定5日，第三日通知在期内。",
          },
          {
            id: "c",
            text: "没有失效，只要自己私下数过就够，永远不必通知卖方。",
            explanation: "检验和将异议通知卖方是不同要求；本案两者都已完成。",
          },
          {
            id: "d",
            text: "没有失效，沈原在约定5日内清点并把短少情况通知了陶箬。",
            explanation: "7月3日发现并通知，不能仅以7月1日签收否定该异议。",
          },
        ],
        answer: "d",
        reference:
          "选D。沈原在约定5日内清点并把少10套的情况通知陶箬，异议有效提出。只签收包装箱，不等于放弃随后按约检验和通知。",
        relatedTopicIds: ["civil-sale-inspection"],
      },
      {
        caseId: "CIV-SALE-LEASE-INSPECTION-NOTICE",
        facts:
          "本案为原创教学虚构。沈原为工作室向陶箬订购100套灯具，约定收货后5日内检验并通知数量或外观异议。7月1日沈原收货并签署仅写明收到包装箱的送货单；7月3日拆箱清点只有90套，当日把清点照片及少10套的情况发送陶箬，陶箬已经收到并确认确实少装10套。陶箬仍以“签收就是全部检验合格”为由，拒绝处理。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-sale-lease-inspection620"],
        id: "civil-sale-lease-inspection-notice-explain",
        kind: "subjective",
        title: "说明签收、检验和通知的区别",
        prompt:
          "沈原的数量异议是否因签收送货单就失效？请结合检验和通知时间说明。",
        answer: "",
        reference:
          "没有因签收而失效。沈原7月3日清点发现短少，当日通知到陶箬，在约定5日期限内。7月1日只确认收到包装箱，不会把双方约定的检验期限取消；本案又已确认确实少10套，陶箬不能只以签收拒绝处理。",
        criteria: [
          {
            id: "sale-inspection-notice-timely",
            label: "联系约定期限内检验并通知保留数量异议",
            meaning:
              "联系5日约定、第三日清点并通知到卖方，说明签收包装箱不妨碍该及时数量异议。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "不要求分析补货、减价或赔偿的具体选择，不以送货单推定替代题设已有约定和确认事实。",
          },
        ],
        relatedTopicIds: ["civil-sale-inspection"],
      },
      {
        caseId: "CIV-SALE-LEASE-INSPECTION-HIDDEN",
        facts:
          "本案为原创教学虚构。贺清购买一台用于生产的封装设备，约定收货后2日检验，未另约质量保证期。交货时外观正常；设备内部密封结构须连续运行至少7日才能检出渗漏，这由检验资料及双方共同委托的技术人员确认。贺清按通常方法运行，第10日发现交货时已存在的内部渗漏，第11日通知卖方许衡，许衡当日收到。许衡仅以超过2日为由拒绝任何质量异议。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-sale-lease-inspection620"],
        id: "civil-sale-lease-inspection-hidden-choice",
        kind: "objective",
        choiceMode: "single",
        title: "两天检验期与机器内部问题",
        prompt: "许衡能否仅以超过约定2日，就否定这项内部渗漏异议？请说明。",
        options: [
          {
            id: "a",
            text: "能，任何约定检验期都覆盖全部隐藏问题，无须考虑是否能检出。",
            explanation: "客观无法全面检验的过短期限，仅作为外观瑕疵异议期限。",
          },
          {
            id: "b",
            text: "不能，2日不足以检出这一内部问题，只能按外观检验期对待；贺清发现后次日已通知。",
            explanation:
              "给明至少7日才能检出和及时通知，不能将2日套用于该隐藏问题。",
          },
          {
            id: "c",
            text: "能，因为第11日通知已超过法定两年期限。",
            explanation: "第11日当然尚未超过两年，不能改写时间。",
          },
          {
            id: "d",
            text: "不能，所以贺清对任何质量问题都可以永远不通知。",
            explanation:
              "不受该过短外观期限约束，不等于取消合理期限和法定通知规则。",
          },
        ],
        answer: "b",
        reference:
          "选B。两天不足以检出这个需至少七天运行才能发现的内部问题，该约定只能作为外观瑕疵异议期限。贺清发现后次日通知，许衡不能只拿“两天已过”来否定。",
        relatedTopicIds: ["civil-sale-inspection"],
      },
      {
        caseId: "CIV-SALE-LEASE-INSPECTION-HIDDEN",
        facts:
          "本案为原创教学虚构。贺清购买一台用于生产的封装设备，约定收货后2日检验，未另约质量保证期。交货时外观正常；设备内部密封结构须连续运行至少7日才能检出渗漏，这由检验资料及双方共同委托的技术人员确认。贺清按通常方法运行，第10日发现交货时已存在的内部渗漏，第11日通知卖方许衡，许衡当日收到。许衡仅以超过2日为由拒绝任何质量异议。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-sale-lease-inspection620"],
        id: "civil-sale-lease-inspection-hidden-explain",
        kind: "subjective",
        title: "说明过短检验期对内部问题的影响",
        prompt: "许衡能否仅以超过约定2日，就否定这项内部渗漏异议？请说明。",
        answer: "",
        reference:
          "不能。这个内部渗漏至少连续运行7日才可能发现，约定2日不足以完成全面检验，依法只能作为外观瑕疵的异议期限。贺清第10日发现、次日就通知，不是发现后长期不管；许衡不能仅凭超过2日否定该质量异议。",
        criteria: [
          {
            id: "sale-inspection-hidden-short",
            label: "联系客观检出时间区分外观与隐藏问题",
            meaning:
              "联系至少7日连续运行才能检出、约定仅2日，说明该过短期限只约束外观瑕疵；贺清发现次日通知，卖方不能仅以2日已过拒绝。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "不要求计算精确合理期限末日、质量损失或另行产品安全责任；不意味着所有质量异议永久免通知。",
          },
        ],
        relatedTopicIds: ["civil-sale-inspection"],
      },
    ],
  },
  {
    id: "civil-sale-sample",
    title: "凭样品买卖与隐藏缺陷",
    headline:
      "交货要符合封存样品；样品有买方不知道的隐藏缺陷时，仍要符合通常质量标准。",
    goal: "凭样品交货，是否只要与样品一样就够？",
    prerequisite: "知道买卖双方分别负有交货和付款义务。",
    minutes: "6–10",
    paragraphs: [
      "凭样品买卖应封存样品，可以对质量作说明。交付物应当与样品及其说明的质量相同，不能只挑某个合格指标，忽略样品约定的其他要求。",
      "买方不知道样品有隐藏缺陷时，即使交货与样品完全相同，也仍须符合同种物的通常标准。看过正常演示，不等于知道普通检查发现不了的内部缺陷。",
    ],
    example: {
      title: "封存的灰色样品与交来的棕色板材",
      facts:
        "本案为原创教学虚构。周岑为店面装修向程遥购买木饰面板，双方封存一块浅灰色哑光样品，并在合同写明交货应与该样品颜色、纹理及表面效果一致。交货时程遥送来棕色亮光板，数量、尺寸和强度符合约定，颜色与表面效果则明显不同。周岑当场通知，程遥承认差别，却说“强度一样，质量就算合格”。",
      analysis:
        "不能。封存样品和合同说明都要求浅灰色、哑光，交来的却是棕色亮光，已经不符合约定。凭样品买卖应符合样品及说明，不能只挑强度、尺寸等合格指标，就说整次交货合格。",
    },
    pitfall:
      "一见“和样品一样”就结束判断，遗漏样品本身的隐藏问题及买方是否知道。",
    recall: {
      prompt: "凭样品交货，是否只要与样品一样就够？",
      reference:
        "通常须与样品及说明一致；样品有买方不知道的隐藏缺陷时，交货仍须达到同种物通常标准。",
    },
    sources: ["civil-sale-lease-sample635"],
    exercises: [
      {
        caseId: "CIV-SALE-LEASE-SAMPLE-DIFFERENT",
        facts:
          "本案为原创教学虚构。周岑为店面装修向程遥购买木饰面板，双方封存一块浅灰色哑光样品，并在合同写明交货应与该样品颜色、纹理及表面效果一致。交货时程遥送来棕色亮光板，数量、尺寸和强度符合约定，颜色与表面效果则明显不同。周岑当场通知，程遥承认差别，却说“强度一样，质量就算合格”。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-sale-lease-sample635"],
        id: "civil-sale-lease-sample-different-choice",
        kind: "objective",
        choiceMode: "single",
        title: "封存的灰色样品与交来的棕色板材",
        prompt:
          "程遥能否仅以强度、尺寸合格，主张本次交货已符合双方约定？请说明。",
        options: [
          {
            id: "a",
            text: "能，颜色与表面效果永远不是合同质量的一部分。",
            explanation: "双方凭样品并明确说明，相关外观要求就是约定标准。",
          },
          {
            id: "b",
            text: "能，封存样品只供展示，任何情况下都不约束交货。",
            explanation: "凭样品买卖的交货应符合样品及说明。",
          },
          {
            id: "c",
            text: "不能，交货须符合封存样品和说明，棕色亮光未达到约定的浅灰哑光要求。",
            explanation: "其他指标合格不能替代双方明确约定的颜色和表面效果。",
          },
          {
            id: "d",
            text: "不能，所以合同从签订时起一律无效。",
            explanation: "交货不合约不等于合同本身当然无效。",
          },
        ],
        answer: "c",
        reference:
          "选C。双方明确按浅灰哑光样品交货，棕色亮光板不符合约定。强度、尺寸合格，不能代替已经约定的颜色和表面效果。",
        relatedTopicIds: ["civil-sale-sample"],
      },
      {
        caseId: "CIV-SALE-LEASE-SAMPLE-DIFFERENT",
        facts:
          "本案为原创教学虚构。周岑为店面装修向程遥购买木饰面板，双方封存一块浅灰色哑光样品，并在合同写明交货应与该样品颜色、纹理及表面效果一致。交货时程遥送来棕色亮光板，数量、尺寸和强度符合约定，颜色与表面效果则明显不同。周岑当场通知，程遥承认差别，却说“强度一样，质量就算合格”。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-sale-lease-sample635"],
        id: "civil-sale-lease-sample-different-explain",
        kind: "subjective",
        title: "说明凭样品买卖的交货标准",
        prompt:
          "程遥能否仅以强度、尺寸合格，主张本次交货已符合双方约定？请说明。",
        answer: "",
        reference:
          "不能。封存样品和合同说明都要求浅灰色、哑光，交来的却是棕色亮光，已经不符合约定。凭样品买卖应符合样品及说明，不能只挑强度、尺寸等合格指标，就说整次交货合格。",
        criteria: [
          {
            id: "sale-sample-different-quality",
            label: "联系样品及说明确认交货不合约",
            meaning:
              "联系浅灰哑光样品、合同要求和棕色亮光交货，说明不符合约定，强度尺寸合格不能替代。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "只判断交货质量，不要求直接判合同无效、解除或具体赔偿。",
          },
        ],
        relatedTopicIds: ["civil-sale-sample"],
      },
      {
        caseId: "CIV-SALE-LEASE-SAMPLE-HIDDEN",
        facts:
          "本案为原创教学虚构。宋宁为工坊向叶舟购买一批小型水泵，双方封存了样品，宋宁看过正常抽水演示。样品内部绝缘层有制造缺陷，普通查看和短时演示无法发现，宋宁并不知道。交来的水泵与样品完全相同，但检测确认交货时都存在同样缺陷，正常运行即可漏电，不符合此类水泵通常的安全质量标准。宋宁发现后当日通知，叶舟只答复“跟你选的样品一样就算合格”。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-sale-lease-sample635"],
        id: "civil-sale-lease-sample-hidden-choice",
        kind: "objective",
        choiceMode: "single",
        title: "与样品相同的水泵仍有内部缺陷",
        prompt: "叶舟能否仅凭交货与样品相同，就认定已经履行质量义务？请说明。",
        options: [
          {
            id: "a",
            text: "不能，宋宁不知道样品有隐藏缺陷，即使相同也仍须符合同种水泵的通常质量标准。",
            explanation: "第636条对买方不知道的样品隐蔽瑕疵作了这一要求。",
          },
          {
            id: "b",
            text: "能，交货与样品相同就永远免除全部质量责任。",
            explanation: "样品有买方未知隐藏缺陷时，不适用该一概免责说法。",
          },
          {
            id: "c",
            text: "能，只要买方看过一次演示，就视为知道所有内部结构缺陷。",
            explanation: "普通演示无法发现的制造缺陷不能凭看过演示推成知情。",
          },
          {
            id: "d",
            text: "不能，因为凭样品买卖这种交易方式本身一律无效。",
            explanation: "交易方式有效，问题是交货是否符合质量要求。",
          },
        ],
        answer: "a",
        reference:
          "选A。宋宁不知道样品本身有隐藏缺陷，交货即使与样品相同，也应符合同种水泵的通常质量标准。本案正常使用会漏电，不能仅凭“与样品一致”认定合格。",
        relatedTopicIds: ["civil-sale-sample"],
      },
      {
        caseId: "CIV-SALE-LEASE-SAMPLE-HIDDEN",
        facts:
          "本案为原创教学虚构。宋宁为工坊向叶舟购买一批小型水泵，双方封存了样品，宋宁看过正常抽水演示。样品内部绝缘层有制造缺陷，普通查看和短时演示无法发现，宋宁并不知道。交来的水泵与样品完全相同，但检测确认交货时都存在同样缺陷，正常运行即可漏电，不符合此类水泵通常的安全质量标准。宋宁发现后当日通知，叶舟只答复“跟你选的样品一样就算合格”。",
        hint: "结合本案事实，直接说明判断和关键理由。",
        sources: ["civil-sale-lease-sample635"],
        id: "civil-sale-lease-sample-hidden-explain",
        kind: "subjective",
        title: "说明样品隐藏缺陷对质量义务的影响",
        prompt: "叶舟能否仅凭交货与样品相同，就认定已经履行质量义务？请说明。",
        answer: "",
        reference:
          "不能。宋宁不知道样品有内部绝缘缺陷，短时演示也无法发现，不能把这当作她已经接受该缺陷。即使交货与样品相同，仍须符合同种水泵的通常质量标准；正常运行会漏电，已经不符合这一标准。",
        criteria: [
          {
            id: "sale-sample-hidden-standard",
            label: "联系买方未知隐藏缺陷保留通常质量要求",
            meaning:
              "联系宋宁不知道且普通查看无法发现样品内部缺陷，说明与样品相同仍须符合同种水泵通常标准，本案漏电交货不合格。",
            acceptable:
              "认可法律含义一致、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "不要求证明卖方故意隐瞒、处理产品致人损害或计算赔偿；不以看过演示推定知道内部缺陷。",
          },
        ],
        relatedTopicIds: ["civil-sale-sample"],
      },
    ],
  },
  {
    id: "civil-lease-repair",
    title: "租赁物维修与承租人致损",
    headline: "先看约定和损坏原因，再判断由谁维修、能否自行修理请求费用。",
    goal: "区分出租人一般维修义务与承租人过错致损。",
    prerequisite: "知道出租人交物供使用，承租人仍须妥善使用保管。",
    minutes: "6–10",
    paragraphs: [
      "出租人应履行租赁物的维修义务，当事人另有约定的除外。需要维修时，承租人可请求其在合理期限内处理；出租人不履行的，承租人可自行维修，费用由出租人负担。因维修影响使用的，还可依法相应减少租金或延长租期。",
      "因承租人的过错导致需要维修，出租人不承担上述维修义务。不能只看物品归谁所有，要联系自然老化、使用方式、碰撞等实际原因。",
    ],
    example: {
      title: "漏水后的通知与维修账单",
      facts:
        "本案为原创教学虚构。林澈租住顾遥的房屋，书面合同未另约维修责任。2026年3月1日，厨房旧水管因接头自然锈蚀漏水。维修人员查看后说明配件现成，通常两天可修好。林澈当天把情况和照片发给顾遥，请其七日内维修，顾遥确认收到。到3月11日顾遥仍未安排，林澈请人更换故障接头并支付800元，维修明细和报价均与当地同类修理一致。",
      analysis:
        "林澈可以请求顾遥承担800元。水管因自然锈蚀需要维修，双方又无另约，顾遥负维修义务。配件现成、通常两天可修，林澈请求七日内处理而十日后仍未安排，已给合理期限；此后自行完成正常修理，费用由顾遥负担。",
    },
    pitfall:
      "把谁先垫付等同最终承担，或认为房东所有的东西无论如何损坏都由房东修。",
    recall: {
      prompt: "维修费由谁承担，要按什么顺序判断？",
      reference:
        "先看维修约定和致损原因；一般由出租人维修，合理请求后不修可自修请求费用，承租人过错致损适用例外。",
    },
    sources: ["civil-sale-lease-repair-code"],
    exercises: [
      {
        caseId: "civil-sale-lease-case-repair-pipe",
        relatedTopicIds: ["civil-lease-repair"],
        facts:
          "本案为原创教学虚构。林澈租住顾遥的房屋，书面合同未另约维修责任。2026年3月1日，厨房旧水管因接头自然锈蚀漏水。维修人员查看后说明配件现成，通常两天可修好。林澈当天把情况和照片发给顾遥，请其七日内维修，顾遥确认收到。到3月11日顾遥仍未安排，林澈请人更换故障接头并支付800元，维修明细和报价均与当地同类修理一致。",
        hint: "结合本案事实，说明结论和关键理由即可。",
        sources: ["civil-sale-lease-repair-code"],
        id: "civil-sale-lease-repair-pipe-choice",
        kind: "objective",
        choiceMode: "single",
        title: "漏水后的通知与维修账单",
        prompt: "这800元维修费用应如何承担？",
        options: [
          {
            id: "a",
            text: "只能由林澈承担，因为谁联系维修人员谁就最终付费。",
            explanation: "自行联系维修不排除法定费用承担规则。",
          },
          {
            id: "b",
            text: "应由顾遥承担，属于出租人应修而经合理请求仍未修的必要修理。",
            explanation:
              "自然老化且无另约，合理请求后出租人仍不履行，承租人可自修。",
          },
          {
            id: "c",
            text: "应由顾遥承担，但只有先取得法院判决，林澈才能自行修理。",
            explanation: "第713条不以事先取得判决作为自行维修的一般条件。",
          },
          {
            id: "d",
            text: "林澈可以直接免付余下全部租金，不必再看费用和使用影响。",
            explanation: "本题正常修理费用不能自动扩成所有剩余租金一概免除。",
          },
        ],
        answer: "b",
        reference:
          "选B。800元应由顾遥承担。旧管自然锈蚀、双方无另约，维修本应由出租人负责；林澈给出足够安排修理的期限，顾遥仍未处理，林澈可自行维修并请求承担这笔正常修理费。",
      },
      {
        caseId: "civil-sale-lease-case-repair-pipe",
        relatedTopicIds: ["civil-lease-repair"],
        facts:
          "本案为原创教学虚构。林澈租住顾遥的房屋，书面合同未另约维修责任。2026年3月1日，厨房旧水管因接头自然锈蚀漏水。维修人员查看后说明配件现成，通常两天可修好。林澈当天把情况和照片发给顾遥，请其七日内维修，顾遥确认收到。到3月11日顾遥仍未安排，林澈请人更换故障接头并支付800元，维修明细和报价均与当地同类修理一致。",
        hint: "结合本案事实，说明结论和关键理由即可。",
        sources: ["civil-sale-lease-repair-code"],
        id: "civil-sale-lease-repair-pipe-explain",
        kind: "subjective",
        title: "自行修理后的费用请求",
        prompt:
          "林澈能否要求顾遥承担800元？请结合损坏原因、维修约定及通知后的经过说明。",
        answer: "",
        reference:
          "林澈可以请求顾遥承担800元。水管因自然锈蚀需要维修，双方又无另约，顾遥负维修义务。配件现成、通常两天可修，林澈请求七日内处理而十日后仍未安排，已给合理期限；此后自行完成正常修理，费用由顾遥负担。",
        criteria: [
          {
            id: "civil-sale-lease-repair-pipe-duty",
            label: "联系自然老化及无另约判断维修义务",
            meaning:
              "指出旧管自然锈蚀且合同无另约，应由出租人顾遥维修，不因林澈使用房屋就转给其承担。",
            acceptable:
              "认可法律含义相同、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不要求另行讨论物业、第三人责任或安全行政义务。",
          },
          {
            id: "civil-sale-lease-repair-pipe-cost",
            label: "联系合理请求后未维修说明自修费用",
            meaning:
              "联系通常两天可修、七日期限及十日后未安排，说明林澈可自修并请求800元正常修理费用。",
            acceptable:
              "认可法律含义相同、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "不要求先诉判决，也不新增未给出的租金减免、损失或抵销程序。",
          },
        ],
      },
      {
        caseId: "civil-sale-lease-case-repair-door",
        relatedTopicIds: ["civil-lease-repair"],
        facts:
          "本案为原创教学虚构。唐宁租用叶青的房屋，门和门框原本完好，合同未另约维修责任。唐宁搬运宽沙发时，明知门洞太窄仍强行推挤，撞断门框，维修人员确认断裂部位由这次碰撞造成。唐宁随后要求叶青支付600元修理费，理由是“门属于房东，房东就得负责修”。",
        hint: "结合本案事实，说明结论和关键理由即可。",
        sources: ["civil-sale-lease-repair-code"],
        id: "civil-sale-lease-repair-door-choice",
        kind: "objective",
        choiceMode: "single",
        title: "搬家具后的门框损坏",
        prompt: "唐宁要求叶青按出租人维修义务承担费用，是否成立？",
        options: [
          {
            id: "a",
            text: "成立，出租人的维修义务不区分损坏原因。",
            explanation: "第713条明确排除因承租人过错导致需要维修的情形。",
          },
          {
            id: "b",
            text: "成立，只要物品属于出租人，承租人的使用行为就无关。",
            explanation: "所有权归属不能替代对损坏原因和过错的判断。",
          },
          {
            id: "c",
            text: "不成立，因为任何出租人都没有维修义务。",
            explanation: "把本案承租人致损例外错误扩大成所有租赁。",
          },
          {
            id: "d",
            text: "不成立，本次因唐宁强行推挤撞坏门框，出租人不承担第713条前款的维修义务。",
            explanation: "具体致损事实支持适用承租人过错例外。",
          },
        ],
        answer: "d",
        reference:
          "选D。唐宁不能仅凭房东拥有门框，就要求叶青承担这600元。门框原本完好，是唐宁明知太窄仍强行推挤撞坏，属于承租人过错致需维修，出租人不承担这里的法定维修义务。",
      },
      {
        caseId: "civil-sale-lease-case-repair-door",
        relatedTopicIds: ["civil-lease-repair"],
        facts:
          "本案为原创教学虚构。唐宁租用叶青的房屋，门和门框原本完好，合同未另约维修责任。唐宁搬运宽沙发时，明知门洞太窄仍强行推挤，撞断门框，维修人员确认断裂部位由这次碰撞造成。唐宁随后要求叶青支付600元修理费，理由是“门属于房东，房东就得负责修”。",
        hint: "结合本案事实，说明结论和关键理由即可。",
        sources: ["civil-sale-lease-repair-code"],
        id: "civil-sale-lease-repair-door-explain",
        kind: "subjective",
        title: "门框修理费的承担",
        prompt: "叶青是否应按出租人的一般维修义务支付600元？请说明。",
        answer: "",
        reference:
          "叶青不承担这里的维修费用。门框原本完好，唐宁明知沙发过宽仍强行推挤，直接撞坏门框，属于承租人过错导致需要维修；合同又没有另约，不能把一般出租人维修义务用于免除唐宁本次致损的后果。",
        criteria: [
          {
            id: "civil-sale-lease-repair-door-fault",
            label: "联系承租人致损适用维修例外",
            meaning:
              "用门框原好、唐宁明知过宽仍强推造成断裂的事实，说明属于承租人过错致损，不能要求叶青按一般维修义务支付600元。",
            acceptable:
              "认可法律含义相同、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "只判断题设费用承担，不要求额外计算赔偿或解除租约。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-lease-sublease",
    title: "转租同意与知情未异议",
    headline:
      "未经同意转租可能被解除；出租人知情后长期不异议，也可能被视为同意。",
    goal: "联系同意、实际知情与异议时间判断转租效果。",
    prerequisite: "能区分原出租人、承租人与次承租人。",
    minutes: "6–10",
    paragraphs: [
      "承租人经出租人同意，可以转租；原出租人与承租人之间的合同继续有效。未经同意转租，出租人可以解除原合同，不能把转租一概说成所有合同自动无效。",
      "出租人知道或者应当知道转租，却在六个月内未提出异议，视为同意。六个月从知情时判断，不是原租约签订之日，也不是要求出租人先等待六个月才能异议。",
    ],
    example: {
      title: "迁出后另行出租的房屋",
      facts:
        "本案为原创教学虚构。周岚与秦和签订房屋租赁合同，租期为2026年1月至2027年12月。2月1日，周岚未征得秦和同意，将整套房另租给孟清至当年12月，收取租金并自己迁出。秦和3月5日从物业处得知并核实，3月7日即向周岚发出书面异议，表示要因这次未经同意的转租解除原租约。周岚称秦和必须再等六个月才能提出。",
      analysis:
        "秦和可以据此解除，不必等六个月。周岚未经秦和同意把整套房转租，秦和得知后两天便提出异议。六个月不异议才视为同意的规则，不是要求出租人先等待六个月。",
    },
    pitfall: "把未签字等同于永远未同意，或把六个月当作不能提出异议的等待期。",
    recall: {
      prompt: "转租同意及六个月未异议的规则如何联系？",
      reference:
        "经同意可以转租且原合同继续；未经同意可解除，但出租人知情后六个月未异议视为同意。",
    },
    sources: ["civil-sale-lease-sublease-code"],
    exercises: [
      {
        caseId: "civil-sale-lease-case-sublease-objection",
        relatedTopicIds: ["civil-lease-sublease"],
        facts:
          "本案为原创教学虚构。周岚与秦和签订房屋租赁合同，租期为2026年1月至2027年12月。2月1日，周岚未征得秦和同意，将整套房另租给孟清至当年12月，收取租金并自己迁出。秦和3月5日从物业处得知并核实，3月7日即向周岚发出书面异议，表示要因这次未经同意的转租解除原租约。周岚称秦和必须再等六个月才能提出。",
        hint: "结合本案事实，说明结论和关键理由即可。",
        sources: ["civil-sale-lease-sublease-code"],
        id: "civil-sale-lease-sublease-objection-choice",
        kind: "objective",
        choiceMode: "single",
        title: "迁出后另行出租的房屋",
        prompt: "关于秦和能否据此解除，哪项正确？",
        options: [
          {
            id: "a",
            text: "可以，未经同意转租且秦和已经及时异议，不必等六个月。",
            explanation: "六个月未异议的同意推定，不是出租人必须等待的期限。",
          },
          {
            id: "b",
            text: "不可以，出租人在知道转租后六个月内一律不能异议。",
            explanation: "把同意推定期限误当成禁止异议期。",
          },
          {
            id: "c",
            text: "不可以，只要承租人已经迁出，转租就自动取得同意。",
            explanation: "迁出和收租不能替代出租人同意。",
          },
          {
            id: "d",
            text: "可以，而且未经同意转租必然使所有相关合同自动无效。",
            explanation: "第716条赋予解除权，不等于所有合同自动无效。",
          },
        ],
        answer: "a",
        reference:
          "选A。秦和可以因未经同意转租解除原租约。周岚把整套房另租并收租，事先没有同意；秦和得知后两天即异议，不存在知情六个月未异议的同意推定，也不必等六个月再处理。",
      },
      {
        caseId: "civil-sale-lease-case-sublease-objection",
        relatedTopicIds: ["civil-lease-sublease"],
        facts:
          "本案为原创教学虚构。周岚与秦和签订房屋租赁合同，租期为2026年1月至2027年12月。2月1日，周岚未征得秦和同意，将整套房另租给孟清至当年12月，收取租金并自己迁出。秦和3月5日从物业处得知并核实，3月7日即向周岚发出书面异议，表示要因这次未经同意的转租解除原租约。周岚称秦和必须再等六个月才能提出。",
        hint: "结合本案事实，说明结论和关键理由即可。",
        sources: ["civil-sale-lease-sublease-code"],
        id: "civil-sale-lease-sublease-objection-explain",
        kind: "subjective",
        title: "出租人发现转租后的异议",
        prompt:
          "秦和能否因本次转租解除原租约？周岚所说必须等六个月是否正确？请说明。",
        answer: "",
        reference:
          "秦和可以据此解除，不必等六个月。周岚未经秦和同意把整套房转租，秦和得知后两天便提出异议。六个月不异议才视为同意的规则，不是要求出租人先等待六个月。",
        criteria: [
          {
            id: "civil-sale-lease-sublease-objection-result",
            label: "联系未同意及及时异议判断解除",
            meaning:
              "联系未经同意转租、秦和得知后两天异议，说明出租人可以解除原租约，六个月并非必须等待的期限。",
            acceptable:
              "认可法律含义相同、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不要求判断转租合同本身效力、次承租人租金或返还程序。",
          },
        ],
      },
      {
        caseId: "civil-sale-lease-case-sublease-silence",
        relatedTopicIds: ["civil-lease-sublease"],
        facts:
          "本案为原创教学虚构。林舟承租许宁的房屋，原租期到2027年12月。林舟于2026年2月1日把房屋转租给叶澄至当年12月，未事先取得明确同意。许宁当天收到完整转租合同复印件，还到房内看到叶澄已经按该合同入住，但没有表态。此后许宁一直未提出异议，直到9月15日才首次书面反对，理由仅是自己从未签字同意转租。",
        hint: "结合本案事实，说明结论和关键理由即可。",
        sources: ["civil-sale-lease-sublease-code"],
        id: "civil-sale-lease-sublease-silence-choice",
        kind: "objective",
        choiceMode: "multiple",
        title: "收到转租合同后的持续沉默",
        prompt: "以下哪些判断正确？",
        options: [
          {
            id: "a",
            text: "没有许宁签字，经过多久都不可能成立转租同意。",
            explanation: "第718条规定了知情后六个月未异议的同意推定。",
          },
          {
            id: "b",
            text: "许宁从2月1日知情后超过六个月未异议，视为同意转租。",
            explanation: "本案知情时间和超过六个月的沉默均明确。",
          },
          {
            id: "c",
            text: "六个月一律从原租约签订日计算，与何时知道转租无关。",
            explanation: "应从知道或应当知道转租时判断。",
          },
          {
            id: "d",
            text: "林舟与许宁的原租赁合同不因这次转租自动消灭。",
            explanation: "转租得到同意并不等于原承租人退出原租约。",
          },
        ],
        answer: "b,d",
        reference:
          "选B、D。许宁2月1日已明确知道转租，至9月15日才异议，超过六个月未异议，依法视为同意，不能仅以未签字否定。林舟与许宁的原租赁合同仍继续有效。",
        correctChoices: ["b", "d"],
      },
      {
        caseId: "civil-sale-lease-case-sublease-silence",
        relatedTopicIds: ["civil-lease-sublease"],
        facts:
          "本案为原创教学虚构。林舟承租许宁的房屋，原租期到2027年12月。林舟于2026年2月1日把房屋转租给叶澄至当年12月，未事先取得明确同意。许宁当天收到完整转租合同复印件，还到房内看到叶澄已经按该合同入住，但没有表态。此后许宁一直未提出异议，直到9月15日才首次书面反对，理由仅是自己从未签字同意转租。",
        hint: "结合本案事实，说明结论和关键理由即可。",
        sources: ["civil-sale-lease-sublease-code"],
        id: "civil-sale-lease-sublease-silence-explain",
        kind: "subjective",
        title: "首次反对时的租赁关系",
        prompt:
          "许宁能否仅以自己没有签字同意为由解除？林舟与许宁的原合同是否因转租自动消灭？请说明。",
        answer: "",
        reference:
          "许宁不能仅因未签字而据此解除。其2月1日已收到转租合同并现场看见次承租人入住，却超过六个月未异议，依法视为同意。转租不使原租约自动消灭，林舟与许宁之间的租赁合同继续有效。",
        criteria: [
          {
            id: "civil-sale-lease-sublease-silence-consent",
            label: "联系知情超过六个月未异议认定同意",
            meaning:
              "联系2月1日已知、9月15日才异议，说明已视为同意，未签字不能单独否定本次转租。",
            acceptable:
              "认可法律含义相同、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不要求精算六个月末日或讨论未给出的其他解除事由。",
          },
          {
            id: "civil-sale-lease-sublease-silence-original",
            label: "区分转租与原租约退出",
            meaning:
              "明确原出租人与承租人的合同仍继续有效，不能把转租当作原合同自动消灭。",
            acceptable:
              "认可法律含义相同、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不要求另答次承租人致损、代付租金或超期转租。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-lease-ownership-change",
    title: "租赁期间的所有权变动",
    headline: "普通买卖换了所有权人，正在按约占有的租赁并不因此结束。",
    goal: "联系依约占有与固定租期，判断售出后原合同是否继续。",
    prerequisite: "能区分租赁占有与房屋所有权。",
    minutes: "6–10",
    paragraphs: [
      "租赁物在承租人按照租赁合同占有的期限内发生所有权变动，不影响租赁合同效力。普通房屋买卖不能仅凭买方成为新房主，就让依约占有的承租人立即搬离。",
      "继续的是原租约，原约定的租期、固定租金等也不会只因售出自动改变。承租人仍须履行原合同，不是从此可以不付租金。",
    ],
    example: {
      title: "居住期间房屋售出过户",
      facts:
        "本案为原创教学虚构。何川将自有住房书面出租给余青，租期从2026年1月到2028年12月，余青已按约入住并持续支付租金。合同没有约定出售即终止。2026年6月，何川按普通房屋买卖将房屋出售给卢月并完成过户；余青此前已明确表示不购买。7月卢月要求余青立即搬走，唯一理由是“所有权已经登记到我名下，原租约不能约束我”。",
      analysis:
        "卢月的理由不成立，余青可以继续按原租约居住。余青在买卖过户前已经依约占有，固定租期到2028年12月，合同也未约定出售即终止；租赁期间普通所有权变动不影响租约效力，新房主应继续履行原租约。",
    },
    pitfall: "把买方取得所有权当作原租约自动终止，或认为必须重签后才继续。",
    recall: {
      prompt: "承租人依约占有期间，普通买卖过户怎样影响租约？",
      reference:
        "不因所有权变化自动影响原租约；新房主继续受原约约束，租期、固定租金等也不自动改写。",
    },
    sources: [
      "civil-sale-lease-ownership-code",
      "civil-sale-lease-housing-2020-amend",
    ],
    exercises: [
      {
        caseId: "civil-sale-lease-case-ownership-move",
        relatedTopicIds: ["civil-lease-ownership-change"],
        facts:
          "本案为原创教学虚构。何川将自有住房书面出租给余青，租期从2026年1月到2028年12月，余青已按约入住并持续支付租金。合同没有约定出售即终止。2026年6月，何川按普通房屋买卖将房屋出售给卢月并完成过户；余青此前已明确表示不购买。7月卢月要求余青立即搬走，唯一理由是“所有权已经登记到我名下，原租约不能约束我”。",
        hint: "结合本案事实，说明结论和关键理由即可。",
        sources: [
          "civil-sale-lease-ownership-code",
          "civil-sale-lease-housing-2020-amend",
        ],
        id: "civil-sale-lease-ownership-move-choice",
        kind: "objective",
        choiceMode: "single",
        title: "居住期间房屋售出过户",
        prompt: "卢月能否仅因这次买卖过户要求余青立即搬走？",
        options: [
          {
            id: "a",
            text: "能够，登记为新所有权人后可以一概排除原租赁。",
            explanation:
              "忽略了承租人按租约占有期间所有权变动不影响租约的规则。",
          },
          {
            id: "b",
            text: "能够，租赁合同未由卢月重新签字就自动终止。",
            explanation: "普通所有权变动不以重签合同作为原租约继续的条件。",
          },
          {
            id: "c",
            text: "不能，余青已在原租期内依约占有，普通出售不影响该租约继续。",
            explanation: "第725条直接保护这一期间的合同效力。",
          },
          {
            id: "d",
            text: "不能，所以余青今后完全不用再履行原合同义务。",
            explanation: "租约继续不是承租人全部义务消灭。",
          },
        ],
        answer: "c",
        reference:
          "选C。卢月不能仅凭买卖过户要求立即搬离。余青早已依原租约入住，租期尚未届满；这种普通所有权变动不影响原租赁合同，卢月应继续按原租约处理。",
      },
      {
        caseId: "civil-sale-lease-case-ownership-move",
        relatedTopicIds: ["civil-lease-ownership-change"],
        facts:
          "本案为原创教学虚构。何川将自有住房书面出租给余青，租期从2026年1月到2028年12月，余青已按约入住并持续支付租金。合同没有约定出售即终止。2026年6月，何川按普通房屋买卖将房屋出售给卢月并完成过户；余青此前已明确表示不购买。7月卢月要求余青立即搬走，唯一理由是“所有权已经登记到我名下，原租约不能约束我”。",
        hint: "结合本案事实，说明结论和关键理由即可。",
        sources: [
          "civil-sale-lease-ownership-code",
          "civil-sale-lease-housing-2020-amend",
        ],
        id: "civil-sale-lease-ownership-move-explain",
        kind: "subjective",
        title: "新房主提出的搬离要求",
        prompt:
          "卢月所说原租约不约束自己，是否成立？余青能否继续按原租约居住？请说明。",
        answer: "",
        reference:
          "卢月的理由不成立，余青可以继续按原租约居住。余青在买卖过户前已经依约占有，固定租期到2028年12月，合同也未约定出售即终止；租赁期间普通所有权变动不影响租约效力，新房主应继续履行原租约。",
        criteria: [
          {
            id: "civil-sale-lease-ownership-move-continuity",
            label: "联系在租期内依约占有判断租约继续",
            meaning:
              "联系余青先依约入住、租期未届满及普通出售过户，说明原合同继续约束新房主，不能仅以所有权变化要求立即搬离。",
            acceptable:
              "认可法律含义相同、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "不要求重新签约，也不分析未给出的在先抵押、查封、司法拍卖或其他解除事由。",
          },
        ],
      },
      {
        caseId: "civil-sale-lease-case-ownership-rent",
        relatedTopicIds: ["civil-lease-ownership-change"],
        facts:
          "本案为原创教学虚构。沈棠将商铺书面出租给程禾开店，租期为2026年1月至2027年12月，程禾已在店内持续经营。合同约定租期内月租固定4000元，没有售出后变更租金的条款。2026年8月沈棠按普通买卖将商铺出售并过户给方越；程禾此前已明确表示不购买。9月方越只因自己是新房主，要求月租立即改为6000元。程禾没有同意，愿继续支付原合同4000元。",
        hint: "结合本案事实，说明结论和关键理由即可。",
        sources: [
          "civil-sale-lease-ownership-code",
          "civil-sale-lease-housing-2020-amend",
        ],
        id: "civil-sale-lease-ownership-rent-choice",
        kind: "objective",
        choiceMode: "single",
        title: "商铺过户后的新租金要求",
        prompt: "方越能否仅因买入过户，就要求按6000元月租履行？",
        options: [
          {
            id: "a",
            text: "可以，新房主的购买成本决定原租约租金。",
            explanation: "普通出售不会使固定租金自动改成买方另定的数额。",
          },
          {
            id: "b",
            text: "不可以，原租约仍有效，固定4000元月租不因过户自动变更。",
            explanation: "承租人已依约占有，原合同条件仍应适用。",
          },
          {
            id: "c",
            text: "可以，商铺租赁从来不适用所有权变动后的租约保护。",
            explanation: "第725条并不把普通商铺租赁排除。",
          },
          {
            id: "d",
            text: "不可以，所以程禾可以从此免交4000元。",
            explanation: "不得单方提高租金不等于原租金义务消失。",
          },
        ],
        answer: "b",
        reference:
          "选B。方越不能仅因过户就把月租改为6000元。程禾早已按租约占有经营，原租赁仍有效，租期内固定4000元的条件不因普通出售自动改变。",
      },
      {
        caseId: "civil-sale-lease-case-ownership-rent",
        relatedTopicIds: ["civil-lease-ownership-change"],
        facts:
          "本案为原创教学虚构。沈棠将商铺书面出租给程禾开店，租期为2026年1月至2027年12月，程禾已在店内持续经营。合同约定租期内月租固定4000元，没有售出后变更租金的条款。2026年8月沈棠按普通买卖将商铺出售并过户给方越；程禾此前已明确表示不购买。9月方越只因自己是新房主，要求月租立即改为6000元。程禾没有同意，愿继续支付原合同4000元。",
        hint: "结合本案事实，说明结论和关键理由即可。",
        sources: [
          "civil-sale-lease-ownership-code",
          "civil-sale-lease-housing-2020-amend",
        ],
        id: "civil-sale-lease-ownership-rent-explain",
        kind: "subjective",
        title: "商铺原租约与买方的要求",
        prompt:
          "程禾是否必须只因房主更换就支付6000元月租？原4000元约定如何处理？请说明。",
        answer: "",
        reference:
          "程禾不必仅因更换房主就付6000元。其在原租期内依约占有商铺，普通买卖过户不影响原租约效力；合同明确固定月租4000元，又未约定售出后调整，也未形成新的变更合意，仍按原约定履行。",
        criteria: [
          {
            id: "civil-sale-lease-ownership-rent-terms",
            label: "联系原租约继续判断固定租金",
            meaning:
              "联系依约占有、未届满的租期及固定4000元约定，说明普通出售不使租金自动改为6000元，仍按原约履行。",
            acceptable:
              "认可法律含义相同、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "不要求讨论未来协商调租或新房主的购房成本，也不能因拒绝加租而免除原租金。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-lease-preemption",
    title: "房屋承租人优先购买与例外",
    headline:
      "承租人通常有同等条件购买机会，但近亲属等例外及侵害后果要分开看。",
    goal: "区分合理通知、同等条件、法定例外及侵害后的合同效力。",
    prerequisite: "知道本组是房屋承租人的购买机会，不是共有人份额转让规则。",
    minutes: "6–10",
    paragraphs: [
      "出租人出售出租房屋，应在出卖前合理期限内通知承租人，使其有同等条件优先购买的机会。同等条件要看价款、付款安排等，不能只报同样总价却任意改变实质条件；通知后十五日内未明确表示购买，视为放弃。",
      "房屋按份共有人行使优先购买权，或者出租人卖给近亲属，属于法定例外。不能把任何出售都当成承租人当然优先，也不能把房屋承租人的规则混成共有份额转让。",
      "出租人未通知或另有妨害行使优先购买的情形，承租人可以依法请求赔偿；但出租人与第三人订立的买卖合同效力不受影响。不能把侵害优先购买直接写成买卖合同无效。",
    ],
    example: {
      title: "承租人得知房屋出售以后",
      facts:
        "本案为原创教学虚构。许岚把自己单独所有的房屋出租给唐溪，租期到2027年12月，唐溪已经入住。2026年6月，许岚未通知唐溪，便以180万元、一次性付款的条件与无亲属关系的外部买家陈舟订立房屋买卖合同。唐溪随后得知，表示自己有资金并愿按完全相同的条件购买。双方争议仅在许岚未给购买机会，买卖不存在其他效力争议。唐溪提出请求赔偿，并主张仅因未通知就应认定该买卖合同无效。",
      analysis:
        "唐溪可以就优先购买权受侵害依法请求许岚赔偿，但不能仅据未通知认定买卖合同无效。许岚向外部人出售自己所有的出租房屋，应事先合理通知，唐溪又愿接受相同价款与付款安排；第728条保护赔偿请求，同时保留出租人与第三人买卖合同的效力。",
    },
    pitfall: "把同等条件当成任意条件，或把未通知的后果直接说成第三人合同无效。",
    recall: {
      prompt: "房屋承租人优先购买，要分清哪几件事？",
      reference:
        "先合理通知、同等条件及时表示；近亲属等情形有例外；侵害可请求赔偿，但不因此使第三人的买卖合同无效。",
    },
    sources: ["civil-sale-lease-preemption-code"],
    exercises: [
      {
        caseId: "civil-sale-lease-case-preemption-unnotified",
        relatedTopicIds: ["civil-lease-preemption"],
        facts:
          "本案为原创教学虚构。许岚把自己单独所有的房屋出租给唐溪，租期到2027年12月，唐溪已经入住。2026年6月，许岚未通知唐溪，便以180万元、一次性付款的条件与无亲属关系的外部买家陈舟订立房屋买卖合同。唐溪随后得知，表示自己有资金并愿按完全相同的条件购买。双方争议仅在许岚未给购买机会，买卖不存在其他效力争议。唐溪提出请求赔偿，并主张仅因未通知就应认定该买卖合同无效。",
        hint: "结合本案事实，说明结论和关键理由即可。",
        sources: ["civil-sale-lease-preemption-code"],
        id: "civil-sale-lease-preemption-unnotified-choice",
        kind: "objective",
        choiceMode: "multiple",
        title: "承租人得知房屋出售以后",
        prompt: "以下哪些判断正确？",
        options: [
          {
            id: "a",
            text: "唐溪可就优先购买权被侵害，依法请求许岚承担赔偿责任。",
            explanation:
              "房屋对外出售未通知，承租人可依法主张侵害优先购买的责任。",
          },
          {
            id: "b",
            text: "只要未通知唐溪，许岚与陈舟之间的买卖合同就自动无效。",
            explanation: "第728条明确买卖合同效力不受这类侵害影响。",
          },
          {
            id: "c",
            text: "唐溪因未获通知就自动成为房屋所有权人。",
            explanation: "优先购买不等于未购买、未转移即自动取得所有权。",
          },
          {
            id: "d",
            text: "不能仅以未通知、妨害优先购买为由认定买卖合同无效。",
            explanation: "侵害后的赔偿问题与第三人买卖合同效力分别处理。",
          },
        ],
        answer: "a,d",
        reference:
          "选A、D。许岚应先合理通知唐溪，使其有同等条件购买的机会；未通知而侵害其权利，唐溪可以依法请求赔偿。但不能只因这次未通知，就认定许岚与陈舟的买卖合同无效，也不会使唐溪自动取得房屋。",
        correctChoices: ["a", "d"],
      },
      {
        caseId: "civil-sale-lease-case-preemption-unnotified",
        relatedTopicIds: ["civil-lease-preemption"],
        facts:
          "本案为原创教学虚构。许岚把自己单独所有的房屋出租给唐溪，租期到2027年12月，唐溪已经入住。2026年6月，许岚未通知唐溪，便以180万元、一次性付款的条件与无亲属关系的外部买家陈舟订立房屋买卖合同。唐溪随后得知，表示自己有资金并愿按完全相同的条件购买。双方争议仅在许岚未给购买机会，买卖不存在其他效力争议。唐溪提出请求赔偿，并主张仅因未通知就应认定该买卖合同无效。",
        hint: "结合本案事实，说明结论和关键理由即可。",
        sources: ["civil-sale-lease-preemption-code"],
        id: "civil-sale-lease-preemption-unnotified-explain",
        kind: "subjective",
        title: "未获购买机会后的两项主张",
        prompt:
          "唐溪能否依法请求许岚赔偿？能否仅因未通知就认定许岚与陈舟的买卖合同无效？请分别说明。",
        answer: "",
        reference:
          "唐溪可以就优先购买权受侵害依法请求许岚赔偿，但不能仅据未通知认定买卖合同无效。许岚向外部人出售自己所有的出租房屋，应事先合理通知，唐溪又愿接受相同价款与付款安排；第728条保护赔偿请求，同时保留出租人与第三人买卖合同的效力。",
        criteria: [
          {
            id: "civil-sale-lease-preemption-unnotified-remedy",
            label: "联系未通知及同等条件判断责任",
            meaning:
              "联系对外出售、未事先通知及唐溪愿按同等价款付款方式购买，说明其可依法请求许岚承担侵害优先购买的赔偿责任。",
            acceptable:
              "认可法律含义相同、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不要求给定具体赔偿额或推定房价差即为必然损失。",
          },
          {
            id: "civil-sale-lease-preemption-unnotified-contract",
            label: "区分赔偿与第三人买卖效力",
            meaning: "说明侵害优先购买不使许岚与陈舟的买卖合同仅因此无效。",
            acceptable:
              "认可法律含义相同、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不要求处理自动取得所有权、强制缔约或登记诉请。",
          },
        ],
      },
      {
        caseId: "civil-sale-lease-case-preemption-daughter",
        relatedTopicIds: ["civil-lease-preemption"],
        facts:
          "本案为原创教学虚构。赵宁单独所有一套住房，已出租给陆清至2027年底。2026年5月，赵宁拟以120万元、一次性付款的条件出售给自己的成年女儿赵禾。陆清得知后愿接受完全相同的条件，并要求仅凭自己是房屋承租人，就必须优先于赵禾购买。",
        hint: "结合本案事实，说明结论和关键理由即可。",
        sources: ["civil-sale-lease-preemption-code"],
        id: "civil-sale-lease-preemption-daughter-choice",
        kind: "objective",
        choiceMode: "single",
        title: "租赁住房出售给女儿的安排",
        prompt: "陆清是否当然享有本次出售的承租人优先购买权？",
        options: [
          {
            id: "a",
            text: "享有，承租人在任何出售中都优先于出租人的亲属。",
            explanation: "第726条明确出卖给近亲属的例外。",
          },
          {
            id: "b",
            text: "不享有，因为凡是房屋租赁都没有优先购买规则。",
            explanation: "一般向外部人出售仍有承租人优先购买规则。",
          },
          {
            id: "c",
            text: "不享有本次法定优先，赵禾是出租人的女儿，属于出卖给近亲属的例外。",
            explanation: "即使承租人愿意同等购买，也不能排除本次近亲属例外。",
          },
          {
            id: "d",
            text: "享有，只要先把120万元转给赵宁，就自动取得房屋所有权。",
            explanation: "缺少优先购买权基础，付款也不等于自动转移房屋所有权。",
          },
        ],
        answer: "c",
        reference:
          "选C。陆清不能仅凭承租人身份要求优先于赵禾。本次是出租人向自己的女儿出售，属于第726条近亲属例外；陆清愿出同样价款和付款方式也不改变这一点。",
      },
      {
        caseId: "civil-sale-lease-case-preemption-daughter",
        relatedTopicIds: ["civil-lease-preemption"],
        facts:
          "本案为原创教学虚构。赵宁单独所有一套住房，已出租给陆清至2027年底。2026年5月，赵宁拟以120万元、一次性付款的条件出售给自己的成年女儿赵禾。陆清得知后愿接受完全相同的条件，并要求仅凭自己是房屋承租人，就必须优先于赵禾购买。",
        hint: "结合本案事实，说明结论和关键理由即可。",
        sources: ["civil-sale-lease-preemption-code"],
        id: "civil-sale-lease-preemption-daughter-explain",
        kind: "subjective",
        title: "承租人与女儿提出的购买安排",
        prompt:
          "陆清愿意接受完全相同条件，是否就能依法优先于赵禾购买？请说明。",
        answer: "",
        reference:
          "不能。赵禾是赵宁的女儿，本次属于出租人将房屋出售给近亲属的情形，依法排除这里的承租人优先购买权。陆清即使愿按相同价款、付款条件购买，也不能仅凭承租人身份主张优先。",
        criteria: [
          {
            id: "civil-sale-lease-preemption-daughter-exception",
            label: "联系女儿身份适用近亲属例外",
            meaning:
              "联系受让人为出租人女儿，说明属于近亲属例外，陆清同等条件购买的意愿不足以产生本次法定优先。",
            acceptable:
              "认可法律含义相同、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "只排除本次例外，不否定一般对外出售规则，也不要求讨论原租约是否继续。",
          },
        ],
      },
    ],
  },
];

export const civilSaleLeaseChapters = [
  {
    id: "CIV-SALE-PERFORMANCE",
    title: "买卖：交付与价款",
    section: "民法",
    topicIds: ["civil-sale-risk", "civil-sale-installment"],
  },
  {
    id: "CIV-SALE-INSPECTION",
    title: "买卖：检验与样品",
    section: "民法",
    topicIds: ["civil-sale-inspection", "civil-sale-sample"],
  },
  {
    id: "CIV-LEASE-USE",
    title: "租赁使用与转租",
    section: "民法",
    topicIds: ["civil-lease-repair", "civil-lease-sublease"],
  },
  {
    id: "CIV-LEASE-TRANSFER",
    title: "租赁物转让与优先购买",
    section: "民法",
    topicIds: ["civil-lease-ownership-change", "civil-lease-preemption"],
  },
];

export const civilSaleLeaseExercises = civilSaleLeaseTopics.flatMap(
  (topic) => topic.exercises,
);
export const civilSaleLeaseContentPack = {
  revision: civilSaleLeaseRevision,
  snapshot: {
    topics: civilSaleLeaseTopics,
    sources: civilSaleLeaseSources,
  },
};
export const civilSaleLeaseDefaultQueues = {
  objective: civilSaleLeaseExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilSaleLeaseExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilSaleLeaseQuestion(id: string) {
  const question = civilSaleLeaseExercises.find((q) => q.id === id);
  return question ? structuredClone(question) : undefined;
}
export function civilSaleLeaseTopicForQuestion(id: string) {
  return civilSaleLeaseTopics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function civilSaleLeaseSameCaseQuestions(id: string) {
  const question = civilSaleLeaseQuestion(id);
  return question
    ? structuredClone(
        civilSaleLeaseExercises.filter((q) => q.caseId === question.caseId),
      )
    : [];
}
export function civilSaleLeaseChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = civilSaleLeaseChapters.find((c) => c.id === chapterId);
  return chapter
    ? civilSaleLeaseTopics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}
