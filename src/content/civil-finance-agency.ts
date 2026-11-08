import type { ContentSources, FaultTopic } from "./fault-unit";

// Original fictional cases. Paired forms share facts, not independent outcomes.
export const civilFinanceAgencyRevision = "civil-finance-agency-2026-10-24.v1";

export const civilFinanceAgencySources: ContentSources = {
  "civil-code-735": {
    title: "《中华人民共和国民法典》第七百三十五条",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "融资租赁由出租人按承租人选择购买租赁物，供承租人使用并收取租金；本稿使用真实设备和真实购置交易。 2020年公布、2021年1月1日起施行；本轮实际核读官方正文，案例事实均设在2026年。",
  },
  "civil-code-739": {
    title: "《中华人民共和国民法典》第七百三十九条",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "出卖人按约向承租人交付租赁物，承租人享有与受领有关的买受人权利；直接交给承租人不等同于其当然取得所有权。 2020年公布、2021年1月1日起施行；本轮实际核读官方正文，案例事实均设在2026年。",
  },
  "civil-code-742": {
    title: "《中华人民共和国民法典》第七百四十二条",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "向出卖人索赔原则上不影响支付租金；依赖出租人技能确定租赁物或出租人干预选物时，可请求相应租金减免。 2020年公布、2021年1月1日起施行；本轮实际核读官方正文，案例事实均设在2026年。",
  },
  "civil-code-744": {
    title: "《中华人民共和国民法典》第七百四十四条",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "按承租人选择订立买卖合同后，未经承租人同意不得变更与其有关的合同内容。 2020年公布、2021年1月1日起施行；本轮实际核读官方正文，案例事实均设在2026年。",
  },
  "civil-code-745": {
    title: "《中华人民共和国民法典》第七百四十五条",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "出租人对租赁物的所有权未经登记不得对抗善意第三人；不是把登记规定为所有权取得的统一生效条件。 2020年公布、2021年1月1日起施行；本轮实际核读官方正文，案例事实均设在2026年。",
  },
  "civil-code-747": {
    title: "《中华人民共和国民法典》第七百四十七条",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "租赁物不符约定或使用目的时的出租人责任及依赖其技能、干预选择的例外。 2020年公布、2021年1月1日起施行；本轮实际核读官方正文，案例事实均设在2026年。",
  },
  "civil-code-751": {
    title: "《中华人民共和国民法典》第七百五十一条",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "承租人占有期间租赁物毁损、灭失，出租人原则上可请求继续支付租金；法律另规或当事人另约除外。 2020年公布、2021年1月1日起施行；本轮实际核读官方正文，案例事实均设在2026年。",
  },
  "civil-code-759": {
    title: "《中华人民共和国民法典》第七百五十九条",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "租期届满仅须向出租人支付象征性价款的，视为租金义务履行完毕后所有权归承租人。 2020年公布、2021年1月1日起施行；本轮实际核读官方正文，案例事实均设在2026年。",
  },
  "civil-code-545": {
    title: "《中华人民共和国民法典》第五百四十五条",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "债权原则上可转让，须注意法定或约定限制；本稿通知题明确不存在转让限制，不以债务人同意作为普通债权转让条件。 2020年公布、2021年1月1日起施行；本轮实际核读官方正文，案例事实均设在2026年。",
  },
  "civil-code-546": {
    title: "《中华人民共和国民法典》第五百四十六条",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "未通知债务人的转让对债务人不发生效力；本稿区分通知前向原债权人付款与通知到达后的履行对象。 2020年公布、2021年1月1日起施行；本轮实际核读官方正文，案例事实均设在2026年。",
  },
  "civil-code-557": {
    title: "《中华人民共和国民法典》第五百五十七条",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "第一款第一项：债务已经履行的，债权债务终止。与766条一并支持不得把同笔已收清款项再收一遍，不把并行主张误作双份受偿。 2020年公布、2021年1月1日起施行；本轮实际核读官方正文，案例事实均设在2026年。",
  },
  "civil-code-764": {
    title: "《中华人民共和国民法典》第七百六十四条",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "保理人发出转让通知，应表明保理人身份并附必要凭证；已通知案例明确附有原债权人盖章的转让文件等。 2020年公布、2021年1月1日起施行；本轮实际核读官方正文，案例事实均设在2026年。",
  },
  "civil-code-766": {
    title: "《中华人民共和国民法典》第七百六十六条",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "有追索权保理可依约向原债权人追索或向债务人主张应收款；收取应收款扣除融资本息及相关费用后的剩余，应返还原债权人。 2020年公布、2021年1月1日起施行；本轮实际核读官方正文，案例事实均设在2026年。",
  },
  "civil-code-767": {
    title: "《中华人民共和国民法典》第七百六十七条",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "无追索权保理向应收账款债务人主张；超过融资本息及相关费用的部分，无须向原债权人返还。本稿无另行返还约定或其他违约争议。 2020年公布、2021年1月1日起施行；本轮实际核读官方正文，案例事实均设在2026年。",
  },
  "civil-code-769": {
    title: "《中华人民共和国民法典》第七百六十九条",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "保理章未规定的，适用合同编第六章债权转让规则；通知题据此与545、546条结合。 2020年公布、2021年1月1日起施行；本轮实际核读官方正文，案例事实均设在2026年。",
  },
  "finance-lease-interpretation-8": {
    title:
      "《最高人民法院关于审理融资租赁合同纠纷案件适用法律问题的解释》第八条（2020年修正）",
    url: "https://cicc.court.gov.cn/html/1/380/385/12843.html",
    note: "实际核读最高人民法院国际商事法庭官方页面修正后十五条全文。第8条包括出租人起决定作用、干预选物、擅改已选出卖人或租赁物的责任，并规定相关事实由承租人举证。页面2026-03-30为刊载日期，文本系2020年修正、2021-01-01起施行的版本。",
  },
  "security-interpretation-66": {
    title:
      "《最高人民法院关于适用〈中华人民共和国民法典〉有关担保制度的解释》第六十六条",
    url: "https://www.court.gov.cn/fabu/xiangqing/282721.html",
    note: "法释〔2020〕28号，自2021年1月1日起施行；实际核读。第二款允许有追索保理分别起诉或一并起诉，并不把同笔款项变为两份可累计受偿的债务。本稿结算仍以民法典766、557条为直接依据，不考担保竞合或诉讼主体。",
  },
  "civil-commission-external-code": {
    title: "《民法典》第951、958条：行纪交易的对外关系",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。行纪人用自己的名义交易；对外合同权利义务与对委托人的赔偿责任分开判断。",
  },
  "civil-commission-price-code": {
    title: "《民法典》第955、956条：有利价格与自己交易",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。有利价差没有增加报酬约定时归委托人；有市场定价且委托人未反对的商品允许行纪人自己买入或卖出。",
  },
  "civil-intermediary-report-code": {
    title: "《民法典》第961—963条：中介如实报告与报酬",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。故意隐瞒重要事实并损害委托人利益的，不得收报酬且须赔偿；中介通常不替交易一方保证履行。",
  },
  "civil-intermediary-reward-code": {
    title: "《民法典》第963—965条：成交、必要费用与绕开中介",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。未成交不能收报酬，约定的必要费用另算；利用已提供的机会绕开中介成交，仍应支付报酬。",
  },
};

export const civilFinanceAgencyTopics: FaultTopic[] = [
  {
    id: "civil-finance-lease-title",
    title: "融资租赁物的所有权",
    headline: "登记影响对抗，租满归属要看约定。",
    goal: "能区分出租人的所有权、登记对抗与象征价款留购的归属。",
    prerequisite: "知道融资租赁通常包含出租人购置、承租人占有使用两个安排。",
    minutes: "约12分钟",
    paragraphs: [
      "出租人按承租人选择购买设备，再供承租人使用。出卖人直接交给承租人，不等于设备当然归承租人。",
      "出租人的所有权未经登记，不能对抗善意第三人。登记管的是对第三人的效力，不是本案所有权的取得条件。",
      "租期届满只须支付象征性价款的，视为约定租金义务履行完毕后设备归承租人。判断时要核对租满和付款条件，不能只看谁一直在用设备。",
    ],
    example: {
      title: "未登记的机床归属",
      facts:
        "本案为原创教学虚构，发生于2026年9月。景梧公司选定一台数控机床及其出卖人，与旭融公司订立书面融资租赁合同。旭融向有权处分的出卖人购买机床并付清货款，出卖人按三方安排直接交给景梧使用。租期尚未届满，旭融没有另行转让机床。双方未办理融资租赁物所有权登记，也没有第三人争夺机床。景梧称：“没有登记，旭融就不可能拥有机床，交给我便是我的。”",
      analysis:
        "机床归旭融，景梧的主张不能成立。旭融已购买机床，景梧接收设备是为了租赁使用。登记决定能否对抗善意第三人，本案没有第三人争夺，未登记不改变双方之间的所有权归属。",
    },
    pitfall:
      "把登记对抗说成登记设立，或把所有设备交付、租期届满都说成当然归承租人。",
    recall: {
      prompt: "未登记与租满象征价款留购，分别要核对什么？",
      reference:
        "未登记主要核对是否涉及善意第三人对抗，不当然否定双方之间的所有权；象征价款留购要核对租满与付款条件。",
    },
    sources: [
      "civil-code-735",
      "civil-code-739",
      "civil-code-745",
      "civil-code-759",
    ],
    exercises: [
      {
        caseId: "civil-finance-agency-lease-unregistered-title",
        relatedTopicIds: ["civil-finance-lease-title"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。景梧公司选定一台数控机床及其出卖人，与旭融公司订立书面融资租赁合同。旭融向有权处分的出卖人购买机床并付清货款，出卖人按三方安排直接交给景梧使用。租期尚未届满，旭融没有另行转让机床。双方未办理融资租赁物所有权登记，也没有第三人争夺机床。景梧称：“没有登记，旭融就不可能拥有机床，交给我便是我的。”",
        hint: "直接说明结论和案情理由。",
        reference:
          "机床归旭融，景梧的主张不能成立。旭融已购买机床，景梧接收设备是为了租赁使用。登记决定能否对抗善意第三人，本案没有第三人争夺，未登记不改变双方之间的所有权归属。",
        sources: ["civil-code-735", "civil-code-739", "civil-code-745"],
        id: "civil-finance-agency-lease-unregistered-title-choice",
        kind: "objective",
        choiceMode: "single",
        title: "未登记的机床归属（单选）",
        prompt:
          "景梧仅凭未登记以及自己直接受领、占有机床，就否定旭融的所有权，能否成立？",
        options: [
          {
            id: "a",
            text: "不能。直接受领不等于取得所有权，未登记也不当然否定出租人在双方之间的所有权。",
            explanation:
              "正确。本案为已真实购买并交付使用的融资租赁，登记是对抗效力问题，不是本案取得所有权的生效门槛。",
          },
          {
            id: "b",
            text: "能。所有融资租赁物只有登记后才可能由出租人取得所有权。",
            explanation:
              "错误。把未经登记不得对抗善意第三人误写成登记设立所有权。",
          },
          {
            id: "c",
            text: "能。融资租赁物只要由承租人直接接收，就当然归承租人所有。",
            explanation:
              "错误。融资租赁允许出卖人直接向承租人交付，直接受领不等同于受让所有权。",
          },
          {
            id: "d",
            text: "不能，但出租人未经登记的所有权在任何情形下都可对抗任何第三人。",
            explanation:
              "错误。本案没有第三人争夺；不能反向抹去登记对抗的法定边界。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-finance-agency-lease-unregistered-title",
        relatedTopicIds: ["civil-finance-lease-title"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。景梧公司选定一台数控机床及其出卖人，与旭融公司订立书面融资租赁合同。旭融向有权处分的出卖人购买机床并付清货款，出卖人按三方安排直接交给景梧使用。租期尚未届满，旭融没有另行转让机床。双方未办理融资租赁物所有权登记，也没有第三人争夺机床。景梧称：“没有登记，旭融就不可能拥有机床，交给我便是我的。”",
        hint: "直接说明结论和案情理由。",
        reference:
          "机床归旭融，景梧的主张不能成立。旭融已购买机床，景梧接收设备是为了租赁使用。登记决定能否对抗善意第三人，本案没有第三人争夺，未登记不改变双方之间的所有权归属。",
        sources: ["civil-code-735", "civil-code-739", "civil-code-745"],
        id: "civil-finance-agency-lease-unregistered-title-written",
        kind: "subjective",
        title: "未登记的机床归属（自由作答）",
        prompt:
          "景梧仅凭未登记以及自己直接受领、占有机床，就否定旭融的所有权，能否成立？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-finance-agency-lease-unregistered-title-title",
            label: "分清所有权与登记对抗",
            meaning:
              "否定景梧的主张，并结合旭融真实购买、景梧受领使用及无第三人争夺说明未登记不当然否定所有权。",
            acceptable:
              "可说“机床是旭融买来供景梧使用的，没登记只是不能对抗善意第三人，不会因此直接变成景梧的”，认可等义表达。",
            boundary:
              "不考善意第三人的具体范围、竞合或善意取得；不得把登记当作本案所有权取得的生效条件。",
          },
        ],
      },
      {
        caseId: "civil-finance-agency-lease-symbolic-price",
        relatedTopicIds: ["civil-finance-lease-title"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。融信公司按禾川公司的选择购买一台60万元的设备，供禾川融资租赁使用。书面合同约定租期为2026年3月1日至9月30日，期满禾川只需另付1元留购价款即可保留设备。9月30日，禾川已付清全部租金和1元留购款。融信称合同没有另写“所有权转移”四字，设备仍归自己。双方没有其他欠款或第三人权利争议。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。1元相对于60万元设备属于象征性价款，这样的约定视为租金义务履行完毕后设备归承租人。禾川已付清租金并支付1元，设备应归禾川所有。",
        sources: ["civil-code-759"],
        id: "civil-finance-agency-lease-symbolic-price-choice",
        kind: "objective",
        choiceMode: "single",
        title: "租期届满的一元留购（单选）",
        prompt:
          "在租金和1元留购价款均已依约支付后，融信能否仅因未另写“所有权转移”字样，主张设备仍归其所有？",
        options: [
          {
            id: "a",
            text: "能。融资租赁期满后，设备无论如何约定都必须归出租人。",
            explanation: "错误。忽略了象征性留购价款约定的法定含义。",
          },
          {
            id: "b",
            text: "能。只有另行再签一次买卖合同，象征价款约定才可能生效。",
            explanation:
              "错误。本条已赋予这种约定相应所有权归属效果，不要求题设条件外再签一次合同。",
          },
          {
            id: "c",
            text: "不能。象征性价款约定具有相应归属效果，题设付款条件已全部满足。",
            explanation:
              "正确。租期届满仅支付象征价款，依法视为租金义务履行完毕后归承租人，本案条件已满足。",
          },
          {
            id: "d",
            text: "不能，但其原因是任何融资租赁设备一经交付就立即归承租人。",
            explanation:
              "错误。本案归属依据是租满象征价款约定及付款完成，不是交付即当然归承租人。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-finance-agency-lease-symbolic-price",
        relatedTopicIds: ["civil-finance-lease-title"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。融信公司按禾川公司的选择购买一台60万元的设备，供禾川融资租赁使用。书面合同约定租期为2026年3月1日至9月30日，期满禾川只需另付1元留购价款即可保留设备。9月30日，禾川已付清全部租金和1元留购款。融信称合同没有另写“所有权转移”四字，设备仍归自己。双方没有其他欠款或第三人权利争议。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。1元相对于60万元设备属于象征性价款，这样的约定视为租金义务履行完毕后设备归承租人。禾川已付清租金并支付1元，设备应归禾川所有。",
        sources: ["civil-code-759"],
        id: "civil-finance-agency-lease-symbolic-price-written",
        kind: "subjective",
        title: "租期届满的一元留购（自由作答）",
        prompt:
          "在租金和1元留购价款均已依约支付后，融信能否仅因未另写“所有权转移”字样，主张设备仍归其所有？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-finance-agency-lease-symbolic-price-symbolic-transfer",
            label: "象征价款与租满归属",
            meaning:
              "认定设备归禾川，并指出象征性留购价款约定及租金、留购款均已付清。",
            acceptable:
              "可说“合同的一元留购已经表明租金付完后设备归承租人，禾川也已付款”，含义相同即可。",
            boundary:
              "不要求背诵条号或讨论另行买卖手续；不得把任何租期届满或设备交付都说成当然转移所有权。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-finance-lease-rent-risk",
    title: "融资租赁的租金与选物风险",
    headline: "占有期受损通常仍付租，出租人干预选物须看例外。",
    goal: "能判断短期受损是否当然免租，以及出租人擅改选物的相应责任。",
    prerequisite: "知道出租人、承租人与出卖人是不同角色。",
    minutes: "约12分钟",
    paragraphs: [
      "承租人占有设备期间，设备毁损、灭失，出租人原则上仍可请求继续支付租金；法律另有规定或合同另有安排的除外。不能只凭承租人没有造成事故，就当然免租。",
      "设备不符约定时，出租人通常不承担该项责任；但承租人依赖其技能选物，或者出租人干预选物的，须适用例外。",
      "承租人向出卖人索赔，通常不影响付租。发生出租人干预选物等法定情形时，可请求相应租金减免；责任和减免均须对应具体事实，不能凭空定比例。",
    ],
    example: {
      title: "设备短期受损后的租金",
      facts:
        "本案为原创教学虚构，发生于2026年9月。泽青公司依书面融资租赁合同占有、使用设备，并一直妥善保管。9月5日，相邻厂房水管突发破裂，漏水损坏设备控制板，并非出租人或承租人违约造成。9月12日修复后设备恢复使用，双方继续履行合同。合同没有事故免租约定。泽青称：“事故不是我造成的，停机七天就应免这七天租金。”",
      analysis:
        "不能。融资租赁物在承租人占有期间受损，出租人原则上仍可请求继续支付租金。本案合同继续履行，又没有另行适用的免租约定或规则，不能仅凭事故非自己造成就免租。",
    },
    pitfall:
      "把普通租赁中的处理直接套进融资租赁，或以“出租人永远不负责”抹去干预选物的例外。",
    recall: {
      prompt: "设备受损与设备因出租人擅改选型而不合约，租金判断有何要点？",
      reference:
        "占有期受损不当然免租，先查另行依据；出租人擅改选型造成不符时，承租人可请求相应责任及相应租金减免。",
    },
    sources: [
      "civil-code-751",
      "civil-code-742",
      "civil-code-744",
      "civil-code-747",
      "finance-lease-interpretation-8",
    ],
    exercises: [
      {
        caseId: "civil-finance-agency-lease-damage-rent",
        relatedTopicIds: ["civil-finance-lease-rent-risk"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。泽青公司依书面融资租赁合同占有、使用设备，并一直妥善保管。9月5日，相邻厂房水管突发破裂，漏水损坏设备控制板，并非出租人或承租人违约造成。9月12日修复后设备恢复使用，双方继续履行合同。合同没有事故免租约定。泽青称：“事故不是我造成的，停机七天就应免这七天租金。”",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。融资租赁物在承租人占有期间受损，出租人原则上仍可请求继续支付租金。本案合同继续履行，又没有另行适用的免租约定或规则，不能仅凭事故非自己造成就免租。",
        sources: ["civil-code-751"],
        id: "civil-finance-agency-lease-damage-rent-choice",
        kind: "objective",
        choiceMode: "single",
        title: "设备短期受损后的租金（单选）",
        prompt:
          "泽青能否仅凭这次事故不是自己造成、设备停机七天，就当然免交这七天的租金？",
        options: [
          {
            id: "a",
            text: "能。承租人没有造成事故，就必然不用支付停机期间租金。",
            explanation:
              "错误。融资租赁物占有期间的受损并不单凭承租人无过错就当然免租。",
          },
          {
            id: "b",
            text: "不能。占有期间受损原则上仍应付租，本案没有给出可免租的另行依据。",
            explanation:
              "正确。应适用融资租赁的风险与租金规则，不能仅凭事故原因和停机事实当然免租。",
          },
          {
            id: "c",
            text: "能。只要保险公司还没有赔款，承租人的租金义务就自动暂停。",
            explanation:
              "错误。题设没有以保险赔付作为交租条件，也不存在这种当然暂停规则。",
          },
          {
            id: "d",
            text: "能。承租人支付维修费后，后续全部租金就自动消灭。",
            explanation:
              "错误。设备维修与租金义务不是这样相互替代，维修不当然消灭后续租金。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-finance-agency-lease-damage-rent",
        relatedTopicIds: ["civil-finance-lease-rent-risk"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。泽青公司依书面融资租赁合同占有、使用设备，并一直妥善保管。9月5日，相邻厂房水管突发破裂，漏水损坏设备控制板，并非出租人或承租人违约造成。9月12日修复后设备恢复使用，双方继续履行合同。合同没有事故免租约定。泽青称：“事故不是我造成的，停机七天就应免这七天租金。”",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。融资租赁物在承租人占有期间受损，出租人原则上仍可请求继续支付租金。本案合同继续履行，又没有另行适用的免租约定或规则，不能仅凭事故非自己造成就免租。",
        sources: ["civil-code-751"],
        id: "civil-finance-agency-lease-damage-rent-written",
        kind: "subjective",
        title: "设备短期受损后的租金（自由作答）",
        prompt:
          "泽青能否仅凭这次事故不是自己造成、设备停机七天，就当然免交这七天的租金？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-finance-agency-lease-damage-rent-rent-risk",
            label: "占有期受损不当然免租",
            meaning:
              "否定仅凭意外及停机当然免租，结合设备已在承租人占有、可修复且合同继续履行说明仍须按约付租。",
            acceptable:
              "可说“融资租赁下设备在自己占有时坏了，租金通常还要继续交；这里没有另定免租”，认可等义表达。",
            boundary:
              "不考第三人侵权、保险、维修费归属或合同解除结算；不得扩大为法律另有规定或合同另有安排时也绝不能减免。",
          },
        ],
      },
      {
        caseId: "civil-finance-agency-lease-lessor-change",
        relatedTopicIds: ["civil-finance-lease-rent-risk"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。云朴公司融资租赁板材加工设备，书面合同要求加工10毫米板材，云朴已选定甲厂X型。出租人衡融未经云朴同意，把买卖合同改成乙厂Y型，原性能要求未变。交货试机后发现，Y型只能加工5毫米板材。邮件、变更单证明改型由衡融单方决定。云朴向出卖人索赔，并要求衡融承担相应责任、减免相应租金。衡融称：“融资租赁出租人从不对设备负责，向出卖人索赔也永远不能减租。”本题不计算减免比例。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。衡融擅自改变云朴已经选定的设备，造成设备不符约定，应承担相应责任。这属于出租人干预选物的情形，云朴也可以请求相应租金减免，不能一概要求照付。",
        sources: [
          "civil-code-742",
          "civil-code-744",
          "civil-code-747",
          "finance-lease-interpretation-8",
        ],
        id: "civil-finance-agency-lease-lessor-change-choice",
        kind: "objective",
        choiceMode: "single",
        title: "出租人擅改承租人选定机型（单选）",
        prompt:
          "衡融能否以上述理由，一概拒绝云朴针对自己提出的相应责任与租金减免请求？",
        options: [
          {
            id: "a",
            text: "能。融资租赁中出租人在任何情况下都不对设备不符约定负责。",
            explanation:
              "错误。依赖出租人技能、出租人干预选择等是法律明定的例外。",
          },
          {
            id: "b",
            text: "能。只要承租人已经向出卖人索赔，就永远不能向出租人主张责任或减免租金。",
            explanation: "错误。忽略了出租人擅改选物的事实及相应法定例外。",
          },
          {
            id: "c",
            text: "不能，因此云朴可以免交全部剩余租金，且不必再核对任何损失和范围。",
            explanation:
              "错误。可请求相应责任、相应减免，不等同于一律免交全部剩余租金。",
          },
          {
            id: "d",
            text: "不能。擅改已选设备且导致不符约定，云朴可请求相应责任及相应租金减免。",
            explanation:
              "正确。题设证据足以支持出租人干预选物，属于一般免责和租金规则的例外。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-finance-agency-lease-lessor-change",
        relatedTopicIds: ["civil-finance-lease-rent-risk"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。云朴公司融资租赁板材加工设备，书面合同要求加工10毫米板材，云朴已选定甲厂X型。出租人衡融未经云朴同意，把买卖合同改成乙厂Y型，原性能要求未变。交货试机后发现，Y型只能加工5毫米板材。邮件、变更单证明改型由衡融单方决定。云朴向出卖人索赔，并要求衡融承担相应责任、减免相应租金。衡融称：“融资租赁出租人从不对设备负责，向出卖人索赔也永远不能减租。”本题不计算减免比例。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。衡融擅自改变云朴已经选定的设备，造成设备不符约定，应承担相应责任。这属于出租人干预选物的情形，云朴也可以请求相应租金减免，不能一概要求照付。",
        sources: [
          "civil-code-742",
          "civil-code-744",
          "civil-code-747",
          "finance-lease-interpretation-8",
        ],
        id: "civil-finance-agency-lease-lessor-change-written",
        kind: "subjective",
        title: "出租人擅改承租人选定机型（自由作答）",
        prompt:
          "衡融能否以上述理由，一概拒绝云朴针对自己提出的相应责任与租金减免请求？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-finance-agency-lease-lessor-change-lessor-liability",
            label: "擅改选物的相应责任",
            meaning: "结合原选X型、单方改成Y型及性能不符，否定出租人一概免责。",
            acceptable:
              "可说“衡融把已选的设备擅自换了，不能再用通常不担质量责任的规则推掉自己的责任”，认可等义表达。",
            boundary:
              "相关干预事实已有邮件等证据，不要求另造证据；不把所有设备缺陷都自动归责于出租人。",
          },
          {
            id: "civil-finance-agency-lease-lessor-change-rent-reduction",
            label: "干预选物可请求相应减租",
            meaning:
              "认可云朴可以请求与本案相应的租金减免，不能说向出卖人索赔绝对不影响租金。",
            acceptable:
              "可说“这次是出租人干预换机造成不符，承租人还可主张相应减租”，含义相同即可。",
            boundary:
              "不要求也不得虚构统一减免比例、全免剩余租金或固定损害赔偿额。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-factoring-notice",
    title: "保理转让通知与债务履行",
    headline: "区分转让约定和通知到达，别把通知当成征求同意。",
    goal: "能根据通知先后判断向谁履行及是否需要再次支付。",
    prerequisite: "知道原应收账款债权人、债务人和保理人的关系。",
    minutes: "约12分钟",
    paragraphs: [
      "普通可转让应收账款转给保理人，不以债务人另行同意为前提；但未通知债务人的转让，对债务人不发生效力。",
      "保理人自己发通知时，要表明身份并附上必要凭证；通知到达以后，债务人才需要向保理人履行。",
      "通知前不知转让而向原债权人有效付款，不能仅因后来收到通知就被要求再付一次。通知后应按原债务条件向保理人履行，原有合法抗辩并不因转让自动消失。",
    ],
    example: {
      title: "通知前向原债权人支付货款",
      facts:
        "本案为原创教学虚构，发生于2026年9月。宁禾公司已向广川公司交货，广川应于9月10日支付12万元货款。9月2日，宁禾将这笔可转让的货款债权全部转让给辰星保理，并取得融资。9月10日，广川尚未收到任何转让通知，也不知道发生转让，按原合同把12万元全额付给宁禾。首份转让通知于9月12日到达广川。辰星随后要求广川把同一笔12万元再付一次。",
      analysis:
        "广川无须再付。广川付清货款时还没收到转让通知，向宁禾付款有效。这笔货款已经清偿，9月12日才到的通知不能让广川再付一遍。",
    },
    pitfall:
      "把保理合同签订等同于已经通知债务人，或把普通债权转让错当成必须由债务人批准。",
    recall: {
      prompt: "判断保理通知前后谁应收款，最先核对哪些事实？",
      reference:
        "核对债权真实且可转让、通知是否到达及凭证、付款发生在通知之前还是之后；通知不是要求债务人批准转让。",
    },
    sources: [
      "civil-code-546",
      "civil-code-557",
      "civil-code-769",
      "civil-code-545",
      "civil-code-764",
    ],
    exercises: [
      {
        caseId: "civil-finance-agency-factoring-before-notice",
        relatedTopicIds: ["civil-factoring-notice"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。宁禾公司已向广川公司交货，广川应于9月10日支付12万元货款。9月2日，宁禾将这笔可转让的货款债权全部转让给辰星保理，并取得融资。9月10日，广川尚未收到任何转让通知，也不知道发生转让，按原合同把12万元全额付给宁禾。首份转让通知于9月12日到达广川。辰星随后要求广川把同一笔12万元再付一次。",
        hint: "直接说明结论和案情理由。",
        reference:
          "广川无须再付。广川付清货款时还没收到转让通知，向宁禾付款有效。这笔货款已经清偿，9月12日才到的通知不能让广川再付一遍。",
        sources: ["civil-code-546", "civil-code-557", "civil-code-769"],
        id: "civil-finance-agency-factoring-before-notice-choice",
        kind: "objective",
        choiceMode: "single",
        title: "通知前向原债权人支付货款（单选）",
        prompt: "广川是否还须因9月12日收到通知，再向辰星支付同一笔12万元货款？",
        options: [
          {
            id: "a",
            text: "无须。付款前未获通知，向原债权人足额履行有效，后到通知不使同笔货款再付一次。",
            explanation:
              "正确。未通知的转让对债务人不发生效力，本案付款事实及时间清楚。",
          },
          {
            id: "b",
            text: "须再付。保理合同一经签订，债务人即使全不知情也必须自行查出并改付保理人。",
            explanation: "错误。忽略了转让通知对债务人发生效力的必要前提。",
          },
          {
            id: "c",
            text: "须再付。任何晚到的转让通知都能使此前有效付款自动失效。",
            explanation:
              "错误。后来通知不能据此把已经有效履行的同一债务恢复为应再支付。",
          },
          {
            id: "d",
            text: "无须，而且其原因是没有通知就使宁禾与辰星的整个保理合同当然无效。",
            explanation:
              "错误。未通知是转让对债务人的效力问题，不等同于保理合同本身当然无效。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-finance-agency-factoring-before-notice",
        relatedTopicIds: ["civil-factoring-notice"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。宁禾公司已向广川公司交货，广川应于9月10日支付12万元货款。9月2日，宁禾将这笔可转让的货款债权全部转让给辰星保理，并取得融资。9月10日，广川尚未收到任何转让通知，也不知道发生转让，按原合同把12万元全额付给宁禾。首份转让通知于9月12日到达广川。辰星随后要求广川把同一笔12万元再付一次。",
        hint: "直接说明结论和案情理由。",
        reference:
          "广川无须再付。广川付清货款时还没收到转让通知，向宁禾付款有效。这笔货款已经清偿，9月12日才到的通知不能让广川再付一遍。",
        sources: ["civil-code-546", "civil-code-557", "civil-code-769"],
        id: "civil-finance-agency-factoring-before-notice-written",
        kind: "subjective",
        title: "通知前向原债权人支付货款（自由作答）",
        prompt:
          "广川是否还须因9月12日收到通知，再向辰星支付同一笔12万元货款？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-finance-agency-factoring-before-notice-pre-notice-payment",
            label: "通知前有效履行无需再付",
            meaning:
              "说明广川无须再付，结合付款前未收到通知、不知道转让及已向宁禾足额履行的时间链。",
            acceptable:
              "可说“还没通知到他时，按原合同付给宁禾就是有效清偿，不能事后又让他付一遍”，等义即可。",
            boundary:
              "不要求判断宁禾对保理人的返还或违约责任；不得把未通知写成保理合同一律无效。",
          },
        ],
      },
      {
        caseId: "civil-finance-agency-factoring-after-notice",
        relatedTopicIds: ["civil-factoring-notice"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。澜谷公司供货后，将对清远公司的10万元可转让货款债权转给盛安保理并取得融资，付款日仍为9月20日。9月8日，清远收到盛安发出的通知，载明保理人身份、债权及收款信息，并附澜谷盖章的转让文件等必要凭证。清远确认真实，金额、期限均无争议，也没有抵销或其他拒付理由，却称：“没有征得我同意，我仍只向澜谷付款。”",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。普通债权转让不以债务人同意为前提，题设也没有转让限制。盛安表明身份并附凭证的通知已经到达，转让对清远发生效力，清远应在到期日向盛安履行。",
        sources: [
          "civil-code-545",
          "civil-code-546",
          "civil-code-764",
          "civil-code-769",
        ],
        id: "civil-finance-agency-factoring-after-notice-choice",
        kind: "objective",
        choiceMode: "single",
        title: "收到附凭证通知后向谁付款（单选）",
        prompt:
          "清远能否仅以没有同意这次转让为由，拒绝在到期日向盛安履行该笔债务？",
        options: [
          {
            id: "a",
            text: "能。任何应收账款转让都必须由债务人另签同意书才生效。",
            explanation:
              "错误。把债权转让误当成需要债权人同意的债务转移等其他情形。",
          },
          {
            id: "b",
            text: "能。由保理人发出的通知一律无效，只有原债权人亲自送达才有效。",
            explanation:
              "错误。民法典允许保理人表明身份并附必要凭证发出转让通知。",
          },
          {
            id: "c",
            text: "不能。通知及凭证已到达，且没有其他抗辩，未同意本身不能阻止到期向保理人履行。",
            explanation:
              "正确。题设已满足通知条件，普通债权转让不以债务人另行同意为前提。",
          },
          {
            id: "d",
            text: "不能，但盛安可以因此把原定9月20日的付款日单方提前到9月8日。",
            explanation: "错误。受让债权不会当然改变原债务的履行期限。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-finance-agency-factoring-after-notice",
        relatedTopicIds: ["civil-factoring-notice"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。澜谷公司供货后，将对清远公司的10万元可转让货款债权转给盛安保理并取得融资，付款日仍为9月20日。9月8日，清远收到盛安发出的通知，载明保理人身份、债权及收款信息，并附澜谷盖章的转让文件等必要凭证。清远确认真实，金额、期限均无争议，也没有抵销或其他拒付理由，却称：“没有征得我同意，我仍只向澜谷付款。”",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。普通债权转让不以债务人同意为前提，题设也没有转让限制。盛安表明身份并附凭证的通知已经到达，转让对清远发生效力，清远应在到期日向盛安履行。",
        sources: [
          "civil-code-545",
          "civil-code-546",
          "civil-code-764",
          "civil-code-769",
        ],
        id: "civil-finance-agency-factoring-after-notice-written",
        kind: "subjective",
        title: "收到附凭证通知后向谁付款（自由作答）",
        prompt:
          "清远能否仅以没有同意这次转让为由，拒绝在到期日向盛安履行该笔债务？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-finance-agency-factoring-after-notice-notified-performance",
            label: "通知后按原期限向保理人履行",
            meaning:
              "否定仅凭未同意拒付，指出表明身份并附凭证的通知已经到达，应按原到期日向盛安支付。",
            acceptable:
              "可说“转让不需要清远批准，通知和证明已送到，9月20日应付盛安”，含义相同即可。",
            boundary:
              "不要求债务人承担比原债务更重的义务；题设无抗辩、抵销和转让限制，不推导受让人可以任意提前到期日。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-factoring-recourse",
    title: "有追索、无追索与回款结算",
    headline: "追索约定决定余款规则，可向两方主张不等于能收两份。",
    goal: "能区分两类保理的回款余款，并避免对同笔已清款重复受偿。",
    prerequisite: "知道融资款本息及费用与被转让的应收账款金额可能不同。",
    minutes: "约12分钟",
    paragraphs: [
      "有追索权保理中，保理人可以依约向原债权人追索融资本息或要求回购，也可向债务人主张应收款。这不表示同笔已经清偿的款项可以再收一遍。",
      "有追索权保理收取应收款后，扣除融资本息及相关费用，余款应返还原债权人。",
      "无追索权保理应向应收账款债务人主张，超出融资本息及相关费用的部分，无须向原债权人返还。合同另有返还约定的，仍要看约定。",
    ],
    example: {
      title: "有追索保理收清后的余款",
      facts:
        "本案为原创教学虚构，发生于2026年9月。同青将对朴源公司的10万元货款债权全部转给合川保理，约定有追索权，并取得7.5万元融资。双方确认合法的融资本金、利息及相关费用共8万元。转让已通知朴源，朴源到期向合川付清10万元。合川没有其他未结清债权，仍称可保留全部10万元，再让同青返还同一笔融资款本息及费用8万元。双方没有另行结算约定。",
      analysis:
        "不能就同一笔已获清偿的融资款本息及费用再收8万元。合川已经收到10万元，扣除应得的8万元后，剩余2万元应返还应收账款债权人同青。",
    },
    pitfall:
      "忽略有无追索约定，将两类余款规则混用，或把多条请求路径当成双份获偿许可。",
    recall: {
      prompt: "已回款超过融资本息费用时，有追索与无追索如何处理余款？",
      reference:
        "有追索的余款应返还原债权人；无追索且无另行安排的，余款无须返还。同笔已获清偿的融资款本息费用不能再收一次。",
    },
    sources: [
      "civil-code-557",
      "civil-code-766",
      "security-interpretation-66",
      "civil-code-767",
    ],
    exercises: [
      {
        caseId: "civil-finance-agency-factoring-recourse-surplus",
        relatedTopicIds: ["civil-factoring-recourse"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。同青将对朴源公司的10万元货款债权全部转给合川保理，约定有追索权，并取得7.5万元融资。双方确认合法的融资本金、利息及相关费用共8万元。转让已通知朴源，朴源到期向合川付清10万元。合川没有其他未结清债权，仍称可保留全部10万元，再让同青返还同一笔融资款本息及费用8万元。双方没有另行结算约定。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能就同一笔已获清偿的融资款本息及费用再收8万元。合川已经收到10万元，扣除应得的8万元后，剩余2万元应返还应收账款债权人同青。",
        sources: [
          "civil-code-557",
          "civil-code-766",
          "security-interpretation-66",
        ],
        id: "civil-finance-agency-factoring-recourse-surplus-choice",
        kind: "objective",
        choiceMode: "single",
        title: "有追索保理收清后的余款（单选）",
        prompt:
          "合川能否在已经收足10万元后，再向同青追收同一笔8万元？扣除8万元后的2万元应如何处理？",
        options: [
          {
            id: "a",
            text: "能再收8万元，并可永久保留先收的全部10万元。",
            explanation:
              "错误。有追索权不代表同一笔融资款本息费用可以分别从双方各收一遍，也不能吞掉依法应返的余款。",
          },
          {
            id: "b",
            text: "不能再收同一笔8万元；已收10万元扣除8万元后，2万元应返还同青。",
            explanation:
              "正确。本案已足额收款，融资款本息费用已覆盖，有追索保理的余款依规则返还原债权人。",
          },
          {
            id: "c",
            text: "不能再收8万元，但有追索保理的所有回款余款都自动归保理人。",
            explanation: "错误。把有追索保理的剩余返还规则混同于无追索保理。",
          },
          {
            id: "d",
            text: "不能再收8万元，而且已收10万元必须全部退给同青，融资款本息费用不能扣。",
            explanation:
              "错误。法定结算允许先扣除融资本息及相关费用，本案应返的是剩余2万元。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-finance-agency-factoring-recourse-surplus",
        relatedTopicIds: ["civil-factoring-recourse"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。同青将对朴源公司的10万元货款债权全部转给合川保理，约定有追索权，并取得7.5万元融资。双方确认合法的融资本金、利息及相关费用共8万元。转让已通知朴源，朴源到期向合川付清10万元。合川没有其他未结清债权，仍称可保留全部10万元，再让同青返还同一笔融资款本息及费用8万元。双方没有另行结算约定。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能就同一笔已获清偿的融资款本息及费用再收8万元。合川已经收到10万元，扣除应得的8万元后，剩余2万元应返还应收账款债权人同青。",
        sources: [
          "civil-code-557",
          "civil-code-766",
          "security-interpretation-66",
        ],
        id: "civil-finance-agency-factoring-recourse-surplus-written",
        kind: "subjective",
        title: "有追索保理收清后的余款（自由作答）",
        prompt:
          "合川能否在已经收足10万元后，再向同青追收同一笔8万元？扣除8万元后的2万元应如何处理？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-finance-agency-factoring-recourse-surplus-no-double-recovery",
            label: "不能就同笔已清款再受偿",
            meaning:
              "否定在已收清且融资本息费用均已覆盖后，又向同青追收同一笔8万元。",
            acceptable:
              "可说“有追索可以依法主张，不等于同一笔钱能收两次；这次已收足就不能再要同笔8万”，认可等义表达。",
            boundary:
              "不要求判断并诉程序或使用连带、不真正连带等术语；不能因可向两方主张就认定可实际各收全额。",
          },
          {
            id: "civil-finance-agency-factoring-recourse-surplus-return-surplus",
            label: "有追索保理余款返还",
            meaning: "指出10万元扣除无争议的8万元后，2万元返还同青。",
            acceptable:
              "可说“扣掉本息和相关费用共8万，多出来2万还原债权人”，意思相同即可。",
            boundary:
              "金额仅是本案已确认结算数据，不是统一利率、费用或固定分配比例；不要求另算利息。",
          },
        ],
      },
      {
        caseId: "civil-finance-agency-factoring-nonrecourse-surplus",
        relatedTopicIds: ["civil-factoring-recourse"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。知远将对汇田公司的12万元货款债权全部转给明川保理，约定无追索权并取得融资。双方确认合法的融资款本息及相关费用共9万元。转让已通知汇田，汇田到期向明川付清12万元。合同没有余款返还约定，也无虚构债权、欺诈或其他违约争议。知远要求把超过9万元的3万元交给自己。",
        hint: "直接说明结论和案情理由。",
        reference:
          "这3万元归明川，无须返还知远。双方明确约定无追索权保理，也没有余款返还约定，适用无追索保理的余款规则。",
        sources: ["civil-code-767"],
        id: "civil-finance-agency-factoring-nonrecourse-surplus-choice",
        kind: "objective",
        choiceMode: "single",
        title: "无追索保理取得超额回款（单选）",
        prompt:
          "知远能否仅凭“回款超过融资本息及相关费用3万元”，要求明川返还这3万元？",
        options: [
          {
            id: "a",
            text: "能。有追索与无追索保理的回款余款一律按同一规则返还。",
            explanation:
              "错误。民法典对这两类保理的余款规定不同，不能抹去追索约定。",
          },
          {
            id: "b",
            text: "能。应收账款转让后，保理人最多只能收取融资本金，多收的一律返还。",
            explanation:
              "错误。融资款本息、相关费用以及有无追索的不同规则均不能被忽略。",
          },
          {
            id: "c",
            text: "不能，但其原因是所有保理合同都必须将超额回款永久给保理人。",
            explanation:
              "错误。本案依据是明确的无追索约定；有追索保理的法定余款处理不同。",
          },
          {
            id: "d",
            text: "不能。无追索约定明确且没有另行返还安排，超过本息费用的这部分无须返还。",
            explanation:
              "正确。符合民法典第767条的无追索保理余款规则，题设排除了其他争议。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-finance-agency-factoring-nonrecourse-surplus",
        relatedTopicIds: ["civil-factoring-recourse"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。知远将对汇田公司的12万元货款债权全部转给明川保理，约定无追索权并取得融资。双方确认合法的融资款本息及相关费用共9万元。转让已通知汇田，汇田到期向明川付清12万元。合同没有余款返还约定，也无虚构债权、欺诈或其他违约争议。知远要求把超过9万元的3万元交给自己。",
        hint: "直接说明结论和案情理由。",
        reference:
          "这3万元归明川，无须返还知远。双方明确约定无追索权保理，也没有余款返还约定，适用无追索保理的余款规则。",
        sources: ["civil-code-767"],
        id: "civil-finance-agency-factoring-nonrecourse-surplus-written",
        kind: "subjective",
        title: "无追索保理取得超额回款（自由作答）",
        prompt:
          "知远能否仅凭“回款超过融资本息及相关费用3万元”，要求明川返还这3万元？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-finance-agency-factoring-nonrecourse-surplus-nonrecourse-surplus",
            label: "无追索保理的余款规则",
            meaning:
              "否定知远本项返还请求，并联系无追索约定、无另行返还安排说明超出9万元的部分无须返还。",
            acceptable:
              "可说“这是无追索保理，多收的这3万依法不用退给原债权人，合同也没另约”，认可等义表达。",
            boundary:
              "不推成有追索保理也不返余款；不处理欺诈、虚构债权、其他违约或另行返还约定，不制造统一费用比例。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-commission-external-relations",
    title: "行纪交易的对外关系",
    headline: "行纪人自己签合同，对外先由行纪人享有权利、承担义务。",
    goal: "谁可以依据这份买卖合同向北川商店请求支付货款？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "行纪人受托从事贸易，用的是自己的名义。看清买卖合同上谁是卖方或买方，不能直接把委托人当成合同一方。",
      "交易对方不履行合同，给委托人造成损失，行纪人原则上还要向委托人赔偿；双方另有约定的，按约定处理。",
    ],
    example: {
      title: "谁向买方收货款",
      facts:
        "本案为原创教学虚构，判断时间为2026年10月。青石工坊委托远岚贸易公司销售一批陶杯，并支付行纪报酬。远岚以自己名义与北川商店签订买卖合同，已交付合格陶杯。商店的6万元货款到期未付。三方未另作债权转让或直接结算安排。",
      analysis:
        "远岚可以请求北川商店支付6万元。远岚以自己的名义签订买卖合同，直接享有该合同的货款请求权；青石不能仅凭委托关系直接按这份合同向商店收款。",
    },
    pitfall: "不要把行纪人当成只传话、不承担合同责任的中间人。",
    recall: {
      prompt: "谁可以依据这份买卖合同向北川商店请求支付货款？",
      reference: "行纪人自己签合同，对外先由行纪人享有权利、承担义务。",
    },
    sources: ["civil-commission-external-code"],
    exercises: [
      {
        caseId: "civil-finance-agency-commission-claim-price",
        relatedTopicIds: ["civil-commission-external-relations"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。青石工坊委托远岚贸易公司销售一批陶杯，并支付行纪报酬。远岚以自己名义与北川商店签订买卖合同，已交付合格陶杯。商店的6万元货款到期未付。三方未另作债权转让或直接结算安排。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "远岚可以请求北川商店支付6万元。远岚以自己的名义签订买卖合同，直接享有该合同的货款请求权；青石不能仅凭委托关系直接按这份合同向商店收款。",
        sources: ["civil-commission-external-code"],
        id: "civil-finance-agency-commission-claim-price-choice",
        kind: "objective",
        choiceMode: "single",
        title: "谁向买方收货款：选择判断",
        prompt: "谁可以依据这份买卖合同向北川商店请求支付货款？",
        options: [
          {
            id: "a",
            text: "远岚可以依买卖合同请求支付货款",
            explanation: "合同由远岚以自己名义订立，货款请求权由远岚直接享有。",
          },
          {
            id: "b",
            text: "只能由青石依买卖合同收款",
            explanation: "委托关系不会自动把青石变成该买卖合同的卖方。",
          },
          {
            id: "c",
            text: "远岚只能收报酬，不能收货款",
            explanation: "行纪报酬与远岚对买方享有的货款请求权是两回事。",
          },
          {
            id: "d",
            text: "青石与远岚当然共同享有全部货款请求权",
            explanation: "本题没有形成共同债权的约定或事实。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-finance-agency-commission-claim-price",
        relatedTopicIds: ["civil-commission-external-relations"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。青石工坊委托远岚贸易公司销售一批陶杯，并支付行纪报酬。远岚以自己名义与北川商店签订买卖合同，已交付合格陶杯。商店的6万元货款到期未付。三方未另作债权转让或直接结算安排。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "远岚可以请求北川商店支付6万元。远岚以自己的名义签订买卖合同，直接享有该合同的货款请求权；青石不能仅凭委托关系直接按这份合同向商店收款。",
        sources: ["civil-commission-external-code"],
        id: "civil-finance-agency-commission-claim-price-written",
        kind: "subjective",
        title: "谁向买方收货款：写出分析",
        prompt:
          "谁可以依据这份买卖合同向北川商店请求支付货款？请结合案情说明理由。",
        criteria: [
          {
            id: "commission-party",
            label: "找对收款主体",
            meaning: "说明远岚以自己名义签约，享有对买方的货款请求权。",
            acceptable: "意思明确即可，不要求使用“直接权利义务”这一术语。",
            boundary:
              "仅说青石是货物原所有人，不能据此让其直接按买卖合同收款。",
          },
        ],
      },
      {
        caseId: "civil-finance-agency-commission-third-party-default",
        relatedTopicIds: ["civil-commission-external-relations"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。南汀作坊委托成舟公司以成舟自己的名义出售布料。成舟与买方签约并交货后，买方拒不履行付款义务，致使南汀发生已确认的1.5万元损失。成舟与南汀的行纪合同没有对第三人不履行的风险另作约定。成舟称自己已完成签约交货，不再对这笔损失负责。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不成立。买方不履行付款义务，已经给南汀造成1.5万元损失；双方又没有另作风险约定，成舟应向南汀承担赔偿责任。成舟仍可依据买卖合同向买方主张权利。",
        sources: ["civil-commission-external-code"],
        id: "civil-finance-agency-commission-third-party-default-choice",
        kind: "objective",
        choiceMode: "single",
        title: "买方违约后谁赔损失：选择判断",
        prompt: "成舟的说法是否成立？",
        options: [
          {
            id: "a",
            text: "不成立，南汀因此自动取代成舟成为买卖合同一方",
            explanation: "赔偿责任不会自动更换外部合同当事人。",
          },
          {
            id: "b",
            text: "成立，只要签完合同就不再承担责任",
            explanation: "行纪人的责任不限于签约手续。",
          },
          {
            id: "c",
            text: "不成立，未另有约定时成舟应赔偿南汀的损失",
            explanation:
              "买方不履行造成委托人损失，行纪人依第958条承担赔偿责任。",
          },
          {
            id: "d",
            text: "成立，只有证明成舟挑选买方存在过失才可能赔偿",
            explanation: "本题责任不能另加“挑选买方有过失”这一法条未设的前提。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-finance-agency-commission-third-party-default",
        relatedTopicIds: ["civil-commission-external-relations"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。南汀作坊委托成舟公司以成舟自己的名义出售布料。成舟与买方签约并交货后，买方拒不履行付款义务，致使南汀发生已确认的1.5万元损失。成舟与南汀的行纪合同没有对第三人不履行的风险另作约定。成舟称自己已完成签约交货，不再对这笔损失负责。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不成立。买方不履行付款义务，已经给南汀造成1.5万元损失；双方又没有另作风险约定，成舟应向南汀承担赔偿责任。成舟仍可依据买卖合同向买方主张权利。",
        sources: ["civil-commission-external-code"],
        id: "civil-finance-agency-commission-third-party-default-written",
        kind: "subjective",
        title: "买方违约后谁赔损失：写出分析",
        prompt: "成舟的说法是否成立？请结合案情说明理由。",
        criteria: [
          {
            id: "commission-compensation",
            label: "说明行纪人的赔偿责任",
            meaning:
              "否定免责说法，联系第三人不履行、委托人受损且无另约，说明成舟应赔偿。",
            acceptable:
              "能说明这些事实与赔偿责任的联系即可，不要求写具体条号。",
            boundary: "不能仅以已签约交货或本人无过失否定责任。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-commission-price-self-dealing",
    title: "行纪的价差与自己交易",
    headline: "卖得更贵的利益通常归委托人；自己交易要看商品和委托人的意思。",
    goal: "白栎能否当然留下这1500元价差？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "行纪人以更高价格卖出或更低价格买入，增加报酬先看约定；约定和补充规则都不能确定时，价差利益归委托人。",
      "商品有市场定价，委托人也没有反对，行纪人可以自己当买方或卖方，并仍可请求行纪报酬。这个规则不能扩大到所有委托交易。",
    ],
    example: {
      title: "多卖的钱归谁",
      facts:
        "本案为原创教学虚构，判断时间为2026年10月。星河农场委托白栎公司以不低于每箱100元的价格销售100箱果汁。白栎以每箱115元全部卖出，未增加费用。行纪报酬约定为1000元，双方没有价差奖励约定；经补充协商和核对交易习惯，仍无法确定增加报酬。白栎要求在1000元报酬之外再留下1500元价差。",
      analysis:
        "不能。双方没有能够确定的价差奖励约定，卖得更贵的1500元归星河农场。白栎仍可收取原来约定的1000元行纪报酬。",
    },
    pitfall:
      "多卖出的价差不是行纪人当然可以留下的奖金；自己交易也并非一律禁止。",
    recall: {
      prompt: "白栎能否当然留下这1500元价差？",
      reference: "卖得更贵的利益通常归委托人；自己交易要看商品和委托人的意思。",
    },
    sources: ["civil-commission-price-code"],
    exercises: [
      {
        caseId: "civil-finance-agency-commission-better-price",
        relatedTopicIds: ["civil-commission-price-self-dealing"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。星河农场委托白栎公司以不低于每箱100元的价格销售100箱果汁。白栎以每箱115元全部卖出，未增加费用。行纪报酬约定为1000元，双方没有价差奖励约定；经补充协商和核对交易习惯，仍无法确定增加报酬。白栎要求在1000元报酬之外再留下1500元价差。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。双方没有能够确定的价差奖励约定，卖得更贵的1500元归星河农场。白栎仍可收取原来约定的1000元行纪报酬。",
        sources: ["civil-commission-price-code"],
        id: "civil-finance-agency-commission-better-price-choice",
        kind: "objective",
        choiceMode: "single",
        title: "多卖的钱归谁：选择判断",
        prompt: "白栎能否当然留下这1500元价差？",
        options: [
          {
            id: "a",
            text: "可以，行纪人自己签约就取得全部价差",
            explanation: "对外签约身份不决定行纪内部的利益归属。",
          },
          {
            id: "b",
            text: "不能，1500元归星河，原约定报酬另行支付",
            explanation: "无法确定增加报酬时，有利价差属于委托人。",
          },
          {
            id: "c",
            text: "不能，而且白栎连原约定报酬也应退还",
            explanation: "较高价格成交没有使原报酬约定失效。",
          },
          {
            id: "d",
            text: "可以，超过最低价的部分当然归行纪人",
            explanation: "最低卖价不是把全部额外收益让给行纪人的约定。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-finance-agency-commission-better-price",
        relatedTopicIds: ["civil-commission-price-self-dealing"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。星河农场委托白栎公司以不低于每箱100元的价格销售100箱果汁。白栎以每箱115元全部卖出，未增加费用。行纪报酬约定为1000元，双方没有价差奖励约定；经补充协商和核对交易习惯，仍无法确定增加报酬。白栎要求在1000元报酬之外再留下1500元价差。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。双方没有能够确定的价差奖励约定，卖得更贵的1500元归星河农场。白栎仍可收取原来约定的1000元行纪报酬。",
        sources: ["civil-commission-price-code"],
        id: "civil-finance-agency-commission-better-price-written",
        kind: "subjective",
        title: "多卖的钱归谁：写出分析",
        prompt: "白栎能否当然留下这1500元价差？请结合案情说明理由。",
        criteria: [
          {
            id: "commission-spread",
            label: "区分价差与原报酬",
            meaning: "说明1500元归委托人，原约定1000元报酬仍应支付。",
            acceptable:
              "分别说明额外收益与原报酬即可，不要求精确复述补充规则。",
            boundary:
              "不能因为行纪人促成更高售价，就自动把额外收益当作其报酬。",
          },
        ],
      },
      {
        caseId: "civil-finance-agency-commission-self-purchase",
        relatedTopicIds: ["civil-commission-price-self-dealing"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。临桥公司委托砺川公司销售一批有公开市场定价的标准铜料，约定按当天市场价成交，行纪报酬2000元。临桥没有表示反对砺川自己买入。砺川按当天市场价买下全部铜料并付款，临桥却称买方是砺川，故行纪报酬应当取消。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不应取消。铜料有市场定价，临桥没有反对，砺川又按约定市场价买入，可以自己成为买方；这种情况下仍可请求2000元行纪报酬。",
        sources: ["civil-commission-price-code"],
        id: "civil-finance-agency-commission-self-purchase-choice",
        kind: "objective",
        choiceMode: "single",
        title: "行纪人自己买下商品：选择判断",
        prompt: "仅因砺川自己买入，就应取消行纪报酬吗？",
        options: [
          {
            id: "a",
            text: "应取消，自己交易一律无效",
            explanation: "有市场定价且委托人未反对时，行纪人可以自己交易。",
          },
          {
            id: "b",
            text: "应取消，自己交易虽然有效但不得收行纪报酬",
            explanation: "第956条明确保留此类交易的行纪报酬请求权。",
          },
          {
            id: "c",
            text: "不取消，因为行纪人可以在任何商品上随意自己交易",
            explanation: "自己交易有商品市场定价及委托人意思等条件。",
          },
          {
            id: "d",
            text: "不取消，本题满足自己交易条件且仍可收约定报酬",
            explanation:
              "本题有市场定价、没有相反意思并按约成交，报酬不因此取消。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-finance-agency-commission-self-purchase",
        relatedTopicIds: ["civil-commission-price-self-dealing"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。临桥公司委托砺川公司销售一批有公开市场定价的标准铜料，约定按当天市场价成交，行纪报酬2000元。临桥没有表示反对砺川自己买入。砺川按当天市场价买下全部铜料并付款，临桥却称买方是砺川，故行纪报酬应当取消。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不应取消。铜料有市场定价，临桥没有反对，砺川又按约定市场价买入，可以自己成为买方；这种情况下仍可请求2000元行纪报酬。",
        sources: ["civil-commission-price-code"],
        id: "civil-finance-agency-commission-self-purchase-written",
        kind: "subjective",
        title: "行纪人自己买下商品：写出分析",
        prompt: "仅因砺川自己买入，就应取消行纪报酬吗？请结合案情说明理由。",
        criteria: [
          {
            id: "commission-self-trade",
            label: "说明自己交易与报酬",
            meaning:
              "结合市场定价、未反对和按约成交，说明可自己买入且仍可收报酬。",
            acceptable: "不必逐字复述法条，条件和结果表达清楚即可。",
            boundary: "不认可“自己交易一律有效”或“自己买入必然不能收报酬”。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-intermediary-report",
    title: "中介的报告与责任",
    headline: "中介要把重要事实说实话，但通常不替交易一方还债。",
    goal: "澄明能否收取报酬，是否应赔偿这8000元损失？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "中介故意隐瞒重要事实或提供虚假情况，损害委托人利益，就不能收报酬，还要赔偿损失。",
      "中介促成合同成立，报酬通常按约支付。交易一方后来不付款，不等于中介必须代付；还要看中介是否另作保证或有其他违约。",
    ],
    example: {
      title: "中介藏起了维修报告",
      facts:
        "本案为原创教学虚构，判断时间为2026年10月。长夏公司委托澄明中介寻找二手印刷机，约定成交后支付5000元报酬。澄明拿到检测报告，报告写明机器主轴已裂、需要停机维修；为促成交易，澄明删去这一页，向长夏称“检测没有故障”。长夏据此签约，收机后额外支出已确认的8000元维修损失。",
      analysis:
        "澄明不能收取5000元报酬，还应赔偿8000元损失。主轴裂纹是影响买机的重要事实，澄明故意藏起报告并谎称没有故障，已给长夏造成损失。",
    },
    pitfall: "把中介自己的报告义务和买卖双方的履约义务分开。",
    recall: {
      prompt: "澄明能否收取报酬，是否应赔偿这8000元损失？",
      reference: "中介要把重要事实说实话，但通常不替交易一方还债。",
    },
    sources: ["civil-intermediary-report-code"],
    exercises: [
      {
        caseId: "civil-finance-agency-intermediary-concealed-defect",
        relatedTopicIds: ["civil-intermediary-report"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。长夏公司委托澄明中介寻找二手印刷机，约定成交后支付5000元报酬。澄明拿到检测报告，报告写明机器主轴已裂、需要停机维修；为促成交易，澄明删去这一页，向长夏称“检测没有故障”。长夏据此签约，收机后额外支出已确认的8000元维修损失。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "澄明不能收取5000元报酬，还应赔偿8000元损失。主轴裂纹是影响买机的重要事实，澄明故意藏起报告并谎称没有故障，已给长夏造成损失。",
        sources: ["civil-intermediary-report-code"],
        id: "civil-finance-agency-intermediary-concealed-defect-choice",
        kind: "objective",
        choiceMode: "single",
        title: "中介藏起了维修报告：选择判断",
        prompt: "澄明能否收取报酬，是否应赔偿这8000元损失？",
        options: [
          {
            id: "a",
            text: "不能收报酬，并应赔偿已确认的损失",
            explanation:
              "故意隐瞒重要事实、提供虚假情况并造成损失，触发中介的责任。",
          },
          {
            id: "b",
            text: "可以收报酬，只由卖方赔偿",
            explanation: "促成交易不能免除中介自己故意隐瞒的责任。",
          },
          {
            id: "c",
            text: "只需退报酬，任何情况下都不赔偿",
            explanation: "第962条同时规定不得请求报酬和损害赔偿责任。",
          },
          {
            id: "d",
            text: "仍可收报酬，只要中介不是机器所有人",
            explanation: "中介的如实报告义务不取决于其是否拥有机器。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-finance-agency-intermediary-concealed-defect",
        relatedTopicIds: ["civil-intermediary-report"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。长夏公司委托澄明中介寻找二手印刷机，约定成交后支付5000元报酬。澄明拿到检测报告，报告写明机器主轴已裂、需要停机维修；为促成交易，澄明删去这一页，向长夏称“检测没有故障”。长夏据此签约，收机后额外支出已确认的8000元维修损失。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "澄明不能收取5000元报酬，还应赔偿8000元损失。主轴裂纹是影响买机的重要事实，澄明故意藏起报告并谎称没有故障，已给长夏造成损失。",
        sources: ["civil-intermediary-report-code"],
        id: "civil-finance-agency-intermediary-concealed-defect-written",
        kind: "subjective",
        title: "中介藏起了维修报告：写出分析",
        prompt:
          "澄明能否收取报酬，是否应赔偿这8000元损失？请结合案情说明理由。",
        criteria: [
          {
            id: "intermediary-report-breach",
            label: "抓住故意隐瞒的重要事实",
            meaning:
              "联系删报告、虚称无故障及交易损失，说明中介违反如实报告义务。",
            acceptable: "用“把重要故障藏起来骗成交”等自然表达即可。",
            boundary: "仅说机器坏了，不能代替中介故意隐瞒的事实。",
          },
          {
            id: "intermediary-remedy",
            label: "说清报酬与赔偿",
            meaning: "说明不能收5000元报酬，并应赔偿已确认的8000元损失。",
            acceptable: "可不重复金额，但须同时表达报酬丧失和损失赔偿。",
            boundary: "不能以已经成交为由保留报酬，也不能把赔偿一概排除。",
          },
        ],
      },
      {
        caseId: "civil-finance-agency-intermediary-not-guarantor",
        relatedTopicIds: ["civil-intermediary-report"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。槐安工坊委托墨川中介寻找买家，约定买卖合同成立时付中介报酬3000元。墨川如实报告买方资料并促成工坊与买方签约，没有作付款保证，也没有隐瞒事项或违反约定。后来买方经营困难，拖欠货款。工坊要求墨川代付货款，同时拒付中介报酬。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。墨川已按约促成合同成立，可以请求3000元报酬；它没有作付款保证，也没有违约，不能仅因买方拖欠就要求它代付货款。工坊应向买方主张货款。",
        sources: ["civil-intermediary-report-code"],
        id: "civil-finance-agency-intermediary-not-guarantor-choice",
        kind: "objective",
        choiceMode: "single",
        title: "成交后买方拖欠货款：选择判断",
        prompt: "工坊的两项要求能否仅凭买方拖欠货款成立？",
        options: [
          {
            id: "a",
            text: "能，中介对所有成交合同都承担连带责任",
            explanation: "法律没有规定中介对交易债务一律承担连带责任。",
          },
          {
            id: "b",
            text: "能，中介找来的买方欠款就由中介代还",
            explanation: "介绍交易不等于为买方履行作保证。",
          },
          {
            id: "c",
            text: "不能，中介报酬按约支付，货款向买方主张",
            explanation:
              "合同已按约成立，中介没有保证或违约，买方欠款不自动改变两项义务。",
          },
          {
            id: "d",
            text: "不能要求代付，但买方拖欠就永久免除中介报酬",
            explanation: "报酬约定以合同成立为条件，本题该条件已满足。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-finance-agency-intermediary-not-guarantor",
        relatedTopicIds: ["civil-intermediary-report"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。槐安工坊委托墨川中介寻找买家，约定买卖合同成立时付中介报酬3000元。墨川如实报告买方资料并促成工坊与买方签约，没有作付款保证，也没有隐瞒事项或违反约定。后来买方经营困难，拖欠货款。工坊要求墨川代付货款，同时拒付中介报酬。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。墨川已按约促成合同成立，可以请求3000元报酬；它没有作付款保证，也没有违约，不能仅因买方拖欠就要求它代付货款。工坊应向买方主张货款。",
        sources: ["civil-intermediary-report-code"],
        id: "civil-finance-agency-intermediary-not-guarantor-written",
        kind: "subjective",
        title: "成交后买方拖欠货款：写出分析",
        prompt: "工坊的两项要求能否仅凭买方拖欠货款成立？请结合案情说明理由。",
        criteria: [
          {
            id: "intermediary-separate-duties",
            label: "区分成交服务与买方付款",
            meaning:
              "说明墨川可收约定报酬，且在无保证、无违约时不代付买方货款。",
            acceptable: "能把买方欠款与中介已完成的服务分清即可。",
            boundary:
              "不能把中介自动当成保证人，也不能把合同履行完毕另加为本题报酬条件。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-intermediary-remuneration",
    title: "中介报酬与绕开成交",
    headline: "没成交看约定的必要费用；利用中介机会绕开成交，报酬照付。",
    goal: "闻岸能请求哪些款项？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "中介未促成合同成立，不能收取中介报酬。必要费用是否由委托人承担，要看约定。",
      "接受中介服务后，利用中介提供的交易机会绕开中介签约，仍要付报酬。判断重点是成交是否利用了这次服务，不是最后在哪里签字。",
    ],
    example: {
      title: "没谈成，差旅费怎么算",
      facts:
        "本案为原创教学虚构，判断时间为2026年10月。栖松公司委托闻岸中介寻找供货商，约定促成合同成立才付报酬6000元；即使未成交，栖松也承担经事先同意的必要差旅费。双方最终没有订立供货合同。闻岸已支出栖松事先认可的必要差旅费600元，另要求照收6000元报酬。",
      analysis:
        "闻岸可以请求600元必要差旅费，不能请求6000元报酬。供货合同没有成立，不满足报酬条件；差旅费已有单独约定，且支出确属事先认可的必要费用。",
    },
    pitfall: "必要费用与成交报酬分开算；自行签字也不当然免除报酬。",
    recall: {
      prompt: "闻岸能请求哪些款项？",
      reference: "没成交看约定的必要费用；利用中介机会绕开成交，报酬照付。",
    },
    sources: ["civil-intermediary-reward-code"],
    exercises: [
      {
        caseId: "civil-finance-agency-intermediary-no-contract",
        relatedTopicIds: ["civil-intermediary-remuneration"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。栖松公司委托闻岸中介寻找供货商，约定促成合同成立才付报酬6000元；即使未成交，栖松也承担经事先同意的必要差旅费。双方最终没有订立供货合同。闻岸已支出栖松事先认可的必要差旅费600元，另要求照收6000元报酬。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "闻岸可以请求600元必要差旅费，不能请求6000元报酬。供货合同没有成立，不满足报酬条件；差旅费已有单独约定，且支出确属事先认可的必要费用。",
        sources: ["civil-intermediary-reward-code"],
        id: "civil-finance-agency-intermediary-no-contract-choice",
        kind: "objective",
        choiceMode: "single",
        title: "没谈成，差旅费怎么算：选择判断",
        prompt: "闻岸能请求哪些款项？",
        options: [
          {
            id: "a",
            text: "报酬和差旅费都不能收",
            explanation: "未成交不排除按约请求必要费用。",
          },
          {
            id: "b",
            text: "只能按约收600元必要差旅费",
            explanation: "未成交不能收报酬，但已约定的必要费用可请求。",
          },
          {
            id: "c",
            text: "报酬与差旅费都能收，只要中介努力过",
            explanation: "努力不等于促成合同成立。",
          },
          {
            id: "d",
            text: "只能收6000元报酬，费用不得另算",
            explanation: "未促成合同成立，不能收取成交报酬。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-finance-agency-intermediary-no-contract",
        relatedTopicIds: ["civil-intermediary-remuneration"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。栖松公司委托闻岸中介寻找供货商，约定促成合同成立才付报酬6000元；即使未成交，栖松也承担经事先同意的必要差旅费。双方最终没有订立供货合同。闻岸已支出栖松事先认可的必要差旅费600元，另要求照收6000元报酬。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "闻岸可以请求600元必要差旅费，不能请求6000元报酬。供货合同没有成立，不满足报酬条件；差旅费已有单独约定，且支出确属事先认可的必要费用。",
        sources: ["civil-intermediary-reward-code"],
        id: "civil-finance-agency-intermediary-no-contract-written",
        kind: "subjective",
        title: "没谈成，差旅费怎么算：写出分析",
        prompt: "闻岸能请求哪些款项？请结合案情说明理由。",
        criteria: [
          {
            id: "intermediary-expense-versus-reward",
            label: "把报酬与必要费用分开",
            meaning: "说明6000元报酬不能收，600元必要差旅费可依约请求。",
            acceptable: "分别给出结果及未成交、费用另有约定这两项理由即可。",
            boundary:
              "不能把所有中介支出自动转给委托人，也不能因未成交否定已有费用约定。",
          },
        ],
      },
      {
        caseId: "civil-finance-agency-intermediary-bypass",
        relatedTopicIds: ["civil-intermediary-remuneration"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。青屿公司委托朗禾中介寻找一批指定型号的旧货架，约定交易合同成立时支付报酬4000元。朗禾找到符合要求的卖方，安排看货并提供联系方式。青屿随后私下联系该卖方，直接签约购买同一批货架；价格等条件沿用了朗禾已经谈好的方案。青屿以“最后是我们自己签的”为由拒付报酬。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。青屿利用朗禾提供的卖方、看货和交易方案，绕开中介完成了同一笔交易，仍应支付4000元报酬。最后由青屿自己签约，不会免除这笔报酬。",
        sources: ["civil-intermediary-reward-code"],
        id: "civil-finance-agency-intermediary-bypass-choice",
        kind: "objective",
        choiceMode: "single",
        title: "拿到联系方式后自己签约：选择判断",
        prompt: "青屿能否因此拒付4000元报酬？",
        options: [
          {
            id: "a",
            text: "能，只要中介没有在合同上签字",
            explanation:
              "中介通常不是交易合同一方，未签字不等于未提供成交机会。",
          },
          {
            id: "b",
            text: "能，私下压价成功就一律不算利用中介服务",
            explanation: "本题成交沿用同一机会与方案，不能仅凭私下谈判免责。",
          },
          {
            id: "c",
            text: "能，中介只能收取看货费用",
            explanation: "本题已利用中介机会成交，报酬约定已经适用。",
          },
          {
            id: "d",
            text: "不能，利用中介提供的机会绕开成交仍须付报酬",
            explanation: "接受服务、利用同一交易机会并绕开成交，符合第965条。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-finance-agency-intermediary-bypass",
        relatedTopicIds: ["civil-intermediary-remuneration"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。青屿公司委托朗禾中介寻找一批指定型号的旧货架，约定交易合同成立时支付报酬4000元。朗禾找到符合要求的卖方，安排看货并提供联系方式。青屿随后私下联系该卖方，直接签约购买同一批货架；价格等条件沿用了朗禾已经谈好的方案。青屿以“最后是我们自己签的”为由拒付报酬。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。青屿利用朗禾提供的卖方、看货和交易方案，绕开中介完成了同一笔交易，仍应支付4000元报酬。最后由青屿自己签约，不会免除这笔报酬。",
        sources: ["civil-intermediary-reward-code"],
        id: "civil-finance-agency-intermediary-bypass-written",
        kind: "subjective",
        title: "拿到联系方式后自己签约：写出分析",
        prompt: "青屿能否因此拒付4000元报酬？请结合案情说明理由。",
        criteria: [
          {
            id: "intermediary-bypass-reward",
            label: "联系利用服务说明报酬",
            meaning:
              "结合中介找到卖方、组织看货、提供方案和同一笔成交，说明仍应支付报酬。",
            acceptable:
              "无需列齐每项服务，说明成交利用了该中介提供的机会即可。",
            boundary: "不能只凭最后由当事人自行签字，就认定无需支付中介报酬。",
          },
        ],
      },
    ],
  },
];

export const civilFinanceAgencyChapters = [
  {
    id: "CIV-FINANCE-LEASE",
    title: "融资租赁合同",
    section: "民法",
    topicIds: ["civil-finance-lease-title", "civil-finance-lease-rent-risk"],
  },
  {
    id: "CIV-FACTORING",
    title: "保理合同",
    section: "民法",
    topicIds: ["civil-factoring-notice", "civil-factoring-recourse"],
  },
  {
    id: "CIV-COMMISSION-AGENCY",
    title: "行纪合同",
    section: "民法",
    topicIds: [
      "civil-commission-external-relations",
      "civil-commission-price-self-dealing",
    ],
  },
  {
    id: "CIV-INTERMEDIARY",
    title: "中介合同",
    section: "民法",
    topicIds: ["civil-intermediary-report", "civil-intermediary-remuneration"],
  },
];

export const civilFinanceAgencyExercises = civilFinanceAgencyTopics.flatMap(
  (topic) => topic.exercises,
);
export const civilFinanceAgencyContentPack = {
  revision: civilFinanceAgencyRevision,
  snapshot: {
    topics: civilFinanceAgencyTopics,
    sources: civilFinanceAgencySources,
  },
};
export const civilFinanceAgencyDefaultQueues = {
  objective: civilFinanceAgencyExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilFinanceAgencyExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilFinanceAgencyQuestion(id: string) {
  const question = civilFinanceAgencyExercises.find((q) => q.id === id);
  return question ? structuredClone(question) : undefined;
}
export function civilFinanceAgencyTopicForQuestion(id: string) {
  return civilFinanceAgencyTopics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function civilFinanceAgencySameCaseQuestions(id: string) {
  const question = civilFinanceAgencyQuestion(id);
  return question
    ? structuredClone(
        civilFinanceAgencyExercises.filter((q) => q.caseId === question.caseId),
      )
    : [];
}
export function civilFinanceAgencyChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = civilFinanceAgencyChapters.find((c) => c.id === chapterId);
  return chapter
    ? civilFinanceAgencyTopics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}
