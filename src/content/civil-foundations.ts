import type { ContentSources, FaultTopic } from "./fault-unit";

// Original teaching cases. Paired forms share a case and are not independent assessments.
export const civilFoundationsRevision = "civil-foundations-2026-10-22.v1";

export const civilFoundationsSources: ContentSources = {
  "civil-capacity-code-minor": {
    title: "《民法典》第19、20、144、145条：未成年人的行为能力与交易效力",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-22直接核读最高人民法院所载法典原文；民法典2020-05-28通过，2021-01-01施行。本组区分不满8周岁独立行为无效、限制能力人的两类独立有效行为及其他行为的同意追认；并读第23、27条核监护人的法定代理身份。不展开催告追认期限、相对人撤销、返还赔偿或成年人精神健康认定。案例均为本项目新编。",
  },
  "civil-capacity-code-earned-living": {
    title:
      "《民法典》第17、18、19条：已满16周岁未成年人以劳动收入为主要生活来源",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-22直接核读第17、18、19条及第1260条施行规定。十六周岁以上未成年人以自己的劳动收入为主要生活来源，视为完全民事行为能力人；未满18仍不是成年人。本组以实际收入和生活费用事实判断，不创设统一工资数额、工作月数或父母零补助条件，不处理劳动用工或其他专门资格问题。",
  },
  "civil-capacity-age-fit-interpretation": {
    title: "最高法总则编解释第5条：年龄、智力适应的具体判断",
    url: "https://ipc.court.gov.cn/zh-cn/news/view-1792.html",
    note: "最高人民法院官方附全文，法释〔2022〕6号，自2022-03-01施行；2026-10-22直接核读第5条。结合行为与生活的关联、本人理解及预见后果的能力、标的数量与价款等判断，不以某个金额自动划界。本组只据此选择事实清楚的小额学习用品与不理解高额分期负担的对照，不引用官方案例或旧机构题库。",
  },
  "civil-foundation-limitation188": {
    title: "《民法典》第188、192、193条：起算、届满与抗辩",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-22直接核对最高法转载的民法典全文，2021-01-01施行。本组只用普通金钱请求权与财产损害赔偿请求权；不用于第196条列明的不适用诉讼时效的请求权，不考最长保护期延长或时效中止。",
  },
  "civil-foundation-limitation195": {
    title: "《民法典》第192、195条：中断及届满后同意履行",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-22核对第192、195条。区分期间内到达义务人的履行请求导致时效中断，与期间届满后义务人同意履行。题设远离期间末日，不以发出但未到达的通知推定中断。",
  },
  "civil-foundation-property209": {
    title: "《民法典》第209、214、215条：不动产登记与合同效力",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-22核对第209、214、215条。只考有处分权人普通商品房买卖的转移登记，不含继承、生效法律文书等非登记取得及宅基地等特殊制度。所有权变动与合同效力、交房义务分别判断。",
  },
  "civil-foundation-property221": {
    title: "《民法典》第221条：预告登记",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-22核对第221条。预告登记保障将来的物权实现，不等于已经完成所有权转移；自能够办理登记之日起九十日内未申请登记，预告登记失效。本组不考精确末日和善意取得争议。",
  },
  "civil-foundation-property-interpretation4": {
    title: "最高法民法典物权编解释（一）第4条：未经预告登记权利人同意的处分",
    url: "https://www.court.gov.cn/fabu/xiangqing/282101.html",
    note: "法释〔2020〕24号，2020-12-29公布，2021-01-01施行；2026-10-22打开最高法原文核对第4条。该页有原文与施行日期，但未单独标注截至今日的现行状态；另一官方索引重定向失败，不将搜索摘要算作全文或完整清理核验。只采用与民法典第221条直接一致的基础规则。",
  },
};

export const civilFoundationsTopics: FaultTopic[] = [
  {
    id: "civil-capacity-minor",
    title: "未成年人的行为能力与交易效力",
    headline: "先看年龄，再看交易内容与法定代理人的参与。",
    goal: "区分不满8周岁独立行为、限制能力人的独立有效行为及须同意追认的交易。",
    prerequisite:
      "知道买卖和接受赠与都是民事法律行为；本组只看行为能力造成的效力问题。",
    minutes: "8–12",
    paragraphs: [
      "不满8周岁的未成年人没有民事行为能力，由法定代理人代理实施民事法律行为；其自己实施的民事法律行为无效（第20、144条）。8周岁以上的未成年人一般为限制民事行为能力人；已满16周岁、自养的特别情形见下一知识点。",
      "限制能力人可以独立实施纯获利益的行为，以及与年龄、智力相适应的行为，这些行为有效（第19、145条）。是否相适应，要看与生活的关联、理解及预见后果的能力和标的价款，不能只用“未满18”或“钱是自己的”判断。",
      "其他交易应由法定代理人代理，或经其同意、追认。本人未经同意实施且尚未获追认时效力待定，追认后有效；不要把限制能力人的所有交易都判成永久无效。",
    ],
    example: {
      title: "小学生买学习字典",
      facts:
        "11周岁的周箬为本学期语文课购买一本32元的字典。她比对了目录和标价，用积攒的50元零花钱付款，取回18元找零，随后带到学校查生字。店员后来以父母没有到场同意为由，称这笔购买不能生效。",
      analysis:
        "周箬11周岁，但32元字典是日常学习用品，购买行为与其年龄、理解能力相适应，可以独立有效；无需只因父母未到场就否定效力。",
    },
    pitfall: "把所有未成年人交易都判无效，或把有自己的钱当成取得独立订约能力。",
    recall: {
      prompt: "8周岁以上未成年人哪些行为可独立有效，其他交易怎么办？",
      reference:
        "纯获利益或与年龄、智力相适应的行为可独立有效；其他交易须法定代理人代理或同意、追认。不满8周岁自己的行为无效，不能混用追认规则。",
    },
    sources: [
      "civil-capacity-code-minor",
      "civil-capacity-age-fit-interpretation",
    ],
    exercises: [
      {
        id: "civil-foundation-capacity-under-eight-choice",
        caseId: "CIV-FOUNDATION-CAPACITY-01",
        relatedTopicIds: ["civil-capacity-minor"],
        kind: "objective",
        choiceMode: "single",
        title: "用自己的压岁钱买模型车",
        facts:
          "7周岁10个月的陆溪独自到模型店，用自己的压岁钱1800元购买一辆遥控模型车并付清价款。父母没有参与这笔交易，也未委托陆溪代为购买。店主认为，既然花的是陆溪自己的钱，这份买卖就已经有效。",
        prompt: "仅就行为能力与这笔独立购买的效力，下列哪项正确？",
        options: [
          {
            id: "a",
            text: "买卖有效，因为价款属于陆溪本人。",
            explanation: "财产归属不能代替年龄所决定的行为能力。",
          },
          {
            id: "b",
            text: "陆溪独立实施的这笔买卖行为无效。",
            explanation:
              "陆溪不满8周岁，适用无民事行为能力人独立行为无效的规则。",
          },
          {
            id: "c",
            text: "这笔原有买卖只是效力待定，父母追认即可使原行为有效。",
            explanation:
              "不能把限制民事行为能力人的追认规则移用于不满8周岁的独立行为。",
          },
          {
            id: "d",
            text: "只要购买的是玩具，就一律无需法定代理人。",
            explanation: "商品类别不消除不满8周岁的行为能力限制。",
          },
        ],
        answer: "b",
        hint: "先判断行为能力，再看这笔独立交易的效力。",
        reference:
          "选B。陆溪不满8周岁，属于无民事行为能力人；依第20、144条，他自行实施的这笔买卖行为无效。压岁钱属于本人、价款已经付清，都不能使其取得独立订约能力，也不能套用限制能力人的追认规则。",
        sources: ["civil-capacity-code-minor"],
      },
      {
        id: "civil-foundation-capacity-unburdened-gift-choice",
        caseId: "CIV-FOUNDATION-CAPACITY-02",
        relatedTopicIds: ["civil-capacity-minor"],
        kind: "objective",
        choiceMode: "single",
        title: "没有附带义务的生日礼物",
        facts:
          "12周岁的叶舟生日时，姨母对他说：“这500元送给你作生日礼物，不用归还，也不用替我做任何事情。”叶舟当场接受，姨母随即将钱交给他。叶舟父母事前没有参与。",
        prompt: "仅就叶舟能否独立接受这份赠与，下列哪项正确？",
        options: [
          {
            id: "a",
            text: "必须等父母另行同意，赠与才能有效。",
            explanation: "忽略限制能力人可以独立实施纯获利益行为的例外。",
          },
          {
            id: "b",
            text: "叶舟未满18周岁，接受赠与也当然无效。",
            explanation: "未成年人实施的行为并非一律无效。",
          },
          {
            id: "c",
            text: "接受有效，因此叶舟以后可以独立订立任何合同。",
            explanation: "某项纯获利益行为有效，不等于取得完全民事行为能力。",
          },
          {
            id: "d",
            text: "接受有效，这是叶舟可以独立实施的纯获利益行为。",
            explanation: "赠与没有付款、返还或其他义务，只使叶舟获得利益。",
          },
        ],
        answer: "d",
        hint: "看接受礼物是否使孩子承担义务。",
        reference:
          "选D。叶舟虽为限制民事行为能力人，但接受这500元既不用返还，也不承担其他义务，属于纯获利益的行为。依第19、145条可以独立实施并发生效力，无需再以父母同意为条件。",
        sources: ["civil-capacity-code-minor"],
      },
      {
        id: "civil-foundation-capacity-school-purchase-explain",
        caseId: "CIV-FOUNDATION-CAPACITY-03",
        relatedTopicIds: ["civil-capacity-minor"],
        kind: "subjective",
        title: "买字典一定要父母签字吗",
        facts:
          "11周岁的周箬为本学期语文课购买一本32元的字典。她比对了目录和标价，用积攒的50元零花钱付款，取回18元找零，随后带到学校查生字。店员后来以父母没有到场同意为由，称这笔购买不能生效。",
        prompt:
          "店员的说法能否成立？请结合周箬的年龄和购买事项，说明这次购买的效力。",
        answer: "",
        hint: "联系学习用途、价款和孩子对购买行为的理解。",
        reference:
          "店员的说法不能成立。周箬11周岁，属于限制民事行为能力人，但购买32元字典与其学习生活、年龄和理解能力相适应。依第19、145条，她可以独立实施这笔购买，父母没有到场同意不妨碍其有效。",
        criteria: [
          {
            id: "capacity-minor-school-fit",
            label: "本次学习用品购买可以独立有效",
            meaning:
              "联系周箬11周岁及字典的学习用途、小额价款和具体购买表现，说明该行为与其年龄、智力相适应，可以独立有效，不必等父母同意。",
            acceptable:
              "能用自己的话把日常购买事实与有效结论连起来即可，不要求固定术语或条号。",
            boundary: "不能只因未满18周岁否定效力；不要求讨论返还或其他交易。",
          },
        ],
        sources: [
          "civil-capacity-code-minor",
          "civil-capacity-age-fit-interpretation",
        ],
      },
      {
        id: "civil-foundation-capacity-camera-ratification-explain",
        caseId: "CIV-FOUNDATION-CAPACITY-04",
        relatedTopicIds: ["civil-capacity-minor"],
        kind: "subjective",
        title: "母亲看清购买单之后",
        facts:
          "13周岁的秦佑每月零花钱60元，平时只独立购买文具。他到摄影店订购一套总价12800元的专业摄影设备，购买单写明先付800元、余款分12个月付清。秦佑签字时以为800元就是全部价款，同学指出余款条款后，他说自己没有看懂。父母事前未同意。两天后，作为监护人的母亲到店核清设备、总价和付款安排，明确向店主表示同意这份购买单并按约履行，店主听清并接受。",
        prompt:
          "仅就行为能力问题，秦佑订约时与母亲作出上述表示后，这笔购买的效力有何不同？请联系交易负担及母亲的行为说明。",
        answer: "",
        hint: "分别看订约时的行为与之后法定代理人的同意。",
        reference:
          "秦佑订约时不能仅靠自己的签字使这笔购买生效。专业器材总价高、还须承担长期余款，秦佑连余款义务也未理解，已超出与其年龄、智力相适应的日常交易；父母事前未同意，依第145条尚待法定代理人追认。母亲作为监护人核清全部安排后，当面明确同意这份购买单，构成追认，补正了行为能力方面的效力欠缺；不能把13岁自行订约一概视为永远无效。",
        criteria: [
          {
            id: "capacity-minor-camera-pending",
            label: "订约时须待法定代理人认可",
            meaning:
              "联系高额专业器材、长期付款和秦佑未理解余款义务，说明该交易不属其可独立有效的行为；事前未经同意时效力待定。",
            acceptable:
              "说明这笔交易不能只靠孩子签字生效、还须法定代理人认可即可。",
            boundary:
              "要联系本案负担或理解情况，不仅按某个价款硬划界；不计算分期金额。",
          },
          {
            id: "capacity-minor-camera-ratified",
            label: "母亲明确同意构成追认",
            meaning:
              "母亲是监护人和法定代理人，核清交易后向店主明确同意原购买单，构成追认，使这笔购买在行为能力方面获得效力补正。",
            acceptable:
              "说明母亲看清后认可原交易可以使其生效即可，不要求固定追认措辞。",
            boundary: "本问只看行为能力效力，不展开重大误解、返还或违约责任。",
          },
        ],
        sources: [
          "civil-capacity-code-minor",
          "civil-capacity-age-fit-interpretation",
        ],
      },
    ],
  },
  {
    id: "civil-capacity-earned-living",
    title: "以劳动收入为主要生活来源的未成年人",
    headline: "已满16周岁且实际主要靠本人劳动收入生活，才适用特别规则。",
    goal: "根据年龄、劳动收入和实际生活支出，判断是否视为完全民事行为能力人。",
    prerequisite:
      "已知道8周岁以上未成年人一般限制行为能力；这里是未成年人中的特别规定。",
    minutes: "8–12",
    paragraphs: [
      "已满16周岁而未满18周岁，以自己的劳动收入为主要生活来源的，视为完全民事行为能力人，可以独立实施民事法律行为（第18条第二款）。两个条件须同时满足；未满16周岁不能用收入条件代替年龄。",
      "有过兼职、领到工资不等于已经靠它生活。要看本人劳动收入是否实际负担主要日常生活费用；父母偶尔少量补助也不当然排除。法条不要求统一的工资金额、工作月数或完全没有父母帮助。",
      "视为完全民事行为能力人，不是提前变成成年人。未满18仍是未成年人，只是在这里可以独立实施民事法律行为；不把这一结论扩成取得一切特殊资格。",
    ],
    example: {
      title: "书店工资与日常开支",
      facts:
        "16周岁9个月的孟遥在书店工作，近9个月每月工资3800元，均有工资流水。她每月从工资中支付约2800元的住宿、伙食、交通和日用品费用，父母只偶尔给一两百元零用。孟遥用积蓄以1600元购买一辆普通自行车，与店主当场谈妥后签了购买单。店主后来仅以孟遥未满18周岁、父母没签字为由，称她不能独立订立这份买卖。",
      analysis:
        "孟遥已满16周岁，本人工资实际承担主要生活开支，少量偶发零用不改变这一事实。她视为完全民事行为能力人，这笔普通购买不须等父母签字；未满18仍是未成年人。",
    },
    pitfall:
      "只看已满16岁、有一笔工资或存款，却不核对劳动收入是否成为主要生活来源。",
    recall: {
      prompt: "为什么“17岁做过兼职”不能自动推出完全民事行为能力？",
      reference:
        "还须本人劳动收入实际是主要生活来源。主要费用仍由父母负担、兼职只作零花钱时，不符合这条特别规定；未满16岁也不能适用。",
    },
    sources: ["civil-capacity-code-earned-living"],
    exercises: [
      {
        id: "civil-foundation-capacity-wage-primary-choice",
        caseId: "CIV-FOUNDATION-CAPACITY-05",
        relatedTopicIds: ["civil-capacity-earned-living"],
        kind: "objective",
        choiceMode: "single",
        title: "工资承担日常生活后买自行车",
        facts:
          "16周岁9个月的孟遥在书店工作，近9个月每月工资3800元，均有工资流水。她每月从工资中支付约2800元的住宿、伙食、交通和日用品费用，父母只偶尔给一两百元零用。孟遥用积蓄以1600元购买一辆普通自行车，与店主当场谈妥后签了购买单。店主后来仅以孟遥未满18周岁、父母没签字为由，称她不能独立订立这份买卖。",
        prompt: "仅就孟遥的行为能力，哪项最能回应店主提出的理由？",
        options: [
          {
            id: "a",
            text: "未满18周岁一律只能由父母代为订约。",
            explanation: "忽略第18条第二款对已满16周岁、自养未成年人的规定。",
          },
          {
            id: "b",
            text: "孟遥已经成为成年人，所以能够独立订约。",
            explanation:
              "视为完全民事行为能力人不改变其未满18周岁的未成年人身份。",
          },
          {
            id: "c",
            text: "孟遥以本人工资实际负担主要生活，依法视为完全民事行为能力人，可以独立购买。",
            explanation:
              "已满16周岁，持续劳动收入实际支付主要日常生活费用，对应法定条件。",
          },
          {
            id: "d",
            text: "父母偶尔给零用钱，就绝不可能以劳动收入为主要生活来源。",
            explanation:
              "主要生活来源不要求一切生活支出只能来自本人，偶尔小额补助不当然排除。",
          },
        ],
        answer: "c",
        hint: "看生活费用实际主要由哪一类收入负担。",
        reference:
          "选C。孟遥已满16周岁，3800元工资实际负担约2800元的日常生活费用，本人劳动收入已是主要生活来源，依第18条第二款视为完全民事行为能力人，可以独立订立这笔普通买卖。父母偶尔给少量零用不改变主要来源，也不能因未满18周岁就要求父母签字。她仍是未成年人。",
        sources: ["civil-capacity-code-earned-living"],
      },
      {
        id: "civil-foundation-capacity-holiday-income-choice",
        caseId: "CIV-FOUNDATION-CAPACITY-06",
        relatedTopicIds: ["civil-capacity-earned-living"],
        kind: "objective",
        choiceMode: "single",
        title: "一段假期兼职是否足够",
        facts:
          "17周岁的高岑在读高中，假期做了六周整理图书的兼职，取得2400元报酬。开学后不再兼职，平时食宿、交通及学习费用持续由父母负担；这笔兼职报酬留作零花钱。高岑认为，有了自己的工资，就已经可以按完全民事行为能力人对待。",
        prompt: "依给定的年龄、收入和日常生活来源，哪项判断正确？",
        options: [
          {
            id: "a",
            text: "高岑仍为限制民事行为能力人，不能只凭这次兼职视为完全能力人。",
            explanation: "主要日常开支仍由父母负担，兼职报酬只是零花钱。",
          },
          {
            id: "b",
            text: "高岑已满16周岁，是否自养都不影响其完全能力。",
            explanation: "年龄与本人劳动收入为主要生活来源是同时需要的条件。",
          },
          {
            id: "c",
            text: "只要收到一笔工资，就自动变为完全民事行为能力人。",
            explanation: "有过劳动收入不等于该收入成为主要生活来源。",
          },
          {
            id: "d",
            text: "高岑不能靠工资生活，所以属于无民事行为能力人。",
            explanation: "不能把不满足完全能力特别条件误当作无民事行为能力。",
          },
        ],
        answer: "a",
        hint: "分别核对有过劳动收入与主要生活来源。",
        reference:
          "选A。高岑虽17周岁并取得2400元兼职报酬，但平时食宿等主要生活费用仍持续由父母负担，这笔工资只作零花钱，不符合第18条第二款的主要生活来源条件。他仍按第19条属于限制民事行为能力人，不是无民事行为能力人。",
        sources: ["civil-capacity-code-earned-living"],
      },
      {
        id: "civil-foundation-capacity-clerk-purchase-explain",
        caseId: "CIV-FOUNDATION-CAPACITY-07",
        relatedTopicIds: ["civil-capacity-earned-living"],
        kind: "subjective",
        title: "自己挣钱生活的17岁买家",
        facts:
          "17周岁4个月的杜予在一家公司做资料录入，连续8个月每月领取4200元工资。她每月用工资支付约3300元的合租住宿、伙食和交通等生活费用，父母没有再负担这些费用。杜予与商家谈妥购买一台3600元的二手电脑，自己签字并支付价款。商家只因父母没有同意，主张这笔购买尚不能生效。",
        prompt:
          "商家能否仅以父母未同意为由否定杜予这笔购买的效力？请结合她的年龄及生活来源说明。",
        answer: "",
        hint: "把年龄、本人劳动收入和实际生活支出连起来。",
        reference:
          "不能。杜予已满16周岁，持续取得本人工资，并以工资支付自己的主要日常生活费用，符合第18条第二款，视为完全民事行为能力人。她可以独立订立这笔普通电脑买卖，不能仅因未满18周岁、父母未同意就认定其效力待定。",
        criteria: [
          {
            id: "capacity-earned-clerk-status",
            label: "结合实际自养事实判断完全能力",
            meaning:
              "联系杜予17周岁、工资收入及实际支付主要生活费用，说明其符合第18条第二款，视为完全民事行为能力人。",
            acceptable:
              "用日常语言说明已经满16且主要靠自己的工资生活，因此可按完全能力处理即可。",
            boundary:
              "不能只凭有工作或工资数额下结论；不设统一工资或月份门槛。",
          },
          {
            id: "capacity-earned-clerk-purchase",
            label: "普通购买不必再等父母同意",
            meaning:
              "杜予具有该项完全民事行为能力，可以独立订立这笔普通买卖，父母未同意不足以使其效力待定。",
            acceptable:
              "把独立购买和不需要父母另行认可的结论与前述身份联系即可。",
            boundary:
              "只判断本题普通交易的能力问题，不扩展特殊资格或其他效力争议。",
          },
        ],
        sources: ["civil-capacity-code-earned-living"],
      },
      {
        id: "civil-foundation-capacity-before-sixteen-explain",
        caseId: "CIV-FOUNDATION-CAPACITY-08",
        relatedTopicIds: ["civil-capacity-earned-living"],
        kind: "subjective",
        title: "生活费用已由稿酬承担，年龄仍差两个月",
        facts:
          "15周岁10个月的姜遥为期刊绘制插图，由父亲代其签订供稿合同。近8个月，姜遥每月因自己绘图取得约3500元稿酬，从中支付自己约2600元的住宿、伙食、交通和日用品费用，父母未另行负担这些费用。姜遥据此认为，自己现在已经可以按完全民事行为能力人对待。",
        prompt:
          "姜遥的判断是否成立？请结合她的实际年龄、稿酬与生活费用说明其行为能力类别。",
        answer: "",
        hint: "分别核对年龄和生活来源。",
        reference:
          "姜遥的判断不能成立。虽然题述稿酬已经实际承担其主要生活费用，但她尚未满16周岁，不符合第18条第二款的年龄条件，不能因此视为完全民事行为能力人。她15周岁，仍依第19条属于限制民事行为能力人，不能用收入事实替代年龄门槛。",
        criteria: [
          {
            id: "capacity-earned-age-required",
            label: "未满16不能以自养替代年龄条件",
            meaning:
              "联系姜遥只有15周岁10个月，说明即使本人稿酬实际负担主要生活费用，仍不满足已满16周岁的条件，应按限制民事行为能力人处理。",
            acceptable:
              "说明还没有满16岁，所以靠自己挣钱生活也不能按该条视为完全能力即可。",
            boundary:
              "不否定题中收入事实，也不把限制能力说成任何行为都无效；不评价供稿或用工规则。",
          },
        ],
        sources: ["civil-capacity-code-earned-living"],
      },
    ],
  },
  {
    id: "civil-limitation-start-expiry",
    title: "诉讼时效的起算与届满",
    headline:
      "普通诉讼时效通常为三年；先找知道损害和义务人的时间，届满后还要看对方是否抗辩。",
    goal: "普通三年从何时开始？届满后法院能否主动适用？",
    prerequisite: "知道合同、请求权与权利变动是不同问题。",
    minutes: "6–10",
    paragraphs: [
      "普通诉讼时效通常为三年，从权利人知道或者应当知道权利受损、义务人是谁时起算。只知道东西被损坏，却无法知道该向谁索赔，不能仅凭损坏日期就开始计算这三年。法律另有期间规定的，按特别规定。",
      "期间届满，义务人可以提出时效抗辩，债权本身并未因此消失。法院不能主动用诉讼时效替义务人拒绝履行。义务人自愿还了钱，也不能只因原来时效已过就要求退回。",
    ],
    example: {
      title: "设备早已损坏，赔偿请求已过时效吗？",
      facts:
        "本案为原创教学虚构。2022年6月，许禾发现仓库的专用设备被人毁坏，随即报案。现场无监控，许禾持续提供线索，仍无法查明是谁实施。2026年2月，警方查明行为人并书面告知许禾。在此之前，许禾没有能够识别该人的线索。许禾于2026年5月向其请求赔偿。本题适用普通三年诉讼时效。",
      analysis:
        "不能成立。许禾直到2026年2月才从警方处知道行为人，之前没有能够识别义务人的线索。普通三年应从同时知道损害和义务人时起算，因此2026年5月提出赔偿尚未超过时效。",
    },
    pitfall:
      "把损坏之日直接当起算日，或把时效届满理解成债务自动消失、法院必须主动驳回。",
    recall: {
      prompt: "普通三年从何时开始？届满后法院能否主动适用？",
      reference:
        "从知道或应当知道权利受损及义务人起算；届满产生抗辩，法院不得主动适用。",
    },
    sources: ["civil-foundation-limitation188"],
    exercises: [
      {
        caseId: "CIV-FOUNDATION-LIMITATION-IDENTITY",
        relatedTopicIds: ["civil-limitation-start-expiry"],
        facts:
          "本案为原创教学虚构。2022年6月，许禾发现仓库的专用设备被人毁坏，随即报案。现场无监控，许禾持续提供线索，仍无法查明是谁实施。2026年2月，警方查明行为人并书面告知许禾。在此之前，许禾没有能够识别该人的线索。许禾于2026年5月向其请求赔偿。本题适用普通三年诉讼时效。",
        hint: "结合案情说明结论和理由即可。",
        sources: ["civil-foundation-limitation188"],
        id: "civil-foundation-limitation-identity-choice",
        kind: "objective",
        title: "设备早已损坏，赔偿请求已过时效吗？",
        prompt: "关于本案三年诉讼时效，哪一项正确？",
        choiceMode: "single",
        answer: "b",
        options: [
          {
            id: "a",
            text: "从2022年发现设备损坏时起算，2026年的请求已经超过三年。",
            explanation:
              "起算还要求知道或应当知道义务人，题设此前无法识别行为人。",
          },
          {
            id: "b",
            text: "按题设从2026年警方告知行为人时起算，本次请求尚未超过三年。",
            explanation: "此时才同时具备知道损害和义务人的条件。",
          },
          {
            id: "c",
            text: "等许禾实际向法院起诉时才开始计算。",
            explanation: "起诉通常涉及中断，不是所有请求权的起算条件。",
          },
          {
            id: "d",
            text: "只能从警方作出刑事处理结论时起算。",
            explanation: "民事时效起算不以先有刑事结论为必要条件。",
          },
        ],
        reference:
          "选B。许禾早已知道设备受损，但到2026年2月才知道应向谁索赔，之前也没有应当知道的线索。普通三年从此时起算，2026年5月的请求没有超过时效。",
      },
      {
        caseId: "CIV-FOUNDATION-LIMITATION-IDENTITY",
        relatedTopicIds: ["civil-limitation-start-expiry"],
        facts:
          "本案为原创教学虚构。2022年6月，许禾发现仓库的专用设备被人毁坏，随即报案。现场无监控，许禾持续提供线索，仍无法查明是谁实施。2026年2月，警方查明行为人并书面告知许禾。在此之前，许禾没有能够识别该人的线索。许禾于2026年5月向其请求赔偿。本题适用普通三年诉讼时效。",
        hint: "结合案情说明结论和理由即可。",
        sources: ["civil-foundation-limitation188"],
        id: "civil-foundation-limitation-identity-explain",
        kind: "subjective",
        title: "说清设备损害赔偿的起算时间",
        prompt:
          "行为人以“设备2022年就坏了”为由主张已过三年，能否成立？请说明起算依据。",
        answer: "",
        reference:
          "不能成立。许禾直到2026年2月才从警方处知道行为人，之前没有能够识别义务人的线索。普通三年应从同时知道损害和义务人时起算，因此2026年5月提出赔偿尚未超过时效。",
        criteria: [
          {
            id: "limitation-identity-start",
            label: "从知道义务人时起算",
            meaning:
              "联系许禾2026年2月才知道行为人、此前也不应当知道，说明普通三年不只从发现损坏时起算。",
            acceptable:
              "认可法律含义相同、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不要求分析最长二十年、刑事追诉期限或证明标准。",
          },
          {
            id: "limitation-identity-result",
            label: "判断本次请求尚未超期",
            meaning: "根据2026年2月至5月的时间关系，否定已过三年的抗辩。",
            acceptable:
              "认可法律含义相同、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不要求精算起算次日或最终届满日。",
          },
        ],
      },
      {
        caseId: "CIV-FOUNDATION-LIMITATION-DEFENSE",
        relatedTopicIds: ["civil-limitation-start-expiry"],
        facts:
          "本案为原创教学虚构。成年周宁向陆川借款，约定2022年1月10日归还。到期后未还，陆川一直知道欠款人和到期情况，期间没有催款、承诺还款、诉讼，也没有中止事由。2026年2月陆川起诉。周宁在诉讼中只说“现在没钱，请宽限”，没有提出诉讼时效抗辩。",
        hint: "结合案情说明结论和理由即可。",
        sources: ["civil-foundation-limitation188"],
        id: "civil-foundation-limitation-defense-choice",
        kind: "objective",
        title: "时效已过，法院可以主动替被告抗辩吗？",
        prompt: "以下哪些判断正确？",
        choiceMode: "multiple",
        answer: "a,c",
        options: [
          {
            id: "a",
            text: "这笔借款的普通三年诉讼时效已经届满。",
            explanation: "从2022年到期后已超过三年，且无中断、中止事由。",
          },
          {
            id: "b",
            text: "法院可以直接以超过诉讼时效为由驳回请求。",
            explanation: "法院不得主动适用诉讼时效。",
          },
          {
            id: "c",
            text: "周宁未提出时效抗辩，法院不能主动以此替他拒绝履行。",
            explanation: "期间届满赋予义务人抗辩，不由法院主动代为行使。",
          },
          {
            id: "d",
            text: "借款债务已经因三年届满而消失。",
            explanation: "时效届满不等于债权本身消灭。",
          },
        ],
        reference:
          "选A、C。普通三年已经届满，但周宁没有提出时效抗辩，法院不能主动据此驳回陆川的请求。时效届满不等于欠款自动消失。",
        correctChoices: ["a", "c"],
      },
      {
        caseId: "CIV-FOUNDATION-LIMITATION-DEFENSE",
        relatedTopicIds: ["civil-limitation-start-expiry"],
        facts:
          "本案为原创教学虚构。成年周宁向陆川借款，约定2022年1月10日归还。到期后未还，陆川一直知道欠款人和到期情况，期间没有催款、承诺还款、诉讼，也没有中止事由。2026年2月陆川起诉。周宁在诉讼中只说“现在没钱，请宽限”，没有提出诉讼时效抗辩。",
        hint: "结合案情说明结论和理由即可。",
        sources: ["civil-foundation-limitation188"],
        id: "civil-foundation-limitation-defense-explain",
        kind: "subjective",
        title: "区分时效届满与法院主动适用",
        prompt:
          "本案普通三年是否已过？法院能否主动以诉讼时效届满为由驳回陆川的请求？",
        answer: "",
        reference:
          "普通三年已经届满：2022年到期后，陆川一直知道欠款情况，期间也没有中断、中止。可是周宁没有提出时效抗辩，法院不能主动以时效届满为由驳回请求。",
        criteria: [
          {
            id: "limitation-defense-expiry",
            label: "判断普通三年已经届满",
            meaning: "联系借款到期时间和无中断、中止，确认普通三年已过。",
            acceptable:
              "认可法律含义相同、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不把起诉较晚认成法院不能受理，也不要求列举中止事由。",
          },
          {
            id: "limitation-defense-court",
            label: "法院不得主动适用时效",
            meaning: "联系周宁未提时效抗辩，说明法院不能主动以此驳回请求。",
            acceptable:
              "认可法律含义相同、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "仅说债务未消失，未回应法院能否主动适用，还未完成本项。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-limitation-interruption",
    title: "时效中断与届满后同意履行",
    headline:
      "期间内有效催款可使时效重新起算；已过时效后承诺履行，要按另一条规则判断。",
    goal: "期间内催款与届满后承诺履行，分别怎么判断？",
    prerequisite: "知道合同、请求权与权利变动是不同问题。",
    minutes: "6–10",
    paragraphs: [
      "在诉讼时效期间内，权利人向义务人请求履行、义务人同意履行，以及提起诉讼或申请仲裁等，都可以使诉讼时效中断并重新计算。催款已到达义务人即可适用请求履行的规则，不必等对方同意，也不必非得先起诉。",
      "如果诉讼时效已经届满，义务人又同意履行，就不能再拿原来的时效届满拒绝履行。这与期间内的中断不同。只是在过期后收到催款，并不等于义务人已经同意履行。",
    ],
    example: {
      title: "不肯还钱，会阻止催款中断时效吗？",
      facts:
        "本案为原创教学虚构。方谦向姚青借款4万元，约定2023年1月31日归还，到期未还。2025年1月15日，姚青发信息要求方谦尽快还清，方谦当天回复“收到你的还款要求，但我不同意现在还”。2026年3月姚青起诉。其间没有其他影响期间的事实。方谦说：“你三年内没有告我，已经过时效了。”",
      analysis:
        "不能成立。姚青在原时效期间内催款，方谦回复“收到”证明履行请求已经到达。诉讼时效由此中断并重新计算，不必等方谦同意还款。2026年3月起诉仍在重新起算的三年内。",
    },
    pitfall:
      "把时效中断限定为起诉，或把届满后的任何催款都说成债务人已同意履行。",
    recall: {
      prompt: "期间内催款与届满后承诺履行，分别怎么判断？",
      reference:
        "期间内到达义务人的履行请求可导致中断并重新计算；届满后同意履行，不能再以原时效届满抗辩。",
    },
    sources: ["civil-foundation-limitation195"],
    exercises: [
      {
        caseId: "CIV-FOUNDATION-LIMITATION-DEMAND",
        relatedTopicIds: ["civil-limitation-interruption"],
        facts:
          "本案为原创教学虚构。方谦向姚青借款4万元，约定2023年1月31日归还，到期未还。2025年1月15日，姚青发信息要求方谦尽快还清，方谦当天回复“收到你的还款要求，但我不同意现在还”。2026年3月姚青起诉。其间没有其他影响期间的事实。方谦说：“你三年内没有告我，已经过时效了。”",
        hint: "结合案情说明结论和理由即可。",
        sources: ["civil-foundation-limitation195"],
        id: "civil-foundation-limitation-demand-choice",
        kind: "objective",
        title: "不肯还钱，会阻止催款中断时效吗？",
        prompt: "本次起诉是否已超过普通诉讼时效？",
        choiceMode: "single",
        answer: "c",
        options: [
          {
            id: "a",
            text: "已经超过，因为只有起诉或仲裁才能中断。",
            explanation: "请求履行也属于法定中断事由。",
          },
          {
            id: "b",
            text: "已经超过，因为方谦收到信息后明确拒绝还款。",
            explanation: "收到履行请求可导致中断，不以义务人同意为条件。",
          },
          {
            id: "c",
            text: "尚未超过，2025年的还款要求已到达方谦，三年应重新计算。",
            explanation: "催款在原期间内到达，2026年起诉仍在重新起算的三年内。",
          },
          {
            id: "d",
            text: "尚未超过，但必须等法院判决后才能确认催款中断。",
            explanation: "本案到达事实明确，中断不以之后取得胜诉判决为条件。",
          },
        ],
        reference:
          "选C。2025年1月的还款要求已到达方谦，使诉讼时效中断并重新计算。方谦拒绝还款不影响这次中断，2026年3月起诉尚未超过三年。",
      },
      {
        caseId: "CIV-FOUNDATION-LIMITATION-DEMAND",
        relatedTopicIds: ["civil-limitation-interruption"],
        facts:
          "本案为原创教学虚构。方谦向姚青借款4万元，约定2023年1月31日归还，到期未还。2025年1月15日，姚青发信息要求方谦尽快还清，方谦当天回复“收到你的还款要求，但我不同意现在还”。2026年3月姚青起诉。其间没有其他影响期间的事实。方谦说：“你三年内没有告我，已经过时效了。”",
        hint: "结合案情说明结论和理由即可。",
        sources: ["civil-foundation-limitation195"],
        id: "civil-foundation-limitation-demand-explain",
        kind: "subjective",
        title: "回应“三年没告我就超期”",
        prompt: "方谦的时效抗辩能否成立？请结合2025年的信息说明。",
        answer: "",
        reference:
          "不能成立。姚青在原时效期间内催款，方谦回复“收到”证明履行请求已经到达。诉讼时效由此中断并重新计算，不必等方谦同意还款。2026年3月起诉仍在重新起算的三年内。",
        criteria: [
          {
            id: "limitation-demand-interrupt",
            label: "联系催款到达认定中断",
            meaning:
              "说明2025年期间内催款已到达方谦，属于请求履行导致中断；其拒绝不影响这一结果。",
            acceptable:
              "认可法律含义相同、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "不要求引用司法解释条号；不能只说对方回复就等于承诺还款。",
          },
          {
            id: "limitation-demand-result",
            label: "按重新起算判断未超期",
            meaning: "联系中断后重新起算，确认2026年3月的起诉未过三年。",
            acceptable:
              "认可法律含义相同、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不要求计算最终届满日或补充其他中断事件。",
          },
        ],
      },
      {
        caseId: "CIV-FOUNDATION-LIMITATION-PROMISE",
        relatedTopicIds: ["civil-limitation-interruption"],
        facts:
          "本案为原创教学虚构。林远向赵晴所借2万元普通借款于2021年7月1日到期。此后三年没有催款、还款承诺、诉讼或中止事由。2025年8月，林远在核对欠款后签字承诺：“我同意偿还这2万元借款，2025年9月底付清。”约定日期后仍未付款。2026年6月赵晴起诉，林远仅以“原借款的三年早在2024年就过了”为由拒绝。",
        hint: "结合案情说明结论和理由即可。",
        sources: ["civil-foundation-limitation195"],
        id: "civil-foundation-limitation-promise-choice",
        kind: "objective",
        title: "过期后写下还款承诺，还能拿旧时效拒绝吗？",
        prompt: "针对林远提出的原时效抗辩，哪一项正确？",
        choiceMode: "single",
        answer: "b",
        options: [
          {
            id: "a",
            text: "抗辩成立，因为承诺写在时效届满之后，不能产生任何影响。",
            explanation: "忽略了届满后同意履行的法定效果。",
          },
          {
            id: "b",
            text: "抗辩不成立，林远在届满后明确同意履行，不能再以原时效届满拒绝。",
            explanation: "对应第192条第2款，判断对象是原来的时效抗辩。",
          },
          {
            id: "c",
            text: "抗辩不成立，因为赵晴在2025年找他就自动中断了尚未届满的时效。",
            explanation:
              "原期间已经届满，本案关键是林远同意履行，不是仍在运行的原期间中断。",
          },
          {
            id: "d",
            text: "抗辩成立，只有实际还完钱才算同意履行。",
            explanation: "明确还款承诺即属于同意履行，不必等全部付清。",
          },
        ],
        reference:
          "选B。林远在原时效届满后，签字同意偿还借款，不能再以原来的时效届满拒绝。这里适用的是届满后同意履行的规则，不是把已届满的原期间当成仍在运行。",
      },
      {
        caseId: "CIV-FOUNDATION-LIMITATION-PROMISE",
        relatedTopicIds: ["civil-limitation-interruption"],
        facts:
          "本案为原创教学虚构。林远向赵晴所借2万元普通借款于2021年7月1日到期。此后三年没有催款、还款承诺、诉讼或中止事由。2025年8月，林远在核对欠款后签字承诺：“我同意偿还这2万元借款，2025年9月底付清。”约定日期后仍未付款。2026年6月赵晴起诉，林远仅以“原借款的三年早在2024年就过了”为由拒绝。",
        hint: "结合案情说明结论和理由即可。",
        sources: ["civil-foundation-limitation195"],
        id: "civil-foundation-limitation-promise-explain",
        kind: "subjective",
        title: "说清届满后承诺的法律效果",
        prompt:
          "林远能否以原借款三年已过拒绝履行？请指出2025年签字承诺的作用。",
        answer: "",
        reference:
          "不能。林远在2025年签字确认并同意偿还借款，属于时效届满后同意履行。依民法典第192条，他不能再以原诉讼时效已经届满为由拒绝还款。",
        criteria: [
          {
            id: "limitation-promise-effect",
            label: "联系届满后同意履行否定原抗辩",
            meaning:
              "联系原时效已过及2025年签字还款承诺，说明林远不能再用原时效届满拒绝。",
            acceptable:
              "认可法律含义相同、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "不要求评价新的时效届满日、债务更新或另立新借款；只把赵晴再次催款当作尚在运行的原期间中断不够。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-property-registration-contract",
    title: "不动产登记与合同效力",
    headline: "买卖合同是否有效，和房屋所有权是否转移，要分开判断。",
    goal: "房款、交房、合同效力和转移登记应如何区分？",
    prerequisite: "知道合同、请求权与权利变动是不同问题。",
    minutes: "6–10",
    paragraphs: [
      "普通房屋买卖中，转移所有权以登记为准。签了合同、付了房款、拿到钥匙，都不能替代转移登记。登记完成的时间，是转移事项记载于不动产登记簿的时间，不是领取证书的时间。",
      "没有办理转移登记，不会仅因此使买卖合同无效。有效合同仍约束双方，买方可以按约请求卖方协助过户，卖方也仍须履行交房等义务。继承、生效法律文书等另有物权变动规则，本组只练普通买卖。",
    ],
    example: {
      title: "付清房款并入住，房子已经属于买方吗？",
      facts:
        "本案为原创教学虚构。成年许衡将自己登记所有的一套普通商品房卖给苏遥。双方签订的买卖合同没有其他效力问题。苏遥付清房款，许衡交出钥匙，苏遥已经入住，但双方还未申请房屋所有权转移登记。许衡后来提出：“没过户，合同也没效，我不必协助登记。”",
      analysis:
        "苏遥尚未取得所有权，普通房屋买卖须完成转移登记。许衡说合同无效是错的：未过户本身不影响合同效力，苏遥仍可按有效合同要求他协助登记。",
    },
    pitfall: "把未过户说成合同无效，或把交钥匙、领证当作房屋所有权转移的时间。",
    recall: {
      prompt: "房款、交房、合同效力和转移登记应如何区分？",
      reference:
        "普通房屋买卖在记载登记簿时转移所有权；未登记本身不影响有效合同的效力，交房义务另行履行。",
    },
    sources: ["civil-foundation-property209"],
    exercises: [
      {
        caseId: "CIV-FOUNDATION-PROPERTY-UNREGISTERED",
        relatedTopicIds: ["civil-property-registration-contract"],
        facts:
          "本案为原创教学虚构。成年许衡将自己登记所有的一套普通商品房卖给苏遥。双方签订的买卖合同没有其他效力问题。苏遥付清房款，许衡交出钥匙，苏遥已经入住，但双方还未申请房屋所有权转移登记。许衡后来提出：“没过户，合同也没效，我不必协助登记。”",
        hint: "结合案情说明结论和理由即可。",
        sources: ["civil-foundation-property209"],
        id: "civil-foundation-property-unregistered-choice",
        kind: "objective",
        title: "付清房款并入住，房子已经属于买方吗？",
        prompt: "以下哪些判断正确？",
        choiceMode: "multiple",
        answer: "b,d",
        options: [
          {
            id: "a",
            text: "苏遥已经取得所有权，因为房款和钥匙都已交付。",
            explanation: "普通房屋买卖不能用付款和占有替代转移登记。",
          },
          {
            id: "b",
            text: "苏遥尚未因这次买卖取得房屋所有权。",
            explanation: "转移事项还未记载登记簿。",
          },
          {
            id: "c",
            text: "合同因未登记而无效，双方只能返还财物。",
            explanation: "未登记本身不影响买卖合同的效力。",
          },
          {
            id: "d",
            text: "买卖合同仍有效，苏遥可依约请求许衡协助办理登记。",
            explanation: "合同效力与物权转移分别判断。",
          },
        ],
        reference:
          "选B、D。苏遥还未完成转移登记，尚未取得房屋所有权；但买卖合同仍有效，可以按约要求许衡协助过户。付清房款和入住不能替代登记。",
        correctChoices: ["b", "d"],
      },
      {
        caseId: "CIV-FOUNDATION-PROPERTY-UNREGISTERED",
        relatedTopicIds: ["civil-property-registration-contract"],
        facts:
          "本案为原创教学虚构。成年许衡将自己登记所有的一套普通商品房卖给苏遥。双方签订的买卖合同没有其他效力问题。苏遥付清房款，许衡交出钥匙，苏遥已经入住，但双方还未申请房屋所有权转移登记。许衡后来提出：“没过户，合同也没效，我不必协助登记。”",
        hint: "结合案情说明结论和理由即可。",
        sources: ["civil-foundation-property209"],
        id: "civil-foundation-property-unregistered-explain",
        kind: "subjective",
        title: "未过户能否成为不履行合同的理由？",
        prompt:
          "苏遥是否已取得所有权？许衡以未过户为由否认合同效力，是否正确？请说明。",
        answer: "",
        reference:
          "苏遥尚未取得所有权，普通房屋买卖须完成转移登记。许衡说合同无效是错的：未过户本身不影响合同效力，苏遥仍可按有效合同要求他协助登记。",
        criteria: [
          {
            id: "property-unregistered-title",
            label: "未登记尚未转移所有权",
            meaning:
              "联系本案未办理转移登记，说明付款、交钥匙和入住未使苏遥取得房屋所有权。",
            acceptable:
              "认可法律含义相同、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不要求讨论其他特殊取得方式或登记申请流程。",
          },
          {
            id: "property-unregistered-contract",
            label: "未登记不影响有效合同",
            meaning:
              "否定许衡因未过户主张合同无效，说明有效合同仍可作为请求协助登记的依据。",
            acceptable:
              "认可法律含义相同、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不要求进一步计算违约金或解除损失。",
          },
        ],
      },
      {
        caseId: "CIV-FOUNDATION-PROPERTY-REGISTER",
        relatedTopicIds: ["civil-property-registration-contract"],
        facts:
          "本案为原创教学虚构。陈芷将自己登记所有的一套普通商品房卖给程观，合同有效。2026年9月15日，不动产登记簿已把该房所有权人由陈芷变更为程观；程观9月20日领取证书。双方约定9月25日交钥匙、10月1日付清尾款，尚未到交房日期。",
        hint: "结合案情说明结论和理由即可。",
        sources: ["civil-foundation-property209"],
        id: "civil-foundation-property-register-choice",
        kind: "objective",
        title: "记簿、领证、交钥匙，哪一天转移所有权？",
        prompt: "本案房屋所有权转移发生于何时？",
        choiceMode: "single",
        answer: "a",
        options: [
          {
            id: "a",
            text: "9月15日，变更事项记载于不动产登记簿时。",
            explanation: "普通买卖转移登记的物权效力从记载登记簿时发生。",
          },
          {
            id: "b",
            text: "9月20日，领取新的证书时。",
            explanation: "领证不是本案物权转移的生效时点。",
          },
          {
            id: "c",
            text: "9月25日，约定交钥匙时。",
            explanation: "房屋买卖登记生效与交房履行不是同一事项。",
          },
          {
            id: "d",
            text: "10月1日，付清全部房款时。",
            explanation: "本案无其他条件，付清尾款不是登记后转权的生效条件。",
          },
        ],
        reference:
          "选A。所有权在9月15日记载登记簿时转移。领证、交钥匙和尾款支付是不同事项，陈芷仍须按约交房。",
      },
      {
        caseId: "CIV-FOUNDATION-PROPERTY-REGISTER",
        relatedTopicIds: ["civil-property-registration-contract"],
        facts:
          "本案为原创教学虚构。陈芷将自己登记所有的一套普通商品房卖给程观，合同有效。2026年9月15日，不动产登记簿已把该房所有权人由陈芷变更为程观；程观9月20日领取证书。双方约定9月25日交钥匙、10月1日付清尾款，尚未到交房日期。",
        hint: "结合案情说明结论和理由即可。",
        sources: ["civil-foundation-property209"],
        id: "civil-foundation-property-register-explain",
        kind: "subjective",
        title: "登记后还没交房，所有权是否已经转移？",
        prompt: "本案何时转移所有权？陈芷是否还需要按约交钥匙？请区分说明。",
        answer: "",
        reference:
          "9月15日，转移事项记载登记簿，程观即取得房屋所有权，不必等领证、交钥匙或尾款付清。陈芷仍须在9月25日按约交钥匙，登记完成没有替她履行交房义务。",
        criteria: [
          {
            id: "property-register-time",
            label: "认定记载登记簿时转权",
            meaning:
              "明确9月15日记载登记簿时所有权转移，而非领证、交房或尾款付清。",
            acceptable:
              "认可法律含义相同、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不要求条号或登记簿的具体栏目。",
          },
          {
            id: "property-register-delivery",
            label: "区分登记与交房义务",
            meaning: "说明所有权虽已转移，陈芷仍应依约交钥匙、交房。",
            acceptable:
              "认可法律含义相同、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "无需讨论违约责任，因为交房期限尚未届至。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-property-prenotice",
    title: "预告登记的保护与失效",
    headline:
      "预告登记保护以后取得物权的请求；它不是正式过户，也不会永久有效。",
    goal: "预告登记保护什么？什么时候失效？",
    prerequisite: "知道合同、请求权与权利变动是不同问题。",
    minutes: "6–10",
    paragraphs: [
      "房屋买卖约定将来转移所有权时，可以办理预告登记，保障买方将来取得物权。预告登记本身不让买方马上成为所有权人。预告登记有效期间，未经其权利人同意，另行转让该房所有权等处分不发生物权效力。",
      "预告登记失效有明确条件：所保护的债权消灭，或者从能够办理正式登记之日起九十日内没有申请登记。失效的是预告登记的保护效力；不能仅据此说原买卖合同无效，或买方已经自动取得所有权。",
    ],
    example: {
      title: "已有预告登记，卖方又卖给别人",
      facts:
        "本案为原创教学虚构。成年梁书向杜明购买一套普通商品房，合同有效。双方依法办理了买卖预告登记，尚未办理所有权转移登记。预告登记仍有效，梁书的债权也未消灭。杜明未征得梁书同意，又将同一房屋卖给石川，石川据此要求取得该房所有权。题目只判断两次买卖涉及的物权效果。",
      analysis:
        "梁书尚未取得所有权，预告登记只是保护他将来取得房屋的请求。但在该预告登记有效期间，未经梁书同意，杜明另行转让同一房屋所有权不发生物权效力。",
    },
    pitfall:
      "把预告登记当成正式过户，或以为不申请正式登记也能永久保留预告保护。",
    recall: {
      prompt: "预告登记保护什么？什么时候失效？",
      reference:
        "保护将来实现物权的请求，不立即转权；债权消灭，或能够办理登记后九十日未申请，预告登记失效。",
    },
    sources: [
      "civil-foundation-property221",
      "civil-foundation-property-interpretation4",
    ],
    exercises: [
      {
        caseId: "CIV-FOUNDATION-PROPERTY-PRENOTICE",
        relatedTopicIds: ["civil-property-prenotice"],
        facts:
          "本案为原创教学虚构。成年梁书向杜明购买一套普通商品房，合同有效。双方依法办理了买卖预告登记，尚未办理所有权转移登记。预告登记仍有效，梁书的债权也未消灭。杜明未征得梁书同意，又将同一房屋卖给石川，石川据此要求取得该房所有权。题目只判断两次买卖涉及的物权效果。",
        hint: "结合案情说明结论和理由即可。",
        sources: [
          "civil-foundation-property221",
          "civil-foundation-property-interpretation4",
        ],
        id: "civil-foundation-property-prenotice-choice",
        kind: "objective",
        title: "已有预告登记，卖方又卖给别人",
        prompt: "关于本案物权效果，哪一项正确？",
        choiceMode: "single",
        answer: "d",
        options: [
          {
            id: "a",
            text: "梁书已经因预告登记成为所有权人。",
            explanation: "预告登记保护未来物权实现，不等于完成转移登记。",
          },
          {
            id: "b",
            text: "石川可以只凭第二份合同取得房屋所有权。",
            explanation:
              "普通买卖合同本身不转移所有权，且本案还有有效预告登记的保护。",
          },
          {
            id: "c",
            text: "有预告登记只影响赔偿，不影响卖方再次转移所有权。",
            explanation: "第221条明确规定未经权利人同意的处分不发生物权效力。",
          },
          {
            id: "d",
            text: "梁书尚未取得所有权；未经其同意，杜明另行转让该房所有权不发生物权效力。",
            explanation: "区分未来请求的保护与实际取得所有权。",
          },
        ],
        reference:
          "选D。梁书有预告登记保护，但还不是房屋所有权人。在预告登记有效期间，未经梁书同意，杜明另行转让该房所有权不发生物权效力。",
      },
      {
        caseId: "CIV-FOUNDATION-PROPERTY-PRENOTICE",
        relatedTopicIds: ["civil-property-prenotice"],
        facts:
          "本案为原创教学虚构。成年梁书向杜明购买一套普通商品房，合同有效。双方依法办理了买卖预告登记，尚未办理所有权转移登记。预告登记仍有效，梁书的债权也未消灭。杜明未征得梁书同意，又将同一房屋卖给石川，石川据此要求取得该房所有权。题目只判断两次买卖涉及的物权效果。",
        hint: "结合案情说明结论和理由即可。",
        sources: [
          "civil-foundation-property221",
          "civil-foundation-property-interpretation4",
        ],
        id: "civil-foundation-property-prenotice-explain",
        kind: "subjective",
        title: "预告登记是否已经转权，又如何挡住另售？",
        prompt:
          "梁书是否已经取得所有权？杜明能否未经梁书同意，另行把所有权转给石川？",
        answer: "",
        reference:
          "梁书尚未取得所有权，预告登记只是保护他将来取得房屋的请求。但在该预告登记有效期间，未经梁书同意，杜明另行转让同一房屋所有权不发生物权效力。",
        criteria: [
          {
            id: "property-prenotice-not-title",
            label: "预告登记不等于取得所有权",
            meaning:
              "联系仅办理预告、尚未正式转移登记，说明梁书尚未取得所有权。",
            acceptable:
              "认可法律含义相同、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不要求讨论第二份合同本身的效力。",
          },
          {
            id: "property-prenotice-block",
            label: "有效预告登记阻止未经同意的物权处分",
            meaning:
              "联系预告仍有效、梁书未同意，说明向石川另行转让所有权不发生物权效力。",
            acceptable:
              "认可法律含义相同、能联系本案的自然表达，不要求固定词句或条号。",
            boundary:
              "不能仅以先签合同解释优先，也不把本项扩成所有第二份合同无效。",
          },
        ],
      },
      {
        caseId: "CIV-FOUNDATION-PROPERTY-NINETY",
        relatedTopicIds: ["civil-property-prenotice"],
        facts:
          "本案为原创教学虚构。唐清购买顾宁的普通商品房并办理买卖预告登记。2026年5月1日起，正式转移登记的条件已经具备，顾宁交齐材料并通知唐清当天即可共同办理，唐清也已知悉。直到2026年9月1日，唐清仍未申请登记。原买卖合同和所保护的债权均未消灭。",
        hint: "结合案情说明结论和理由即可。",
        sources: [
          "civil-foundation-property221",
          "civil-foundation-property-interpretation4",
        ],
        id: "civil-foundation-property-ninety-choice",
        kind: "objective",
        title: "能够过户后一直没申请，预告保护还在吗？",
        prompt: "截至2026年9月1日，哪项判断正确？",
        choiceMode: "single",
        answer: "c",
        options: [
          {
            id: "a",
            text: "预告登记继续有效，因为原买卖债权还在。",
            explanation:
              "债权消灭与能够登记后九十日未申请，是分别可以导致失效的事由。",
          },
          {
            id: "b",
            text: "唐清已经在第九十日自动取得所有权。",
            explanation: "九十日未申请导致预告失效，不是自动办理正式转移登记。",
          },
          {
            id: "c",
            text: "预告登记已经失效，但不能仅因此认定原买卖合同无效。",
            explanation:
              "具备登记条件后已明显超过九十日未申请；登记保护与合同效力分别判断。",
          },
          {
            id: "d",
            text: "预告失效使原买卖合同和价款请求同时归于消灭。",
            explanation: "预告保护失效不等于基础合同和债权当然消灭。",
          },
        ],
        reference:
          "选C。5月1日已经能够办理正式登记，到9月1日超过九十日仍未申请，预告登记失效。原买卖合同不会只因这一点无效，唐清也没有自动取得房屋所有权。",
      },
      {
        caseId: "CIV-FOUNDATION-PROPERTY-NINETY",
        relatedTopicIds: ["civil-property-prenotice"],
        facts:
          "本案为原创教学虚构。唐清购买顾宁的普通商品房并办理买卖预告登记。2026年5月1日起，正式转移登记的条件已经具备，顾宁交齐材料并通知唐清当天即可共同办理，唐清也已知悉。直到2026年9月1日，唐清仍未申请登记。原买卖合同和所保护的债权均未消灭。",
        hint: "结合案情说明结论和理由即可。",
        sources: [
          "civil-foundation-property221",
          "civil-foundation-property-interpretation4",
        ],
        id: "civil-foundation-property-ninety-explain",
        kind: "subjective",
        title: "说清九十日未申请失去的是什么",
        prompt: "唐清的预告登记是否仍有效？这是否表示原买卖合同无效？请说明。",
        answer: "",
        reference:
          "预告登记已失效。唐清从5月1日起已能办理正式登记，却超过九十日未申请，符合预告登记失效的条件。失去的是预告登记的保护，原买卖合同不会只因这一点变成无效。",
        criteria: [
          {
            id: "property-ninety-expiry",
            label: "联系能够登记后超九十日未申请认定失效",
            meaning:
              "指出5月1日已能办理登记，至9月1日超过九十日仍未申请，所以预告登记失效。",
            acceptable:
              "认可法律含义相同、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不要求计算第九十日是哪一天或讨论未给出的登记障碍。",
          },
          {
            id: "property-ninety-contract",
            label: "不把预告失效等同合同无效",
            meaning:
              "明确本案失效的是预告登记保护，不能因此认定原买卖合同无效。",
            acceptable:
              "认可法律含义相同、能联系本案的自然表达，不要求固定词句或条号。",
            boundary: "不要求另答合同解除、赔偿或请求办理登记的具体程序。",
          },
        ],
      },
    ],
  },
];

export const civilFoundationsChapters = [
  {
    id: "CIV-CAPACITY",
    title: "民事行为能力",
    section: "民法",
    topicIds: ["civil-capacity-minor", "civil-capacity-earned-living"],
  },
  {
    id: "CIV-LIMITATION",
    title: "诉讼时效",
    section: "民法",
    topicIds: [
      "civil-limitation-start-expiry",
      "civil-limitation-interruption",
    ],
  },
  {
    id: "CIV-REALPROPERTY",
    title: "不动产登记",
    section: "民法",
    topicIds: [
      "civil-property-registration-contract",
      "civil-property-prenotice",
    ],
  },
];

export const civilFoundationsExercises = civilFoundationsTopics.flatMap(
  (topic) => topic.exercises,
);
export const civilFoundationsContentPack = {
  revision: civilFoundationsRevision,
  snapshot: {
    topics: civilFoundationsTopics,
    sources: civilFoundationsSources,
  },
};
export const civilFoundationsDefaultQueues = {
  objective: civilFoundationsExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilFoundationsExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilFoundationsQuestion(id: string) {
  const question = civilFoundationsExercises.find((q) => q.id === id);
  return question ? structuredClone(question) : undefined;
}
export function civilFoundationsTopicForQuestion(id: string) {
  return civilFoundationsTopics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function civilFoundationsSameCaseQuestions(id: string) {
  const question = civilFoundationsQuestion(id);
  return question
    ? structuredClone(
        civilFoundationsExercises.filter((q) => q.caseId === question.caseId),
      )
    : [];
}
export function civilFoundationsChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = civilFoundationsChapters.find((c) => c.id === chapterId);
  return chapter
    ? civilFoundationsTopics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}
