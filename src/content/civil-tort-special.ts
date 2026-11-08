import type { ContentSources, FaultTopic } from "./fault-unit";

// Original fictional cases. Paired forms share facts, not independent outcomes.
export const civilTortSpecialRevision = "civil-tort-special-2026-10-23.v1";

export const civilTortSpecialSources: ContentSources = {
  "civil-tort-special-guardian1188": {
    title: "《民法典》第19、20、27、1188条：未成年人致害与监护责任",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接读取官方原文。《民法典》2020-05-28通过、2021-01-01施行；北京市政府页面2020-06-02发布并标示有效。两案分别为6岁、12岁未成年人致他人财产损失，不涉及学校、教唆帮助、成年时间变化或父母离异。尽到监护职责可以减轻，不是当然免责。",
  },
  "civil-tort-special-guardian-payment5": {
    title: "侵权责任编解释（一）第5、7条：监护责任与被监护人财产支付",
    url: "https://ipc.court.gov.cn/zh-cn/news/view-3485.html",
    note: "2026-10-23直接读取官方原文。最高人民法院法释〔2024〕12号，2024-09-26公布页面，自2024-09-27施行；所用为正式解释，不是征求意见稿。监护人承担侵权人应承担的全部责任，被监护人财产可先支付，不能把监护人改称仅负补充责任；须保留必要生活和义务教育费用。数额案已给定必要留存额，只算支付来源，不重定损失。",
  },
  "civil-tort-special-entrust1189": {
    title: "《民法典》第1189条：委托监护并不转走监护人的责任",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接读取官方原文。《民法典》2020-05-28通过、2021-01-01施行；北京市政府页面2020-06-02发布并标示有效。只考受害人对监护人与受托人的请求，不问双方内部合同追偿；受托人有过错时承担相应责任。",
  },
  "civil-tort-special-entrust10": {
    title: "侵权责任编解释（一）第10条：监护人与受托人的对外责任",
    url: "https://ipc.court.gov.cn/zh-cn/news/view-3485.html",
    note: "2026-10-23直接读取官方原文。最高人民法院法释〔2024〕12号，2024-09-26公布页面，自2024-09-27施行；所用为正式解释，不是征求意见稿。监护人承担侵权人应承担的全部责任，受托人在过错范围内共同承担；受害人实收赔偿不得超过损失。不写成双方当然各半，也不要求受托人先赔后监护人补充。",
  },
  "civil-tort-special-worker1191": {
    title: "《民法典》第1165、1191条：工作任务致害与个人行为",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接读取官方原文。《民法典》2020-05-28通过、2021-01-01施行；北京市政府页面2020-06-02发布并标示有效。区分执行工作任务和周末私人搬家；两案均非机动车道路事故、工伤、个人劳务或承揽。只问对外责任，不用一般管理过错替代第1191条，不裁定内部追偿。",
  },
  "civil-tort-special-worker15": {
    title: "侵权责任编解释（一）第15条：执行单位工作任务的责任",
    url: "https://ipc.court.gov.cn/zh-cn/news/view-3485.html",
    note: "2026-10-23直接读取官方原文。最高人民法院法释〔2024〕12号，2024-09-26公布页面，自2024-09-27施行；所用为正式解释，不是征求意见稿。工作人员因执行工作任务造成他人损害，由用人单位承担。私人事项不能只凭穿工作服或具有员工身份就纳入工作任务。",
  },
  "civil-tort-special-dispatch1191": {
    title: "《民法典》第1191条第2款：劳务派遣致害",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接读取官方原文。《民法典》2020-05-28通过、2021-01-01施行；北京市政府页面2020-06-02发布并标示有效。两案均已成立有效劳务派遣且正在执行用工单位任务，只问用工单位与派遣单位对外责任，不讨论派遣有效性、工伤或内部追偿。",
  },
  "civil-tort-special-dispatch16": {
    title: "侵权责任编解释（一）第16条：用工单位全责与派遣单位过错范围",
    url: "https://ipc.court.gov.cn/zh-cn/news/view-3485.html",
    note: "2026-10-23直接读取官方原文。最高人民法院法释〔2024〕12号，2024-09-26公布页面，自2024-09-27施行；所用为正式解释，不是征求意见稿。用工单位承担侵权人应承担的全部责任；派遣单位在不当选派、未依法培训等过错范围内共同承担；不能只因签了劳动合同就当然全额连带或各半，实际赔偿总额不超过损失。",
  },
  "civil-tort-special-animal1245": {
    title: "《民法典》第1245条：一般饲养动物致害责任",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接读取官方原文。《民法典》2020-05-28通过、2021-01-01施行；北京市政府页面2020-06-02发布并标示有效。合法饲养的普通宠物犬，受害人正常通行，无故意或重大过失；不涉及动物园、禁养危险动物或人驱使动物攻击。饲养人不能仅凭已牵绳、未发现疏忽免责。",
  },
  "civil-tort-special-animal1246": {
    title: "《民法典》第1246条：违反管理规定未采取安全措施",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接读取官方原文。《民法典》2020-05-28通过、2021-01-01施行；北京市政府页面2020-06-02发布并标示有效。专考未牵绳未隔离与受害人故意招致伤害的情形。证明受害人故意可减轻，不是第1245条下可以全免；不确定具体减轻比例，不涉及禁养动物的第1247条。",
  },
  "civil-tort-special-leash30": {
    title: "《动物防疫法》第30条：携犬出户的安全措施",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/qtwj/202505/t20250527_4098772.html",
    note: "2026-10-23直接读取北京市政府所载正式全文第30条及版本信息；2021-01-22第二次修订、2021-05-01施行，页面列发布日期2021-01-23并标示有效。用于说明携犬出户须按规定佩戴犬牌并采取系犬绳等措施，不杜撰地方条例，不考行政处罚。",
  },
  "civil-tort-special-animal1250": {
    title: "《民法典》第1250条：第三人过错致使动物伤人",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接读取官方原文。《民法典》2020-05-28通过、2021-01-01施行；北京市政府页面2020-06-02发布并标示有效。第三人点燃爆竹惊犬导致正常行人受伤，饲养人按规定牵绳，无其自身过错或受害人过错争议。受害人可向饲养人或第三人请求；饲养人赔偿后向第三人追偿，只计已支付合理损失，不重复受偿。",
  },
  "civil-tort-special-animal1249": {
    title: "《民法典》第1249条：逃逸动物的原饲养人责任",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接读取官方原文。《民法典》2020-05-28通过、2021-01-01施行；北京市政府页面2020-06-02发布并标示有效。身份明确的家养宠物犬逃逸两日后致害，无新收养人或其他实际管理人；原饲养人不能仅凭动物离开控制就免责。不考动物园或不能确认原饲养人的流浪动物。",
  },
};

export const civilTortSpecialTopics: FaultTopic[] = [
  {
    id: "civil-tort-guardian-liability",
    title: "监护人责任与赔偿支付",
    headline:
      "未成年人致害，监护人承担责任；孩子有财产可以先用于赔偿，但必要生活和义务教育费用要留下。",
    goal: "商店能否要求小川的父母赔偿？",
    prerequisite: "能分清行为人、受害人和本题所问的责任主体。",
    minutes: "6–10",
    paragraphs: [
      "无民事行为能力人、限制民事行为能力人造成他人损害，由监护人承担侵权责任。监护人确实尽到职责，可以减轻责任；仅说平时教育过孩子，不能直接免赔。",
      "孩子有财产时，可以先从其财产中支付赔偿，不够的由监护人支付。孩子必需的生活费和完成义务教育所需费用应当保留。这是赔偿款从哪里支付的问题，不是把父母变成只负补充责任。",
    ],
    example: {
      title: "店门口的滑板",
      facts:
        "本案为原创教学虚构。6岁的小川随父母到商店购物，推着自己的滑板撞碎店内陈列柜玻璃。店方确认由小川撞坏，合理修复费为3000元，也没有店方摆放不当等其他致损原因。小川没有可供赔偿的财产。父母说平时经常提醒他不要碰店内物品，因此商店只能自认损失。",
      analysis:
        "可以要求父母赔偿。小川只有6岁，由监护人承担其致害责任。父母说平时提醒过孩子，不是免赔理由；即使确实尽到监护职责，法律也只是允许减轻责任，并非当然免责。",
    },
    pitfall: "把教育过孩子当作免责理由，或把孩子的必要生活、教育费用一并拿走。",
    recall: {
      prompt: "商店能否要求小川的父母赔偿？",
      reference:
        "未成年人致害，监护人承担责任；孩子有财产可以先用于赔偿，但必要生活和义务教育费用要留下。",
    },
    sources: [
      "civil-tort-special-guardian1188",
      "civil-tort-special-guardian-payment5",
    ],
    exercises: [
      {
        caseId: "civil-tort-special-guardian-shop",
        relatedTopicIds: ["civil-tort-guardian-liability"],
        facts:
          "本案为原创教学虚构。6岁的小川随父母到商店购物，推着自己的滑板撞碎店内陈列柜玻璃。店方确认由小川撞坏，合理修复费为3000元，也没有店方摆放不当等其他致损原因。小川没有可供赔偿的财产。父母说平时经常提醒他不要碰店内物品，因此商店只能自认损失。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "可以要求父母赔偿。小川只有6岁，由监护人承担其致害责任。父母说平时提醒过孩子，不是免赔理由；即使确实尽到监护职责，法律也只是允许减轻责任，并非当然免责。",
        sources: ["civil-tort-special-guardian1188"],
        id: "civil-tort-special-guardian-shop-choice",
        kind: "objective",
        choiceMode: "single",
        title: "店门口的滑板：选择判断",
        prompt: "商店能否要求小川的父母赔偿？",
        options: [
          {
            id: "a",
            text: "只能要求6岁的小川自己承担赔偿责任",
            explanation: "未成年人的此类致害责任由监护人承担。",
          },
          {
            id: "b",
            text: "父母平时教育过，就当然不用赔偿",
            explanation: "教育过不等于当然免责。",
          },
          {
            id: "c",
            text: "可要求父母赔偿，尽到监护职责也只是可以减轻责任",
            explanation: "第1188条区分承担责任与尽责时的减轻。",
          },
          {
            id: "d",
            text: "没有证据证明父母本人撞坏玻璃，就不能要求父母赔偿",
            explanation: "无需把父母认作实际撞坏玻璃的人。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-tort-special-guardian-shop",
        relatedTopicIds: ["civil-tort-guardian-liability"],
        facts:
          "本案为原创教学虚构。6岁的小川随父母到商店购物，推着自己的滑板撞碎店内陈列柜玻璃。店方确认由小川撞坏，合理修复费为3000元，也没有店方摆放不当等其他致损原因。小川没有可供赔偿的财产。父母说平时经常提醒他不要碰店内物品，因此商店只能自认损失。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "可以要求父母赔偿。小川只有6岁，由监护人承担其致害责任。父母说平时提醒过孩子，不是免赔理由；即使确实尽到监护职责，法律也只是允许减轻责任，并非当然免责。",
        sources: ["civil-tort-special-guardian1188"],
        id: "civil-tort-special-guardian-shop-written",
        kind: "subjective",
        title: "店门口的滑板：写出分析",
        prompt: "商店能否要求小川的父母赔偿？请结合案情说明理由。",
        criteria: [
          {
            id: "guardian-shop-liability",
            label: "父母承担监护责任",
            meaning: "判断可要求父母赔偿，并联系小川6岁及其造成的损失。",
            acceptable: "说孩子未满8岁、由父母作为监护人负责，含义相同即可。",
            boundary:
              "不能让商店只能找孩子，也不能只因父母没有亲手撞坏就免赔。",
          },
          {
            id: "guardian-shop-defense",
            label: "尽责与免责的区别",
            meaning: "指出平时教育不当然免责，确实尽到职责也只是可以减轻。",
            acceptable:
              "说父母即使尽责也不能据此一概拒赔即可，不要求先裁定具体比例。",
            boundary: "不要求认定父母究竟减多少；不能把可减轻说成必定全免。",
          },
        ],
      },
      {
        caseId: "civil-tort-special-guardian-savings",
        relatedTopicIds: ["civil-tort-guardian-liability"],
        facts:
          "本案为原创教学虚构。12岁的小澄骑自行车玩耍时撞坏邻居的设备，应赔的财产损失已确定为2.8万元。小澄继承所得存款共5万元，法院已核明其中3万元是其必需生活费和完成义务教育所需费用，剩余2万元可用于赔偿。父母是其监护人，双方对本案不存在减轻责任的情形没有争议。父母主张先用完孩子全部5万元，自己只在存款耗尽后再考虑赔偿。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "可先用小澄存款中可供赔偿的2万元，剩余8000元由父母支付。必需生活和义务教育所需的3万元应当留下。父母承担监护责任，不能把孩子所有存款用尽，也不能把自己说成只负补充责任。",
        sources: [
          "civil-tort-special-guardian1188",
          "civil-tort-special-guardian-payment5",
        ],
        id: "civil-tort-special-guardian-savings-choice",
        kind: "objective",
        choiceMode: "single",
        title: "赔款从哪里支付：选择判断",
        prompt: "这2.8万元赔偿款应如何支付？",
        options: [
          {
            id: "a",
            text: "孩子有5万元存款，应全部先供执行，不必留下生活教育费",
            explanation: "必要生活和义务教育费用应保留。",
          },
          {
            id: "b",
            text: "先从可供赔偿的2万元支付，余下8000元由父母支付",
            explanation: "兼顾第1188条的支付来源与解释第5条的费用保留。",
          },
          {
            id: "c",
            text: "孩子未成年，任何财产都不能用来赔偿，全部由父母支付",
            explanation: "被监护人有财产时可以先用于赔偿。",
          },
          {
            id: "d",
            text: "父母只需等小澄成年后再支付赔偿",
            explanation: "未成年并不把赔偿推迟到成年。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-tort-special-guardian-savings",
        relatedTopicIds: ["civil-tort-guardian-liability"],
        facts:
          "本案为原创教学虚构。12岁的小澄骑自行车玩耍时撞坏邻居的设备，应赔的财产损失已确定为2.8万元。小澄继承所得存款共5万元，法院已核明其中3万元是其必需生活费和完成义务教育所需费用，剩余2万元可用于赔偿。父母是其监护人，双方对本案不存在减轻责任的情形没有争议。父母主张先用完孩子全部5万元，自己只在存款耗尽后再考虑赔偿。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "可先用小澄存款中可供赔偿的2万元，剩余8000元由父母支付。必需生活和义务教育所需的3万元应当留下。父母承担监护责任，不能把孩子所有存款用尽，也不能把自己说成只负补充责任。",
        sources: [
          "civil-tort-special-guardian1188",
          "civil-tort-special-guardian-payment5",
        ],
        id: "civil-tort-special-guardian-savings-written",
        kind: "subjective",
        title: "赔款从哪里支付：写出分析",
        prompt: "这2.8万元赔偿款应如何支付？请结合案情说明理由。",
        criteria: [
          {
            id: "guardian-savings-payment",
            label: "可用财产与父母支付余额",
            meaning: "先用孩子可供赔偿的2万元，剩余8000元由父母支付。",
            acceptable: "直接列明2万元与8000元，或用等值计算说明即可。",
            boundary: "不能把全部2.8万元都压给孩子，也不能延迟到成年。",
          },
          {
            id: "guardian-savings-reserve",
            label: "保留必要生活教育费用",
            meaning:
              "说明3万元必要生活和义务教育费用须保留，监护责任不因孩子有财产而消失。",
            acceptable:
              "说不能动用预留的3万元、父母仍须承担不足部分即可，不强求责任术语。",
            boundary: "不把支付先后误作父母仅负补充责任；不要求另算生活费。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-tort-entrusted-guardian",
    title: "委托照看与监护责任",
    headline:
      "把孩子交给别人照看，监护人仍要负责；受托人照看有过错，也在过错范围内承担责任。",
    goal: "林乔夫妇能否以已经委托陈岚照看为由拒绝赔偿？陈岚是否也可能承担责任？",
    prerequisite: "能分清行为人、受害人和本题所问的责任主体。",
    minutes: "6–10",
    paragraphs: [
      "父母委托亲友或照护人员照看孩子，不会因此退出对外的监护责任。受害人仍可向父母主张赔偿。",
      "受托照看的人有过错时，在其过错范围内与监护人共同承担责任。不是一律各赔一半，也不是先让受托人赔完才找父母；受害人实收总额不能超过损失。",
    ],
    example: {
      title: "约定照看的下午",
      facts:
        "本案为原创教学虚构。周末，林乔夫妇付费请成年人陈岚在自家院内照看10岁的小安三小时。双方约定孩子玩耍时陈岚应在场看护，院门也需随手关好。陈岚为取快递外出四十分钟，留下敞开的院门。小安独自推滑板车出门，撞坏邻居的展板，造成已确认的4000元损失。本案无人教唆孩子，也无其他致损因素。林乔夫妇说孩子已交给陈岚，当天的损失只能找陈岚。",
      analysis:
        "父母不能拒赔。委托陈岚照看，不会转走父母的监护责任。陈岚应当在场看护，却长时间离开并留下敞开的院门，对这次损失也有过错，应在其过错范围内承担相应责任。",
    },
    pitfall: "以交给别人照看为由让父母免责，或把监护人与受托人机械分成各半。",
    recall: {
      prompt:
        "林乔夫妇能否以已经委托陈岚照看为由拒绝赔偿？陈岚是否也可能承担责任？",
      reference:
        "把孩子交给别人照看，监护人仍要负责；受托人照看有过错，也在过错范围内承担责任。",
    },
    sources: ["civil-tort-special-entrust1189", "civil-tort-special-entrust10"],
    exercises: [
      {
        caseId: "civil-tort-special-entrusted-afternoon",
        relatedTopicIds: ["civil-tort-entrusted-guardian"],
        facts:
          "本案为原创教学虚构。周末，林乔夫妇付费请成年人陈岚在自家院内照看10岁的小安三小时。双方约定孩子玩耍时陈岚应在场看护，院门也需随手关好。陈岚为取快递外出四十分钟，留下敞开的院门。小安独自推滑板车出门，撞坏邻居的展板，造成已确认的4000元损失。本案无人教唆孩子，也无其他致损因素。林乔夫妇说孩子已交给陈岚，当天的损失只能找陈岚。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "父母不能拒赔。委托陈岚照看，不会转走父母的监护责任。陈岚应当在场看护，却长时间离开并留下敞开的院门，对这次损失也有过错，应在其过错范围内承担相应责任。",
        sources: [
          "civil-tort-special-entrust1189",
          "civil-tort-special-entrust10",
        ],
        id: "civil-tort-special-entrusted-afternoon-choice",
        kind: "objective",
        choiceMode: "single",
        title: "约定照看的下午：选择判断",
        prompt:
          "林乔夫妇能否以已经委托陈岚照看为由拒绝赔偿？陈岚是否也可能承担责任？",
        options: [
          {
            id: "a",
            text: "父母与陈岚约定照看，父母即对外免责",
            explanation: "委托监护不转走监护人的对外责任。",
          },
          {
            id: "b",
            text: "陈岚不是孩子父母，任何情况下都不承担责任",
            explanation: "受托人有过错时承担相应责任。",
          },
          {
            id: "c",
            text: "父母与陈岚不论各自情况，一律各承担一半",
            explanation: "法律没有当然各半的规定。",
          },
          {
            id: "d",
            text: "父母仍承担监护责任，陈岚在照看过错范围内承担责任",
            explanation: "同时落实监护人责任与受托人的过错责任。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-tort-special-entrusted-afternoon",
        relatedTopicIds: ["civil-tort-entrusted-guardian"],
        facts:
          "本案为原创教学虚构。周末，林乔夫妇付费请成年人陈岚在自家院内照看10岁的小安三小时。双方约定孩子玩耍时陈岚应在场看护，院门也需随手关好。陈岚为取快递外出四十分钟，留下敞开的院门。小安独自推滑板车出门，撞坏邻居的展板，造成已确认的4000元损失。本案无人教唆孩子，也无其他致损因素。林乔夫妇说孩子已交给陈岚，当天的损失只能找陈岚。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "父母不能拒赔。委托陈岚照看，不会转走父母的监护责任。陈岚应当在场看护，却长时间离开并留下敞开的院门，对这次损失也有过错，应在其过错范围内承担相应责任。",
        sources: [
          "civil-tort-special-entrust1189",
          "civil-tort-special-entrust10",
        ],
        id: "civil-tort-special-entrusted-afternoon-written",
        kind: "subjective",
        title: "约定照看的下午：写出分析",
        prompt:
          "林乔夫妇能否以已经委托陈岚照看为由拒绝赔偿？陈岚是否也可能承担责任？请结合案情说明理由。",
        criteria: [
          {
            id: "entrusted-afternoon-parent",
            label: "委托后父母仍负责",
            meaning: "明确委托照看不使父母免除监护责任。",
            acceptable: "说仍能向父母要赔偿、交给别人不等于责任转移即可。",
            boundary: "不能先要求受害人证明陈岚无力赔偿才找父母。",
          },
          {
            id: "entrusted-afternoon-carer",
            label: "受托人的照看过错",
            meaning:
              "联系约定在场却离开四十分钟、院门敞开，说明陈岚也有相应责任。",
            acceptable:
              "抓住无人看护或未关院门与孩子出门致害的联系即可，无须逐字列齐。",
            boundary: "不要求确定赔偿比例，不把受托人等同当然全额替代父母。",
          },
        ],
      },
      {
        caseId: "civil-tort-special-entrusted-shares",
        relatedTopicIds: ["civil-tort-entrusted-guardian"],
        facts:
          "本案为原创教学虚构。沈禾夫妇付费请孙宁在家照看11岁的女儿小露。孙宁答应在小露使用手工喷漆时全程看护，却戴着耳机到另一个房间睡觉。小露把喷漆拿到楼道试喷，损坏邻居的门板，合理修复费为6000元。邻居合并请求父母与孙宁赔偿。本案不涉及父母责任减轻，只比较监护人与受托人的对外责任。父母主张自己最多赔3000元，另外3000元必须先找孙宁。孙宁也承认当时离开岗位，但尚未确定其具体责任范围。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。父母应承担本案致害的全部监护责任，不能把自己对邻居的责任压成3000元。孙宁在照看过错范围内与父母共同承担；邻居不必先找孙宁。邻居最终实收的赔款总额以6000元损失为限。",
        sources: [
          "civil-tort-special-entrust1189",
          "civil-tort-special-entrust10",
        ],
        id: "civil-tort-special-entrusted-shares-choice",
        kind: "objective",
        choiceMode: "single",
        title: "一份损失向谁主张：选择判断",
        prompt: "父母能否把对邻居的责任固定为一半，并要求邻居先找孙宁？",
        options: [
          {
            id: "a",
            text: "父母对外只负一半责任，另一半必须先找孙宁",
            explanation: "不存在当然各半和受托人先赔的顺序。",
          },
          {
            id: "b",
            text: "父母对外承担全部责任，孙宁在其过错范围内共同承担，邻居不能重复受偿",
            explanation: "解释第10条将各方责任和实收总额分别处理。",
          },
          {
            id: "c",
            text: "邻居可以分别要求父母和孙宁各赔6000元，合计收取1.2万元",
            explanation: "赔偿不能超过受害人的应受偿损失。",
          },
          {
            id: "d",
            text: "只要孙宁认错，父母就不再承担监护责任",
            explanation: "受托人的过错不使监护人退出责任。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-tort-special-entrusted-shares",
        relatedTopicIds: ["civil-tort-entrusted-guardian"],
        facts:
          "本案为原创教学虚构。沈禾夫妇付费请孙宁在家照看11岁的女儿小露。孙宁答应在小露使用手工喷漆时全程看护，却戴着耳机到另一个房间睡觉。小露把喷漆拿到楼道试喷，损坏邻居的门板，合理修复费为6000元。邻居合并请求父母与孙宁赔偿。本案不涉及父母责任减轻，只比较监护人与受托人的对外责任。父母主张自己最多赔3000元，另外3000元必须先找孙宁。孙宁也承认当时离开岗位，但尚未确定其具体责任范围。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。父母应承担本案致害的全部监护责任，不能把自己对邻居的责任压成3000元。孙宁在照看过错范围内与父母共同承担；邻居不必先找孙宁。邻居最终实收的赔款总额以6000元损失为限。",
        sources: [
          "civil-tort-special-entrust1189",
          "civil-tort-special-entrust10",
        ],
        id: "civil-tort-special-entrusted-shares-written",
        kind: "subjective",
        title: "一份损失向谁主张：写出分析",
        prompt:
          "父母能否把对邻居的责任固定为一半，并要求邻居先找孙宁？请结合案情说明理由。",
        criteria: [
          {
            id: "entrusted-shares-parent",
            label: "不按固定份额限制父母责任",
            meaning:
              "指出父母仍负全部监护责任，不能一律各半或要求先向孙宁索赔。",
            acceptable:
              "说邻居仍可向父母请求6000元，不必先找孙宁，含义相同即可。",
            boundary: "不要求本题裁定孙宁的最终比例或内部追偿。",
          },
          {
            id: "entrusted-shares-limit",
            label: "过错范围与一次受偿",
            meaning: "孙宁在过错范围内共同承担，邻居实收总额不得超过6000元。",
            acceptable: "表述为孙宁也要按过错负责，但同一损失不能收两遍即可。",
            boundary:
              "不能说孙宁必定承担全部或各半；不能把共同承担误作双倍赔偿。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-tort-work-task",
    title: "执行工作任务致害",
    headline:
      "为单位执行工作任务造成他人损害，由单位承担责任；纯粹私人活动不能只因员工身份就算到单位头上。",
    goal: "商户能否要求青禾公司承担这次损失？",
    prerequisite: "能分清行为人、受害人和本题所问的责任主体。",
    minutes: "6–10",
    paragraphs: [
      "先看造成损害的行为是不是在执行单位工作任务。工作人员按单位安排送货、搬运或服务客户时致害，由用人单位承担对外侵权责任。",
      "员工周末办私事，不能只凭穿着工服或仍在职就要求单位负责。要把具体行为与工作任务的关系说清楚；内部追偿是另一个问题，本组不据外部责任直接决定追偿。",
    ],
    example: {
      title: "商场里的送货单",
      facts:
        "本案为原创教学虚构。青禾公司安排其员工陆程把一批办公椅从库房送到商场客户处。陆程按公司送货单在约定时间推货进入客户区域，转弯时只顾核对货号，货车边缘撞坏路边商户的玻璃展示柜。该搬运行为造成的修复损失为5000元，商户正常经营，并未参与搬运。公司说陆程是亲手推车的人，商户应只找陆程赔，本题不讨论公司赔偿后能否向员工追偿。",
      analysis:
        "能。陆程按公司送货单为客户送椅子，撞坏展示柜发生在执行工作任务中，应由青禾公司承担对外赔偿责任。公司不能只以推车的是陆程本人为由，让商户只能找员工。",
    },
    pitfall:
      "要求受害人先证明单位亲自犯错，或者只凭工作服就把私人行为当作职务行为。",
    recall: {
      prompt: "商户能否要求青禾公司承担这次损失？",
      reference:
        "为单位执行工作任务造成他人损害，由单位承担责任；纯粹私人活动不能只因员工身份就算到单位头上。",
    },
    sources: ["civil-tort-special-worker1191", "civil-tort-special-worker15"],
    exercises: [
      {
        caseId: "civil-tort-special-worker-delivery",
        relatedTopicIds: ["civil-tort-work-task"],
        facts:
          "本案为原创教学虚构。青禾公司安排其员工陆程把一批办公椅从库房送到商场客户处。陆程按公司送货单在约定时间推货进入客户区域，转弯时只顾核对货号，货车边缘撞坏路边商户的玻璃展示柜。该搬运行为造成的修复损失为5000元，商户正常经营，并未参与搬运。公司说陆程是亲手推车的人，商户应只找陆程赔，本题不讨论公司赔偿后能否向员工追偿。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "能。陆程按公司送货单为客户送椅子，撞坏展示柜发生在执行工作任务中，应由青禾公司承担对外赔偿责任。公司不能只以推车的是陆程本人为由，让商户只能找员工。",
        sources: [
          "civil-tort-special-worker1191",
          "civil-tort-special-worker15",
        ],
        id: "civil-tort-special-worker-delivery-choice",
        kind: "objective",
        choiceMode: "single",
        title: "商场里的送货单：选择判断",
        prompt: "商户能否要求青禾公司承担这次损失？",
        options: [
          {
            id: "a",
            text: "只能由陆程赔，因为公司没有亲手推车",
            explanation: "第1191条不要求公司亲手实施致害动作。",
          },
          {
            id: "b",
            text: "青禾公司应对商户承担责任，损害发生在执行送货任务中",
            explanation: "送货单、客户和约定时间将行为明确联系到工作任务。",
          },
          {
            id: "c",
            text: "须先证明公司负责人在现场指挥撞坏展示柜，才能请求公司赔偿",
            explanation: "不以负责人亲自指挥致害为条件。",
          },
          {
            id: "d",
            text: "陆程领取工资，因此损害应由商户自己承担",
            explanation: "工资关系不使受害人自担工作任务造成的损失。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-tort-special-worker-delivery",
        relatedTopicIds: ["civil-tort-work-task"],
        facts:
          "本案为原创教学虚构。青禾公司安排其员工陆程把一批办公椅从库房送到商场客户处。陆程按公司送货单在约定时间推货进入客户区域，转弯时只顾核对货号，货车边缘撞坏路边商户的玻璃展示柜。该搬运行为造成的修复损失为5000元，商户正常经营，并未参与搬运。公司说陆程是亲手推车的人，商户应只找陆程赔，本题不讨论公司赔偿后能否向员工追偿。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "能。陆程按公司送货单为客户送椅子，撞坏展示柜发生在执行工作任务中，应由青禾公司承担对外赔偿责任。公司不能只以推车的是陆程本人为由，让商户只能找员工。",
        sources: [
          "civil-tort-special-worker1191",
          "civil-tort-special-worker15",
        ],
        id: "civil-tort-special-worker-delivery-written",
        kind: "subjective",
        title: "商场里的送货单：写出分析",
        prompt: "商户能否要求青禾公司承担这次损失？请结合案情说明理由。",
        criteria: [
          {
            id: "worker-delivery-company",
            label: "单位承担对外责任",
            meaning: "判断可向青禾公司请求赔偿，不限定商户只能找员工。",
            acceptable: "说公司负责这5000元，意义相同即可。",
            boundary: "不能以公司没有亲自动手、现场无负责人为免责理由。",
          },
          {
            id: "worker-delivery-task",
            label: "联系工作任务",
            meaning:
              "以按公司送货单、为客户送货、约定时间搬运等说明正在执行任务。",
            acceptable:
              "指出一项足以把此次搬运与公司任务联系起来的具体事实即可。",
            boundary: "不要求写内部追偿或判断陆程是否重大过失。",
          },
        ],
      },
      {
        caseId: "civil-tort-special-worker-private-move",
        relatedTopicIds: ["civil-tort-work-task"],
        facts:
          "本案为原创教学虚构。赵澄是远舟公司的库房员工。周日休假时，他用自己的手推车帮自己搬家，从旧住处搬书箱到私人租住的公寓。公司没有安排这次搬运，没有收款，也未提供车辆或工具。赵澄只是随手穿了旧工服。搬箱时他没有固定箱子，书箱滑落砸坏邻居的折叠车。邻居认为只要他仍是公司员工且穿工服，就应由远舟公司赔偿。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。赵澄休假给自己搬家，用的是自己的工具，与远舟公司的工作任务无关。员工身份和工服都不能把这次私事变成单位任务。这次因未固定书箱造成的损失，应由赵澄按自己的过错承担责任。",
        sources: [
          "civil-tort-special-worker1191",
          "civil-tort-special-worker15",
        ],
        id: "civil-tort-special-worker-private-move-choice",
        kind: "objective",
        choiceMode: "single",
        title: "周末搬家的工服：选择判断",
        prompt:
          "邻居能否仅凭赵澄的员工身份和工服，要求远舟公司按用人单位责任赔偿？这次损失应由谁负责？",
        options: [
          {
            id: "a",
            text: "只要劳动关系还在，员工造成的全部损失都由单位赔偿",
            explanation: "劳动关系不是任何私人行为的担保。",
          },
          {
            id: "b",
            text: "只要穿工服，私人搬家也当然是执行工作任务",
            explanation: "须看具体任务关系，而非仅看服装。",
          },
          {
            id: "c",
            text: "无论谁安排搬家，单位和赵澄都当然各赔一半",
            explanation: "没有这种固定分担规则。",
          },
          {
            id: "d",
            text: "本案是私人搬家，不能仅凭身份和工服要求单位负责",
            explanation: "私人目的、自备工具、无单位安排，说明不是工作任务。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-tort-special-worker-private-move",
        relatedTopicIds: ["civil-tort-work-task"],
        facts:
          "本案为原创教学虚构。赵澄是远舟公司的库房员工。周日休假时，他用自己的手推车帮自己搬家，从旧住处搬书箱到私人租住的公寓。公司没有安排这次搬运，没有收款，也未提供车辆或工具。赵澄只是随手穿了旧工服。搬箱时他没有固定箱子，书箱滑落砸坏邻居的折叠车。邻居认为只要他仍是公司员工且穿工服，就应由远舟公司赔偿。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。赵澄休假给自己搬家，用的是自己的工具，与远舟公司的工作任务无关。员工身份和工服都不能把这次私事变成单位任务。这次因未固定书箱造成的损失，应由赵澄按自己的过错承担责任。",
        sources: [
          "civil-tort-special-worker1191",
          "civil-tort-special-worker15",
        ],
        id: "civil-tort-special-worker-private-move-written",
        kind: "subjective",
        title: "周末搬家的工服：写出分析",
        prompt:
          "邻居能否仅凭赵澄的员工身份和工服，要求远舟公司按用人单位责任赔偿？这次损失应由谁负责？请结合案情说明理由。",
        criteria: [
          {
            id: "worker-private-move-scope",
            label: "私人活动不纳入单位责任",
            meaning:
              "指出不能仅凭在职和工服要求公司承担第1191条责任，并联系私人搬家事实。",
            acceptable: "说周末给自己搬家、非单位安排，归个人行为即可。",
            boundary: "不把休假日一概当作非工作日规则；关键是本案与任务无关。",
          },
          {
            id: "worker-private-move-person",
            label: "个人过错责任",
            meaning: "说明未固定书箱造成邻居损失，应由赵澄按个人过错负责。",
            acceptable: "说这次应找赵澄本人赔，并联系书箱未固定即可。",
            boundary: "不能因为公司不赔就让受害人自担全部损失。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-tort-labor-dispatch",
    title: "劳务派遣致害责任",
    headline:
      "派遣人员执行工作任务致害，由用工单位负责；派遣单位有选派、培训等过错，才在相应范围内共同承担。",
    goal: "这次损失应由哪家公司承担责任？",
    prerequisite: "能分清行为人、受害人和本题所问的责任主体。",
    minutes: "6–10",
    paragraphs: [
      "派遣公司签劳动合同，另一家单位实际安排工作。被派遣人员执行用工单位任务造成他人损害，由接受派遣的用工单位承担侵权人应承担的全部责任。",
      "派遣单位若不当选派人员、未履行培训义务等，对损害有过错，在过错范围内共同承担。没有这些过错，不能只因它是派遣单位就要求其当然赔偿；有过错也不是自动各半或双倍赔。",
    ],
    example: {
      title: "派来的设备操作员",
      facts:
        "本案为原创教学虚构。启程公司依有效劳务派遣协议，将唐宁派往安禾公司的仓储中心。安禾要求选派接受过该型号设备操作培训、具有操作经验的人员；唐宁在派遣前两次书面说明自己从未学过也没操作过该设备。启程未安排培训，仍把他列作熟练操作员派出。安禾随即让唐宁操作设备搬运货物，唐宁误按按钮，击坏在场客户的仪器。已确定此次操作造成损失，客户没有参与操作。客户把两家公司一并告上法院，只问对外责任，不计算比例。",
      analysis:
        "安禾公司作为用工单位，应承担这次工作任务致害的全部对外责任。启程明知唐宁没学过设备操作，仍以熟练人员身份派出，对选派、培训也有过错，应在其过错范围内与安禾共同承担。客户得到的赔款不能超过本次损失。",
    },
    pitfall: "只找签劳动合同的派遣单位，或把两家单位的责任不加区分地各算一半。",
    recall: {
      prompt: "这次损失应由哪家公司承担责任？",
      reference:
        "派遣人员执行工作任务致害，由用工单位负责；派遣单位有选派、培训等过错，才在相应范围内共同承担。",
    },
    sources: [
      "civil-tort-special-dispatch1191",
      "civil-tort-special-dispatch16",
    ],
    exercises: [
      {
        caseId: "civil-tort-special-dispatch-selection",
        relatedTopicIds: ["civil-tort-labor-dispatch"],
        facts:
          "本案为原创教学虚构。启程公司依有效劳务派遣协议，将唐宁派往安禾公司的仓储中心。安禾要求选派接受过该型号设备操作培训、具有操作经验的人员；唐宁在派遣前两次书面说明自己从未学过也没操作过该设备。启程未安排培训，仍把他列作熟练操作员派出。安禾随即让唐宁操作设备搬运货物，唐宁误按按钮，击坏在场客户的仪器。已确定此次操作造成损失，客户没有参与操作。客户把两家公司一并告上法院，只问对外责任，不计算比例。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "安禾公司作为用工单位，应承担这次工作任务致害的全部对外责任。启程明知唐宁没学过设备操作，仍以熟练人员身份派出，对选派、培训也有过错，应在其过错范围内与安禾共同承担。客户得到的赔款不能超过本次损失。",
        sources: [
          "civil-tort-special-dispatch1191",
          "civil-tort-special-dispatch16",
        ],
        id: "civil-tort-special-dispatch-selection-choice",
        kind: "objective",
        choiceMode: "single",
        title: "派来的设备操作员：选择判断",
        prompt: "这次损失应由哪家公司承担责任？",
        options: [
          {
            id: "a",
            text: "只由启程公司赔，劳动合同与谁签就只找谁",
            explanation: "实际接受派遣的用工单位承担工作任务致害责任。",
          },
          {
            id: "b",
            text: "只由唐宁赔，两家公司都与客户没有合同关系",
            explanation: "侵权责任不以客户与两家公司签有合同为前提。",
          },
          {
            id: "c",
            text: "安禾承担全部对外责任，启程在选派培训的过错范围内共同承担",
            explanation: "对应第1191条第2款和解释第16条。",
          },
          {
            id: "d",
            text: "客户可以从安禾和启程分别各收一遍全部损失",
            explanation: "责任主体支付总额不得超出应受偿损失。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-tort-special-dispatch-selection",
        relatedTopicIds: ["civil-tort-labor-dispatch"],
        facts:
          "本案为原创教学虚构。启程公司依有效劳务派遣协议，将唐宁派往安禾公司的仓储中心。安禾要求选派接受过该型号设备操作培训、具有操作经验的人员；唐宁在派遣前两次书面说明自己从未学过也没操作过该设备。启程未安排培训，仍把他列作熟练操作员派出。安禾随即让唐宁操作设备搬运货物，唐宁误按按钮，击坏在场客户的仪器。已确定此次操作造成损失，客户没有参与操作。客户把两家公司一并告上法院，只问对外责任，不计算比例。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "安禾公司作为用工单位，应承担这次工作任务致害的全部对外责任。启程明知唐宁没学过设备操作，仍以熟练人员身份派出，对选派、培训也有过错，应在其过错范围内与安禾共同承担。客户得到的赔款不能超过本次损失。",
        sources: [
          "civil-tort-special-dispatch1191",
          "civil-tort-special-dispatch16",
        ],
        id: "civil-tort-special-dispatch-selection-written",
        kind: "subjective",
        title: "派来的设备操作员：写出分析",
        prompt: "这次损失应由哪家公司承担责任？请结合案情说明理由。",
        criteria: [
          {
            id: "dispatch-selection-user",
            label: "用工单位的全部对外责任",
            meaning: "判断接受派遣的安禾承担此次工作任务致害的全部对外责任。",
            acceptable:
              "说客户可要求安禾赔偿全部此次损失即可，不要求内部责任术语。",
            boundary: "不能仅按劳动合同签约方确定启程独自赔偿。",
          },
          {
            id: "dispatch-selection-agency",
            label: "派遣单位的选派培训过错",
            meaning:
              "联系唐宁书面说明无操作经验而启程仍派出，说明启程在过错范围内共同承担。",
            acceptable:
              "点出不当选派或未培训与误操作的联系即可，不强制两项逐一列齐。",
            boundary: "不裁定具体比例，不把共同承担写成自动各半或双倍受偿。",
          },
        ],
      },
      {
        caseId: "civil-tort-special-dispatch-signed-contract",
        relatedTopicIds: ["civil-tort-labor-dispatch"],
        facts:
          "本案为原创教学虚构。新禾派遣公司依有效协议将秦川派往沐青公司做仓储搬运。派遣前，新禾按岗位清单核对了秦川的操作经历、有效资格证，并完成规定的上岗培训。事故发生当日，沐青领班为加快出货，安排秦川在客户仍在清点货物的通道内立即推运高堆货物，货物滑落损坏客户的检测仪。现有证据表明损害发生于沐青安排的这项任务，未发现新禾在选派、培训或其他事项上有导致损害的过错。沐青称秦川的劳动合同签在新禾，赔偿应全部由新禾承担。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "沐青不能把赔偿全部推给新禾。秦川执行的是沐青的搬运任务，由用工单位沐青承担责任。新禾有选派、培训等过错才在相应范围内负责；本案没有这样的致损过错，不能只凭劳动合同签在新禾就要求它承担赔偿。",
        sources: [
          "civil-tort-special-dispatch1191",
          "civil-tort-special-dispatch16",
        ],
        id: "civil-tort-special-dispatch-signed-contract-choice",
        kind: "objective",
        choiceMode: "single",
        title: "签劳动合同的是谁：选择判断",
        prompt:
          "沐青能否要求客户只找新禾赔偿？新禾是否仅凭派遣单位身份就必须赔偿？",
        options: [
          {
            id: "a",
            text: "劳动合同签在新禾，客户只能要求新禾赔偿",
            explanation: "忽略用工单位因工作任务致害承担的责任。",
          },
          {
            id: "b",
            text: "沐青承担工作任务致害责任，新禾不因派遣单位身份就当然赔偿",
            explanation: "派遣单位责任需要相应过错，身份本身不够。",
          },
          {
            id: "c",
            text: "只要是劳务派遣，两家公司无论有无过错都必须各赔一半",
            explanation: "法律没有无条件各半规则。",
          },
          {
            id: "d",
            text: "客户与秦川没有合同，所以无权要求任何一家公司赔偿",
            explanation: "侵权赔偿不取决于受害人与工作人员签约。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-tort-special-dispatch-signed-contract",
        relatedTopicIds: ["civil-tort-labor-dispatch"],
        facts:
          "本案为原创教学虚构。新禾派遣公司依有效协议将秦川派往沐青公司做仓储搬运。派遣前，新禾按岗位清单核对了秦川的操作经历、有效资格证，并完成规定的上岗培训。事故发生当日，沐青领班为加快出货，安排秦川在客户仍在清点货物的通道内立即推运高堆货物，货物滑落损坏客户的检测仪。现有证据表明损害发生于沐青安排的这项任务，未发现新禾在选派、培训或其他事项上有导致损害的过错。沐青称秦川的劳动合同签在新禾，赔偿应全部由新禾承担。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "沐青不能把赔偿全部推给新禾。秦川执行的是沐青的搬运任务，由用工单位沐青承担责任。新禾有选派、培训等过错才在相应范围内负责；本案没有这样的致损过错，不能只凭劳动合同签在新禾就要求它承担赔偿。",
        sources: [
          "civil-tort-special-dispatch1191",
          "civil-tort-special-dispatch16",
        ],
        id: "civil-tort-special-dispatch-signed-contract-written",
        kind: "subjective",
        title: "签劳动合同的是谁：写出分析",
        prompt:
          "沐青能否要求客户只找新禾赔偿？新禾是否仅凭派遣单位身份就必须赔偿？请结合案情说明理由。",
        criteria: [
          {
            id: "dispatch-signed-user",
            label: "用工单位不能转走责任",
            meaning:
              "指出沐青是实际用工单位、秦川在执行其任务，沐青应承担责任。",
            acceptable:
              "联系领班安排搬运，说明不能让客户只找签劳动合同的新禾即可。",
            boundary: "不以客户先向新禾索赔或新禾无力赔偿为前提。",
          },
          {
            id: "dispatch-signed-fault",
            label: "派遣单位不当然赔偿",
            meaning:
              "指出新禾有相应致损过错才负责，本案不能仅凭其派遣单位身份要求赔偿。",
            acceptable:
              "说已完成岗位核对和培训、没有相应过错，不能只因签劳动合同就让其赔偿即可。",
            boundary: "不能反向说所有派遣单位永远免责；本案只据已给事实判断。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-animal-keeper",
    title: "饲养动物责任与安全措施",
    headline:
      "普通宠物伤人，牵了绳也不当然免责；违反规定不采取安全措施，受害人故意造成损害也只是可以减轻。",
    goal: "许宁能否仅凭一直牵绳、没有发现疏忽就拒绝赔偿？",
    prerequisite: "能分清行为人、受害人和本题所问的责任主体。",
    minutes: "6–10",
    paragraphs: [
      "一般饲养动物造成他人损害，由饲养人或管理人承担责任。不能只因已经牵绳、平时很温顺或没有疏忽，就要求正常受伤的行人自担损失；受害人故意或重大过失是另一层抗辩。",
      "违反管理规定、没有采取安全措施时，适用更严格的规则：能证明受害人故意造成损害，可以减轻责任，不是当然免除全部责任。本组只讨论普通合法饲养的宠物，不把它与禁养烈性犬或动物园混在一起。",
    ],
    example: {
      title: "牵绳经过的宠物",
      facts:
        "本案为原创教学虚构。许宁依法登记、免疫饲养一只普通宠物犬，外出时按规定使用牵引绳并一直握在手中。路人陆芸在通道另一侧正常步行，没有接触、挑逗或突然靠近犬只。犬只突然扑向陆芸并咬伤小腿，造成已确认的合理治疗费。监控确认上述经过，现场不存在未按规定采取安全措施的情形。许宁说自己一直牵绳，也没有发现操作疏忽，因此不用赔。",
      analysis:
        "不能。许宁是饲养人，宠物犬咬伤正常通行的陆芸，应承担赔偿责任。一直牵绳、没有疏忽，不是第1245条规定的当然免责理由；本案也没有陆芸故意或重大过失造成损害的情形。",
    },
    pitfall:
      "把牵绳当作一概免责的证明，或把第1245条的免责范围直接套到未采取安全措施的情形。",
    recall: {
      prompt: "许宁能否仅凭一直牵绳、没有发现疏忽就拒绝赔偿？",
      reference:
        "普通宠物伤人，牵了绳也不当然免责；违反规定不采取安全措施，受害人故意造成损害也只是可以减轻。",
    },
    sources: [
      "civil-tort-special-animal1245",
      "civil-tort-special-animal1246",
      "civil-tort-special-leash30",
    ],
    exercises: [
      {
        caseId: "civil-tort-special-animal-leashed",
        relatedTopicIds: ["civil-animal-keeper"],
        facts:
          "本案为原创教学虚构。许宁依法登记、免疫饲养一只普通宠物犬，外出时按规定使用牵引绳并一直握在手中。路人陆芸在通道另一侧正常步行，没有接触、挑逗或突然靠近犬只。犬只突然扑向陆芸并咬伤小腿，造成已确认的合理治疗费。监控确认上述经过，现场不存在未按规定采取安全措施的情形。许宁说自己一直牵绳，也没有发现操作疏忽，因此不用赔。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。许宁是饲养人，宠物犬咬伤正常通行的陆芸，应承担赔偿责任。一直牵绳、没有疏忽，不是第1245条规定的当然免责理由；本案也没有陆芸故意或重大过失造成损害的情形。",
        sources: ["civil-tort-special-animal1245"],
        id: "civil-tort-special-animal-leashed-choice",
        kind: "objective",
        choiceMode: "single",
        title: "牵绳经过的宠物：选择判断",
        prompt: "许宁能否仅凭一直牵绳、没有发现疏忽就拒绝赔偿？",
        options: [
          {
            id: "a",
            text: "许宁仍应赔偿，牵绳和没有疏忽不使一般饲养人当然免责",
            explanation: "一般饲养动物责任不以证明饲养人疏忽为前提。",
          },
          {
            id: "b",
            text: "只要牵绳，饲养人对任何伤人结果都不用赔",
            explanation: "牵绳不是一概免责条件。",
          },
          {
            id: "c",
            text: "陆芸须先证明许宁故意指使犬攻击，才能获得赔偿",
            explanation: "普通动物致害不要求证明主人指使攻击。",
          },
          {
            id: "d",
            text: "犬只平时温顺，所以陆芸必须自己负担治疗费",
            explanation: "温顺与否不能排除已经发生的动物致害责任。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-tort-special-animal-leashed",
        relatedTopicIds: ["civil-animal-keeper"],
        facts:
          "本案为原创教学虚构。许宁依法登记、免疫饲养一只普通宠物犬，外出时按规定使用牵引绳并一直握在手中。路人陆芸在通道另一侧正常步行，没有接触、挑逗或突然靠近犬只。犬只突然扑向陆芸并咬伤小腿，造成已确认的合理治疗费。监控确认上述经过，现场不存在未按规定采取安全措施的情形。许宁说自己一直牵绳，也没有发现操作疏忽，因此不用赔。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。许宁是饲养人，宠物犬咬伤正常通行的陆芸，应承担赔偿责任。一直牵绳、没有疏忽，不是第1245条规定的当然免责理由；本案也没有陆芸故意或重大过失造成损害的情形。",
        sources: ["civil-tort-special-animal1245"],
        id: "civil-tort-special-animal-leashed-written",
        kind: "subjective",
        title: "牵绳经过的宠物：写出分析",
        prompt:
          "许宁能否仅凭一直牵绳、没有发现疏忽就拒绝赔偿？请结合案情说明理由。",
        criteria: [
          {
            id: "animal-leashed-liability",
            label: "饲养人承担赔偿",
            meaning: "判断许宁应赔偿，联系其饲养的犬咬伤正常通行者。",
            acceptable: "说应由狗的主人承担此次合理治疗费即可。",
            boundary: "不能因为宠物平时温顺或主人未亲自攻击就拒赔。",
          },
          {
            id: "animal-leashed-defense",
            label: "牵绳不当然免责",
            meaning:
              "说明已牵绳、无疏忽仍不是当然免责理由，受害人也无故意或重大过失。",
            acceptable:
              "直接指出正常行人没有挑逗行为、牵绳也要赔，意义相同即可。",
            boundary: "不要求讨论禁养犬、动物园或准确背出条号。",
          },
        ],
      },
      {
        caseId: "civil-tort-special-animal-no-safety",
        relatedTopicIds: ["civil-animal-keeper"],
        facts:
          "本案为原创教学虚构。陈川把合法饲养的普通宠物犬带到公共步道，解开牵引绳让它自由跑动，也未设置其他隔离保护。成年人顾平为向陈川索赔，边录像边用尖枝反复刺犬，犬开始张口扑咬后，他仍把手伸向犬口，并对同伴说“咬伤了就让他赔一笔”。监控和录音完整证实上述经过。顾平的手被咬伤，犬只处于未牵绳、未隔离状态与这次伤害有关。陈川据此主张自己应当全部免责。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能全部免责。陈川带犬到公共步道却解绳、也未采取其他保护，适用未按管理规定采取安全措施的责任。顾平为了索赔主动招致咬伤，可以据其故意减轻陈川的责任，但第1246条不因此免除陈川全部责任。",
        sources: [
          "civil-tort-special-animal1246",
          "civil-tort-special-leash30",
        ],
        id: "civil-tort-special-animal-no-safety-choice",
        kind: "objective",
        choiceMode: "single",
        title: "松开的牵引绳：选择判断",
        prompt: "陈川能否以顾平故意招致咬伤为由全部免责？",
        options: [
          {
            id: "a",
            text: "顾平故意招致咬伤，陈川在任何动物致害规则下一律全免",
            explanation: "忽略第1246条与一般动物责任的区别。",
          },
          {
            id: "b",
            text: "只要陈川没有牵绳，任何受害人行为都绝不影响赔偿",
            explanation: "第1246条允许因被侵权人故意减轻责任。",
          },
          {
            id: "c",
            text: "陈川可以因顾平故意招致损害而减轻责任，但不能据此全部免责",
            explanation: "未采取安全措施情形下，故意抗辩的效果是可减轻。",
          },
          {
            id: "d",
            text: "必须机械地让双方各赔一半，不需判断适用规则",
            explanation: "具体减轻幅度不是一律各半。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-tort-special-animal-no-safety",
        relatedTopicIds: ["civil-animal-keeper"],
        facts:
          "本案为原创教学虚构。陈川把合法饲养的普通宠物犬带到公共步道，解开牵引绳让它自由跑动，也未设置其他隔离保护。成年人顾平为向陈川索赔，边录像边用尖枝反复刺犬，犬开始张口扑咬后，他仍把手伸向犬口，并对同伴说“咬伤了就让他赔一笔”。监控和录音完整证实上述经过。顾平的手被咬伤，犬只处于未牵绳、未隔离状态与这次伤害有关。陈川据此主张自己应当全部免责。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能全部免责。陈川带犬到公共步道却解绳、也未采取其他保护，适用未按管理规定采取安全措施的责任。顾平为了索赔主动招致咬伤，可以据其故意减轻陈川的责任，但第1246条不因此免除陈川全部责任。",
        sources: [
          "civil-tort-special-animal1246",
          "civil-tort-special-leash30",
        ],
        id: "civil-tort-special-animal-no-safety-written",
        kind: "subjective",
        title: "松开的牵引绳：写出分析",
        prompt: "陈川能否以顾平故意招致咬伤为由全部免责？请结合案情说明理由。",
        criteria: [
          {
            id: "animal-no-safety-rule",
            label: "未采取安全措施的规则",
            meaning:
              "联系公共步道解绳且无其他防护，说明适用第1246条的较严格责任。",
            acceptable:
              "说违反牵绳安全要求，不能照搬一般情形下的全部免责即可。",
            boundary: "不要求引用地方条例或讨论行政罚款。",
          },
          {
            id: "animal-no-safety-effect",
            label: "受害人故意仅可减轻",
            meaning:
              "联系顾平为索赔主动招致咬伤，说明可减轻陈川责任但不能全免。",
            acceptable: "说受害人故意可以少赔，但此处不能完全不赔即可。",
            boundary: "不要求定出减轻比例，不应说受害人故意毫无影响。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-animal-third-party",
    title: "第三人致害与逃逸动物",
    headline:
      "第三人惹得动物伤人，受害人可向饲养人或第三人索赔；动物逃走后伤人，原饲养人也不能只因失去控制就免责。",
    goal: "方禾可以向谁请求赔偿？如果沈宁先支付3000元，能否向孟川追偿？",
    prerequisite: "能分清行为人、受害人和本题所问的责任主体。",
    minutes: "6–10",
    paragraphs: [
      "第三人过错导致动物伤人，受害人可找饲养人或管理人，也可找这个第三人。饲养人赔偿后有权向第三人追偿；受害人不能把同一笔损失收取两遍。",
      "动物在遗弃、逃逸期间造成损害，由原饲养人或管理人承担责任。对本案身份明确的逃逸犬，不能把“已经跑走”当作摆脱责任的理由。",
    ],
    example: {
      title: "步道旁的一声爆响",
      facts:
        "本案为原创教学虚构。沈宁按规定牵着其合法饲养的普通宠物犬走在步道旁。成年人孟川为了逗犬，把点燃的小爆竹扔到犬脚边，犬受惊后扑咬了正常经过的路人方禾。全程录像能确认犬被爆竹惊吓与咬伤的经过；方禾没有接触或挑逗犬只，沈宁也不存在违反管理规定或自身过错。方禾合理治疗费为3000元，孟川的行为导致这次损害没有争议。",
      analysis:
        "方禾既可以要求沈宁赔偿，也可以要求孟川赔偿。孟川点燃爆竹惊犬，是有过错的第三人；这不妨碍方禾向饲养人沈宁请求赔偿。沈宁先赔付3000元后，有权向孟川追偿这笔钱，方禾不能重复取得同一笔治疗费。",
    },
    pitfall: "有第三人惹犬就认定饲养人对受害人全免，或把逃逸时间当作责任终点。",
    recall: {
      prompt: "方禾可以向谁请求赔偿？如果沈宁先支付3000元，能否向孟川追偿？",
      reference:
        "第三人惹得动物伤人，受害人可向饲养人或第三人索赔；动物逃走后伤人，原饲养人也不能只因失去控制就免责。",
    },
    sources: ["civil-tort-special-animal1250", "civil-tort-special-animal1249"],
    exercises: [
      {
        caseId: "civil-tort-special-animal-outsider",
        relatedTopicIds: ["civil-animal-third-party"],
        facts:
          "本案为原创教学虚构。沈宁按规定牵着其合法饲养的普通宠物犬走在步道旁。成年人孟川为了逗犬，把点燃的小爆竹扔到犬脚边，犬受惊后扑咬了正常经过的路人方禾。全程录像能确认犬被爆竹惊吓与咬伤的经过；方禾没有接触或挑逗犬只，沈宁也不存在违反管理规定或自身过错。方禾合理治疗费为3000元，孟川的行为导致这次损害没有争议。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "方禾既可以要求沈宁赔偿，也可以要求孟川赔偿。孟川点燃爆竹惊犬，是有过错的第三人；这不妨碍方禾向饲养人沈宁请求赔偿。沈宁先赔付3000元后，有权向孟川追偿这笔钱，方禾不能重复取得同一笔治疗费。",
        sources: ["civil-tort-special-animal1250"],
        id: "civil-tort-special-animal-outsider-choice",
        kind: "objective",
        choiceMode: "single",
        title: "步道旁的一声爆响：选择判断",
        prompt: "方禾可以向谁请求赔偿？如果沈宁先支付3000元，能否向孟川追偿？",
        options: [
          {
            id: "a",
            text: "只能找孟川；只要是第三人惹犬，饲养人对受害人就绝对免责",
            explanation: "第1250条保留受害人向饲养人或第三人请求的选择。",
          },
          {
            id: "b",
            text: "可向沈宁或孟川请求；沈宁赔后有权向孟川追偿",
            explanation: "受害人选择与饲养人赔后追偿分别处理。",
          },
          {
            id: "c",
            text: "只能找沈宁，沈宁赔后也永远不能找孟川",
            explanation: "忽略有过错第三人的赔偿和追偿责任。",
          },
          {
            id: "d",
            text: "可从两人各收3000元治疗费，合计6000元",
            explanation: "同一损失不能重复受偿。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-tort-special-animal-outsider",
        relatedTopicIds: ["civil-animal-third-party"],
        facts:
          "本案为原创教学虚构。沈宁按规定牵着其合法饲养的普通宠物犬走在步道旁。成年人孟川为了逗犬，把点燃的小爆竹扔到犬脚边，犬受惊后扑咬了正常经过的路人方禾。全程录像能确认犬被爆竹惊吓与咬伤的经过；方禾没有接触或挑逗犬只，沈宁也不存在违反管理规定或自身过错。方禾合理治疗费为3000元，孟川的行为导致这次损害没有争议。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "方禾既可以要求沈宁赔偿，也可以要求孟川赔偿。孟川点燃爆竹惊犬，是有过错的第三人；这不妨碍方禾向饲养人沈宁请求赔偿。沈宁先赔付3000元后，有权向孟川追偿这笔钱，方禾不能重复取得同一笔治疗费。",
        sources: ["civil-tort-special-animal1250"],
        id: "civil-tort-special-animal-outsider-written",
        kind: "subjective",
        title: "步道旁的一声爆响：写出分析",
        prompt:
          "方禾可以向谁请求赔偿？如果沈宁先支付3000元，能否向孟川追偿？请结合案情说明理由。",
        criteria: [
          {
            id: "animal-outsider-choice",
            label: "受害人可以选择请求",
            meaning:
              "指出方禾可向饲养人沈宁或第三人孟川请求赔偿，不能因第三人过错排除沈宁。",
            acceptable:
              "说两人都可成为这笔赔偿的请求对象即可，不要求连带或不真正连带术语。",
            boundary: "不能限定只能找第三人或必须先找第三人。",
          },
          {
            id: "animal-outsider-recourse",
            label: "饲养人赔后可追偿",
            meaning:
              "说明沈宁赔付3000元后可向造成损害的孟川追偿，方禾不得重复受偿。",
            acceptable:
              "说狗主人先赔后可找扔爆竹的人要回已赔的3000元即可；不因未重复强调实收上限就否定核心追偿。",
            boundary: "不要求尚未支付就能追偿，不扩大至双份治疗费。",
          },
        ],
      },
      {
        caseId: "civil-tort-special-animal-escape",
        relatedTopicIds: ["civil-animal-third-party"],
        facts:
          "本案为原创教学虚构。陆宁的普通宠物犬从家中敞开的院门跑出，两天后在附近街道咬伤正常行走的程禾。警方通过芯片和监控确认犬只一直是陆宁饲养的那只，逃逸后没有人收养或接管饲养。程禾没有挑逗或接触犬只。陆宁承认原先是自己饲养，但说犬已离开自己控制两天，后来发生的伤害不再与自己有关。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。犬在逃逸期间伤人，仍由原饲养人承担责任。芯片和监控已经确认这只犬原由陆宁饲养，也没有新的收养或管理关系，离开控制两天不能让陆宁免责。",
        sources: ["civil-tort-special-animal1249"],
        id: "civil-tort-special-animal-escape-choice",
        kind: "objective",
        choiceMode: "single",
        title: "两天后找到的犬：选择判断",
        prompt: "陆宁能否仅因犬已逃走两天就拒绝赔偿？",
        options: [
          {
            id: "a",
            text: "逃走即切断原饲养人的责任，从院门跑出后就不再负责",
            explanation: "第1249条明确规定逃逸期间仍由原饲养人或管理人负责。",
          },
          {
            id: "b",
            text: "只要逃逸超过24小时，原饲养人就必然免责",
            explanation: "法律没有这种24小时时限。",
          },
          {
            id: "c",
            text: "必须由程禾证明陆宁当时在现场指使犬只，才能索赔",
            explanation: "不以现场指使为动物逃逸致害责任的前提。",
          },
          {
            id: "d",
            text: "陆宁仍应承担原饲养人责任，逃逸两天本身不是免责理由",
            explanation: "身份明确且仍处逃逸期间，适用第1249条。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-tort-special-animal-escape",
        relatedTopicIds: ["civil-animal-third-party"],
        facts:
          "本案为原创教学虚构。陆宁的普通宠物犬从家中敞开的院门跑出，两天后在附近街道咬伤正常行走的程禾。警方通过芯片和监控确认犬只一直是陆宁饲养的那只，逃逸后没有人收养或接管饲养。程禾没有挑逗或接触犬只。陆宁承认原先是自己饲养，但说犬已离开自己控制两天，后来发生的伤害不再与自己有关。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。犬在逃逸期间伤人，仍由原饲养人承担责任。芯片和监控已经确认这只犬原由陆宁饲养，也没有新的收养或管理关系，离开控制两天不能让陆宁免责。",
        sources: ["civil-tort-special-animal1249"],
        id: "civil-tort-special-animal-escape-written",
        kind: "subjective",
        title: "两天后找到的犬：写出分析",
        prompt: "陆宁能否仅因犬已逃走两天就拒绝赔偿？请结合案情说明理由。",
        criteria: [
          {
            id: "animal-escape-owner",
            label: "逃逸期间仍由原饲养人负责",
            meaning: "判断陆宁应对逃逸犬致害负责，离开控制两天不免除责任。",
            acceptable: "说狗跑了主人也不能据此甩掉此次赔偿即可。",
            boundary:
              "不要求逐字背诵遗弃与逃逸，也不讨论本案未发生的新收养关系。",
          },
        ],
      },
    ],
  },
];

export const civilTortSpecialChapters = [
  {
    id: "CIV-TORT-GUARDIAN",
    title: "监护与委托照看",
    section: "民法",
    topicIds: [
      "civil-tort-guardian-liability",
      "civil-tort-entrusted-guardian",
    ],
  },
  {
    id: "CIV-TORT-EMPLOYER",
    title: "用人单位与劳务派遣",
    section: "民法",
    topicIds: ["civil-tort-work-task", "civil-tort-labor-dispatch"],
  },
  {
    id: "CIV-TORT-ANIMALS",
    title: "饲养动物致害",
    section: "民法",
    topicIds: ["civil-animal-keeper", "civil-animal-third-party"],
  },
];

export const civilTortSpecialExercises = civilTortSpecialTopics.flatMap(
  (topic) => topic.exercises,
);
export const civilTortSpecialContentPack = {
  revision: civilTortSpecialRevision,
  snapshot: {
    topics: civilTortSpecialTopics,
    sources: civilTortSpecialSources,
  },
};
export const civilTortSpecialDefaultQueues = {
  objective: civilTortSpecialExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilTortSpecialExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilTortSpecialQuestion(id: string) {
  const question = civilTortSpecialExercises.find((q) => q.id === id);
  return question ? structuredClone(question) : undefined;
}
export function civilTortSpecialTopicForQuestion(id: string) {
  return civilTortSpecialTopics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function civilTortSpecialSameCaseQuestions(id: string) {
  const question = civilTortSpecialQuestion(id);
  return question
    ? structuredClone(
        civilTortSpecialExercises.filter((q) => q.caseId === question.caseId),
      )
    : [];
}
export function civilTortSpecialChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = civilTortSpecialChapters.find((c) => c.id === chapterId);
  return chapter
    ? civilTortSpecialTopics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}
